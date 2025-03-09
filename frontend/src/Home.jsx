import { useState } from 'react';
import { motion } from "framer-motion";
import './App.css';
import Icon from "./assets/logo.png";
import videoBg from "./assets/videoBg.mp4";
import { useNavigate } from "react-router-dom";

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); 

  const goToNewPage = () => {
    navigate(`/content`); 
  };

  const handleSubmit = async () => {
    if (inputValue.trim() !== '') {
      console.log("User input:", inputValue);
      setIsLoading(true); 

      try {
        const response = await fetch("http://localhost:5000/search", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ movieName: inputValue }),
        });
        const data = await response.json();
        console.log("Response from server:", data);
        setIsLoading(false);
        await goToNewPage();

      } catch {
        setIsLoading(false);
        console.log("error");
      }

    }

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <div className='lp'>
        <video src={videoBg} autoPlay loop muted onLoadedMetadata={(e) => e.target.playbackRate = 0.25} // 0.5x speed
        ></video>

        <div className='content'>



          <div className='fieldBox'>
            {/* ✅ Show loading spinner when isLoading is true */}
            {isLoading ? (
              <>
              <motion.div
                className="loading-spinner"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              </>
            ) : (
              <>

          <img className="logo" src={Icon} alt="Logo" />

                        {/* ✅ Animated Heading */}
          <motion.h1
            className='name'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            QuantumFlicks.AI
          </motion.h1>

          {/* ✅ Animated Paragraph */}
          <motion.p
            className='quote'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          >
            "AI-powered platform that automatically generates fan pages for movies and TV shows."
          </motion.p>




                <input
                  className='input'
                  type="text"
                  placeholder="Enter a movie or TV show name..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handleSubmit}>Generate</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

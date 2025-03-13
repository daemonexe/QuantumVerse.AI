import { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './App.css';
import Icon from "./assets/logo.png";
import videoBg from "./assets/videoBg.mp4";

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Page transition animation variants
  const pageVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } }
  };

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
        goToNewPage();

      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }

      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <motion.div className='lp newpage'
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <video 
          src={videoBg} 
          autoPlay 
          loop 
          muted 
          onLoadedMetadata={(e) => e.target.playbackRate = 0.25} 
        ></video>

        <div className='content'>
          <div className='fieldBox'>

            {/* ✅ Show loading spinner when isLoading is true */}
            {isLoading ? (
              <motion.div
                className="loading-spinner"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
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
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleSubmit}>Generate</button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;

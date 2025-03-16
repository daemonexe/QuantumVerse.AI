import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './App.css';
import Icon from "./assets/logo.png";
import videoBg from "./assets/videoBg.mp4";

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // ✅ Fetch movie suggestions from OMDB API
  useEffect(() => {
    const fetchMovies = async () => {
      if (searchTerm.length < 3) {
        setMovies([]); // Clear results if input is too short
        return;
      }

      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${searchTerm}&apikey=3816ca8e`
        );
        const data = await response.json();

        if (data.Search) {
          setMovies(data.Search); // ✅ Store search results
        } else {
          setMovies([]); // No results
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const debounceTimeout = setTimeout(fetchMovies, 300); // ✅ Debounce API calls
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  // ✅ Handle selection from dropdown
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setInputValue(movie.Title); // ✅ Fill input field
    setMovies([]); // Hide dropdown
  };

  // Page transition animation variants
  const pageVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } }
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

        const data = await response.json(); // ✅ Get response JSON
        setIsLoading(false);

        navigate(`/home`, { state: { movieData: data } }); // ✅ Pass data to next page

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
          onLoadedMetadata={(e) => e.target.playbackRate = 1} 
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

                <div className="search-container">
                  <input
                    className='input'
                    type="text"
                    placeholder="Enter a movie or TV show name..."
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setSearchTerm(e.target.value); // ✅ Update searchTerm for dropdown
                    }}
                    onKeyDown={handleKeyDown}
                  />

                  {/* ✅ Dropdown menu */}
                  {movies.length > 0 && (
                    <ul className="dropdown-menu">
                      {movies.map((movie) => (
                        <li key={movie.imdbID} onClick={() => handleSelectMovie(movie)}>
                          <img src={movie.Poster} alt={movie.Title} width="40" />
                          {movie.Title} ({movie.Year})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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
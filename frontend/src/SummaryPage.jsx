import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import './website.css';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};


function SumPage() {
  const location = useLocation();
  const { movieData } = location.state || {}; // ✅ Safely retrieve state
  const [coverImage, setCoverImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimEHbz4Blzqgcu0-qbS9jHLEKoeuxb7VwXg&s"
  );
  const navigate = useNavigate();



  // ✅ Use `useEffect` to update state
  useEffect(() => {
    if (movieData?.details?.Poster) {
      console.log("Updating cover image:", movieData.details.Poster);
      setCoverImage(movieData.details.Poster);
    }
  }, [movieData]); // Runs when `movieData` updates

  
  const changePageToSummary = async () => {
    navigate(`/summary`, { state: { movieData: movieData } }); // ✅ Pass data to next page
  }
  const changeTohOME = async () => {
    navigate(`/home`, { state: { movieData: movieData } }); // ✅ Pass data to next page
  }
  const changeToQuiz = async () => {
    navigate(`/quiz`, { state: { movieData: movieData } }); // ✅ Pass data to next page
  }
  return (
    <div
      className="newpage"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="lp">
        <div className="navbar">
          <img className="movieBg" src={coverImage} alt="Movie Background" />
          <button onClick={changeTohOME} className="navButton"> Home</button>
          <button onClick={changePageToSummary} className="navButtonSel"> Summary</button>
          <button onClick={changeToQuiz} className="navButton"> Quiz</button>
        </div>

        <div className="movieCard">

          </div>
        </div>
    </div>
  );
}

export default SumPage;

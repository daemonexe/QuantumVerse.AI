import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import './website.css';

const pageVariants = {
  initial: { opacity: 0 },  // Start fully transparent
  animate: { opacity: 1, transition: { duration: 0.5 } }, // Fade in over 0.5s
  exit: { opacity: 0, transition: { duration: 0.25 } } // Fade out over 0.25s
};

motion;

function NewPage() {
  return (
    <motion.div
      className="newpage"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="lp">
        <div className="navbar"> 
          <button className="navButtonSelected"> HOME</button>
          <button className="navButton"> SUMMARY</button>
          <button className="navButton"> CHARACTERS</button>
          <button className="navButton"> QUIZ</button>
        </div>

        <div className="movieCard">
        <img className="movieBg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimEHbz4Blzqgcu0-qbS9jHLEKoeuxb7VwXg&s"></img>
        

        <div className="coverimage"></div>
        <div className="movie-content"></div>


        </div>







      </div>

    </motion.div>
  );
}

export default NewPage;

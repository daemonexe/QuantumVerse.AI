import { useState } from 'react';
import { motion } from "framer-motion";
import './App.css';
import Home from './Home.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from './content.jsx';
import SumPage from './SummaryPage.jsx';
import Quiz from './Quiz.jsx';


function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Content />} /> 
      <Route path="/summary" element={<SumPage />} /> 
      <Route path="/quiz" element={<Quiz />} /> 

      </Routes>
    </Router>
    </>
  );

}

export default App;

import { useState } from 'react';
import { motion } from "framer-motion";
import './App.css';
import Home from './Home.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from './content.jsx';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/content" element={<Content />} /> 

      </Routes>
    </Router>
    </>
  );

}

export default App;

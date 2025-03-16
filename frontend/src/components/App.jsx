import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import HeaderNav from "./Header";
import Body from "./Body";
import Quiz from "./Quiz";

function App() {
  const [searchText, setSearchText] = useState(""); // ✅ Stores final search query

  return (
    <Router>
      {/* ✅ Pass setter function so HeaderNav can update searchText */}
      <HeaderNav setSearchText={setSearchText} />

      {/* ✅ Use searchText inside Routes */}
      <Routes>
        <Route path="/" element={<Body title={searchText} />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;

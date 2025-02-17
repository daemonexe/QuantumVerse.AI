import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react"; // Import useState
import HeaderNav from "./Header";
import MovieHeader from "./MovieHeader";
import Body from "./Body";

function App() {
  const [searchText, setSearchText] = useState(""); // Stores final search query

  return (
    <Router>
      {/* Pass setter function to update searchText when search is clicked */}
      <HeaderNav setSearchText={setSearchText} />
      
      {/* Display searched text in MovieHeader */}
      <MovieHeader searchText={searchText} />

      <Body />
    </Router>
  );
}

export default App;

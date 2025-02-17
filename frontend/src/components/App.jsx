import { BrowserRouter as Router } from "react-router-dom";
import HeaderNav from "./Header";
import MovieHeader from "./MovieHeader";
import Body from "./Body";

function App() {
  return (
    <Router>
      <HeaderNav></HeaderNav>
      <MovieHeader/>
      <Body></Body>
    </Router>
    
  );
}

export default App;

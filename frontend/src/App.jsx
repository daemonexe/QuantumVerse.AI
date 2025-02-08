import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ marginTop: "80px", textAlign: "center" }}>
      </div>
    </Router>
  );
}

export default App;

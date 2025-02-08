import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
      </ul>
    </nav>
  );
};

// Updated CSS Styles
const styles = {
  navbar: {
    position: "fixed",  // Fixes navbar to the top
    top: 0,             // Aligns it at the very top
    left: 0,            // Aligns it to the left
    width: "100%",      // Stretches it across the screen
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#222",
    color: "white",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", // Adds a slight shadow
    zIndex: 1000,      // Ensures it stays above other content
  },
  logo: {
    margin: 0,
    fontSize: "24px",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    padding: "10px 15px",
  }
};

export default NavBar;

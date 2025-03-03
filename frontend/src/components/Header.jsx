import { useState } from "react";
import "../css/Header.css"; 
import icon from "../assets/icon.png";
import searchIcon from "../assets/search.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"

function HeaderNav({ setSearchText }) {  // Accept setSearchText prop
    const [inputText, setInputText] = useState(""); // Local state for input field

    const handleInputChange = (event) => {
        setInputText(event.target.value); // Update local input state
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        setInputText("");

        try{
            const response = await fetch("http://localhost:5000/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movieName: inputText }),
            });

            const data = await response.json();
            console.log(`server response ${data.Poster}`);
            setSearchText(data.Title);

        }catch{
            console.error("Error sending search query:");
        }

    };

    return (
        <div className="topbar">
            <img className="companyLogo" src={icon} alt="Company Logo" />
            <h1 className="company-name">QuantVerse.AI</h1>
            <div className="movie-box">
            <nav>
                <ul className="nav-menu">
                    <li><Link to="/">Summary</Link></li>
                    <li><Link to="/characters">Characters</Link></li>
                    <li><Link to="/references">References</Link></li>
                    <li><Link to="/quotes">Quotes</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                </ul>
            </nav>
        </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    className="search-box"  
                    placeholder="Enter movie name"
                    value={inputText} 
                    onChange={handleInputChange} 
                />
                <button className="search-button" type="submit">
                    <img src={searchIcon} alt="Search" style={{ width: "35px", height: "35px" }} />
                </button>
            </form>
        </div>
    );
}

export default HeaderNav;


HeaderNav.propTypes = {
    setSearchText: PropTypes.string, // Validate `searchText` as a string
};


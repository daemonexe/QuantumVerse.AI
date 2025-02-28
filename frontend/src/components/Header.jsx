import { useState } from "react";
import "../css/Header.css"; 
import icon from "../assets/icon.png";
import searchIcon from "../assets/search.png";

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
            console.error("Error sending search query:", error);
        }

    };

    return (
        <div className="topbar">
            <img className="companyLogo" src={icon} alt="Company Logo" />
            <h1 className="company-name">QuantVerse.AI</h1>

            
        
            <div className="movie-box">
            <nav>
                <ul className="nav-menu">
                    <li><a href="index.html">Summary</a></li>
                    <li><a href="about.html">Characters</a></li>
                    <li><a href="services.html">References</a></li>
                    <li><a href="contact.html">Quotes</a></li>
                    <li><a href="contact.html">Quiz</a></li>
                </ul>
            </nav>
        </div>






            <form className="search-container" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    className="search-box"  
                    placeholder="Enter movie name"
                    value={inputText} // Controlled input
                    onChange={handleInputChange} // Updates inputText state
                />
                <button className="search-button" type="submit">
                    <img src={searchIcon} alt="Search" style={{ width: "35px", height: "35px" }} />
                </button>
            </form>
        </div>
    );
}

export default HeaderNav;

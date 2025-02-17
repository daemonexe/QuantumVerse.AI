import { useState } from "react";
import "../css/Header.css"; 
import icon from "../assets/icon.png";
import searchIcon from "../assets/search.png";

function HeaderNav() {
    const [searchText, setSearchText] = useState(""); // State to store input value

    const handleInputChange = (event) => {
        setSearchText(event.target.value); // Update state on user input
    };

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form submission from refreshing page
        console.log("User searched for:", searchText); // Output search value (you can use this for API calls)
    };

    return (
        <div className="topbar">
            <img className="companyLogo" src={icon} alt="Company Logo" />
            <h1 className="company-name">QuantVerse.AI</h1>

            <form className="search-container" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    className="search-box"  
                    placeholder="  Enter movie name"
                    value={searchText} // Controlled input
                    onChange={handleInputChange} // Update state when user types
                />
                <button className="search-button">
                <img src={searchIcon} alt="Search" style={{ width: "35px", height: "35px" }} />
                </button>
            </form>
        </div>
    );
}

export default HeaderNav;



import "../css/MovieBox.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types"

function MovieCard({ title }) {
    const [posterImage, setPosterImage] = useState(""); // Local state for input field
    const [ratingImdb, setImdbRating] = useState("");
    const [Genre, setGenre] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        if (!title) return; 

        const fetchMovie = async () => {
            try {
                const response = await fetch("http://localhost:5000/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieName: title }), // ✅ Use title instead of inputText
                });

                const data = await response.json();
                console.log(`🎬 Server Response (Poster): ${data.Poster}`); 
                setPosterImage(data.Poster);
                const imdbRating = data.Ratings.find(r => r.Source === "Internet Movie Database")?.Value;
                const type = data.Genre;
                setYear(data.Year);
                setGenre(type);
                setImdbRating(imdbRating);
                console.log(`rating :  ${imdbRating}`);
            } catch (error) {  
                console.error("❌ Error fetching movie:", error);
            }
        };

        fetchMovie();

    }, [title]); 

    console.log(`posterImage is ${posterImage}`);
    return (
        <div className="movie-card">
            <div className="poster-image">
            <img src={posterImage}/>
            
            </div>
            <div className="info">
                <p className="mov-name">{title} </p>
                <p className="rating"> {ratingImdb}</p>
                <p className="year"> {year}</p>
                <p className="catogery">{Genre}</p>
                
            </div>
        </div>
    );
}

export default MovieCard;

MovieCard.propTypes = {
    title: PropTypes.string, 
};
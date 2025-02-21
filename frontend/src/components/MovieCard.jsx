import "../css/MovieBox.css";
import { useState, useEffect } from "react";

function MovieCard({ title }) {
    const [posterImage, setPosterImage] = useState(""); // Local state for input field

    useEffect(() => {
        if (!title) return; // ✅ Prevents API call if title is empty

        const fetchMovie = async () => {
            try {
                const response = await fetch("http://localhost:5000/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieName: title }), // ✅ Use title instead of inputText
                });

                const data = await response.json();
                console.log(`🎬 Server Response (Poster): ${data.Poster}`); // ✅ Logs Poster URL
                setPosterImage(data.Poster);
                console.log(`📜 summary : ${data.summary}`);

            } catch (error) {  // ✅ Catch receives error parameter
                console.error("❌ Error fetching movie:", error);
            }
        };

        fetchMovie();

    }, [title]); 

    console.log(`posterImage is ${posterImage}`);
    return (
        <div className="movie-card">
            <img src={posterImage}/>
        </div>
    );
}

export default MovieCard;

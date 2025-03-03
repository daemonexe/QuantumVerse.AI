import { useState, useEffect } from "react";
import "../css/MovieBox.css";
import PropTypes from "prop-types"; 

function Summary({ movieName }) {
    const [summary, setSummary] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await fetch("http://localhost:5000/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieName }),
                });

                const data = await response.json();
                if (response.ok) {
                    setSummary(data.summary);
                    const formattedSummary = data.summary.replace(/\*\*(.*?)\*\*/g, "<br><br><b>$1</b><br><br>");
                    setSummary(formattedSummary);
                } else {
                    setSummary("Summary not available.");
                }
            } catch (err) {
                setSummary(`Error fetching summary. ${err} `);
            }
        };

        if (movieName) fetchSummary();
    }, [movieName]);

    return (
        <div className="summary-box">
            <p dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
    );
}


Summary.propTypes = {
    movieName: PropTypes.string, 
};


export default Summary;

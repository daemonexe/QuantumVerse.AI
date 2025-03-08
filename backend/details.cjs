
// details.cjs
console.log("Running details.cjs 🟢")
// retrieves the details of the movie from <OMDB> api including poster image, runtime, year, etc...
// Function to fetch movie details from OMDB API
async function fetchMovieDetails(movieName) {
    let OMDB_API_KEY = process.env.OMDB_API_KEY


    try {
        const fetch = (await import("node-fetch")).default;
        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(movieName)}`);
        
        const data = await response.json();


        if (data.Response === "False") {
            console.error(`❌ Movie not found: ${movieName}`);
            return null;
        }
        console.log(data);
        return data;
    } catch (error) {
        console.error("❌ Error fetching movie details:", error.message);
        return null;
    }
}

// Export function for CommonJS
module.exports = { fetchMovieDetails };

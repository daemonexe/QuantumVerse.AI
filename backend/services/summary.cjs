const fetch = require("node-fetch"); 
const { Groq } = require("groq-sdk");

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

// ✅ Function to generate movie summary using Groq AI
async function getGroqChatCompletion(prompt) {
    try {
        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: `Write a summary about ${prompt}, also include summary for each season, 
                Just start with summary no title needed and ensure proper spacing if it has seasons start like summary,
                i dont need overall at the end but seasons in ** ** 
                dont start with the first seasons just say what happens be concise` }],
            model: "llama-3.2-11b-vision-preview",
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("❌ Error making Groq API request:", error.message);
        return "Summary not available.";
    }
}


// ✅ Function to fetch movie details and generate summary
async function getMovieSummary(movieName) {
    console.log(`🔍 Fetching OMDB data for movie: ${movieName}`);

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}`);
        const data = await response.json();

        if (data.Response === "False") {
            return { error: "Movie not found" };
        }

        const summary = await getGroqChatCompletion(movieName);
        console.log("📜 Summary received:", summary);

        return { ...data, summary };
    } catch (error) {
        console.error("❌ Error fetching movie data:", error);
        return { error: "Internal Server Error" };
    }
}

module.exports = { getMovieSummary };

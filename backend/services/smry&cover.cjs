require("dotenv").config();
const fetch = require("node-fetch"); 
const { Groq } = require("groq-sdk"); 
const app = require("./app.cjs");

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

async function getGroqChatCompletion(prompt) {
    try {
        const { movieName } = req.body;
        if (!movieName) {
            return res.status(400).json({ error: "Movie name is required" });
        }

        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}`);
        const data = await response.json();

        if (data.Response === "False") {
            return res.status(404).json({ error: "Movie not found" });
        }

        const summary = await getGroqChatCompletion(movieName);
        res.json({ ...data, summary });

    } catch (error) {
        console.error("❌ Error fetching from OMDB:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

app.post("/generateSummary", async (req, res) => {
    console.log("📡 Received request on /generateSummary");

    const { movieName } = req.body;
    if (!movieName) {
        console.log("❌ Missing movieName in request!");
        return res.status(400).json({ error: "Movie name is required" });
    }

    console.log(`🔍 Fetching OMDB data for movie: ${movieName}`);

    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}`);
    const data = await response.json();

    if (data.Response === "False") {
        return res.status(404).json({ error: "Movie not found" });
    }

    const summary = await getGroqChatCompletion(movieName);
    console.log("📜 Summary received:", summary);

    res.json({ ...data, summary });
});

console.log("✅ Summary module loaded!");

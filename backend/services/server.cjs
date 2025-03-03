require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); 
const { Groq } = require("groq-sdk"); 
const connectDB = require("./connect.cjs"); 

const app = express();
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

const groq = new Groq({ apiKey: GROQ_API_KEY });

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

app.post("/search", async (req, res) => {
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

        console.log("\n🎬 Movie Data from OMDB:", JSON.stringify(data, null, 2));
        console.log("📜 Groq Summary:", summary);

        res.json({ ...data, summary });
    } catch (error) {
        console.error("❌ Error fetching from OMDB:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log("\n🕛 Server Started -> (Groq and OMDB API)");
});

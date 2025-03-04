require("dotenv").config();
const { Groq } = require("groq-sdk"); 
const app = require("./app.cjs");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

async function getGroqQuestions(prompt) {
    try {
        const response = await groq.chat.completions.generate({
            messages: [{ role: "user", content: `Give me 10 questions about ${prompt}, only events that happened inside the movie, no real-world knowledge.` }],
            model: "llama-3.2-11b-vision-preview",
        });

        return response.choices[0]?.message?.content || "No questions available.";
    } catch (error) {
        console.error("❌ Error generating questions:", error.message);
        return "Questions not available.";
    }
}

app.post("/search", async (req, res) => {
    console.log("📡 Received request on /generateQuestions");

    const { movieName } = req.body;
    if (!movieName) {
        console.log("❌ Missing movieName in request!");
        return res.status(400).json({ error: "Movie name is required" });
    }

    console.log(`🔍 Generating questions for movie: ${movieName}`);

    const questions = await getGroqQuestions(movieName);
    console.log("📜 Questions received:", questions);

    res.json({ questions });
});

console.log("✅ Questions module loaded!");

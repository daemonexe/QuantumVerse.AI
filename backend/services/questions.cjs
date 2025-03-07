const { Groq } = require("groq-sdk");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

// ✅ Function to generate quiz questions using Groq AI
async function generateQuestions(prompt) {
    try {
        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: `Generate 10 questions about the ${prompt} testing the knowledge of the movie` }],
            model: "llama-3.2-11b-vision-preview",
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("❌ Error making Groq API request:", error.message);
        return "Summary not available.";
    }
}


// ✅ Function to fetch quiz questions for a movie
async function getMovieQuestions(movieName) {
    console.log(`🔍 Generating questions for movie: ${movieName}`);

    try {
        const questions = await generateQuestions(movieName);
        console.log("📜 Questions received:", questions);
        return { questions };
    } catch (error) {
        console.error("❌ Error generating questions:", error);
        return { error: "Internal Server Error" };
    }
}

module.exports = { getMovieQuestions };

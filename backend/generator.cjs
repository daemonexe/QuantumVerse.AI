// generator.cjs
console.log("Running generator.cjs 🟢")
// Sub-server file to generate quiz content and summary which gets stored in JSON

const { Groq } = require("groq-sdk");
require("dotenv").config();

// Ensure API key exists
if (!process.env.GROQ_API_KEY) {
    console.error("❌ Missing GROQ_API_KEY. Please set your API key in environment variables.");
    process.exit(1);
}
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


// Function to generate quiz content JSON using Groq AI
async function getQuizContentJSON(prompt, movie) {
    try {

        let valid_json = false;
        while (!valid_json)
        {
            const response = await groq.chat.completions.create({
                messages: [{ role: "user", content: `${prompt} ${movie}` }],
                model: "llama-3.2-11b-vision-preview",
            });
    
            let quizContent = response.choices[0].message.content;
            try{
                JSON.parse(quizContent)
                console.log("valid json file")
                valid_json = true;
                return quizContent;

            }catch
            {
                console.log('failed miserably');
            }
        }


    } catch (error) {
        console.error("❌ Error making Groq API request:", error.message);
        return "Quiz content not available.";
    }
}

// Function to generate movie summary using Groq AI
async function getMovieSummary(prompt, movie) {
    try {
        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: `${prompt} ${movie}` }],
            model: "llama-3.2-11b-vision-preview",
        });

        if (!response?.choices?.length) {
            throw new Error("Invalid response from Groq API.");
        }

        let summary = response.choices[0].message.content;
        console.log(summary);
        return summary;

    } catch (error) {
        console.error("❌ Error making Groq API request:", error.message);
        return "Summary not available.";
    }
}

async function isValid(prompt, movie) {
    try {
        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: `${prompt} ${movie}` }],
            model: "llama-3.2-11b-vision-preview",
        });

        if (!response?.choices?.length) {
            throw new Error("Invalid response from Groq API.");
        }

        let bool = response.choices[0].message.content;
        return bool;

    } catch (error) {
        console.error("❌ Error making Groq API request:", error.message);
        return "Summary not available.";
    }
}


// ✅ Export functions
module.exports = { getMovieSummary, getQuizContentJSON, isValid };

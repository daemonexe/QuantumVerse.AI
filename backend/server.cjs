// server.js
// main server file (backend) of the program

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {fetchMovieDetails} = require("./details.cjs")
const {getMovieSummary, getQuizContentJSON} = require('./generator.cjs');
const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(bodyParser.json()); 

let summaryPrompt = "Write a summary about";
const quizPrompt = `
Generate a JSON-formatted quiz set with 15 trivia questions about the movie "{movieName}". 
The JSON must strictly follow this format:

{
  "questions": [
    {
      "question": "A trivia question about the movie",
      "answer": "The correct answer",
      "options": [
        "Correct answer",
        "Incorrect option 1",
        "Incorrect option 2",
        "Incorrect option 3"
      ]
    }
  ]
}

Requirements:
1. **Use proper JSON formatting** with double quotes (\") around all keys and string values.
2. **Do NOT use single quotes (')** anywhere in the JSON output.
3. Generate **exactly 15 medium-level questions** related to the movie’s **plot, characters, or production details**.
4. The correct answer **must always be the first in the options list**, but **shuffle other options randomly**.
5. **Ensure all options are relevant** and not obviously incorrect.
6. **Do NOT include any explanations or additional text** outside the JSON format.
7. The response must be a **pure JSON structure**, with no markdown, explanations, or extra text.
8. this output is gonna be a string in js, so do not add special characters like / the other one etc.
`;

module.exports = { quizPrompt };


// POST endpoint to receive movie name
app.post('/search', async (req, res) => {
    const { movieName } = req.body;

    if (!movieName) {
        return res.status(400).json({ error: "Movie name is required" });
    }

    // API calls and responses..
    let summary = await getMovieSummary(summaryPrompt,movieName);
    let questions = await getQuizContentJSON(quizPrompt, movieName);
    let questionJSON = JSON.parse(questions);
    let movieData = await fetchMovieDetails(movieName);

    // returning a .JSON file containing all the details needed to be filled in 
    res.json({ movieName: movieName, movieSummary: summary, 
        quizContent: questionJSON, details : movieData });

});

app.listen(PORT, () => {
    console.log(`>> Server running on http://localhost:${PORT}`);
});

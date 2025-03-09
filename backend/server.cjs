// server.js
// main server file (backend) of the program

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {fetchMovieDetails} = require("./details.cjs")
const {getMovieSummary, getQuizContentJSON, isValid} = require('./generator.cjs');
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

### Strict Formatting Rules:
1. **The output must be a valid JSON string**, correctly formatted for JavaScript parsing.
2. **Use ONLY double quotes (")** for keys and string values. Do **NOT** use backslashes (\\), newlines (\\n), or special escape sequences.
3. **Do NOT include any markdown, code blocks, or extra explanations**. The response must be **pure JSON only**.
4. **Ensure exactly 15 unique trivia questions** related to the movie's **plot, characters, or production details**.
5. **The correct answer must always be the first in the options array**, but **shuffle other options randomly**.
6. **Ensure all options are realistic and related to the movie**.
7. **No non-ASCII characters, special symbols, or escape sequences.** The output must be **plain JSON text**.
8. The response **must be a valid JavaScript string** when stored in a variable—do **not** use characters that require escaping in JavaScript.

- All keys and values use double quotes ("").
- There are NO trailing commas.
- Nested arrays and objects are properly formatted.


`;

let condition = `
with your knowledge check if is a valid movie or tv show if you could not find 
anything just return a string 'false', if you did 'true'

`

module.exports = { quizPrompt };


// POST endpoint to receive movie name
app.post('/search', async (req, res) => {
    const { movieName } = req.body;

    let isMovie = await isValid(condition,movieName);

    if (!movieName) {
        return res.status(400).json({ error: "Movie name is required" });
    }
    console.log(isMovie);
    if (isMovie === "True" || "true")
    {

      
      let movieData = await fetchMovieDetails(movieName);

      let summary = await getMovieSummary(summaryPrompt,movieName);

      let questions = await getQuizContentJSON(quizPrompt, movieName);
      let questionJSON = JSON.parse(questions);

      res.json({ movieName: movieName, movieSummary: summary, 
        quizContent: questionJSON, details : movieData });

    // returning a .JSON file containing all the details needed to be filled in 

    }else{
      console.log("could not find movie sad");
    }


});

app.listen(PORT, () => {
    console.log(`>> Server running on http://localhost:${PORT}`);
});

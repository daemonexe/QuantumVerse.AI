const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(bodyParser.json()); 

// POST endpoint to receive movie name
app.post('/search', (req, res) => {
    const { movieName } = req.body;

    if (!movieName) {
        return res.status(400).json({ error: "Movie name is required" });
    }

    // TO DO :: summary comes here
    // TO DO :: Cover Page comes here
    // TO DO :: Quiz Questions comes here 

    res.json({ movieName: movieName });

});

app.listen(PORT, () => {
    console.log(`🤓 >> Server running on http://localhost:${PORT}`);
});

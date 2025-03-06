const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Use axios for better error handling

const app = express();
//

// ✅ Correct CORS setup: Allow frontend requests from localhost:3000
app.use(cors({
    origin: "*",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

app.use(express.json()); // Enable JSON body parsing

// ✅ API route to receive data from frontend
app.post("/api/data", async (req, res) => {
    try {
        const { text, checked } = req.body;

        console.log("🟢 Received Data:");
        console.log("Text Input:", text);
        console.log("Checkbox State:", checked);

        const apiKey = "3816ca8e";
        const movieTitle = text;

        // ✅ Fetch movie poster from OMDb using axios (with await)
        const response = await axios.get(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`);

        // Check if movie exists
        if (response.data.Response === "False") {
            return res.status(404).json({
                message: "Movie not found!",
                receivedText: text,
                receivedChecked: checked,
                URL: null
            });
        }

        // ✅ Extract poster URL
        const posterURL = response.data.Poster;
        console.log("🖼️ Stored Poster URL:", posterURL);

        // ✅ Send back confirmation response
        res.json({
            message: "Data received successfully!",
            receivedText: text,
            receivedChecked: checked,
            URL: posterURL
        });

    } catch (error) {
        console.error("❌ Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Start backend server
app.listen(5000, () => {
    console.log("🔵 Backend running on port 5000");
});

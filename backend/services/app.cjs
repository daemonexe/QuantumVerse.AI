require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware to parse JSON request bodies
app.use(express.json());

// ✅ Enable CORS for all origins
app.use(cors({
    origin: "*",  // ✅ Allow requests from any frontend
    methods: ["POST", "GET", "OPTIONS"], // ✅ Ensure all necessary methods are allowed
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow essential headers
    credentials: true
}));

// ✅ Handle preflight requests properly
app.options("*", cors());

console.log("✅ Express app initialized with CORS");

module.exports = app;

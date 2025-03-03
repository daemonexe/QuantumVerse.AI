const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

// MongoDB Connection Function
async function connectDB() {
    try {
        const DB = process.env.ATLAS_URI;
        if (!DB) {
            throw new Error("❌ MongoDB URI not found in .env file");
        }

        const client = new MongoClient(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await client.connect();
        console.log("✅ MongoDB Connected Successfully");
        
        return client.db("quizcontent"); 
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

// Call Database Connection
connectDB();
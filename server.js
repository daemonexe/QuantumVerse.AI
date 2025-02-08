import Groq from "groq-sdk";
import dotenv from "dotenv";
import readline from "readline";

// Load environment variables from .env
dotenv.config();

// Ensure the API key is loaded
if (!process.env.GROQ_API_KEY) {
  console.error("❌ Error: GROQ_API_KEY is missing! Check your .env file.");
  process.exit(1);
}

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to get user input in Node.js
function askQuestion(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Function to send prompt to Groq API
export async function getGroqChatCompletion(prompt) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `write a summary about ${prompt}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return response;
  } catch (error) {
    console.error("❌ Error making Groq API request:", error.message);
    return null;
  }
}

// Main function to run the request
export async function main() {
    while (true)
    {
        const userInput = await askQuestion("Write a character name to write a summary: ");

        if (!userInput.trim()) {
          console.log("❌ Error: You must enter a prompt.");
          process.exit(1);
        }
      
        console.log("🔹 Sending prompt:", userInput);
        const chatCompletion = await getGroqChatCompletion(userInput);
      
        if (chatCompletion) {
          console.log("\n✨ AI Response:\n", chatCompletion.choices[0]?.message?.content || "No response received.");
        } else {
          console.log("❌ AI response failed.");
        }
    }

}


main();


// Run the main function

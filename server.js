const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000; // Server will run on localhost:3000

// Route to handle chatbot messages
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: userMessage },
            {
                headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
            }
        );

        res.json({ reply: response.data.generated_text || "I couldn't process that." });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ reply: "Error: Failed to fetch response." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

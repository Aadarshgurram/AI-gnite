const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-3B";
const API_KEY = "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"; // 🔹 Replace this with your actual API key

async function sendMessage() {
    let userInput = document.getElementById("userInput").value.trim();
    let chatbox = document.getElementById("chatbox");

    if (userInput === "") return; // Prevent empty input

    // Display user message
    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Show "Typing..." while fetching response
    let typingMessage = `<p id="typing"><strong>AI:</strong> Typing...</p>`;
    chatbox.innerHTML += typingMessage;
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        // Send request to Hugging Face API
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Remove "Typing..." message
        document.getElementById("typing").remove();

        // Check if response contains text
        let botResponse = data && data.length > 0 && data[0].generated_text ? data[0].generated_text : "Sorry, I couldn't generate a response.";

        // Display AI response
        chatbox.innerHTML += `<p><strong>AI:</strong> ${botResponse}</p>`;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("typing").remove();
        chatbox.innerHTML += `<p><strong>AI:</strong> Error fetching response. Please try again.</p>`;
    }

    // Clear input field
    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll chat
}

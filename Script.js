document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const themeToggle = document.getElementById("theme-toggle");
    const voiceBtn = document.getElementById("voice-btn");
    const imageUpload = document.getElementById("image-upload");
    
    // Toggle dark mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
    
    // Send text message
    sendBtn.addEventListener("click", () => {
        sendMessage(userInput.value);
        userInput.value = "";
    });
    
    // Handle Enter key
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage(userInput.value);
            userInput.value = "";
        }
    });
    
    // Voice input
    voiceBtn.addEventListener("click", () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.start();
        recognition.onresult = (event) => {
            userInput.value = event.results[0][0].transcript;
        };
    });
    
    // Image upload handling
    imageUpload.addEventListener("change", () => {
        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                appendMessage("You", `<img src="${e.target.result}" alt="Uploaded Image" class="chat-image">`);
            };
            reader.readAsDataURL(file);
        }
    });
    
    function sendMessage(message) {
        if (message.trim() !== "") {
            appendMessage("You", message);
            setTimeout(() => appendMessage("Bot", "This is a sample response."), 1000);
        }
    }
    
    function appendMessage(sender, message) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender.toLowerCase());
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

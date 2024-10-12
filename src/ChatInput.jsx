// ChatInput.jsx
import React from "react";

function ChatInput({
  question,
  setQuestion,
  generateAnswer,
  clearConvo,
  messages,
}) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      generateAnswer();
    }
  };

  return (
    <div className="chat-input-area">
      <textarea
        className="chat-input"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={handleKeyPress}
      ></textarea>

      <div className="button-container">
        <button className="send-button" onClick={generateAnswer}>
          Send
        </button>
        {messages.length !== 0 && ( // Check if there are messages
          <button className="start-new-chat-button" onClick={clearConvo}>
            Clear Convo
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatInput;

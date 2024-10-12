// MessageList.jsx
import React from "react";
import Message from "./Message";

function MessageList({ messages, isLoading, conversationEndRef }) {
  return (
    <div className={`chat-box ${messages.length > 0 ? "visible" : ""}`}>
      <div className="conversation">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="loading-spinner"></div>
          </div>
        )}
        <div ref={conversationEndRef} />
      </div>
    </div>
  );
}

export default MessageList;

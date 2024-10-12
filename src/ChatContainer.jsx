import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./App.css";

function ChatContainer() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const conversationEndRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function generateAnswer() {
    if (!question.trim()) return;

    const userMessage = { text: question, type: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setQuestion("");
    setIsLoading(true);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAPFXoan2kbPKVdN0XB2YwQbK2UJdlvj0M",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const botResponse = response.data.candidates[0].content.parts[0].text;
      const codeBlockMatch = botResponse.match(/^```(\w+)?\n([\s\S]*?)\n```$/);
      const isCodeResponse = !!codeBlockMatch;

      const formattedResponse = isCodeResponse
        ? {
            language: codeBlockMatch[1] || "plaintext",
            code: codeBlockMatch[2].trim(),
          }
        : botResponse;

      const botMessage = {
        text: formattedResponse,
        type: isCodeResponse ? "code" : "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error generating answer:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to clear all messages and reset the question
  const clearConvo = () => {
    setMessages([]); // Clear all messages
    setQuestion(""); // Clear the input field
  };

  return (
    <div className="chat-container">
      <div className="exclamation-mark">!</div> {/* Add Exclamation Mark */}
      <h1 className="title">AI Chat App</h1>
      <MessageList
        messages={messages}
        isLoading={isLoading}
        conversationEndRef={conversationEndRef}
      />
      <ChatInput
        question={question}
        setQuestion={setQuestion}
        generateAnswer={generateAnswer}
        clearConvo={clearConvo} // Pass the clearConvo function to ChatInput
        messages={messages}
      />
    </div>
  );
}

export default ChatContainer;

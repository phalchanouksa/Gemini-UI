// Message.jsx
import React from "react";

function Message({ msg }) {
  return (
    <div className={`message ${msg.type}-message`}>
      {msg.type === "code" ? (
        <pre className="code-snippet">
          <code className={`language-${msg.text.language}`}>
            {msg.text.code}
          </code>
        </pre>
      ) : (
        msg.text
      )}
    </div>
  );
}

export default Message;

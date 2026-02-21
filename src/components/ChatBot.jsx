import { useState } from "react";

const MyChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Welcome to our store!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };

    const botReply = {
      text: "Thanks for contacting us! Our team will assist you shortly.",
      sender: "bot",
    };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button (RIGHT SIDE) */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",   // ✅ RIGHT SIDE
          background: "#2563eb",
          color: "white",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",  // ✅ RIGHT SIDE
            width: "340px",
            height: "420px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#2563eb",
              color: "white",
              padding: "12px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Customer Support
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              fontSize: "14px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 14px",
                    borderRadius: "18px",
                    background:
                      msg.sender === "user" ? "#2563eb" : "#f1f5f9",
                    color: msg.sender === "user" ? "white" : "#111",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #eee",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "6px",
                padding: "8px 14px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyChatBot;

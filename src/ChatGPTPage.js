import React, { useState } from "react";
import axios from "axios";

const chatGPTApiKey = process.env.REACT_APP_OPENAI_API_KEY_GPT;

function ChatGPTPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setChat((prevChat) => [...prevChat, newMessage]);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            ...chat.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: chatGPTApiKey, // OpenAI API 키 입력
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.choices[0].message.content, // 또는 response.data.choices[0].text
      };
      setChat((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ChatGPT와 대화하기</h1>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                backgroundColor: msg.sender === "user" ? "#d1f7d6" : "#f1f1f1",
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <strong>{msg.sender === "user" ? "나: " : "ChatGPT: "}</strong>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        style={{ width: "70%", padding: "10px" }}
        placeholder="메시지를 입력하세요"
      />
      <button
        onClick={handleSendMessage}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        전송
      </button>
    </div>
  );
}

export default ChatGPTPage;

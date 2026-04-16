import { useEffect, useState, useRef } from "react";
import API from "../../utils/apiClient";

function ChatWindow({ user, triggerRefresh, updateSelectedUser }) {
 if (!user) return <div className="no-chat">Select a chat</div>;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  
  const storedUser = JSON.parse(localStorage.getItem("USER"));
  const myId = storedUser?._id?.toString();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
        fetchMessages();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    const res = await API.get(`/chat/${user._id}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const newMsg = text;

    await API.post("/chat", {
      receiverId: user._id,
      message: text
    });

    setText("");
    
    // update messages instantly
    setMessages(prev => [
      ...prev,
      { message: newMsg, sender: myId }
    ]);

    // update ChatList instantly
    updateSelectedUser(prev => ({
      ...prev,
      lastMessage: newMsg
    }));
    
    triggerRefresh();

    console.log("MY ID:", myId);
    console.log("MESSAGE:", messages[0]);
  };

  return (
    <div className="chat-window">

      {/* HEADER */}
      <div className="chat-header">
        <span className="back" onClick={() => window.history.back()}>
            ←
        </span>

        <img
          src={
            user.profilePic
              ? `http://localhost:8080/uploads/${user.profilePic}`
              : "https://via.placeholder.com/50"
          }
          alt=""
        />

        <h4>{user.fullName}</h4>
      </div>

      {/* MESSAGES */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender?.toString() === myId
                ? "msg sent"
                : "msg received"
            }
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT */}
      <div className="chat-input">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>

      </div>

    </div>
  );
}

export default ChatWindow;
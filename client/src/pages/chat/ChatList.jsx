import { useEffect, useState } from "react";
import API from "../../utils/apiClient";

function ChatList({ onSelectUser , selectedUser, refreshChats }) {
  const [users, setUsers] = useState([]);

useEffect(() => {
  fetchChats();

  const interval = setInterval(fetchChats, 3000); // auto refresh
  return () => clearInterval(interval);
}, [refreshChats]);

  const fetchChats = async () => {
    try {
      const res = await API.get("/chat/users"); // backend
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const allUsers = users
    .map(u => u._id === selectedUser?._id ? selectedUser : u)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="chat-list">

      <h3>Messages</h3>

      {allUsers.map((u) => (
        <div
          key={u._id}
          className="chat-user"
          onClick={() => onSelectUser(u)}
        >
          <img
            src={
              u.profilePic
                ? `http://localhost:8080/uploads/${u.profilePic}`
                : "https://via.placeholder.com/50"
            }
            alt=""
          />

          <div>
            <h4>{u.fullName}</h4>
            <p>{u.lastMessage || "Start chat..."}</p>
          </div>
        </div>
      ))}

    </div>
  );
}

export default ChatList;
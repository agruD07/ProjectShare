import { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

import "../../assets/styles/chat.css";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();
  const [refreshChats, setRefreshChats] = useState(false);

  useEffect(() => {
    if (location.state) {
        setSelectedUser(location.state);
    }
  }, [location.state]);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="chat-container">

          {/* LEFT */}
          <ChatList 
            onSelectUser={setSelectedUser} 
            selectedUser={selectedUser}
            refreshChats={refreshChats}
          />

          {/* RIGHT */}
          {selectedUser ? (
            <ChatWindow 
              user={selectedUser} 
              triggerRefresh={() => setRefreshChats(prev => !prev)}
              updateSelectedUser={setSelectedUser}
            
            />
          ) : (
            <div className="no-chat">
              Select a chat to start messaging
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Chat;
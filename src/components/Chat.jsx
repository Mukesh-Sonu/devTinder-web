import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // message structure:
  //   const message[] = {
  //     text,
  //     senderId: {
  //       _id: "6a00694afab696fb4561ee1a",
  //       firstName: "Mukesh",
  //       lastName: "S",
  //     },
  //     id, // unique id for Key in UI (Record Id)
  //   };

  const [newMessage, setNewMessage] = useState("");

  const fetchChats = async () => {
    try {
      const reposne = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chats = reposne.data.data;
      console.log(chats, "Chats");

      setMessages(chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;

    const socket = createSocketConnection();

    // As soon as the page loaded, the socket connection is made and joinChat even is emitted
    socket.emit("joinChat", {
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ text, senderId, id }) => {
      setMessages((prevMessages) => [...prevMessages, { text, senderId, id }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, targetUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId: user?.id,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex justify-center w-full h-full p-2">
      <div className="border-2 border-gray-700 flex flex-col w-4/5 bg-base-300">
        {/* Header */}

        <div className="border p-2 border-gray-700">
          <p className="text-center text-2xl">Chat</p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-scroll p-4">
          {messages.map(({ text, id, senderId }) => {
            const { firstName, lastName, _id, photoUrl } = senderId;
            const isUser = user?.id == _id; // IF FROMID is currentUser then its left side

            return (
              <div key={id}>
                <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={photoUrl}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {firstName + " " + lastName}
                    {/* <time className="text-xs opacity-50">12:45</time> */}
                  </div>
                  <div className="chat-bubble">{text}</div>
                  {/* <div className="chat-footer opacity-50">Delivered</div> */}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer to send message */}
        <div className="flex gap-2 p-2">
          <input
            type="text"
            placeholder="Type here"
            className="input flex-1"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="btn btn-primary"
            onClick={handleSendMessage}
            onSubmit={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

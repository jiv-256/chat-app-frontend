import React, { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import Avatar from "boring-avatars";
import { useNavigate } from "react-router-dom";
import useChatContext from "../context/ChatContext";
import SockJS from "sockjs-client";
import { baseUrl } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getMessages } from "../services/RoomService";
import { timeAgo } from "../config/Helper";

function Chatpage() {
  const {
    connected,
    setConnected,
    roomId,
    setRoomId,
    currentUser,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const inputref = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate("/", { replace: true });
    }
  }, [connected, roomId, currentUser]);

  // ✅ LOAD + POLLING (IMPORTANT FIX)
  useEffect(() => {
    let interval;

    async function loadMessage() {
      try {
        const msgs = await getMessages(roomId);

        // ✅ sorting fix
        const sorted = msgs.sort(
          (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
        );

        setMessages(sorted);
      } catch (error) {
        console.log(error);
      }
    }

    if (connected) {
      loadMessage();

      // 🔥 polling every 10 sec (for TTL sync)
      interval = setInterval(() => {
        loadMessage();
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connected, roomId]);

  // ✅ WEBSOCKET CONNECT
  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseUrl}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);

          // ✅ duplicate prevention
          setMessages((prev) => {
            const exists = prev.find(
              (msg) =>
                msg.sender === newMessage.sender &&
                msg.content === newMessage.content &&
                msg.timeStamp === newMessage.timeStamp
            );
            if (exists) return prev;

            return [...prev, newMessage];
          });
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }
  }, [roomId]);

  // scroll to bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      requestAnimationFrame(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      });
    }
  }, [messages]);

  // send message
  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );

      setInput("");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <header className="dark:border-gray-700 h-auto md:h-20 fixed w-full dark:bg-gray-900 shadow py-3 md:py-5 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 gap-2 z-10">
        <h1 className="text-sm md:text-xl font-semibold">
          Room : <span>{roomId}</span>
        </h1>

        <h1 className="text-sm md:text-xl font-semibold">
          User : <span>{currentUser}</span>
        </h1>

        <button
          className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-1 md:py-2 text-sm md:text-base rounded-full"
          onClick={() => {
            if (stompClient) stompClient.disconnect();
            setConnected(false);
            setRoomId("");
            setCurrentUser("");
            localStorage.clear();
          }}
        >
          Leave Room
        </button>
      </header>

      {/* CHAT AREA */}
      <main
        ref={chatBoxRef}
        className="pt-24 pb-24 h-screen overflow-y-auto w-full md:w-2/3 md:mx-auto px-2 md:px-0 dark:bg-slate-700"
      >
        {messages.map((message, index) => {
          const isMe = message.sender === currentUser;

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-2 items-start my-2 max-w-[80%] md:max-w-xs ${
                  isMe ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar size={35} name={message.sender} variant="beam" />

                <div
                  className={`p-2 rounded-lg ${
                    isMe ? "bg-green-800" : "bg-gray-800"
                  }`}
                >
                  <p className="text-sm md:text-base font-bold text-red-300">
                    {message.sender}
                  </p>

                  <p className="text-sm md:text-base break-words">
                    {message.content}
                  </p>

                  <p className="text-xs text-yellow-400 text-right mt-1">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* INPUT */}
      <div className="fixed bottom-2 md:bottom-6 w-full px-2">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-2/4 md:mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="dark:bg-gray-900 px-4 py-2 w-full border dark:border-gray-700 h-12 md:h-14 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <button
            onClick={sendMessage}
            className="dark:bg-green-500 h-12 w-12 md:h-14 md:w-14 flex justify-center items-center rounded-full"
          >
            <MdSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
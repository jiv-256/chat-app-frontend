import React, { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import Avatar from 'boring-avatars';
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
function Chatpage() {
  const {roomId,currentUser,connected} = useChatContext()
  console.log(roomId);
  console.log(currentUser);
  console.log(connected);

  const navigate =useNavigate();
  useEffect((
    )=>{
      if(!connected){
        navigate('/', { replace: true })
      }
    },[connected,roomId,currentUser])
  
  const [messages, setMessages] = useState([
    {
      content: "Hello ?",
      sender: "Durgesh",
    },
    {
      content: "kya kre boka kya kr rha ?",
      sender: "rajesh",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "kaisan bara chacha  ?",
      sender: "raman",
    },
    {
      content: "ka ho ka ho ta  ?",
      sender: "aman",
    },
    {
      content: "Saab badhiya hai bhai bs exam ki preparation kr rha ",
      sender: "Durgesh",
    },
    {
      content: "Hello ?",
      sender: "Durgesh",
    },
    {
      content: "Hello ?",
      sender: "Durgesh",
    },
    {
      content: "Hello ?",
      sender: "Durgesh",
    },
    {
      content: "Hello ?",
      sender: "Durgesh",
    },
    {
      content: "Hello ?",
      sender: "Durgesh",
    },
    {
      content: "Hello ?",
      sender: "Durgesh",
    },
  ]);

  const [input, setInput] = useState("");

  const inputref = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  
  return (
    <div className="">
      {/* HEADER */}
      <header className="dark:border-gray-700 h-auto md:h-20 fixed w-full dark:bg-gray-900 shadow py-3 md:py-5 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 gap-2">
        {/* room name */}
        <div>
          <h1 className="text-sm md:text-xl font-semibold">
            Room : <span>{roomId}</span> 
          </h1>
        </div>

        {/* username */}
        <div>
          <h1 className="text-sm md:text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>

        {/* button */}
        <div>
          <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-1 md:py-2 text-sm md:text-base rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      {/* content  */}
      <main className="py-20 h-screen overflow-auto w-2/3 dark:bg-slate-700 mx-auto">
        {messages.map((message, index) => (
          <div key={index} className= {`flex ${message.sender === currentUser?'  justify-end' : 'justify-start'} ${message.sender === currentUser?'mr-5' : 'ml-5'}`}>
            <div className={`my-2 ${message.sender===currentUser ?  'bg-green-800' : 'bg-gray-800' } p-2 max-w-xs rounded`} >
            <div className="flex flex-row gap-2">
                {/* <Avatar name={message.sender} />; */}
                <img className="h-10 w-10" src="https://api.dicebear.com/9.x/adventurer/svg?seed=Nolan" alt="avatar" />
                <div className=" flex flex-col gap-1">
                    <p className="text-sm font-bold">{message.sender}</p>
                    <p>{message.content}</p>
                </div>
            </div>
          </div>
          </div>
        ))}
      </main>

      {/* INPUT BOX */}
      <div className="fixed bottom-4 md:bottom-10 w-full h-14 md:h-16 px-2">
        <div className="h-full gap-2 md:gap-4 flex items-center justify-between w-full md:w-2/4 mx-auto rounded">
          <input
            type="text"
            placeholder="Type your message here ..."
            className="dark:bg-gray-900 px-3 py-2 w-full border dark:border-gray-700 h-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />

          <button className="dark:bg-green-500 h-12 w-12 md:h-14 md:w-14 flex justify-center items-center rounded-full">
            <MdSend size={18} className="md:text-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;

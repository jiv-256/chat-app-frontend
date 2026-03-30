import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [roomId, setRoomId] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [connected, setConnected] = useState(false);
    return (
        <ChatContext.Provider value={{ connected, setConnected,roomId, setRoomId, currentUser, setCurrentUser }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;
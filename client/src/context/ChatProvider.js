import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // logged in user data
  const [token, setToken] = useState(""); // logged in user - jwt token
  const [chats, setChats] = useState([]); // logged in user chats
  const [selectedChat, setSelectedChat] = useState(); //

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // parse since data in stringify format
    // console.log("userinfo : ", userInfo);

    if (userInfo === null) {
      navigate("/");
      return;
    }
    setUser(userInfo.user);
    setToken(userInfo.token);
    navigate("/chats");
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

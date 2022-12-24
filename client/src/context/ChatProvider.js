import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // parse since data in stringify format
    console.log("userinfo : ", userInfo);

    if (userInfo === null) {
      navigate("/");
      return;
    }
    console.log("user : ", userInfo.user);
    const userData = userInfo.user;
    setUser(userData);
    navigate("/chats");
  }, []);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

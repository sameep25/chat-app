import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]) ;

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
    <ChatContext.Provider value={{ user, setUser, token ,selectedChat, setSelectedChat ,chats, setChats}}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

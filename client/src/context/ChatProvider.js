import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // parse since data in stringify format

    if (!userInfo) {
      navigate("/");
    }
    setUser(userInfo);
  }, [navigate]);

  return( 
  <ChatContext.Provider value={{user, setUser}}>
    {children}
  </ChatContext.Provider>
  )
};

export default ChatProvider;

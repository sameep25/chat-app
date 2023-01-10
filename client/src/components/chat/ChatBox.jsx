import { useContext, useEffect, useState } from "react";

import { ChatContext } from "../../context/ChatProvider";

import { Box, styled, Typography } from "@mui/material";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatingBox from "./ChatingBox";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";

const Container = styled(Box)`
  margin-top: 0.5em;
  margin-right: 0.5em;
  color: white;
  height: 100%;
  overflow-y: scroll;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #0a1929;
  // background: #001e3c;
`;
// display={selectedChat ? "flex" : "none"}

const ChatBox = ({ fetchAgain, setFetchAgain, messages, setMessages }) => {
  const { user, selectedChat } = useContext(ChatContext);

  const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState();
  const [selectedChatCompare, setSelectedChatCompare] = useState();

  //initialzing socket server
  useEffect(() => {
    const socketServer = io(ENDPOINT);
    setSocket(socketServer);
  }, []);

  //setting up the socket connection with userid
  useEffect(() => {
    socket && socket.emit("setup", user);
    socket &&
      socket.on("connection", () => {
        setSocketConnected(true);
      });
  }, [socket]);

  //recieving message from backend
  useEffect(() =>{
    socket && socket.on("message-recieved", (newMessageRecieved)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
        //notifiation
      }else{
        setMessages([...messages ,newMessageRecieved])
      }
    })
  },[messages])

  return (
    <>
      {selectedChat ? (
        <>
          <Container>
            <ChatBoxHeader
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              selectedChatCompare={selectedChatCompare}
              setSelectedChatCompare={setSelectedChatCompare}
              socket={socket}
              setSocket={setSocket}
            />
            <ChatingBox
              selectedChatCompare={selectedChatCompare}
              setSelectedChatCompare={setSelectedChatCompare}
              socket={socket}
              setSocket={setSocket}
              messages={messages}
              setMessages={setMessages}
              socketConnected={socketConnected}
            />
          </Container>
        </>
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontFamily={"work sans"} variant="h5">
            Click on a user to start chating
          </Typography>
        </Container>
      )}
    </>
  );
};

export default ChatBox;

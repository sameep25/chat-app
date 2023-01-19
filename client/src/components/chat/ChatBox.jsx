import { useContext, useEffect, useState } from "react";

import { ChatContext } from "../../context/ChatProvider";

import { Box, styled, Typography } from "@mui/material";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatingBox from "./ChatingBox";

// MUI STYLED COMPONENTS
const Container = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 3px;
  height: 86vh;
  margin-right: 0.5em;
  justify-content: center;
  background: #0a1929;
`;

const ChatBox = ({ fetchAgain, setFetchAgain, socket }) => {
  const { selectedChat } = useContext(ChatContext);
  const [messages, setMessages] = useState([]); //all messages in chat

  //recieving message from backend(socket) to either display message 
  useEffect(() => {
    socket &&
      socket.on("message-recieved", (newMessageRecieved) => {
        setMessages([...messages, newMessageRecieved]);
      });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Container>
            <ChatBoxHeader
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
            <ChatingBox
              socket={socket}
              messages={messages}
              setMessages={setMessages}
            />
          </Container>
        </>
      ) : (
        // When no chat is selected
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

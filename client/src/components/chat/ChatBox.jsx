import { useContext } from "react";

import { ChatContext } from "../../context/ChatProvider";

import { Box, styled } from "@mui/material";
import SingleChat from "./singleChat/SingleChat";
import ChatBoxHeader from "./ChatBoxHeader";

const Container = styled(Box)`
  margin: 0.5em;
  color: white;
  height: 100%;
  overflow-y: scroll;
  border-radius: 3px;
  display: flex;
   flex-direction: column;
  justify-content: center;
  background:#0a1929 ;
  // background: #001e3c;
  `;
// display={selectedChat ? "flex" : "none"}
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = useContext(ChatContext);

  return (
    <Container>
      <ChatBoxHeader fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Container>
  );
};

export default ChatBox;

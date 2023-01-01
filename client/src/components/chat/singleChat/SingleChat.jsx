import { useContext, useState } from "react";

import { ChatContext } from "../../../context/ChatProvider";
import ChatingBox from "../ChatingBox";
import MessageBox from "../MessageBox";

import { Box, Typography, styled } from "@mui/material";

const Container = styled(Box)`
  background: #0a1929;
  width: 100%;
  height: 100%;
`;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const [messages, setMessages] = useState([]) ;

  return (
    <>
      {selectedChat ? (
        <>
          <Container>
            <ChatingBox messages={messages} setMessages={setMessages} />
            <MessageBox messages={messages} setMessages={setMessages}/>
          </Container>
        </>
      ) : (
        // when no chat is selected
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontFamily={"work sans"} variant="h5">
              Click on a user to start chating
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;

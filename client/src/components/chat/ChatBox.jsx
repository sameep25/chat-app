import { useContext } from "react";

import { ChatContext } from "../../context/ChatProvider";

import { Box, styled, Typography } from "@mui/material";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatingBox from "./ChatingBox";

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

const ChatBox = ({
  fetchAgain,
  setFetchAgain,
  socket,
  setSocket,
  socketConnected,
}) => {
  const { selectedChat } = useContext(ChatContext);

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
              setSocket={setSocket}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              socketConnected={socketConnected}
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

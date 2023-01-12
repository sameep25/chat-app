import { useContext, useEffect, useState } from "react";

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
  setSelectedChatCompare,
  selectedChatCompare,
  setSocket,
  socketConnected,
}) => {
  const { user, selectedChat, notifications, setNotifications } =
    useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  //recieving message from backend

  useEffect(() => {
    socket &&
      socket.on("message-recieved", (newMessageRecieved) => {
        // console.log(newMessageRecieved.chat._id);
        // console.log("selected chat id : " ,selectedChat._id || "no chat selected" );

        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          console.log("noti");
          // console.log("newMessageRecieved:" ,newMessageRecieved );
          // console.log("selectedChat:" ,selectedChat );
          if (!notifications.includes(newMessageRecieved)) {
            setNotifications([newMessageRecieved, ...notifications]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          console.log("message");
          setMessages([...messages, newMessageRecieved]);
        }
      });
  }, [messages, notifications]);
  console.log(notifications);

  return (
    <>
      {selectedChat ? (
        <>
          <Container>
            <ChatBoxHeader
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              socket={socket}
              setSocket={setSocket}
              setSelectedChatCompare={setSelectedChatCompare}
              selectedChatCompare={selectedChatCompare}
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

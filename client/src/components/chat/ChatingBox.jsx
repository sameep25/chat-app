import { useContext, useState, useEffect } from "react";

import { ChatContext } from "../../context/ChatProvider";
import { fetchMessagesApi, sendMessageApi } from "../../service/messagesApi";
import Messages from "./singleChat/Messages";

import {
  Box,
  styled,
  Alert,
  Snackbar,
  CircularProgress,
  InputBase,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// MUI STYLED COMPONENTS
const MessagesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #0a1929;
  padding: 0.5em;
  margin-left: 5px;
  margin-right: 5px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 90%;
  border-bottom: 1px solid #2e3b49;
`;
const NewMessageContainer = styled(Box)`
  display: flex;
  justify-content: left;
  align-items: center;
  background: #0a1929;
`;
const StyledInputBase = styled(InputBase)`
  color: white;
  font-family: work sans;
  width: 100%;
  margin: 0.3em 0 0.3em 0.5em;
  & > :hover {
    background: #2e3b49;
  }
  & > textarea {
    border-radius: 3px;
    padding: 0.3em;
  }
`;

const ChatingBox = ({ socket, setMessages, messages }) => {
  const { selectedChat, token } = useContext(ChatContext);

  //messages state
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState(); //for storing current room 

  //alerts states
  const [chatLoading, setChatLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

  //fetching messsages as selected chat changes
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  

    //featching messages of a chat
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setChatLoading(true);
        const { data } = await fetchMessagesApi(config, selectedChat._id);
        // console.log(data);
        setMessages(data);
        setChatLoading(false);
  
        // leaving previouly connected room
        if (room) {
          socket && socket.emit("leave-room", room);
        }
        // making a room with chat id
        socket && socket.emit("join-Chat", selectedChat._id);
        setRoom(selectedChat._id);
        return;
      } catch (error) {
        setLoading(true);
        setAlertTitle("Failed to Fetch Chats : Refresh !");
        setAlertType("error");
      }
    };
  

  // send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    let message = newMessage.trim();
    if (!message) {
      setLoading(true);
      setAlertTitle("Type a message...");
      setAlertType("info");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setNewMessage("");
      const { data } = await sendMessageApi(
        { chatId: selectedChat._id, content: message },
        config
      );
      //sending messages to every user in room
      socket.emit("new-message", data);
      setMessages([...messages, data]);
      return;
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to send Message : Try Again");
      setAlertType("error");
    }
  };

  return (
    <>
      {chatLoading ? (
        <>
          <MessagesContainer
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <CircularProgress />
          </MessagesContainer>
        </>
      ) : (
        <>
          {/* All Messages */}
          <MessagesContainer>
            {messages &&
              messages.map((message, index) => (
                <Messages
                  key={message._id}
                  message={message}
                  messages={messages}
                  index={index}
                />
              ))}
          </MessagesContainer>

          {/* new message input*/}
          <NewMessageContainer>

            {/* Input Area */}
            <StyledInputBase
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(e);
              }}
              multiline
              value={newMessage}
              maxRows={"1"}
              placeholder="Type a message..."
              onChange={(e) => setNewMessage(e.target.value)}
            />

            {/* Message button */}
            <IconButton
              sx={{ color: "whitesmoke" }}
              size="medium"
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>

          </NewMessageContainer>
        </>
      )}

      <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertTitle}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChatingBox;

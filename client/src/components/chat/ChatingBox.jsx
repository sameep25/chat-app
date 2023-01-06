import { useContext, useState, useEffect, useRef } from "react";

import { ChatContext } from "../../context/ChatProvider";
import { fetchMessagesApi, sendMessageApi } from "../../service/messagesApi";
import Messages from "./singleChat/Messages";

import {
  Box,
  Typography,
  styled,
  Alert,
  Snackbar,
  CircularProgress,
  InputBase,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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
  margin : 0.3em 0 0.3em 0.5em ;
  & > :hover {
    background: #2e3b49;
  }
  & > textarea {
    border-radius: 3px;
    padding: 0.3em;
  }
`;

const ChatingBox = ({ messages, setMessages }) => {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const { user, selectedChat, setSelectedChat, token } =
    useContext(ChatContext);

  const [chatLoading, setChatLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    executeScroll();
  }, [selectedChat]);

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
      return;
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to Fetch Chats : Refresh !");
      setAlertType("error");
    }
  };

  // send message
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
        {
          chatId: selectedChat._id,
          content: message,
        },
        config
      );
      // console.log(data);

      setMessages([...messages, data]);
      executeScroll();
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
          <MessagesContainer sx={{justifyContent:"center" ,alignItems:"center"}}>
            <CircularProgress />
          </MessagesContainer>
        </>
      ) : (
        <>
          {/* All Messages */}
          <MessagesContainer>
            {messages &&
              messages.map((message ,index) => (
                <Messages key={message._id} message={message} messages={messages} index={index}/>
              ))}
            <Typography
              sx={{ background: "#0a1929", height: "5px" }}
              ref={myRef}
            ></Typography>
          </MessagesContainer>
          {/* new message */}
          <NewMessageContainer>
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

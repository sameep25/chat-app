import { useContext, useState } from "react";

import { ChatContext } from "../../context/ChatProvider";
import { sendMessageApi } from "../../service/messagesApi";

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

const Container = styled(Box)`
  display: flex;
  justify-content: left;
  align-items: center;
  background: #0a1929;
  height: 10%;
  margin: 0.5em;
`;

const SpinnerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledInputBase = styled(InputBase)`
  color: white;
  font-family: work sans;
  width: 90%;

  margin-right: 1em;
  & > :hover {
    background: #2e3b49;
  }
  & > textarea {
    border-radius: 5px;
    padding: 0.5em;
  }
`;

const MessageBox = ({ messages, setMessages }) => {
  const { user, selectedChat, setSelectedChat, token } =
    useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");

  const [messageLoading, setMessageLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

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
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to send Message : Try Again");
      setAlertType("error");
    }
  };

  return (
    <>
      {/* <Container> */}
      {messageLoading ? (
        <>
          <Container>
            <CircularProgress />
          </Container>
        </>
      ) : (
        <>
          <Container>
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
            <IconButton size="medium" color="inherit" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Container>
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

export default MessageBox;

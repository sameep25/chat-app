import { useContext, useEffect, useState } from "react";

import { ChatContext } from "../../context/ChatProvider";
import { fetchChatsApi } from "../../service/chatApi";

import ChatList from "./ChatList";
import GroupChatModal from "./GroupChatModal";

import {
  Box,
  Button,
  styled,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// MUI STYLED COMPONENTS
const Container = styled(Box)`
  background: #0a1929;
  color: white;
  height: 86vh;
  width: 95%;
  display: flex;
  overflow-y: scroll;
  margin: 0 0.5em 0.5em 0.5em;
  border-radius: 3px;
  flex-direction: column;
  scroll-behavior: smooth;
`;
const Header = styled(Box)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #2e3b49;
  padding: 0.5em 0 0.5em 1em;
`;
const StyledButton = styled(Button)`
  background-color: #2e3b49;
  text-transform: none;
  margin: 0 1em 0 1px;
  min-width: 18%;
  color: white;
  font-family: work sans;
`;

const MyChats = ({ fetchAgain }) => {
  const { token, chats, setChats } = useContext(ChatContext);

  // Alert Utils
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
    fetchChats();
  }, [fetchAgain]);

  // gruop chat modal
  const [openModal, setOpenModal] = useState(false);

  // hitting fectChatApi
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await fetchChatsApi(config);
      setChats(data);
    } catch (error) {
      setAlertTitle("Failed to get chats! Refresh");
      setAlertType("error");
    }
  };

  return (
    <>
      <Container>
        <Header>
          {/* Heading */}
          <Typography
            variant="h5"
            sx={{ fontFamily: "work sans", marginRight: "auto" }}
          >
            My Chats
          </Typography>

          {/*Open new Group Modal*/}
          <StyledButton onClick={() => setOpenModal(true)} size="small">
            New Group Chat
            <AddIcon fontSize="small" />
          </StyledButton>
        </Header>

        {/* List of Chats */}

        {chats ? (
          <>
            <Box sx={{ marginLeft: "0.5em", overflowY: "scroll" }}>
              {chats?.map((chat) => (
                <ChatList key={chat._id} chat={chat} />
              ))}
            </Box>
          </>
        ) : (
          <></>
        )}
      </Container>

      <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertTitle}
        </Alert>
      </Snackbar>

      <GroupChatModal open={openModal} close={() => setOpenModal(false)} />
    </>
  );
};

export default MyChats;

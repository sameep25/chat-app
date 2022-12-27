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

const Container = styled(Box)`
  background: #0a1929;
  margin: 0.5em;
  color: white;
  height: 100%;
  overflow-y: scroll;
`;
const Header = styled(Box)`
  position: absolute;
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

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, token, chats, setChats, selectedChat, setSelectedChat } =
    useContext(ChatContext);

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
      setAlertTitle(error.message);
      setAlertType("error");
    }
  };
  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Typography
            variant="h5"
            sx={{ fontFamily: "work sans", marginRight: "auto" }}
          >
            My Chats
          </Typography>
          <StyledButton onClick={() => setOpenModal(true)} size="small">
            New Group Chat
            <AddIcon fontSize="small" />
          </StyledButton>
        </Header>

        <Box sx={{ marginTop: "2em" }}>
          {chats &&
            chats?.map((chat) => <ChatList key={chat._id} chat={chat} />)}
        </Box>
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

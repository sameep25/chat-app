import { useContext, useState } from "react";

import { ChatContext } from "../../../context/ChatProvider";
import UserListItem from "../../sideDrawer/UserListItem";

import { removeUserFromGroupApi,deleteGroupApi } from "../../../service/chatApi";

import {
  Box,
  Button,
  Typography,
  Modal,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";

const StyledButton = styled(Button)`
  text-transform: none;
  margin: 0 1em 0 1em;
  min-width: 18%;
  font-family: work sans;
  font-weight: 600;

  // background-color: #2e3b49;
  // color: white;
  // :hover {
  //   background:#2e3b49 ;
  // }
`;

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vh",
  height: "40vh",
  borderRadius: "5px",
  bgcolor: "background.paper",
  boxShadow: 18,
  p: 2,
};

const CustomModal = styled(Modal)`
  .MuiBox-root {
    background-color: #001e3c;
    color: white;
  }
`;
const UserListBox = styled(Box)`
  & > div {
    margin: 0.5em;
  }
`;

const GroupDetailsModal = (props) => {
  const { user, token, selectedChat, setSelectedChat } =
    useContext(ChatContext);

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

  // leaving group
  const leaveGroup = async () => {
    try {
      setLoading(true);
      setAlertTitle("Leaving From Group");
      setAlertType("info");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await removeUserFromGroupApi(config, {
        chatId: selectedChat._id,
        userId: user._id,
      });
      console.log(data);
      setAlertTitle("Group Left");
      setAlertType("success");
      setSelectedChat();
      props.setFetchAgain(!props.fetchAgain);
      props.close();
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to Leave: Try Again");
      setAlertType("error");
    }
  };

  const deleteGroup = async () => {
    try {
      setLoading(true);
      setAlertTitle("Deleting Group");
      setAlertType("info");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await deleteGroupApi(config, selectedChat._id);

      setAlertTitle("Group deleted successfully");
      setAlertType("success");
      setSelectedChat();
      props.setFetchAgain(!props.fetchAgain);
      props.close();
    } catch (error) {
      setLoading(true);
      setAlertTitle(error.message);
      setAlertType("error");
    }
  };


  return (
    <div>
      <CustomModal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "work sans", fontWeight: "600" }}
          >
            {props.chat.chatName}
          </Typography>

          <UserListBox>
            {props.chat.users?.map((user) => (
              <UserListItem key={user._id} user={user} chat={props.chat} />
            ))}
          </UserListBox>

          {user._id === props.chat.groupAdmin._id ? (
            <>
              <StyledButton
                size="small"
                variant="outlined"
                color="error"
                onClick={deleteGroup}
              >
                Delete Group
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton
                size="small"
                variant="outlined"
                color="error"
                onClick={leaveGroup}
              >
                Leave Group
              </StyledButton>
            </>
          )}
        </Box>
      </CustomModal>

      <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertTitle}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GroupDetailsModal;

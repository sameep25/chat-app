import React from "react";
import { useContext, useState, useEffect } from "react";

import { ChatContext } from "../../../context/ChatProvider";
import { searchUserApi } from "../../../service/userApi";
import {
  renameGroupApi,
  addUserToGroupApi,
  removeUserFromGroupApi,
  deleteGroupApi,
} from "../../../service/chatApi";

import UserListItem from "../../sideDrawer/UserListItem";
import UserBadgeItem from "../UserBadgeItem";

import {
  Box,
  Typography,
  Modal,
  styled,
  Snackbar,
  Alert,
  Button,
  InputBase,
} from "@mui/material";

// MUI CUSTOM COMPONENTS
const StyledButton = styled(Button)`
  text-transform: none;
  margin: 0 1em 0 1em;
  min-width: 18%;
  font-family: work sans;
  font-weight: 600;
`;

const CustomModal = styled(Modal)`
  .MuiBox-root {
    background-color: #001e3c;
    color: white;
  }
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
  borderRadius: "5px",
  bgcolor: "background.paper",
  boxShadow: 18,
  p: 2,
};

const StyledInputBase = styled(InputBase)`
  color: white;
  font-family: work sans;
  padding: 0 0 0.2em 1em;
  width: 100%;

  & > :hover {
    background: #2e3b49;
  }
  & > input {
    border-radius: 5px;
    padding-left: 0.5em;
  }
`;

const UserListBox = styled(Box)`
  display: block;
  margin-bottom: 1em;
`;

const EditGroupChatModal = (props) => {
  const { token, selectedChat, setSelectedChat } = useContext(ChatContext);

  useEffect(() => {
    setSelectedUsers([...selectedChat.users]);
    // setGroupChatname(selectedChat.chatName);
  }, []);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchReasult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupChatname, setGroupChatname] = useState("");
  //removing users from lists upon closing the modal
  useEffect(() => {
    if (props.open === false) {
      setSearchReasult([]);
      setSelectedUsers([...selectedChat.users]);
      // setGroupChatname(selectedChat.chatName);
    }
  }, [props.open]);

  //   Alert
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

  //seraching users from db to add to group
  const handleSerach = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      setAlertType("info");
      setAlertTitle("Searching ...");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await searchUserApi(config, search);
      // console.log(data);
      if (data.users.length < 1) {
        setAlertTitle("No such user found");
        setAlertType("warning");
      }
      setSearchReasult(data.users);
      // console.log(searchResult);
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to load Users");
      setAlertType("error");
    }
  };

  //add users to group
  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
      setLoading(true);
      setAlertTitle("User already in Group");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      setAlertTitle("Adding User in Group");
      setAlertType("info");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await addUserToGroupApi(config, {
        chatId: selectedChat._id,
        userId: userToAdd._id,
      });
      // console.log(data);

      setAlertTitle("User added to Group");
      setAlertType("success");
      setSelectedChat(data);
      props.setFetchAgain(!props.fetchAgain);
      props.close();
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to Add : Try Again");
      setAlertType("error");
    }
  };

  //removing users from group
  const handleRemove = async (userToDel) => {
    try {
      setLoading(true);
      setAlertTitle("Removing User From Group");
      setAlertType("info");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await removeUserFromGroupApi(config, {
        chatId: selectedChat._id,
        userId: userToDel._id,
      });

      setAlertTitle("User Removed From Group");
      setAlertType("success");
      setSelectedChat(data);
      props.setFetchAgain(!props.fetchAgain);
      props.close();
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to Remove : Try Again");
      setAlertType("error");
    }
  };

  //rename group
  const handleRename = async () => {
    if (!groupChatname) {
      setLoading(true);
      setAlertTitle("Enter something");
      setAlertType("info");
      return;
    }
    try {
      setLoading(true);
      setAlertTitle("Renaming Group");
      setAlertType("info");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await renameGroupApi(config, {
        chatId: selectedChat._id,
        chatName: groupChatname,
      });
      // console.log(data);
      setSelectedChat(data);
      props.setFetchAgain(!props.fetchAgain);
      setGroupChatname("");

      setAlertTitle("Group renamed");
      setAlertType("success");
      props.close();
    } catch (error) {
      setAlertTitle("Error while renaming group : Try Again");
      setAlertType("error");
    }
  };

  // delete Group
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
          {/* Heading */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "work sans",
              fontWeight: "500",
              marginBottom: "5px",
            }}
          >
            Edit Group Chat
          </Typography>

          {/* group users list */}
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {selectedChat.users?.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => handleRemove(user)}
              />
            ))}
          </Box>

          {/* chat name edit and search users  */}
          <Box sx={{ width: "100%", marginTop: "1em" }}>
            {/* edit chat name */}
            <Box display={"flex"}>
              <StyledInputBase
                placeholder="Change Group name"
                onChange={(e) => {
                  setGroupChatname(e.target.value);
                }}
              />
              <StyledButton
                sx={{ ":hover": { background: "none" } }}
                size="small"
                variant="text"
                color="info"
                onClick={handleRename}
              >
                Update
              </StyledButton>
            </Box>

            {/* search users to add*/}
            <StyledInputBase
              placeholder="Add a User to Group"
              onChange={(e) => handleSerach(e.target.value)}
            />
          </Box>

          {/* searched user list */}
          <UserListBox>
            {searchResult &&
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))}
          </UserListBox>

          {/* submit handlers */}
          <StyledButton
            size="small"
            variant="outlined"
            color="error"
            onClick={deleteGroup}
          >
            Delete Group
          </StyledButton>
        </Box>
      </CustomModal>

      {/* Alerts */}
      <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertTitle}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditGroupChatModal;

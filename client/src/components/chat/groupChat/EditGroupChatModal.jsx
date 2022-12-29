import React from "react";
import { useContext, useState, useEffect } from "react";

import { ChatContext } from "../../../context/ChatProvider";
import { searchUserApi } from "../../../service/userApi";
import { createNewGroupApi, renameGroupApi } from "../../../service/chatApi";

import UserListItem from "../../sideDrawer/UserListItem";
import UserBadgeItem from "../UserBadgeItem";

import {
  Box,
  Input,
  Typography,
  Modal,
  styled,
  Snackbar,
  Alert,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  InputBase,
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
  const { user, chats, setChats, token, selectedChat, setSelectedChat } =
    useContext(ChatContext);

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

  // console.log("searchResult", searchResult);
  // console.log("selectedUsers : ", selectedUsers);
  // console.log("groupChatname : ", groupChatname);
  // console.log("selectedChat._id : ", selectedChat._id);

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

  //seraching user from db to add to group
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
  // adding users to selectedUser array
  const addToGroup = (user) => {
    if (selectedUsers.includes(user)) {
      setLoading(true);
      setAlertTitle("User already added");
      setAlertType("info");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  //removing users from group
  const handleRemove = () => {};

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
      props.setFetchAgain(!props.fecthAgain);

      setAlertTitle("Group renamed");
      setAlertType("success");
      props.close();
    } catch (error) {
      setAlertTitle("Error while renaming group : Try Again");
      setAlertType("error");
    }
  };

  // edit group chat
  const handleSumbit = async () => {
    setLoading(true);
    setAlertTitle("Creating group chat");
    if (!groupChatname || !selectedUsers) {
      setAlertTitle("Please fill all the fields");
      setAlertType("warning");
      return;
    }

    if (selectedUsers.length < 2) {
      setAlertTitle("Add atleast 2 users");
      setAlertType("warning");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await createNewGroupApi(config, {
        name: groupChatname,
        users: JSON.stringify(selectedUsers?.map((user) => user._id)),
      });
      setChats([data, ...chats]);
      props.close();
      setAlertTitle("New group-chat created");
      setAlertType("success");
      return;
    } catch (error) {
      setAlertTitle("Failed to create a group-chat");
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
                handleFunction={handleRemove}
              />
            ))}
          </Box>

          {/* chat name edit and search users  */}
          <Box sx={{ width: "100%", marginTop: "1em" }}>
            <Box display={"flex"}>
              <StyledInputBase
                placeholder="Change Chat name"
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

            <StyledInputBase
              placeholder="Add User to Group"
              onChange={(e) => handleSerach(e.target.value)}
            />
          </Box>

          {/* search user list */}
          <UserListBox>
            {searchResult &&
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => addToGroup(user)}
                  />
                ))}
          </UserListBox>

          {/* submit handlers */}
          <StyledButton
            size="small"
            variant="outlined"
            color="error"
            onClick={() => {}}
          >
            Delete Group
          </StyledButton>
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

export default EditGroupChatModal;

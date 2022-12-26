import React from "react";
import { useContext, useState } from "react";

import { ChatContext } from "../../context/ChatProvider";
import { searchUserApi } from "../../service/userApi";

import UserListItem from "../sideDrawer/UserListItem";
import UserBadgeItem from "./UserBadgeItem";

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

const defaultGroupChat = {
  name: "",
  users: [],
};

const StyledButton = styled(Button)`
  background-color: #2e3b49;
  text-transform: none;
  margin: 0 1em 0 1px;
  min-width: 18%;
  color: white;
  font-family: work sans;
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

const GroupChatModal = (props) => {
  const { user, chats, setChats, token } = useContext(ChatContext);
  const [groupChat, setGroupChat] = useState(defaultGroupChat);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchReasult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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

  //
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
      console.log(searchResult);
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to load Users");
      setAlertType("error");
    }
  };

  //
  const handleSumbit = () => {};

  //
  const addToGroup = (user) => {
    if (selectedUsers.includes(user)) {
      setLoading(true);
      setAlertTitle("User already added");
      setAlertType("info");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  //
  const handleDelete = (user) => {
    // setSelectedUsers(selectedUsers.filter())
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
            sx={{ fontFamily: "work sans", fontWeight: "500" }}
          >
            Create Group Chat
          </Typography>

          <Box sx={{ width: "100%" }}>
            <StyledInputBase
              placeholder="Chat name"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <StyledInputBase
              placeholder="Search Users"
              onChange={(e) => handleSerach(e.target.value)}
            />
          </Box>

          <Box sx={{width:"100%", display:"flex" ,flexWrap:"wrap"}} >
            {selectedUsers?.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => handleDelete(user)}
              />
            ))}
          </Box>

          {loading ? (
            <Typography sx={{ fontFamily: "work sans" }}>
              Loading ...
            </Typography>
          ) : (
            <>
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
            </>
          )}

          <StyledButton onClick={handleSumbit}>Create Chat</StyledButton>
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

export default GroupChatModal;

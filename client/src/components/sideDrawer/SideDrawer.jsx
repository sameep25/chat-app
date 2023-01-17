import { useState, useContext } from "react";

import { ChatContext } from "../../context/ChatProvider";
import { searchUserApi } from "../../service/userApi";
import { accessChatApi } from "../../service/chatApi";

import SkeletonStack from "../miscellaneous/SkeletonStack";
import UserListItem from "../sideDrawer/UserListItem";

import {
  Box,
  InputBase,
  alpha,
  Button,
  Drawer,
  styled,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

// MUI STYLED COMPONENTS
const CustomDrawer = styled(Drawer)`
  & .MuiPaper-root {
    width: 40vh;
    background: #0a1929;
    color: white;
  }
`;
const Title = styled(Typography)`
  font-family: work sans;
  margin: 1em;
  border-bottom: 1px solid white;
`;
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 0 1em",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  minWidth: "70%",
}));
const StyledInputBase = styled(InputBase)`
  color: white;
  font-family: work sans;
  font-size: small;
`;
const StyledButton = styled(Button)`
  background-color: #2e3b49;
  text-transform: none;
  margin: 0 1em 0 1px;
  min-width: 18%;
  color: white;
`;

const SideDrawer = (props) => {
  const { user, token, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  //Alert utils
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

  //search users to chat
  const handleSearch = async () => {
    setLoading(true);
    if (!search) {
      setAlertType("warning");
      setAlertTitle("Please enter a Name or email");
      return;
    }

    try {
      setLoading(true);
      setAlertType("info");
      setAlertTitle("Searching ...");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await searchUserApi(config, search);
      // console.log(data);
      if (data.users.length < 1) {
        setAlertTitle("No such user found");
        setAlertType("warning");
      }
      setSearchResult(data.users);
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to load Users");
      setAlertType("error");
    }
  };

  //access or create chatapi
  const accessChat = async (userId) => {
    setLoading(true);
    setAlertTitle("accessing chat please wait");
    setAlertType("info");
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await accessChatApi(userId, config);

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      setSearch("");
      props.close();
      return;
    } catch (error) {
      setLoading(true);
      setAlertTitle("Failed to access chat");
      setAlertType("error");
    }
  };

  return (
    <>
      <CustomDrawer anchor={"left"} open={props.open} onClose={props.close}>
        <Title> Search Users </Title>
        {/* Search Users */}
        <Box sx={{ display: "flex" }}>
          <Search>
            <StyledInputBase
              autoFocus
              placeholder="Enter name or email"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Search>
          <StyledButton onClick={handleSearch}>Go</StyledButton>
        </Box>

        {loading ? (
          <SkeletonStack />
        ) : (
          searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))
        )}
      </CustomDrawer>

      {/* Alerts */}
      <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertTitle}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SideDrawer;

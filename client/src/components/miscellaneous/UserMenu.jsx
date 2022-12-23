import React from "react";
import { useState, useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";

import ProfileModal from "./ProfileModal";

import {
  Box,
  styled,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";

const StyledMenu = styled(Menu)`
  & .MuiPaper-root {
    background-color: #203246;
    color: #fff;
  }
  ,
  & .MuiList-root {
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;
const UserMenu = () => {
  const { user } = useContext(ChatContext);
  //   console.log(user);
  const [notificationMenu, setNotificationMenu] = useState(null);
  const notificationOpen = Boolean(notificationMenu);
  const handleNotificationMenu = (event) => {
    setNotificationMenu(event.currentTarget);
  };

  const [accountMenu, setAccountMenu] = useState(null);
  const accountOpen = Boolean(accountMenu);
  const handleAccountMenu = (event) => {
    setAccountMenu(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationMenu(null);
    setAccountMenu(null);
  };

  //   Profile - Modal;
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <IconButton
        size="large"
        // aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleNotificationMenu}
      >
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <StyledMenu
        anchorEl={notificationMenu}
        open={notificationOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>1</MenuItem>
        <MenuItem onClick={handleClose}>2</MenuItem>
        <MenuItem onClick={handleClose}>3</MenuItem>
      </StyledMenu>

      <IconButton size="small" sx={{ ml: 2 }} onClick={handleAccountMenu}>
        <Avatar src={user.picture} sx={{ width: 32, height: 32 }}></Avatar>
      </IconButton>

      <StyledMenu
        anchorEl={accountMenu}
        open={accountOpen}
        onClose={handleClose}
      >
        <MenuItem divider onClick={() => setOpenModal(true)}>
          <ListItemIcon>
            <AccountCircle sx={{ color: "white" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout sx={{ color: "white" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </StyledMenu>

      <ProfileModal user={user} open={openModal} close={() => setOpenModal(false)} />
    </Box>
  );
};

export default UserMenu;

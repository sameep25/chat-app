import { useContext, useState } from "react";

import { ChatContext } from "../../context/ChatProvider";
import { getSenderName } from "../../config/ChatLogics";
import EditGroupChatModal from "./groupChat/EditGroupChatModal";
import GroupDetailsModal from "./groupChat/GroupDetailsModal";
import ProfileModal from "../miscellaneous/ProfileModal";
import { getSenderUser } from "../../config/ChatLogics";

import { Box, Typography, styled, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

const Header = styled(Box)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #2e3b49;
  padding: 0.25em 0 0.25em 0;
  width: auto;
  height:fit-content ;
  background: #0a1929;
  color: white;
`;

const ChatBoxHeader = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
  // gruop chat modal
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {selectedChat ? (
        <>
          <Header>
            <IconButton
              sx={{ marginRight: "0.5em" }}
              size="medium"
              color="inherit"
              onClick={() => setSelectedChat()}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography fontFamily={"work sans"} variant="h5">
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : getSenderName(user, selectedChat.users)}
            </Typography>

            {selectedChat.isGroupChat ? (
              <>
                <Box sx={{ marginLeft: "auto", marginRight: "1em" }}>
                  <Tooltip title="Group Info" arrow>
                    <IconButton
                      size="medium"
                      color="inherit"
                      onClick={() => setOpenGroupModal(true)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  {selectedChat.groupAdmin.email === user.email ? (
                    <Tooltip title="Edit Group" arrow>
                      <IconButton
                        size="medium"
                        color="inherit"
                        onClick={() => setOpenEditModal(true)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </Box>

                <GroupDetailsModal
                  chat={selectedChat}
                  open={openGroupModal}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  close={() => setOpenGroupModal(false)}
                />

                <EditGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  open={openEditModal}
                  close={() => setOpenEditModal(false)}
                />
              </>
            ) : (
              <>
                {/* Single User Profile Info */}
                <Box sx={{ marginLeft: "auto", marginRight: "1em" }}>
                  <Tooltip title="User-Info" arrow>
                    <IconButton
                      size="medium"
                      color="inherit"
                      onClick={() => setOpenModal(true)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ProfileModal
                  open={openModal}
                  close={() => setOpenModal(false)}
                  user={getSenderUser(user, selectedChat.users)}
                />
              </>
            )}
          </Header>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatBoxHeader;

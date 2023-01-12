import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";

import {
  getSenderEmail,
  getSenderName,
  getSenderPicture,
} from "../../config/ChatLogics";

import { Box, Avatar, Typography, styled, Badge } from "@mui/material";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  margin: 1em 1em 0 1em;
  border-radius: 4px;
  padding: 4px;
  :hover {
    cursor: pointer;
    background: #2e3b49;
  }
`;
const TextContainer = styled(Box)`
  margin-left: 1em;
  & > p {
    font-family: work sans;
  }
`;

const ChatList = ({ chat }) => {
  const { setSelectedChat, selectedChat, user } = useContext(ChatContext);

  const changeState = () =>{
    setSelectedChat(chat);
  }

  return (
    <Container
      bgcolor={selectedChat === chat ? "#2e3b49" : "#0a1929"}
      onClick={changeState}
    >
      <Avatar
        src={
          !chat.isGroupChat
            ? getSenderPicture(user, chat.users)
            : chat.groupAdmin.picture
        }
        sx={{ width: 32, height: 32 }}
      ></Avatar>

      <TextContainer>
        <Typography sx={{ fontSize: "100%" }}>
          {!chat.isGroupChat ? getSenderName(user, chat.users) : chat.chatName}{" "}
        </Typography>
        <Typography sx={{ fontSize: "60%" }}>
          {!chat.isGroupChat
            ? getSenderEmail(user, chat.users)
            : `Admin : ${chat.groupAdmin.email}`}
        </Typography>
      </TextContainer>
    </Container>
  );
};

export default ChatList;

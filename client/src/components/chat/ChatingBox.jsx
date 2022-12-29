import { useContext } from "react";

import { ChatContext } from "../../context/ChatProvider";

import { Box, Typography, styled } from "@mui/material";
const Container = styled(Box)`
  background: #001e3c;
  height: 85%;
  margin: 0.5em;
`;

const ChatingBox = () => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
  return <Container></Container>;
};

export default ChatingBox;

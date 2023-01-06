import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext } from "react";

import { ChatContext } from "../../../context/ChatProvider";

const SenderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  max-width: 55%;
`;
const ReceiverBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  max-width: 55%;
`;
const MessageText = styled(Typography)`
  // background: #2e3b49;
  padding: 2px 6px 2px 6px;
  border-radius: 8px;
  margin-top: 2px;
  overflow-wrap: break-word;
  font-family : work sans ;
`;

const Messages = ({ message }) => {
  const { user } = useContext(ChatContext);
  return (
    <>
      {message && message.sender.email === user.email ? (
        <>
          <SenderBox>
            <MessageText sx={{background:"#004c99"}}>{message.content}</MessageText>
          </SenderBox>
        </>
      ) : (
        <>
          <ReceiverBox>
            <MessageText sx={{background:"#2e3b49"}}>{message.content}</MessageText>
          </ReceiverBox>
        </>
      )}
    </>
  );
};

export default Messages;

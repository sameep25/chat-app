import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext } from "react";

import { ChatContext } from "../../../context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isFirstMessage,
} from "../../../config/ChatLogics";

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
  font-family: work sans;
`;

const SenderName = styled(Typography)`
font-family: work sans;
font-size: 0.7rem;
color: aquamarine;

`

const Messages = ({ message, messages, index }) => {
  const { user } = useContext(ChatContext);
  return (
    <>
      {message.chat.isGroupChat ? (
        <>
          {message && message.sender.email === user.email ? (
            <>
              <SenderBox>
                <MessageText sx={{ background: "#004c99" }}>
                  {message.content}
                </MessageText>
              </SenderBox>
            </>
          ) : (
            <>
              {isFirstMessage(messages, index) ? (
                <>
                  <ReceiverBox>
                    <MessageText sx={{ background: "#2e3b49" ,marginTop:"0.5em"}}>
                      <SenderName >{message.sender.name}</SenderName>
                      {message.content}
                    </MessageText>
                  </ReceiverBox>
                </>
              ) : (
                <>
                  <ReceiverBox>
                    <MessageText sx={{ background: "#2e3b49" }}>
                      {message.content}
                    </MessageText>
                  </ReceiverBox>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {message && message.sender.email === user.email ? (
            <>
              <SenderBox>
                <MessageText sx={{ background: "#004c99" }}>
                  {message.content}
                </MessageText>
              </SenderBox>
            </>
          ) : (
            <>
              <ReceiverBox>
                <MessageText sx={{ background: "#2e3b49" }}>
                  {message.content}
                </MessageText>
              </ReceiverBox>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Messages;

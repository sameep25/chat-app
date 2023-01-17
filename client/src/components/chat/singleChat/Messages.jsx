import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext } from "react";

import { ChatContext } from "../../../context/ChatProvider";
import { isFirstMessage } from "../../../config/ChatLogics";

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
  padding: 0.1em 0.4em 0.1em 0.4em;
  border-radius: 6px;
  margin-top: 2px;
  overflow-wrap: break-word;
  font-family: work sans;
`;
const SenderName = styled(Typography)`
  font-family: work sans;
  font-size: 0.7rem;
  color: aquamarine;
`;

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
                //  First message by a user
                <>
                  <ReceiverBox>
                    <MessageText
                      sx={{
                        background: "#2e3b49",
                        marginTop: "0.5em",
                        borderTopLeftRadius: "0px",
                      }}
                    >
                      <SenderName>{message.sender.name}</SenderName>
                      {message.content}
                    </MessageText>
                  </ReceiverBox>
                </>
              ) : (
                //  Not First message by a user
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

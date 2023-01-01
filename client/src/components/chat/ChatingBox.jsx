import { useContext, useState } from "react";

import { ChatContext } from "../../context/ChatProvider";

import {
  Box,
  Typography,
  styled,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a1929;
  height: 85%;
  margin: 0.5em;
  border: 1px solid white;
`;

const SpinnerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ChatingBox = () => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [alertType, setAlertType] = useState("info");
  // const [alertTitle, setAlertTitle] = useState("");
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setLoading(false);
  // };

  return (
    <>
      {loading ? (
        <>
          <Container>
            <CircularProgress />
          </Container>
        </>
      ) : (
        <>
          <Container>{/* Messages */}</Container>
        </>
      )}

      {/* <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertTitle}
        </Alert>
      </Snackbar> */}
    </>
  );
};

export default ChatingBox;

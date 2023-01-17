import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

// import SideDrawer from "../components/chat/SideDrawer";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";
import Navbar from "../components/chat/Navbar";

import { Grid, Box } from "@mui/material";

const ENDPOINT = "http://localhost:8000";

const ChatPage = () => {
  const { user } = useContext(ChatContext);

  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false); // to fetch chats again from db

  // if user null navigate to "/"
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  //socket states
  const [socket, setSocket] = useState();

  //initialzing socket server
  useEffect(() => {
    const socketServer = io(ENDPOINT);
    setSocket(socketServer);
  }, []);

  //setting up the socket connection with userid
  // useEffect(() => {
  //   socket && socket.emit("setup", user);
  // }, [socket]);

  return (
    <>
      {user ? (
        <>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Navbar />

            
            <Grid container>

              {/* MyChats */}
              <Grid sx={{ height: "87vh" }} item lg={3} md={4} sm={5.5} xs={12}>
                {" "}
                <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>{" "}
              </Grid>

              {/* ChatBox */}
              <Grid sx={{ height: "87vh" }} item lg={9} md={8} sm={6.5} xs={12}>
                {" "}
                <ChatBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  setSocket={setSocket}
                  socket={socket}
                />
              </Grid>
            </Grid>

          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatPage;

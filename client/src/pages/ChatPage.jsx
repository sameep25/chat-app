// import { useContext } from "react";
// import { ChatContext } from "../context/ChatProvider";

// import SideDrawer from "../components/chat/SideDrawer";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";
import Navbar from "../components/chat/Navbar"

import { Grid ,Box  } from "@mui/material";

const ChatPage = () => {
  // const { user } = useContext(ChatContext);
  return (
    <>
    <Box sx={{width:"100%"}}>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item lg={4} sm={4} xs={12}> <MyChats /> </Grid>
        <Grid item lg={8} sm={8} xs={12}> <ChatBox /> </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default ChatPage;

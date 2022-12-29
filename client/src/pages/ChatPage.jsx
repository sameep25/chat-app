import { useContext, useEffect ,useState } from "react";
import { ChatContext } from "../context/ChatProvider";
import { useNavigate } from "react-router-dom";

// import SideDrawer from "../components/chat/SideDrawer";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";
import Navbar from "../components/chat/Navbar";

import { Grid, Box } from "@mui/material";

const ChatPage = () => {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();

  const [fetchAgain, setFetchAgain] = useState(false) ;

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <>
      {user ? (
        <>
          <Box sx={{ width: "100%" ,height:"100%" }}>
            <Navbar />
            <Grid container >
              <Grid sx={{height:"87vh"}} item lg={3} md={4} sm={5.5} xs={12}>
                {" "}
                <MyChats fetchAgain={fetchAgain} />{" "}
              </Grid>
              <Grid sx={{height:"87vh"}} item lg={9} md={8} sm={6.5} xs={12}>
                {" "}
                <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>{" "}
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

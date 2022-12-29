// import React from 'react'

// import { ChatContext } from "../../../context/ChatProvider";
// import { getSenderName } from "../../../config/ChatLogics";
// import EditGroupChatModal from "../groupChat/EditGroupChatModal";
// import ProfileModal from "../../miscellaneous/ProfileModal";
// import { getSenderUser } from "../../../config/ChatLogics";

// import { Box, Typography, styled, IconButton, Tooltip } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import EditIcon from "@mui/icons-material/Edit";
// import InfoIcon from "@mui/icons-material/Info";

// const Header = styled(Box)`
//   display: flex;
//   align-items: center;
//   border-bottom: 1px solid #2e3b49;
//   padding: 0.5em 0 0.5em 1em;
//   width: 100%;
//   height: fit-content;
//   color: white;
// `;

// const Chat = styled(Box)`
//   background: black;
//   display: flex;
//   width: 100%;
//   height: 100%;
//   border-radius: 3px;
//   overflow-y: scroll;
// `;


// const CharBoxHeader = () => {

//     const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
//     // gruop chat modal
//     const [openModal, setOpenModal] = useState(false);
//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Header>
//             <IconButton
//               sx={{ marginRight: "0.5em" }}
//               size="medium"
//               color="inherit"
//               onClick={() => setSelectedChat()}
//             >
//               <ArrowBackIcon />
//             </IconButton>

//             <Typography fontFamily={"work sans"} variant="h5">
//               {selectedChat.isGroupChat
//                 ? selectedChat.chatName
//                 : getSenderName(user, selectedChat.users)}
//             </Typography>

//             {selectedChat.isGroupChat ? (
//               <>
//                 <Box sx={{ marginLeft: "auto", marginRight: "1em" }}>
//                   <Tooltip title="Group Info" arrow>
//                     <IconButton
//                       size="medium"
//                       color="inherit"
//                       onClick={() => setSelectedChat()}
//                     >
//                       <InfoIcon />
//                     </IconButton>
//                   </Tooltip>
//                   {selectedChat.groupAdmin.email === user.email ? (
//                     <Tooltip title="Edit Group" arrow>
//                       <IconButton
//                         size="medium"
//                         color="inherit"
//                         onClick={() => setOpenModal(true)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                   ) : (
//                     <></>
//                   )}
//                 </Box>

//                 <EditGroupChatModal
//                   open={openModal}
//                   close={() => setOpenModal(false)}
//                 />
//               </>
//             ) : (
//               <>
//                 <Box sx={{ marginLeft: "auto", marginRight: "1em" }}>
//                   <Tooltip title="Info" arrow>
//                     <IconButton
//                       size="medium"
//                       color="inherit"
//                       onClick={() => setOpenModal(true)}
//                     >
//                       <InfoIcon />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>

//                 <ProfileModal
//                   open={openModal}
//                   close={() => setOpenModal(false)}
//                   user={getSenderUser(user, selectedChat.users)}
//                 />
//               </>
//             )}
//           </Header>

//           <Chat>asds</Chat>
//         </>
//       ) : (
//         // when no chat is selected
//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Typography fontFamily={"work sans"} variant="h5">
//               Click on a user to start chating
//             </Typography>
//           </Box>
//         </>
//       )}
//     </>
//   )
// }

// export default CharBoxHeader
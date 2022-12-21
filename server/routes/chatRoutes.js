import express from "express" ;
import { protect } from "../middleware/authMiddleware.js";

import { accessChat ,fetchChat } from "../controller/chatController.js";

const chatRouter = express.Router() ;

chatRouter.post("/",protect ,accessChat) ;
chatRouter.get("/all",protect ,fetchChat) ;
// chatRouter.post("/group/new",protect ,createGroupChat) ;
// chatRouter.put("/group/rename",protect ,renameGroupChat) ;
// chatRouter.put("/group/remove",protect ,removeFromGroup) ;
// chatRouter.put("/group/add",protect ,addToGroup) ;


export default chatRouter ;
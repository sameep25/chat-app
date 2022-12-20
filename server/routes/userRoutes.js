import express from "express" ;

import { registerUser ,authUser} from "../controller/userController.js";

const userRouter = express.Router() ;

userRouter.post("/signup" ,registerUser) ;
userRouter.post("/login" ,authUser) ;

export default userRouter ;
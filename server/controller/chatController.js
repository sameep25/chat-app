import Chat from "../schema/chatSchema.js";
import User from "../schema/userSchema.js";

export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error("UserId param not send with request");
    }

    // checking if chat pre exits
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } }, //current(loggedin-user) user _id
        { users: { $elemMatch: { $eq: userId } } }, //other user id
      ],
    })
      .populate("users", "-password") //populating users array in Chat collection with user data expect password
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    // check if chat exists
    if(isChat.length > 0){
        res.send(isChat[0]) ;
    }else{

        //creating new chat      
        const chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id ,userId] ,
        }

        const createdChat = await Chat.create(chatData) ;
        const FullChat = await Chat.findOne({_id : createdChat._id}).populate("users","-password") ;

        res.status(200).send(FullChat) ;
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

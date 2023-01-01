import Chat from "../schema/chatSchema.js";
import Message from "../schema/messageSchema.js";
import User from "../schema/userSchema.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      throw new Error("Either content or chat-id is missing");
    }

    let newMessage = { sender: req.user._id, content: content, chat: chatId };

    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name picture");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email picture",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {};

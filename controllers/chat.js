import User from '../models/User.js'
import Chat
 from '../models/Chat.js'

 export const createChat = async (req, res) => {
    try {
        const { chatId } = req.params
        const { members } = req.body
        const newChat = new Chat({
            chatId,
            members,
        })
        await newChat.save()
        res.status(201).json(newChat)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const postMessage = async (req, res) => {
    try {
      const { chatId } = req.params;
      const { userId, message } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      const chat = await Chat.findById(chatId);
      if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
      }
  
      const newMessage = {
        userId: userId,
        userName: user.userName,
        message: message,
        userPicturePath: user.picturePath,
        sentAt: new Date()
      };
  
      chat.messages.push(newMessage);
      await chat.save();
  
      res.status(201).json(chat);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };
  
  export default postMessage
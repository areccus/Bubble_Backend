import User from "../models/User.js"
import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
    const {userId, message} = req.body;
    const user = await User.findById(userId)
    const newMessage = new Message({
        userId,
        sender: user.userName,
        recipient: user.userName,
        message: message,
        timestamp: new Date(),
      });

      newMessage.save((err, savedMessage) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while saving the message.' });
        }
    
        return res.json(savedMessage);
      });
}

export const getMessage = async (req, res) => {
  const { sender, recipient } = req.query;

  const senderUser = await User.findOne({ userName: sender });
  const recipientUser = await User.findOne({ userName: recipient });

  if (!senderUser || !recipientUser) {
    return res.status(404).json({ error: "User not found." });
  }

  Message.find({ userId: { $in: [senderUser._id, recipientUser._id] } }, (err, messages) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred while retrieving the messages." });
    }

    return res.json(messages);
  });
};
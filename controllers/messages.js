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

    Message.find({ sender, recipient }, (err, messages) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while retrieving the messages.' });
        }
    
        return res.json(messages);
      });
}
import { EventEmitter } from 'events';
import User from '../models/User.js'
import Chat from '../models/Chat.js'

// create an event emitter to broadcast new messages
const messageEmitter = new EventEmitter();

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

    // emit a new message event
    messageEmitter.emit('newMessage', newMessage);

    res.status(201).json(chat);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getMessage = async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await Chat.findById(chatId);
      if (!chat) {
        res.status(404).json({ message: 'Chat not found' });
        return;
      }
      const messages = chat.messages;
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ users: { $in: [userId] } }).populate('users', 'name email avatar');
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
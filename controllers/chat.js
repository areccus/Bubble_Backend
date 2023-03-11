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
        res.status(404).json({ message: "Chat not found" });
        return;
      }
  
      // set headers for SSE
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();
  
      // listen for new messages and send them to the client
      chat.on('newMessage', (newMessage) => {
        res.write(`data: ${JSON.stringify(newMessage)}\n\n`);
      });
  
      // remove event listener when the client closes the connection
      req.on('close', () => {
        chat.off('newMessage');
        res.end();
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
import User from "../models/User.js"
import Message from "../models/Message.js"
import GroupChat from "../models/GroupChat.js"

export const createMessage = async (req, res) => {
    const {userId, message} = req.body
    const user = await User.findById(userId)
    const newMessage = new Message({
        userId,
        sender: user.userName,
        recipient: user.userName,
        message: message,
        timestamp: new Date(),
      })

      newMessage.save((err, savedMessage) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'An error occurred while saving the message.' })
        }
    
        return res.json(savedMessage)
      })
}

export const getMessage = async (req, res) => {
  const { sender, recipient } = req.query

  const senderUser = await User.findOne({ userName: sender })
  const recipientUser = await User.findOne({ userName: recipient })

  if (!senderUser || !recipientUser) {
    return res.status(404).json({ error: "User not found." })
  }

  Message.find({ userId: { $in: [senderUser._id, recipientUser._id] } }, (err, messages) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: "An error occurred while retrieving the messages." })
    }

    return res.json(messages)
  })
}

export const getMessagedUsers = async (req, res) => {
  try {
    const { userId } = req.params
    const messages = await Message.find({ $or: [{ sender: userId }, { recipient: userId }] })
    const usernames = [...new Set(messages.map((message) => message.sender === userId ? message.recipient : message.sender))]
    res.json(usernames)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to get messaged users." })
  }
}

  // Create group chat
  export const createGroupChat = async (memberUsernames, groupName) => {
    try {
      // Find user documents by their usernames
      const members = await Promise.all(memberUsernames.map(username => User.findOne({ userName: username })))
      const memberIds = members.map(member => member._id)
  
      // Create new group chat
      const newGroupChat = new GroupChat({
        members: memberIds,
        name: groupName,
        messages: []
      })
  
      await newGroupChat.save()
  
      return newGroupChat
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while creating the group chat.')
    }
  }
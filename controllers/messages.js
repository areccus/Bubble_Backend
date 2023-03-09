import User from "../models/User.js"
import Message from "../models/Message.js"
import GroupChat from "../models/GroupChat.js"
import { io } from "../index.js"

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
        
        // Emit the new message to all connected sockets
        io.emit('newMessage', savedMessage)

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
        
        // Emit the list of messaged users to the requesting client
        io.to(req.socket.id).emit('messagedUsers', usernames)

        res.json(usernames)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to get messaged users." })
    }
}

export const createGroupChat = async (req, res) => {
    const { memberUsernames, groupName } = req.body

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

        // Emit the new group chat to all connected sockets
        io.emit('newGroupChat', newGroupChat)

        return res.json(newGroupChat)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'An error occurred while creating the group chat.' })
    }
}
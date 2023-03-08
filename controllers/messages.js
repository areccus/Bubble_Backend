import Chatroom from "../models/chatroom.js"
import Message from "../models/message.js"

// Create a new chatroom
export const createChatroom = async (req, res) => {
  const { name, description, members } = req.body

  try {
    // Create a new chatroom document
    const newChatroom = new Chatroom({
      name,
      description,
      members,
    })

    // Save the new chatroom to the database
    await newChatroom.save()

    res.status(201).json(newChatroom)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create chatroom" })
  }
}

export const sendChatroomMessage = async (req, res) => {
  const { chatroomId, sender, message } = req.body

  try {
    // Create a new message document
    const newMessage = new Message({
      sender,
      message,
    })

    // Save the new message to the database
    await newMessage.save()

    // Add the new message to the chatroom's message array
    const chatroom = await Chatroom.findByIdAndUpdate(
      chatroomId,
      {
        $push: { messages: newMessage._id },
      },
      { new: true }
    )

    res.status(201).json(chatroom)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to send message" })
  }
}

// Get a chatroom by ID
export const getChatroom = async (req, res) => {
  const { chatroomId } = req.params

  try {
    // Find the chatroom document by ID and populate the members and messages arrays
    const chatroom = await Chatroom.findById(chatroomId)
      .populate("members", "username")
      .populate("messages", "sender message createdAt")

    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" })
    }

    res.status(200).json(chatroom)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to get chatroom" })
  }
}
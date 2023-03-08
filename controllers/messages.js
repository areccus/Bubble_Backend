import Chatroom from "../models/chatroom.js"
import User from "../models/User.js"

// Create a new chatroom
export const createChatroom = async (req, res, next) => {
  const { name, members } = req.body

  try {
    const newChatroom = new Chatroom({
      name,
      members: [],
      messages: [],
    })

    // Add members to the chatroom
    for (const memberId of members) {
      const user = await User.findById(memberId)
      if (!user) {
        return res.status(400).json({ error: `User with ID ${memberId} not found` })
      }
      newChatroom.members.push({
        userId: user._id.toString(), // Replace with your custom ID
        username: user.username,
      })
    }

    await newChatroom.save()

    res.status(201).json(newChatroom)
  } catch (error) {
    next(error)
  }
}

// export const sendChatroomMessage = async (req, res, next) => {
//   const { chatroomId, sender, message } = req.body

//   try {
//     const chatroom = await Chatroom.findById(chatroomId)

//     if (!chatroom) {
//       throw new Error(`Chatroom with ID ${chatroomId} not found`)
//     }

//     const newMessage = {
//       userId: req.user._id.toString(), // Replace with your custom ID
//       sender,
//       message,
//     }

//     chatroom.messages.push(newMessage)
//     await chatroom.save()

//     res.status(201).json(chatroom)
//   } catch (error) {
//     next(error)
//   }
// }

// // Get a chatroom by ID
// export const getChatroom = async (req, res, next) => {
//   const chatroomId = req.params.id

//   try {
//     const chatroom = await Chatroom.findById(chatroomId)

//     if (!chatroom) {
//       throw new Error(`Chatroom with ID ${chatroomId} not found`)
//     }

//     res.json(chatroom)
//   } catch (error) {
//     next(error)
//   }
// }
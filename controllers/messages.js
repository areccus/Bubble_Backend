import User from "../models/User.js"
import Message from "../models/Message.js"
// import GroupChat from "../models/GroupChat.js"

export const createMessage = async (req, res) => {
  try {
    const { userId, recipient, message } = req.body
    const user = await User.findById(userId)
    const newMessage = new Message({
      userId,
      userName: user.userName,
      recipient,
      userPicturePath: user.picturePath,
      message
    })
    await newMessage.save()

    const msg = await Message.find()
    res.status(201).json(msg)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
};


export const getMessage = async (req, res) => {
  try {
    const msg = await Message.find()
    res.status(200).json(msg)
  } catch (err) {
    res.status(404).json({ message: err.message})
  }

}

// export const getMessagedUsers = async (req, res) => {
//   try {
//     const { userId } = req.params
//     const messages = await Message.find({ $or: [{ sender: userId }, { recipient: userId }] })
//     const usernames = [...new Set(messages.map((message) => message.sender === userId ? message.recipient : message.sender))]
//     res.json(usernames)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "Failed to get messaged users." })
//   }
// }

//   // Create group chat
//   export const createGroupChat = async (memberUsernames, groupName) => {
//     try {
//       // Find user documents by their usernames
//       const members = await Promise.all(memberUsernames.map(username => User.findOne({ userName: username })))
//       const memberIds = members.map(member => member._id)
  
//       // Create new group chat
//       const newGroupChat = new GroupChat({
//         members: memberIds,
//         name: groupName,
//         messages: []
//       })
  
//       await newGroupChat.save()
  
//       return newGroupChat
//     } catch (error) {
//       console.error(error)
//       throw new Error('An error occurred while creating the group chat.')
//     }
//   }
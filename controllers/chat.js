import User from '../models/User.js'
import Chat
 from '../models/Chat.js'

 export const createChat = async (req, res) => {
    try {
        const { chatId } = req.params
        const { members, message } = req.body
        const users = await User.find({ _id: { $in: members } })
        const messages = users.map(user => ({
            userId: user._id,
            userName: user.userName,
            message,
            userPicturePath: user.picturePath
        }))
        const newChat = new Chat({
            chatId,
            members,
            messages
        })
        await newChat.save()
        res.status(201).json(newChat)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}
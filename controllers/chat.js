import User from '../models/User.js'
import Chat
 from '../models/Chat.js'

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
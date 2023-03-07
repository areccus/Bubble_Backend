import mongoose from "mongoose"
import User from "./User"
import Message from "./Message"

const ChatroomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message'
            }
        ],
    },
    {timestamps: true}
)

const Chatroom = mongoose.model('Chatroom', ChatroomSchema)
export default Chatroom
import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    recipient: {
      type: String,
      required: true
    },
    picturePath: String,
    message: {
      type: String,
      required: true
    }
  },
  {timestamps: true}
)

const Message = mongoose.model('Message', MessageSchema)
export default Message
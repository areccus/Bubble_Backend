import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    members: [{
      userId: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      userPicturePath: String
    }],
    messages: [{
      userId: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      message: String,
      userPicturePath: String,
      sentAt: {
        type: Date,
        required: true,
        default: Date.now
      }
    }]
  })
  
  const Chat = mongoose.model('GroupChat', chatSchema)

  export default Chat
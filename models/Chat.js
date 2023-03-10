import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    members: [{
      type: String,
      required: true
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
    }]
  })
  
  const Chat = mongoose.model('GroupChat', chatSchema)

  export default Chat
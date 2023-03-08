import mongoose from "mongoose"

const groupChatSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }]
  })
  
  const GroupChat = mongoose.model('GroupChat', groupChatSchema)

  export default GroupChat
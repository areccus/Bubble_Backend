import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
},
    sender: String,
    recipient: String,
    message: String,
    timestamp: Date,
  });

const Message = mongoose.model('Message', messageSchema);

export default Message
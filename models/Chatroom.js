import mongoose from "mongoose"

const ChatroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    messages: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Message",
      default: [],
    },
  },
  { timestamps: true }
);

const Chatroom = mongoose.model("Chatroom", ChatroomSchema);
export default Chatroom
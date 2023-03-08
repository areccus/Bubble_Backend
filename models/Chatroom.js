// import mongoose from "mongoose"

// const ChatroomSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     members: [
//         {
//             userId: {
//             type: String,
//             required: true
//             },
//             userName: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
//     messages: [
//         {
//             userId: {
//               type: String,
//               required: true,
//               ref: "User",
//             },
//             sender: {
//               type: String,
//               required: true,
//             },
//             message: {
//               type: String,
//               required: true,
//             },
//             createdAt: {
//               type: Date,
//               default: Date.now,
//             },
//         }
//     ]
//   },
//   { timestamps: true }
// );

// const Chatroom = mongoose.model("Chatroom", ChatroomSchema);
// export default Chatroom
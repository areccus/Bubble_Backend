export const createChatroom = async (name, description, members) => {
  const newChatroom = new Chatroom({
    name: name,
    description: description,
    members: members,
  });

  await newChatroom.save()

  for (const memberId of members) {
    const member = await User.findById(memberId)
    member.chatrooms.push(newChatroom._id)
    await member.save()
  }
};

export const sendChatroomMessage = async (chatroomId, senderId, message) => {
  const newMessage = new Message({
    sender: senderId,
    message: message,
  });

  await newMessage.save();

  const chatroom = await Chatroom.findById(chatroomId)

  chatroom.messages.push(newMessage._id)

  await chatroom.save()
}
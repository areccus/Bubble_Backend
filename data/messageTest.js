import mongoose from "mongoose";


const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ];

export const messages = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[0],
        sender: 'areccus',
        recipient: 'somebody',
        message: 'This is a message.'
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        sender: 'somebody',
        recipient: 'areccus',
        message: 'This is the second message.'
    }
]
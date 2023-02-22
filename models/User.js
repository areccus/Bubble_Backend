import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            min: 3,
            max: 30,
        },
        firstName: {
            type: String,
            required: true,
            min: 1,
            max: 256,
        },
        lastName: {
            type: String,
            required: true,
            min: 1,
            max: 256,
        },
        email: {
            type: String,
            required: true,
            min: 3,
            max: 256,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 256,
        },
        picturePath: {
            type: String,
            default: '',
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    {timestamps: true}
)

const User = mongoose.model('User', UserSchema)
export default User
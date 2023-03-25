import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body
    const user = await User.findById(userId)
    const picturePath = req.file ? `https://storage.googleapis.com/${bucketName}/${req.file.originalname}` : null;
    const newPost = new Post({
      userId,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    })
    await newPost.save()

    res.status(201).json(newPost) // Send the newly created post in the response
  } catch (err) {
    res.status(409).json({ message: err.message, stack: err.stack })
  }
}


/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const post = await Post.find({ userId })
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

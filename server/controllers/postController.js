import Post from "../models/postModel.js";
import User from "../models/userModel.js";
export const addPost = async function (req, res) {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      description,
      picturePath,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      location: user.location,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const updatedPosts = await Post.find({});
    res.status(201).json({
      status: "success",
      results: updatedPosts.length,
      data: updatedPosts,
    });
  } catch (err) {
    res.status(409).json({
      status: "fail",
      error: err.message,
    });
  }
};

export const getAllPosts = async function (req, res) {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};
export const getUserPosts = async function (req, res) {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};
export const likeUnlikePost = async function (req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      results: 1,
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};

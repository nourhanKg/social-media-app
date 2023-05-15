import User from "../models/userModel.js";

export const getUserById = async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      status: "success",
      results: 1,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};
export const getUserFriends = async function (req, res) {
  console.log("works");
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json({
      status: "success",
      results: formattedFriends.length,
      data: formattedFriends,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};
export const addRemoveFriends = async function (req, res) {
  console.log("adding friend");
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((fId) => fId !== friendId);
      friend.friends = friend.friends.filter((fId) => fId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    await User.findByIdAndUpdate(friendId, friend, {
      new: true,
      runValidators: true,
    });
    const friends = await Promise.all(
      updatedUser.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json({
      status: "success",
      results: 1,
      data: formattedFriends,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};

const CryptoJs = require("crypto-js");
const mongoose = require("mongoose");

const User = require("../models/User");

const { jwtSign } = require("../helper/auth");

/** Update a specific user */
const updateUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const user = req.user;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "Provide all neccessary data" });
    }

    if (user.email !== email || user.username !== username) {
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: user._id } },
          { $or: [{ email: email }, { username: username }] },
        ],
      });

      if (existingUser)
        return res
          .status(405)
          .json({ message: "User with same username or email already exists" });
    }

    const SALT = process.env.PASS_SALT.toString();
    const encryptedPassword = CryptoJs.AES.encrypt(password, SALT);

    user.fullName = fullName;
    user.username = username;
    user.email = email;
    user.password = encryptedPassword;

    const updateUser = await User.findByIdAndUpdate(user._id, user, {
      new: true /** new is set to true for returning the update object */,
    });
    const response = await jwtSign(updateUser);

    return res.status(200).json(response);
  } catch (error) {
    console.log("user.js controller, updateUser function ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

/** Delete a specific user */
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log("user controller, deleteUser\n", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Get a specific user (just for admin)*/
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(401).json({ message: "Invalid user id" });

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    console.log("user controller, getUser\n", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateUser, deleteUser, getUser };

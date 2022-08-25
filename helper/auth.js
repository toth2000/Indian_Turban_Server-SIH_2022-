const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const {
  refresh_token_expire_time,
  access_token_expire_time,
} = require("../config");

const User = require("../models/User");

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const jwtSign = async (user) => {
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: refresh_token_expire_time,
  });

  const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
    expiresIn: access_token_expire_time,
  });

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { refreshToken: refreshToken },
    { new: true }
  );

  console.log("UpdatedUser", updatedUser);

  // Destructing password and other from user object
  // To return user without hashed password
  const { password, ...others } = user._doc;
  const response = { ...others, refreshToken, accessToken };

  return response;
};

module.exports = { jwtSign };

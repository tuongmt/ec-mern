const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequestError("Please provide necessary information");
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(200).json({
    message: "User created",
    token,
    username: user.username,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide necessary information");
  const user = await User.findOne({ email: email });
  if (!user) throw new UnauthorizedError("Invalid email");
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) throw new UnauthorizedError("Invalid password");
  const token = user.createJWT();
  res.status(200).json({
    message: "User found",
    token,
    username: user.username,
  });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide necessary information");
  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) throw new UnauthorizedError("Invalid email");
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) throw new UnauthorizedError("Invalid password");
  if (user.roleId != "R2") throw new UnauthorizedError("Unauthorized admin");

  const token = user.createJWT();
  res.status(200).json({
    message: "User found",
    token,
    username: user.username,
  });
};

const dashboard = async (req, res) => {
  res.status(200).json({ message: "success" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password -roleId");
  res.status(200).json({ users });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError(`No user with email ${email}`);
  const resetPasswordToken = await jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  user.resetPasswordToken = resetPasswordToken;
  await user.save();
  res.status(200).json({ resetPasswordToken });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_APP_KEY,
  },
});

const sendEmail = async (req, res) => {
  const { email, token } = req.body;
  const mailOptions = {
    from: { name: "TGro Grocery", address: process.env.GMAIL_USERNAME }, // Change to your verified sender
    to: email, // Change to your recipient
    subject: "Reset password",
    text: `Reset your password here ${process.env.FRONTEND_URL}/reset-password/${token}`,
  };
  console.log(mailOptions);
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent");
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ info });
};

const resetPassword = async (req, res) => {
  const { email, token } = req.user;
  const user = await User.findOneAndUpdate(
    {
      email,
      resetPasswordToken: token,
    },
    req.body,
    { new: true, runValidators: true }
  );
  user.resetPasswordToken = undefined;
  await user.save();
  res.status(200).json({ user });
};

module.exports = {
  signup,
  login,
  dashboard,
  getAllUsers,
  forgotPassword,
  sendEmail,
  resetPassword,
  loginAdmin,
};

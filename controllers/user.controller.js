const User = require("../models/user.model");
const Password = require("../utils/password.util");
const JWT = require("../utils/jwt.util");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await Password.hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = Password.comparePassword(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = JWT.generateToken(user)

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const { full_name, avatar_url, bio } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.full_name = full_name || user.full_name;
    user.avatar_url = avatar_url || user.avatar_url;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  deleteAccount,
};

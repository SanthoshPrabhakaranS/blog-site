import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const file = req.file
    const imageUrl = `http://localhost:5001/uploads/${file.filename}`
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      userImage: imageUrl,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.status(201).json({ message: "User successfully registered!" });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(200).json({ message: "User does not exist!" });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(200).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({
      token,
      userId: user._id,
      userName: user.userName,
      userImage: user.userImage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

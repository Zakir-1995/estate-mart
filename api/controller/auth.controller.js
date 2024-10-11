import User from '../models/user.model.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';

export const Signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(500)
        .json({ message: "User already exists!", success: false, error: true });
    }

    if (!username || !email || !password) {
      return res.status(500).json({
        message: "All fields are Required!",
        success: false,
        error: true,
      });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Email is Invalid!", success: false, error: true });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password Should be Strong!",
        success: false,
        error: true,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User Register Successfully",
      success: true,
      error: false,
    });
  } catch (err) {
   next(errorHandler(500,err.message));
  }
};

export const Signin = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ error: true, success: false, message: "Invalid Credentials!" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(500)
        .json({ error: true, success: false, message: "Invalid Credentials!" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    const tokenOption = {
      httpOnly: true,
      // secure: true,
      maxAge: age,
    };

    res.cookie("token", token, tokenOption).json({
      success: true,
      error: false,
      message: "user login successfully!",
      data: { email: user.email, username: user.username },
    });
  } catch (err) {
   next(errorHandler(500, err.message));
  }
};

export const Signout = async (req, res) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ success: true, error: false, message: "Logout Successfully" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

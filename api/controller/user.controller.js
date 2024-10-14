import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const getUsers = async (req, res) => {
  try {
    return res.status(200).json({
      message: "works fine!",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(200).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req?.userId;
  if (userId !== req?.params.id) {
    return res.status(500).json({ message: "UnAuthorized!" });
  }

  try {
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updateUser._doc;
    return res.status(200).json({
      message: "User Updated Successfully!",
      error: false,
      success: true,
      data: rest,
    });
  } catch (err) {
    return res.status(200).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const register = async (req, res) => {
  try {
    return res.status(200).json({
      message:"works fine!",
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

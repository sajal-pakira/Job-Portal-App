import userModel from "../models/user.model.js";

export const registerController = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      next("Name is required to register");
    }
    if (!email) {
      next("Email is required to register");
    }
    if (!password) {
      next("Password is required & it should contain at least 6 characters");
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      next("User already exists, please login")
    }
    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

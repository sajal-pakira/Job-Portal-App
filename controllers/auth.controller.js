import userModel from "../models/user.model.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return next(new Error("Name is required to register"));
  }
  if (!email) {
    return next(new Error("Email is required to register"));
  }
  if (!password || password.length < 6) {
    return next(
      new Error("Password is required and must be at least 6 characters")
    );
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(new Error("User already exists, please login"));
  }

  const user = await userModel.create({ name, email, password });

  res.status(201).send({
    success: true,
    message: "User registered successfully",
    user,
  });
};

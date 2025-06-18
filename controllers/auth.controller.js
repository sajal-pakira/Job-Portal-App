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

  //token
  const token = user.createJWT();

  res.status(201).send({
    success: true,
    message: "User registered successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      _id: user._id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("Provide email and password"));
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new Error("Invalid email and password"));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new Error("Incorrect email or Password"));
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
    token,
  });
};

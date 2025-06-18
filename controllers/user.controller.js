import userModel from "../models/user.model.js";

export const updateUserController = async (req, res, next) => {
  const { name, lastName, location, email } = req.body;
  if (!name && !lastName && !location && !email) {
    return next(new Error("Please provide at least one field to update"));
  }

  const user = await userModel.findById(req.user.userId);

  // Update only if the field is present
  if (name) user.name = name;
  if (lastName) user.lastName = lastName;
  if (location) user.location = location;
  if (email) user.email = email;
  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      _id: user._id,
    },
    token,
  });
};

import userModel from "../models/user.model.js";

export const updateUserController = async (req, res, next) => {
  const { name, lastName, location, email } = req.body;
  if (!name || !lastName || !location || !email) {
    return next(new Error("Please provide all required fields"));
  }
  const user = await userModel.findOne({
    _id: req.user.userId,
  });
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  user.email = email;
  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    success:true,
    message: "User updated successfully",
    user,
    token,
  });
};

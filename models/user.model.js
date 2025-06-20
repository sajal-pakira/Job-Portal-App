import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "please give at least 6 characters in password"],
      select: true,
    },
    location: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare passwords
userSchema.methods.comparePassword = async function (userPassword) {
  const ismatch = await bcrypt.compare(userPassword, this.password);
  return ismatch;
};

// Generate JWT
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default mongoose.model("User", userSchema);

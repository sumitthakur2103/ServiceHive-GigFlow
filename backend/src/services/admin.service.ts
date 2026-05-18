import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const createAdminAccount = async (input: { name: string; email: string; password: string }) => {
  const existingUser = await User.findOne({ email: input.email.toLowerCase() });

  if (existingUser && existingUser.role === "Admin") {
    throw new AppError(409, "Admin account already exists for this email");
  }

  const password = await bcrypt.hash(input.password, 12);

  const user = await User.findOneAndUpdate(
    { email: input.email.toLowerCase() },
    {
      $set: {
        name: input.name,
        email: input.email.toLowerCase(),
        password,
        role: "Admin"
      }
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  ).select("name email role");

  if (!user) {
    throw new AppError(500, "Failed to create admin account");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  };
};

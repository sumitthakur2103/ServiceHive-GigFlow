import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User, type UserRole } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

const signToken = (id: string, role: UserRole): string => {
  return jwt.sign({ id, role }, env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ token: string; user: { id: string; name: string; email: string; role: UserRole } }> => {
  const existingUser = await User.findOne({ email: input.email.toLowerCase() });
  if (existingUser) {
    throw new AppError(409, "Email already registered");
  }

  const password = await bcrypt.hash(input.password, 12);
  const user = await User.create({ ...input, email: input.email.toLowerCase(), password, role: "Sales User" });
  const token = signToken(user._id.toString(), user.role as UserRole);

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role as UserRole
    }
  };
};

export const loginUser = async (input: {
  email: string;
  password: string;
}): Promise<{ token: string; user: { id: string; name: string; email: string; role: UserRole } }> => {
  const user = await User.findOne({ email: input.email.toLowerCase() });
  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = signToken(user._id.toString(), user.role as UserRole);
  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role as UserRole
    }
  };
};

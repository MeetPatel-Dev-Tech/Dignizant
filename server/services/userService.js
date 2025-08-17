import User from "../models/User.js";

// Create a new user
export const createUser = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ first_name, last_name, email, password });
  return user;
};

// Find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Validate user password
export const validatePassword = async (user, password) => {
  return await user.matchPassword(password);
};

// ✅ Find all users (exclude passwords)
export const findAllUsers = async () => {
  return await User.find().select("-password");
};

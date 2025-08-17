import User from "../models/User.js";

// Create a new user
export const createUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ name, email, password });
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

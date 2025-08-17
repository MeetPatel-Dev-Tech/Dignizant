import { sendResponse } from "../utils/response.js";
import {
  createUser,
  findUserByEmail,
  validatePassword,
} from "../services/userService.js";
import generateToken from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const user = await createUser({ first_name, last_name, email, password });
    const token = generateToken(user._id);

    return sendResponse(
      res,
      201,
      true,
      "User registered successfully",
      {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token
    );
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return sendResponse(res, 400, false, "Invalid credentials");

    const isValid = await validatePassword(user, password);
    if (!isValid) return sendResponse(res, 400, false, "Invalid credentials");

    const token = generateToken(user._id);

    return sendResponse(
      res,
      200,
      true,
      "Login successful",
      {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token
    );
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

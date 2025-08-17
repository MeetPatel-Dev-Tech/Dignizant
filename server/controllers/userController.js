import { findAllUsers } from "../services/userService.js";
import { sendResponse } from "../utils/response.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    return sendResponse(res, 200, true, "Users fetched successfully", users);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

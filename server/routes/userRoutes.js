import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { fetchAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/allUsers", protect, fetchAllUsers);

export default router;

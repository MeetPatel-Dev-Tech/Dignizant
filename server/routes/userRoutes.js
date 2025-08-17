import express from "express";
import { registerUser, authUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;

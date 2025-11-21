import express from 'express';
import { registerUser, loginUser, getUserDetails, logoutUser } from '../controllers/authController.js';
import { verify } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verify, logoutUser);
router.get("/user-details", verify, getUserDetails);

export default router;
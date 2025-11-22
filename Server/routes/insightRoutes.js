import express from 'express';
import { createInsight } from '../controllers/insightController.js';
import { verify } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post("/create", verify, upload.single("file"), createInsight);

export default router;
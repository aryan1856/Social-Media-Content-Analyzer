import express from 'express';
import { createInsight, getInsightsOfUser} from '../controllers/insightController.js';
import { verify } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post("/create", verify, upload.single("file"), createInsight);
router.get("/user/fetch", verify, getInsightsOfUser);

export default router;
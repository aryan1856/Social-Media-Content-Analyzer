import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './utils/db_config.js';
import authRoutes from './routes/authRoutes.js';
import insightRoutes from './routes/insightRoutes.js';
import cloudinary from 'cloudinary';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    credentials : true,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin : process.env.FRONTEND_URL
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET_KEY
});

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/insights", insightRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
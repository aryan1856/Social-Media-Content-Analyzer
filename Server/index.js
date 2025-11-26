import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './utils/db_config.js';
import authRoutes from './routes/authRoutes.js';
import insightRoutes from './routes/insightRoutes.js';
import cloudinary from 'cloudinary';

connectDB();

const app = express();
const port = process.env.PORT || 8080;

// Simplified CORS configuration (no credentials needed for localStorage)
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET_KEY
});

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/insights", insightRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
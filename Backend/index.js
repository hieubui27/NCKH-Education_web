import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: ["http://localhost:5173", "https://e-commerce-two-rho-64.vercel.app"],
  credentials: true // Cho phép mang theo Cookie/Token
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server đang chạy ở http://localhost:${PORT}`);
});
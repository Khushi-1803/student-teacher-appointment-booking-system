import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import teacherRouter from './routes/teacherRoute.js';
import userRouter from './routes/userRoute.js';

// Create Express app
const app = express();

// DB & Cloudinary Connections (run only once)
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/user', userRouter);

// Root route
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// ✅ Instead of app.listen, export the app for Vercel
export default app;

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import teacherRouter from './routes/teacherRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;

// DB & Cloudinary
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

// Local dev server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Export for Vercel
export default app;

import express  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
connectDB();
import userRoutes from './routes/userRoutes.js';
import doctorRoute from "./routes/doctor.js";
import adminRoutes from './routes/adminRoutes.js'
 import path from 'path';





const app = express();

const corsOptions={
    origin:true,
    credentials:true
}

// middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true,
  }));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorRoute);
app.use("/api/v1/admin",adminRoutes);


// app.get('/', (req, res) => res.send('API running'));
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
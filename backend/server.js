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
// import adminRoutes from './routes/adminRoutes.js'





const app = express();

const corsOptions={
    origin:true,
    credentials:true

}

// middleware
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



// app.use("/api/admin", adminRoutes);
app.get('/', (req, res) => res.send('API running'));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
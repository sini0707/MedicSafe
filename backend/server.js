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
  import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from "./routes/MessageRoute.js";
import { Server } from 'socket.io'; 
import { createServer } from 'http';








const app = express();
const server = createServer(app);

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
 app.use("/chat",ChatRoute);
 app.use('/message',MessageRoute)


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
//  const server=app.listen(port, () => console.log(`Server started on port ${port}`));


//  const io = new Server(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");
// });
// socket.on("setup", (user) => {
//   socket.join(user);
//   console.log(user, "userId");
//   socket.emit("connected");
// });


server.listen(port, () => console.log(`Server started on port ${port}`));
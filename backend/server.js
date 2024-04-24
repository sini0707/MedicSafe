import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
connectDB();
import userRoutes from "./routes/userRoutes.js";
import doctorRoute from "./routes/doctor.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";

import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
// const server = createServer(app);

const corsOptions = {
  origin: true,
  credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/admin", adminRoutes);
//  app.use("/chat",ChatRoute);
//  app.use('/message',MessageRoute)

// app.get('/', (req, res) => res.send('API running'));
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);


const server = app.listen(port, () => {
  try {
    connectDB();
    console.log("Server is running on port", port);
  } catch (error) {
    console.log(error);
  }
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});
let users=[];
io.on("connection", (socket) => {
 

  socket.on("setup", (user) => {
 
    socket.join(user);
    users.push(user)
  
    socket.emit("connected");
  });
  socket.on("join_chat", (room) => {
 
    socket.join(room);
  });

//   socket.on("new Message", (newMessageRecived) => {
    
//     let chat = newMessageRecived;
 
   
   

   

//     if (!chat.room.user || !chat.room.doctor) {
//       return console.log("chat.users  not defined  ");
//     }

//     // chat.user.forEach((user) => {
//     //   if (user._id == newMessageRecived.sender._id) return;
//     //   socket.in(user._id).emit("message received", newMessageRecived);
//     // });
   
//     // if (chat.room.room.user._id===newMessageRecived.room.sender._id) return;
//       io.to(chat.room._id).emit("message received", newMessageRecived);
//     // users.forEach((user)=>{
//     //   if(user===chat.room.user){
//     //     io.to(user).emit('message recieved',newMessageRecived)
//     //   }
//     // })
//   });
// });
socket.on("new Message", (newMessageRecived) => {


  var chat = newMessageRecived.room;

  if (!chat.user || !chat.doctor) {
    return console.log("chat.users  not defined  ");
  }

  socket.in(chat._id).emit("message received", newMessageRecived);

  if (chat.user._id === newMessageRecived.sender._id) {
    socket.to(chat._id).emit("message recevied", newMessageRecived);
  }

  if (chat.doctor._id === newMessageRecived.sender._id) {
    socket.to(chat._id).emit("message recevied", newMessageRecived);
  }
});

socket.off("setup", () => {
  console.log("User Disconnected");
  socket.leave(user);
});
});


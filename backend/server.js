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
import { log } from "console";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename=fileURLToPath(import.meta.url);
console.log(__filename,"filname");
const __dirname=dirname(__filename);
console.log(__dirname,"dirname");

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"public")));


const corsOptions = {
  origin: true,
  credentials: true,
};


app.use(cors(corsOptions));

const currentWorkingDir=path.resolve();
console.log(currentWorkingDir,'current');
const parentDir=path.dirname(currentWorkingDir);
console.log(parentDir,'parentdir');



app.use(
  cors({
        //  origin: "http://localhost:5173",
       origin: "https://www.medicsafe.online, https://medicsafe.online",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV, "producton");
  const __dirname = path.resolve();
  console.log(__dirname, "directory");

  app.use(express.static(path.join(parentDir, "/frontend/dist")));
  // const frontendPath = path.join(__dirname, "../frontend/dist");
  // console.log(frontendPath, "frontend path");

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(parentDir,"frontend","dist", "index.html"))
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
let users = [];
io.on("connection", (socket) => {
  let typingTimeoutRef = null;
  socket.on("setup", (user) => {
    socket.join(user);
    users.push(user);

    socket.emit("connected");
  });
  socket.on("join_chat", (room) => {
    socket.join(room);
  });

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

  socket.on("typing", ({ roomID, isTyping }) => {
    socket.to(roomID).emit("typing", { roomID, isTyping });

    if (typingTimeoutRef !== null) {
      clearTimeout(typingTimeoutRef);
    }

    typingTimeoutRef = setTimeout(() => {
      socket.to(roomID).emit("typing", { roomID, isTyping: false });
      typingTimeoutRef = null;
    }, 3000);
  });
  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(user);
  });
});

import express from "express";

import {
  register,
  DoctorLogin,
  logoutDoctor,
  DoctorOtpVerify,
  forgotEmailCheck,
  updatedDoctor,
  manageTime,
  deleteTimings,
  getTimings,
  getDoctor,
  getSingleDoctor,
  bookingDetails,
  approveVideoCall,
  
  
} from "../Controllers/DoctorController.js";

import {
  getDoctorRooms,
  getRoomMessages,
  sendChat,
  MarkMessageAsRead
  
} from "../Controllers/ChatController.js"

import { protect } from "../middleware/DoctorAuthMiddleware.js";
import {submitReply} from "../Controllers/reviewController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login",DoctorLogin);
router.post("/logout",logoutDoctor);
router.post("/otp", DoctorOtpVerify);
router.post("/forgot-email-check", forgotEmailCheck);
router.get("/profile/me", protect, getDoctor);
router.post("/updatedoctor/:id", updatedDoctor);
router.post("/managetime", manageTime);
router.get("/delete-timing/:docId/:id", deleteTimings);
router.get("/get-timings/:id", getTimings);
router.get("/getdoctor/:id", getSingleDoctor);
router.get("/booking-details/:docId", bookingDetails);  
router.post("/approveVideoCall/:id", approveVideoCall);
router.put("/submitreply/:id",submitReply);

router.get("/get-doctor-rooms/:id", getDoctorRooms);
router.get("/get-rooms-messages/:roomId", getRoomMessages);
router.post("/sendChat/:roomId/:sender/:type/:Id/:senderName",sendChat);
router.put("/mark-room-message-read/:id",MarkMessageAsRead);



export default router;

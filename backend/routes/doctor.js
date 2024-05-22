import express from "express";

import {
  register,
  GetSpecialization,
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
  DoctorChangePassword,
  generatePrescription,
  
  
} from "../Controllers/DoctorController.js";

import {
  getDoctorRooms,
  getRoomMessages,
  sendChat,
  MarkMessageAsRead,
  getNotification,
  clearNotification

 
  
  
} from "../Controllers/ChatController.js"

import { protect } from "../middleware/DoctorAuthMiddleware.js";
import {submitReply} from "../Controllers/reviewController.js";

const router = express.Router();
router.post("/register",register);
router.get('/getspecializations',GetSpecialization);
router.post("/login",DoctorLogin);
router.post("/logout",logoutDoctor);
router.post("/otp", DoctorOtpVerify);
router.post("/forgot-email-check", forgotEmailCheck);
router.get("/profile/me", protect, getDoctor);
router.post("/updatedoctor/:id", updatedDoctor);
router.post("/managetime",manageTime);
router.get("/delete-timing/:docId/:id",protect,deleteTimings);
router.get("/get-timings/:id", getTimings);
router.get("/getdoctor/:id", getSingleDoctor);
router.get("/booking-details/:docId", bookingDetails);  
router.post("/approveVideoCall/:id", approveVideoCall);
router.put("/submitreply/:id",submitReply);
router.post("/changepassword",DoctorChangePassword);
router.post('/generate-prescription/:id',protect,generatePrescription)
router.get("/get-doctor-rooms/:id", getDoctorRooms);
router.get("/get-rooms-messages/:roomId", getRoomMessages);
router.post("/sendChat/:roomId/:sender/:type/:Id/:senderName",sendChat);
router.put("/mark-room-message-read/:id",MarkMessageAsRead);
router.post("/getDoctorNotifications",protect,getNotification);
router.post("/clearDoctorNotification",protect,clearNotification);






export default router;

import express from "express";

import {
  login,
  forgotEmailCheck,
  forgotOtpVerify,
  register,
  otpVerify,
  resendEmailCheck,
  resetPassword,
  Google,
  getUserProfile,
  getMyAppointments,
  CancelBooking,
  getAllUser,
  getSingleUser,
  logoutUser,
  updateUser,
  getDoctors,
  ChangePassword,
  getDoctorTimings,
  MakeVideoCall,
  getUserWallet,
  checkFeedback,
  UserBookings,
  
} from "../Controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

import {
  createReview,
  getAllReviews,
  submitReply,
} from "../Controllers/reviewController.js";

import {
  getRoomMessages,
  getRoom,
  createRoom,
  sendChat,
  getNotification,
  clearNotification
  
} from "../Controllers/ChatController.js";

const router = express.Router();

router.post("/register", register);
router.post("/otpverify", otpVerify);
router.post("/login", login);
router.post("/forgot-email-check", forgotEmailCheck);
router.post("/forget-otp-verify", forgotOtpVerify);
router.post("/resend-email-check", resendEmailCheck);

router.post("/reset-password", resetPassword);
router.post("/google", Google);
router.post("/logout", logoutUser);
router.get("/getdoctors", getDoctors);

router.get("/profile/me", protect, getUserProfile);
router.post("/updateUser/:id", protect, updateUser);
router.post("/changepassword", ChangePassword);
router.get("/appointments/myappointments", protect, getMyAppointments);
router.get("/:id", protect, getSingleUser);
router.get("/", protect, getAllUser);
router.put("/cancelBooking/:id", protect, CancelBooking);
router.post("/createreviews", protect, createReview);
router.get("/getallreviews/:id", protect, getAllReviews);

router.post("/get-wallet", getUserWallet);

router.get("/FeedbackCheck/:id", protect, checkFeedback);

router.get("/get-timings/:doctorId", getDoctorTimings);

router.post("/checkout-session/:doctorId/:userId", getCheckoutSession);

router.get("/bookings/:userId",UserBookings)

router.get("/makeVideoCall/:id", MakeVideoCall);
router.get("/getRoomMessage/:roomId",getRoomMessages);
router.get("/getRoom/:doctorId/:userId",getRoom);
router.post(
  "/createRoom/:doctorId/:userId",
  createRoom
);
router.post(
  "/sendChat/:sender/:roomId/:type/:Id/:senderName",
  sendChat
);

router.get("/getUserNotifications",protect, getNotification);
router.post("/clearNotification", clearNotification);

export default router;

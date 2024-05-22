import express from "express";
import { protect } from "../middleware/AdminMiddleware.js";
import {
  adminLogin,
  getUsers,
  getDoctors,
  blockUsers,
  approveDoctors,
  unblockUser,
  rejectDoctors,
  addSpecialization,
  getAllSpecialization,
  adminLogoutUser,
  getBooking,
  getMonthlyBooking,
  YearlyBooking,
  cancelBooking,
} from "../Controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/userlist", protect, getUsers);
router.put("/block-user/:id", protect, blockUsers);
router.put("/unblock-user/:id", protect, unblockUser);

router.put("/approve/:id", protect, approveDoctors);
router.put("/reject/:id", protect, rejectDoctors);
router.get("/doctordata", protect, getDoctors);

router.post("/specialization", protect, addSpecialization);
router.get("/getspecialization", getAllSpecialization);

router.post("/adminlogout", adminLogoutUser);
router.get("/MonthlyBooking", getMonthlyBooking);
router.get("/getBooking", protect, getBooking);
router.put("/cancelBooking/:id", protect, cancelBooking);
router.get("/YearlyBooking",protect,YearlyBooking);

export default router;

import express from 'express';

import {
  login,
  forgotEmailCheck,
  forgotOtpVerify,
  register,
  otpVerify,
   resetPassword,
  getUserProfile,
  getMyAppointments,
  updatedUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  logoutUser
  // updateUserProfile,
} from '../Controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/otpverify',otpVerify);
router.post('/login',login);
router.post('/forgot-email-check',forgotEmailCheck);
router.post('/forget-otp-verify',forgotOtpVerify);
 router.post('/reset-password',resetPassword)
 router.post('/logout',logoutUser)



router.get('/profile/me',protect,getUserProfile);
router.get("appointments/my-appointments",getMyAppointments)
router.get("/:id",getSingleUser);
router.get("/",getAllUser);
router.put("/:id",updatedUser);
router.delete("/:id",deleteUser);

export default router;
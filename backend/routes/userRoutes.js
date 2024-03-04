import express from 'express';

import {
  login,
  forgotEmailCheck,
  forgotOtpVerify,
  register,
  otpVerify,
  resendEmailCheck ,
  resetPassword,
  Google,
  getUserProfile,
  getMyAppointments,
  deleteUser,
  getAllUser,
  getSingleUser,
  logoutUser,
  updateUser,
  getDoctors,
  ChangePassword,
  // getUser,
} from '../Controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/otpverify',otpVerify);
router.post('/login',login);
router.post('/forgot-email-check',forgotEmailCheck);
router.post('/forget-otp-verify',forgotOtpVerify);
router.post('/resend-email-check',resendEmailCheck  );





 router.post('/reset-password',resetPassword);
 router.post('/google',Google);
 router.post('/logout',logoutUser);
router.get('/getdoctors',getDoctors);



router.get('/profile/me',protect,getUserProfile);
router.post('/updateUser/:id',protect,updateUser);
router.post('/changepassword',ChangePassword);
router.get('/appointments/my-appointments', protect, getMyAppointments); 
router.get("/:id", protect,getSingleUser);
router.get("/",protect,getAllUser);
// router.get("/getuser/:id",getUser);

router.delete("/:id",deleteUser);

export default router;
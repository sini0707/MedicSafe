import express from "express";

import {
    register,
    DoctorLogin,
    logoutDoctor,
    DoctorOtpVerify,
   
} from '../Controllers/DoctorController.js';




const router= express.Router();
router.post('/register',register);
router.post('/login',DoctorLogin);
router.post('/logout',logoutDoctor);
router.post('/otp',DoctorOtpVerify);





export default router;
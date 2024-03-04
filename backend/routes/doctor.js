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
} from '../Controllers/DoctorController.js';

import {protect} from "../middleware/DoctorAuthMiddleware.js"



const router= express.Router();
router.post('/register',register);
router.post('/login',DoctorLogin);
router.post('/logout',logoutDoctor);
router.post('/otp',DoctorOtpVerify);
router.post('/forgot-email-check',forgotEmailCheck);
router.get('/profile/me',protect,getDoctor);
router.post('/updatedoctor/:id',updatedDoctor);
router.post('/managetime',manageTime);
router.get('/delete-timing/:docId/:id',deleteTimings) ;
router.get('/get-timings/:id',getTimings);
// router.get('/users/getdoctor/:id',getDoctor);
router.get('/getdoctor/:id',getSingleDoctor);






export default router;
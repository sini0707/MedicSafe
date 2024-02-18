import express from "express";

import {
    register,
    DoctorLogin,
   
} from '../Controllers/DoctorController.js';




const router= express.Router();
router.post('/register',register);
router.post('/login',DoctorLogin)



export default router;
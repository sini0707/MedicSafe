import express from "express";

import {
    updatedDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    getDoctorProfile,
} from '../Controllers/DoctorController.js';



const router= express.Router();
router.get("/:id",getSingleDoctor);
router.get("/",getAllDoctor);
router.put("/:id",updatedDoctor);
router.delete("/:id",deleteDoctor);
router.get('/profile/me',getDoctorProfile)

export default router;
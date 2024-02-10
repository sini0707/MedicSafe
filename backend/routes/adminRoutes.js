import express from 'express';
import { adminLogin,getUsers,getDoctors } from '../Controllers/adminController.js'
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login',adminLogin);
router.get('/userlist',getUsers);
router.get('/doctordata',getDoctors);


export default router;

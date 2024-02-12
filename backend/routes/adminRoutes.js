import express from 'express';
import { adminLogin,getUsers,getDoctors,blockUsers } from '../Controllers/adminController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login',adminLogin);
router.get('/userlist',getUsers);
router.put('/block-user/:id',blockUsers);
router.get('/doctordata',getDoctors);


export default router;

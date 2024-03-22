import express from 'express';
import { adminLogin,getUsers,getDoctors,blockUsers,approveDoctors,unblockUser,rejectDoctors ,addSpecialization,getAllSpecialization} from '../Controllers/adminController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login',adminLogin);
router.get('/userlist',getUsers);
router.put('/block-user/:id',blockUsers);
router.put('/unblock-user/:id',unblockUser );

router.put('/approve/:id',approveDoctors);
router.put('/reject/:id',rejectDoctors);
router.get('/doctordata',getDoctors);


router.post("/specialization", addSpecialization);
router.get("/getspecialization",getAllSpecialization);


export default router;

import express from 'express';
import { adminLogin,getUsers,getDoctors,blockUsers,approveDoctors,unblockUser,rejectDoctors ,
    addSpecialization,getAllSpecialization, adminLogoutUser,getBooking,getMonthlyBooking,YearlyBooking,cancelBooking, creditUserWallet} from '../Controllers/AdminController.js'

import { protect } from '../middleware/AdminMiddleware.js';

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

router.post("/adminlogout",adminLogoutUser);
 router.get("/MonthlyBooking",getMonthlyBooking)
 router.get("/getBooking",getBooking)
 router.put("/cancelBooking/:id",cancelBooking)
 router.get("/YearlyBooking",YearlyBooking);

 router.post("/credit-wallet", creditUserWallet);








export default router;

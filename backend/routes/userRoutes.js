import express from 'express';
import {
  login,
  register,
  // logoutUser,
  getUserProfile,
  getMyAppointments,
  updatedUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  // updateUserProfile,
} from '../Controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
// import { getAllReviews,createReview } from '../Controllers/reviewController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/logout', logoutUser);
router.get('/profile/me',getUserProfile);
// router.route("/").get(getAllReviews).post(authenticate,createReview);
router.get("appointments/my-appointments",getMyAppointments)
router.get("/:id",getSingleUser);
router.get("/",getAllUser);
router.put("/:id",updatedUser);
router.delete("/:id",deleteUser);

export default router;
import asyncHandler from "express-async-handler";
import generateToken from "../utils/GenerateToken.js";
import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";



export const getAllReviews = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const reviews = await Review.find({ doctor: doctorId });

    res
      .status(200)
      .json({ sucess: true, message: "Successfull", data: reviews });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "Successfull" });
  }
};


export const createReview = async (req, res) => {
  const { rating, reviewText, user, doctor } = req.body.review;

  if (!req.body.doctor) req.body.doctor = req.params.doctorId;

  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body.review);

  try {
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(doctor, {
      $push: { reviews: savedReview._id },
    });
    res
      .status(200)
      .json({ sucess: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

export const submitReply = async (req, res) => {
  let reviewId = req.params.id;
  

  const { replyText } = req.body;
 
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    review.replyText = replyText;
    await review.save();

    res.status(200).json({ message: "Reply submitted successfully." });
  } catch (error) {
    console.error("Error submitting reply:", error);
    res.status(500).json({ message: "Failed to submit reply." });
  }
};

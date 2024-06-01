import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  medicine: { type: String, required: true },
  dosage: { type: String, required: true },
  duration: { type: String, required: true },
});

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: {
      type: String,
      required: true,
    },
    IndianDate: {
      type: String,
      required: true,
    },
    slotDate: {
      type: String,
      required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], required: true },
    isPaid: {
      type: Boolean,
      default: true,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      required: true,
      type: String,
    },
    prescription: [prescriptionSchema], 
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

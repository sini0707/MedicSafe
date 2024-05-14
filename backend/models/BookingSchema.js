import mongoose from "mongoose";


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
    slotDate:{
      type:String,
      required:true
    },
    slotTime:{
      type:String,
      required:true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    isCancelled:{
      type:Boolean,
      default:false,
    },
    prescription: { 
      type: String, 
    }

  },
  { timestamps: true }  
);
// bookingSchema.pre(/^find,function(next){
//   this.populate("user").populate({
//     path:"doctor",
//     select:"name",
//   });
// });



   
export default mongoose.model("Booking", bookingSchema);

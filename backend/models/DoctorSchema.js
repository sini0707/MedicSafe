import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const DoctorSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      specialization: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      blocked: {
        type: Boolean,
        default: false,
      },
      imagePath: {
        type: String,
        default: '',
      },
      
      fees: {
        type: Number,
        default: 0,
      },
      qualification: {
        type: String,
        required: true,
      },
      otp:{
        type:Number
      },
      experience: {
        type: String,
        required: true,
      },
     role: {
        type: String,
        required: true,
      },
      certificate: { 
        type: Array 
      },
      reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],

      averageRating: {
        type: Number,
        default: 0,
      },
      totalRating: {
        type: Number,
        default: 0,
      },
      bookings: [
        {
          date: {
            type: Date,
          },
          slots: [
            {
              userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', 
              },
            },
          ],
        },
      ],
      available: [
        {
          date: {
            type: Date, 
          },
          fromTime: {
            type: String, 
          },
          toTime: {
            type: String,
          },
          expiresAt: {
            type: Date, 
          },
        },
      ],
     
    },
    {
      timestamps: true,
    }
  );
  
DoctorSchema.methods.matchPassword = async function (enteredPassword) {
 
let res=await bcrypt.compare(enteredPassword, this.password);

return res
  };
  DoctorSchema.pre('save', function (next) {
    this.id = this._id; 
    next();
});

  
export default mongoose.model("Doctor",DoctorSchema);


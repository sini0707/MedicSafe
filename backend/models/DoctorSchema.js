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
                ref: 'User', // Reference to the User model
              },
            },
          ],
        },
      ],
      available: [
        {
          date: {
            type: Date, // You can use Date for the date field
          },
          fromTime: {
            type: String, // You can use String for the time fields
          },
          toTime: {
            type: String,
          },
          expiresAt: {
            type: Date, // This field will be used for automatic expiration
          },
        },
      ],
     
    },
    {
      timestamps: true,
    }
  );
  
DoctorSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('match ');
  console.log(enteredPassword,this.password,'got passwords');
let res=await bcrypt.compare(enteredPassword, this.password);
console.log(res,'resss');
return res
  };
  DoctorSchema.pre('save', function (next) {
    this.id = this._id; 
    next();
});

  
export default mongoose.model("Doctor",DoctorSchema);


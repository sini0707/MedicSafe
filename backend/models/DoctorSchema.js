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
      // resume: {
      //   type: String,
      //   default: '',
      // },
      fees: {
        type: Number,
        default: 0,
      },
      qualification: {
        type: String,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
      
     
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
    this.id = this._id; // Set id field to the document's _id
    next();
});

  
export default mongoose.model("Doctor",DoctorSchema);


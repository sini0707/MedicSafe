import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile:{
      type:Number,
      default:null
    },
    password: {
      type: String,
    },
    photo: {
      type: String ,
    },
    
    otp:{
      type:Number
    },
    verified:{
      type : Boolean,
      default : false
    },
    gender:{
      type:String,
      default:null
    },
    
    blood:{
      type:String,
      default:null
    },
    
    age:{
      type:Number,
      default:null
    },
    role:{
      type:String,
      default:null
    },
    blocked:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);



export default User;
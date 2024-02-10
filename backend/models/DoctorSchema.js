import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const DoctorSchema= new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    name:{type:String,required:true},
    phone:{type:Number},
    photo:{type:String},
    role:{
        type:String,
    },

    // fields for doctors only
    specialization:{type:String},
    qualification:{
        type:Array,
    },
    experiences:{
        type:Array,

    },
    bio:{ type:String,maxLength:50},
    about:{ type:String},
    timeSlots:{type:Array},
    reviews:[{type:mongoose.Types.ObjectId,ref:"Review"}],
    averageRating:{
        type:Number,
        default:0,

    },
    totalRating:{
        type:Number,
        default:0,

    },
    isApproved:{
        type:String,
        enum:["pending","approved","cancelled"],
        default:"pending",

    },
    appointments:[{type:mongoose.Types.ObjectId,ref:"Appointment"}],


       
    
});

DoctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  DoctorSchema.pre('save', function (next) {
    this.id = this._id; // Set id field to the document's _id
    next();
});

  
export default mongoose.model("Doctor",DoctorSchema);


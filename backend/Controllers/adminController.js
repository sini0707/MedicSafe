

import Admin from "../models/adminModel.js";
import adminGenToken from "../utils/adminGentoken.js";
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import Doctor from "../models/DoctorSchema.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('hhhhffesssssssssss');
  console.log(req.body,"Adminside")

  try {
    console.log("Received email:", email);
// const admin = await Admin.findOne({ email: { $eq: email } });
const admin = await Admin.findOne({ email: email.trim() });

console.log("Found admin:", admin);
console.log(password,'password');
    if (admin && (await admin.matchPassword(password))) {
        console.log('hgfffffff');
      const token = adminGenToken(res, admin._id);
      console.log("token",token)

      res.status(201).json({
        success: true,
        message: "Admin successfully logged in",
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: "admin",
        },
        token,
      });
      console.log("Success: Admin successfully logged in");
    }  else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    // Handle any other errors here
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

 const getUsers = asyncHandler(async(req,res)=>{
  console.log("adminUsers")
  let users = await User.find({},{password:0})

  console.log(users,"usersss");
  if(users){
      res.status(200).json({userData:users})
  }else{
      res.status(400).json("Error in fetching")
  }
});
 
const getDoctors = asyncHandler(async(req,res)=>{
  let doctors = await Doctor.find({},{password:0})
  if(doctors){
    console.log(doctors);
      res.status(200).json({doctorsData:doctors})
  }else{
    console.log("Error in Fetching"); 
      res.status(400).json("Error in Fetching")
  }
})

export { adminLogin,getUsers,getDoctors };

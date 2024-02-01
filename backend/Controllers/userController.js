import User from "../models/userModel.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";

import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import BookingSchema from "../models/BookingSchema.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body,"gbfhgfhfjhgj")
  const user = await User.findOne({ email });
  console.log(user,"hiiiiii")
  const doctor = await Doctor.findOne({ email });

  if (user && !user.isBlocked && (await user.matchPassword(password))) {
    console.log('generateeeeeeeeee');
    const token= generateToken(res, user._id);
    console.log(token,'userrrrrtokkkk');
    res.status(201).json({
      success: true,
      message: "User successfully logged in",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "patient",
      },
token,
    });
  } else if (
    doctor &&
    !doctor.isBlocked &&
    (await doctor.matchPassword(password))
  ) {
    // Handle doctor login
    genToken(res, doctor._id);
    res.status(201).json({
      success: true,
      message: "Doctor successfully logged in",
      data: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        role: "doctor",
      },
    });
  } else if (user && user.isBlocked) {
    res.status(400);
    throw new Error("You have been blocked");
  } else if (doctor && doctor.isBlocked) {
    res.status(400);
    throw new Error("Doctor account has been blocked");
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const register = asyncHandler(async (req, res) => {
  console.log("herrrrrr",);
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let existingUser = null;

    if (role === "patient") {
      existingUser = await User.findOne({ email });
    } else if (role === "doctor") {
      existingUser = await Doctor.findOne({ email });
    }

    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return; // Add this line to exit the function if a user already exists
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let user = null;

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again" });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
// const logoutUser = (req, res) => {
//   res.cookie("jwt", "", {
//     httpOnly: true,
//     expires: new Date(0),
//   });
//   res.status(200).json({ message: "Logged out successfully" });
// };
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log('getuserprofile');
  const userId = req.userId;
  console.log(userId,'userod');
  try {
    const user = await User.findById(userId);
    console.log(user,'userrr');
    if (!user) {
      console.log('user not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({ success: true, message: 'Profile info is getting', data: { ...rest } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
  }
});


const getMyAppointments=async(req,res)=>{
  
  try{
    const userId = req.userId;

    // retrieve appointments from booking for specific user
    const bookings=await Booking.find({user:req.userId});

    // extract doctor ids from appointment bookings
    const doctorIds=bookings.map(el=>el.doctor.id);

    // retrieve doctors using doctor ids
    const doctors=await Doctor.find({_id:{$in:doctorIds}}).select(
      "-password"
    );
    res.status(200).json({
      success:true,
      message:"Appointment are getting",
      data:doctors,
    });
  }catch(err){
    res.status(500).json({success:false,message:"something went wrong,cannot get"});


  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

export const updatedUser=async(req,res)=>{
  const id=req.params.id;
  try{
    const updatedUser=await User.findByIdAndUpdate(
      id,
      {
        $set:req.body},
        { new:true }
    );
    res.status(200).json({
      sucess:true,
      message:"Successfully updated",
      data:updatedUser,
    });
    }
    catch(err){
      res.status(500).json({sucess:false,message:"Failed to update"});

    }
  };
  export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try{
      await User.findByAndDelete(id);
      res.status(200).json({
        sucess:true,
        message:"Successfully deleted"
      });

    }catch(err){
      res.status(500).json({success:false,message:"Failed to delete"});


    }
  };
  export const getSingleUser=async(req,res)=>{
    const id=req.params.id;

  
  try{
    const user=await User.findById(id).select("-password");
    res.status(200).json({
      sucess:true,
      message:"User found",
      data:user,
    });
  }catch(err){
    res.status(404).json({sucess:false,message:"no user found"});
  }
};
export const getAllUser=async(req,res)=>{
  try{
    const users=await User.find({}).select("-password");
    res.status(200).json({
      sucess:true,
      message:"Users found",
      data:users,
    });
  }catch(err){
    res.status(404).json({sucess:false,message:"Not found"});
  }
};
  

export { login, register, getUserProfile,getMyAppointments};

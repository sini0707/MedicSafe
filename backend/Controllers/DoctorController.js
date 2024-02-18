import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";
import asyncHandler from "express-async-handler";
import BookingSchema from "../models/BookingSchema.js";
import DoctorgenToken from "../utils/DoctorgenToken.js";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer'
import { generateDoctorToken } from "../utils/generateToken.js";



const sendOtpLink=(email,otp)=>{
  try {
      const transporter=nodemailer.createTransport({
          host:'smtp.gmail.com',
          port:587,
          secure:false,
          requireTLS:true,
          auth:{
              user:process.env.APP_EMAIL,
              pass:process.env.APP_PASSWORD
          }
      })
      const mailOptions={
          from:'MedicSafe',
          to:email,
          subject:'Email Verification',
          html:'<p>Hi,<b>'+otp+'</b> is your OTP for email verification</p>'
      }
      transporter.sendMail(mailOptions,(error,info)=>{
          if(error){
              console.log(error)
          }else{
              console.log('email has been sent to:-',info.response)
          }
      })
  } catch (error) {
      console.log(error.message)
  }
}

export const register = async (req, res) => {
  console.log("HIIIIIII");
  try {
    console.log(req.body, "doctor register");
    const {
      name,
      email,
      specialization,
      address,
      password,
      fees,
      imagePath,
      qualification,
      experience,
    } = req.body;

    // Check if user already exists
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const newotp = Math.floor(1000 + Math.random() * 9000);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new doctor instance
    const doctor = await Doctor.create({
      name,
      email,
      specialization,
      address,
      password: hashPassword,
      fees,
      imagePath,
      qualification,
      experience,
      otp: newotp,
    });

    // Send OTP email
    await sendOtpLink(email, newotp);

    // Send response
    res.status(201).json({ message: 'User successfully created', doctorId: doctor._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error, try again' });
  }
};

  //  let result= DoctorgenToken(res, doctor._id);
  //   console.log(result,'hk')
  //   res.status(201).json({
  //     _id: doctor._id,
  //     name: doctor.name,
  //     email: doctor.email,
  //   });
  // } catch (error) {
  //   console.error(error);
  // }


export const DoctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);
if (!email || !password) {
      console.log("Email or password missing");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    console.log(
      "Email and password are present. Proceeding to find the doctor"
    );
    const doctor = await Doctor.findOne({ email });
    console.log(doctor, "doctor found");
if (doctor && (await doctor.matchPassword(password))) {
      console.log("Doctor found and password matched. Generating token...");
      console.log(doctor._id, "doctorid");
      let token = generateDoctorToken(res, doctor._id);
      console.log(token)
      return res.status(200).json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        token:token
      });
    } else {
      console.log("Doctor not found or password not matched");
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updatedDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      sucess: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "Failed to update" });
  }
};
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByAndDelete(id);
    res.status(200).json({
      sucess: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id).select("-password");
    res.status(200).json({
      sucess: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "no doctor found" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    res.status(200).json({
      sucess: true,
      message: "Doctor found",
      data: doctors,
    });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "Not found" });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ sucess: false, message: "doctor not found" });
    }
    const { password, ...rest } = doctor._doc;
    const appointment = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      sucess: true,
      message: "profile info getting",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res
      .status(500)
      .json({ sucess: false, message: "something went wrong,cannot get" });
  }
};

import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";
import asyncHandler from "express-async-handler";
import Booking from "../models/BookingSchema.js";
import DoctorgenToken from "../utils/DoctorgenToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import generateDoctorToken from "../utils/DoctorgenToken.js";
import { v4 as uuidv4 } from "uuid";
import Specialization from "../models/SpecializationModel.js";

const sendOtpLink = (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "MedicSafe",
      to: email,
      subject: "Email Verification",
      html: "<p>Hi,<b>" + otp + "</b> is your OTP for email verification</p>",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email has been sent to:-", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async (req, res) => {
  try {
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
      role,
    } = req.body;
    const doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const newotp = Math.floor(1000 + Math.random() * 9000);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

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
      role,
    });

    await sendOtpLink(email, newotp);

    res.status(201).json({
      success: true,
      message: "Doctor successfully registered",
      doctor,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again" });
  }
};

export const GetSpecialization = asyncHandler(async (req, res) => {
  try {
    const specializations = await Specialization.find({}, "name");

    res.json(specializations);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const DoctorOtpVerify = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  let doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    if (doctorExists.otp !== Number(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid otp", error: "Invalid OTP" });
    }

    doctorExists.verified = true;
    doctorExists = await doctorExists.save();
    DoctorgenToken(res, doctorExists._id);
    res.status(200).json({
      success: true,
      message: "Otp verified successfully",
      _id: doctorExists._id,
      name: doctorExists.name,
      email: doctorExists.email,
      blocked: doctorExists.blocked,
    });
  } else {
    res.status(404).json({ error: "Doctor not found" });
  }
});
export const DoctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const doctor = await Doctor.findOne({ email });

    if (doctor && doctor.approved && (await doctor.matchPassword(password))) {
      let token = generateDoctorToken(res, doctor._id);

      return res.status(200).json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        token: token,
      });
    } else {
      return res.status(401).json({ message: "Doctor Not approved By Admin" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const forgotEmailCheck = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const doctorExists = await User.findOne({ email: email });

  if (doctorExists && !doctorExists.blocked) {
    let newotp = Math.floor(1000 + Math.random() * 9000);
    doctorExists.otp = newotp;
    await doctorExists.save();

    sendOtpLink(doctorExists.email, newotp);
    res.status(200).json({
      _id: doctorExists._id,
      name: doctorExists.name,
      email: doctorExists.email,
    });
  } else {
    res.status(400).json({ error: "Doctor needs admin approval" });
  }
});

export const forgotOtpVerify = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  let doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    if (doctorExists.otp !== Number(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid otp", error: "Invalid OTP" });
    }

    doctorExists.verified = true;
    doctorExists = await doctorExists.save();
    DoctorgenToken(res, doctorExists._id);
    res.status(200).json({
      success: true,
      message: "Otp verified successfully",
      _id: doctorExists._id,
      name: doctorExists.name,
      email: doctorExists.email,
      blocked: doctorExists.blocked,
    });
  } else {
    res.status(404).json({ error: "Doctor not found" });
  }
});

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
    const { password, ...rest } = updatedDoctor._doc;
    const existingToken = req.headers.authorization.split(" ")[1];

    res.status(200).json({
      sucess: true,
      message: "Successfully updated",
      data: { ...rest, token: existingToken },
    });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "Failed to update" });
  }
};

export const manageTime = async (req, res) => {
  const { docId, date, from, to } = req.body;
  let newTime = { date: date, fromTime: from, toTime: to, expiresAt: date };
  const doctor = await Doctor.updateOne(
    { _id: docId },
    { $push: { available: newTime } }
  );
  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
};
export const deleteTimings = asyncHandler(async (req, res) => {
  const { docId, id } = req.params;
  const doctor = await Doctor.findByIdAndUpdate(docId, {
    $pull: { available: { _id: id } },
  });
  if (doctor) {
    res.status(200).json({ message: "Successfully Deleted" });
  } else {
    res.status(400).json({ message: "Failed to Delete" });
  }
});

export const getTimings = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findOne({ _id: id });
  if (doctor) {
    res.status(200).json({ timings: doctor.available });
  } else {
    res.status(400).json({ error: "Failed to Fetch" });
  }
});

export const bookingDetails = asyncHandler(async (req, res) => {
  const { docId } = req.params;

  try {
    let bookings = await Booking.find({ doctor: docId });

    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const Appointment = [];

    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];

     
      const user = await User.findById(booking.user);

      if (user) {
        const bookingDetail = {
          id: booking._id,
          user: user._id,
          doctor: doctor._id,
          name: user.name,
          email: user.email,
          blood: user.blood,
          date: booking.slotDate,
          time: booking.slotTime,
          isPaid: booking.isPaid,
          ticketPrice: booking.ticketPrice,
          createdAt: booking.createdAt,
        };

     
        Appointment.push(bookingDetail);
      }
    }

    res.status(200).json(Appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
export const getDoctor = asyncHandler(async (req, res) => {
  const userId = req.userId;

  try {
    const user = await Doctor.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
});

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
    console.error("Error fetching doctor:", err);
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

export const logoutDoctor = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const approveVideoCall = async (req, res) => {
 
  const userId = req.params.id;

  const status = req.query.status;

  try {
    const changeStatus = await User.findByIdAndUpdate(
      userId,
      { $set: { VideoCallApprove: status } },
      { new: true }
    );

    if (!changeStatus) {
      return res.status(404).json({ message: "User not found" });
    }
    const roomId = `${uuidv4()}-${userId}`;

    res
      .status(200)
      .json({ status: true, message: "User status changed", roomId });
  } catch (error) {
    res.status(500).json({ status: false, message: "Change status failed " });
  }
};

export const DoctorChangePassword = asyncHandler(async (req, res) => {
  const { email, newpassword } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(newpassword, salt);

  const doctorExists = await Doctor.findOne({ email: email });

  if (doctorExists) {
    doctorExists.password = hashPassword;
    let doctorChangePassword = await doctorExists.save();

    if (doctorChangePassword) {
      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res.status(400).json({ error: "Failed to change the password" });
    }
  } else {
    res.status(400).json({ error: "User not found" });
  }
});

export const generatePrescription = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { prescriptionText } = req.body;
  try {
    await Booking.updateOne(
      { _id: id },
      { prescription: prescriptionText },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Prescription Generated Successfully" });
  } catch (error) {
    console.error("Error generating prescription:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
 export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { password: 0 });

  if (users) {
    res.status(200).json({ userData: users });
  } else {
    res.status(400).json("Error in fetching");
  }
});
export const getDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({}, { password: 0 });

    if (doctors) {
      res.status(200).json({ doctorsData: doctors });
    } else {
      res.status(400).json("Error in Fetching");
    }
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});
export const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name")
      .populate("doctor", "name")
      .select(
        "user doctor paymentStatus IndianDate slotDate slotTime ticketPrice status isPaid isCancelled createdAt updatedAt"
      );

    if (bookings.length === 0) {
      throw new Error("Not have any Bookings");
    }

    res
      .status(200)
      .json({ status: true, message: "getting the users", data: bookings });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ status: false, message: "Unable to retrieve doctors" });
  }
};



import Admin from "../models/adminModel.js";
import adminGenToken from "../utils/adminGentoken.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import Doctor from "../models/DoctorSchema.js";
import Specialization from "../models/SpecializationModel.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email.trim() });
    if (admin && (await admin.matchPassword(password))) {
      const token = adminGenToken(res, admin._id);

      res.status(201).json({
        success: true,
        message: "Admin successfully logged in",
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: "admin",
          token: token,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { password: 0 });

  if (users) {
    res.status(200).json({ userData: users });
  } else {
    res.status(400).json("Error in fetching");
  }
});

const blockUsers = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    let user = await User.findById(userId);

    user.blocked = true;
    await user.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        blocked: user.blocked,
      });
    } else {
      res.status(400).json({ error: "Id invalid" });
    }
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "Id invalid" });
    }

    user.blocked = false;
    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      blocked: user.blocked,
    });
  } catch (error) {
    console.error("Error unblocking user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const approveDoctors = asyncHandler(async (req, res) => {
  try {
    const docId = req.params.id;
    let doctor = await Doctor.findById(docId);

    if (!doctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }

    doctor.approved = true;
    await doctor.save();

    res.status(200).json({ message: "Doctor approved successfully", doctor });
  } catch (error) {
    console.error("Error approving doctor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const rejectDoctors = asyncHandler(async (req, res) => {
  const  docId = req.params.id;
  let  doctor = await Doctor.findById(docId);

  if (!doctor) {
    return res.status(400).json({ error: "Invalid doctor ID" });
  }

  doctor.approved = false;
  await doctor.save();

  res.status(200).json(doctor);
});

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({}, { password: 0 });
  if (doctors) {
    res.status(200).json({ doctorsData: doctors });
  } else {
    res.status(400).json("Error in Fetching");
  }
});


const addSpecialization = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;

    let specializationRegx = new RegExp(name, "i");

    const specialization = await Specialization.findOne({
      name: specializationRegx,
    });

    if (specialization) {
      res.status(409).json({ error: "Specialization already exists" });
      return; 
    }

    const newSpecialization = await Specialization.create({
      name,
      description,
    });

    res.status(200).json({
      message: "Specialization created...",
      data: newSpecialization,
    });
  } catch (error) {
    console.error("Error adding specialization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


const getAllSpecialization = asyncHandler(async (req, res) => {
  const specializations = await Specialization.find();

  res.status(200).json(specializations);
});

const adminLogoutUser = (req, res) => {
  console.log("Clearing adminJwt cookie...");
  res.cookie("adminJwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  console.log("Sending logout response...");
  res.status(200).json({ message: "Logged out successfully" });
};

export {
  adminLogin,
  getUsers,
  blockUsers,
  getDoctors,
  approveDoctors,
  unblockUser,
  rejectDoctors,
  addSpecialization,
  getAllSpecialization,
  adminLogoutUser,
};

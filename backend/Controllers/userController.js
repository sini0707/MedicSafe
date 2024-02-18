import User from "../models/userModel.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import BookingSchema from "../models/BookingSchema.js";
import generateDoctorToken from "../utils/DoctorgenToken.js";

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

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && !user.isBlocked && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    const { password, ...rest } = user._doc;

    res.status(201).json({
      success: true,
      message: "User successfully logged in",
      data: {
        ...rest,
        token: token,
      },
    });
  } else if (user && user.isBlocked) {
    res.status(400);
    throw new Error("You have been blocked");
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const forgotEmailCheck = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists && !userExists.blocked) {
    let newotp = Math.floor(1000 + Math.random() * 9000);
    userExists.otp = newotp;
    await userExists.save();

    sendOtpLink(userExists.email, newotp);
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    });
  } else {
    res.status(400).json({ error: "User not found or blocked by admin" });
  }
});

const forgotOtpVerify = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists && userExists.otp === Number(otp)) {
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      otp: userExists.otp,
    });
  } else {
    res.status(400).json({ error: "OTP Incorrect" });
  }
});

const resendEmailCheck = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("Resending email check for:", email);
  const userExists = await User.findOne({ email: email });
  console.log("User exists:", userExists);

  if (userExists && !userExists.blocked) {
    let newotp = Math.floor(1000 + Math.random() * 9000);
    userExists.otp = newotp;
    await userExists.save();

    sendOtpLink(userExists.email, newotp);
    console.log("OTP sent to:", userExists.email);
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    });
  } else {
    console.log("User not found or blocked by admin");
    res.status(400).json({ error: "User not found or blocked by admin" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    userExists.password = hashPassword;
    let changePassword = await userExists.save();
    if (changePassword) {
      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res.status(400).json({ error: "Failed to change the password" });
    }
  } else {
    res.status(400).json({ error: "User not found" });
  }
});

const register = asyncHandler(async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let userExists = await (role === "patient"
      ? User.findOne({ email })
      : Doctor.findOne({ email }));

    if (userExists && userExists.verified) {
      return res.status(400).json({ message: "User already exists" });
    }

    let newotp = userExists
      ? userExists.otp
      : Math.floor(1000 + Math.random() * 9000);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (userExists) {
      userExists.name = name;
      userExists.password = hashPassword;
      await userExists.save();
    } else {
      const newUser =
        role === "patient"
          ? new User({ name, email, password: hashPassword, photo, gender })
          : new Doctor({ name, email, password: hashPassword, photo, gender });
      newUser.otp = newotp;
      await newUser.save();
    }

    // Send OTP email
    await sendOtpLink(email, newotp);

    res.status(201).json({ message: "User successfully created" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again" });
  }
});

export const otpVerify = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  let userExists = await User.findOne({ email });

  if (userExists) {
    if (userExists.otp == Number(otp)) {
      generateToken(res, userExists._id);
      userExists.verified = true;
      userExists = await userExists.save();
      res.status(201).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        blocked: userExists.blocked,
      });
    } else {
      res.status(201).json({ error: "Invalid OTP" });
    }
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({
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

const getMyAppointments = async (req, res) => {
  try {
    const userId = req.userId;

    // retrieve appointments from booking for specific user
    const bookings = await Booking.find({ user: req.userId });

    // extract doctor ids from appointment bookings
    const doctorIds = bookings.map((el) => el.doctor.id);

    // retrieve doctors using doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Appointment are getting",
      data: doctors,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "something went wrong,cannot get" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, mobile, password, gender, age, blood, role } =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          mobile,
          password: hashedPassword, // Store the hashed password
          gender,
          age,
          blood,
          role,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByAndDelete(id);
    res.status(200).json({
      sucess: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      sucess: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "no user found" });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      sucess: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ sucess: false, message: "Not found" });
  }
};

export {
  login,
  register,
  getUserProfile,
  getMyAppointments,
  forgotEmailCheck,
  forgotOtpVerify,
  resendEmailCheck,
  resetPassword,
  logoutUser,
  updateUser,
};

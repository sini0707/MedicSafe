import User from "../models/userModel.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Booking from "../models/BookingSchema.js";
import generateDoctorToken from "../utils/DoctorgenToken.js";
import { v4 as uuidv4 } from "uuid";
import Wallet from "../models/walletModel.js";

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

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const userpwd=await user.matchPassword(password)
 

  if (user && !user.blocked && (await user.matchPassword(password))) {
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
  } else if (user && user.blocked) {
    res.status(400);
    throw new Error("You have been blocked");
  } else {
    res.status(400);

    throw new Error("Invalid email or password");
  }
});
export const Google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = generateToken(res, user._id);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);

      res.status(200).json({
        success: true,
        data: {
          ...rest,
          token: token,
        },
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

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

if (userExists) {
  if (userExists.otp !== Number(otp)) {
    return res.status(400).json({ error: "Invalid OTP" });
  }
  
    userExists.verified = true;
    userExists = await userExists.save();
    generateToken(res, userExists._id);
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      blocked: userExists.blocked,
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }

});
const resendEmailCheck = asyncHandler(async (req, res) => {
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
  const { email, password, name, role, photo, gender, blood, age } = req.body;

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
          ? new User({
              name,
              email,
              password: hashPassword,
              photo,
              gender,
              blood,
              age,
              role,
            })
          : new Doctor({
              name,
              email,
              password: hashPassword,
              photo,
              gender,
              blood,
              age,
            });
      newUser.otp = newotp;
      await newUser.save();
    }

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
    if (userExists.otp !== Number(otp)) {
   

      return res.status(400).json({success: false,  message: "Invalid OTP" });
    }else{
      userExists.verified = true;
      userExists = await userExists.save();
      generateToken(res, userExists._id);
      res.status(200).json({success:true,
        message: "OTP verified successfully",
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        blocked: userExists.blocked,
      });

    }
    
  
    } else {
      res.status(404).json({success:false, error: "User not found" });
    }
  
});

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

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

const getMyAppointments = async (req, res) => {
 
  const userId=req.userId
  
  try {
    const userId = req.userId;
   
    const bookings = await Booking.find({ user: userId }).populate("doctor", "name specialization imagePath").sort({ createdAt: -1 });
  
    if (bookings.length === 0) {
      throw new Error("Oops! You don't have any appointments yet!");
    }
  
    res.status(200).json({
      success: true,
      message: "Appointments are fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, mobile, gender, age, blood, role ,photo} =
      req.body;

   
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          mobile,
          gender,
          age,
          blood,
          role,
          photo,
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

const ChangePassword = asyncHandler(async (req, res) => {
  const { email, newpassword } = req.body;



  const salt = await bcrypt.genSalt(10);
 
  const hashPassword = await bcrypt.hash(newpassword, salt);

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


 const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({}, { password: 0 });
  if (doctors) {
    res.status(200).json({ doctorsData: doctors });
  } else {
    res
      .status(400)
      .json({ status: false, error: "Error in Fetching Doctors Data" });
  }
});






export const getDoctorTimings = async (req, res) => {
 
  const doctorId = req.params.doctorId;
  

  try {
   
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const timings = doctor.timings; 
   
    res.json({ timings });
  } catch (error) {
    console.error('Error fetching doctor timings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const CancelBooking= async (req, res) => {
 console.log("bookimgjdsnkkjs");
  const bookingId = req.params.id;
  
  const booking = await Booking.findById(bookingId);
  
  const doctor = await Doctor.findById(booking.doctor._id);

  try {
    const CancelBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { isCancelled: true}});

    res.status(200).json({
      sucess: true,
      message: "Successfully Cancelled",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to cancel" });
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

export const MakeVideoCall = async (req, res) => {
  const userId = req.params.id;
  
  try {
    
    const user = await User.find({_id:userId});
   


    // if (!user.VideoCallApprove) {
    //   throw new Error("You are not approved for this Facility");
    // } else {
      const roomId = `${uuidv4()}-${userId}`;
    

      res.status(200).json({ message: "Video Call", roomId });
    // }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const userWallet = asyncHandler(async (req, res) => {
console.log("he;;pdmdj");
// try {
//     const userId = req.userId;
//     console.log(userId,'userId seen')
//     // const { amount } = req.body;
    
//     // let wallet = await Wallet.findOne({ userId });
//     // console.log(wallet); // Log wallet object
//     // const transaction = {
//     //   amount: Number(amount),
//     //   type: "credit",
//     // };
//     // if (!wallet) {
//     //   wallet = await Wallet.create({
//     //     userId,
//     //     balance: Number(amount),
//     //     transactions: [transaction],
//     //   });
//     // } else {
//     //   wallet.balance += Number(amount);
//     //   wallet.transactions.push(transaction);
//     //   await wallet.save();
//     // }
//     // res.status(200).json(wallet); 
//   } catch (error) {
//     console.error(error); // Log any errors
//     res.status(500).json({ message: "Internal server error" });
//   }
});


 const getUserWallet = asyncHandler(async (req, res) => {
//   try {
//     const userId = req.user;
//     const userWallet = await Wallet.findOne({ userId }).select("-__v");
//     console.log(userWallet); // Log userWallet object
//     res.status(200).json(userWallet);
//   } catch (error) {
//     console.error(error); // Log any errors
//     res.status(500).json({ message: "Internal server error" });
//   }
 });

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
  ChangePassword,

  getDoctors,
  userWallet,
   getUserWallet,
  
};

import Admin from "../models/adminModel.js";
import adminGenToken from "../utils/adminGentoken.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import Doctor from "../models/DoctorSchema.js";
import Specialization from "../models/SpecializationModel.js";
import Booking from "../models/BookingSchema.js"

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

  res.cookie("adminJwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};


export const getBooking = async (req, res) => {
  try {
    // const bookings = await Booking.find(
    //   {},
    //   {
    //     user: 1,
    //     doctor: 1,
    //     paymentStatus: 1,
    //     IndianDate: 1,
    //     slotDate: 1,
    //     slotTime:1,
    //     ticketPrice:1,
    //     status:1,
       
    //   }
    // );
    const bookings = await Booking.find({})
  .populate('user', 'name') 
  .populate('doctor', 'name')
  .select('user doctor paymentStatus IndianDate slotDate slotTime ticketPrice status isPaid isCancelled createdAt updatedAt');



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




export const getMonthlyBooking = async (req, res) => {
  try {
    const montlyData = await Booking.aggregate([
      {
        $group: {
          _id: { $month: { $toDate: "$createdAt" } },
          totalBookings: { $sum: 1 },
          totalAmount: { $sum: "$fee" },
        },
      },
    ]);

    res.status(200).json({ data: montlyData });
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
};

//// getting yearly Data   /////

export const YearlyBooking = async (req, res) => {
  try {
    const yearlyData = await Booking.aggregate([
      {
        $project: {
          year: {
            $year: {
              $dateFromString: {
                dateString: "$IndianDate",
                format: "%d/%m/%Y",
              },
            },
          },

          fee: 1,
        },
      },
      {
        $group: {
          _id: "$year",
          totalBookings: { $sum: 1 },
          totalAmount: { $sum: "$fee" },
        },
      },
    ]);

    res.status(200).json({ data: yearlyData });
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
};

// ///// getting the user Data


////Cancel Booking ////////

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const cancel = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { isCancelled: true } },
      { new: true }
    );

    if (!cancel) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      res
        .status(200)
        .json({ status: true, message: "Booking cancelled successfullly" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Booking cancellation failed" });
  }
};


export const creditUserWallet = asyncHandler(async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the credited amount to the wallet balance
    user.walletBalance += amount;

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: 'Wallet credited successfully' });
  } catch (error) {
    console.error('Error crediting wallet:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


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

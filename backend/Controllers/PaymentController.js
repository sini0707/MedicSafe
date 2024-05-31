import User from "../models/userModel.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CLIENT_SITE_URL = process.env.CLIENT_SITE_URL;

var customer = await stripe.customers.create({
  name: "Dummy Name",
  address: {
    line1: "Dummy Address",
    country: "US",
  },
});

export const makepayment = async (req, res) => {
  let doctorId = req.params.doctorId;
  let userId = req.params.userId;
  

  const indianDate = req.body.date;
  const indianTime = req.body.time;

  try {
    const doctor = await Doctor.findById(doctorId);
    const user = await User.findById(userId);

    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
      metadata: {
        userId: user._id.toString(),
        doctorId: doctor._id.toString(),
        indianDate,
        indianTime,
      },
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${CLIENT_SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_SITE_URL}/doctors/${doctorId}`,
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "INR",
            unit_amount: doctor.fees * 100,
            product_data: {
              name: doctor.name,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
    ],
    billing_address_collection:'required'
    });
    res.json({ url: session.url, doctorId, userId, indianDate, indianTime });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "Internal server error" });
  }
};


export const sessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
    res.send({
      status: session.status,
      paymentId: session.id,
      customer_email: session.customer_details.email,
    });
  };



  export const saveBookingData = async (req, res) => {
    try {
      const paymentId = req.body.paymentId;
      const bookingExisit = await Booking.findOne({ paymentId: paymentId });
      
      if (bookingExisit) {
        return res.status(200).json({ data: bookingExisit });
      }
  
      const {
        doctor,
        patient,
        ticketPrice,
        appointmentDate,
        slot,
        paymentStatus = "pending",
      } = req.body;
  
      const slotDate = moment(appointmentDate, "YYYY-MM-DD").toDate();
      console.log(req.body, 'booking details');
  
      const newBooking = new Booking({
        doctor,
        user: patient,
        ticketPrice,
        slotDate: slotDate,
        slotTime: slot,
        status: "confirmed",
        paymentStatus,
        paymentId,
      });
  
      const saveBooking = await newBooking.save();
  
      res.status(200).json({ message: "Booking saved Successfully", data: saveBooking });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  };
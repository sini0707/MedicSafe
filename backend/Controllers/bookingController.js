import User from "../models/userModel.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

const stripe = new Stripe(
  `sk_test_51Oom7QSFYJijlikWHxn3w46LTvEB79JVPRxR8KS6D6ipNaZDb5z68AjAnU9GAdZFSEImK5ikxnDfQZ1vs2MSzLSJ00nTkcWu9k`
);

var customer = await stripe.customers.create({
  name: "Dummy Name",
  address: {
    line1: "Dummy Address",
    country: "US",
  },
});

const getCheckoutSession = async (req, res) => {
  let doctorId = req.params.doctorId;
  let userId = req.params.userId;

  const indianDate = req.body.date;
  const indianTime = req.body.time;

  try {
    const doctor = await Doctor.findById(doctorId);

    const user = await User.findById(req.userId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctorId}`,
      customer: customer.id,

      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: doctor.fees * 100,
            product_data: {
              name: doctor.name,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = new Booking({
      user: userId,
      doctor: doctor._id,
      ticketPrice: doctor.fees,
      session: session.id,
      slotTime: indianTime,
      slotDate: indianDate,
    });

    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ sucess: false, message: "Error creating checkout session" });
  }
};

export { getCheckoutSession };

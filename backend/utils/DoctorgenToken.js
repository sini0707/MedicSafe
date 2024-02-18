import jwt from "jsonwebtoken";

const DoctorgenToken = (res, doctorId) => {
  const token = jwt.sign({ doctorId }, process.env.DOCTOR_JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log("Generated Token:", token); // Log the generated token

  // Log the process.env.NODE_ENV to check its value
  console.log("NODE_ENV value:", process.env.NODE_ENV);

  res.cookie("docjwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", 
    sameSite: "strict", 
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });

  console.log("Cookie Set:", res.getHeaders()['set-cookie']); // Log the set-cookie header

  return token;
};

export default DoctorgenToken;

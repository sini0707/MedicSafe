import jwt from "jsonwebtoken";

const DoctorgenToken = (res, doctorId) => {
  const token = jwt.sign({ doctorId ,role:'doctor'}, process.env.DOCTOR_JWT_SECRET, {
    expiresIn: "30d",
  });

 

 


  res.cookie("docjwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", 
    sameSite: "strict", 
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });

 
  return token;
};

export default DoctorgenToken;

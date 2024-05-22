import jwt from "jsonwebtoken";

const adminGenToken = (res, adminId) => {

  const token = jwt.sign({ adminId,role:'admin'}, process.env.ADMIN_JWT_SECRET, {
    expiresIn: "30d",
  });
  
  res.cookie("adminJwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  
  return token;
};
export default adminGenToken;

import jwt from "jsonwebtoken";

const adminGenToken = (res, adminId) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token,"admin tokennnn")
  console.log(adminId,'adminid')
  res.cookie("adminJwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};
export default adminGenToken;

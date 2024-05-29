
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
 
  const Authtoken = req.headers.authorization;
  

  if (Authtoken) {
    try {
      const token = Authtoken.split(" ")[1];
    

      const decoded = jwt.verify(token, process.env.DOCTOR_JWT_SECRET);
      
      req.userId = decoded.doctorId;
      req.role = decoded.role;
     

      if (decoded.role !== 'doctor') {
       
        res.status(401).json({ error: "Not authorized, doctor not found" });
        throw new Error("Not authorized, doctor not found");
      } else {
       
        req.userId = decoded.doctorId;
        next();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    console.log("No Authorization header provided");
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };

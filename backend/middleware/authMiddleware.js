import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Admin from '../models/adminModel.js';

const protect = asyncHandler(async (req, res, next) => {
 
  let token;
  token = req.cookies.jwt;

  console.log(token,"tokem after user pro");
  if (token) {
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log(decoded,"token+jwt")
      
      
      req.userId = decoded.userId; // Assuming userId is stored in the token
      
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
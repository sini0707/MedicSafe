import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  console.log(req.cookies)
  let token;
  token = req.cookies.jwt;

  console.log(token,"tokem after user pro");
  if (token) {
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      console.log('Decoded Token Payload:', decoded);
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
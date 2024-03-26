import jwt, { decode } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Admin from '../models/adminModel.js';

const protect = asyncHandler(async (req, res, next) => {
 
  const Authtoken=req.headers.authorization;
  // console.log(Authtoken,"hahahaha")
 
  if (Authtoken) {
    try {

      const token = Authtoken.split(" ")[1];
    
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
       const userId=decoded.userId
      
      
      if(decoded.role!=='user'){
        res.status(401).json({error:"Not authorized,user not found"})
        throw new Error("Not authorized,user not found")
      }else{
        req.userId = userId; 
              next();
      }
    console.log(decoded,"decoded");
    
    } catch (error) {
      console.error(error,'errrrrorrrr');
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
import jwt, { decode } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
 
  const Authtoken=req.headers.authorization;


 
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
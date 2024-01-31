import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";
import BookingSchema from "../models/BookingSchema.js";

export const updatedDoctor=async(req,res)=>{
    const id=req.params.id;
    try{
      const updatedDoctor=await Doctor.findByIdAndUpdate(
        id,
        {
          $set:req.body},
          { new:true }
      );
      res.status(200).json({
        sucess:true,
        message:"Successfully updated",
        data:updatedDoctor,
      });
      }
      catch(err){
        res.status(500).json({sucess:false,message:"Failed to update"});
  
      }
    };
    export const deleteDoctor=async(req,res)=>{
      const id=req.params.id;
      try{
        await Doctor.findByAndDelete(id);
        res.status(200).json({
          sucess:true,
          message:"Successfully deleted"
        });
  
      }catch(err){
        res.status(500).json({success:false,message:"Failed to delete"});
  
  
      }
    };
    export const getSingleDoctor=async(req,res)=>{
      const id=req.params.id;
  
    
    try{
      const doctor=await Doctor.findById(id).select("-password");
      res.status(200).json({
        sucess:true,
        message:"Doctor found",
        data:doctor,
      });
    }catch(err){
      res.status(404).json({sucess:false,message:"no doctor found"});
    }
  };
  export const getAllDoctor=async(req,res)=>{
    try{
        const {query}=req.query
        let doctors;
        if(query){
            doctors=await Doctor.find({
                isApproved:'approved',
                $or:[
                    {name:{$regex:query,$options:"i"}},
            {specialization:{$regex:query,$options:"i"}},
        ]
        }).select("password");
        }else{
       doctors=await Doctor.find({isApproved:'approved'}).select(
        "-password");
       }
      res.status(200).json({
        sucess:true,
        message:"Doctor found",
        data:doctors,
      });
    }catch(err){
      res.status(404).json({sucess:false,message:"Not found"});
    }
  };

  export const getDoctorProfile=async(req,res)=>{
    const doctorId=req.userId;
    try{
        const doctor=await Doctor.findById(doctorId);
        if(!doctor){
            return res
            .status(404)
            .json({sucess:false,message:"doctor not found"});

        }
        const {password, ...rest}=doctor._doc;
        const appointment=await Booking.find({doctor:doctorId})
        res.status(200).json({
            sucess:true,
            message:"profile info getting",
            data:{...rest,appointments},
        });

    }catch(err){
        res.status(500)
        .json({sucess:false,message:"something went wrong,cannot get"});

    }
  }
    
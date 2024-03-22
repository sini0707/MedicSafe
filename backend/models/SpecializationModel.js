import mongoose from 'mongoose'

const specializationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  isBlocked:{
   type:Boolean,
   default:false
  },
  createdAt:{
    type:Date,
     default:Date.now,
  },

});

const Specialization = mongoose.model('Specialization', specializationSchema);

export default  Specialization;
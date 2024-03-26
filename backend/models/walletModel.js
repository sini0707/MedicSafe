import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  transactions: [
    {
      type: {
        type: String, 
        enum: ['debit', 'credit'],
        required: true,
      },
      amount: {
        type: Number,
        required:true
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  balance:{
    type:Number,
    default:0
  }
});

const Wallet  = mongoose.model('Wallet', walletSchema);

export default Wallet;
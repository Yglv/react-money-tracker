import mongoose from 'mongoose';
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  sum:{
    type: Number,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  }
}, { timestamps: true })

export const Transaction = mongoose.model('Transaction', transactionSchema)

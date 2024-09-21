import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  vendor: {
    type: String,
    required: [true, 'Please provide a vendor']
  },
  service: {
    type: String,
    required: [true, 'Please provide a service']
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: null,
  }
}, { timestamps: true });

const Income = mongoose.models?.Income || mongoose.model('Income', IncomeSchema);

export default Income;


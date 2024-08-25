import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
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
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense', // Reference to the Expense model
    required: true
  }
}, { timestamps: true });

const Service = mongoose.models?.Service || mongoose.model('Service', ServiceSchema);

export default Service;
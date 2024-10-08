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

const Service = mongoose.models?.Service || mongoose.model('Service', ServiceSchema);

export default Service;


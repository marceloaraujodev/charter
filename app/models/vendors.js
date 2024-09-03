import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  phone: String
}, { timestamps: true });

const Vendor = mongoose.models?.Vendor || mongoose.model('Vendor', VendorSchema);

export default Vendor;
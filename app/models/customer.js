import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  phone: {
    type: String,
    // required: true,
    unique: true,
  }
},
{
  timestamps: true
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);

export default Customer;
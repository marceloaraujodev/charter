import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email']
  },
  password: {
    type: String,
    required: [true, 'Please provide Password'],
    minlength: [3, 'password should be at least 3 character'],
    select: false
  },
  role: {
    type: String,
    default: 'user'
  },
  phone: String,
  forgotPasswordToken: String,
  forgotPasswordExpires: Date,
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;
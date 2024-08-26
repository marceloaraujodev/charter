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
  // expense: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Expense', // Reference to the Expense model
  //   required: true
  // }
}, { timestamps: true });

const Service = mongoose.models?.Service || mongoose.model('Service', ServiceSchema);

export default Service;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const itemSchema = new Schema({
//   price: { type: Number, required: true },
//   date: { type: Date, required: true },
//   service: { type: String, required: true },
//   vendor: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// // Middleware to update `updatedAt` on each save
// itemSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;
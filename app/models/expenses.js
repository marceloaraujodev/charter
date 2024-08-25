import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  amounts: { type: Number }
}, { timestamps: true });

const Expense = mongoose.models?.Expense || mongoose.model('Expense', ExpenseSchema);

export default Expense;
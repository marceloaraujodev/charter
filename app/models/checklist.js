import mongoose from "mongoose";

const CheckListSchema = new mongoose.Schema({
  list: [String]
}, {
  timestamps: true
});

const CheckList = mongoose.models?.CheckList || mongoose.model('CheckList', CheckListSchema);

export default CheckList;
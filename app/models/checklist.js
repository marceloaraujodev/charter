import mongoose from "mongoose";

const CheckListSchema = new mongoose.Schema({
  title: String,
  type: String,
  list: [{
    id: String,
    title: String,
  }]
}, {
  timestamps: true
});

const CheckList = mongoose.models?.CheckList || mongoose.model('CheckList', CheckListSchema);

export default CheckList;
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  start: String,
  end: String,
  title: String,
  description: String
},
{
  timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
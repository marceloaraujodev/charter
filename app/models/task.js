import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  eventId: String,
  start: String,
  end: String,
  title: String,
  description: String
},
{
  timestamps: true
});

const Task = mongoose.models?.Task || mongoose.model('Task', TaskSchema);

export default Task;
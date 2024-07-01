import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  eventId: String,
  start: String,
  end: String,
  time: String,
  title: String,
  description: String,
  public: Boolean,
},
{
  timestamps: true
});

const Task = mongoose.models?.Task || mongoose.model('Task', TaskSchema);

export default Task;
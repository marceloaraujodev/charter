import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  eventId: String,
  start: {
    type: String,
    required: true
  },
  end: String,
  time: String,
  title: String,
  description: String,
  publicView: Boolean,
  charter: Boolean,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    // required: true
  }
},
{
  timestamps: true
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
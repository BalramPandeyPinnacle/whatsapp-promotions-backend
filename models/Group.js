import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  criteria: Object, // Example: { city: 'Delhi', category: 'Student' }
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
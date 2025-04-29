import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  city: String,
  category: String,
  groupIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
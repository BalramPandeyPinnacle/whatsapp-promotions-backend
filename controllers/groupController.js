import Group from '../models/Group.js';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
  try {
    const { name, criteria } = req.body;
    const users = await User.find(criteria);

    const group = new Group({
      name,
      criteria,
      userIds: users.map(u => u._id)
    });

    await group.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
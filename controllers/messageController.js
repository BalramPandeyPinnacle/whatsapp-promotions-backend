import Group from '../models/Group.js';
import axios from 'axios';

export const sendMessage = async (req, res) => {
  const { groupId, text, imageUrl, pdfUrl } = req.body;

  try {
    const group = await Group.findById(groupId).populate('userIds');

    for (const user of group.userIds) {
      // Send Message using Gupshup API
      await axios.post('https://api.gupshup.io/sm/api/v1/msg', {
        channel: 'whatsapp',
        source: process.env.GUPSHUP_SOURCE_PHONE,
        destination: user.phone,
        message: {
          type: 'image',
          url: imageUrl,
          caption: text
        },
        // Similarly you can send PDF as a document type if required
      }, {
        headers: {
          'apikey': process.env.GUPSHUP_API_KEY,
          'Content-Type': 'application/json'
        }
      });
    }

    res.json({ message: 'Messages sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
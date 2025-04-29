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

export const sendMessageToUser = async (req, res) => {
  const { phone, text, imageUrl, pdfUrl } = req.body;

  console.log('Sending to phone:', phone);
  console.log('Message:', text);
  console.log('Image:', imageUrl);
  console.log('PDF:', pdfUrl);

  try {
    let messagePayload = {};

    if (imageUrl) {
      messagePayload = {
        type: 'image',
        url: imageUrl,
        caption: text
      };
    } else if (pdfUrl) {
      messagePayload = {
        type: 'file',
        url: pdfUrl,
        filename: 'document.pdf'
      };
    } else {
      messagePayload = {
        type: 'text',
        text: text
      };
    }

    await axios.post('https://api.gupshup.io/sm/api/v1/msg', {
      channel: 'whatsapp',
      source: process.env.GUPSHUP_SOURCE_PHONE,
      destination: phone,
      message: messagePayload
    }, {
      headers: {
        'apikey': process.env.GUPSHUP_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Gupshup API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};

// export const sendMessageToUser = async (req, res) => {
//   const { phone, text, imageUrl, pdfUrl } = req.body;

//   console.log('Sending to phone:', phone);
//   console.log('Message:', text);
//   console.log('Image:', imageUrl);
//   console.log('PDF:', pdfUrl);

//   try {
//     await axios.post('https://api.gupshup.io/sm/api/v1/msg', {
//       channel: 'whatsapp',
//       source: process.env.GUPSHUP_SOURCE_PHONE,
//       destination: phone,
//       message: {
//         type: 'image',
//         url: imageUrl,
//         caption: text
//       }
//     }, {
//       headers: {
//         'apikey': process.env.GUPSHUP_API_KEY,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json({ message: 'Message sent successfully!' });

//   } catch (error) {
//     console.error('Gupshup API Error:', error.response?.data || error.message);
//     res.status(500).json({ message: 'Failed to send message', error: error.message });
//   }
// };


// export const sendMessageToUser = async (req, res) => {
//   const { phone, text, imageUrl, pdfUrl } = req.body;

//   try {
//     // Send Message using Gupshup API
//     await axios.post('https://api.gupshup.io/sm/api/v1/msg', {
//       channel: 'whatsapp',
//       source: process.env.GUPSHUP_SOURCE_PHONE,
//       destination: phone,
//       message: {
//         type: 'image',
//         url: imageUrl,
//         caption: text
//       }
//       // Similarly you can send PDFs too
//     }, {
//       headers: {
//         'apikey': process.env.GUPSHUP_API_KEY,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json({ message: 'Message sent successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

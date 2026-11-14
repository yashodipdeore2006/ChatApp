import Message from '../models/Messages.model.js';
import User from '../models/User.model.js';
import { v2 as cloudinary } from 'cloudinary';


export async function getAllContacts(req, res) {
  try {
    const loggedInUser = req.user._id;
    const filteredUSers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');

    res.status(200).json({
      status: 'Successful',
      filteredUSers
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal server error',
      error: error.message
    });
  };
};


export async function getMessageByUserId(req, res) {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId
        },
        {
          senderId: userToChatId,
          receiverId: myId
        }
      ]
    });

    res.status(200).json(messages)

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal server error'
    });
  };
};


export async function sendMessage(req, res) {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url;
    };

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();


    //todo: real time messaging


    res.status(200).json({
      newMessage
    });
  } catch (error) {
    console.log('Error in sendMessage controller : ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  };
};
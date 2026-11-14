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



export async function getChatPartners(req, res) {
  try {
    const loggedInUserId = req.user._id;

    //find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find(
      {
        $or: [
          { senderId: loggedInUserId },
          { receiverId: loggedInUserId }
        ]
      }
    );


    //  find all the users id's who has send you a message or you have messaged them.

    //making it set first then array because logged-in users id will repeat multiple times as sended or receiver in messages
    const chatPartnerIds = [...new Set(messages.map((msg) => {
      return (
        msg.senderId.toString() === loggedInUserId ? msg.receiverId.toString() : msg.senderId.toString()
      )
    }))]


    //  find all the users who had a chat with you
    const chatPartners = await User.find(
      {
        _id: {
          $in: chatPartnerIds
        }
      }
    ).select('-password');

    res.status(200).json({
      status: 'Successful',
      message: 'Chat Partners fond successful',
      chatPartners
    });

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal server error'
    });
  };
};
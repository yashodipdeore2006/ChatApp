import Message from '../models/Messages.model.js';
import User from '../models/User.model.js';



export async function getAllContacts(req, res) {
  try {
    const loggedInUser = req.user._id;
    const filteredUSers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');

    res.status(200).jso({
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
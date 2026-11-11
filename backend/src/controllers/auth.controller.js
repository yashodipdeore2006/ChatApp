import bcrypt from 'bcryptjs'
import { ENV } from '../lib/env.js';

//=== local models ===
import User from "../models/User.model.js";
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import cloudinary from '../lib/cloudinary.js'


//=== Signup ===
export async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;

    //Error if one of the field is missing
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: 'Failed',
        message: 'All fields are required'
      });
    };

    //Password requirement check
    if (password.length < 6) {
      return status(400).json({
        status: 'Failed',
        message: 'Password must be at least 6 characters long'
      });
    };


    //check if email is valid 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Enter a valid email address : \neg. john123@gmail.com'
      });
    };

    //Check if user already exists 
    const user = await User.findOne({
      email: email
    });

    if (user) {
      return res.status(400).json({
        status: 'Failed',
        message: 'User already exists for this email'
      });
    };


    //Password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Creating new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });


    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);


      res.status(200).json({
        status: "Successful",
        message: 'New user created successfully',
        _id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email
      });

      try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL)
      } catch (error) {
        console.error('Failed to send welcome email');
      }

    } else {
      res.status(400).json({
        status: 'Failed',
        message: "Invalid user data"
      });
    };
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal server error',
      error: error.message
    });
  };
};



//=== Login ===
export async function Login(req, res) {
  try {
    const { email, password } = req.body;

    //Find user via email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'Failed',
        message: "Invalid credentials",

      });
    };

    //Check password correct or not
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    //Error if password is incorrect
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'Failed',
        message: "Invalid credentials",
      });
    };

    generateToken(user._id, res);

    res.status(200).json({
      status: 'successful',
      message: 'Login successful',
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture
    });

  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: 'Internal server error',
      Error: error.message
    })
  };
};


//=== logout ===
export function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "production",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}


//=== Reset Password ===
export async function resetPassword(req, res) {
  try {

  } catch (error) {

  }
};


export async function updateProfile(req, res) {
  try {
    const { profilePic } = req.body;

    if (!profilePic) return res.status(400).jso({
      status: 'Failed',
      message: 'Profile pic is required'
    });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: uploadResponse.secure_url
      },
      {
        new: true
      }
    );


    res.status(200).json({
      status: 'Failed',
      message: 'You profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal server error',
      Error: error.message
    });
  };
};
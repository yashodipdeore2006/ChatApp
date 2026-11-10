import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';

//=== local models ===
import User from "../models/User.model.js";
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';


dotenv.config();

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
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL)
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

  } catch (error) {

  };
};


//=== logout ===
export function logout(req, res) {
  try {

  } catch (error) {

  }
}

export async function resetPassword(req, res) {
  try {

  } catch (error) {

  }
}
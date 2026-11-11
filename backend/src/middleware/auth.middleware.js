import jwt from 'jsonwebtoken'
import ENV from '../lib/env.js'
import User from '../models//User.model.js';
import { use } from 'react';


export async function protect(req, res, next) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Unauthorized - No token provided'
      });
    };

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Invalid token'
      });
    };


    const user = await User.findById(decoded.userId).select(-password);

    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User not found'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal server error',
      Error: error.message
    });
  };
};
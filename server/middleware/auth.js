import jwt from 'jsonwebtoken';
import { ErrorHandler } from './utility.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;  // Fix: changed from req.cookies[token] to req.cookies.token
    
    if (!token) {
      return next(new ErrorHandler('Please login to access this route', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded.id;  // Changed back to decoded.id to match the token payload
    next();
  } catch (error) {
    next(new ErrorHandler('Invalid token', 401));
  }
};

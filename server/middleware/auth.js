import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../utils/utility.js';
import { User } from '../model/user.js';

// adminOnly middleware 

export const adminOnly = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return next(new ErrorHandler('Please login as an admin to access this route', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded !== process.env.ADMIN_SECRET_KEY) {
      return next(new ErrorHandler('Invalid token', 401));
    }

    next();
  } catch (error) {
    next(new ErrorHandler('Invalid token', 401));
  }
}
export const socketAuth = async (socket, next, err) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies.token;

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

// Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Fix: changed from req.cookies[token] to req.cookies.token

    if (!token) {
      return next(new ErrorHandler('Please login to access this route', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Changed back to decoded.id to match the token payload
    next();
  } catch (error) {
    next(new ErrorHandler('Invalid token', 401));
  }
};

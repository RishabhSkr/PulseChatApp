import { User } from '../model/user.js';
import { cookieOptions, sendToken } from '../utils/config.js';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../middleware/utility.js';

// signup constroller
// create a new user and save it to the database and save in cookie
const userSignup = async (req, res) => {
  try {
    const { name, username, bio, password } = req.body;

    const avatar = {
      public_id: 'public_id',
      url: 'profile_pic_url',
    };

    const user = await User.create({
      name,
      username,
      password,
      bio,
      avatar,
    });

    sendToken(res, user, 201, 'User created successfully!');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user)
      return next(new ErrorHandler('Invalid username or password', 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler('Invalid username or password', 404));

    sendToken(
      res,
      user,
      200,
      `Welcome Back!,${user.name} logged in successfully!`
    );
  } catch (error) {
    next(error);
  }
};

// add auth controller to check if user is authenticated
const getMyProfile = async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
};
// logout controller
const logout = async (req, res) => {
  try{
      return res
        .status(200)
        .cookie('token', null, { ...cookieOptions, maxAge: 0 })
        .json({
          success: true,
          message: 'Logged out successfully!',
        });

  }catch(error){
    next(error);
  }
};

// search controller
const searchUser = async (req, res) => {
  try{
     const { username } = req.query;


  }catch(error){
    next(error);
  }
};


export { userLogin, userSignup, getMyProfile, logout,searchUser };

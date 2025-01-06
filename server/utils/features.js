import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import {v2 as cloudinary } from 'cloudinary';
import { getBase64, getSockets } from '../lib/helper.js';

// cookie options
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true,
    httpOnly: true,
};

// sendToken function to send token to user
const sendToken = (res, user, statusCode, message) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Changed back to 'id'
    return res.status(statusCode).cookie('token', token, cookieOptions).json({
        success: true,
        message,
        token,
        user,
    });
};

// connectDB function to connect to database
const connectDB = uri => {
    mongoose
        .connect(uri, { dbName: 'PulseChat' })
        .then(data => {
            console.log(
                'Database connected:',
                data.connection.host,
                data.connection.name
            );
        })
        .catch(err => {
            console.log('Error connecting to database:', err);
        });
};

const emitEvent = (req, event, users, data) => {
    const io = req.app.get("io");
    const usersSocket = getSockets(users);
    io.to(usersSocket).emit(event, data);
    // console.log('Event emitted:', event);
  };

const uploadFilesTOCloudinary = async (files) => {
    try {
        // Ensure files is always an array
        const filesArray = Array.isArray(files) ? files : [files];
        
        const uploadPromises = filesArray.map((file) => {
            return new Promise((resolve, reject) => {
                const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                
                cloudinary.uploader.upload(
                    fileStr,
                    {
                        folder: 'chat-app',
                        resource_type: 'auto',
                        public_id: uuid(),
                    },
                    (err, result) => {
                        if (err) {
                            console.error('Cloudinary upload error:', err);
                            reject(err);
                        } else {
                            resolve({
                                public_id: result.public_id,
                                url: result.secure_url,
                            });
                        }
                    }
                );
            });
        });

        const results = await Promise.all(uploadPromises);
        return results;
    } catch (err) {
        console.error('Error in uploadFilesTOCloudinary:', err);
        throw new Error(`Error uploading files to cloudinary: ${err.message}`);
    }
};

const deleteFilesFromCloudinary = async public_id => {
    console.log('Deleting files from cloudinary');
};
export {
    connectDB,
    sendToken,
    cookieOptions,
    emitEvent,
    deleteFilesFromCloudinary,
    uploadFilesTOCloudinary,
};

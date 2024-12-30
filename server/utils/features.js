import mongoose from "mongoose"
import jwt from "jsonwebtoken"


// cookie options
const cookieOptions = {
    maxAge : 7*24*60*60*1000,
    sameSite : "none",
    secure : true,
    httpOnly : true
}


// sendToken function to send token to user
const sendToken = (res,user,statusCode,message)=>{
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)  // Changed back to 'id'
    return res.status(statusCode).cookie("token",token,cookieOptions).json({
        success: true,
        message,
        token,
        user
    })
}

// connectDB function to connect to database
const connectDB = (uri)=>{
    mongoose.connect(uri, {dbName: "PulseChat"})
    .then((data)=>{
        console.log("Database connected:", data.connection.host, data.connection.name)
    }).catch((err)=>{
        console.log("Error connecting to database:", err)
    })
}

const emitEvent = (io,event,users,data)=>{
    console.log("Emitting event:", event);
} 

const deleteFilesFromCloudinary =async (public_id)=>{
    console.log("Deleting files from cloudinary");
}
export {connectDB,sendToken,cookieOptions,emitEvent,deleteFilesFromCloudinary}
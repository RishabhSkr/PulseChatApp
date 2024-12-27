import e from "express"
import express from "express"
import {userLogin,userSignup,getMyProfile,logout,searchUser } from "../controllers/user.js"
import { singlAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const router  = express.Router();

router.post("/login",userLogin);
router.post("/signup",singlAvatar,userSignup);
router.get("/me",isAuthenticated,getMyProfile);
router.get("/logout",logout);
router.get("/search",isAuthenticated,searchUser);

export default router;
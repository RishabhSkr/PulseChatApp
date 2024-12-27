import multer from "multer";


const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

const singlAvatar = multerUpload.single("avatar");

export {
    singlAvatar
}
// Error Middleware
 const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  if(err.code===11000){
    err.statusCode = 400;
    err.message = Object.keys(err.keyValue)[0] + " already exists";
  }
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Invalid " + err.path;
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};



// TryCatch middleware
const TryCatch = (passedFunc) => async (req, res, next) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware, TryCatch };
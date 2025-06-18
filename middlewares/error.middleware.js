const errorMiddleware = (err, req, res, next) => {
  console.log(err); // Log the full error

  let statusCode = 500;
  let message = err.message || "Internal Server Error";

  // missing field Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  //duplicate user error
  if (err.code === 11000) {
    statusCode = 400;
    message = `${Object.keys(err.keyValue)} field(s) must be unique`;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      type: err.name,
      stack: process.env.DEV_MODE === "development" ? err.stack : undefined,
    },
  });
};

export default errorMiddleware;

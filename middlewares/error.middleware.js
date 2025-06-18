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
  if (err.code || err.code === 11000) {
    (statusCode = 400),
      (message = `${Object.keys(err.keyValue)} fiels has to be unique`);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;

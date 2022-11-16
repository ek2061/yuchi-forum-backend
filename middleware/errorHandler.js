const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ msg: err.msg });
};

export default errorHandler;

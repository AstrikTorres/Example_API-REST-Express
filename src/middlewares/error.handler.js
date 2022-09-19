const logErrors = (err, req, res, next) => {
  console.log('Function logErrors');
  console.error(err);
  next(err);
}

const errorHandler = (err, req, res, next) => {
  console.log('Function errorHandler');
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
}

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  
  next(err);
}

module.exports = {logErrors, errorHandler, boomErrorHandler};
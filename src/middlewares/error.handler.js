const logErrors = (err, req, res, next) => {
  console.log('Function logErrors');
  console.err(err);
  next(err);
}

const errorHandler = (err, req, res, next) => {
  console.log('Function errorHandler');
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
}

module.exports = {logErrors, errorHandler};
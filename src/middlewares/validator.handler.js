const boom = require('@hapi/boom');

const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    error ? next(boom.badRequest(error)) : next();
  }
}

module.exports = validatorHandler;
const { ValidationError } = require('sequelize');

module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let errorDetails = null;

  if (err instanceof ValidationError) {
    // Handle Sequelize validation errors
    status = 400;
    message = 'Validation Error';
    errorDetails = err.errors.map(e => e.message);
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    // Handle Sequelize unique constraint errors
    status = 400;
    message = 'Unique Constraint Error';
    errorDetails = err.errors.map(e => e.message);
  } else if (err.name === 'SequelizeDatabaseError') {
    // Handle Sequelize database errors
    message = 'Database Error';
  }

  res.status(status).json({
    message,
    errorDetails,
  });
};

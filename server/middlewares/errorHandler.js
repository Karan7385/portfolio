const NODE_ENV = process.env.NODE_ENV || 'development';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(
    `[SERVER ERROR] ${statusCode}: ${err.message}`,
    NODE_ENV === 'development' ? err.stack : ''
  );

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
function errorHandler(err, req, res, next) {
  if (!err) {
    next();
    return;
  }

  const error = err;
  if (error.name === 'MongoServerError' && error.code === 11000) {
    error.statusCode = 409;
    error.message = 'Este e-mail já existe.';
  }

  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Um erro ocorreu no servidor.' : message,
  });
}

function routeNotFound(req, res) {
  res.status(404).json({ message: 'A solicitação não foi encontrada.' });
}

module.exports = {
  errorHandler,
  routeNotFound,
};

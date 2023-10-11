function errorHandler(err, req, res, next) {
  if (!err) {
    next();
    return;
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    err.statusCode = 409;
    err.message = 'Este e-mail já existe.';
  }

  const { statusCode = 500, message } = err;
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

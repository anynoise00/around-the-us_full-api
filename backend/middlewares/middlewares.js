function errorHandler(err, req, res, next) {
  if (!err) {
    next();
    return;
  }

  console.log(err);

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

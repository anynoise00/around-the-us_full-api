function errorHandler(err, req, res, next) {
  if (!err) {
    next();
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Os dados enviados são inválidos.' });
    return;
  }

  if (err.name === 'DocumentNotFoundError') {
    res
      .status(404)
      .send({ message: 'O recurso solicitado não foi encontrado.' });
    return;
  }

  if (err.name === 'CastError') {
    res.status(404).send({ message: 'O ID da solicitação é inválido.' });
    return;
  }
  res.status(500).json({ message: 'Um erro ocorreu no servidor.' });
}

function routeNotFound(req, res) {
  res.status(404).json({ message: 'A solicitação não foi encontrada.' });
}

module.exports = {
  errorHandler,
  routeNotFound,
};

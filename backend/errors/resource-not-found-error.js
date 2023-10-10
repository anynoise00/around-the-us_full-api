class ResourceNotFoundError extends Error {
  constructor(message = 'O recurso solicitado não foi encontrado.') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = ResourceNotFoundError;

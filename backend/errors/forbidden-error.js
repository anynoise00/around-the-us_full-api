class ForbiddenError extends Error {
  constructor(message = 'Você não tem permissão para acessar este recurso.') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;

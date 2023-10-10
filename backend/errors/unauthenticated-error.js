class UnauthenticatedError extends Error {
  constructor(
    message = 'Você precisa estar logado para poder visitar esta pagina.'
  ) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthenticatedError;

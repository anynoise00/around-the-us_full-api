const { JWT_SECRET = 'dev-secret' } = process.env;
const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated-error');

function checkAuthorization(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthenticatedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new UnauthenticatedError());
  }

  req.user = payload;
  return next();
}

module.exports = {
  checkAuthorization,
};

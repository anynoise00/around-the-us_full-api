const User = require('../models/user');

function getUsers(req, res, next) {
  User.find({})
    .orFail()
    .then((users) => res.send(users))
    .catch(next);
}

function getUserByID(req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
}

function createUser(req, res, next) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user_id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
}

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateProfile,
  updateAvatar,
};

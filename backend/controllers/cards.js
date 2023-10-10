const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .orFail()
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function deleteCard(req, res, next) {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
}

function likeCard(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

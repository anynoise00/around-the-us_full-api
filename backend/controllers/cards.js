const ForbiddenError = require('../errors/forbidden-error');
const ResourceNotFoundError = require('../errors/resource-not-found-error');
const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .orFail(new ResourceNotFoundError())
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

  Card.findById(id)
    .orFail(
      new ResourceNotFoundError('O cartão solicitado não foi encontrado.')
    )
    .then((card) => {
      if (!card.owner.equals(req.user._id))
        throw new ForbiddenError(
          'Você não tem permissão para deletar cartões de outros usuários.'
        );
      Card.deleteOne(card).then((data) => res.send({ data }));
    })
    .catch(next);
}

function likeCard(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail(
      new ResourceNotFoundError('O cartão solicitado não foi encontrado.')
    )
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
    .orFail(
      new ResourceNotFoundError('O cartão solicitado não foi encontrado.')
    )
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

import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((userId) => userId === currentUser._id);

  const cardDeleteButtonClassName = isOwn ? '' : 'card__button-delete_hidden';
  const cardLikeButtonClassName = isLiked ? 'card__like-button_active' : '';

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    if (!isOwn) return;
    props.onCardDelete(props.card._id);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className='card'>
      {isOwn && (
        <button
          type='button'
          className={`button card__button-delete ${cardDeleteButtonClassName}`}
          onClick={handleDeleteClick}
        />
      )}
      <div
        className='card__image'
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
      />
      <div className='card__info-container'>
        <h2 className='card__title'>{props.card.name}</h2>
        <div className='card__like-container'>
          <div
            className={`button card__like-button ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          />
          <p className='card__like-counter'>{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-container'>
          <div
            className='profile__avatar'
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div
            className='profile__avatar-overlay'
            onClick={props.onEditAvatarClick}
          />
        </div>
        <div className='profile__info'>
          <h2 className='profile__name'>{currentUser.name || 'Lorem Ipsum'}</h2>
          <p className='profile__description'>
            {currentUser.about || 'Dolor, Sit & Amet'}
          </p>
          <button
            type='button'
            className='button profile__button-edit'
            onClick={props.onEditProfileClick}
          />
        </div>
        <button
          type='button'
          className='button profile__button-add'
          onClick={props.onAddPlaceClick}
        />
      </section>

      <ul className='cards'>
        {props.cards.map((c) => (
          <Card
            card={c}
            key={`card-${c._id}`}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        ))}
      </ul>

      {props.children}
    </main>
  );
}

export default Main;

import React from 'react';
import Popup from './Popup';

function ImagePopup(props) {
  return (
    <>
      <Popup {...props} isOpen={props.card} className='hehe'>
        <img
          src={props.card ? props.card.link : ''}
          alt='Imagem ampliada para melhor visualização da paisagem'
          className='image-popup__image'
        />
        <h2 className='image-popup__title'>
          {props.card ? props.card.name : 'Uma imagem representativa'}
        </h2>
      </Popup>
    </>
  );
}

export default ImagePopup;

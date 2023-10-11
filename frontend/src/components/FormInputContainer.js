import React from 'react';

function FormInputContainer(props) {
  return (
    <div className='form__input-area'>
      {props.children}
      <span className='form__input-error image-title-input-error' />
    </div>
  );
}

export default FormInputContainer;

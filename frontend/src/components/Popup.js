function Popup(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_visible'}`}>
      <div className='popup__container'>
        {props.children}
        <button
          type='button'
          className='button popup__button-close'
          onClick={props.onClose}
        />
      </div>
      <div className='popup__overlay' />
    </div>
  );
}

export default Popup;

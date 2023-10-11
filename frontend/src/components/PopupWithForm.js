import Popup from './Popup';

function PopupWithForm(props) {
  return (
    <Popup {...props}>
      <form
        className='form popup-form'
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate
      >
        <div className='form__header popup-form__header'>
          <h2 className='form__title'>{props.title}</h2>
        </div>

        <div className='form__body'>{props.children}</div>

        <div className='form__footer popup-form__footer'>
          <button
            type='submit'
            className='button button_theme_dark form__button-submit'
          >
            {props.submitBtnText}
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default PopupWithForm;

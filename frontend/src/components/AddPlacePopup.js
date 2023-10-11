import { useEffect, useState } from 'react';
import FormInputContainer from './FormInputContainer';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(ev) {
    setName(ev.target.value);
  }

  function handleLinkChange(ev) {
    setLink(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    props.onAddPlaceSubmit({ name, link });
  }

  useEffect(() => {
    if (!props.isOpen) return;

    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title='Novo local'
      name='add-place'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitBtnText={props.isLoading ? 'Adicionando...' : 'Adicionar'}
    >
      <FormInputContainer>
        <input
          type='text'
          name='name'
          value={name}
          className='form__field'
          placeholder='Título'
          minLength='2'
          maxLength='30'
          required
          onChange={handleNameChange}
        />
      </FormInputContainer>

      <FormInputContainer>
        <input
          type='url'
          name='link'
          value={link}
          className='form__field'
          placeholder='Link da imagem'
          required
          onChange={handleLinkChange}
        />
      </FormInputContainer>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

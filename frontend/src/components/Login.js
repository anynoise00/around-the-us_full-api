import { useState } from 'react';
import FormInputContainer from './FormInputContainer';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(ev) {
    setEmail(ev.target.value);
  }

  function handlePasswordChange(ev) {
    setPassword(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    props.onLoginSubmit(email, password);
  }

  return (
    <form className='form' name='signin' onSubmit={handleSubmit} noValidate>
      <div className='form__header'>
        <h2 className='form__title'>Entrar</h2>
      </div>

      <div className='form__body'>
        <FormInputContainer>
          <input
            type='email'
            name='email'
            value={email}
            className='form__field form__field_theme_dark'
            placeholder='E-mail'
            minLength='2'
            maxLength='30'
            required
            onChange={handleEmailChange}
          />
        </FormInputContainer>

        <FormInputContainer>
          <input
            type='password'
            name='password'
            value={password}
            className='form__field form__field_theme_dark'
            placeholder='Senha'
            required
            onChange={handlePasswordChange}
          />
        </FormInputContainer>
      </div>

      <div className='form__footer'>
        <button
          type='submit'
          className='button button_theme_light form__button-submit'
        >
          Entrar
        </button>

        <Link to='/signup' className='link'>
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </div>
    </form>
  );
}

export default Login;

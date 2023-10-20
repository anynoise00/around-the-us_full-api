import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, Link } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import Protected from './Protected';
import InfoTooltip from './InfoTooltip';

import iconInfoGood from '../images/icon_info_good.svg';
import iconInfoBad from '../images/icon_info_bad.svg';

import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { getAuthorization } from '../utils/helpers';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isBadTooltipOpen, setBadTooltipOpen] = useState(false);
  const [isGoodTooltipOpen, setGoodTooltipOpen] = useState(false);

  const [pendingDeletion, setPendingDeletion] = useState('');
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(cardId) {
    setPendingDeletion(cardId);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);
    api.changeCardLikeStatus(card._id, !isLiked).then((res) => {
      setCards(cards.map((c) => (c._id === res.data._id ? res.data : c)));
    });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((card) => {
        setCards([card.data, ...cards]);
      })
      .catch((err) => {})
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {})
      .finally(() => closeAllPopups());
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {})
      .finally(() => closeAllPopups());
  }

  function handleDeleteConfirm(ev) {
    ev.preventDefault();
    setIsLoading(true);

    api
      .deleteCard(pendingDeletion)
      .then((_) => {
        setCards(cards.filter((c) => !(c._id === pendingDeletion)));
      })
      .catch((err) => {})
      .finally(() => closeAllPopups());
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setGoodTooltipOpen(true);
      })
      .catch((err) => {
        setBadTooltipOpen(true);
      });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setPendingDeletion('');
    setSelectedCard(undefined);

    setGoodTooltipOpen(false);
    setBadTooltipOpen(false);
    setIsLoading(false);
  }

  function handleTokenCheck() {
    const jwt = getAuthorization();

    if (jwt) {
      return auth
        .authorize(jwt)
        .then((res) => {
          setUserEmail(res.data.email);
        })
        .then((_) => {
          api
            .getUserInfo()
            .then((user) => {
              setCurrentUser(user.data);
            })
            .catch((err) => {});
          api
            .getInitialCards()
            .then((cards) => setCards(cards))
            .catch((err) => {});
        })
        .then((_) => {
          signIn();
        })
        .catch((err) => {});
    }

    return Promise.reject('No JWT in localStorage');
  }

  function signIn() {
    setLoggedIn(true);
    navigate('/');
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin');
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((_) => {
        handleTokenCheck();
      })
      .catch((err) => {
        setBadTooltipOpen(true);
      });
  }

  useEffect(() => {
    handleTokenCheck().catch((err) => {});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const escClose = (ev) => {
      if (ev.key === 'Escape') closeAllPopups();
    };

    document.addEventListener('keydown', escClose);

    return () => {
      document.removeEventListener('keydown', escClose);
    };
  });

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                <Header>
                  <Link to='/signin' className='link'>
                    Entrar
                  </Link>
                </Header>
                <Register onRegisterSubmit={handleRegister} />
              </>
            }
          />
          <Route
            path='/signin'
            element={
              <>
                <Header>
                  <Link to='/signup' className='link'>
                    Inscreva-se
                  </Link>
                </Header>
                <Login onLoginSubmit={handleLogin} />
              </>
            }
          />
          <Route
            path='/'
            element={
              <Protected loggedIn={loggedIn}>
                <Header collapsible={true}>
                  <p className='navbar__text'>{userEmail}</p>
                  <p className='link header__logout' onClick={signOut}>
                    Sair
                  </p>
                </Header>
                <Main
                  cards={cards}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  closeAllPopups={closeAllPopups}
                >
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    isLoading={isLoading}
                  />

                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                  />

                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                  />

                  <PopupWithForm
                    title='Tem certeza?'
                    name='delete-confirm'
                    isOpen={pendingDeletion}
                    onClose={closeAllPopups}
                    onSubmit={handleDeleteConfirm}
                    submitBtnText={isLoading ? 'Deletando...' : 'Deletar'}
                  />

                  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </Main>
              </Protected>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />

        <InfoTooltip
          isOpen={isGoodTooltipOpen}
          onClose={closeAllPopups}
          img={iconInfoGood}
          text='Vitória! Você precisa se registrar.'
        />

        <InfoTooltip
          isOpen={isBadTooltipOpen}
          onClose={closeAllPopups}
          img={iconInfoBad}
          text={`Ops, algo deu errado!\nPor favor, tente novamente.`}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

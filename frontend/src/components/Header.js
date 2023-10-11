import React, { useState } from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

import iconBars from '../images/icon_bars.svg';
import iconClose from '../images/icon_close.svg';

function Header(props) {
  const [isCollapsed, setCollapsed] = useState(true);

  function toggleNavbar(ev) {
    ev.preventDefault();
    setCollapsed(!isCollapsed);
  }

  return (
    <header className={`header ${props.collapsible && 'header_collapsible'}`}>
      <Link to='/'>
        <img src={logo} alt='Logo da EUA Afora' className='header__logo' />
      </Link>

      <nav
        className={`header__navbar ${
          props.collapsible && 'header__navbar_collapsible'
        } ${props.collapsible && isCollapsed && 'header__navbar_hidden'}`}
      >
        {props.children}
      </nav>

      {props.collapsible && (
        <img
          className='button header__collapse-btn'
          onClick={toggleNavbar}
          src={isCollapsed ? iconBars : iconClose}
          alt='Alternar a visibilidade da barra de navegação'
        />
      )}
    </header>
  );
}

export default Header;

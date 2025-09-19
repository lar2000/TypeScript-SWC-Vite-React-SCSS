// src/components/header/Header.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import DropdownNotification from './dropdown/notification';
import DropdownLanguage from './dropdown/language';
import DropdownProfile from './dropdown/profile';
import SearchForm from './search/form';
import DropdownMegaMenu from './dropdown/mega';

import logo from '../../../public/assets/img/profile.jpg';
import { AppSettings } from '../../config/app-settings';

function Header(): React.ReactElement {
  const ctx = useContext(AppSettings);

  if (!ctx) {
    throw new Error('Header must be used within AppSettings.Provider');
  }

  const {
    toggleAppSidebarMobile,
    toggleAppTopMenuMobile,
    appHeaderLanguageBar,
    appHeaderMegaMenu,
    appTopMenu,
    appSidebarNone,
  } = ctx;

  return (
    <div id="header" className="app-header" style={{ background: '#2CADE2'}}
    >
      <div className="navbar-header">
        <Link to="/" className="navbar-brand text-white">
          <span>
            <img src={logo} alt="logo" className="w-40px h-30px rounded-pill me-2" />
          </span>
          ລະບົບ ປະກັນໄພ
        </Link>

        {appHeaderMegaMenu && (
          <button type="button" className="navbar-mobile-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#top-navbar"
          >
            <span className="fa-stack fa-lg text-inverse">
              <i className="far fa-square fa-stack-2x"></i>
              <i className="fa fa-cog fa-stack-1x"></i>
            </span>
          </button>
        )}
        {appTopMenu && !appSidebarNone && (
          <button type="button" className="navbar-mobile-toggler"
            onClick={toggleAppTopMenuMobile}
          >
            <span className="fa-stack fa-lg text-inverse">
              <i className="far fa-square fa-stack-2x"></i>
              <i className="fa fa-cog fa-stack-1x"></i>
            </span>
          </button>
        )}
        {appSidebarNone && appTopMenu && (
          <button type="button" className="navbar-mobile-toggler"
            onClick={toggleAppTopMenuMobile}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        )}
        {!appSidebarNone && (
          <button type="button" className="navbar-mobile-toggler"
            onClick={toggleAppSidebarMobile}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        )}
      </div>

      {appHeaderMegaMenu && <DropdownMegaMenu />}

      <div className="navbar-nav">
        <SearchForm />
        <DropdownNotification/>

        {appHeaderLanguageBar && <DropdownLanguage />}

        <DropdownProfile />
      </div>
    </div>
  );
}

export default Header;

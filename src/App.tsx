// src/App.tsx
import React, { useState } from "react";
import 'rsuite/dist/rsuite.min.css';
import { AppSettings } from "./config/app-settings";
import { slideToggle } from "./composables/slideToggle";

import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import TopMenu from "./components/top-menu/top-menu";
import Content from "./components/content/content";

function App(): React.ReactElement {
  // =====================
  // STATES
  // =====================
  const [appHeaderNone, setAppHeaderNone] = useState<boolean>(false);
  const [appHeaderFixed, setAppHeaderFixed] = useState<boolean>(true);
  const [appHeaderInverse, setAppHeaderInverse] = useState<boolean>(false);
  const [appHeaderMegaMenu, setAppHeaderMegaMenu] = useState<boolean>(false);
  const [appHeaderLanguageBar, setAppHeaderLanguageBar] = useState<boolean>(true);
  const [appSidebarNone, setAppSidebarNone] = useState<boolean>(false);
  const [appSidebarWide, setAppSidebarWide] = useState<boolean>(false);
  const [appSidebarLight, setAppSidebarLight] = useState<boolean>(false);
  const [appSidebarMinify, setAppSidebarMinify] = useState<boolean>(false);
  const [appSidebarMobileToggled, setAppSidebarMobileToggled] = useState<boolean>(false);
  const [appSidebarTransparent, setAppSidebarTransparent] = useState<boolean>(false);
  const [appSidebarSearch, setAppSidebarSearch] = useState<boolean>(false);
  const [appSidebarFixed, setAppSidebarFixed] = useState<boolean>(true);
  const [appContentNone, setAppContentNone] = useState<boolean>(false);
  const [appContentClass, setAppContentClass] = useState<string>("");
  const [appContentFullHeight, setAppContentFullHeight] = useState<boolean>(false);
  const [appTopMenu, setAppTopMenu] = useState<boolean>(false);
  const [appTopMenuMobileToggled] = useState<boolean>(false);

  // =====================
  // HANDLERS (all typed)
  // =====================
  const handleSetAppHeaderNone = (value: boolean): void =>
    setAppHeaderNone(value);
  const handleSetAppHeaderInverse = (value: boolean): void =>
    setAppHeaderInverse(value);
  const handleSetAppHeaderLanguageBar = (value: boolean): void =>
    setAppHeaderLanguageBar(value);
  const handleSetAppHeaderMegaMenu = (value: boolean): void =>
    setAppHeaderMegaMenu(value);

  const handleSetAppHeaderFixed = (value: boolean): void => {
    if (value === false && appSidebarFixed) {
      alert(
        "Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar."
      );
      setAppSidebarFixed(false);
      if (localStorage) localStorage.appSidebarFixed = String(false);
    }
    setAppHeaderFixed(value);
    if (localStorage) localStorage.appHeaderFixed = String(value);
  };

  const handleSetAppSidebarNone = (value: boolean): void =>
    setAppSidebarNone(value);
  const handleSetAppSidebarWide = (value: boolean): void =>
    setAppSidebarWide(value);
  const handleSetAppSidebarLight = (value: boolean): void =>
    setAppSidebarLight(value);
  const handleSetAppSidebarMinified = (value: boolean): void =>
    setAppSidebarMinify(value);
  const handleSetAppSidebarTransparent = (value: boolean): void =>
    setAppSidebarTransparent(value);
  const handleSetAppSidebarSearch = (value: boolean): void =>
    setAppSidebarSearch(value);

  const handleSetAppSidebarFixed = (value: boolean): void => {
    if (value === true && !appHeaderFixed) {
      alert(
        "Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar."
      );
      setAppHeaderFixed(true);
      if (localStorage) localStorage.appHeaderFixed = String(true);
    }
    setAppSidebarFixed(value);
    if (localStorage) localStorage.appSidebarFixed = String(value);
  };

  const toggleAppSidebarMinify = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    const newVal = !appSidebarMinify;
    setAppSidebarMinify(newVal);

    if (localStorage) {
      localStorage.appSidebarMinify = String(newVal);
    }
  };

  const toggleAppSidebarMobile = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    setAppSidebarMobileToggled(!appSidebarMobileToggled);
  };

  const handleSetAppContentNone = (value: boolean): void =>
    setAppContentNone(value);
  const handleSetAppContentClass = (value: string): void =>
    setAppContentClass(value);
  const handleSetAppContentFullHeight = (value: boolean): void =>
    setAppContentFullHeight(value);
  const handleSetAppTopMenu = (value: boolean): void => setAppTopMenu(value);

  const toggleAppTopMenuMobile = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    const menu = document.querySelector(".app-top-menu");
    if (menu instanceof HTMLElement) {
      slideToggle(menu);
    }
  };

  const handleSetAppBoxedLayout = (value: boolean): void => {
    if (value) {
      document.body.classList.add("boxed-layout");
    } else {
      document.body.classList.remove("boxed-layout");
    }
  };

  return (
    <AppSettings.Provider
      value={{
        appHeaderNone,
        appHeaderFixed,
        appHeaderInverse,
        appHeaderMegaMenu,
        appHeaderLanguageBar,
        handleSetAppHeaderNone,
        handleSetAppHeaderInverse,
        handleSetAppHeaderLanguageBar,
        handleSetAppHeaderMegaMenu,
        handleSetAppHeaderFixed,
        appSidebarNone,
        appSidebarWide,
        appSidebarLight,
        appSidebarMinify,
        appSidebarMobileToggled,
        appSidebarTransparent,
        appSidebarSearch,
        appSidebarFixed,
        handleSetAppSidebarNone,
        handleSetAppSidebarWide,
        handleSetAppSidebarLight,
        handleSetAppSidebarMinified,
        handleSetAppSidebarTransparent,
        handleSetAppSidebarSearch,
        handleSetAppSidebarFixed,
        toggleAppSidebarMinify,
        toggleAppSidebarMobile,
        appContentNone,
        appContentClass,
        appContentFullHeight,
        handleSetAppContentNone,
        handleSetAppContentClass,
        handleSetAppContentFullHeight,
        appTopMenu,
        appTopMenuMobileToggled,
        toggleAppTopMenuMobile,
        handleSetAppTopMenu,
        handleSetAppBoxedLayout,
      }}
    >
      <div
        className={
          "app app-gradient-enabled fs-15px " +
          (appHeaderNone ? "app-without-header " : "") +
          (appHeaderFixed && !appHeaderNone ? "app-header-fixed " : "") +
          (appSidebarFixed ? "app-sidebar-fixed " : "") +
          (appSidebarNone ? "app-without-sidebar " : "") +
          (appSidebarWide ? "app-with-wide-sidebar " : "") +
          (appSidebarMinify ? "app-sidebar-minified " : "") +
          (appSidebarMobileToggled ? "app-sidebar-mobile-toggled " : "") +
          (appTopMenu ? "app-with-top-menu " : "") +
          (appContentFullHeight ? "app-content-full-height " : "") 
        }
      >
        {!appHeaderNone && <Header />}
        {!appSidebarNone && <Sidebar />}
        {appTopMenu && <TopMenu />}
        {!appContentNone && <Content />}
      </div>
    </AppSettings.Provider>
  );
}

export default App;

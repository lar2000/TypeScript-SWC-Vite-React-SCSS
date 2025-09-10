// src/App.tsx
import React, { useEffect, useState } from "react";
import { AppSettings } from "./config/app-settings";
import { slideToggle } from "./composables/slideToggle";

import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import SidebarRight from "./components/sidebar-right/sidebar-right";
import TopMenu from "./components/top-menu/top-menu";
import Content from "./components/content/content";
import ThemePanel from "./components/theme-panel/theme-panel";

function App(): React.ReactElement {
  // =====================
  // STATES
  // =====================
  const [appTheme, setAppTheme] = useState<string>("");
  const [appDarkMode, setAppDarkMode] = useState<boolean>(false);
  const [appGradientEnabled, setAppGradientEnabled] = useState<boolean>(false);
  const [appHeaderNone, setAppHeaderNone] = useState<boolean>(false);
  const [appHeaderFixed, setAppHeaderFixed] = useState<boolean>(true);
  const [appHeaderInverse, setAppHeaderInverse] = useState<boolean>(false);
  const [appHeaderMegaMenu, setAppHeaderMegaMenu] = useState<boolean>(false);
  const [appHeaderLanguageBar, setAppHeaderLanguageBar] =
    useState<boolean>(false);
  const [hasScroll, setHasScroll] = useState<boolean>(false);
  const [appSidebarNone, setAppSidebarNone] = useState<boolean>(false);
  const [appSidebarWide, setAppSidebarWide] = useState<boolean>(false);
  const [appSidebarLight, setAppSidebarLight] = useState<boolean>(false);
  const [appSidebarMinify, setAppSidebarMinify] = useState<boolean>(false);
  const [appSidebarMobileToggled, setAppSidebarMobileToggled] =
    useState<boolean>(false);
  const [appSidebarTransparent, setAppSidebarTransparent] =
    useState<boolean>(false);
  const [appSidebarSearch, setAppSidebarSearch] = useState<boolean>(false);
  const [appSidebarFixed, setAppSidebarFixed] = useState<boolean>(true);
  const [appSidebarGrid, setAppSidebarGrid] = useState<boolean>(false);
  const [appContentNone, setAppContentNone] = useState<boolean>(false);
  const [appContentClass, setAppContentClass] = useState<string>("");
  const [appContentFullHeight, setAppContentFullHeight] =
    useState<boolean>(false);
  const [appTopMenu, setAppTopMenu] = useState<boolean>(false);
  const [appTopMenuMobileToggled] = useState<boolean>(false);
  const [appSidebarTwo, setAppSidebarTwo] = useState<boolean>(false);
  const [appSidebarEnd, setAppSidebarEnd] = useState<boolean>(false);
  const [appSidebarEndToggled, setAppSidebarEndToggled] =
    useState<boolean>(false);
  const [appSidebarEndMobileToggled, setAppSidebarEndMobileToggled] =
    useState<boolean>(false);

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

  const handleSetAppSidebarGrid = (value: boolean): void => {
    setAppSidebarGrid(value);
    if (localStorage) localStorage.appSidebarGrid = String(value);
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

  const handleSetAppSidebarEnd = (value: boolean): void =>
    setAppSidebarEnd(value);
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

  const handleSetAppSidebarTwo = (value: boolean): void => {
    setAppSidebarTwo(value);
    setAppSidebarEndToggled(value);
  };

  const handleSetAppBoxedLayout = (value: boolean): void => {
    if (value) {
      document.body.classList.add("boxed-layout");
    } else {
      document.body.classList.remove("boxed-layout");
    }
  };

  const handleSetAppDarkMode = (value: boolean): void => {
    const html = document.querySelector("html");
    if (value) {
      html?.setAttribute("data-bs-theme", "dark");
    } else {
      html?.removeAttribute("data-bs-theme");
    }
    setAppDarkMode(value);
    if (localStorage) localStorage.appDarkMode = String(value);
    document.dispatchEvent(new Event("theme-reload"));
  };

  const handleSetAppGradientEnabled = (value: boolean): void => {
    setAppGradientEnabled(value);
    if (localStorage) localStorage.appGradientEnabled = String(value);
  };

  const handleSetAppTheme = (value: string): void => {
    const newTheme = `theme-${value}`;
    for (let x = 0; x < document.body.classList.length; x++) {
      if (
        document.body.classList[x].indexOf("theme-") > -1 &&
        document.body.classList[x] !== newTheme
      ) {
        document.body.classList.remove(document.body.classList[x]);
      }
    }
    document.body.classList.add(newTheme);
    if (localStorage && value) localStorage.appTheme = value;
    document.dispatchEvent(new Event("theme-reload"));
    setAppTheme(value);
  };

  const toggleAppSidebarEnd = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    setAppSidebarMobileToggled(!appSidebarMobileToggled);
  };

const toggleAppSidebarEndMobile = (
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
): void => {
  e.preventDefault();
  setAppSidebarEndMobileToggled((prev) => !prev); // ✅ now the setter is used
};

  // =====================
  // EFFECTS
  // =====================
  useEffect(() => {
    handleSetAppTheme(appTheme);
    if (appDarkMode) handleSetAppDarkMode(true);

    const handleScroll = (): void => {
      setHasScroll(window.scrollY > 0);
      const tooltips = document.getElementsByClassName("nvtooltip");
      for (let i = 0; i < tooltips.length; i++) {
        tooltips[i].classList.add("d-none");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [appTheme, appDarkMode]);

  // =====================
  // RENDER
  // =====================
  return (
    <AppSettings.Provider
      value={{
        appTheme,
        appDarkMode,
        appGradientEnabled,
        appHeaderNone,
        appHeaderFixed,
        appHeaderInverse,
        appHeaderMegaMenu,
        appHeaderLanguageBar,
        hasScroll,
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
        appSidebarGrid,
        handleSetAppSidebarNone,
        handleSetAppSidebarWide,
        handleSetAppSidebarLight,
        handleSetAppSidebarMinified,
        handleSetAppSidebarTransparent,
        handleSetAppSidebarSearch,
        handleSetAppSidebarFixed,
        handleSetAppSidebarGrid,
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
        appSidebarTwo,
        handleSetAppSidebarTwo,
        appSidebarEnd,
        appSidebarEndToggled,
        appSidebarEndMobileToggled,
        toggleAppSidebarEnd,
        toggleAppSidebarEndMobile,
        handleSetAppSidebarEnd,
        handleSetAppBoxedLayout,
        handleSetAppDarkMode,
        handleSetAppGradientEnabled,
        handleSetAppTheme,
      }}
    >
      <div
        className={
          "app " +
          (appGradientEnabled ? "app-gradient-enabled " : "") +
          (appHeaderNone ? "app-without-header " : "") +
          (appHeaderFixed && !appHeaderNone ? "app-header-fixed " : "") +
          (appSidebarFixed ? "app-sidebar-fixed " : "") +
          (appSidebarNone ? "app-without-sidebar " : "") +
          (appSidebarEnd ? "app-with-end-sidebar " : "") +
          (appSidebarWide ? "app-with-wide-sidebar " : "") +
          (appSidebarMinify ? "app-sidebar-minified " : "") +
          (appSidebarMobileToggled ? "app-sidebar-mobile-toggled " : "") +
          (appTopMenu ? "app-with-top-menu " : "") +
          (appContentFullHeight ? "app-content-full-height " : "") +
          (appSidebarTwo ? "app-with-two-sidebar " : "") +
          (appSidebarEndToggled ? "app-sidebar-end-toggled " : "") +
          (appSidebarEndMobileToggled
            ? "app-sidebar-end-mobile-toggled "
            : "") +
          (hasScroll ? "has-scroll " : "")
        }
      >
        {!appHeaderNone && <Header />}
        {!appSidebarNone && <Sidebar />}
        {appSidebarTwo && <SidebarRight />}
        {appTopMenu && <TopMenu />}
        {!appContentNone && <Content />}
        <ThemePanel />
      </div>
    </AppSettings.Provider>
  );
}

export default App;

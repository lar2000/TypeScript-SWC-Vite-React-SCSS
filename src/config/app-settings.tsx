// src/config/app-settings.tsx
import React from "react";

export interface AppSettingsContextProps {
  appTheme: string;
  appDarkMode: boolean;
  appGradientEnabled: boolean;
  appHeaderNone: boolean;
  appHeaderFixed: boolean;
  appHeaderInverse: boolean;
  appHeaderMegaMenu: boolean;
  appHeaderLanguageBar: boolean;
  hasScroll: boolean;

  // setters / togglers
  handleSetAppHeaderNone: (value: boolean) => void;
  handleSetAppHeaderInverse: (value: boolean) => void;
  handleSetAppHeaderLanguageBar: (value: boolean) => void;
  handleSetAppHeaderMegaMenu: (value: boolean) => void;
  handleSetAppHeaderFixed: (value: boolean) => void;

  appSidebarNone: boolean;
  appSidebarWide: boolean;
  appSidebarLight: boolean;
  appSidebarMinify: boolean;
  appSidebarMobileToggled: boolean;
  appSidebarTransparent: boolean;
  appSidebarSearch: boolean;
  appSidebarFixed: boolean;
  appSidebarGrid: boolean;

  handleSetAppSidebarNone: (value: boolean) => void;
  handleSetAppSidebarWide: (value: boolean) => void;
  handleSetAppSidebarLight: (value: boolean) => void;
  handleSetAppSidebarMinified: (value: boolean) => void;
  handleSetAppSidebarTransparent: (value: boolean) => void;
  handleSetAppSidebarSearch: (value: boolean) => void;
  handleSetAppSidebarFixed: (value: boolean) => void;
  handleSetAppSidebarGrid: (value: boolean) => void;

  toggleAppSidebarMinify: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  toggleAppSidebarMobile: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;

  appContentNone: boolean;
  appContentClass: string;
  appContentFullHeight: boolean;
  handleSetAppContentNone: (value: boolean) => void;
  handleSetAppContentClass: (value: string) => void;
  handleSetAppContentFullHeight: (value: boolean) => void;

  appTopMenu: boolean;
  appTopMenuMobileToggled: boolean;
  toggleAppTopMenuMobile: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  handleSetAppTopMenu: (value: boolean) => void;

  appSidebarTwo: boolean;
  handleSetAppSidebarTwo: (value: boolean) => void;

  appSidebarEnd: boolean;
  appSidebarEndToggled: boolean;
  appSidebarEndMobileToggled: boolean;
  toggleAppSidebarEnd: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  toggleAppSidebarEndMobile: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  handleSetAppSidebarEnd: (value: boolean) => void;

  handleSetAppBoxedLayout: (value: boolean) => void;
  handleSetAppDarkMode: (value: boolean) => void;
  handleSetAppGradientEnabled: (value: boolean) => void;
  handleSetAppTheme: (value: string) => void;
}

export const AppSettings = React.createContext<AppSettingsContextProps | undefined>(undefined);

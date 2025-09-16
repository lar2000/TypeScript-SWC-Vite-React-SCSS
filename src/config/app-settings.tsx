// src/config/app-settings.tsx
import React from "react";

export interface AppSettingsContextProps {
  appHeaderNone: boolean;
  appHeaderFixed: boolean;
  appHeaderInverse: boolean;
  appHeaderMegaMenu: boolean;
  appHeaderLanguageBar: boolean;

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

  handleSetAppSidebarNone: (value: boolean) => void;
  handleSetAppSidebarWide: (value: boolean) => void;
  handleSetAppSidebarLight: (value: boolean) => void;
  handleSetAppSidebarMinified: (value: boolean) => void;
  handleSetAppSidebarTransparent: (value: boolean) => void;
  handleSetAppSidebarSearch: (value: boolean) => void;
  handleSetAppSidebarFixed: (value: boolean) => void;

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

  handleSetAppBoxedLayout: (value: boolean) => void;
}

export const AppSettings = React.createContext<AppSettingsContextProps | undefined>(undefined);

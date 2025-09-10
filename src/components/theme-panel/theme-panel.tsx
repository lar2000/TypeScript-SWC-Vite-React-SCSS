import React, { useContext, useState } from 'react';
import { AppSettings } from '../../config/app-settings';

function ThemePanel(): React.ReactElement {
  const context = useContext(AppSettings) as {
    handleSetAppDarkMode?: (value: boolean) => void;
    handleSetAppHeaderFixed?: (value: boolean) => void;
    handleSetAppSidebarFixed?: (value: boolean) => void;
    handleSetAppHeaderInverse?: (value: boolean) => void;
    handleSetAppSidebarGrid?: (value: boolean) => void;
    handleSetAppGradientEnabled?: (value: boolean) => void;
    handleSetAppTheme?: (theme: string) => void;
  };

  const [expand, setExpand] = useState(false);
  const [theme, setTheme] = useState(
    localStorage && typeof localStorage.appTheme !== 'undefined'
      ? (localStorage.appTheme as string)
      : 'teal'
  );
  const themeList = [
    'red',
    'pink',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'cyan',
    'blue',
    'purple',
    'indigo',
    'dark',
  ];

  const handleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.handleSetAppDarkMode?.(e.target.checked);
  };

  const handleHeaderFixed = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.handleSetAppHeaderFixed?.(e.target.checked);
  };

  const handleSidebarFixed = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.handleSetAppSidebarFixed?.(e.target.checked);
  };

  const handleHeaderInverse = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.handleSetAppHeaderInverse?.(e.target.checked);
  };

  const handleSidebarGrid = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.handleSetAppSidebarGrid?.(e.target.checked);
  };

  const handleGradientEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.handleSetAppGradientEnabled?.(e.target.checked);
  };

  const toggleExpand = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setExpand((prev) => !prev);
  };

  const toggleTheme = (e: React.MouseEvent<HTMLAnchorElement>, theme: string) => {
    e.preventDefault();
    context?.handleSetAppTheme?.(theme);
    setTheme(theme);
  };

  return (
    <AppSettings.Consumer>
      {(ctx) => {
        if (!ctx) return null;

        const {
          appDarkMode,
          appHeaderFixed,
          appHeaderInverse,
          appSidebarFixed,
          appSidebarGrid,
          appGradientEnabled,
        } = ctx as {
          appDarkMode?: boolean;
          appHeaderFixed?: boolean;
          appHeaderInverse?: boolean;
          appSidebarFixed?: boolean;
          appSidebarGrid?: boolean;
          appGradientEnabled?: boolean;
        };

        return (
          <div className={'theme-panel ' + (expand ? 'active' : '')}>
            <a
              href="#0"
              onClick={toggleExpand}
              className="theme-collapse-btn"
            >
              <i className="fa fa-cog"></i>
            </a>
            <div className="theme-panel-content" data-scrollbar="true" data-height="100%">
              <h5>App Settings</h5>

              <div className="theme-list">
                {themeList.map((themeListItem, i) => (
                  <div
                    key={i}
                    className={'theme-list-item ' + (themeListItem === theme ? 'active' : '')}
                  >
                    <a
                      href="#0"
                      onClick={(e) => toggleTheme(e, themeListItem)}
                      className={'theme-list-link bg-' + themeListItem}
                    >
                      &nbsp;
                    </a>
                  </div>
                ))}
              </div>

              <div className="theme-panel-divider"></div>

              {/* Dark Mode */}
              <div className="row mt-10px">
                <div className="col-8 control-label text-dark fw-bold">
                  <div>
                    Dark Mode
                    <span
                      className="badge bg-primary ms-1 py-2px position-relative"
                      style={{ top: '-1px' }}
                    >
                      NEW
                    </span>
                  </div>
                  <div className="lh-14">
                    <small className="text-dark opacity-50">
                      Adjust the appearance to reduce glare and give your eyes a break.
                    </small>
                  </div>
                </div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-theme-dark-mode"
                      onChange={handleDarkMode}
                      id="appThemeDarkMode"
                      checked={!!appDarkMode}
                      value="1"
                    />
                    <label className="form-check-label" htmlFor="appThemeDarkMode">
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>

              <div className="theme-panel-divider"></div>

              {/* Header Fixed */}
              <div className="row mt-10px align-items-center">
                <div className="col-8 control-label text-dark fw-bold">Header Fixed</div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-header-fixed"
                      onChange={handleHeaderFixed}
                      id="appHeaderFixed"
                      checked={!!appHeaderFixed}
                    />
                    <label className="form-check-label" htmlFor="appHeaderFixed">
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>

              {/* Header Inverse */}
              <div className="row mt-10px align-items-center">
                <div className="col-8 control-label text-dark fw-bold">Header Inverse</div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-header-inverse"
                      onChange={handleHeaderInverse}
                      id="appHeaderInverse"
                      checked={!!appHeaderInverse}
                    />
                    <label className="form-check-label" htmlFor="appHeaderInverse">
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>

              {/* Sidebar Fixed */}
              <div className="row mt-10px align-items-center">
                <div className="col-8 control-label text-dark fw-bold">Sidebar Fixed</div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-sidebar-fixed"
                      onChange={handleSidebarFixed}
                      id="appSidebarFixed"
                      checked={!!appSidebarFixed}
                    />
                    <label className="form-check-label" htmlFor="appSidebarFixed">
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>

              {/* Sidebar Grid */}
              <div className="row mt-10px align-items-center">
                <div className="col-8 control-label text-dark fw-bold">Sidebar Grid</div>
                <div className="col-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={handleSidebarGrid}
                      name="app-sidebar-grid"
                      id="appSidebarGrid"
                      checked={!!appSidebarGrid}
                    />
                    <label className="form-check-label" htmlFor="appSidebarGrid">
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>

              {/* Gradient Enabled */}
              <div className="row mt-10px align-items-center">
                <div className="col-md-8 control-label text-dark fw-bold">Gradient Enabled</div>
                <div className="col-md-4 d-flex">
                  <div className="form-check form-switch ms-auto mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="app-gradient-enabled"
                      onChange={handleGradientEnabled}
                      id="appGradientEnabled"
                      checked={!!appGradientEnabled}
                    />
                    <label className="form-check-label" htmlFor="appGradientEnabled">
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>

              {/* rest of your static sections (Admin Design, Language Version, etc.) remain unchanged */}
            </div>
          </div>
        );
      }}
    </AppSettings.Consumer>
  );
}

export default ThemePanel;

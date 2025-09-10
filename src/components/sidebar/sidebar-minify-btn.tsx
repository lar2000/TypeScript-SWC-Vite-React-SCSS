import React from 'react';
import { Link } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings';

function SidebarMinifyBtn(): React.ReactElement {
  return (
    <AppSettings.Consumer>
      {(ctx) => {
        if (!ctx) return null;

        const {
          toggleAppSidebarMinify,
        //   toggleAppSidebarMobile,
        //   appSidebarTransparent,
        //   appSidebarGrid,
        } = ctx as {
          toggleAppSidebarMinify?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
          toggleAppSidebarMobile?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
          appSidebarTransparent?: boolean;
          appSidebarGrid?: boolean;
        };

        return (
          <div className="menu">
            <div className="menu-item d-flex">
              <Link to="/" className="app-sidebar-minify-btn ms-auto"
                onClick={toggleAppSidebarMinify}
              >
                <i className="fa fa-angle-double-left"></i>
              </Link>
            </div>
          </div>
        );
      }}
    </AppSettings.Consumer>
  );
}

export default SidebarMinifyBtn;

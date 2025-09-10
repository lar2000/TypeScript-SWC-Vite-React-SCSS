import React from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AppSettings } from '../../config/app-settings';

function SidebarRight(): React.ReactElement {
  return (
    <AppSettings.Consumer>
      {(ctx) => {
        if (!ctx) return null;

        // Cast context to expected shape
        const { appSidebarTwo, toggleAppSidebarEndMobile } = ctx as {
          appSidebarTwo?: boolean;
          toggleAppSidebarEndMobile?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
        };

        return (
          <>
            {appSidebarTwo && (
              <>
                <div id="sidebar-right" className="app-sidebar app-sidebar-end" data-bs-theme="dark"
                >
                  <PerfectScrollbar className="app-sidebar-content h-100"
                    options={{ suppressScrollX: true }}
                  >
                    <div className="p-20px text-white">
                      <p className="fw-bold mb-2">Accordion</p>
                      <div className="accordion" id="accordionSidebar">
                        {[...Array(8)].map((_, i) => {
                          const num = i + 1;
                          return (
                            <div key={num}
                              className="accordion-item bg-gray-700 text-white border-0 rounded-0"
                            >
                              <h2 id={`heading${num}`}
                                className="accordion-header bg-gray-900 rounded-0 d-flex align-items-center"
                              >
                                <button
                                  className="accordion-button bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center py-2 px-3 collapsed"
                                  type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${num}`}
                                >
                                  Accordion #{num}
                                </button>
                              </h2>
                              <div id={`collapse${num}`} data-bs-parent="#accordionSidebar"
                              className={`accordion-collapse collapse${
                                  num === 1 ? ' show' : ''
                                }`}
                              >
                                <div className="accordion-body py-2 p-3">
                                  Anim pariatur cliche reprehenderit, enim eiusmod
                                  high life accusamus terry richardson ad squid.
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </PerfectScrollbar>
                </div>
                <div className="app-sidebar-bg app-sidebar-end" data-bs-theme="dark"
                ></div>
                <div className="app-sidebar-mobile-backdrop app-sidebar-end">
                  <Link to="/"
                    onClick={toggleAppSidebarEndMobile}
                    className="stretched-link"
                  ></Link>
                </div>
              </>
            )}
          </>
        );
      }}
    </AppSettings.Consumer>
  );
}

export default SidebarRight;

import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AppSettings } from '../../config/app-settings';
import { slideToggle } from '../../composables/slideToggle';
import SidebarMinifyBtn from './sidebar-minify-btn';
import SidebarProfile from './sidebar-profile';
import SidebarNav from './sidebar-nav';

function Sidebar(): React.ReactElement {
  const context = useContext(AppSettings);

  useEffect(() => {
    let appSidebarFloatSubmenuTimeout: ReturnType<typeof setTimeout> | null = null;
    let appSidebarFloatSubmenuDom: HTMLElement | null = null;

    function handleGetHiddenMenuHeight(elm: HTMLElement): number {
      elm.setAttribute(
        'style',
        'position: absolute; visibility: hidden; display: block !important'
      );
      const targetHeight = elm.clientHeight;
      elm.removeAttribute('style');
      return targetHeight;
    }

    function handleSidebarMinifyFloatMenuClick(): void {
      const elms = Array.from(
        document.querySelectorAll(
          '#app-sidebar-float-submenu .menu-item.has-sub > .menu-link'
        )
      );

      elms.forEach((elm) => {
        (elm as HTMLElement).onclick = (e: MouseEvent) => {
          e.preventDefault();

          const current = e.currentTarget as HTMLElement;
          const targetItem = current.closest('.menu-item');
          const target = targetItem?.querySelector('.menu-submenu') as HTMLElement | null;
          if (!target) return;

          const targetStyle = getComputedStyle(target);
          const close = targetStyle.getPropertyValue('display') !== 'none';
          const expand = targetStyle.getPropertyValue('display') === 'none';

          slideToggle(target);

          const loopHeight = setInterval(() => {
            const targetMenu = document.querySelector(
              '#app-sidebar-float-submenu'
            ) as HTMLElement | null;
            const targetMenuArrow = document.querySelector(
              '#app-sidebar-float-submenu-arrow'
            ) as HTMLElement | null;
            const targetMenuLine = document.querySelector(
              '#app-sidebar-float-submenu-line'
            ) as HTMLElement | null;

            if (!targetMenu || !targetMenuArrow || !targetMenuLine) return;

            const targetHeight = targetMenu.clientHeight;
            const targetOffset = targetMenu.getBoundingClientRect();
            const targetOriTop = Number(targetMenu.getAttribute('data-offset-top'));
            const targetMenuTop = Number(targetMenu.getAttribute('data-menu-offset-top'));
            let targetTop = targetOffset.top;
            const windowHeight = document.body.clientHeight;

            if (close) {
              if (targetTop > targetOriTop) {
                targetTop = targetOriTop;
                targetMenu.style.top = `${targetTop}px`;
                targetMenu.style.bottom = 'auto';
                targetMenuArrow.style.top = '20px';
                targetMenuArrow.style.bottom = 'auto';
                targetMenuLine.style.top = '20px';
                targetMenuLine.style.bottom = 'auto';
              }
            }

            if (expand) {
              if (windowHeight - targetTop < targetHeight) {
                const arrowBottom = windowHeight - targetMenuTop - 22;
                targetMenu.style.top = 'auto';
                targetMenu.style.bottom = '0';
                targetMenuArrow.style.top = 'auto';
                targetMenuArrow.style.bottom = `${arrowBottom}px`;
                targetMenuLine.style.top = '20px';
                targetMenuLine.style.bottom = `${arrowBottom}px`;
              }

              const floatSubmenuElm = document.querySelector(
                '#app-sidebar-float-submenu .app-sidebar-float-submenu'
              ) as HTMLElement | null;
              if (floatSubmenuElm && targetHeight > windowHeight) {
                floatSubmenuElm.classList.add('overflow-scroll', 'mh-100vh');
              }
            }
          }, 1);

          setTimeout(() => clearInterval(loopHeight), 250);
        };
      });
    }

    function handleSidebarMinifyFloatMenu(): void {
      const elms = Array.from(
        document.querySelectorAll('.app-sidebar .menu > .menu-item.has-sub > .menu-link')
      );

      elms.forEach((elm) => {
        (elm as HTMLElement).onmouseenter = (e: MouseEvent) => {
          const current = e.currentTarget as HTMLElement;
          const appElm = document.querySelector('.app');
          if (!appElm?.classList.contains('app-sidebar-minified')) return;

          if (appSidebarFloatSubmenuTimeout) clearTimeout(appSidebarFloatSubmenuTimeout);

          const targetMenu = current.closest('.menu-item')?.querySelector(
            '.menu-submenu'
          ) as HTMLElement | null;
          if (!targetMenu) return;

          if (
            appSidebarFloatSubmenuDom === current &&
            document.querySelector('#app-sidebar-float-submenu')
          ) {
            return;
          } else {
            appSidebarFloatSubmenuDom = current;
          }

          const targetMenuHtml = targetMenu.innerHTML;
          if (!targetMenuHtml) return;

          const bodyStyle = getComputedStyle(document.body);
          const sidebar = document.querySelector('#sidebar') as HTMLElement | null;
          if (!sidebar) return;

          const sidebarOffset = sidebar.getBoundingClientRect();
          const sidebarWidth = sidebar.clientWidth;
          const sidebarX =
            !appElm.classList.contains('app-sidebar-end') &&
            bodyStyle.getPropertyValue('direction') !== 'rtl'
              ? sidebarOffset.left + sidebarWidth
              : document.body.clientWidth - sidebarOffset.left;

          const targetHeight = handleGetHiddenMenuHeight(targetMenu);
          const targetOffset = current.getBoundingClientRect();
          const targetTop = targetOffset.top;
          const targetLeft =
            !appElm.classList.contains('app-sidebar-end') &&
            bodyStyle.getPropertyValue('direction') !== 'rtl'
              ? sidebarX
              : 'auto';
          const targetRight =
            !appElm.classList.contains('app-sidebar-end') &&
            bodyStyle.getPropertyValue('direction') !== 'rtl'
              ? 'auto'
              : sidebarX;

          const windowHeight = document.body.clientHeight;

          if (!document.querySelector('#app-sidebar-float-submenu')) {
            const overflowClass = targetHeight > windowHeight ? 'overflow-scroll mh-100vh' : '';
            const html = document.createElement('div');
            html.setAttribute('id', 'app-sidebar-float-submenu');
            html.setAttribute('class', 'app-sidebar-float-submenu-container');
            html.setAttribute('data-offset-left', String(targetLeft));
            html.setAttribute('data-menu-offset-left', String(targetLeft));
			      html.setAttribute('data-offset-top', String(targetTop));
            html.setAttribute('data-menu-offset-top', String(targetTop));
			      html.setAttribute('data-offset-right', String(targetRight));
            html.setAttribute('data-menu-offset-right', String(targetRight));
            html.innerHTML = `
              <div class="app-sidebar-float-submenu-arrow" id="app-sidebar-float-submenu-arrow"></div>
              <div class="app-sidebar-float-submenu-line" id="app-sidebar-float-submenu-line"></div>
              <div class="app-sidebar-float-submenu ${overflowClass}">${targetMenuHtml}</div>
            `;
            appElm.appendChild(html);

            const floatElm = document.getElementById('app-sidebar-float-submenu');
            if (floatElm) {
              floatElm.onmouseover = () => {
                if (appSidebarFloatSubmenuTimeout) clearTimeout(appSidebarFloatSubmenuTimeout);
              };
              floatElm.onmouseout = () => {
                appSidebarFloatSubmenuTimeout = setTimeout(() => {
                  document.querySelector('#app-sidebar-float-submenu')?.remove();
                }, 250);
              };
            }
          }

          handleSidebarMinifyFloatMenuClick();
        };

        (elm as HTMLElement).onmouseleave = () => {
          const appElm = document.querySelector('.app');
          if (appElm?.classList.contains('app-sidebar-minified')) {
            appSidebarFloatSubmenuTimeout = setTimeout(() => {
              document.querySelector('#app-sidebar-float-submenu-line')?.remove();
              appSidebarFloatSubmenuDom = null;
            }, 250);
          }
        };
      });
    }

    handleSidebarMinifyFloatMenu();
  }, []);

  return (
    <AppSettings.Consumer>
      {(ctx) => {
        if (!ctx) return null;

        const {
        //   toggleAppSidebarMinify,
          toggleAppSidebarMobile,
          appSidebarTransparent,
          appSidebarLight,
        } = ctx as {
          toggleAppSidebarMinify?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
          toggleAppSidebarMobile?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
          appSidebarTransparent?: boolean;
          appSidebarLight?: boolean;
        };

        return (
          <>
            <div id="sidebar" className={ 'app-sidebar shadow-lg' +
                (appSidebarTransparent ? 'app-sidebar-transparent ' : '')
              }
              data-bs-theme={appSidebarLight ? '' : 'light'}
            >
              <PerfectScrollbar className="app-sidebar-content " options={{ suppressScrollX: true }}
              >
                {!context?.appSidebarSearch && <SidebarProfile />}
                <SidebarNav />
                <SidebarMinifyBtn />
              </PerfectScrollbar>
            </div>
            <div className="app-sidebar-bg" data-bs-theme={appSidebarLight ? '' : 'light'}
            ></div>
            <div className="app-sidebar-mobile-backdrop ">
              <Link to="/" onClick={toggleAppSidebarMobile}
                className="stretched-link"
              ></Link>
            </div>
          </>
        );
      }}
    </AppSettings.Consumer>
  );
}

export default Sidebar;

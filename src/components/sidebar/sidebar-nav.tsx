// src/components/sidebar/SidebarNav.tsx
import React, { useEffect, useContext } from 'react';
import {
  useResolvedPath,
  useMatch,
  NavLink,
  useLocation,
  matchPath,
} from 'react-router-dom';

import { AppSettings } from '../../config/app-settings';
import menus from '../../config/app-menu';
import { slideUp } from '../../composables/slideUp';
import { slideToggle } from '../../composables/slideToggle';

// ========== Types ==========
interface MenuItem {
  path: string;
  title?: string;
  icon?: string;
  img?: string;
  label?: string;
  badge?: string;
  highlight?: boolean;
  children?: MenuItem[];
}

// ========== NavItem ==========
interface NavItemProps {
  menu: MenuItem;
}

function NavItem({ menu, ...props }: NavItemProps): React.ReactElement {
  const resolved = useResolvedPath(menu.path);
  const match = useMatch({ path: resolved.pathname, end: true });

  const location = useLocation();
  const match2 = matchPath({ path: menu.path, end: false }, location.pathname);

  const icon = menu.icon && (
    <div className="menu-icon">
      <i className={menu.icon}></i>
    </div>
  );
  const img = menu.img && (
    <div className="menu-icon-img">
      <img src={menu.img} alt="" />
    </div>
  );
  const caret = menu.children && !menu.badge && <div className="menu-caret"></div>;
  const label = menu.label && <span className="menu-label ms-5px">{menu.label}</span>;
  const badge = menu.badge && <div className="menu-badge bg-teal-100 text-teal-600">{menu.badge}</div>;
  const highlight = menu.highlight && <i className="fa fa-paper-plane text-theme"></i>;
  const title =
    menu.title && (
      <div className="menu-text">
        {menu.title} {label} {highlight}
      </div>
    );

  useEffect(() => {
    const handleClick = function (this: HTMLElement, e: Event) {
      e.preventDefault();
      const target = this.nextElementSibling as HTMLElement | null;

      // only close siblings at same level
      const parentMenu = this.closest('.menu-submenu') || this.closest('.menu');
      const siblingMenus = parentMenu ? Array.from(parentMenu.children) : [];

      siblingMenus.forEach((menuEl) => {
        const otherTarget = menuEl.querySelector('.menu-submenu') as HTMLElement | null;
        if (otherTarget && otherTarget !== target) {
          slideUp(otherTarget, expandTime);

          const otherTargetMenuItem = otherTarget.closest('.menu-item');
          if (otherTargetMenuItem && otherTargetMenuItem.classList) {
            otherTargetMenuItem.classList.remove('expand');
            otherTargetMenuItem.classList.add('closed');
          }
        }
      });

      const targetItemElm = target?.closest('.menu-item');
      if (targetItemElm && targetItemElm.classList) {
        if (
          targetItemElm.classList.contains('expand') ||
          (targetItemElm.classList.contains('active') && !target?.style.display)
        ) {
          targetItemElm.classList.remove('expand');
          targetItemElm.classList.add('closed');
          if (target) slideToggle(target, expandTime);
        } else {
          targetItemElm.classList.add('expand');
          targetItemElm.classList.remove('closed');
          if (target) slideToggle(target, expandTime);
        }
      }
    };

    const handleSidebarMenuToggle = (
      links: Element[],
    //   expandTime: number,
	  
    ): void => {
      links.forEach((link) => {
        link.removeEventListener('click', handleClick as EventListener);
        link.addEventListener('click', handleClick as EventListener);
      });
    };

    // expand time
    const targetSidebar = document.querySelector(
      '.app-sidebar:not(.app-sidebar-end)'
    );
    const expandTime =
      targetSidebar?.getAttribute('data-disable-slide-animation') ? 0 : 300;

    const menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
    const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

    const menus = Array.from(
      document.querySelectorAll(menuBaseSelector + ' > .menu-link')
    );
    const submenusLvl1 = Array.from(
      document.querySelectorAll(
        menuBaseSelector + submenuBaseSelector + ' > .menu-link'
      )
    );
    const submenusLvl2 = Array.from(
      document.querySelectorAll(
        menuBaseSelector +
          submenuBaseSelector +
          submenuBaseSelector +
          ' > .menu-link'
      )
    );

    handleSidebarMenuToggle([...menus, ...submenusLvl1, ...submenusLvl2],
		//  expandTime
		);

    return () => {
      [...menus, ...submenusLvl1, ...submenusLvl2].forEach((menuEl) => {
        menuEl.removeEventListener('click', handleClick as EventListener);
      });
    };
  }, []);

  return (
    <div
      className={
        'menu-item' +
        ((match || match2) ? ' active' : '') +
        (menu.children ? ' has-sub' : '')
      }
    >
      {!menu.children && (
        <NavLink className="menu-link" to={menu.path} {...props}>
          {img} {icon} {title}
          {caret} {badge}
        </NavLink>
      )}
      {menu.children && (
        <a href="#/" className="menu-link">
          {img} {icon} {title}
          {caret} {badge}
        </a>
      )}

      {menu.children && (
        <div className="menu-submenu">
          {menu.children.map((submenu, i) => (
            <NavItem key={i} menu={submenu} />
          ))}
        </div>
      )}
    </div>
  );
}

// ========== SidebarNav ==========
function SidebarNav(): React.ReactElement {
  const context = useContext(AppSettings);

  const handleSidebarSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const targetValue = (e.target as HTMLInputElement).value.toLowerCase();

    if (targetValue) {
      const elms = Array.from(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search), .app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'
        )
      );
      elms.forEach((elm) => elm.classList.add('d-none'));

      const elms2 = Array.from(
        document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .has-text')
      );
      elms2.forEach((elm) => elm.classList.remove('has-text'));

      const elms3 = Array.from(
        document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand')
      );
      elms3.forEach((elm) => elm.classList.remove('expand'));

      const elms4 = Array.from(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search) > .menu-link, .app-sidebar .menu-submenu > .menu-item > .menu-link'
        )
      );
      elms4.forEach((elm) => {
        const targetText = elm.textContent?.toLowerCase() || '';
        if (targetText.includes(targetValue)) {
          const targetElm = elm.closest('.menu-item');
          targetElm?.classList.remove('d-none');
          targetElm?.classList.add('has-text');

          const targetElm2 = elm.closest('.menu-item.has-sub');
          if (targetElm2) {
            const targetElm3 = targetElm?.querySelector(
              '.menu-submenu .menu-item.d-none'
            );
            targetElm3?.classList.remove('d-none');
          }

          const targetElm4 = elm.closest('.menu-submenu') as HTMLElement | null;
          if (targetElm4) {
            targetElm4.style.display = 'block';

            const targetElm5 = targetElm?.querySelector('.menu-item:not(.has-text)');
            targetElm5?.classList.add('d-none');

            const targetElm6 = elm.closest('.has-sub:not(.has-text)');
            if (targetElm6) {
              targetElm6.classList.remove('d-none');
              targetElm6.classList.add('expand');

              const targetElm7 = targetElm?.closest('.has-sub:not(.has-text)');
              targetElm7?.classList.remove('d-none');
              targetElm7?.classList.add('expand');
            }
          }
        }
      });
    } else {
      const elms5 = Array.from(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search).has-sub .menu-submenu'
        )
      );
      elms5.forEach((elm) => elm.removeAttribute('style'));

      const elms6 = Array.from(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search)'
        )
      );
      elms6.forEach((elm) => elm.classList.remove('d-none'));

      const elms7 = Array.from(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'
        )
      );
      elms7.forEach((elm) => elm.classList.remove('d-none'));

      const elms8 = Array.from(
        document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand')
      );
      elms8.forEach((elm) => elm.classList.remove('expand'));
    }
  };

  return (
    <div className="menu">
      {(context as { appSidebarSearch?: boolean })?.appSidebarSearch && (
        <div className="menu-search mb-n3">
          <input
            type="text"
            className="form-control"
            placeholder="Sidebar menu filter..."
            onKeyUp={handleSidebarSearch}
          />
        </div>
      )}
      <div className="menu-header">Navigation</div>
      {menus.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
    </div>
  );
}

export default SidebarNav;

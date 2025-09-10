import React, { useEffect } from 'react';
import {
  useResolvedPath,
  useMatch,
  useLocation,
  matchPath,
  Link,
  NavLink,
} from 'react-router-dom';
import menus from '../../config/app-menu';
import { slideUp } from '../../composables/slideUp';
import { slideToggle } from '../../composables/slideToggle';

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

interface NavItemProps {
  menu: MenuItem;
}

function NavItem({ menu, ...props }: NavItemProps): React.ReactElement {
  const resolved = useResolvedPath(menu.path);
  const match = useMatch({ path: resolved.pathname });
  const location = useLocation();
  const match2 = matchPath({ path: menu.path, end: false }, location.pathname);

  const icon = menu.icon && (
    <div className="menu-icon">
      <i className={menu.icon}></i>
    </div>
  );
  const img =
    menu.img && (
      <div className="menu-icon-img">
        <img src={menu.img} alt="" />
      </div>
    );
  const caret = menu.children && !menu.badge && <div className="menu-caret"></div>;
  const label = menu.label && (
    <span className="menu-label ms-5px">{menu.label}</span>
  );
  const badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
  const highlight = menu.highlight && (
    <i className="fa fa-paper-plane text-theme"></i>
  );
  const title =
    menu.title && (
      <div className="menu-text">
        {menu.title} {label} {highlight}
      </div>
    );

  return (
    <div
      className={
        'menu-item' +
        ((match || match2) ? ' active' : '') +
        (menu.children ? ' has-sub' : '')
      }
    >
      <NavLink className="menu-link" to={menu.path} {...props}>
        {img} {icon} {title}
        {caret} {badge}
      </NavLink>

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

function TopMenuNav(): React.ReactElement {
  useEffect(() => {
    handlePageLoadMenuFocus();
    handleTopMenuSubMenu();
  }, []);

  function handlePageLoadMenuFocus(): void {
    const targetMenu = document.querySelector<HTMLElement>('.app-top-menu .menu');
    if (!targetMenu) return;

    const bodyStyle = window.getComputedStyle(document.body);
    const viewWidth =
      (document.querySelector('.app-top-menu') as HTMLElement).clientWidth - 128;
    let prevWidth = 0;
    let fullWidth = 0;

    const elms = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.app-top-menu .menu > .menu-item'
      )
    );

    let found = false;
    elms.forEach((elm) => {
      if (!elm.classList.contains('menu-control')) {
        fullWidth += elm.clientWidth;
        if (!found) {
          prevWidth += elm.clientWidth;
        }
        if (elm.classList.contains('active')) {
          found = true;
        }
      }
    });

    if (prevWidth >= viewWidth) {
      const finalScrollWidth = prevWidth - viewWidth + 128;
      if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
        targetMenu.style.marginLeft = `-${finalScrollWidth}px`;
      } else {
        targetMenu.style.marginRight = `-${finalScrollWidth}px`;
      }
    }

    const elm = targetMenu.querySelector('.menu-control.menu-control-end');
    if (elm) {
      if (prevWidth !== fullWidth && fullWidth >= viewWidth) {
        elm.classList.add('show');
      } else {
        elm.classList.remove('show');
      }
    }

    const elm2 = targetMenu.querySelector('.menu-control.menu-control-start');
    if (elm2) {
      if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
        elm2.classList.add('show');
      } else {
        elm2.classList.remove('show');
      }
    }
  }

  function handleMenuButtonAction(
    e: React.MouseEvent<HTMLAnchorElement>,
    direction: 'next' | 'prev'
  ): void {
    const element = e.currentTarget;
    const obj = element.closest('.menu') as HTMLElement;
    if (!obj) return;

    const objStyle = window.getComputedStyle(obj);
    const bodyStyle = window.getComputedStyle(document.body);
    const targetCss =
      bodyStyle.getPropertyValue('direction') === 'rtl'
        ? 'margin-right'
        : 'margin-left';
    const marginLeft = parseInt(objStyle.getPropertyValue(targetCss));
    const containerWidth =
      (document.querySelector('.app-top-menu') as HTMLElement).clientWidth - 80;
    let totalWidth = 0;
    let finalScrollWidth = 0;

    const elms = Array.from(obj.querySelectorAll<HTMLElement>('.menu-item'));
    elms.forEach((elm) => {
      if (!elm.classList.contains('menu-control')) {
        totalWidth += elm.clientWidth;
      }
    });

    switch (direction) {
      case 'next': {
        const widthNextLeft = totalWidth + marginLeft - containerWidth;
        if (widthNextLeft <= containerWidth) {
          finalScrollWidth = widthNextLeft - marginLeft - 88;
          setTimeout(() => {
            obj.querySelector('.menu-control.menu-control-end')?.classList.remove('show');
          }, 300);
        } else {
          finalScrollWidth = containerWidth - marginLeft - 88;
        }

        if (finalScrollWidth !== 0) {
          obj.style.transitionProperty = 'height, margin, padding';
          obj.style.transitionDuration = '300ms';
          if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
            obj.style.marginLeft = `-${finalScrollWidth}px`;
          } else {
            obj.style.marginRight = `-${finalScrollWidth}px`;
          }
          setTimeout(() => {
            obj.style.transitionProperty = '';
            obj.style.transitionDuration = '';
            obj
              .querySelector('.menu-control.menu-control-start')
              ?.classList.add('show');
          }, 300);
        }
        break;
      }
      case 'prev': {
        const widthPrevLeft = -marginLeft;
        if (widthPrevLeft <= containerWidth) {
          obj.querySelector('.menu-control.menu-control-start')?.classList.remove('show');
          finalScrollWidth = 0;
        } else {
          finalScrollWidth = widthPrevLeft - containerWidth + 88;
        }

        obj.style.transitionProperty = 'height, margin, padding';
        obj.style.transitionDuration = '300ms';
        if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
          obj.style.marginLeft = `-${finalScrollWidth}px`;
        } else {
          obj.style.marginRight = `-${finalScrollWidth}px`;
        }

        setTimeout(() => {
          obj.style.transitionProperty = '';
          obj.style.transitionDuration = '';
          obj.querySelector('.menu-control.menu-control-end')?.classList.add('show');
        }, 300);
        break;
      }
    }
  }

  function handleTopMenuToggle(menus: HTMLElement[], forMobile = false): void {
    menus.forEach((menu) => {
      menu.onclick = (e) => {
        e.preventDefault();
        if (!forMobile || (forMobile && document.body.clientWidth < 768)) {
          const target = menu.nextElementSibling as HTMLElement;
          menus.forEach((m) => {
            const otherTarget = m.nextElementSibling as HTMLElement;
            if (otherTarget !== target) {
              slideUp(otherTarget);
              const parentItem = otherTarget.closest('.menu-item');
              parentItem?.classList.remove('expand');
              parentItem?.classList.add('closed');
            }
          });

          slideToggle(target);
        }
      };
    });
  }

  function handleTopMenuSubMenu(): void {
    const menuBaseSelector = '.app-top-menu .menu > .menu-item.has-sub';
    const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

    const menuLinkSelector = menuBaseSelector + ' > .menu-link';
    const menus = Array.from(document.querySelectorAll<HTMLElement>(menuLinkSelector));
    handleTopMenuToggle(menus, true);

    const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
    const submenusLvl1 = Array.from(
      document.querySelectorAll<HTMLElement>(submenuLvl1Selector + ' > .menu-link')
    );
    handleTopMenuToggle(submenusLvl1);

    const submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
    const submenusLvl2 = Array.from(
      document.querySelectorAll<HTMLElement>(submenuLvl2Selector + ' > .menu-link')
    );
    handleTopMenuToggle(submenusLvl2);

    window.addEventListener('resize', () => {
      const elms = Array.from(
        document.querySelectorAll<HTMLElement>('.app-top-menu .menu-submenu')
      );
      elms.forEach((elm) => elm.removeAttribute('style'));
    });
  }

  const controlRight = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleMenuButtonAction(e, 'next');
  };

  const controlLeft = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleMenuButtonAction(e, 'prev');
  };

  return (
    <div id="app-top-menu" className="menu">
      {menus.map((menu: MenuItem, i: number) => (
        <NavItem key={i} menu={menu} />
      ))}
      <div className="menu-item menu-control menu-control-start">
        <Link className="menu-link" to="/" onClick={controlLeft}>
          <i className="fa fa-angle-left"></i>
        </Link>
      </div>
      <div className="menu-item menu-control menu-control-end">
        <Link className="menu-link" to="/" onClick={controlRight}>
          <i className="fa fa-angle-right"></i>
        </Link>
      </div>
    </div>
  );
}

export default TopMenuNav;

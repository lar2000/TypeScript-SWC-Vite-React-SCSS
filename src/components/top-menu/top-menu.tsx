import React, { useEffect } from 'react';
import TopMenuNav from './top-menu-nav';
import { slideToggle } from '../../composables/slideToggle';
import { slideUp } from '../../composables/slideUp';

function handleUnlimitedTopMenuRender(): void {
  function handlePageLoadMenuFocus(): void {
    const targetMenu = document.querySelector<HTMLElement>('.app-top-menu .menu');
    if (!targetMenu) return;

    const bodyStyle = window.getComputedStyle(document.body);
    const viewWidth =
      (document.querySelector('.app-top-menu') as HTMLElement)?.clientWidth || 0;

    let prevWidth = 0;
    let fullWidth = 0;
    // const controlPrevObj = targetMenu.querySelector<HTMLElement>('.menu-control-start');
    const controlNextObj = targetMenu.querySelector<HTMLElement>('.menu-control-end');
    const controlNextWidth = controlNextObj ? controlNextObj.clientWidth : 0;
    let controlWidth = 0;

    const elms = Array.from(
      document.querySelectorAll<HTMLElement>('.app-top-menu .menu > .menu-item')
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

    const elm = targetMenu.querySelector<HTMLElement>('.menu-control.menu-control-end');
    if (elm) {
      if (prevWidth !== fullWidth && fullWidth >= viewWidth) {
        elm.classList.add('show');
        controlWidth += controlNextWidth;
      } else {
        elm.classList.remove('show');
      }
    }

    const elm2 = targetMenu.querySelector<HTMLElement>('.menu-control.menu-control-start');
    if (elm2) {
      if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
        elm2.classList.add('show');
      } else {
        elm2.classList.remove('show');
      }
    }

    if (prevWidth >= viewWidth) {
      const finalScrollWidth = prevWidth - viewWidth + controlWidth;
      if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
        targetMenu.style.marginLeft = `-${finalScrollWidth}px`;
      } else {
        targetMenu.style.marginRight = `-${finalScrollWidth}px`;
      }
    }
  }

  function enableFluidContainerDrag(containerClassName: string): void {
    const container = document.querySelector<HTMLElement>(containerClassName);
    if (!container) return;

    const menu = container.querySelector<HTMLElement>('.menu');
    if (!menu) return;

    const menuItems = menu.querySelectorAll<HTMLElement>(
      '.menu-item:not(.menu-control)'
    );

    let startX = 0;
    let scrollLeft = 0;
    let mouseDown = false;
    let menuWidth = 0;
    let maxScroll = 0;

    menuItems.forEach((element) => {
      menuWidth += element.offsetWidth;
    });

    const startDrag = (pageX: number) => {
      mouseDown = true;
      startX = pageX;
      scrollLeft = menu.style.marginLeft ? parseInt(menu.style.marginLeft) : 0;
      maxScroll = container.offsetWidth - menuWidth;
    };

    container.addEventListener('mousedown', (e) => startDrag(e.pageX));
    container.addEventListener('touchstart', (e) =>
      startDrag(e.targetTouches[0].pageX)
    );

    const stopDrag = () => {
      mouseDown = false;
    };

    container.addEventListener('mouseup', stopDrag);
    container.addEventListener('touchend', stopDrag);

    const moveDrag = (pageX: number) => {
      if (!startX || !mouseDown) return;
      if (window.innerWidth < 768) return;

      const walkX = pageX - startX;
      let totalMarginLeft = scrollLeft + walkX;

      const endControl = menu.querySelector<HTMLElement>(
        '.menu-control.menu-control-end'
      );
      const startControl = menu.querySelector<HTMLElement>(
        '.menu-control.menu-control-start'
      );

      if (totalMarginLeft <= maxScroll) {
        totalMarginLeft = maxScroll;
        endControl?.classList.remove('show');
      } else {
        endControl?.classList.add('show');
      }

      if (menuWidth < container.offsetWidth) {
        startControl?.classList.remove('show');
      }
      if (maxScroll > 0) {
        endControl?.classList.remove('show');
      }
      if (totalMarginLeft > 0) {
        totalMarginLeft = 0;
        startControl?.classList.remove('show');
      } else {
        startControl?.classList.add('show');
      }

      menu.style.marginLeft = `${totalMarginLeft}px`;
    };

    container.addEventListener('mousemove', (e) => {
      e.preventDefault();
      moveDrag(e.pageX);
    });

    container.addEventListener('touchmove', (e) => {
      e.preventDefault();
      moveDrag(e.targetTouches[0].pageX);
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      document.querySelector<HTMLElement>('.app-top-menu')?.removeAttribute('style');
      document.querySelector<HTMLElement>('.app-top-menu .menu')?.removeAttribute('style');
      const submenus = document.querySelectorAll<HTMLElement>(
        '.app-top-menu .menu-submenu'
      );
      submenus.forEach((elm) => elm.removeAttribute('style'));
      handlePageLoadMenuFocus();
    }
    enableFluidContainerDrag('.app-top-menu');
  });

  if (window.innerWidth >= 768) {
    handlePageLoadMenuFocus();
    enableFluidContainerDrag('.app-top-menu');
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
            const parent = otherTarget.closest('.menu-item');
            parent?.classList.remove('expand');
            parent?.classList.add('closed');
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
  const menus = Array.from(
    document.querySelectorAll<HTMLElement>(menuLinkSelector)
  );
  handleTopMenuToggle(menus, true);

  const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
  const submenusLvl1 = Array.from(
    document.querySelectorAll<HTMLElement>(submenuLvl1Selector + ' > .menu-link')
  );
  handleTopMenuToggle(submenusLvl1);

  const submenuLvl2Selector =
    menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
  const submenusLvl2 = Array.from(
    document.querySelectorAll<HTMLElement>(submenuLvl2Selector + ' > .menu-link')
  );
  handleTopMenuToggle(submenusLvl2);
}

function TopMenu(): React.ReactElement {
  useEffect(() => {
    handleUnlimitedTopMenuRender();
    handleTopMenuSubMenu();
  }, []);

  return (
    <div id="top-nav" className="app-top-menu" data-bs-theme="dark">
      <TopMenuNav />
    </div>
  );
}

export default TopMenu;
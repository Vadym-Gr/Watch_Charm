export function initMenu() {
  const menu = document.querySelector('#navigation-menu');
  const opener = document.querySelector('.menu-open');
  const closer = menu?.querySelector('.menu-close');
  if (!menu || !opener || !closer) return;

  const desktop = window.matchMedia('(min-width: 1280px)');
  let scrollPosition = 0;
  let savedBodyStyles;

  function openMenu() {
    if (menu.open || desktop.matches) return;

    scrollPosition = window.scrollY;
    savedBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    Object.assign(document.body.style, {
      position: 'fixed',
      top: `-${scrollPosition}px`,
      width: '100%',
      overflow: 'hidden',
    });
    menu.showModal();
    menu.classList.add('is-open');
    menu.scrollTop = 0;
    opener.setAttribute('aria-expanded', 'true');
    closer.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!menu.open) return;
    menu.close();
    menu.classList.remove('is-open');
    opener.setAttribute('aria-expanded', 'false');
    Object.assign(document.body.style, savedBodyStyles);
    window.scrollTo(0, scrollPosition);
    const focusTarget = desktop.matches
      ? document.querySelector('.brand')
      : opener;
    focusTarget?.focus({ preventScroll: true });
  }

  opener.addEventListener('click', openMenu);
  closer.addEventListener('click', closeMenu);
  menu.addEventListener('cancel', event => {
    event.preventDefault();
    closeMenu();
  });

  let pointerStartedOutside = false;
  const isOutside = event => {
    const bounds = menu.getBoundingClientRect();
    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  };
  menu.addEventListener('pointerdown', event => {
    pointerStartedOutside = event.target === menu && isOutside(event);
  });
  menu.addEventListener('click', event => {
    if (pointerStartedOutside && event.target === menu && isOutside(event)) {
      closeMenu();
    }
    pointerStartedOutside = false;
    if (event.target.closest('.nav-link')) closeMenu();
  });

  menu.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...menu.querySelectorAll('button, a[href]')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  desktop.addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  document.querySelectorAll('[data-placeholder-link]').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
  });

  const navigationLinks = [...document.querySelectorAll('.nav-link')];
  function syncCurrentLink() {
    const hash = window.location.hash || '#home';
    const sectionExists = document.getElementById(hash.slice(1));
    const current = sectionExists ? hash : '#home';
    navigationLinks.forEach(link => {
      if (link.getAttribute('href') === current) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
  window.addEventListener('hashchange', syncCurrentLink);
  syncCurrentLink();
}

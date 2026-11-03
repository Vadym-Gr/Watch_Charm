export function initNavigation() {
  const links = [...document.querySelectorAll('.nav-link')];
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('#navigation-menu');
  const sections = [...new Set(links.map(link => link.getAttribute('href')))]
    .filter(hash => hash?.startsWith('#') && hash !== '#home')
    .map(hash => ({ hash, element: document.getElementById(hash.slice(1)) }))
    .filter(section => section.element);
  let current = null;
  let scheduled = false;

  function updateCurrent() {
    scheduled = false;
    if (menu?.open) return;

    const marker = (header?.getBoundingClientRect().bottom ?? 0) + 1;
    let active = '#home';
    sections.forEach(section => {
      if (section.element.getBoundingClientRect().top <= marker) {
        active = section.hash;
      }
    });
    const atBottom =
      window.scrollY > 0 &&
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1;
    if (atBottom && sections.length) active = sections.at(-1).hash;
    if (active === current) return;

    current = active;
    links.forEach(link => {
      if (link.getAttribute('href') === active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateCurrent);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  menu?.addEventListener('close', scheduleUpdate);
  const observer = new ResizeObserver(scheduleUpdate);
  document.querySelectorAll('.site-header, main .section').forEach(element => {
    observer.observe(element);
  });
  updateCurrent();
}

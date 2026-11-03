export function initCatalog() {
  const section = document.querySelector('#catalog');
  if (!section) return;

  const browser = section.querySelector('.catalog-browser');
  const cards = [...section.querySelectorAll('[data-product-card]')];
  const previous = section.querySelector('.catalog-previous');
  const next = section.querySelector('.catalog-next');
  const more = section.querySelector('.catalog-more');
  const less = section.querySelector('.catalog-less');
  const mobile = window.matchMedia('(max-width: 767px)');
  let start = 0;
  let expanded = false;

  const visibleCount = () =>
    mobile.matches && !expanded ? Math.min(4, cards.length) : cards.length;

  function render() {
    const count = visibleCount();
    start = Math.max(0, Math.min(start, cards.length - count));

    cards.forEach((card, index) => {
      card.hidden = index < start || index >= start + count;
    });
    previous.disabled = start === 0;
    next.disabled = start + count >= cards.length;
    more.hidden = !mobile.matches || expanded || cards.length <= 4;
    less.hidden = !mobile.matches || !expanded || cards.length <= 4;
    more.setAttribute('aria-expanded', String(expanded));
    less.setAttribute('aria-expanded', String(expanded));
    section.querySelector('[data-catalog-start]').textContent = cards.length
      ? start + 1
      : 0;
    section.querySelector('[data-catalog-end]').textContent = start + count;
    section.querySelector('[data-catalog-total]').textContent = cards.length;
  }

  function move(direction) {
    start += direction * visibleCount();
    render();
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  browser.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  more.addEventListener('click', () => {
    const firstRevealed = cards.find(card => card.hidden);
    expanded = true;
    start = 0;
    render();
    const article = firstRevealed?.querySelector('article');
    article?.focus({ preventScroll: true });
    article?.scrollIntoView({ block: 'nearest' });
  });

  less.addEventListener('click', () => {
    expanded = false;
    start = 0;
    render();
    more.focus();
  });

  mobile.addEventListener('change', render);
  render();
  previous.hidden = false;
  next.hidden = false;
}

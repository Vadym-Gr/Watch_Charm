export function initReviews() {
  const section = document.querySelector('#reviews');
  if (!section) return;

  const browser = section.querySelector('.reviews-browser');
  const list = section.querySelector('.reviews-list');
  const cards = [...section.querySelectorAll('[data-review-card]')];
  const previous = section.querySelector('.reviews-previous');
  const next = section.querySelector('.reviews-next');
  const tablet = window.matchMedia('(min-width: 768px)');
  const desktop = window.matchMedia('(min-width: 1280px)');
  let start = 0;

  const visibleCount = () =>
    Math.min(desktop.matches ? 3 : tablet.matches ? 2 : 1, cards.length);

  function render() {
    const count = visibleCount();
    start = Math.max(0, Math.min(start, cards.length - count));
    cards.forEach((card, index) => {
      card.hidden = index < start || index >= start + count;
    });
    previous.disabled = start === 0;
    next.disabled = start + count >= cards.length;
    section.querySelector('[data-reviews-start]').textContent = cards.length
      ? start + 1
      : 0;
    section.querySelector('[data-reviews-end]').textContent = start + count;
    section.querySelector('[data-reviews-total]').textContent = cards.length;
  }

  function move(direction) {
    start += direction;
    render();
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  browser.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  let gesture = null;
  const cancelGesture = () => {
    gesture = null;
  };
  list.addEventListener('pointerdown', event => {
    if (desktop.matches || event.pointerType === 'mouse') return;
    if (!event.isPrimary) {
      cancelGesture();
      return;
    }
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    list.setPointerCapture(event.pointerId);
  });
  list.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    cancelGesture();
    if (
      !desktop.matches &&
      Math.abs(dx) >= 40 &&
      Math.abs(dx) > Math.abs(dy) * 1.5
    ) {
      move(dx < 0 ? 1 : -1);
    }
  });
  list.addEventListener('pointercancel', cancelGesture);
  list.addEventListener('lostpointercapture', cancelGesture);
  tablet.addEventListener('change', cancelGesture);
  desktop.addEventListener('change', cancelGesture);
  tablet.addEventListener('change', render);
  desktop.addEventListener('change', render);
  render();
  previous.hidden = false;
  next.hidden = false;
  section.querySelector('[data-reviews-status]').hidden = false;
}

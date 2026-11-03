export function initSaleGallery() {
  const gallery = document.querySelector('[data-sale-gallery]');
  if (!gallery) return;

  const main = gallery.querySelector('.sale-main');
  const original = main?.querySelector('picture');
  if (!original) return;

  const buttons = [...gallery.querySelectorAll('[data-sale-thumbnail]')];
  const photos = buttons.map(button =>
    [...gallery.querySelectorAll('[data-sale-view]')]
      .find(item => item.dataset.saleView === button.dataset.saleThumbnail)
      ?.content.querySelector('picture')
  );
  if (photos.some(photo => !photo)) return;

  const photoNumber = gallery.querySelector('[data-sale-photo-number]');
  const help = gallery.querySelector('#sale-gallery-help');
  const originalIndex = buttons.findIndex(
    button => button.dataset.saleThumbnail === 'main'
  );
  if (originalIndex < 0) return;
  let activeIndex = originalIndex;
  let firstVisible = 0;
  const visibleCount = 4;
  const swipeViewport = window.matchMedia('(max-width: 1279px)');

  const renderThumbnails = () => {
    buttons.forEach((button, index) => {
      button.closest('li').hidden =
        index < firstVisible || index >= firstVisible + visibleCount;
      button.setAttribute('aria-pressed', String(index === activeIndex));
    });
  };

  const selectPhoto = index => {
    const focusedThumbnail = buttons.includes(document.activeElement);
    activeIndex = index;
    if (index < firstVisible) firstVisible = index;
    if (index >= firstVisible + visibleCount) {
      firstVisible = index - visibleCount + 1;
    }
    main.replaceChildren(photos[index].cloneNode(true));
    renderThumbnails();
    if (focusedThumbnail && document.activeElement.closest('li')?.hidden) {
      buttons[index].focus({ preventScroll: true });
    }
    if (photoNumber)
      photoNumber.textContent = buttons[index].dataset.photoNumber;
  };

  const step = direction => {
    selectPhoto((activeIndex + direction + buttons.length) % buttons.length);
  };

  if (help) {
    help.hidden = false;
    gallery.setAttribute('aria-describedby', help.id);
  }

  gallery.classList.add('sale-gallery-ready');
  renderThumbnails();
  buttons.forEach((button, index) => {
    button.disabled = false;
    button.addEventListener('click', () => {
      selectPhoto(activeIndex === index ? originalIndex : index);
    });
  });

  for (const [selector, direction] of [
    ['[data-sale-previous]', -1],
    ['[data-sale-next]', 1],
  ]) {
    const arrow = gallery.querySelector(selector);
    if (!arrow) continue;
    arrow.hidden = false;
    arrow.addEventListener('click', () => step(direction));
  }

  let gesture = null;
  main.addEventListener('pointerdown', event => {
    if (!swipeViewport.matches || event.pointerType === 'mouse') return;
    if (!event.isPrimary) {
      gesture = null;
      return;
    }
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    main.setPointerCapture(event.pointerId);
  });
  main.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (
      swipeViewport.matches &&
      Math.abs(dx) >= 40 &&
      Math.abs(dx) > Math.abs(dy) * 1.5
    ) {
      step(dx < 0 ? 1 : -1);
    }
  });
  const cancelGesture = () => {
    gesture = null;
  };
  main.addEventListener('pointercancel', cancelGesture);
  main.addEventListener('lostpointercapture', cancelGesture);
  swipeViewport.addEventListener('change', cancelGesture);
}

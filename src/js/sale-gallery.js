export function initSaleGallery() {
  const gallery = document.querySelector('[data-sale-gallery]');
  if (!gallery) return;

  const main = gallery.querySelector('.sale-main');
  const original = main?.querySelector('picture');
  if (!original) return;

  const originalPhoto = original.cloneNode(true);
  const buttons = [...gallery.querySelectorAll('[data-sale-thumbnail]')];
  const photoNumber = gallery.querySelector('[data-sale-photo-number]');
  const help = gallery.querySelector('#sale-gallery-help');
  let activeView = null;

  if (help) {
    help.hidden = false;
    gallery.setAttribute('aria-describedby', help.id);
  }

  buttons.forEach(button => {
    const view = button.dataset.saleThumbnail;
    const template = [...gallery.querySelectorAll('[data-sale-view]')].find(
      item => item.dataset.saleView === view
    );
    const photo = template?.content.querySelector('picture');
    if (!photo) return;

    button.disabled = false;
    button.addEventListener('click', () => {
      const reset = activeView === view;
      activeView = reset ? null : view;
      main.replaceChildren((reset ? originalPhoto : photo).cloneNode(true));
      buttons.forEach(item => {
        item.setAttribute(
          'aria-pressed',
          String(item.dataset.saleThumbnail === activeView)
        );
      });
      if (photoNumber) {
        photoNumber.textContent = reset ? '1' : button.dataset.photoNumber;
      }
    });
  });
}

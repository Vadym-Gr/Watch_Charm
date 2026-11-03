export function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const updateHeight = () => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${header.getBoundingClientRect().height}px`
    );
  };

  updateHeight();
  const observer = new ResizeObserver(updateHeight);
  observer.observe(header);
}

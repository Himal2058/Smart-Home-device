const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('main').forEach((main, index) => {
  if (!main.id) main.id = `main-content-${index + 1}`;
  if (!document.querySelector(`.skip-link[href="#${main.id}"]`)) {
    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = `#${main.id}`;
    skip.textContent = 'Skip to content';
    document.querySelector('header')?.before(skip);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
}));

document.querySelectorAll('.mobile-nav-toggle').forEach((button) => {
  const nav = document.getElementById(button.getAttribute('aria-controls'));
  if (!nav) return;
  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    nav.classList.toggle('is-open', open);
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
});

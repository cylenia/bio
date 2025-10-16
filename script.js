const buttons = Array.from(document.querySelectorAll('.navbar button'));
const sections = Array.from(document.querySelectorAll('main section'));

if (buttons.length === 0 || sections.length === 0) {
  // nothing to do
} else {
  function activateButton(btn) {
    sections.forEach(sec => sec.setAttribute('data-active', 'false'));
    const target = document.getElementById(btn.dataset.section);
    if (target) target.setAttribute('data-active', 'true');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => activateButton(btn));
  });

  // set first button and section to active by default
  activateButton(buttons[0]);

  // keyboard shortcuts: 1-4 (top row and numpad)
  document.addEventListener('keydown', (e) => {
    const target = e.target;
    const tag = target && target.tagName;
    const isEditable = target && (target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT');
    if (isEditable) return;

    const key = e.key;
    if (['1','2','3','4'].includes(key)) {
      const idx = Number(key) - 1;
      const btn = buttons[idx];
      if (btn) {
        e.preventDefault();
        activateButton(btn);
      }
    }
  });
}

// Equalize link widths in the Links section on desktop so all buttons match the widest one.
function equalizeLinkWidths() {
  const links = Array.from(document.querySelectorAll('#links a'));
  if (links.length === 0) return;

  // Reset any previously set inline widths to measure natural sizes
  links.forEach(a => a.style.width = '');

  const isDesktop = window.matchMedia('(min-width: 601px)').matches;
  if (!isDesktop) {
    // mobile: let CSS make them full-width
    links.forEach(a => a.style.width = '');
    return;
  }

  // measure widest
  let max = 0;
  links.forEach(a => {
    const rect = a.getBoundingClientRect();
    // include borders in calculation
    const style = getComputedStyle(a);
    const borderLeft = parseFloat(style.borderLeftWidth) || 0;
    const borderRight = parseFloat(style.borderRightWidth) || 0;
    const total = rect.width + borderLeft + borderRight;
    if (total > max) max = total;
  });

  // set explicit width (px) so items in different columns match
  links.forEach(a => a.style.width = Math.ceil(max) + 'px');
}

window.addEventListener('load', equalizeLinkWidths);
window.addEventListener('resize', () => {
  // debounce
  clearTimeout(window.__equalizeTimeout);
  window.__equalizeTimeout = setTimeout(equalizeLinkWidths, 100);
});

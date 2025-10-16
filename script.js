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

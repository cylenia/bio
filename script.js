const buttons = document.querySelectorAll('.navbar button');
const sections = document.querySelectorAll('main section');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    sections.forEach(sec => sec.setAttribute('data-active', 'false'));
    document.getElementById(btn.dataset.section).setAttribute('data-active', 'true');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// set first button to active so it is highlighted by default
buttons[0].classList.add('active');

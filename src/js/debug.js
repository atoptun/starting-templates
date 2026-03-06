if (import.meta.env.DEV) {
  import('./../scss/utils/_debug.scss');

  window.addEventListener('keydown', e => {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
      // Ctrl + Alt + D -- turn on debug mode
      document.body.classList.toggle('debug-mode');
    }
  });
}

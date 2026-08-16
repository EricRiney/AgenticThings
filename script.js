// Small interactivity: navigation toggle, theme toggle, and contact form handling
document.addEventListener('DOMContentLoaded', function(){
  // set year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if(navToggle && navList){
    navToggle.addEventListener('click', function(){
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    // close nav when clicking a link
    navList.addEventListener('click', function(e){
      if(e.target.tagName === 'A'){
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // accessible theme switcher: toggles light/dark, persists selection, and updates label
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme, persist) {
    // theme should be 'light' or 'dark'
    root.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem('theme', theme);
    updateThemeToggleLabel(theme);
  }

  function updateThemeToggleLabel(currentTheme) {
    if (!themeToggle) return;
    const next = currentTheme === 'light' ? 'dark' : 'light';
    themeToggle.textContent = `Switch to ${next} theme`;
    themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
    // aria-pressed indicates whether the control is in the "on" state (we consider dark mode as "on")
    themeToggle.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');
  }

  // Determine initial theme: prefer stored, else follow system preference
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme, false);

  if (themeToggle) {
    // Ensure button has role and initial aria state
    themeToggle.setAttribute('role', 'button');
    themeToggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next, true);
    });

    // allow keyboard toggle with Space/Enter on focused button (button elements handle this by default, but keep for robustness)
    themeToggle.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }

  // contact form
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(!name || !email || !message){
        if(status) status.textContent = 'Please fill out all fields.';
        return;
      }

      // Simulate sending
      if(status) status.textContent = 'Sending…';
      setTimeout(function(){
        if(status) status.textContent = 'Thanks — message sent! I will reply soon.';
        form.reset();
      }, 800);
    });
  }
});


(function () {
  // ===== DOM ELEMENTS =====
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  const contactForm = document.getElementById('contactForm');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // ===== THEME MANAGEMENT =====
  let currentTheme = localStorage.getItem('edumanage-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  body.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('edumanage-theme', currentTheme);
    updateThemeIcon();
    showToast(`${currentTheme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated`);
  }

  function updateThemeIcon() {
    themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  themeToggle.addEventListener('click', toggleTheme);

  // ===== MOBILE MENU =====
  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    mobileBtn.innerHTML = navMenu.classList.contains('show')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        navMenu.classList.remove('show');
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // ===== MODAL =====
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // ===== TOAST =====
  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ===== FORM SUBMISSION =====
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent! We\'ll reply soon.');
      contactForm.reset();
    });
  }

  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Login demo — no actual authentication');
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // ===== SMOOTH SCROLL + ACTIVE LINK =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) link.classList.add('active');
    });
  });

  // ===== SYSTEM PREFERENCE CHANGE =====
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('edumanage-theme')) {
      currentTheme = e.matches ? 'dark' : 'light';
      body.setAttribute('data-theme', currentTheme);
      updateThemeIcon();
    }
  });

  // ===== KEYBOARD SHORTCUT (Alt+T) =====
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      toggleTheme();
    }
  });
})();

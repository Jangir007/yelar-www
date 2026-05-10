/* ═══════════════════════════════════════════
   YELAR NEWS — SCRIPT
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Live date in top bar ── */
  const dateEl = document.getElementById('live-date');
  if (dateEl) {
    const updateDate = () => {
      const now = new Date();
      const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('ru-RU', opts);
    };
    updateDate();
    setInterval(updateDate, 60_000);
  }

  /* ── 2. Weather widget updated time ── */
  const weatherTimeEl = document.getElementById('weather-time');
  if (weatherTimeEl) {
    const updateWeatherTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      weatherTimeEl.textContent = `${h}:${m}`;
    };
    updateWeatherTime();
    setInterval(updateWeatherTime, 60_000);
  }

  /* ── 3. Burger / mobile menu toggle ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.textContent = open ? '✕' : '☰';
      burger.setAttribute('aria-expanded', String(open));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        burger.textContent = '☰';
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 4. Sticky nav shadow on scroll ── */
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,.55)';
      } else {
        nav.style.boxShadow = '0 2px 12px rgba(0,0,0,.4)';
      }
    }, { passive: true });
  }

  /* ── 5. Active nav highlight on click ── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ── 6. Weather card hover tooltip ── */
  document.querySelectorAll('.weather-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'background 0.28s, transform 0.28s, border-color 0.28s';
    });
  });

  /* ── 7. Animate elements into view on scroll ── */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Cards stagger animation
  const animatedEls = document.querySelectorAll('.news-card, .weather-card');
  animatedEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ${i * 0.07}s ease, transform 0.5s ${i * 0.07}s ease`;
    observer.observe(el);
  });

  /* ── 8. Breaking news ticker on top bar ── */
  const headlines = [
    'Новый вирус на лайнере! Лайнер сел на Тенерифе!',
    'Трамп снова танцует свой танец',
    'Война Иран и США окончена',
    'Токаев и Нетаньяху совершили сделку',
    'Контракт Сатпаев и Челси ВСЕ!',
  ];

  const breakingText = document.querySelector('.breaking-text');
  if (breakingText) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % headlines.length;
      breakingText.style.opacity = '0';
      setTimeout(() => {
        breakingText.textContent = headlines[idx];
        breakingText.style.opacity = '';
      }, 350);
    }, 6000);

    breakingText.style.transition = 'opacity 0.35s ease';
  }

  /* ── 9. Header temp cycle (simulated) ── */
  const headerTemp = document.getElementById('header-temp');
  const weatherData = [
    { temp: '+18°C', icon: '⛅' },
    { temp: '+19°C', icon: '🌤️' },
    { temp: '+17°C', icon: '🌦️' },
  ];
  if (headerTemp) {
    let wi = 0;
    setInterval(() => {
      wi = (wi + 1) % weatherData.length;
      headerTemp.style.opacity = '0';
      setTimeout(() => {
        headerTemp.textContent = `${weatherData[wi].temp} ${weatherData[wi].icon}`;
        headerTemp.style.opacity = '1';
      }, 300);
    }, 8000);
    headerTemp.style.transition = 'opacity 0.3s ease';
  }

});
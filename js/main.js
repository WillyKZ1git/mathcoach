/* ============================================================
   MathCoach — Script principal
   ============================================================ */
(function () {
  'use strict';

  /* ── NAVBAR : ombre au scroll + menu mobile ─────────── */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  /* ── HERO STATS : animation compteur ────────────────── */
  function animateCounter(el) {
    var target  = el.textContent.trim();
    var isPlus  = target.endsWith('+');
    var isPct   = target.endsWith('%');
    var num     = parseInt(target.replace(/[^0-9]/g, ''), 10);
    var suffix  = isPlus ? '+' : isPct ? '%' : '';
    var duration = 1400;
    var start   = performance.now();

    function update(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var current  = Math.round(eased * num);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  var statNumbers  = document.querySelectorAll('.stat-number');
  var statsAnimated = false;
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(animateCounter);
      }
    });
  }, { threshold: 0.5 });

  var statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) statsObserver.observe(statsStrip);

  /* ── SCROLL REVEAL ──────────────────────────────────── */
  var revealSelectors = [
    '.feature-card', '.level-card', '.step-card',
    '.testimonial-card', '.section-header',
    '.offer-card', '.plus-cta'
  ];

  revealSelectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add('reveal');
      var delay = Math.min(i, 4) + 1;
      el.classList.add('reveal-delay-' + delay);
    });
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── SMOOTH SCROLL ──────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navHeight = navbar ? navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── HERO CARDS : animation barre de progression ────── */
  window.addEventListener('load', function () {
    var progressBar = document.querySelector('.card-1 .progress-bar');
    if (progressBar) {
      var targetWidth = progressBar.style.width;
      progressBar.style.width = '0%';
      setTimeout(function () { progressBar.style.width = targetWidth; }, 600);
    }

    // Mini chart bars
    var bars = document.querySelectorAll('.mini-chart .bar');
    bars.forEach(function (bar, i) {
      var targetHeight = bar.style.height;
      bar.style.height = '0%';
      setTimeout(function () {
        bar.style.transition = 'height 0.6s ease';
        bar.style.height = targetHeight;
      }, 800 + i * 80);
    });
  });

})();

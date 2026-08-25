/* =========================================================
   A. Hernandez Junk Removal — site interactions
   Vanilla JS, no dependencies, no external requests.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('primaryNav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) closeNav();
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');
  var ticking = false;

  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    var start = null;
    var duration = 1100;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  if (counters.length && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- Quote form validation (client-side only) ---------- */
  var form = document.getElementById('quoteForm');
  var success = document.getElementById('formSuccess');

  function setError(field, message) {
    var msg = form.querySelector('.err[data-for="' + field.id + '"]');
    if (msg) msg.textContent = message || '';
    field.classList.toggle('invalid', !!message);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  }

  function validateField(field) {
    var value = (field.value || '').trim();

    if (!value) {
      setError(field, 'This field is required.');
      return false;
    }
    if (field.id === 'qphone') {
      var digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        setError(field, 'Please enter a valid 10-digit phone number.');
        return false;
      }
    }
    if (field.id === 'qname' && value.length < 2) {
      setError(field, 'Please enter your name.');
      return false;
    }
    setError(field, '');
    return true;
  }

  if (form) {
    var required = Array.prototype.slice.call(
      form.querySelectorAll('input[required], select[required]')
    );

    required.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      var ok = true;

      required.forEach(function (field) {
        if (!validateField(field)) {
          ok = false;
          if (!firstBad) firstBad = field;
        }
      });

      if (!ok) {
        if (success) success.hidden = true;
        if (firstBad) firstBad.focus();
        return;
      }

      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      required.forEach(function (field) { setError(field, ''); });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

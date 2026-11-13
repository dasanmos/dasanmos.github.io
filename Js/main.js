(function () {
  'use strict';

  // Año del footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menú móvil
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Carrusel del hero
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsBox = document.getElementById('dots');
  var current = 0, timer = null;

  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
    b.addEventListener('click', function () { go(i); restart(); });
    dotsBox.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsBox.children);

  function go(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    dots.forEach(function (d, i) { d.classList.toggle('on', i === current); });
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(function () { go(current + 1); }, 6000);
  }
  document.getElementById('prev').addEventListener('click', function () { go(current - 1); restart(); });
  document.getElementById('next').addEventListener('click', function () { go(current + 1); restart(); });

  var hero = document.querySelector('.hero');
  hero.addEventListener('mouseenter', function () { clearInterval(timer); });
  hero.addEventListener('mouseleave', restart);

  // Swipe en móvil
  var x0 = null;
  hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { go(current + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  });

  go(0);
  restart();

  // Aparición al hacer scroll
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Contadores de Serena
  function count(el) {
    var target = parseInt(el.getAttribute('data-n'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    if (reduce || target === 0) { el.textContent = prefix + target; return; }
    var start = null, dur = 1100;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = prefix + Math.round(target * p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statsEl = document.querySelector('.stats');
  if (statsEl && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        statsEl.querySelectorAll('b').forEach(count);
        so.disconnect();
      }
    }, { threshold: 0.4 });
    so.observe(statsEl);
  } else if (statsEl) {
    statsEl.querySelectorAll('b').forEach(count);
  }

  // Formulario: abre un issue prellenado en GitHub (sin servidor, sin exponer correos)
  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var nombre = document.getElementById('f-nombre').value.trim();
    var correo = document.getElementById('f-correo').value.trim();
    var msg = document.getElementById('f-msg').value.trim();
    var hint = document.getElementById('hint');
    if (!nombre || !correo || !msg) {
      hint.textContent = 'Completa los tres campos para continuar.';
      return;
    }
    var title = 'Contacto desde el sitio: ' + nombre;
    var body = msg + '\n\n---\nNombre: ' + nombre + '\nCorreo: ' + correo;
    var url = 'https://github.com/dasanmos/serena/issues/new?title=' +
      encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
    window.open(url, '_blank', 'noopener');
    hint.textContent = 'Se abrió GitHub con tu mensaje listo. Pulsa «Submit new issue» para enviarlo.';
  });
})();

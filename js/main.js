(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Año del footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Sombra de la barra al hacer scroll
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
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
  }

  // Carrusel del hero
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsBox = document.getElementById('dots');
  if (slides.length && dotsBox) {
    var current = 0, timer = null;
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsBox.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsBox.children);
    var go = function (n) {
      current = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === current); });
    };
    var restart = function () {
      clearInterval(timer);
      if (!reduce) timer = setInterval(function () { go(current + 1); }, 6500);
    };
    var prev = document.getElementById('prev'), next = document.getElementById('next');
    if (prev) prev.addEventListener('click', function () { go(current - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(current + 1); restart(); });
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', function () { clearInterval(timer); });
      hero.addEventListener('mouseleave', restart);
      var x0 = null;
      hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      hero.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 50) { go(current + (dx < 0 ? 1 : -1)); restart(); }
        x0 = null;
      });
    }
    go(0);
    restart();
  }

  // Aparición al hacer scroll (también activa las barras de los gráficos)
  var revealEls = document.querySelectorAll('.reveal, .chartbox');
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

  // Contadores animados
  function count(el) {
    var target = parseInt(el.getAttribute('data-n'), 10);
    if (reduce || !target) { el.textContent = target; return; }
    var start = null, dur = 1200;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var strip = document.querySelector('.strip, .pstats');
  var nums = document.querySelectorAll('[data-n]');
  if (nums.length) {
    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.querySelectorAll('[data-n]').forEach(count);
            so.unobserve(en.target);
          }
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('.strip, .pstats').forEach(function (c) { so.observe(c); });
    } else {
      nums.forEach(count);
    }
  }

  // Formulario: llega por correo (FormSubmit) y abre WhatsApp con el mensaje listo
  var form = document.getElementById('form');
  if (form) {
    var EMAIL = form.getAttribute('data-email');
    var WA = form.getAttribute('data-wa');
    var status = document.getElementById('status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = document.getElementById('f-nombre').value.trim();
      var correo = document.getElementById('f-correo').value.trim();
      var msg = document.getElementById('f-msg').value.trim();
      var honey = document.getElementById('f-honey').value;
      status.className = 'status';
      if (honey) return;
      if (!nombre || !correo || !msg || correo.indexOf('@') < 1) {
        status.className = 'status err';
        status.textContent = 'Completa tu nombre, un correo válido y el mensaje.';
        return;
      }
      var texto = 'Hola David, soy ' + nombre + '. ' + msg + ' (Mi correo: ' + correo + ')';
      try { if (navigator.clipboard) navigator.clipboard.writeText(texto); } catch (err) {}
      // WhatsApp se abre dentro del gesto del usuario para que el navegador no lo bloquee
      window.open(WA + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
      status.textContent = 'Enviando por correo…';
      fetch('https://formsubmit.co/ajax/' + EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: nombre, email: correo, message: msg,
          _subject: 'Mensaje nuevo desde tu sitio web', _template: 'table'
        })
      }).then(function (r) { return r.json(); }).then(function (d) {
        if (d && (d.success === 'true' || d.success === true)) {
          status.textContent = '¡Listo! Tu mensaje llegó por correo. En WhatsApp pulsa enviar para completar.';
          form.reset();
        } else {
          throw new Error('fallo');
        }
      }).catch(function () {
        status.className = 'status err';
        status.textContent = 'No pude enviar el correo. Escríbeme directo a ' + EMAIL + ' o por WhatsApp.';
      });
    });
  }
})();

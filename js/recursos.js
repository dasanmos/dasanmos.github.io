(function () {
  'use strict';
  var MATERIAS = [
    { n: 'Matemáticas', e: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="6" r="1" /> <line x1="5" x2="19" y1="12" y2="12" /> <circle cx="12" cy="18" r="1" /></svg>', c: 'var(--coral)', t: 'Álgebra, funciones y razonamiento lógico.' },
    { n: 'Geometría', e: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" /> <path d="m14.5 12.5 2-2" /> <path d="m11.5 9.5 2-2" /> <path d="m8.5 6.5 2-2" /> <path d="m17.5 15.5 2-2" /></svg>', c: 'var(--sky)', t: 'Figuras, ángulos y demostraciones.' },
    { n: 'Economía y Política', e: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 18v-7" /> <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" /> <path d="M14 18v-7" /> <path d="M18 18v-7" /> <path d="M3 22h18" /> <path d="M6 18v-7" /></svg>', c: 'var(--gold)', t: 'Cómo funcionan el dinero, el Estado y la ciudadanía.' },
    { n: 'Tecnología e Informática', e: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z" /> <path d="M20.054 15.987H3.946" /></svg>', c: 'var(--violet)', t: 'Programación, ofimática y pensamiento computacional.' }
  ];
  var data = window.RECURSOS || [];
  var grid = document.getElementById('grid');
  var filters = document.getElementById('filters');
  var sel = 'Todas';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function meta(n) { return MATERIAS.filter(function (m) { return m.n === n; })[0] || MATERIAS[0]; }

  function render() {
    var html = '';
    var visibles = MATERIAS.filter(function (m) { return sel === 'Todas' || m.n === sel; });
    visibles.forEach(function (m) {
      var items = data.filter(function (r) { return r.materia === m.n; });
      if (!items.length) {
        html += '<article class="card soon" style="--c:' + m.c + '"><div class="ico">' + m.e + '</div>' +
          '<h3>' + esc(m.n) + '</h3><p>' + esc(m.t) + '</p><span class="more">Próximamente</span></article>';
      }
      items.forEach(function (r) {
        var mm = meta(r.materia);
        var href = /^(https?:\/\/|recursos\/)/.test(r.url || '') ? r.url : '#';
        html += '<article class="card" style="--c:' + mm.c + '"><div class="ico">' + mm.e + '</div>' +
          '<h3>' + esc(r.titulo) + '</h3><p>' + esc(r.descripcion) + '</p>' +
          '<div class="stack"><span>' + esc(r.materia) + '</span><span>' + esc(r.tipo) + '</span></div>' +
          '<a class="more" href="' + esc(href) + '" target="_blank" rel="noopener">Abrir recurso →</a></article>';
      });
    });
    grid.innerHTML = html;
  }

  var opciones = ['Todas'].concat(MATERIAS.map(function (m) { return m.n; }));
  opciones.forEach(function (o) {
    var b = document.createElement('button');
    b.textContent = o;
    if (o === sel) b.className = 'on';
    b.addEventListener('click', function () {
      sel = o;
      Array.prototype.forEach.call(filters.children, function (x) { x.className = x === b ? 'on' : ''; });
      render();
    });
    filters.appendChild(b);
  });
  render();
})();

(function () {
  'use strict';
  var MATERIAS = [
    { n: 'Matemáticas', e: '➗', c: 'var(--coral)', t: 'Álgebra, funciones y razonamiento lógico.' },
    { n: 'Geometría', e: '📐', c: 'var(--sky)', t: 'Figuras, ángulos y demostraciones.' },
    { n: 'Economía y Política', e: '🏛️', c: 'var(--gold)', t: 'Cómo funcionan el dinero, el Estado y la ciudadanía.' },
    { n: 'Tecnología e Informática', e: '💻', c: 'var(--violet)', t: 'Programación, ofimática y pensamiento computacional.' }
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

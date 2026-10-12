(function () {
  var menu = document.getElementById('menu'), btn = document.getElementById('btnMenu');
  btn.addEventListener('click', function () {
    var abierto = menu.classList.toggle('abierto');
    btn.setAttribute('aria-expanded', abierto);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') menu.classList.remove('abierto');
  });

  // resaltar la sección activa en el menú
  var links = {};
  menu.querySelectorAll('a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove('activo'); });
        if (links[e.target.id]) links[e.target.id].classList.add('activo');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }

  // visor de imágenes
  var visor = document.getElementById('visor'), vi = visor.querySelector('img');
  document.querySelectorAll('figure img').forEach(function (im) {
    im.addEventListener('click', function () {
      vi.src = im.dataset.full || im.src; vi.alt = im.alt; visor.classList.add('abierto');
    });
  });
  visor.addEventListener('click', function () { visor.classList.remove('abierto'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') visor.classList.remove('abierto');
  });

  // impresión / PDF: cargar todas las imágenes y volcar el código completo
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('img[loading="lazy"]').forEach(function (im) { im.loading = 'eager'; });
    var cp = document.getElementById('codigoPrint'), ta = document.getElementById('codigo');
    if (cp && ta) cp.textContent = ta.value;
  });

  // editor de código: copiar, pegar, descargar, restaurar
  var area = document.getElementById('codigo'), estado = document.getElementById('estado');
  var original = area.value;
  function aviso(t) { estado.textContent = t; setTimeout(function () { estado.textContent = ''; }, 2500); }
  function copiarFallback() { area.select(); try { document.execCommand('copy'); aviso('Código copiado'); } catch (e) { aviso('Selecciona y copia manualmente'); } }

  document.getElementById('copiar').addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(area.value).then(function () { aviso('Código copiado'); }, copiarFallback);
    } else copiarFallback();
  });
  document.getElementById('pegar').addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) { area.value = t; aviso('Texto pegado'); },
        function () { area.focus(); aviso('Permiso denegado: usa Ctrl+V / pegar del teclado'); });
    } else { area.focus(); aviso('Usa Ctrl+V / pegar del teclado'); }
  });
  document.getElementById('descargar').addEventListener('click', function () {
    var blob = new Blob([area.value], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'programa-sumo.ino';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    aviso('Descargando programa-sumo.ino');
  });
  document.getElementById('restaurar').addEventListener('click', function () { area.value = original; aviso('Código original restaurado'); });
})();

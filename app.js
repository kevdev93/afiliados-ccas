// Presentación del 17° Encuentro Red de Afiliados 2026.
// Navegación y arranque; el movimiento está en camara.js y el contenido en escenas.js, discurso.js y datos.js.
// Hay dos presentaciones en el mismo mundo: los homenajes y el discurso de la presidenta.
// Se pasa de una a otra con la tecla D o el botón de la esquina; siempre se llega a la portada.
(() => {
  'use strict';

  const ANCHO = 1920, ALTO = 1080;
  const SEPARACION = 20000;   // Distancia entre la zona de homenajes y la del discurso.
  const $ = (s) => document.querySelector(s);
  const lienzo = $('#lienzo');

  const listas = { homenajes: [], discurso: [] };
  let modo = 'homenajes';
  let actual = -1;

  function ajustarEscala() {
    const escala = Math.min(innerWidth / ANCHO, innerHeight / ALTO);
    lienzo.style.transform = `translate(-50%, -50%) scale(${escala})`;
    $('#marcas').style.transform = lienzo.style.transform;
  }

  function ir(indice, directo) {
    const lista = listas[modo];
    if (indice < 0 || indice >= lista.length || indice === actual) return;
    actual = indice;
    const e = lista[indice];
    CAMARA.ir(e, directo);
    if (!directo) SONIDO.cambio();
    document.body.classList.toggle('fondo-claro', !!e.claro);
    history.replaceState(null, '', '#' + e.id);
    $('#ayuda-paso').textContent = `${modo === 'discurso' ? 'Discurso' : 'Homenajes'} · escena ${indice + 1} de ${lista.length} · ${e.id}`;
  }

  // Cambia de presentación; sin un índice, empieza en su portada.
  function cambiarModo(nuevo, indice = 0, directo = false) {
    if (nuevo !== modo) {
      modo = nuevo;
      actual = -1;
      SONIDO.modo(modo === 'discurso');
      $('#cambiar').textContent = modo === 'discurso' ? 'Ir a homenajes' : 'Ir al discurso';
    }
    ir(indice, directo);
  }

  function capitulo(c) {
    const i = listas.homenajes.findIndex((e) => e.capitulo === c);
    if (i >= 0) cambiarModo('homenajes', i);
  }

  function pantallaCompleta() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    SONIDO.despertar();
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'].includes(k)) { e.preventDefault(); ir(actual + 1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); ir(actual - 1); }
    else if (k === 'f' || k === 'F') pantallaCompleta();
    else if (k === 'b' || k === 'B' || k === '.') $('#negro').classList.toggle('activo');
    else if (k === 'd' || k === 'D') cambiarModo(modo === 'discurso' ? 'homenajes' : 'discurso');
    else if (k === 'Home') ir(0);
    else if (k === 'End') ir(listas[modo].length - 1);
    else if (k === '1') capitulo(25);
    else if (k === '2') capitulo(50);
    else if (k === '3') capitulo(75);
    else if (k === '4') capitulo('gratitud');
    else if (k === 'm' || k === 'M') avisar(SONIDO.alternar() ? 'Sonido apagado' : 'Sonido encendido');
    else if (k === 'h' || k === 'H' || k === '?') { const a = $('#ayuda'); a.hidden = !a.hidden; }
  });

  function avisar(texto) {
    const aviso = $('#aviso');
    aviso.textContent = texto;
    aviso.getAnimations().forEach((a) => a.cancel());
    aviso.animate([{ opacity: 0 }, { opacity: 1, offset: .1 }, { opacity: 1, offset: .8 }, { opacity: 0 }], { duration: 1800 });
  }

  $('#escenario').addEventListener('click', () => { SONIDO.despertar(); ir(actual + 1); });

  const boton = $('#cambiar');
  boton.addEventListener('click', (e) => {
    e.stopPropagation();
    SONIDO.despertar();
    boton.blur();   // Si queda enfocado, la barra espaciadora lo volvería a presionar.
    cambiarModo(modo === 'discurso' ? 'homenajes' : 'discurso');
  });

  let temporizadorCursor = 0;
  addEventListener('mousemove', () => {
    document.body.classList.remove('sin-cursor');
    clearTimeout(temporizadorCursor);
    temporizadorCursor = setTimeout(() => document.body.classList.add('sin-cursor'), 1800);
  });

  addEventListener('resize', ajustarEscala);

  function buscar(id) {
    for (const m of ['homenajes', 'discurso']) {
      const i = listas[m].findIndex((e) => e.id === id);
      if (i >= 0) return [m, i];
    }
    return null;
  }

  // Enlace directo a una escena (#colplast, #d-frentes…), útil en los ensayos.
  addEventListener('hashchange', () => {
    const hallado = buscar(decodeURIComponent(location.hash.slice(1)));
    if (hallado) cambiarModo(hallado[0], hallado[1], true);
  });

  // Todo se carga y decodifica antes de empezar, para que ningún viaje tropiece.
  async function precargar() {
    const imgs = [...lienzo.querySelectorAll('img')];
    const barra = $('#carga i');
    let listas_ = 0;
    await Promise.race([
      Promise.all(imgs.map((i) => i.decode().catch(() => {}).then(() => { barra.style.width = `${++listas_ / imgs.length * 100}%`; }))),
      new Promise((r) => setTimeout(r, 15000)),
    ]);
  }

  async function arrancar() {
    ajustarEscala();
    listas.homenajes = ESCENAS.construir(window.ENCUENTRO);
    listas.discurso = DISCURSO.construir();
    // El discurso queda en otra zona del mundo, lejos de los homenajes.
    const borde = Math.max(...listas.homenajes.map((e) => e.x)) + SEPARACION;
    listas.discurso.forEach((e) => { e.x += borde; });
    const todas = [...listas.homenajes, ...listas.discurso];
    todas.forEach((e) => lienzo.appendChild(e.nodo));
    // decode() necesita los nodos en el documento: se muestran un instante detrás de la carga.
    todas.forEach((e) => { e.nodo.style.display = 'block'; });
    await precargar();
    CAMARA.iniciar(todas, $('#cielo'), $('#ondas'));
    SONIDO.iniciar();
    const hallado = buscar(decodeURIComponent(location.hash.slice(1)));
    if (hallado) cambiarModo(hallado[0], hallado[1], true);
    else ir(0, true);
    document.body.classList.add('listo');
  }

  arrancar();
})();

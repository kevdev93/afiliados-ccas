// Presentación del 17° Encuentro Red de Afiliados 2026.
// Navegación y arranque; el movimiento está en camara.js y el contenido en escenas.js y datos.js.
(() => {
  'use strict';

  const ANCHO = 1920, ALTO = 1080;
  const $ = (s) => document.querySelector(s);
  const lienzo = $('#lienzo');

  let ESCENAS_ = [];
  let actual = -1;

  function ajustarEscala() {
    const escala = Math.min(innerWidth / ANCHO, innerHeight / ALTO);
    lienzo.style.transform = `translate(-50%, -50%) scale(${escala})`;
    $('#marcas').style.transform = lienzo.style.transform;
  }

  function ir(indice, directo) {
    if (indice < 0 || indice >= ESCENAS_.length || indice === actual) return;
    actual = indice;
    const e = ESCENAS_[indice];
    CAMARA.ir(e, directo);
    if (!directo) SONIDO.cambio();
    document.body.classList.toggle('fondo-claro', !!e.claro);
    history.replaceState(null, '', '#' + e.id);
    $('#ayuda-paso').textContent = `Escena ${indice + 1} de ${ESCENAS_.length} · ${e.id}`;
  }

  function capitulo(c) {
    const i = ESCENAS_.findIndex((e) => e.capitulo === c);
    if (i >= 0) ir(i);
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
    else if (k === 'Home') ir(0);
    else if (k === 'End') ir(ESCENAS_.length - 1);
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

  let temporizadorCursor = 0;
  addEventListener('mousemove', () => {
    document.body.classList.remove('sin-cursor');
    clearTimeout(temporizadorCursor);
    temporizadorCursor = setTimeout(() => document.body.classList.add('sin-cursor'), 1800);
  });

  addEventListener('resize', ajustarEscala);

  // Enlace directo a una escena (#colplast, #junta-3…), útil en los ensayos.
  addEventListener('hashchange', () => {
    const i = ESCENAS_.findIndex((e) => e.id === decodeURIComponent(location.hash.slice(1)));
    if (i >= 0) ir(i, true);
  });

  // Todo se carga y decodifica antes de empezar, para que ningún viaje tropiece.
  async function precargar() {
    const imgs = [...lienzo.querySelectorAll('img')];
    const barra = $('#carga i');
    let listas = 0;
    await Promise.race([
      Promise.all(imgs.map((i) => i.decode().catch(() => {}).then(() => { barra.style.width = `${++listas / imgs.length * 100}%`; }))),
      new Promise((r) => setTimeout(r, 15000)),
    ]);
  }

  async function arrancar() {
    ajustarEscala();
    ESCENAS_ = ESCENAS.construir(window.ENCUENTRO);
    ESCENAS_.forEach((e) => lienzo.appendChild(e.nodo));
    // decode() necesita los nodos en el documento: se muestran un instante detrás de la carga.
    ESCENAS_.forEach((e) => { e.nodo.style.display = 'block'; });
    await precargar();
    CAMARA.iniciar(ESCENAS_, $('#cielo'), $('#ondas'));
    SONIDO.iniciar();
    const id = decodeURIComponent(location.hash.slice(1));
    ir(Math.max(0, ESCENAS_.findIndex((e) => e.id === id)), true);
    document.body.classList.add('listo');
  }

  arrancar();
})();

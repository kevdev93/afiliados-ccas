// Cámara única sobre un mundo plano: cada escena tiene un lugar fijo y nada se corta ni se funde.
// Cada capa se desplaza según su profundidad `p` (menos de 1 = lejos, más de 1 = cerca), así que al
// viajar las capas se separan y, al llegar, todas coinciden en su sitio exacto.
window.CAMARA = (() => {
  'use strict';

  const SUAVIDAD = .52;      // Mayor = viajes más lentos (s). Dos etapas dan aceleración y frenado parejos.
  const ALEJAR = .17;        // Cuánto se aleja la cámara a mitad de un viaje.
  const VEL_MAX = 3400;      // Velocidad (px/s) a la que el alejamiento es completo.
  const ALCANCE = 4300;      // Distancia a la que una escena existe en pantalla.
  const LLEGADA = 1300;      // Distancia a la que una escena se da por alcanzada.
  const DERIVA = 7;          // Amplitud (px) del movimiento en reposo.
  const FORMAS_LLENO = 450;  // Hasta esta distancia, anillo y arco se ven completos…
  const FORMAS_NADA = 1400;  // …y desde esta ya no se ven: en el viaje no se acumulan los de varias escenas.

  const pos = { x: 0, y: 0, vx: 0, vy: 0 };   // cámara
  const guia = { x: 0, y: 0, vx: 0, vy: 0 };  // punto intermedio que persigue al objetivo
  const objetivo = { x: 0, y: 0 };
  const color = { r: 8, g: 22, b: 58, vr: 0, vg: 0, vb: 0 };
  const colorMeta = { r: 8, g: 22, b: 58 };
  let zoom = 1, vZoom = 0;
  let escenas = [];
  let cielo = null, ondas = null;
  let ultimo = 0, reloj = 0;
  let porCuadro = null;

  // Amortiguación crítica: se puede cambiar el objetivo a mitad de camino sin saltos.
  function amortiguar(actual, meta, vel, T, dt) {
    const w = 2 / T, x = w * dt;
    const e = 1 / (1 + x + .48 * x * x + .235 * x * x * x);
    const d = actual - meta;
    const t = (vel + w * d) * dt;
    return [meta + (d + t) * e, (vel - w * t) * e];
  }

  function cuadro(ahora) {
    const dt = Math.min(.05, (ahora - ultimo) / 1000 || .016);
    ultimo = ahora;
    reloj += dt;

    [guia.x, guia.vx] = amortiguar(guia.x, objetivo.x, guia.vx, SUAVIDAD, dt);
    [guia.y, guia.vy] = amortiguar(guia.y, objetivo.y, guia.vy, SUAVIDAD, dt);
    [pos.x, pos.vx] = amortiguar(pos.x, guia.x, pos.vx, SUAVIDAD, dt);
    [pos.y, pos.vy] = amortiguar(pos.y, guia.y, pos.vy, SUAVIDAD, dt);

    const rapidez = Math.hypot(pos.vx, pos.vy);
    const zoomMeta = 1 - ALEJAR * Math.min(1, rapidez / VEL_MAX);
    [zoom, vZoom] = amortiguar(zoom, zoomMeta, vZoom, .28, dt);

    const cx = pos.x + Math.sin(reloj * .41) * DERIVA;
    const cy = pos.y + Math.cos(reloj * .29) * DERIVA * .7;
    const alcance = ALCANCE / zoom;

    for (const e of escenas) {
      const dx = e.x - cx, dy = e.y - cy;
      const lejos = Math.max(Math.abs(dx), Math.abs(dy));
      const visible = lejos < alcance;
      if (visible !== e.visible) {
        e.visible = visible;
        e.nodo.style.display = visible ? 'block' : 'none';
      }
      if (visible) {
        for (const c of e.capas) {
          c.el.style.transform = `translate3d(${(dx * c.p * zoom).toFixed(2)}px,${(dy * c.p * zoom).toFixed(2)}px,0) scale(${zoom.toFixed(5)})`;
        }
        const forma = Math.max(0, Math.min(1, (FORMAS_NADA - lejos) / (FORMAS_NADA - FORMAS_LLENO)));
        if (forma !== e.forma) {
          e.forma = forma;
          for (const f of e.formas) f.style.opacity = forma.toFixed(3);
        }
        // La foto se corre dentro de su marco, como una ventana.
        for (const v of e.interiores) {
          const ix = Math.max(-13, Math.min(13, dx * .03));
          const iy = Math.max(-13, Math.min(13, dy * .03));
          v.style.transform = `translate3d(${ix.toFixed(2)}px,${iy.toFixed(2)}px,0)`;
        }
      }
      const cerca = lejos < LLEGADA;
      if (cerca !== e.cerca) {
        e.cerca = cerca;
        if (cerca && e.alLlegar) e.alLlegar();
        if (!cerca && e.alSalir) e.alSalir();
      }
    }

    for (const k of ['r', 'g', 'b']) {
      [color[k], color['v' + k]] = amortiguar(color[k], colorMeta[k], color['v' + k], .7, dt);
    }
    cielo.style.backgroundColor = `rgb(${color.r | 0},${color.g | 0},${color.b | 0})`;

    const T = 2400;
    const ox = -(((cx * .2) % T) + T) % T;
    const oy = -(((cy * .2) % T) + T) % T;
    ondas.style.transform = `translate3d(${ox.toFixed(1)}px,${oy.toFixed(1)}px,0)`;

    if (porCuadro) porCuadro(dt);
    requestAnimationFrame(cuadro);
  }

  return {
    iniciar(lista, nodoCielo, nodoOndas) {
      escenas = lista;
      cielo = nodoCielo;
      ondas = nodoOndas;
      for (const e of escenas) {
        e.visible = false;
        e.cerca = false;
        e.nodo.style.display = 'none';
        e.capas = [...e.nodo.querySelectorAll('[data-p]')].map((el) => ({ el, p: parseFloat(el.dataset.p) }));
        e.interiores = [...e.nodo.querySelectorAll('.interior')];
        e.formas = [...e.nodo.querySelectorAll('.formas')];
      }
      requestAnimationFrame((t) => { ultimo = t; cuadro(t); });
    },
    // Llevar la cámara a una escena; `directo` la ubica allí sin viajar.
    ir(e, directo) {
      objetivo.x = e.x;
      objetivo.y = e.y;
      Object.assign(colorMeta, e.cielo);
      if (directo) {
        Object.assign(pos, { x: e.x, y: e.y, vx: 0, vy: 0 });
        Object.assign(guia, { x: e.x, y: e.y, vx: 0, vy: 0 });
        Object.assign(color, e.cielo, { vr: 0, vg: 0, vb: 0 });
      }
    },
    alCuadro(fn) { porCuadro = fn; },
    get velocidad() { return Math.hypot(pos.vx, pos.vy); },
  };
})();

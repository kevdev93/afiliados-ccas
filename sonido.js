// Música de fondo y sonido de cambio de escena.
// - Lista de canciones en bucle, con un fundido entre cada una. La 15 ya es un loop de dos vueltas
//   hecho en un solo archivo (herramientas/preparar-musica.sh), así que no tiene fundido por dentro.
// - El navegador solo permite sonido después de la primera tecla o clic.
window.SONIDO = (() => {
  'use strict';

  const CARPETA = 'assets/musica/';
  const CANCIONES = 17;
  const VOLUMEN = .32;        // Bajo, para no tapar al presentador.
  const VOLUMEN_CAMBIO = .4;
  const CRUCE = 6;            // Segundos de fundido entre canciones.

  const archivo = (n) => `${CARPETA}${String(n + 1).padStart(2, '0')}.mp3`;

  let actual = null, proxima = null, cambios = [], turno = 0;
  let indice = 0, cruzando = false, fallos = 0;
  let silenciada = false, despierta = false, nivel = 0;

  function cargarProxima() {
    proxima.src = archivo((indice + 1) % CANCIONES);
    proxima.volume = 0;
    proxima.preload = 'auto';
    proxima.load();
  }

  // Termina el cruce: la próxima pasa a ser la actual y se prepara la siguiente.
  function pasar() {
    actual.pause();
    [actual, proxima] = [proxima, actual];
    indice = (indice + 1) % CANCIONES;
    cruzando = false;
    actual.volume = nivel;
    actual.play().catch(() => {});
    cargarProxima();
  }

  // Si una canción no carga, se salta a la siguiente en lugar de dejar la sala en silencio.
  function vigilar(pista) {
    pista.addEventListener('playing', () => { fallos = 0; });
    pista.addEventListener('error', () => {
      if (++fallos > CANCIONES) return;
      if (pista === proxima) {
        indice = (indice + 1) % CANCIONES;
        cargarProxima();
      } else if (despierta) {
        pasar();
      }
    });
  }

  function mezclar() {
    if (!despierta) return;
    const meta = silenciada ? 0 : VOLUMEN;
    nivel += Math.sign(meta - nivel) * Math.min(Math.abs(meta - nivel), VOLUMEN / 15);

    const resta = actual.duration - actual.currentTime;
    if (!cruzando && resta < CRUCE) {
      cruzando = true;
      proxima.currentTime = 0;
      proxima.play().catch(pasar);
    }
    if (!cruzando) {
      actual.volume = nivel;
      return;
    }
    // Cruce de igual potencia: el volumen total se mantiene parejo durante el fundido.
    const k = Math.min(1, proxima.currentTime / CRUCE);
    actual.volume = nivel * Math.cos(k * Math.PI / 2);
    proxima.volume = nivel * Math.sin(k * Math.PI / 2);
    if (k >= 1 || actual.ended) pasar();
  }

  function iniciar() {
    actual = new Audio(archivo(0));
    actual.preload = 'auto';
    actual.volume = 0;
    proxima = new Audio();
    vigilar(actual);
    vigilar(proxima);
    cargarProxima();
    cambios = [0, 1, 2].map(() => {
      const a = new Audio('assets/sonidos/cambio.mp3');
      a.preload = 'auto';
      a.volume = VOLUMEN_CAMBIO;
      return a;
    });
    setInterval(mezclar, 100);
  }

  return {
    iniciar,
    despertar() {
      if (despierta || !actual) return;
      despierta = true;
      actual.play().catch(() => { despierta = false; });
    },
    alternar() { silenciada = !silenciada; return silenciada; },
    // Varias voces, para que dos cambios seguidos no se corten entre sí.
    cambio() {
      if (silenciada || !cambios.length) return;
      const a = cambios[turno++ % cambios.length];
      a.currentTime = 0;
      a.play().catch(() => {});
    },
    // Para ensayos: sonido.adelantar(10) deja 10 s antes del siguiente fundido.
    adelantar(resta) { actual.currentTime = Math.max(0, actual.duration - CRUCE - resta); },
    estado() {
      return {
        cancion: indice + 1, cruzando, nivel: +nivel.toFixed(2),
        vActual: +actual.volume.toFixed(2), vProxima: +proxima.volume.toFixed(2),
        tiempo: +actual.currentTime.toFixed(1), duracion: +(actual.duration || 0).toFixed(1), sonando: !actual.paused,
      };
    },
  };
})();

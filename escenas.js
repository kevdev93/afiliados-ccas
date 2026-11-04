// Construye las escenas a partir de datos.js y les asigna un lugar en el mundo.
window.ESCENAS = (() => {
  'use strict';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const TONOS = {
    25: { acento: '#6cc4f2', cielo: { r: 11, g: 33, b: 84 }, onda: '#1f3d80' },
    50: { acento: '#e0bd6c', cielo: { r: 38, g: 30, b: 14 }, onda: '#c99a32' },
    75: { acento: '#d29a62', cielo: { r: 40, g: 22, b: 12 }, onda: '#a9652a' },
    gratitud: { acento: '#6cc4f2', cielo: { r: 9, g: 28, b: 74 }, onda: '#1f3d80' },
  };

  // Arco de la identidad (SVG/Recurso 2forma.svg): se usa con resplandor como fondo de las escenas.
  const ARCO = 'M3.37,74.88c-6.68-9.98-3.08-23.66,7.71-28.99C207.06-51,448.52,8.98,571.7,193.2c122.08,181.3,90.51,427.88-76.5,576.03-9.05,8.03-23.15,6.16-29.85-3.88l-15.45-23.16c-5.47-8.19-4.1-19.16,3.22-25.78,141.22-127.68,162.19-333.39,62.43-483.46C412.78,80.77,216.93,24.74,44.24,105.91c-8.82,4.15-19.35,1.1-24.79-6.97L3.37,74.88Z';

  // Anillo de la identidad (SVG/Recurso 1forma.svg).
  const ANILLO = 'M203.96,74.88c-6.68-9.98-3.08-23.66,7.71-28.99C407.65-51,649.1,8.98,772.29,193.2c122.08,181.3,90.51,427.88-76.5,576.03-9.05,8.03-23.15,6.16-29.85-3.88l-15.45-23.16c-5.47-8.19-4.1-19.16,3.22-25.78,141.22-127.68,162.19-333.39,62.43-483.46C613.37,80.77,417.51,24.74,244.83,105.91c-8.82,4.15-19.35,1.1-24.79-6.97l-16.09-24.06Z M641.95,788.33c6.53,9.98,2.89,23.52-7.82,28.82-196.03,97.05-436.95,37.02-560.25-147.23C-48.12,488.62-16.58,242.05,150.44,93.85c9.05-8.03,23.15-6.16,29.85,3.87l15.46,23.16c5.47,8.2,4.1,19.17-3.22,25.79-141.22,127.68-162.21,333.43-62.49,483.47,102.76,152.2,298.64,208.22,471.32,127.04,8.82-4.15,19.35-1.1,24.78,6.96l15.81,24.18Z';

  function tamano(n, base) {
    return Math.round(n > 52 ? base * .62 : n > 38 ? base * .72 : n > 26 ? base * .86 : base);
  }

  // ---------- piezas ----------

  function foto(id, f) {
    const [archivo, foco] = [].concat(f);
    return { src: `assets/empresas/${id}/${archivo}`, foco: foco || '50% 50%' };
  }

  function img(f, clase = '') {
    return `<img class="${clase}" src="${esc(f.src)}" style="object-position:${esc(f.foco)}" alt="">`;
  }

  function colorPlaca(e) {
    return e.placaColor ? ` style="background:${esc(e.placaColor)}"` : '';
  }

  function placa(e) {
    if (!e.logo) return '';
    return `<div class="placa ${e.placa === 'oscura' ? 'oscura' : ''}"${colorPlaca(e)}><img src="assets/empresas/${e.id}/${esc(e.logo)}" alt="${esc(e.nombre)}"></div>`;
  }

  function ficha(e, tono) {
    const cap = window.ENCUENTRO.capitulos[e.anos];
    const principal = e.persona || e.nombre;
    return `
      <div class="ficha">
        ${placa(e)}
        <h1 style="font-size:${tamano(principal, 84)}px">${esc(principal)}</h1>
        ${e.persona ? `<h2>${esc(e.nombre)}</h2>` : ''}
        <p class="anos" style="color:${tono.acento}"><b data-n="${e.anos}">${e.anos}</b><span>años</span><i></i><em>${esc(cap.periodo)}</em></p>
      </div>`;
  }

  // Cada escena lleva una sola forma: el anillo rodea bien las fotos y el arco, por ser una
  // curva sola, cruza menos el texto en las escenas tipográficas. Las dos giran lento.
  function arco(color, pose, tipo = 'anillo') {
    // El resplandor va horneado en una imagen: un blur en vivo retrasa la aparición de la escena.
    const tono = { '#e0bd6c': 'dorado', '#d29a62': 'bronce' }[color] || 'azul';
    const anillo = tipo === 'anillo';
    const adentro = anillo
      ? `<img class="halo-arco" src="assets/marca/halo2-${tono}.png" alt=""><svg class="arco" viewBox="0 0 846.22 863.14"><path fill="${color}" fill-rule="evenodd" d="${ANILLO}"/></svg>`
      : `<img class="halo-arco" src="assets/marca/halo-${tono}.png" alt=""><svg class="arco" viewBox="0 0 645.63 774.23"><path fill="${color}" d="${ARCO}"/></svg>`;
    const sentido = pose % 3 === 1 ? 'contrario' : '';
    return `<div class="capa formas" data-p=".86"><div class="${anillo ? `pose-anillo a${pose}` : `pose-arco p${pose}`}"><div class="giro ${anillo ? '' : 'lento'} ${sentido}">${adentro}</div></div></div>`;
  }

  // Onda grande que se desvanece antes de terminar: nunca se ve dónde acaba.
  function ola(color, d, opacidad = 1) {
    return `<svg class="ola" viewBox="-1000 -800 3920 2680"><path fill="${color}" opacity="${opacidad}" d="${d}"/></svg>`;
  }

  function fondo(f) {
    return `<div class="capa fondo-foto" data-p=".78"><div class="desvanecido">${img(f)}<div class="velo"></div></div></div>`;
  }

  // ---------- plantillas de empresa ----------

  function capsulas(e, fs, tono, inv, n) {
    const [a, b, c] = fs;
    const f = fs[3] || b;
    return `<section class="escena empresa capsulas ${inv ? 'invertida' : ''}">
      ${fondo(f)}${arco(tono.acento, n % 4)}
      <div class="capa" data-p=".93"><div class="capsula c1">${img(a, 'interior')}</div></div>
      <div class="capa" data-p="1.03"><div class="capsula c2">${img(b, 'interior')}</div></div>
      <div class="capa" data-p=".88"><div class="capsula c3">${img(c, 'interior')}</div></div>
      <div class="capa" data-p="1.24">${ficha(e, tono)}</div>
    </section>`;
  }

  function corte(e, fs, tono, inv, n) {
    const [a, b, c] = fs;
    const f = fs[3] || a;
    return `<section class="escena empresa corte ${inv ? 'invertida' : ''}">
      ${fondo(f)}${arco(tono.acento, n % 4)}
      <div class="capa" data-p=".9"><div class="panel p1"><div>${img(a, 'interior')}</div></div></div>
      <div class="capa" data-p="1.02"><div class="panel p2"><div>${img(b, 'interior')}</div></div></div>
      <div class="capa" data-p=".94"><div class="panel p3"><div>${img(c, 'interior')}</div></div></div>
      <div class="capa" data-p="1.24">${ficha(e, tono)}</div>
    </section>`;
  }

  // Para fotos de grupo: marco ancho y de esquinas suaves, para que nadie quede por fuera.
  function grupo(e, fs, tono, inv, n) {
    const [a, b, c] = fs;
    const f = e.fondo ? foto(e.id, e.fondo) : (fs[3] || b || a);
    return `<section class="escena empresa grupo ${e.vertical ? 'vertical' : ''} ${inv ? 'invertida' : ''}">
      ${fondo(f)}${arco(tono.acento, n % 4)}
      <div class="capa" data-p=".96"><div class="marco-grupo principal">${img(a, 'interior')}</div></div>
      <div class="capa" data-p="1.08"><div class="marco-grupo chico a ${c ? '' : 'solo'}">${img(b, 'interior')}</div></div>
      ${c ? `<div class="capa" data-p=".9"><div class="marco-grupo chico b">${img(c, 'interior')}</div></div>` : ''}
      <div class="capa" data-p="1.24">${ficha(e, tono)}</div>
    </section>`;
  }

  function ventana(e, fs, tono, inv, n) {
    const [a, b] = fs;
    return `<section class="escena empresa ventana ${inv ? 'invertida' : ''}">
      ${fondo(b || a)}${arco(tono.acento, n % 4)}
      <div class="capa" data-p=".95"><div class="marco">${img(a, 'interior')}</div></div>
      ${b ? `<div class="capa" data-p="1.1"><div class="redonda">${img(b, 'interior')}</div></div>` : ''}
      <div class="capa" data-p="1.24">${ficha(e, tono)}</div>
    </section>`;
  }

  function soloNombre(e, tono) {
    return `<section class="escena empresa solo">
      <div class="capa" data-p=".82">${ola(tono.onda, 'M-1000 900L-300 760C200 560 520 980 980 800S1620 420 2300 620L2920 700V1880H-1000Z', .55)}</div>
      <div class="capa" data-p="1.24">${ficha(e, tono)}</div>
    </section>`;
  }

  function empresa(e, i) {
    const tono = TONOS[e.anos];
    const fs = e.fotos.map((f) => foto(e.id, f));
    const inv = i % 2 === 1;
    if (e.plantilla === 'grupo') return grupo(e, fs, tono, inv, i);
    if (fs.length >= 3) return (i % 4 < 2 ? capsulas : corte)(e, fs, tono, inv, i);
    if (fs.length >= 1) return ventana(e, fs, tono, inv, i);
    return soloNombre(e, tono);
  }

  // ---------- otras escenas ----------

  function portada() {
    return `<section class="escena portada">
      <div class="capa foto-sede" data-p=".84"><img class="interior" src="assets/fondos/sede.jpg" alt=""></div>
      <div class="capa" data-p="1">${ola('#1f3d80', 'M-1000 710L-300 630C260 510 620 860 1120 770S1720 470 2300 540L2920 610V1880H-1000Z')}${ola('#fff', 'M-1000 790L-300 710C260 590 620 930 1120 840S1720 550 2300 610L2920 680V1880H-1000Z')}</div>
      <div class="capa" data-p="1.18"><div class="titulo">${window.TITULO_SVG}<div class="destello"><i></i></div></div></div>
    </section>`;
  }

  // Entrada del título: cada pieza llega desde su lado, siguiendo la diagonal del logo.
  function entrarTitulo(nodo) {
    const curva = 'cubic-bezier(.16,1,.3,1)';
    const pieza = (sel, desde, retraso) => {
      nodo.querySelectorAll(sel).forEach((el) => el.animate(
        [{ transform: desde, opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 1300, delay: retraso, easing: curva, fill: 'both' }));
    };
    pieza('.t-fondo17', 'translateX(-46px)', 150);
    pieza('.t-17', 'translateX(-30px)', 320);
    pieza('.t-linea', 'translate(16px, -26px)', 520);
    pieza('.t-encuentro', 'translateX(40px)', 620);
    pieza('.t-red', 'translateX(-40px)', 800);
    pieza('.t-fondo26', 'translateX(60px)', 980);
    pieza('.t-26', 'translateX(44px)', 1120);
  }

  function apertura() {
    return `<section class="escena apertura">
      ${arco(TONOS[25].acento, 0, 'curva')}
      <div class="capa" data-p="1.2"><div class="ap-texto">
        <p class="rotulo">Reconocimiento a empresarios del Aburrá Sur</p>
        <h1>Que cumplen 25, 50 y 75 años de existencia</h1>
        <p class="sub">Aportando al desarrollo y fortalecimiento empresarial de la región y el país.</p>
      </div></div>
      <div class="capa" data-p=".9"><div class="ap-cifra n1"><b data-n="25">25</b></div></div>
      <div class="capa" data-p="1.05"><div class="ap-cifra n2"><b data-n="50">50</b></div></div>
      <div class="capa" data-p=".82"><div class="ap-cifra n3"><b data-n="75">75</b></div></div>
    </section>`;
  }

  function capitulo(anos, cap) {
    const tono = TONOS[anos];
    return `<section class="escena capitulo">
      <div class="capa isla" data-p=".8"><div></div></div>
      <div class="capa" data-p=".94">${ola(tono.onda, 'M-1000 1150L-300 1110C200 860 700 1120 1180 930S1800 690 2300 790L2920 900V1880H-1000Z')}</div>
      <div class="capa" data-p="1.1"><video class="video-anos" src="${esc(cap.video)}" muted playsinline preload="auto"></video></div>
      <div class="capa" data-p="1.22"><p class="cap-texto">${esc(cap.texto)}</p></div>
    </section>`;
  }

  function muro(d) {
    const fila = (lista, p, n) => `<div class="capa" data-p="${p}"><div class="fila f${n}">${lista.map((e) => `
      <div class="ladrillo ${e.placa === 'oscura' ? 'oscura' : ''}"${colorPlaca(e)}>${e.logo ? `<img src="assets/empresas/${e.id}/${esc(e.logo)}" alt="">` : `<span>${esc(e.nombre.replace(/ S\.A\.S\.?| S\.A\.$/, ''))}</span>`}</div>`).join('')}</div></div>`;
    const es = d.empresas;
    return `<section class="escena muro">
      ${arco(TONOS.gratitud.acento, 2)}
      <div class="capa" data-p="1.25"><h1 class="muro-titulo">Empresas homenajeadas</h1></div>
      ${fila(es.slice(0, 6), .9, 1)}${fila(es.slice(6, 12), 1.05, 2)}${fila(es.slice(12, 18), .95, 3)}${fila(es.slice(18), 1.12, 4)}
    </section>`;
  }

  function gratitudCapitulo() {
    return `<section class="escena gratitud-cap">
      ${arco('#6cc4f2', 2, 'curva')}
      <div class="capa" data-p=".84">${ola('#fff', 'M-1000 520L-300 420C300 180 700 620 1200 460S1800 160 2300 260L2920 330V1880H-1000Z', .1)}</div>
      <div class="capa" data-p="1.16"><img class="gratitud-letra grande" src="assets/marca/gratitud.png" alt="Gratitud"></div>
      <div class="capa" data-p="1.04"><p class="gr-texto">Por el compromiso, la dedicación y la loable labor realizada durante su permanencia en la junta directiva de la entidad, en beneficio de los intereses del sector productivo del Aburrá Sur.</p></div>
    </section>`;
  }

  function miembro(m, i) {
    const lado = ['izq', 'der', 'cen'][i % 3];
    const partes = m.nombre.split(' ');
    const corte = Math.ceil(partes.length / 2);
    return `<section class="escena miembro ${lado}">
      ${arco('#6cc4f2', i % 3, 'curva')}
      <div class="capa" data-p=".8">${ola('#008dd4', i % 2 ? 'M-1000 980L-300 900C200 700 700 1000 1180 820S1800 560 2300 660L2920 740V1880H-1000Z' : 'M-1000 200L-300 260C200 460 760 120 1200 300S1800 500 2300 340L2920 280V-800H-1000Z', .28)}</div>
      <div class="capa" data-p="1.14"><img class="gratitud-letra" src="assets/marca/gratitud.png" alt="Gratitud"></div>
      <div class="capa" data-p="1.26"><div class="m-nombre"><h1>${esc(partes.slice(0, corte).join(' '))}<br>${esc(partes.slice(corte).join(' '))}</h1>
        <p class="periodos">${m.periodos.map((p) => `<span>${esc(p)}</span>`).join('')}</p></div></div>
    </section>`;
  }

  function cierre() {
    return `<section class="escena cierre">
      ${arco('#6cc4f2', 0, 'curva')}
      <div class="capa" data-p=".84">${ola('#008dd4', 'M-1000 900L-300 820C260 640 620 960 1120 800S1720 560 2300 640L2920 720V1880H-1000Z', .22)}</div>
      <div class="capa" data-p="1.2"><h1 class="ci-gracias">Gracias</h1></div>
    </section>`;
  }

  // ---------- recorrido ----------

  function azar(semilla) {
    return () => {
      semilla = (semilla + 0x6D2B79F5) | 0;
      let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Cada escena queda en una dirección distinta a la anterior y lejos de todas las demás.
  // La semilla es fija: el recorrido del ensayo es el mismo del evento.
  function ubicar(lista, semilla = 20261105) {
    const r = azar(semilla);
    let x = 0, y = 0, rumbo = 0;
    lista.forEach((e, i) => {
      if (i) {
        for (let intento = 0; ; intento++) {
          const giro = (r() < .5 ? -1 : 1) * (Math.PI * .3 + r() * Math.PI * .5);
          const nuevo = i === 1 ? -Math.PI / 2 + r() : rumbo + giro;
          const paso = 3300 + r() * 500;
          const nx = x + Math.cos(nuevo) * paso, ny = y + Math.sin(nuevo) * paso;
          const libre = lista.slice(0, i).every((o) => Math.hypot(o.x - nx, o.y - ny) > 3300);
          if (libre || intento > 200) { x = nx; y = ny; rumbo = nuevo; break; }
        }
      }
      e.x = Math.round(x);
      e.y = Math.round(y);
    });
    return lista;
  }

  function aNodo(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function construir(d) {
    const lista = [];
    const agregar = (id, html, cielo, extra = {}) => lista.push({ id, nodo: aNodo(html), cielo, ...extra });

    agregar('portada', portada(), TONOS[25].cielo);
    lista[0].alLlegar = () => entrarTitulo(lista[0].nodo);
    agregar('apertura', apertura(), TONOS[25].cielo);
    let anos = 0, n = 0;
    d.empresas.forEach((e) => {
      if (e.anos !== anos) {
        anos = e.anos;
        agregar(`anos-${anos}`, capitulo(anos, d.capitulos[anos]), TONOS[anos].cielo, { capitulo: anos, claro: true });
      }
      agregar(e.id, empresa(e, n++), TONOS[e.anos].cielo);
    });
    agregar('muro', muro(d), TONOS.gratitud.cielo);
    agregar('gratitud', gratitudCapitulo(), TONOS.gratitud.cielo, { capitulo: 'gratitud' });
    d.junta.forEach((m, i) => agregar(`junta-${i + 1}`, miembro(m, i), TONOS.gratitud.cielo));
    agregar('cierre', cierre(), TONOS.gratitud.cielo);

    // El video de años arranca al llegar y queda quieto en su último cuadro.
    for (const e of lista) {
      const video = e.nodo.querySelector('video');
      if (video) {
        e.alLlegar = () => { video.currentTime = 0; video.play().catch(() => {}); };
        e.alSalir = () => { video.pause(); };
      }
    }
    return ubicar(lista);
  }

  // Piezas que reutiliza la presentación del discurso (discurso.js).
  return { construir, piezas: { arco, ola, esc, ubicar } };
})();

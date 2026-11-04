// Presentación de apoyo para el discurso de la presidenta ejecutiva.
// Vive en el mismo mundo que la de homenajeados, en otra zona; app.js viaja entre las dos.
// Los datos salen de "PALABRAS ENCUENTRO DE AFILIADOS 2026.docx". Si el discurso cambia, se ajustan aquí.
window.DISCURSO = (() => {
  'use strict';

  const { arco, ola, esc } = ESCENAS.piezas;
  const CELESTE = '#6cc4f2', DORADO = '#e0bd6c', BRONCE = '#d29a62', BLANCO = '#ffffff';
  const CIELO = { r: 9, g: 28, b: 74 };

  // Íconos de línea, dibujados en una caja de 64 × 64.
  const ICONOS = {
    formalizacion: '<rect x="14" y="8" width="36" height="48" rx="4"/><path d="M22 20h20M22 29h20M22 38h9"/><path d="M34 45l5 5 10-12"/>',
    emprendimiento: '<path d="M32 6c9 7 13 17 11 30l-6 6H27l-6-6C19 23 23 13 32 6z"/><circle cx="32" cy="24" r="5"/><path d="M21 35l-7 9 9 1M43 35l7 9-9 1M28 48l4 9 4-9"/>',
    fortalecimiento: '<path d="M8 55h48"/><rect x="13" y="37" width="9" height="18" rx="1"/><rect x="28" y="27" width="9" height="28" rx="1"/><rect x="43" y="14" width="9" height="41" rx="1"/>',
    digital: '<rect x="18" y="18" width="28" height="28" rx="4"/><rect x="26" y="26" width="12" height="12" rx="1"/><path d="M24 9v9M32 9v9M40 9v9M24 46v9M32 46v9M40 46v9M9 24h9M9 32h9M9 40h9M46 24h9M46 32h9M46 40h9"/>',
    global: '<circle cx="32" cy="32" r="22"/><path d="M10 32h44M32 10c8 8 8 36 0 44M32 10c-8 8-8 36 0 44M14 21h36M14 43h36"/>',
    industria: '<path d="M8 54V30l12 8v-8l12 8v-8l12 8V12h10v42z"/><path d="M8 54h48M16 46h4M28 46h4M40 46h4"/>',
    avion: '<path d="M4 38l20-3 14-22h7l-6 22 14-2 5-7h5l-3 11 3 11h-5l-5-7-14-2 6 22h-7L24 41 4 38z"/>',
    barco: '<path d="M8 40h48l-8 13H16z"/><path d="M20 40V27h24v13M28 27V17h8v10"/><path d="M6 59c6-3 10-3 16 0s10 3 16 0 10-3 16 0"/>',
    hoja: '<path d="M14 50C13 25 31 12 54 10c-2 25-14 42-40 40z"/><path d="M14 50l25-25"/>',
    montana: '<path d="M5 53l18-27 10 15 8-11 18 23z"/><circle cx="47" cy="15" r="5"/>',
    empresa: '<rect x="14" y="10" width="36" height="44" rx="2"/><path d="M22 19h6M36 19h6M22 28h6M36 28h6M22 37h6M36 37h6M28 54v-9h8v9"/>',
    hogar: '<path d="M9 31L32 12l23 19"/><path d="M16 26v27h32V26"/><path d="M27 53V39h10v14"/>',
    tributo: '<circle cx="32" cy="32" r="21"/><path d="M39 24c-2-4-13-5-14 1-1 6 14 5 14 11 0 6-12 6-15 1M32 16v32"/>',
    escuela: '<path d="M8 25L32 12l24 13z"/><path d="M14 29v19M25 29v19M39 29v19M50 29v19M7 52h50"/>',
    corazon: '<path d="M32 53S9 39 9 24a11 11 0 0 1 23-4 11 11 0 0 1 23 4c0 15-23 29-23 29z"/>',
  };
  const icono = (n) => `<svg class="icono" viewBox="0 0 64 64">${ICONOS[n]}</svg>`;

  const cabeza = (rotulo, titulo) => `<div class="capa" data-p="1.18"><header class="d-cabeza"><p class="d-rotulo">${rotulo}</p><h1 class="d-titulo">${titulo}</h1></header></div>`;
  const diapositiva = (clase, pose, tipo, cuerpo) => `<section class="escena discurso ${clase}">${arco(CELESTE, pose, tipo)}${cuerpo}</section>`;

  // ---------- diapositivas ----------

  const portada = () => diapositiva('d-portada', 0, 'curva', `
    <div class="capa" data-p=".84">${ola('#008dd4', 'M-1000 960L-300 880C260 700 620 1020 1120 860S1720 620 2300 700L2920 780V1880H-1000Z', .25)}</div>
    <div class="capa" data-p="1.18"><div class="d-portada-texto">
      <p class="d-rotulo">17° Encuentro Red de Afiliados 2026</p>
      <h1>Palabras de la Presidenta Ejecutiva</h1>
      <p class="d-firma">Dra. María Luisa Jaramillo Zapata</p>
      <p class="d-lugar">Itagüí, 5 de noviembre de 2026</p>
    </div></div>`);

  const PRIORIDADES = [
    ['formalizacion', 'Formalización empresarial'],
    ['emprendimiento', 'Emprendimiento'],
    ['fortalecimiento', 'Fortalecimiento de unidades productivas'],
    ['digital', 'Transformación digital'],
    ['global', 'Internacionalización'],
    ['industria', 'Reindustrialización del territorio'],
  ];
  function prioridades() {
    const cx = 1380, cy = 620, r = 320;
    const pos = PRIORIDADES.map((_, i) => {
      const a = -Math.PI / 2 + i * Math.PI / 3;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    });
    return diapositiva('d-prioridades', 1, 'curva', `
      ${cabeza('Nuestra visión', 'Más allá de los servicios registrales')}
      <div class="capa" data-p="1.1"><div class="d-texto" style="top:400px;width:720px">
        <p>Una institución comprometida con el desarrollo empresarial, la transformación productiva y la generación de oportunidades.</p>
        <blockquote>«El crecimiento económico no se decreta; se construye.»</blockquote>
      </div></div>
      <div class="capa" data-p="1">
        <svg class="d-lineas" viewBox="0 0 1920 1080">${pos.map(([x, y], i) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" pathLength="1" style="--n:${i}"/>`).join('')}</svg>
        <div class="d-centro" style="left:${cx - 120}px;top:${cy - 120}px"><span>Prioridades<br>de gestión</span></div>
        ${PRIORIDADES.map(([ic, txt], i) => `<div class="d-nodo" style="left:${pos[i][0] - 95}px;top:${pos[i][1] - 66}px;--n:${i}"><i>${icono(ic)}</i><span>${txt}</span></div>`).join('')}
      </div>`);
  }

  const inversion = () => diapositiva('d-inversion', 2, 'curva', `
    ${cabeza('Gestión 2026', 'Recursos para el desarrollo empresarial')}
    <div class="capa" data-p="1.08"><div class="d-cifra" style="left:140px;top:360px">
      <b><small>$</small><span data-contar="11300">11.300</span></b>
      <span class="d-unidad">millones en inversión</span>
      <p>Previstos al cierre de 2026</p>
    </div></div>
    <div class="capa" data-p=".98"><div class="d-cifra d-cifra-b" style="left:1180px;top:360px">
      <b><span data-contar="43">43</span></b>
      <span class="d-unidad">programas empresariales</span>
      <p>Diseñados para responder a las necesidades reales del tejido productivo</p>
    </div></div>
    <div class="capa" data-p="1.14"><p class="d-aliado">En alianza con el Gobierno Nacional · Ministerio de Comercio, Industria y Turismo</p></div>`);

  const FRENTES = [
    [12, 'Formalización y Emprendimiento', 'Creación, consolidación y sostenibilidad de nuevas unidades productivas.', DORADO],
    [22, 'Fortalecimiento Empresarial', 'Capacidades administrativas, financieras, comerciales, tecnológicas y productivas.', CELESTE],
    [2, 'Internacionalización', 'Preparación para acceder a nuevos mercados.', BRONCE],
    [7, 'Estudios y Espacios de Articulación Registral', 'Conocimiento, institucionalidad y mejores condiciones para el desarrollo empresarial.', BLANCO],
  ];
  function frentes() {
    const total = FRENTES.reduce((s, f) => s + f[0], 0);
    let inicio = 0;
    const arcos = FRENTES.map(([n, , , color], i) => {
      const largo = n / total * 100;
      const html = `<circle cx="310" cy="310" r="235" pathLength="100" stroke="${color}" style="--d:${Math.max(.1, largo - .7)} 100;stroke-dashoffset:${-inicio};--n:${i}"/>`;
      inicio += largo;
      return html;
    }).join('');
    return diapositiva('d-frentes', 3, 'curva', `
      ${cabeza('43 programas', 'Cuatro grandes frentes de intervención')}
      <div class="capa" data-p="1"><div class="d-dona" style="left:150px;top:330px">
        <svg viewBox="0 0 620 620"><circle cx="310" cy="310" r="235" class="pista"/>${arcos}</svg>
        <div class="d-dona-centro"><b data-contar="43">43</b><span>programas</span></div>
      </div></div>
      <div class="capa" data-p="1.1"><div class="d-leyenda">${FRENTES.map(([n, nombre, desc, color], i) => `
        <div class="d-fila" style="--n:${i};--c:${color}"><b data-contar="${n}">${n}</b><div><h3>${nombre}</h3><p>${desc}</p></div></div>`).join('')}
      </div></div>`);
  }

  const MUNICIPIOS = [['Envigado', 38], ['Itagüí', 30], ['Sabaneta', 18], ['La Estrella', 8], ['Caldas', 4]];
  function territorio() {
    const max = Math.max(...MUNICIPIOS.map((m) => m[1]));
    return diapositiva('d-territorio', 0, 'curva', `
      ${cabeza('Presencia regional', 'Beneficiarios en los cinco municipios')}
      <div class="capa" data-p="1.04"><div class="d-barras">${MUNICIPIOS.map(([nombre, v], i) => `
        <div class="d-barra" style="--n:${i}"><span class="d-nombre">${nombre}</span><div class="d-pista"><i style="width:${v / max * 100}%"></i></div><b><span data-contar="${v}">${v}</span>%</b></div>`).join('')}
      </div></div>`);
  }

  function cobertura() {
    const puntos = Array.from({ length: 100 }, (_, i) => `<i class="${i < 31 ? 'si' : ''}" style="--n:${i}"></i>`).join('');
    return diapositiva('d-cobertura', 1, 'curva', `
      ${cabeza('Impacto en el tejido empresarial', 'Llegamos a casi un tercio de nuestras empresas')}
      <div class="capa" data-p="1.1"><div class="d-cifra" style="left:140px;top:380px">
        <b><span data-contar="31">31</span><small>%</small></b>
        <span class="d-unidad">de la base empresarial impactada</span>
        <p>Base de <strong>34.910</strong> unidades productivas reportadas por la Cámara al cierre de 2025.</p>
      </div></div>
      <div class="capa" data-p=".98"><div class="d-puntos">${puntos}</div></div>`);
  }

  const GRUPOS = [[32.4, '32,4%', 'Economía Popular', CELESTE], [26.8, '26,8%', 'Personas Naturales', DORADO], [40, 'Cerca del 40%', 'Personas Jurídicas', BLANCO]];
  function inclusion() {
    const total = GRUPOS.reduce((s, g) => s + g[0], 0);
    return diapositiva('d-inclusion', 2, 'curva', `
      ${cabeza('Una visión incluyente', '¿Quiénes son los beneficiarios?')}
      <div class="capa" data-p="1.02"><div class="d-apilada">${GRUPOS.map(([v, txt, nombre, color], i) => `
        <div class="d-segmento" style="flex:${v / total};--c:${color};--n:${i}"><b>${txt}</b><i></i><span>${nombre}</span></div>`).join('')}
      </div></div>
      <div class="capa" data-p="1.14"><blockquote class="d-cita" style="top:800px">«Una región empresarialmente competitiva no puede construirse dejando atrás a ninguno de sus actores económicos.»</blockquote></div>`);
  }

  const SECTORES = [
    ['avion', 'Aeronáutico', 'y sus cadenas de suministro'],
    ['barco', 'Industria astillera', 'y sus encadenamientos productivos'],
    ['digital', 'Transformación digital', 'automatización e inteligencia artificial'],
    ['hoja', 'Bioeconomía', 'aprovechamiento sostenible de los recursos'],
    ['montana', 'Turismo regenerativo', 'y nuevas economías del desarrollo territorial'],
  ];
  const sectores = () => diapositiva('d-sectores', 3, 'curva', `
    ${cabeza('Sofisticación productiva', 'Sectores con grandes oportunidades de crecimiento')}
    <div class="capa" data-p="1.02"><div class="d-tarjetas">${SECTORES.map(([ic, nombre, desc], i) => `
      <div class="d-tarjeta" style="--n:${i}"><i>${icono(ic)}</i><h3>${nombre}</h3><p>${desc}</p></div>`).join('')}
    </div></div>`);

  const PELDANOS = [
    ['01', 'Permanecer y crecer en el mercado'],
    ['02', 'Proveedores estratégicos de empresas ancla y tractoras'],
    ['03', 'Negocios de alcance global'],
  ];
  const escalera = () => diapositiva('d-escalera', 0, 'curva', `
    ${cabeza('Nuestra apuesta', 'Integrar a las pymes a cadenas de mayor valor')}
    <div class="capa" data-p="1"><div class="d-peldanos">${PELDANOS.map(([n, txt], i) => `
      <div class="d-peldano" style="--n:${i};height:${230 + i * 150}px"><b>${n}</b><span>${txt}</span></div>`).join('')}
    </div></div>`);

  function alianzas() {
    const c = [960, 700];
    const nodos = [
      [420, 760, 'Área Metropolitana del Valle de Aburrá', 'Memorando de Entendimiento para la sostenibilidad empresarial'],
      [960, 360, 'Gobernación de Antioquia y aliados', 'Programa Del Puerto al Aeropuerto'],
      [1500, 760, 'Gobiernos municipales del Aburrá Sur', 'Convenios de emprendimiento, formalización y fortalecimiento'],
    ];
    return diapositiva('d-alianzas', 1, 'curva', `
      ${cabeza('Cooperación institucional', 'Alianzas que multiplican capacidades')}
      <div class="capa" data-p="1">
        <svg class="d-lineas" viewBox="0 0 1920 1080">${nodos.map(([x, y], i) => `<line x1="${c[0]}" y1="${c[1]}" x2="${x}" y2="${y}" pathLength="1" style="--n:${i}"/>`).join('')}</svg>
        <div class="d-centro d-centro-logo" style="left:${c[0] - 130}px;top:${c[1] - 130}px"><img src="assets/marca/ccas-blanco-v.png" alt="Cámara de Comercio Aburrá Sur"></div>
        ${nodos.map(([x, y, nombre, desc], i) => `<div class="d-aliada" style="left:${x - 230}px;top:${y - 85}px;--n:${i}"><h3>${nombre}</h3><p>${desc}</p></div>`).join('')}
      </div>`);
  }

  const ALIADOS = ['Gobernación de Antioquia', 'Cámara de Comercio de Medellín', 'Cámara de Comercio de Urabá', 'Cámara de Comercio del Oriente Antioqueño', 'Comfama', 'Comfenalco', 'Cámara de Comercio Aburrá Sur'];
  const puerto = () => diapositiva('d-puerto', 2, 'curva', `
    ${cabeza('Gran alianza por Antioquia', 'Del Puerto al Aeropuerto')}
    <div class="capa" data-p="1">
      <svg class="d-trayecto" viewBox="0 0 1920 1080"><path d="M380 600C700 300 1220 300 1540 600" pathLength="1"/><path class="flujo" d="M380 600C700 300 1220 300 1540 600"/></svg>
      <div class="d-extremo" style="left:290px;top:510px"><i>${icono('barco')}</i><span>Sector astillero</span></div>
      <div class="d-extremo" style="left:1450px;top:510px"><i>${icono('avion')}</i><span>Sector aeronáutico</span></div>
      <p class="d-arco-texto">Desarrollo de proveedores para los sectores aeronáutico y astillero de Antioquia</p>
    </div>
    <div class="capa" data-p="1.1"><div class="d-tres">
      <div style="--n:0"><b>Conectar</b><span>capacidades empresariales</span></div>
      <div style="--n:1"><b>Desarrollar</b><span>proveedores especializados</span></div>
      <div style="--n:2"><b>Fortalecer</b><span>encadenamientos productivos</span></div>
    </div></div>
    <div class="capa" data-p="1.16"><div class="d-chips">${ALIADOS.map((a, i) => `<span style="--n:${i}">${a}</span>`).join('')}</div></div>`);

  const conecta = () => diapositiva('d-conecta', 3, 'curva', `
    ${cabeza('Relaciones de valor', 'Estrategia CONECTA')}
    <div class="capa" data-p="1.1"><div class="d-texto" style="top:400px;width:700px">
      <p>Programas altamente cualificados para identificar y cerrar brechas en empresas <strong>ancla y tractoras</strong>.</p>
      <p>Para que se conviertan en dinamizadoras de nuevas oportunidades para todo su ecosistema.</p>
    </div></div>
    <div class="capa" data-p="1"><div class="d-ondas">
      <i class="pulso"></i><i class="pulso"></i>
      <div class="anillo a3"><span>Cadenas productivas</span></div>
      <div class="anillo a2"><span>Aliados</span></div>
      <div class="anillo a1"><span>Proveedores</span></div>
      <div class="nucleo"><span>Empresas ancla y tractoras</span></div>
    </div></div>`);

  const CADENA = [
    ['empresa', 'Empresas'],
    ['hogar', 'Empleo e ingresos para miles de hogares'],
    ['tributo', 'Tributos que fortalecen las finanzas municipales'],
    ['escuela', 'Infraestructura, educación y servicios'],
    ['corazon', 'Calidad de vida en nuestras comunidades'],
  ];
  const gracias = () => diapositiva('d-gracias', 0, 'curva', `
    ${cabeza('Gracias, empresarios', 'Las empresas construyen sociedad')}
    <div class="capa" data-p="1"><div class="d-cadena">${CADENA.map(([ic, txt], i) => `
      <div class="d-eslabon" style="--n:${i}"><i>${icono(ic)}</i><span>${txt}</span></div>`).join('<b class="d-flecha"></b>')}
    </div></div>
    <div class="capa" data-p="1.14"><blockquote class="d-cita" style="top:850px">«Detrás de cada empresa existe una historia de esfuerzo, una apuesta de vida, una familia y un equipo de trabajo.»</blockquote></div>`);

  const PARES = [['Más empresas', 'Mejores empresas'], ['Más emprendimientos', 'Emprendimientos sostenibles'], ['Mayor inversión', 'Mayor productividad, innovación y valor agregado']];
  const vision = () => diapositiva('d-vision', 1, 'curva', `
    ${cabeza('Hacia el futuro', 'Queremos una región con…')}
    <div class="capa" data-p="1.06"><div class="d-pares">${PARES.map(([a, b], i) => `
      <div class="d-par" style="--n:${i}"><span>${a}</span><i></i><b>${b}</b></div>`).join('')}
    </div></div>`);

  const cierre = () => diapositiva('d-cierre', 2, 'curva', `
    <div class="capa" data-p=".84">${ola('#008dd4', 'M-1000 900L-300 820C260 640 620 960 1120 800S1720 560 2300 640L2920 720V1880H-1000Z', .22)}</div>
    <div class="capa" data-p="1.2"><div class="d-final">
      <h1>Sin empresas no hay país.</h1>
      <p>Y sin empresarios comprometidos, instituciones articuladas y territorios que crean en su potencial, tampoco habrá desarrollo sostenible ni prosperidad colectiva.</p>
      <span>Muchas gracias</span>
    </div></div>`);

  // ---------- animaciones al llegar ----------

  const formato = new Intl.NumberFormat('es-CO');

  function contar(nodo) {
    nodo.querySelectorAll('[data-contar]').forEach((el) => {
      const meta = +el.dataset.contar;
      const t0 = performance.now(), dur = 1600;
      const paso = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = formato.format(Math.round(meta * (1 - Math.pow(1 - k, 3))));
        if (k < 1 && nodo.classList.contains('activa')) requestAnimationFrame(paso);
        else el.textContent = formato.format(meta);
      };
      requestAnimationFrame(paso);
    });
  }

  function construir() {
    const fabricas = [portada, prioridades, inversion, frentes, territorio, cobertura, inclusion, sectores, escalera, alianzas, puerto, conecta, gracias, vision, cierre];
    const ids = ['portada', 'prioridades', 'inversion', 'frentes', 'territorio', 'cobertura', 'inclusion', 'sectores', 'apuesta', 'alianzas', 'puerto', 'conecta', 'gracias', 'vision', 'cierre'];
    const lista = fabricas.map((f, i) => {
      const t = document.createElement('template');
      t.innerHTML = f().trim();
      const nodo = t.content.firstChild;
      return {
        id: 'd-' + ids[i], nodo, cielo: CIELO, discurso: true,
        // Los gráficos se arman al llegar y vuelven a su estado inicial al salir.
        alLlegar() { nodo.classList.remove('activa'); void nodo.offsetWidth; nodo.classList.add('activa'); contar(nodo); },
        alSalir() { nodo.classList.remove('activa'); },
      };
    });
    return ESCENAS.piezas.ubicar(lista, 20261104);
  }

  return { construir, esc };
})();

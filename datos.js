// Contenido de la presentación. El orden de cada lista es el orden del evento:
// empresas = PDF de diplomas; junta = .ai de placas.
//
// Para completar una empresa cuando llegue su material:
// 1. Copia los archivos a assets/empresas/<id>/ (o agrégalos a herramientas/preparar-fotos.sh).
// 2. Llena aquí `logo` y `fotos`. La plantilla se ajusta sola según la cantidad de fotos:
//    3 o más → cápsulas o corte · 1 o 2 → ventana · ninguna → solo tipografía.
//
// Campos:
// - `persona`: solo para personas naturales; va grande y `nombre` (el negocio) debajo.
// - `logo`: archivo del logo, o "" si no hay (entonces solo se ve el nombre).
// - `placa`: "clara" (fondo blanco, por defecto) u "oscura" (para logos blancos).
// - `placaColor`: color de la placa, para logos que traen su propio fondo.
// - `fotos`: archivos; para ajustar el encuadre usa ["foto-1.jpg", "30% 50%"].
// - `plantilla`: "grupo" para fotos con varias personas (marco ancho); la primera foto va grande.
// - `vertical`: true cuando esa foto de grupo es vertical.
// - `fondo`: archivo para el fondo de la escena, si no debe ser una de las fotos de los marcos.

window.ENCUENTRO = {
  titulo: '17° Encuentro Red de Afiliados 2026',
  fecha: 'Jueves 5 de noviembre de 2026',
  lugar: 'Centro de Convenciones Aburrá Sur · Itagüí',

  capitulos: {
    25: { periodo: '2001 – 2026', texto: 'Por cinco lustros de existencia aportando al desarrollo y fortalecimiento de la industria de la región y el país.', video: 'assets/video/anos-25.mp4' },
    50: { periodo: '1976 – 2026', texto: 'Por cinco décadas de existencia aportando al desarrollo y fortalecimiento de la industria de la región y el país.', video: 'assets/video/anos-50.mp4' },
    75: { periodo: '1951 – 2026', texto: 'Por quince lustros de existencia aportando al desarrollo y fortalecimiento de la industria de la región y el país.', video: 'assets/video/anos-75.mp4' },
  },

  empresas: [
    { id: 'gehs', anos: 25, persona: 'Gloria Elena Herrera Sepúlveda', nombre: 'Almacén GEHS', logo: 'logo.png', fotos: ['foto-1.jpg', 'foto-2.jpg'] },
    { id: 'drogueria-cruz-blanca', anos: 25, persona: 'Hilda Amparo Pérez García', nombre: 'Droguería Cruz Blanca Sabaneta', logo: '', fotos: [['foto-1.jpg', '50% 72%'], ['foto-3.jpg', '50% 62%'], ['foto-2.jpg', '62% 58%']] },
    { id: 'credimuebles', anos: 25, persona: 'Bladimir Cano González', nombre: 'Almacén Credimuebles', logo: '', fotos: ['foto-1.jpg', 'foto-2.jpg', 'foto-3.jpg'] },
    { id: 'los-naranjos', anos: 25, persona: 'Blanca Nancy Correa Vanegas', nombre: 'Parqueadero Los Naranjos', logo: '', fotos: ['foto-1.jpg', 'foto-2.jpg', 'foto-3.jpg'] },
    { id: 'servipapel', anos: 25, persona: 'Silvana González Varela', nombre: 'Servipapel', logo: 'logo.png', plantilla: 'grupo', fotos: [['foto-1.jpg', '50% 55%'], 'foto-2.jpg', 'foto-3.jpg', 'foto-4.jpg'] },
    { id: 'agropecuaria-jj', anos: 25, persona: 'John Jairo Agudelo Ochoa', nombre: 'Agropecuaria J J', logo: 'logo.jpg', plantilla: 'grupo', fotos: [['foto-1.jpg', '50% 16%'], 'foto-2.jpg', ['foto-4.jpg', '50% 55%']] },
    { id: 'zlg', anos: 25, nombre: 'Zonalogística S.A.S. ZLG', logo: 'logo.png', plantilla: 'grupo', fotos: [['foto-2.jpg', '50% 68%'], 'foto-1.jpg', ['foto-3.jpg', '50% 56%']] },
    { id: 'distrimedical', anos: 25, nombre: 'Distrimedical S.A.S.', logo: 'logo.png', plantilla: 'grupo', fotos: ['foto-1.jpg', 'foto-4.jpg', ['foto-5.jpg', '50% 30%'], 'foto-3.jpg'] },
    { id: 'electromontajes', anos: 25, nombre: 'Electromontajes S.A.S.', logo: 'logo.png', fotos: [['foto-1.jpg', '32% 45%'], 'foto-2.jpg', 'foto-3.jpg', 'foto-4.jpg'] },
    { id: 'activa-sport', anos: 25, nombre: 'Activa Sport S.A.S.', logo: 'logo.png', placa: 'oscura', plantilla: 'grupo', fotos: ['foto-3.jpg', ['foto-1.jpg', '50% 30%'], ['foto-2.jpg', '50% 62%'], 'foto-4.jpg'] },
    { id: 'mayoritaria-bobinados', anos: 25, nombre: 'Mayoritaria de Bobinados S.A.S.', logo: 'logo.png', plantilla: 'grupo', fotos: [['foto-1.jpg', '50% 46%'], ['foto-2.jpg', '50% 55%'], ['foto-3.jpg', '50% 30%']] },
    { id: 'colplast', anos: 25, nombre: 'Colplast S.A.S.', logo: 'logo.png', plantilla: 'grupo', fotos: ['foto-3.jpg', ['foto-1.jpg', '50% 6%'], ['foto-2.jpg', '50% 8%'], 'foto-4.jpg'] },
    { id: 'boom', anos: 25, nombre: 'Supermercado Boom S.A.S.', logo: 'logo.png', fotos: ['foto-1.jpg', 'foto-2.jpg', 'foto-3.jpg'] },
    { id: 'incymec', anos: 25, nombre: 'Incymec Compañía Metalmecánica S.A.S.', logo: 'logo.png', plantilla: 'grupo', fotos: [['foto-2.jpg', '50% 40%'], ['foto-1.jpg', '50% 45%'], ['foto-3.jpg', '50% 50%']] },
    { id: 'alianza-mayorista', anos: 25, nombre: 'Alianza Mayorista S.A.S.', logo: 'logo-alima.png', fotos: ['foto-1.jpg', 'foto-2.jpg'] },
    { id: 'negocios-asociados', anos: 25, nombre: 'Negocios Asociados S.A.S.', logo: 'logo.png', placaColor: '#009c3d', plantilla: 'grupo', vertical: true, fotos: [['foto-1.jpg', '50% 72%'], ['foto-2.jpg', '62% 50%']] },
    { id: 'redihos', anos: 25, nombre: 'Representaciones y Distribuciones Hospitalarias S.A.S.', logo: 'logo.svg', plantilla: 'grupo', fotos: [['foto-2.jpg', '50% 58%'], ['foto-3.jpg', '60% 26%'], ['foto-1.jpg', '50% 40%'], 'foto-4.jpg'] },

    { id: 'automoviles-itagui', anos: 50, nombre: 'Automóviles Itagüí S.A.S.', logo: 'logo.png', placaColor: '#ebeae5', plantilla: 'grupo', fondo: 'foto-1.jpg', fotos: [['foto-1.jpg', '50% 55%'], ['foto-2.jpg', '50% 62%'], ['foto-3.jpg', '95% 35%']] },
    { id: 'colorquimica', anos: 50, nombre: 'Colorquímica S.A.S.', logo: 'logo.png', plantilla: 'grupo', fondo: 'fondo.jpg', fotos: [['foto-1.jpg', '50% 60%'], 'foto-2.jpg', 'foto-3.jpg'] },
    { id: 'industrias-gol', anos: 50, nombre: 'Industrias Metálicas Gol S.A.', logo: 'logo.png', plantilla: 'grupo', fotos: [['foto-2.jpg', '50% 58%'], ['foto-1.jpg', '50% 42%'], ['foto-3.jpg', '50% 45%']] },

    { id: 'contegral', anos: 75, nombre: 'Productora de Alimentos Concentrados para Animales Contegral S.A.S.', logo: 'logo.png', plantilla: 'grupo', fondo: 'foto-1.jpg', fotos: [['foto-1.jpg', '50% 45%'], ['foto-2.jpg', '50% 10%'], 'foto-3.jpg'] },
  ],

  junta: [
    { nombre: 'Diego Alonso Marín Monsalve', periodos: ['2010 – 2012', '2019 – 2026'] },
    { nombre: 'Pedro Montoya Muñoz', periodos: ['2019 – 2026'] },
    { nombre: 'Juan Felipe González García', periodos: ['2023 – 2026'] },
    { nombre: 'Juan Fernando Cano Hoyos', periodos: ['2019 – 2023', '2024 – 2025'] },
    { nombre: 'Daniel Esteban Gómez Cárdenas', periodos: ['2019 – 2025'] },
    { nombre: 'Claudia Patricia García Muñoz', periodos: ['2023 – 2026'] },
    { nombre: 'Juan Carlos Rico Llano', periodos: ['2010 – 2026'] },
    { nombre: 'Ledy Eugenia Vásquez Castillo', periodos: ['2023 – 2026'] },
  ],
};

// ============================================================================
//  SIVAN · Design Tokens
//  Único lugar para cambiar COLORES, ICONOS y GRADIENTES de toda la landing.
//  Cambia un valor aquí y se actualiza en toda la página.
// ============================================================================

/* ----------------------------- COLORES ----------------------------------- */
export const C = {
  // — Marca (azul SIVAN)
  blue:     '#2563EB',
  blueDeep: '#1D4FD7',
  blueSoft: '#60A5FA',
  blueWash: '#E8F1FF',
  blueLine: '#BFD3F7',

  // — Tinta / oscuros
  ink:  '#10131A',
  ink2: '#1A1E27',
  ink3: '#2A2F39',

  // — Neutros / superficies
  slate:    '#41464F',
  mut:      '#565D67',   // texto secundario (subido de contraste, antes #6B7280)
  mut2:     '#71777F',   // texto terciario (subido de contraste, antes #9AA0A8)
  label:    '#3A414B',   // etiquetas/eyebrows mono — fuerte y legible
  plat:     '#C9CDD3',
  line:     '#E3E4E8',
  cream:    '#F7F5F0',
  panel:    '#FFFFFF',
  panelAlt: '#ECEDEF',

  // — Gold (acentos premium)
  gold:     '#A88C52',
  goldLite: '#BFA46A',
  goldPale: '#E4D3A6',
  goldWash: '#FBF3E1',
  goldSoft: '#FBF8F1',
  goldLine: '#E8DBBE',

  // — Silver / Platino (Programa Fundadores — protagonista metálico)
  silver:     '#8e959e',  // acento texto plata
  silverMid:  '#656568',
  silverLite: '#b5b5b5',
  silverPale: '#E9ECF1',
  silverDark: '#8F9197',
  silverWash: '#F3F5F8',
  silverSoft: '#FAFBFD',
  silverLine: '#D3D9E1',
  silverMetal: '#A8A9AD',
  silverLight: '#D8DADE',
  platinum:    '#C9CDD3',
  pearl:       '#F8F9FA',

  // — Semánticos
  green:     '#1E9E6A',   // aceptación / publicado / en línea
  greenWash: '#EAF7F0',
  greenLine: '#BFE5D0',
  red:       '#E0382B',   // EN VIVO / urgente
  redDeep:   '#C0392B',
  redWash:   '#FDECEA',
  redLine:   '#F6CFC9',
  whatsapp:  '#25D366',
};

/* ---------------------------- GRADIENTES --------------------------------- */
export const GRAD = {
  blueText: `linear-gradient(100deg,${C.blue},${C.blueSoft})`,
  blueBar:  `linear-gradient(90deg,${C.blue},${C.blueSoft})`,
  blueBtn:  `linear-gradient(135deg,${C.blue},${C.blueSoft})`,
  gold:     `linear-gradient(135deg,${C.gold},${C.goldLite})`,
  goldBar:  `linear-gradient(90deg,${C.gold},${C.goldLite})`,
  goldSoft: `linear-gradient(160deg,${C.goldWash},#F6EBD2)`,
  // — Plata / platino metálico (Programa Fundadores)
  silverFrame: `linear-gradient(135deg,#D7DCE3,#7E8794 38%,#F4F6F9 60%,#9AA3AF 82%,#6E7783)`,
  silver:      `linear-gradient(135deg,${C.silverMid},${C.silverDark})`,
  silverSoft:  `linear-gradient(160deg,${C.silverSoft},${C.silverPale})`,
  silverBar:   `linear-gradient(90deg,${C.silverDark},${C.silverLite})`,
  //   Metálico plateado SUAVIZADO: conserva el satinado pero con menos contraste
  //   entre franjas (oscuros aclarados) para no robar legibilidad ni golpear textos.
  silverMetalStrong: `linear-gradient(115deg,#FFFFFF,#EDEFF2 16%,#D4D8DE 34%,#FAFBFC 50%,#D4D8DE 66%,#EDEFF2 84%,#FFFFFF 100%)`,
  silverMetalCard:   `linear-gradient(145deg,#FFFFFF 0%,#F3F4F6 24%,#DEE1E6 48%,#FAFBFC 62%,#E8EAEE 82%,#FFFFFF 100%)`,
  silverMetalBar:    `linear-gradient(90deg,#F3F4F6,#D4D8DE,#FFFFFF,#CDD1D7,#E8EAEE)`,
  // — Satinado plateado/perla SUAVE (fondo de las fichas) — sin patrón de
  //   cuadrícula: degradado limpio + sutil reflejo de luz superior-izquierda.
  silverPlate:     `radial-gradient(140% 120% at 12% -12%,rgba(255,255,255,.7),transparent 48%),linear-gradient(157deg,#F3F5F8 0%,#E2E6EC 50%,#EDEFF2 100%)`,
  silverPlateCard: `radial-gradient(150% 130% at 18% -14%,#FFFFFF,transparent 54%),linear-gradient(157deg,#FBFCFD 0%,#ECEFF2 56%,#F5F7F9 100%)`,
  // — Marco y texto dorado metalizado (brillo diagonal más contenido)
  goldFrame:    `linear-gradient(115deg,#D9C490,#A88C52 30%,#E9D7AE 50%,#BFA46A 70%,#8E7339)`,
  goldMetalBar: `linear-gradient(90deg,#8E7339,#D9C07F 45%,#A88C52,#C7AE70)`,
  // — Barras de métricas (colores tech variados)
  metricA:  `linear-gradient(90deg,#2563EB,#60A5FA)`,           // Consultas (azul)
  metricB:  `linear-gradient(90deg,#7C3AED,#A78BFA)`,           // Visitas (violeta)
  metricC:  `linear-gradient(90deg,#1E9E6A,#34D399)`,           // Cierres (verde)
  greenBar: `linear-gradient(90deg,${C.green},#34C98A)`,
  dark:     `linear-gradient(155deg,${C.ink2},${C.ink})`,
  darkFrame:`linear-gradient(135deg,${C.ink3},${C.ink})`,
};

/* ------------------------------ ASSETS ----------------------------------- */
// Rutas relativas (compatibles con `base: './'` de Vite, dev y build).
// WebP optimizado y redimensionado a ~2x del tamaño de uso (ver
// scripts/optimize-assets.mjs). Los PNG originales viven en .assets-original/.
export const ASSETS = {
  sivanLogo:  'assets/sivan-logo.webp',
  broxLogo:   'assets/brox-logo.webp',
  kairosLogo: 'assets/kairos-logo.webp',
  broxIcon:   'assets/brox-b.webp',
  kairosIcon: 'assets/Kairos-k.webp',
  casa:       'assets/casa-venta.webp',
};

/* ----------------------- HELPERS DE ESTILO (strings) --------------------- */
// Pequeños constructores reutilizables para mantener la codificación limpia.

// Píldora "EN VIVO" (rojo, como luz de transmisión).
export const liveBadge =
  `display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;`
  + `font-size:11px;font-weight:600;letter-spacing:.04em;color:${C.red};`
  + `background:${C.redWash};border:1px solid ${C.redLine};border-radius:999px;padding:5px 11px;`;

// Píldora de estado "aceptado / publicado / en línea" (verde).
export const okBadge =
  `display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;`
  + `font-size:11px;font-weight:600;letter-spacing:.04em;color:${C.green};`
  + `background:${C.greenWash};border:1px solid ${C.greenLine};border-radius:999px;padding:4px 11px;`;

// Punto pulsante reutilizable.
export const dot = (color) =>
  `width:7px;height:7px;border-radius:50%;flex:0 0 auto;background:${color};animation:sivanPulse 1.2s ease-in-out infinite;`;

// Texto/iconos en dorado metalizado (clip de gradiente), tono oscuro #8E7339
// dominante: conserva el satinado pero con alto contraste para leerse claro.
export const goldText =
  `background:linear-gradient(95deg,#6E5520,#A98A4B 42%,#8E7339 66%,#6E5520);`
  + `-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;`;

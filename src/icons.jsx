// ============================================================================
//  SIVAN · Iconos
//  SVG de marca/contacto + helpers para los iconos premium (PNG) y tendencias.
//  Para cambiar un icono de marca, edita su ruta en theme.js → ASSETS.
// ============================================================================
import { s } from './lib.jsx';
import { C, ASSETS } from './theme.js';

/* ---- Icono de marca premium (PNG dorado/plata) en marco corporativo ----- */
// kind: 'brox' | 'kairos'. `framed` envuelve el PNG en un marco oscuro.
export function BrandIcon({ kind = 'brox', size = 30, radius = 9, framed = true, glow }) {
  const src = kind === 'kairos' ? ASSETS.kairosIcon : ASSETS.broxIcon;
  const pad = Math.round(size * 0.16);
  const ring = kind === 'kairos' ? 'rgba(96,165,250,.55)' : 'rgba(191,164,106,.6)';
  const frame =
    `display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;`
    + `width:${size}px;height:${size}px;border-radius:${radius}px;padding:${pad}px;`
    + (framed
        ? `background:linear-gradient(135deg,${C.ink3},${C.ink});`
          + `box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 8px 20px -10px rgba(16,19,26,.7)`
          + (glow ? `,0 0 0 2px ${ring}` : '') + ';'
        : '');
  return (
    <span style={s(frame)}>
      <img src={src} alt={kind.toUpperCase()} loading="lazy" decoding="async"
        style={s(`width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 2px 6px rgba(16,19,26,.35));`)} />
    </span>
  );
}

/* ---- Eyebrow: etiqueta mono visible (línea + texto) --------------------- */
// tone: 'slate' | 'blue' | 'gold' | 'silver' | 'red' | un color hex.
export function Eyebrow({ children, tone = 'slate', style = '' }) {
  const map = { slate: C.label, blue: C.blue, gold: '#7A6428', silver: C.silverDark, red: C.red };
  const col = map[tone] || tone;
  return (
    <span style={s(
      "display:inline-flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;"
      + 'font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:' + col + ';' + style)}>
      <span style={s('width:20px;height:2px;border-radius:2px;flex:0 0 auto;background:' + col + ';')} />
      {children}
    </span>
  );
}

/* ---- Tendencia al alza (flecha verde donde un valor se actualiza) -------- */
export function Trend({ label = 'live', size = 11 }) {
  return (
    <span style={s(
      `display:inline-flex;align-items:center;gap:3px;font-family:'JetBrains Mono',monospace;`
      + `font-size:${size}px;font-weight:600;color:${C.green};`
      + `background:${C.greenWash};border:1px solid ${C.greenLine};border-radius:999px;padding:2px 7px 2px 5px;`)}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
        style={{ animation: 'sivanArrowUp 1.4s ease-in-out infinite' }}>
        <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke={C.green} strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}

/* ---- Glifo flecha arriba suelto (para junto a números) ------------------ */
export function ArrowUp({ size = 12, color = C.green }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ animation: 'sivanArrowUp 1.4s ease-in-out infinite' }}>
      <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke={color} strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- Glifo persona (asientos del Programa Fundadores) ------------------- */
export function PersonGlyph({ size = 15, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6Z" />
    </svg>
  );
}

/* ---- Fuentes dispersas: marcas reconocibles + símbolos operativos ------- */
function ExcelIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#107C41" d="M4.2 2.8 14 1v22L4.2 21.2A1.5 1.5 0 0 1 3 19.7V4.3a1.5 1.5 0 0 1 1.2-1.5Z" />
      <path fill="#185C37" d="M14 4h6.2c.44 0 .8.36.8.8v14.4c0 .44-.36.8-.8.8H14V4Z" />
      <path fill="#21A366" d="M14 7h7v3h-7zM14 13h7v3h-7z" />
      <path fill="#fff" d="m6.15 7.1 1.8-.1 1.15 2.5L10.4 6.9l1.78-.1-2.1 4.92 2.2 5.2-1.9-.12-1.34-3.02-1.34 2.86-1.83-.12 2.2-4.8-1.92-4.62Z" />
    </svg>
  );
}

function CalendarIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M4 3h16a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path fill="#4285F4" d="M2 8h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z" />
      <path fill="#EA4335" d="M4 2h16a2 2 0 0 1 2 2v4H2V4a2 2 0 0 1 2-2Z" />
      <path fill="#FBBC04" d="M2 8h4v14H4a2 2 0 0 1-2-2V8Z" />
      <path fill="#34A853" d="M18 8h4v12a2 2 0 0 1-2 2h-2V8Z" />
      <path fill="#fff" d="M9.1 11.3c.25-.2.63-.38 1.12-.54.49-.16 1.02-.24 1.58-.24.83 0 1.5.2 2 .6.5.4.75.93.75 1.6 0 .43-.12.82-.35 1.15-.23.34-.56.59-.97.76v.05c.52.15.92.42 1.2.8.28.38.42.84.42 1.38 0 .8-.3 1.44-.9 1.92-.6.48-1.39.72-2.36.72-1.12 0-2.05-.3-2.79-.9l.77-1.2c.57.43 1.2.65 1.9.65.48 0 .88-.11 1.18-.33.3-.22.45-.53.45-.93 0-.78-.58-1.17-1.75-1.17h-.86v-1.35h.75c1.05 0 1.58-.36 1.58-1.08 0-.33-.12-.58-.37-.76-.25-.18-.57-.27-.97-.27-.6 0-1.15.18-1.66.54l-.72-1.17Z" />
    </svg>
  );
}

export function SourceIcon({ type, size = 20 }) {
  if (type === 'whatsapp') return <WhatsAppIcon size={size} />;
  if (type === 'excel') return <ExcelIcon size={size} />;
  if (type === 'calendar') return <CalendarIcon size={size} />;
  if (type === 'notes') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.2 3.2h9.7L20.8 8v12.2c0 .88-.72 1.6-1.6 1.6h-13c-.88 0-1.6-.72-1.6-1.6V4.8c0-.88.72-1.6 1.6-1.6Z" fill="currentColor" opacity=".17" />
      <path d="M15.8 3.2V8h5M8.2 12h8M8.2 15.5h6.4M8.2 19h4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === 'alert') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.55 3.7 2.3 18a1.65 1.65 0 0 0 1.43 2.48h16.54A1.65 1.65 0 0 0 21.7 18L13.45 3.7a1.67 1.67 0 0 0-2.9 0Z" fill="currentColor" opacity=".15" />
      <path d="M10.55 3.7 2.3 18a1.65 1.65 0 0 0 1.43 2.48h16.54A1.65 1.65 0 0 0 21.7 18L13.45 3.7a1.67 1.67 0 0 0-2.9 0ZM12 9v4.5M12 17.2v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="m7.1 7.1 9.8 9.8M9 12h5.8M14.8 12l-2.2-2.2M14.8 12l-2.2 2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProcessIcon({ type, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (type === 'conversation') return (
    <svg {...common}><path d="M7.5 16.5 4 19v-4.2A6.5 6.5 0 0 1 3 11.3V9.5A5.5 5.5 0 0 1 8.5 4h5A5.5 5.5 0 0 1 19 9.5v1A5.5 5.5 0 0 1 13.5 16h-4.2c-.62 0-1.23.17-1.8.5Z" /><path d="M8 9h6M8 12h4" /></svg>
  );
  if (type === 'context') return (
    <svg {...common}><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /><path d="m12 7 .7 2.3L15 10l-2.3.7L12 13l-.7-2.3L9 10l2.3-.7L12 7ZM17 12l.45 1.55L19 14l-1.55.45L17 16l-.45-1.55L15 14l1.55-.45L17 12Z" /></svg>
  );
  if (type === 'priority') return (
    <svg {...common}><path d="m12 3 2.55 5.16 5.7.83-4.12 4.02.97 5.68L12 16l-5.1 2.69.97-5.68L3.75 9l5.7-.83L12 3Z" /><path d="M12 8.2v3.4M12 14.2v.1" /></svg>
  );
  if (type === 'action') return (
    <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M7.5 12h9M13 8.5l3.5 3.5-3.5 3.5" /></svg>
  );
  return (
    <svg {...common}><path d="M20 11a8 8 0 1 1-2.35-5.65" /><path d="M20 4v7h-7M8.5 12l2.2 2.2 4.8-5" /></svg>
  );
}

/* ------------------------------- Redes ----------------------------------- */
export function WhatsAppIcon({ size = 19 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>);
}
export function MailIcon({ size = 19 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67Z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908Z" /></svg>);
}
export function InstagramIcon({ size = 19 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 6.85A5.15 5.15 0 1 1 12 17.15 5.15 5.15 0 0 1 12 6.85Zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7Z" /></svg>);
}
export function FacebookIcon({ size = 19 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>);
}
export function TikTokIcon({ size = 19 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>);
}
export function YouTubeIcon({ size = 20 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>);
}

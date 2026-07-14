import { useEffect, useRef, useState } from 'react';

/* ============================================================================
   KAIROS · Teléfono 3D (animación WhatsApp)
   Port nativo de "KAIROS Telefono 3D.dc.html" (design project d2cbb7f5…).
   Reproduce una vez la escena "Operación" con un ritmo pausado:
   un teléfono 3D con marco cromado reproduciendo una conversación de
   WhatsApp de KAIROS Inmobiliaria (aparición de mensajes, "escribiendo…",
   tarjeta de propiedad y auto-scroll). Se escala para calzar en su columna.
   ========================================================================== */

/* base design units of the phone (from the source scene) */
const BASE_W = 620;
const BASE_H = 1300;
const MAX_W = 340; // cap so the phone stays tasteful inside the column
const SCENE_END = 13.2; // unidades de la coreografía original
const DURATION_MS = 30000; // reproducción lenta, una sola vez

/* ---------- timing helpers (verbatim from the scene) ---------- */
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const seg = (t, a, b) => clamp01((t - a) / (b - a));
const lerp = (a, b, x) => a + (b - a) * x;
const easeOut = (x) => 1 - Math.pow(1 - x, 3);

/* ---------- palette ---------- */
const C = {
  waHeader: '#008069', waBg: '#efeae2', waOut: '#d9fdd3', waIn: '#ffffff',
  waTick: '#53bdeb', waText: '#111b21', waMeta: '#667781',
};
const CHROME = 'linear-gradient(118deg, #eef3f8 0%, #aeb9c6 24%, #586373 52%, #aeb9c6 78%, #eef3f8 100%)';
const HELV = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* WhatsApp doodle wallpaper (subtle, tileable) */
const DOODLE = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'>
<g fill='none' stroke='%23d3cbbe' stroke-width='2.2' stroke-linecap='round' opacity='0.55'>
<path d='M30 40 q10 -14 20 0 q10 14 20 0'/><circle cx='120' cy='30' r='11'/>
<path d='M110 30 h20 M120 20 v20'/><path d='M200 50 l10 -18 l10 18 z'/>
<path d='M250 30 q14 6 0 18 q-14 -12 0 -18'/><rect x='40' y='110' width='26' height='20' rx='4'/>
<path d='M46 110 v-8 h14 v8'/><path d='M150 120 c-14 -16 -34 4 0 22 c34 -18 14 -38 0 -22'/>
<circle cx='230' cy='115' r='13'/><path d='M224 118 q6 8 12 0'/><circle cx='226' cy='111' r='1.6'/><circle cx='234' cy='111' r='1.6'/>
<path d='M40 210 q16 -20 32 0'/><path d='M40 210 h32'/><path d='M130 200 l8 8 l-8 8 l-8 -8 z'/>
<path d='M210 195 h34 l-6 26 h-22 z'/><path d='M214 195 v-8 h26 v8'/><path d='M60 260 q20 -10 0 -20 q-20 10 0 20'/>
<circle cx='150' cy='265' r='10'/><path d='M150 265 l7 -5'/><path d='M235 255 q10 -14 20 0 q10 14 20 0'/>
</g></svg>`);

/* ---------- chat script (14 s beat) ---------- */
const MESSAGES = [
  { id: 'm1', side: 'out', at: 1.2, text: 'Hola! Vi el depa en Miraflores 👀 ¿sigue disponible?' },
  { id: 'm2', side: 'in', at: 3.8, text: '¡Hola Andrés! 😊 Claro que sí, sigue disponible. Es un 2 dormitorios en Miraflores a 200 mil dólares. ¿Lo buscas para vivir o como inversión?' },
  { id: 'm3', side: 'out', at: 5.4, text: 'Para vivir 🙌 mi tope es justo ~200k' },
  { id: 'card', side: 'in', at: 7.6, card: true },
  { id: 'm5', side: 'in', at: 8.9, text: 'Encaja perfecto con lo que buscas ✨ Vista panorámica, sala amplia y balcón. ¿Te agendo una visita mañana 5:00 pm? 📍' },
  { id: 'm6', side: 'out', at: 10.3, text: 'Perfecto ✅' },
  { id: 'm7', side: 'in', at: 12.0, text: '¡Listo Andrés! Visita confirmada 🎉 Te acabo de enviar la ubicación. ¡Nos vemos mañana!' },
];

const FRAME_SHADOW = '0 0 0 2px rgba(255,255,255,.42), -16px 20px 42px rgba(5,10,22,.28), 10px 34px 66px rgba(5,10,22,.38), 0 58px 90px rgba(0,0,0,.28)';

function Typing({ show, tick }) {
  if (show <= 0) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: show, padding: '3px 0' }}>
      <div style={{ background: C.waIn, borderRadius: '10px 10px 10px 3px', padding: '18px 22px', display: 'flex', gap: 9, boxShadow: '0 1px 1px rgba(0,0,0,0.13)' }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: '#9aa6ad',
            transform: `translateY(${Math.sin(tick / 180 + i * 0.9) * 3 - 3}px)`,
            opacity: 0.5 + (Math.sin(tick / 180 + i * 0.9) * 0.5 + 0.5) * 0.5 }} />
        ))}
      </div>
    </div>
  );
}

function PropertyCard() {
  return (
    <div style={{ width: '82%', background: C.waIn, borderRadius: '12px 12px 12px 3px', padding: 6, boxShadow: '0 1px 1px rgba(0,0,0,0.13)', fontFamily: HELV }}>
      <div style={{ position: 'relative', borderRadius: 9, overflow: 'hidden', height: 300 }}>
        <img src="assets/depa-venta.webp" alt="Depto en Miraflores" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.62)', color: '#fff', fontSize: 20, fontWeight: 600, padding: '6px 14px', borderRadius: 999 }}>📍 Miraflores</div>
      </div>
      <div style={{ padding: '12px 10px 8px' }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.waText }}>Depto en Miraflores</div>
        <div style={{ fontSize: 23, color: '#54656f', marginTop: 3 }}>2 dorm · 2 baños · 82 m² · Vista panorámica</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <div style={{ fontSize: 38, fontWeight: 800, color: '#027a63', letterSpacing: '-0.5px' }}>USD 200,000</div>
          <span style={{ fontSize: 20, color: C.waMeta, position: 'relative', top: 8 }}>9:41 <span style={{ color: C.waTick, letterSpacing: '-3px' }}>✓✓</span></span>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg, reveal }) {
  if (reveal <= 0) return null;
  const e = easeOut(reveal);
  const out = msg.side === 'out';
  const wrap = {
    display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start',
    opacity: e, transform: `translateY(${(1 - e) * 20}px) scale(${lerp(0.96, 1, e)})`,
    padding: '3px 0', transformOrigin: out ? 'bottom right' : 'bottom left',
  };
  if (msg.card) return <div style={wrap}><PropertyCard /></div>;
  const bubble = {
    maxWidth: '80%', padding: '14px 16px 12px', fontSize: 30, lineHeight: 1.35, fontFamily: HELV,
    position: 'relative', boxShadow: '0 1px 1px rgba(0,0,0,0.13)', color: C.waText,
    background: out ? C.waOut : C.waIn,
    borderRadius: out ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
  };
  return (
    <div style={wrap}>
      <div style={bubble}>
        {msg.text}
        <span style={{ float: 'right', display: 'inline-flex', alignItems: 'center', gap: 5, marginLeft: 12, marginTop: 8, fontSize: 20, color: C.waMeta, position: 'relative', top: 6 }}>
          <span>9:41</span>
          {out && <span style={{ color: C.waTick, fontWeight: 700, letterSpacing: '-3px' }}>✓✓</span>}
        </span>
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div style={{ position: 'relative', zIndex: 20, background: 'linear-gradient(135deg, #087D6B, #008B75)', padding: '70px 18px 16px', display: 'flex', alignItems: 'center', gap: 13, fontFamily: HELV, boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
      <div style={{ width: 28, height: 44, color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <svg width="26" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 19-7-7 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ position: 'relative', width: 60, height: 60, flexShrink: 0, borderRadius: '50%', background: 'linear-gradient(145deg, #17213C, #091127)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid rgba(255,255,255,.22)', boxShadow: '0 4px 14px rgba(0,0,0,.2)' }}>
        <img src="assets/kairos-isotipo.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <span style={{ position: 'absolute', right: 1, bottom: 1, width: 14, height: 14, borderRadius: '50%', background: '#25D366', border: '3px solid #087D6B' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontSize: 27, fontWeight: 700, letterSpacing: '-0.2px', whiteSpace: 'nowrap' }}>KAIROS Inmobiliaria</div>
        <div style={{ color: '#D8F4EE', fontSize: 19, marginTop: 2 }}>en línea</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 17, color: '#fff', opacity: 0.96, flexShrink: 0 }}>
        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 9.3 20.1 6a.6.6 0 0 1 .9.5v11a.6.6 0 0 1-.9.5L15 14.7V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.3Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.12 3.8 2 2 0 0 1 3.11 1.6h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.64 2.62a2 2 0 0 1-.45 2.11L7.03 9.32a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.3 1.72.52 2.62.64A2 2 0 0 1 21 16.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
}

function ChatInputBar() {
  const iconWrap = { display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
  return (
    <div style={{ position: 'relative', zIndex: 20, background: C.waBg, padding: '12px 16px 30px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, background: '#fff', borderRadius: 999, padding: '12px 18px', color: '#8696a0', fontSize: 26, fontFamily: HELV, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" style={iconWrap}>
          <circle cx="12" cy="12" r="9.2" /><circle cx="8.7" cy="10" r="1.1" fill="#8696a0" stroke="none" /><circle cx="15.3" cy="10" r="1.1" fill="#8696a0" stroke="none" />
          <path d="M8.2 14.2c1 1.4 2.4 2.1 3.8 2.1s2.8-.7 3.8-2.1" strokeLinecap="round" />
        </svg>
        <span style={{ flex: 1 }}>Mensaje</span>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={iconWrap}>
          <path d="M20 11.5l-7.6 7.6a4.4 4.4 0 0 1-6.2-6.2l8-8a2.9 2.9 0 0 1 4.1 4.1l-8 8a1.4 1.4 0 0 1-2-2l7.3-7.3" />
        </svg>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={iconWrap}>
          <path d="M4 8h3l1.4-2h7.2L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13" r="3.2" />
        </svg>
      </div>
      <div style={{ width: 66, height: 66, borderRadius: '50%', background: C.waHeader, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 15a3.2 3.2 0 0 0 3.2-3.2V6.2a3.2 3.2 0 1 0-6.4 0v5.6A3.2 3.2 0 0 0 12 15z" />
          <path d="M17.6 11.4a5.6 5.6 0 0 1-11.2 0" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 17v3M9 20.5h6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function Phone({ powerOn, scrollY, tick, T }) {
  const bubbles = MESSAGES.map((m) => <Bubble key={m.id} msg={m} reveal={seg(T, m.at, m.at + 0.5)} />);
  const typing = Math.max(
    seg(T, 2.0, 3.7) * (1 - seg(T, 3.55, 3.7)),
    seg(T, 6.0, 7.5) * (1 - seg(T, 7.4, 7.5)),
    seg(T, 10.9, 11.9) * (1 - seg(T, 11.8, 11.9)),
  );
  return (
    <div style={{ position: 'absolute', inset: 0, transform: 'perspective(2400px) rotateX(.35deg)', transformOrigin: 'center center' }}>
      <div style={{ position: 'absolute', left: -13, top: 178, width: 12, height: 54, borderRadius: '7px 0 0 7px', background: 'linear-gradient(90deg, #313C4D, #AAB5C2)', boxShadow: '-3px 3px 8px rgba(0,0,0,.2)' }} />
      <div style={{ position: 'absolute', left: -13, top: 270, width: 12, height: 122, borderRadius: '7px 0 0 7px', background: 'linear-gradient(90deg, #313C4D, #AAB5C2)', boxShadow: '-3px 3px 8px rgba(0,0,0,.2)' }} />
      <div style={{ position: 'absolute', left: -13, top: 420, width: 12, height: 122, borderRadius: '7px 0 0 7px', background: 'linear-gradient(90deg, #313C4D, #AAB5C2)', boxShadow: '-3px 3px 8px rgba(0,0,0,.2)' }} />
      <div style={{ position: 'absolute', right: -9, top: 330, width: 9, height: 176, borderRadius: '0 6px 6px 0', background: 'linear-gradient(90deg, #AAB5C2, #3B4656)' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 76, background: CHROME, padding: 9, boxShadow: FRAME_SHADOW }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 69, background: '#05070c', padding: 12, boxShadow: 'inset 0 0 0 2px rgba(255,255,255,.12), inset 8px 0 13px rgba(255,255,255,.045)' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 58, overflow: 'hidden', background: C.waBg }}>
            <div style={{ position: 'absolute', inset: 0, background: '#02040a', zIndex: 60, opacity: 1 - clamp01(powerOn) }} />
            <div style={{ position: 'absolute', inset: 0, opacity: clamp01(powerOn * 1.3), display: 'flex', flexDirection: 'column' }}>
              <ChatHeader />
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: `${C.waBg} url("${DOODLE}")`, backgroundSize: '360px 360px' }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, padding: '16px 18px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '100%', transform: `translateY(${-scrollY}px)` }}>
                  {bubbles}
                  <Typing show={typing} tick={tick} />
                </div>
              </div>
              <ChatInputBar />
            </div>
            <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', width: 150, height: 42, background: '#000', borderRadius: 22, zIndex: 70, opacity: clamp01(powerOn) }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 80, pointerEvents: 'none', borderRadius: 58, background: 'linear-gradient(112deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.08) 100%)' }} />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 4, left: 62, right: 62, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.7)', zIndex: 90 }} />
    </div>
  );
}

export default function KairosPhone() {
  const slotRef = useRef(null);
  const [scale, setScale] = useState(MAX_W / BASE_W);
  const [progress, setProgress] = useState(0);

  // responsive scale: fit the column, capped at MAX_W
  useEffect(() => {
    const el = slotRef.current;
    if (!el) return undefined;
    const measure = () => {
      const avail = el.clientWidth || MAX_W;
      setScale(Math.min(avail, MAX_W) / BASE_W);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reproduce una sola vez; al salir de pantalla se pausa y luego continúa.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return undefined;
    }
    const el = slotRef.current;
    let raf = 0; let lastFrame = null; let elapsed = 0; let completed = false;
    const loop = (now) => {
      if (lastFrame != null) elapsed += now - lastFrame;
      lastFrame = now;
      const next = Math.min(1, elapsed / DURATION_MS);
      setProgress(next);
      if (next < 1) raf = requestAnimationFrame(loop);
      else { raf = 0; completed = true; }
    };
    const start = () => { if (!raf && !completed) { lastFrame = null; raf = requestAnimationFrame(loop); } };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; lastFrame = null; } };
    let io;
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { e.isIntersecting ? start() : stop(); }, { threshold: 0.05 });
      io.observe(el);
    } else { start(); }
    return () => { stop(); io?.disconnect(); };
  }, []);

  const T = progress * SCENE_END;
  const powerOn = seg(T, 0.4, 1.1);
  const scrollY =
    lerp(0, 40, seg(T, 3.8, 4.6)) +
    lerp(0, 150, seg(T, 7.4, 8.2)) +
    lerp(0, 230, seg(T, 8.9, 9.7)) +
    lerp(0, 320, seg(T, 11.8, 12.7));

  return (
    <div className="kphone-slot reveal" ref={slotRef} aria-label="Demostración: conversación de WhatsApp con KAIROS Inmobiliaria en un teléfono">
      <div className="kphone" style={{ width: BASE_W * scale, height: BASE_H * scale }}>
        <div className="kphone__stage" style={{ transform: `scale(${scale})` }}>
          <Phone powerOn={powerOn} scrollY={scrollY} tick={progress * DURATION_MS} T={T} />
        </div>
      </div>
    </div>
  );
}

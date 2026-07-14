import { useEffect, useMemo, useRef, useState } from 'react';
import { FacebookIcon, InstagramIcon, ProcessIcon, SourceIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from './icons.jsx';
import { SOCIAL, WPP_FOUNDER_URL, WPP_URL } from './contact.js';
import KairosPhone from './KairosPhone.jsx';

/* ============================================================================
   SIVAN Solutions — Landing v3
   Ported from Claude Design handoff "SIVAN Landing v3.dc.html".
   In-page CTAs funnel to #contacto; the final CTA carries the real actions
   (WhatsApp + /diagnostico).
   ========================================================================== */

const DIAG_URL = '/diagnostico';

// Cohort seats (was the `cuposOcupados` prop in the design).
const CUPOS = 12;
const QUEDAN = 20 - CUPOS;
const PCT = Math.round((CUPOS / 20) * 100);
const COHORTE_TXT = `${CUPOS}/20`;
const FICHA_NUM = String(Math.min(CUPOS + 1, 20)).padStart(3, '0');

const navItems = [
  ['metodo', 'Método'],
  ['kairos', 'KAIROS · IA'],
  ['brox', 'BROX · IA'],
  ['programa', 'Programa', true],
  ['preguntas', 'Preguntas'],
];

const dispersos = [
  { icon: 'whatsapp', nombre: 'WhatsApp', detalle: 'Conversaciones sin seguimiento' },
  { icon: 'excel', nombre: 'Excel sueltos', detalle: 'Datos duplicados' },
  { icon: 'calendar', nombre: 'Calendario', detalle: 'Visitas en otro lugar' },
  { icon: 'notes', nombre: 'Notas sueltas', detalle: 'Sin contexto' },
  { icon: 'alert', nombre: 'Alertas perdidas', detalle: 'Seguimientos que se escapan' },
  { icon: 'no-action', nombre: 'Sin próxima acción', detalle: 'Tareas sin responsable' },
];

const problemas = [
  { icon: 'whatsapp', nombre: 'WhatsApp', detalle: 'Conversaciones sin seguimiento' },
  { icon: 'excel', nombre: 'Excel sueltos', detalle: 'Datos duplicados o desactualizados' },
  { icon: 'calendar', nombre: 'Calendario', detalle: 'Visitas y tareas en otro lugar' },
  { icon: 'notes', nombre: 'Notas sueltas', detalle: 'Información sin contexto' },
  { icon: 'alert', nombre: 'Alertas perdidas', detalle: 'Seguimientos que se escapan' },
  { icon: 'no-action', nombre: 'Sin próxima acción', detalle: 'Tareas sin responsable o fecha' },
];

const avgChaos = [
  { i: '💬', t: 'Chats dispersos' },
  { i: '▤', t: 'Excel sin actualizar' },
  { i: '▦', t: 'Visita aislada' },
  { i: '!', t: 'Seguimiento vencido', alarm: true },
  { i: '?', t: 'Sin responsable' },
];

const pasosPro = [
  { n: '1', titulo: 'Contexto extraído', tag: 'KAIROS entiende' },
  { n: '2', titulo: 'Etapa visible', tag: 'BROX relaciona' },
  { n: '3', titulo: 'Responsable asignado', tag: 'Control visible' },
  { n: '4', titulo: 'Próxima acción', tag: 'Seguimiento activo' },
  { n: '5', titulo: 'Prioridad detectada', tag: 'Atender ahora' },
];

const ecosystem = [
  { type: 'kairos', n: '01', tag: 'CONTEXTO', logo: 'assets/kairos-logo.webp', alt: 'KAIROS', title: 'Entiende cada conversación.', text: 'IA conversacional que identifica necesidad, presupuesto, urgencia e intención.' },
  { type: 'brox', n: '02', tag: 'OPERACIÓN', logo: 'assets/brox-logo.webp', alt: 'BROX', title: 'Convierte contexto en acción.', text: 'IA operativa que prioriza, relaciona información y muestra qué necesita atención.' },
  { type: 'sivan', n: '03', tag: 'METODO', logo: 'assets/sivan-logo.webp', alt: 'SIVAN', title: 'Lo convierte en una forma real de trabajar.', text: 'Aporta el método, tecnología y seguimiento conectados con tu operación.' },
];

const etapaData = [
  {
    nombre: 'Prospección',
    decision: 'Identifica propietarios con mayor probabilidad de vender o alquilar.',
    kairos: 'Analiza conversaciones, consultas y señales de intención.',
    brox: 'Centraliza prospectos, fuentes y próximos contactos.',
    senal: 'Prospectos con intención detectados',
    medida: 'N.º de prospectos calificados',
    cta: 'Encontrar oportunidades'
  },
  {
    nombre: 'Captación',
    decision: 'Prioriza propietarios y presenta una propuesta basada en información real.',
    kairos: 'Resume motivación, urgencia y expectativa de precio.',
    brox: 'Controla reuniones, seguimientos y acuerdos pendientes.',
    senal: 'Propietarios listos para captar',
    medida: '% de reuniones convertidas',
    cta: 'Preparar propuesta'
  },
  {
    nombre: 'Validación',
    decision: 'Contrasta el precio y las condiciones frente a propiedades similares.',
    kairos: 'Compara referencias del mercado y detecta posibles desajustes comerciales.',
    brox: 'Organiza comparables, observaciones y ajustes recomendados.',
    senal: 'Propiedad alineada al mercado',
    medida: '% de propiedades competitivas',
    cta: 'Evaluar posicionamiento'
  },
  {
    nombre: 'Preparación',
    decision: 'Convierte la información del inmueble en una presentación competitiva.',
    kairos: 'Genera atributos, descripción y argumentos comerciales.',
    brox: 'Controla fotos, ficha técnica, precio y aprobaciones.',
    senal: 'Inmuebles listos para publicar',
    medida: 'Tiempo promedio de preparación',
    cta: 'Generar presentación'
  },
  {
    nombre: 'Publicación',
    decision: 'Publica cada inmueble en los canales con mayor potencial.',
    kairos: 'Adapta el anuncio para portales, redes sociales y WhatsApp.',
    brox: 'Compara consultas, alcance y velocidad de respuesta.',
    senal: 'Publicaciones que generan consultas',
    medida: 'Consultas por publicación',
    cta: 'Potenciar publicación'
  },
  {
    nombre: 'Interesados',
    decision: 'Prioriza compradores o arrendatarios con capacidad e intención real.',
    kairos: 'Detecta presupuesto, necesidad, urgencia y objeciones.',
    brox: 'Ordena visitas, seguimientos y próximos pasos.',
    senal: 'Interesados realmente calificados',
    medida: '% de consultas calificadas',
    cta: 'Priorizar interesados'
  },
  {
    nombre: 'Negociación',
    decision: 'Negocia con el historial completo de cada operación.',
    kairos: 'Resume ofertas, objeciones, acuerdos y márgenes de negociación.',
    brox: 'Controla propuestas, contrapropuestas y tiempos de respuesta.',
    senal: 'Negociaciones con oferta activa',
    medida: '% de visitas con oferta',
    cta: 'Definir siguiente acción'
  },
  {
    nombre: 'Formalización',
    decision: 'Concreta la operación y registra cada cierre para medir tu rendimiento comercial.',
    kairos: 'Resume los acuerdos finales y consolida la información de la operación.',
    brox: 'Registra cierres, montos, fechas y resultados para identificar patrones de desempeño.',
    senal: 'Operaciones concretada',
    medida: '% de ofertas que cierran',
    cta: 'Asegurar el cierre'
  }
];

const extracciones = ['Necesidad: departamento', 'Presupuesto: US$ 200K', 'Distrito: Miraflores', 'Intención: alta', 'Visita: sábado 5:00 p.m.'];

const broxNav = ['Dashboard', 'Captaciones', 'Oportunidades', 'Visitas', 'Interacciones', 'Reportes'];

const TAG_TONE = {
  AHORA: ['#1D4ED8', 'rgba(29,78,216,.1)'],
  HOY: ['#A07C22', 'rgba(212,175,55,.14)'],
  RIESGO: ['#DC2626', 'rgba(220,38,38,.09)'],
  REVISAR: ['#1D4ED8', 'rgba(29,78,216,.1)'],
  EQUIPO: ['#1D4ED8', 'rgba(29,78,216,.1)'],
  DECIDIR: ['#A07C22', 'rgba(212,175,55,.14)'],
};

const broxViews = {
  individual: {
    label: 'Individual', owner: 'Iván R.',
    kpis: [['18', 'captaciones'], ['07', 'operaciones'], ['03', 'prioridades']],
    prio: [
      ['Confirmar visita', 'Miraflores · vence 10:30', 'AHORA'],
      ['Enviar reporte', 'Casa Surco · propietario', 'HOY'],
      ['Recontactar interesado', '4 días sin respuesta', 'RIESGO'],
    ],
  },
  agencia: {
    label: 'Agencia', owner: 'Agencia Centro',
    kpis: [['46', 'captaciones'], ['21', 'operaciones'], ['08', 'prioridades']],
    prio: [
      ['Aprobar publicación', 'San Isidro · ficha al 92%', 'REVISAR'],
      ['Asignar interesado', 'US$ 180K · alta intención', 'AHORA'],
      ['Cerrar resultado visita', '2 agentes pendientes', 'RIESGO'],
    ],
  },
  equipo: {
    label: 'Equipo', owner: 'Equipo comercial',
    kpis: [['84', 'captaciones'], ['37', 'operaciones'], ['12', 'prioridades']],
    prio: [
      ['6 captaciones por revisar', 'Expedientes esperando decisión', 'EQUIPO'],
      ['3 recontactos vencidos', 'Seguimiento fuera de plazo', 'RIESGO'],
      ['Rebalancear carga', 'Lucía R. · 14 operaciones', 'DECIDIR'],
    ],
  },
};

const resultados = ['Interesado calificado', 'Propiedad vinculada', 'Visita programada', 'Ficha entregada', 'Solicitud pendiente'];

const niveles = {
  dos: { chips: ['Prospección', 'Captación', 'Validación'], title: 'Cómo se origina cada operación', meta: 'SIGUIENTE PASO', soon: 'Disponible al completar el Nivel 1.' },
  tres: { chips: ['Bots', 'Automatizaciones', 'Digitalización web', 'Contenido para redes', 'Vibecoding · IA inmobiliaria'], title: 'Tecnología avanzada', meta: 'ESPECIALIZACIÓN', soon: 'Requiere mayor preparación técnica.' },
};

const procesosData = [
  { sem: '01', etapaTag: 'ETAPA 04 DE 08', nombre: 'Preparación', objetivo: 'Ahorra horas en el contenido de cada propiedad', desc: 'Aprendes a producir con IA el contenido audiovisual de la propiedad que vas a publicar — fotos, video y ficha comercial — en una fracción del tiempo.', puntos: ['Guion, ficha y descripciones generados con IA', 'Material audiovisual listo para publicar', 'Horas de preparación convertidas en minutos'], chips: ['IA generativa', 'Contenido audiovisual'] },
  { sem: '02', etapaTag: 'ETAPA 05 DE 08', nombre: 'Publicación', objetivo: 'Invierte donde está tu comprador real', desc: 'Con estrategia e IA reconoces el público objetivo real de tu propiedad, priorizas los medios de difusión donde invertir primero y configuras campañas automatizadas.', puntos: ['Público objetivo real identificado con IA', 'Medios de difusión priorizados para invertir', 'Campañas automatizadas configuradas'], chips: ['Segmentación con IA', 'Campañas automatizadas'] },
  { sem: '03', etapaTag: 'ETAPA 06 DE 08', nombre: 'Interesados', objetivo: 'Cero tiempo perdido con curiosos', desc: 'Pruebas KAIROS y BROX sobre tus consultas reales para calificar a cada interesado y dedicar tu agenda solo a quien va en serio.', puntos: ['KAIROS extrae necesidad, presupuesto y urgencia', 'BROX prioriza a los interesados calificados', 'Filtras a quien no está realmente interesado'], chips: ['KAIROS', 'BROX', 'Calificación'] },
  { sem: '04', etapaTag: 'ETAPA 07 DE 08', nombre: 'Negociación y seguimiento', objetivo: 'Ninguna oportunidad se enfría', desc: 'Acceso exclusivo a BROX para probar su modelo de IA: prioridad por tareas y seguimiento de cada cliente hasta el cierre.', puntos: ['Acceso exclusivo a BROX', 'Prioridad por tareas definida por IA', 'Seguimiento de clientes sin memoria manual'], chips: ['BROX', 'Prioridades', 'Seguimiento'] },
];

const organiza = ['Estados', 'Métricas', 'Información', 'Próximas acciones', 'Prioridades'];
const decide = ['Precio', 'Negociación', 'Relación comercial', 'Estrategia', 'Prioridades finales'];

const faqData = [
  { q: '¿SIVAN reemplaza mi criterio profesional?', a: 'No. SIVAN organiza estados, métricas, contexto y próximas acciones. La estrategia, la negociación y la relación comercial siguen bajo tu criterio.' },
  { q: '¿Necesito experiencia con IA para el Nivel 1?', a: 'No. El Nivel 1 está diseñado como primer paso: pueden ingresar agentes que nunca usaron IA o con poco conocimiento ofimático. Se avanza un proceso por semana, con acompañamiento cercano desde cero.' },
  { q: '¿Cómo utiliza IA KAIROS?', a: 'KAIROS comprende cada conversación en lenguaje natural: identifica necesidad, presupuesto, urgencia e intención, y convierte eso en contexto operativo listo para actuar.' },
  { q: '¿Cómo utiliza IA BROX?', a: 'BROX organiza las señales de toda tu operación: relaciona propiedades, interesados y responsables, reordena prioridades y muestra la próxima acción de cada oportunidad.' },
  { q: '¿Qué diferencia hay entre KAIROS y BROX?', a: 'KAIROS trabaja en la conversación: entiende y extrae contexto. BROX trabaja en la operación: prioriza, relaciona y controla. Juntos convierten una consulta en una acción visible.' },
  { q: '¿Funciona si trabajo de forma independiente?', a: 'Sí. El método se implementa sobre tu operación real, seas agente independiente, agencia o equipo. La vista se adapta a tu forma de trabajar.' },
  { q: '¿Qué ve un broker o líder de equipo?', a: 'Una lectura consolidada: salud de oportunidades, prioridades por agente y etapa, y seguimientos en riesgo — sin perseguir reportes manuales.' },
];

/* ---- Small SVG helpers --------------------------------------------------- */
function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Chk({ size = 17, fill = '#1D4ED8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="8.5" fill={fill} />
      <path d="M5 8.5L7.5 11L12 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useCountUp(target, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return undefined; }
    let frame; let timer;
    const start = () => {
      const started = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - started) / 1100);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    timer = window.setTimeout(start, delay);
    return () => { window.clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [target, delay]);
  return String(value).padStart(2, '0');
}

/* ---- Background ---------------------------------------------------------- */
function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <img className="bg__img" src="assets/sivan-proptech-bg-v2.webp" alt="" />
      <div className="bg__veil" />
      <div className="bg__blob bg__blob--1" />
      <div className="bg__blob bg__blob--2" />
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}><div className="bg__shine" /></div>
    </div>
  );
}

/* ---- Header -------------------------------------------------------------- */
function Header({ active, menuOpen, setMenuOpen }) {
  const close = () => setMenuOpen(false);
  return (
    <header className={`nav${menuOpen ? ' is-open' : ''}`}>
      <div className="nav__inner">
        <a href="#inicio" className="nav__logo" onClick={close} aria-label="SIVAN, inicio">
          <img src="assets/sivan-logo.webp" alt="SIVAN Solutions" />
        </a>
        <nav className="nav__links" aria-label="Navegación principal">
          {navItems.map(([id, label, gold]) => (
            <a key={id} href={`#${id}`} onClick={close}
              className={`${gold ? 'is-gold' : ''}${active === id ? ' is-active' : ''}`}>{label}</a>
          ))}
        </nav>
        <a className="nav__cta" href="#contacto" onClick={close}>
          Contáctanos <Arrow size={14} />
          <span className="btn__shine" style={{ width: '40%', animationDuration: '3.5s', animationDelay: '1s' }} />
        </a>
        <button className="nav__toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

/* ---- Hero ---------------------------------------------------------------- */
function HeroVisual() {
  const cap = useCountUp(18, 420);
  const op = useCountUp(7, 570);
  const pri = useCountUp(3, 720);
  return (
    <div className="hero__visual" aria-label="Profesional inmobiliaria consultando su operación mientras sus prioridades aparecen en tarjetas flotantes">
      <div className="hero__ring" aria-hidden="true" />
      <div className="hero__coreglow" aria-hidden="true" />

      <div className="hero__advisor-wrap">
        <img className="hero__advisor" src="assets/sivan-advisor.webp" alt="Profesional inmobiliaria consultando su operación desde el teléfono" width="486" height="717" />

        <article className="fcard fcard--opp">
          <div className="fcard__row">
            <span className="fcard__mono">OPORTUNIDAD #024</span>
            <span className="fcard__tag">VISITA</span>
          </div>
          <div className="fcard__title">Interesado calificado</div>
          <div className="fcard__live"><i /><span>Seguimiento activo</span></div>
        </article>

        <article className="fcard fcard--ficha">
          <div className="fcard__mono" style={{ marginBottom: 10 }}>FICHA DE PROPIEDAD</div>
          <div className="fcard__pct"><b>87%</b><span>generando</span></div>
          <div className="fcard__bar"><i /></div>
        </article>

        <article className="fcard fcard--control">
          <div className="fcard__row">
            <span className="fcard__mono">CONTROL DE HOY</span>
            <span className="fcard__mono" style={{ color: '#8A93B5', letterSpacing: 0 }}>9:41</span>
          </div>
          <div className="fcard__stats">
            <div className="stat--cap"><b>{cap}</b><small>captaciones</small></div>
            <div className="stat--op"><b>{op}</b><small>operaciones</small></div>
            <div className="stat--pri"><b>{pri}</b><small>prioridades</small></div>
          </div>
        </article>
      </div>

      <article className="fcard fcard--action">
        <div className="fcard__row" style={{ gap: 8, justifyContent: 'flex-start' }}>
          <span className="fcard__flag">!</span>
          <span className="fcard__mono">PRÓXIMA ACCIÓN</span>
        </div>
        <div className="fcard__actrow">
          <div><b>Confirmar visita · 10:30</b><small>Miraflores · US$ 220K</small></div>
          <span className="fcard__go">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
        <div className="fcard__brox"><i /><span>BROX priorizó esta acción</span></div>
      </article>

      <article className="fcard fcard--report">
        <div className="fcard__mono" style={{ marginBottom: 8 }}>REPORTE AL PROPIETARIO</div>
        <div className="fcard__ok"><Chk size={16} fill="#059669" /><b>Listo para enviar</b></div>
        <small>12 consultas · 4 calificaciones · 1 visita</small>
      </article>
    </div>
  );
}

function Hero() {
  const benefits = [
    ['Cada lead ubicado', '#1D4ED8'],
    ['Próxima acción visible', '#1D4ED8'],
    ['Seguimiento sin memoria', '#0EA5E9'],
    ['Control por agente y etapa', '#0EA5E9'],
  ];
  return (
    <section className="hero" id="inicio" data-nav="inicio">
      <div className="hero__copy">
        <div className="badge">
          <span className="badge__dot" />
          <span className="badge__txt">PROGRAMA NIVEL 1 · {COHORTE_TXT}</span>
        </div>
        <h1>Tu negocio inmobiliario con <span className="grad">inteligencia artificial.</span></h1>
        <p className="hero__sub">
          Prueba nuestra <strong>inteligencia artificial</strong> para realizar un seguimiento guiado de todas tus operaciones y mantener cada oportunidad bajo control. Clientes, propietarios e inmuebles, todo en <strong>un solo lugar</strong>.        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contacto">Contáctanos <Arrow /><span className="btn__shine" /></a>
          <a className="btn btn--ghost" href="#metodo">
            <span className="btn__play"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 1.5L8.5 5L2 8.5V1.5Z" fill="#1D4ED8" /></svg></span>
            Ver cómo funciona
          </a>
        </div>
        <div className="hero__benefits">
          {benefits.map(([label, fill]) => (
            <div className="benefit" key={label}><Chk fill={fill} />{label}</div>
          ))}
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}

/* ---- Flow strip ---------------------------------------------------------- */
function FlowStrip() {
  const nodes = [
    { type: 'conversation', label: 'Conversación' },
    { type: 'context', label: 'Contexto' },
    { type: 'priority', label: 'Prioridad' },
    { type: 'action', label: 'Acción' },
    { type: 'followup', label: 'Seguimiento' },
  ];
  const dashes = ['rgba(29,78,216,.35)', 'rgba(14,165,233,.4)', 'rgba(212,175,55,.45)', 'rgba(29,78,216,.35)'];
  return (
    <section className="flowstrip">
      <div className="flowstrip__inner reveal">
        {nodes.map((n, i) => (
          <div key={n.label} style={{ display: 'contents' }}>
            <div className="flowstrip__node">
              <span className={`flowstrip__ico flowstrip__ico--${n.type}`}><ProcessIcon type={n.type} size={18} /></span>
              <b>{n.label}</b>
            </div>
            {i < 4 && <span className="flowstrip__dash" style={{ background: `repeating-linear-gradient(90deg, ${dashes[i]} 0 6px, transparent 6px 12px)` }} />}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Marquee ------------------------------------------------------------- */
function Marquee() {
  return (
    <section className="marquee">
      <div className="marquee__label">INFORMACIÓN QUE EXISTE, PERO ESTÁ DISPERSA</div>
      <div className="marquee__mask">
        <div className="marquee__track">
          {[...dispersos, ...dispersos].map((d, i) => (
            <div className="mpill" key={i}>
              <span className={`source-icon source-icon--${d.icon}`}><SourceIcon type={d.icon} size={18} /></span>
              <b>{d.nombre}</b>
              <span>{d.detalle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Problem ------------------------------------------------------------- */
function ProblemSection() {
  return (
    <section className="section" data-nav="metodo">
      <div className="head head--center reveal">
        <span className="eyebrow">EL PROBLEMA NO ES LA DEMANDA</span>
        <h2 className="h2">La información existe. <span className="grad">Pero no opera como un sistema.</span></h2>
        <p>Cuando cada señal vive en un lugar distinto, nadie ve la oportunidad completa ni su próxima acción.</p>
      </div>
      <div className="problem__grid reveal">
        <div className="problem__cards">
          {problemas.map((p) => (
            <div className="pcard" key={p.nombre}>
              <span className={`source-icon source-icon--${p.icon}`}><SourceIcon type={p.icon} size={20} /></span>
              <div><b>{p.nombre}</b><small>{p.detalle}</small></div>
            </div>
          ))}
        </div>
        <div className="problem__panel">
          <div className="eyebrow">LECTURA ORGANIZADA</div>
          <div className="ppanel-row">
            <div>
              <div className="num">#024</div>
              <b>Miraflores</b>
              <small>Interesado + propiedad + responsable</small>
            </div>
            <svg width="34" height="34" viewBox="0 0 17 17" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="8.5" fill="#38BDF8" /><path d="M5 8.5L7.5 11L12 6" stroke="#0A1B4D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="ppanel-act">
            <i>!</i>
            <div><div className="lbl">PRÓXIMA ACCIÓN</div><b>Confirmar visita · 10:30</b></div>
          </div>
          <p>SIVAN convierte información dispersa en una <strong>operación visible y accionable</strong>.</p>
        </div>
      </div>
    </section>
  );
}

/* ---- Comparison ---------------------------------------------------------- */
function ComparisonSection() {
  return (
    <section className="section" data-nav="metodo" style={{ paddingTop: 30 }}>
      <div className="head head--center reveal" style={{ maxWidth: 760 }}>
        <span className="eyebrow">MISMO LEAD · DOS RESULTADOS</span>
        <h2 className="h2" style={{ fontSize: 40 }}>La organización convierte a un agente ocupado en un <span className="grad">agente profesional</span>.</h2>
      </div>
      <div className="vs__lead-wrap reveal">
        <div className="vs__lead">
          <span className="eyebrow">LEAD ENTRANTE</span>
          <b>“Busco depa en Miraflores · hasta US$ 220K”</b>
        </div>
      </div>
      <div className="vs__grid reveal">
        <div className="vs__side vs__side--avg">
          <div className="eyebrow">AGENTE PROMEDIO</div>
          <h3>Reacciona tarde</h3>
          <div className="vs__chaos">
            {avgChaos.map((c) => (
              <span key={c.t} className={c.alarm ? 'is-alarm' : ''}>{c.i} {c.t}</span>
            ))}
          </div>
          <p className="vs__note">El problema aparece cuando ya costó tiempo e interés.</p>
        </div>
        <div className="vs__divider"><span>VS</span></div>
        <div className="vs__side vs__side--pro">
          <div className="eyebrow">AGENTE PROFESIONAL</div>
          <h3>Opera con claridad</h3>
          <div className="vs__pro-flow">
            {pasosPro.map((s) => (
              <span key={s.n}><i>{s.n}</i><b>{s.titulo}</b><span className="tag">{s.tag}</span></span>
            ))}
            <div className="win">
              <Chk size={20} fill="#059669" />
              <div><b>Oportunidad en control</b><small>Riesgo, prioridad y siguiente movimiento en una sola lectura.</small></div>
            </div>
          </div>
        </div>
      </div>
      <p className="vs__close reveal">Mismo lead. Dos formas completamente distintas de operar.</p>
    </section>
  );
}

/* ---- Ecosystem ----------------------------------------------------------- */
function EcosystemSection() {
  return (
    <section className="section" id="metodo" data-nav="metodo" style={{ paddingTop: 30 }}>
      <div className="head head--center reveal" style={{ maxWidth: 700 }}>
        <span className="eyebrow">ECOSISTEMA SIVAN</span>
        <h2 className="h2" style={{ fontSize: 40 }}>Conversación, operación y método. <span className="grad">Una sola forma de avanzar.</span></h2>
      </div>
      <div className="eco__grid reveal">
        {ecosystem.map((e) => (
          <div className={`ecard ecard--${e.type}`} key={e.type}>
            <div className="ecard__top">
              <span className="ecard__n">{e.n}</span>
              <span className="ecard__pill">{e.tag}</span>
            </div>
            <img src={e.logo} alt={e.alt} />
            <div className="ecard__title">{e.title}</div>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Flow 8 stages ------------------------------------------------------- */
function FlowSection() {
  const [active, setActive] = useState(0);
  const e = etapaData[active];
  return (
    <section className="section" data-nav="metodo" style={{ paddingTop: 10 }}>
      <div className="head head--center reveal" style={{ maxWidth: 780 }}>
        <span className="eyebrow">FLUJO COMERCIAL COMPLETO</span>
        <h2 className="h2" style={{ fontSize: 40 }}>Ocho etapas. <span className="grad">Una señal siempre en movimiento.</span></h2>
        <p style={{ fontSize: 17 }}>Selecciona una etapa para conocer la decisión que ordena y el indicador que medimos.</p>
      </div>
      <div className="flow__system reveal">
        <div className="flow__tabs" role="tablist" aria-label="Etapas del flujo comercial">
          {etapaData.map((s, i) => (
            <button key={s.nombre} type="button" role="tab" aria-selected={active === i} aria-controls="flow-stage-panel"
              className={`flow__tab${active === i ? ' is-active' : ''}`} onClick={() => setActive(i)}>
              <span className="flow__tab-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="flow__tab-copy"><small>ETAPA</small><b>{s.nombre}</b></span>
            </button>
          ))}
        </div>
        <div className="flow__panel" id="flow-stage-panel" role="tabpanel">
          <div className="flow__stage-card">
            <header className="flow__stage-head">
              <span className="flow__stage-number">ETAPA {String(active + 1).padStart(2, '0')} / 08</span>
              <h3>{e.nombre}</h3>
            </header>

            <section className="flow__decision">
              <span className="flow__label">DECISIÓN QUE SE TOMA</span>
              <p>{e.decision}</p>
            </section>

            <div className="flow__tools" aria-label="Función de cada herramienta en esta etapa">
              <article className="flow__tool flow__tool--kairos">
                <span className="flow__tool-logo"><img src="assets/kairos-isotipo.webp" alt="" /></span>
                <div><strong>KAIROS <small>IA CONVERSACIONAL</small></strong><p>{e.kairos}</p></div>
              </article>
              <article className="flow__tool flow__tool--brox">
                <span className="flow__tool-logo"><img src="assets/brox-iso.webp" alt="" /></span>
                <div><strong>BROX <small>IA OPERATIVA</small></strong><p>{e.brox}</p></div>
              </article>
            </div>

            <div className="flow__reading">
              <div><span className="flow__label">SEÑAL QUE OBSERVAMOS</span><strong>{e.senal}</strong></div>
              <div><span className="flow__label">CÓMO LA MEDIMOS</span><strong>{e.medida}</strong></div>
            </div>

            {active < etapaData.length - 1 && (
              <button className="flow__stage-cta" type="button" onClick={() => setActive((current) => current + 1)}
                aria-label={`${e.cta}. Continuar a ${etapaData[active + 1].nombre}`}>
                <span>{e.cta}</span>
                <span className="flow__stage-cta-next">Siguiente: {etapaData[active + 1].nombre} <b aria-hidden="true">→</b></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- KAIROS -------------------------------------------------------------- */
function KairosSection() {
  return (
    <section className="section kairos" id="kairos" data-nav="kairos" style={{ paddingTop: 30 }}>
      <div className="kairos__copy reveal">
        <span className="eyebrow">KAIROS · IA CONVERSACIONAL</span>
        <h2 className="h2">Cada conversación termina con <span className="grad">contexto y una próxima acción</span>.</h2>
        <p>KAIROS usa inteligencia artificial para comprender consultas, calificar interesados y preparar el siguiente movimiento.</p>
        <div className="kairos__extract">
          <div className="kairos__extract-head"><span className="s">✦</span><span className="l">EXTRACCIÓN MEDIANTE IA</span></div>
          <h3>De lenguaje natural a contexto operativo.</h3>
          {extracciones.map((x) => (
            <div className="row" key={x}><Chk size={15} fill="#0EA5E9" />{x}</div>
          ))}
          <div className="kairos__result">
            <div className="l">RESULTADO</div>
            <b>Visita programada</b>
            <small>Cliente interesado · contexto listo para BROX</small>
          </div>
        </div>
        <p className="kairos__foot">KAIROS prepara el contexto. El profesional dirige la relación.</p>
      </div>

      <KairosPhone />
    </section>
  );
}

/* ---- BROX ---------------------------------------------------------------- */
function BroxSection() {
  const [view, setView] = useState('individual');
  const data = broxViews[view];
  return (
    <section className="section" id="brox" data-nav="brox" style={{ paddingTop: 30 }}>
      <div className="head head--center reveal">
        <span className="eyebrow">BROX · IA OPERATIVA</span>
        <h2 className="h2" style={{ fontSize: 40 }}>Toda la operación visible. <span className="grad">Lo urgente, primero.</span></h2>
        <p style={{ fontSize: 17 }}>BROX usa inteligencia artificial para organizar señales, identificar prioridades y convertir contexto en acciones concretas.</p>
      </div>
      <div className="brox__shell reveal">
        <aside className="brox__aside">
          <div className="brox__aside-top">
            <img src="assets/brox-iso.webp" alt="BROX" />
            <div className="l">OPERACIÓN</div>
          </div>
          {broxNav.map((item, i) => (
            <div className={`brox__navitem${i === 0 ? ' is-active' : ''}`} key={item}><i>{i + 1}</i>{item}</div>
          ))}
        </aside>
        <div className="brox__main">
          <div className="brox__topbar">
            <div className="brox__online"><i /><span>IA OPERATIVA · EN LÍNEA</span></div>
            <div className="brox__owner">
              <span>{data.owner}</span>
              <div className="brox__tabs">
                {Object.entries(broxViews).map(([key, v]) => (
                  <button key={key} type="button" className={view === key ? 'is-active' : ''} onClick={() => setView(key)}>{v.label}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="brox__kpis">
            {data.kpis.map(([val, label], i) => (
              <div className={`kpi ${['kpi--cap', 'kpi--op', 'kpi--hot'][i]}`} key={label}>
                <div className="k">{label}</div>
                <b>{val}</b>
                <small>{i === 2 ? 'Requieren atención' : 'Actualizado ahora'}</small>
              </div>
            ))}
          </div>
          <div className="brox__work">
            <div className="brox__prio">
              <div className="brox__prio-head">
                <span className="l">PRIORIDADES REORDENADAS POR IA</span>
                <span className="brox__live">EN VIVO</span>
              </div>
              <div className="brox__prio-list">
                {data.prio.map(([t, d, tag], i) => {
                  const [tc, tb] = TAG_TONE[tag] || ['#1D4ED8', 'rgba(29,78,216,.1)'];
                  return (
                    <div className="prio" key={t}>
                      <span className="n">{String(i + 1).padStart(2, '0')}</span>
                      <div className="info"><b>{t}</b><small>{d}</small></div>
                      <span className="tag" style={{ color: tc, background: tb }}>{tag}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="brox__health">
              <span className="l">SALUD DE OPORTUNIDADES</span>
              <div className="brox__ring">
                <svg width="86" height="86" viewBox="0 0 96 96" aria-hidden="true">
                  <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(29,78,216,.1)" strokeWidth="8" />
                  <circle cx="48" cy="48" r="42" fill="none" stroke="url(#saludGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="21" transform="rotate(-90 48 48)" style={{ animation: 'ringDraw 1.8s cubic-bezier(.22,1,.36,1) both' }} />
                  <defs><linearGradient id="saludGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1D4ED8" /><stop offset="100%" stopColor="#0EA5E9" /></linearGradient></defs>
                  <text x="48" y="54" textAnchor="middle" fill="#0B1230" fontSize="24" fontWeight="800" fontFamily="Sora, sans-serif">92</text>
                </svg>
                <div className="brox__ring-legend">
                  <span className="g">● 18 al día</span>
                  <span className="a">● 3 requieren atención</span>
                  <span className="r">● 1 seguimiento vencido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Cinematic (EL PODER DETRÁS DE SIVAN) -------------------------------- */
function PowerSection() {
  return (
    <section className="power" data-nav="brox">
      <div className="power__blob1" aria-hidden="true" />
      <div className="power__blob2" aria-hidden="true" />
      <div className="power__grid" aria-hidden="true" />
      <div className="power__inner">
        <div className="power__eyebrow reveal">
          <span><span className="l1" /><span className="txt">EL PODER DETRÁS DE SIVAN</span><span className="l2" /></span>
        </div>

        <div className="power__frame reveal">
          <div className="power__screen">
            <div className="power__screen-inner">
              <img className="power__img" src="assets/kairos-brox-cinematic.webp" alt="KAIROS + BROX — dos inteligencias, una operación imparable" />
              <div className="power__vig1" /><div className="power__vig2" /><div className="power__scan" />
              <span className="power__corner power__corner--tl" /><span className="power__corner power__corner--tr" />
              <span className="power__corner power__corner--bl" /><span className="power__corner power__corner--br" />
              <div className="power__badge"><i /><span>EN VIVO</span></div>
            </div>
          </div>
        </div>

        <div className="power__panels">
          <div className="ppanel ppanel--kairos">
            <div className="ppanel__inner">
              <div className="ppanel__scan" />
              <div className="ppanel__top"><span className="ppanel__kicker">EL ASISTENTE</span><span className="ppanel__label">IA CONVERSACIONAL</span></div>
              <img src="assets/kairos-logo.webp" alt="KAIROS — Inteligencia que transforma" />
              <p>Atiende cada conversación como tu mejor recepcionista: entiende necesidad, presupuesto, urgencia e intención — <strong>sin dejar pasar una sola señal</strong>.</p>
              <div className="ppanel__chips"><span>Comprende</span><span>Califica</span><span>Prepara la acción</span></div>
            </div>
          </div>

          <div className="nexus">
            <div className="nexus__ring"><span className="r1" /><span className="r2" /><span className="plus">+</span></div>
          </div>

          <div className="ppanel ppanel--brox">
            <div className="ppanel__inner">
              <div className="ppanel__scan" />
              <div className="ppanel__top"><span className="ppanel__kicker">LA MENTE MAESTRA</span><span className="ppanel__label">IA OPERATIVA</span></div>
              <img src="assets/brox-logo.webp" alt="BROX — Gestor de datos e inteligencia" />
              <p>Ve toda tu operación a la vez: relaciona señales, reordena prioridades y decide qué merece tu atención — <strong>antes de que se pierda una oportunidad</strong>.</p>
              <div className="ppanel__chips"><span>Relaciona</span><span>Prioriza</span><span>Dirige</span></div>
            </div>
          </div>
        </div>

        <div className="power__chips reveal">
          {resultados.map((r) => (<span className="power__chip" key={r}><span className="c">✓</span> {r}</span>))}
        </div>
        <div className="power__cta reveal">
          <a className="btn btn--primary" href="#programa">Quiero KAIROS + BROX <Arrow /><span className="btn__shine" style={{ animationDelay: '1.5s' }} /></a>
        </div>
      </div>
    </section>
  );
}

/* ---- Programa ------------------------------------------------------------ */
function ProgramLevels() {
  return (
      <div className="prog__levels reveal">
        <div className="level level--1">
          <div className="level__top">
            <span className="level__pill">NIVEL 1 · ESTE PROGRAMA</span>
            <span className="level__dot" />
          </div>
          <div className="level__title">Los 4 procesos críticos del sector hoy</div>
          <div className="level__chips">
            {['Preparación', 'Publicación', 'Interesados', 'Negociación y seguimiento'].map((c) => <span key={c}>{c}</span>)}
          </div>
          <div className="level__note"><i>✓</i> No se requiere experiencia en IA ni ofimática avanzada</div>
        </div>
        {[['NIVEL 2', 'dos', 'level__pill--2'], ['NIVEL 3', 'tres', 'level__pill--3']].map(([label, key, pill]) => {
          const lv = niveles[key];
          return (
            <div className="level level--soon" key={key}>
              <div className="level__top" style={{ justifyContent: 'flex-start' }}>
                <span className={`level__pill ${pill}`}>{label}</span>
                <span className="level__meta">{lv.meta}</span>
              </div>
              <div className="level__title">{lv.title}</div>
              <div className="level__chips">{lv.chips.map((c) => <span key={c}>{c}</span>)}</div>
              <div className="level__soon">{lv.soon}</div>
            </div>
          );
        })}
      </div>
  );
}

function ProcessAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="procs reveal">
      {procesosData.map((p, i) => {
        const isOpen = i === open;
        return (
          <div key={p.sem} className={`proc ${isOpen ? 'is-open' : 'is-closed'}`} onClick={() => setOpen(i)}
            role="button" tabIndex={0} aria-expanded={isOpen}
            onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setOpen(i); } }}>
            {isOpen ? (
              <>
                <div className="proc__glow" /><div className="proc__scan" />
                <div className="proc__open">
                  <div className="proc__row">
                    <span className="proc__week">SEMANA {p.sem}</span>
                    <span className="proc__etapa">{p.etapaTag}</span>
                  </div>
                  <h3 className="proc__name">{p.nombre}</h3>
                  <div className="proc__obj"><span className="l">OBJETIVO</span><b>{p.objetivo}</b></div>
                  <p className="proc__desc">{p.desc}</p>
                  <div className="proc__points">
                    {p.puntos.map((pt) => <div className="proc__point" key={pt}><i>✓</i> {pt}</div>)}
                  </div>
                  <div className="proc__chips">{p.chips.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
              </>
            ) : (
              <div className="proc__closed">
                <span className="s">S·{p.sem}</span>
                <span className="vname">{p.nombre}</span>
                <span className="plus">＋</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AgentTransformation() {
  const before = [
    'Preparas publicaciones desde cero y pierdes horas en cada propiedad.',
    'Difundes sin tener claro qué público, mensaje o medio conviene priorizar.',
    'Las consultas se mezclan con curiosos y el contexto queda dentro del chat.',
    'El seguimiento depende de memoria, notas y recordatorios dispersos.',
  ];
  const after = [
    'Produces guion, ficha y contenido audiovisual con un flujo asistido por IA.',
    'Defines público, medios y campañas para cada propiedad antes de invertir.',
    'KAIROS extrae necesidad, presupuesto y urgencia de cada consulta.',
    'BROX ordena tareas, prioridades y el próximo movimiento hasta el cierre.',
  ];
  return (
    <div className="transform reveal">
      <div className="transform__card transform__card--before">
        <div className="transform__label"><span>ANTES</span> ASÍ INGRESAS</div>
        <h3>Operación activa, pero sostenida por esfuerzo manual.</h3>
        <div className="transform__list">
          {before.map((item, i) => <div key={item}><i>{String(i + 1).padStart(2, '0')}</i><span>{item}</span></div>)}
        </div>
      </div>
      <div className="transform__bridge" aria-hidden="true"><span>→</span><small>4 SEMANAS</small></div>
      <div className="transform__card transform__card--after">
        <div className="transform__label"><span>DESPUÉS</span> ASÍ SALES</div>
        <h3>Cuatro procesos instalados para operar con más criterio y control.</h3>
        <div className="transform__list">
          {after.map((item, i) => <div key={item}><i>✓</i><span>{item}</span></div>)}
        </div>
      </div>
      <div className="transform__footer"><strong>No sales solo con teoría.</strong> Sales con cuatro procesos aplicados a tu operación inmobiliaria real.</div>
    </div>
  );
}

function FounderPriceCard() {
  return (
    <div className="ficha reveal">
      <div className="ficha__inner">
        <div className="ficha__scan" /><div className="ficha__glow" />
        <div className="ficha__top">
          <div className="ficha__brandmark">
            <span className="ficha__chip"><span /></span>
            <span className="ficha__access">ACCESO FUNDADOR</span>
          </div>
          <span className="ficha__no">Nº {FICHA_NUM}/020</span>
        </div>
        <div className="ficha__product">
          <span>PROGRAMA FUNDADORES · NIVEL 1</span>
          <strong>Implementación inmobiliaria con IA</strong>
          <small>4 semanas · acompañamiento guiado · aplicación real</small>
        </div>
        <div className="ficha__price">
          <div className="ficha__amount"><span className="ficha__cur">S/</span><span className="ficha__num">297</span></div>
          <div className="ficha__was">
            <div className="old">Antes S/ 497</div>
            <span className="ficha__save">AHORRAS S/ 200</span>
          </div>
        </div>
        <div className="ficha__unit">PRECIO FUNDADOR · PAGO ÚNICO</div>
        <div className="ficha__checks">
          <div className="ficha__check"><i>✓</i> 4 procesos implementados, uno por semana</div>
          <div className="ficha__check"><i>✓</i> Trabajo aplicado sobre tu operación real</div>
          <div className="ficha__check"><i>✓</i> BROX y KAIROS incluidos durante 90 días</div>
        </div>
        <a className="btn btn--gold" href={WPP_FOUNDER_URL} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> Asegurar precio fundador <Arrow /><span className="btn__shine" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent)', animationDelay: '1s', animationDuration: '3.5s' }} /></a>
        <div className="ficha__cupos ficha__cupos--progress">
          <div className="ficha__progress-head">
            <span className="l"><i /> AVANCE DE LA COHORTE</span>
            <span className="v">{CUPOS} de 20 confirmados</span>
          </div>
          <div className="ficha__progress" role="progressbar" aria-label="Ocupación de la cohorte fundadora" aria-valuemin="0" aria-valuemax="20" aria-valuenow={CUPOS}>
            <i className="ficha__progress-fill" style={{ width: `${PCT}%` }} />
          </div>
          <div className="ficha__progress-meta">
            <span>Cohorte fundadora al <strong>{PCT}%</strong></span>
            <span>El acceso se cierra al completar el grupo.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FounderBonus() {
  return (
    <div className="bono reveal">
      <div className="bono__topline">
        <div className="bono__heading"><span>NIVEL 1 · PRIMERA COHORTE</span><h3>BONO FUNDADOR</h3></div>
        <div className="bono__duration"><strong>90</strong><span>DÍAS</span></div>
      </div>
      <div className="bono__title">BROX y KAIROS incluidos por <span>3 meses completos</span>.</div>
      <p className="bono__lead">No es una demostración aislada: pruebas ambas IA sobre tu operación real durante los primeros 90 días, sin costo adicional.</p>
      <div className="bono__list">
        <div className="bono__item bono__item--kairos">
          <span className="bono__logo"><img src="assets/kairos-isotipo.webp" alt="" /></span>
          <span className="d"><strong>KAIROS</strong><small>IA conversacional</small>Entiende cada consulta y la convierte en contexto para calificar interesados.</span>
        </div>
        <div className="bono__item bono__item--brox">
          <span className="bono__logo"><img src="assets/brox-iso.webp" alt="" /></span>
          <span className="d"><strong>BROX</strong><small>IA operativa</small>Prioriza por tareas y controla el seguimiento de cada cliente.</span>
        </div>
      </div>
      <div className="bono__included"><i>✓</i><span><strong>Incluido sin costo adicional</strong> durante tus primeros 90 días.</span></div>
    </div>
  );
}

function ProgramSection() {
  return (
    <section className="prog" id="programa" data-nav="programa">
      <div className="prog__wash" aria-hidden="true" />
      <div className="prog__blob1" aria-hidden="true" />
      <div className="prog__blob2" aria-hidden="true" />
      <div className="prog__inner">
        <div className="prog__hero">
          <div className="prog__pitch reveal">
            <div className="prog__identity">
              <img className="prog__seal" src="assets/sivan-sello-cohorte.webp" alt="Sello Primera Cohorte · Edición Fundadora SIVAN" width="104" height="104" />
              <div>
                <div className="prog__badge"><i /><span>PROGRAMA FUNDADORES · NIVEL 1</span></div>
                <span className="prog__edition">PRIMERA COHORTE · EDICIÓN FUNDADORA SIVAN</span>
              </div>
            </div>
            <span className="prog__product-kicker">PROGRAMA DE IMPLEMENTACIÓN PARA AGENTES INMOBILIARIOS</span>
            <h2 className="h2">Implementa IA en <span className="grad--gold">cuatro procesos que deciden una venta</span>.</h2>
            <p className="prog__lead">Durante cuatro semanas trabajas sobre tu operación real para preparar propiedades, publicar con intención, calificar interesados y sostener cada negociación con seguimiento.</p>
            <div className="prog__facts">
              <div><strong>4</strong><span>semanas de implementación</span></div>
              <div><strong>4</strong><span>procesos aplicados</span></div>
              <div><strong>90</strong><span>días con KAIROS + BROX</span></div>
              <div><strong>0</strong><span>experiencia previa requerida</span></div>
            </div>
          </div>
          <FounderPriceCard />
        </div>

        <div className="prog__section-head reveal">
          <span>LA TRANSFORMACIÓN</span>
          <h3>Qué cambia en tu forma de operar después de las asesorías.</h3>
          <p>El valor no está en “conocer herramientas”, sino en instalar una forma de trabajo más clara en cada etapa crítica.</p>
        </div>
        <AgentTransformation />

        <div className="prog__section-head reveal">
          <span>LO QUE SE ENSEÑARÁ</span>
          <h3>Un proceso real por semana. Una mejora concreta en cada entrega.</h3>
          <p>Abre cada semana para revisar el objetivo, la aplicación práctica y el resultado operativo que vas a construir.</p>
        </div>
        <ProcessAccordion />

        <div className="prog__bonus-grid">
          <FounderBonus />
          <div className="limit reveal">
            <div className="vacancy-orb vacancy-orb--light" aria-label={`${QUEDAN} vacantes disponibles`}>
              <span>{QUEDAN}</span><small>VACANTES</small>
            </div>
            <div className="limit__copy">
              <span className="limit__eyebrow"><i /> DISPONIBILIDAD ACTUAL</span>
              <strong>Últimas {QUEDAN} vacantes de la cohorte fundadora.</strong>
              <p><b>Grupo limitado a 20 asesores</b> para acompañamiento cercano — un proceso por semana.</p>
            </div>
          </div>
        </div>

        <div className="prog__future">
          <div className="prog__section-head reveal">
            <span>RUTA SIVAN · DESPUÉS DEL NIVEL 1</span>
            <h3>Este programa instala la base. Los siguientes niveles amplían tu operación.</h3>
            <p>Primero dominas los cuatro procesos críticos; después avanzas al origen de cada operación y a la especialización tecnológica.</p>
          </div>
          <ProgramLevels />
        </div>
      </div>
    </section>
  );
}

/* ---- Transparency -------------------------------------------------------- */
function TransparencySection() {
  return (
    <section className="section" data-nav="programa">
      <div className="head head--center reveal" style={{ maxWidth: 680 }}>
        <span className="eyebrow">TRANSPARENCIA</span>
        <h2 className="h2" style={{ fontSize: 38 }}>Ordenamos tu operación. <span className="grad">Tu criterio sigue siendo tuyo.</span></h2>
      </div>
      <div className="transp__grid reveal">
        <div className="transp__card transp__card--organiza">
          <div className="l">SIVAN ORGANIZA</div>
          <div className="rows">{organiza.map((o) => <div key={o}><span className="c">✓</span> {o}</div>)}</div>
        </div>
        <div className="transp__core">
          <div>
            <span className="ia">IA</span>
            <span className="a">APOYA</span>
            <span className="n">no reemplaza</span>
          </div>
        </div>
        <div className="transp__card transp__card--decide">
          <div className="l">EL PROFESIONAL DECIDE</div>
          <div className="rows">{decide.map((d) => <div key={d}><span className="d">◆</span> {d}</div>)}</div>
        </div>
      </div>
      <p className="transp__close reveal">La inteligencia artificial apoya tu decisión. No reemplaza tu criterio profesional.</p>
    </section>
  );
}

/* ---- FAQ ----------------------------------------------------------------- */
function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="preguntas" data-nav="preguntas">
      <div className="faq__head reveal">
        <span className="eyebrow">PREGUNTAS FRECUENTES</span>
        <h2 className="h2">Antes de empezar, todo debe quedar claro.</h2>
        <p>Si tu operación necesita otro enfoque, conversemos directamente.</p>
        <a className="faq__link" href="#contacto">Hablar con un asesor <Arrow size={13} /></a>
      </div>
      <div className="faq__list reveal">
        {faqData.map((f, i) => {
          const isOpen = i === open;
          return (
            <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={f.q}>
              <button className="faq__q" type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <b>{f.q}</b>
                <span className="sym">{isOpen ? '−' : '＋'}</span>
              </button>
              {isOpen && <div className="faq__a">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---- Closing CTA --------------------------------------------------------- */
function ClosingSection() {
  return (
    <section className="cta" id="contacto">
      <div className="cta__card reveal">
        <div className="cta__blob1" aria-hidden="true" />
        <div className="cta__blob2" aria-hidden="true" />
        <div className="cta__grid" aria-hidden="true" />
        <div className="cta__body">
          <span className="eyebrow">TU PRIMERA ACCIÓN</span>
          <h2>Descubre qué está frenando hoy tu operación.</h2>
          <p>Un diagnóstico breve para identificar qué ordenar primero.</p>
          <div className="cta__actions">
            <a className="btn btn--white" href={WPP_URL} target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> Contáctanos <Arrow />
              <span className="btn__shine" style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,.25), transparent)', animationDelay: '1.5s', animationDuration: '3.5s' }} />
            </a>
            <a className="btn btn--outline" href={DIAG_URL}>Hacer diagnóstico gratuito</a>
          </div>
          <p className="cta__note">No se trata de trabajar más. Se trata de operar con claridad.</p>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer -------------------------------------------------------------- */
function Footer() {
  const socials = [
    { key: 'instagram', label: 'Instagram', handle: '@sivansolutions', href: SOCIAL.instagram, icon: <InstagramIcon size={21} /> },
    { key: 'facebook', label: 'Facebook', handle: 'SivanSolutions', href: SOCIAL.facebook, icon: <FacebookIcon size={21} /> },
    { key: 'youtube', label: 'YouTube', handle: '@Sivan-solutions', href: SOCIAL.youtube, icon: <YouTubeIcon size={22} /> },
    { key: 'tiktok', label: 'TikTok', handle: '@sivansolutions', href: SOCIAL.tiktok, icon: <TikTokIcon size={20} /> },
  ];
  return (
    <footer className="foot">
      <div className="foot__connect-wrap">
        <div className="foot__connect reveal">
          <div className="foot__connect-main">
            <div className="foot__connect-copy">
              <span>SIVAN · CANALES OFICIALES</span>
              <h2>Conversemos sobre tu operación inmobiliaria.</h2>
              <p>Escríbenos directamente o sigue el contenido donde compartimos método, IA y tecnología aplicada al sector.</p>
            </div>
            <a className="foot__whatsapp" href={WPP_URL} target="_blank" rel="noopener noreferrer">
              <span className="foot__whatsapp-icon"><WhatsAppIcon size={25} /></span>
              <span><small>HABLAR POR WHATSAPP</small><strong>+51 937 302 239</strong></span>
              <Arrow size={17} />
            </a>
          </div>
          <div className="foot__socials" aria-label="Redes sociales de SIVAN Solutions">
            {socials.map((social) => (
              <a key={social.key} className={`foot__social foot__social--${social.key}`} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} de SIVAN Solutions`}>
                <span className="foot__social-icon">{social.icon}</span>
                <span><strong>{social.label}</strong><small>{social.handle}</small></span>
                <i>↗</i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="foot__top">
        <div className="foot__brand">
          <img src="assets/sivan-logo.webp" alt="SIVAN Solutions" />
          <p>Método e inteligencia artificial aplicada al oficio inmobiliario.</p>
        </div>
        <nav className="foot__nav" aria-label="Enlaces del pie de página">
          {navItems.map(([id, label, gold]) => (
            <a key={id} href={`#${id}`} className={gold ? 'is-gold' : ''}>{label}</a>
          ))}
        </nav>
      </div>
      <div className="foot__bottom"><div>© 2026 SIVAN Solutions.</div></div>
    </footer>
  );
}

/* ---- App ----------------------------------------------------------------- */
export default function App() {
  const rootRef = useRef(null);
  const [active, setActive] = useState('metodo');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reveals = root.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((n) => n.classList.add('is-visible'));
      return undefined;
    }

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -8%' });
    reveals.forEach((n) => revealObs.observe(n));

    const navObs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.dataset?.nav) setActive(visible.target.dataset.nav);
    }, { threshold: [0.2, 0.4, 0.6], rootMargin: '-12% 0px -55%' });
    root.querySelectorAll('[data-nav]').forEach((n) => navObs.observe(n));

    return () => { revealObs.disconnect(); navObs.disconnect(); };
  }, []);

  return (
    <div className="site" ref={rootRef}>
      <Background />
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <FlowStrip />
        <Marquee />
        <ProblemSection />
        <ComparisonSection />
        <EcosystemSection />
        <FlowSection />
        <KairosSection />
        <BroxSection />
        <PowerSection />
        <ProgramSection />
        <TransparencySection />
        <FaqSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}

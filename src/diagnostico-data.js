// ============================================================================
//  SIVAN · Diagnóstico Gratuito — datos del test
//  Test de Profesionalización del Agente (motor SIVAN):
//  Preparación · Publicación · Gestión de interesados.
//  8 preguntas puntuadas 0/1/2 · total 0–16.
// ============================================================================

export const STAGES = {
  prep: { key: 'prep', name: 'Preparación', n: 3 },
  pub:  { key: 'pub',  name: 'Publicación', n: 2 },
  gest: { key: 'gest', name: 'Gestión de interesados', n: 3 },
};
export const STAGE_ORDER = ['prep', 'pub', 'gest'];

export const QUESTIONS = [
  {
    id: 'P1', stage: 'prep',
    q: 'Cuando recibes un inmueble para trabajarlo, ¿cómo organizas la información antes de publicarlo?',
    opts: [
      { p: 0, t: 'Trabajo con la información que me da el propietario y avanzo sobre la marcha.' },
      { p: 1, t: 'Ordeno los datos principales en notas, chats o documentos, pero a veces quedan vacíos o información dispersa.' },
      { p: 2, t: 'Uso una ficha, plantilla o herramienta digital para ordenar datos, detectar vacíos y dejar la información lista antes de publicar.' },
    ],
  },
  {
    id: 'P2', stage: 'prep',
    q: 'Cuando tienes que armar el anuncio, ¿cómo conviertes la información del inmueble en un mensaje comercial?',
    opts: [
      { p: 0, t: 'Describo las características del inmueble tal como las tengo.' },
      { p: 1, t: 'Mejoro el texto de forma manual o con apoyo ocasional de IA, pero sin una estructura clara.' },
      { p: 2, t: 'Uso una estructura o apoyo de IA para transformar características en beneficios, enfoques comerciales y mensajes más atractivos para el interesado.' },
    ],
  },
  {
    id: 'P3', stage: 'prep',
    q: 'Antes de publicar, ¿cómo revisas si el material está listo para salir al mercado?',
    opts: [
      { p: 0, t: 'Uso las fotos, videos y textos que tenga disponibles.' },
      { p: 1, t: 'Reviso parte del material y corrijo lo más evidente antes de publicar.' },
      { p: 2, t: 'Uso un checklist, herramienta digital o apoyo de IA para validar fotos, video, descripción, datos clave y argumentos antes de publicar.' },
    ],
  },
  {
    id: 'P4', stage: 'pub',
    q: 'Cuando publicas en varios canales, ¿cómo decides qué versión usar en cada uno?',
    opts: [
      { p: 0, t: 'Uso prácticamente el mismo anuncio en todos los canales.' },
      { p: 1, t: 'Hago algunos cambios según el canal, a veces con apoyo de herramientas o IA, pero de forma intuitiva.' },
      { p: 2, t: 'Adapto título, descripción, formato, beneficios y llamada a la acción según el canal, usando criterios claros o apoyo digital.' },
    ],
  },
  {
    id: 'P5', stage: 'pub',
    q: 'Después de publicar, ¿cómo sabes qué canal o anuncio está funcionando mejor?',
    opts: [
      { p: 0, t: 'Me guío por la cantidad de mensajes que recuerdo haber recibido.' },
      { p: 1, t: 'Reviso algunos resultados, pero no siempre registro de dónde viene cada consulta.' },
      { p: 2, t: 'Registro canal, fecha, versión del anuncio y origen de consultas en una herramienta que me permita comparar resultados.' },
    ],
  },
  {
    id: 'P6', stage: 'gest',
    q: 'Cuando llega una consulta, ¿cómo identificas si el interesado debe atenderse con prioridad?',
    opts: [
      { p: 0, t: 'Respondo en orden de llegada o cuando tengo tiempo.' },
      { p: 1, t: 'Pregunto algunos datos para saber si está interesado, pero no siempre los registro.' },
      { p: 2, t: 'Registro necesidad, presupuesto, urgencia, disponibilidad y próxima acción, usando notas, formularios, CRM o apoyo digital.' },
    ],
  },
  {
    id: 'P7', stage: 'gest',
    q: 'Después de una visita o conversación importante, ¿qué haces con la información obtenida?',
    opts: [
      { p: 0, t: 'Me quedo con lo conversado y sigo si el cliente vuelve a escribir.' },
      { p: 1, t: 'Anoto algunos comentarios, pero quedan dispersos entre chats, notas o memoria.' },
      { p: 2, t: 'Registro interés, objeciones, resultado, probabilidad de avance y siguiente paso, usando una herramienta o estructura de seguimiento.' },
    ],
  },
  {
    id: 'P8', stage: 'gest',
    q: 'Cuando el propietario te pregunta cómo va su inmueble, ¿cómo preparas tu respuesta?',
    opts: [
      { p: 0, t: 'Le cuento lo más importante según lo que recuerdo.' },
      { p: 1, t: 'Le doy un resumen general de consultas o visitas, pero sin mucha estructura.' },
      { p: 2, t: 'Preparo un reporte ordenado con consultas, canales, visitas, objeciones, avances y próximas acciones, apoyándome en registros, herramientas digitales o IA.' },
    ],
  },
];

// Niveles por puntaje total (0–16).
export const LEVELS = [
  { min: 0,  max: 5,  name: 'Trabajas a pulso',          msg: 'Tienes oficio, pero preparar, publicar y dar seguimiento todavía depende demasiado de tu memoria y del momento.' },
  { min: 6,  max: 11, name: 'Tienes base, falta método', msg: 'Ya haces varias cosas bien, pero aún hay fugas entre la preparación, la publicación y el seguimiento.' },
  { min: 12, max: 16, name: 'Operas con método',          msg: 'Preparas, publicas y gestionas interesados con orden. El siguiente paso es sostenerlo, medirlo y simplificarlo con tecnología.' },
];

// Tres acciones recomendadas por etapa más débil.
export const ACTIONS = {
  prep: ['Usa una ficha estándar para cada inmueble.', 'Sustenta el precio con comparables de la zona.', 'Aplica un checklist de fotos, video y argumentos antes de publicar.'],
  pub:  ['Crea una versión del anuncio por canal.', 'Registra canal, fecha y versión de cada publicación.', 'Compara semanalmente las consultas útiles por origen.'],
  gest: ['Define un protocolo de respuesta para cada consulta.', 'Centraliza estados y próximas acciones en un solo lugar.', 'Confirma visitas y reporta avances al propietario.'],
};

// ---- Cálculo del resultado ----
export function scoreDiagnostico(answers) {
  const total = answers.reduce((a, p) => a + (p || 0), 0);
  const byStage = { prep: 0, pub: 0, gest: 0 };
  QUESTIONS.forEach((qq, i) => { byStage[qq.stage] += (answers[i] || 0); });
  const pct = {
    prep: Math.round((byStage.prep / (STAGES.prep.n * 2)) * 100),
    pub:  Math.round((byStage.pub / (STAGES.pub.n * 2)) * 100),
    gest: Math.round((byStage.gest / (STAGES.gest.n * 2)) * 100),
  };
  const minPct = Math.min(pct.prep, pct.pub, pct.gest);
  const weakest = STAGE_ORDER.filter((k) => pct[k] === minPct); // empate → varias
  const level = LEVELS.find((l) => total >= l.min && total <= l.max) || LEVELS[0];
  return { total, byStage, pct, weakest, level };
}

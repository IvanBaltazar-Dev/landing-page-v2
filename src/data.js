// Content data ported verbatim from the SIVAN Landing design source.

export const chatScript = [
  { side: 'l', text: 'Hola, vi el depa en Miraflores. ¿Sigue disponible?' },
  { side: 'r', text: '¡Hola! Sí, sigue disponible. ¿Lo buscas para vivir o como inversión?' },
  { side: 'l', text: 'Para vivir. ¿Cuál es tu presupuesto?' },
  { side: 'r', text: 'Perfecto. ¿Hasta qué monto y para cuándo lo necesitas?' },
  { side: 'l', text: 'Hasta US$ 220 mil, en unos 2 meses.' },
  { side: 'r', text: 'Listo. Te agendo una visita el sábado 11:00 a.m. y dejo la próxima acción al agente.', chips: ['Presupuesto ✓', 'Urgencia ✓', 'Visita agendada'] },
];

const faqComun = [
  { q: '¿SIVAN reemplaza mi criterio?', a: 'No. SIVAN profesionaliza tu oficio: ordena, prepara y da seguimiento. Las decisiones siguen siendo tuyas en cada etapa.' },
  { q: '¿Tienen que darme acceso a mis chats privados?', a: 'No. KAIROS trabaja con lo que registras en su interfaz. Tus conversaciones privadas siguen siendo tuyas.' },
  { q: '¿Qué información guarda SIVAN?', a: 'Estados de etapa, próximas acciones, consultas, visitas, seguimiento y métricas comerciales. No te pedimos contratos ni documentos financieros como base.' },
];

const faqMap = {
  solo: [
    { q: '¿Sirve si trabajo de forma independiente?', a: 'Sí. Está pensado justamente para quien atiende propietarios, interesados y publicaciones por su cuenta y necesita orden.' },
    { q: '¿Por dónde empiezo?', a: 'Por el diagnóstico gratuito: evalúa Preparación, Publicación y Gestión de interesados (Nivel 1) y te muestra tu foco.' },
  ],
  agencia: [
    { q: '¿La agencia verá toda mi información?', a: 'Solo lo que defina la empresa. Tu vista en BROX es individual: tu cartera, interesados y métricas personales.' },
    { q: '¿Cómo me ayuda a diferenciarme?', a: 'Te permite responder mejor, hacer seguimiento visible y reportar con claridad, para defender tu valor con argumentos.' },
  ],
  equipo: [
    { q: '¿Tengo que revisar cada chat de mi equipo?', a: 'No. BROX te entrega decisiones pendientes, alertas y riesgos. Ves dónde intervenir sin perseguir conversaciones.' },
    { q: '¿Puedo medir el desempeño del equipo?', a: 'Sí: por agente, inmueble, canal y etapa, con el embudo de consultas a cierres.' },
    { q: '¿El Programa Fundadores es para mí?', a: 'Aparece como opción para capacitar a tu equipo en Nivel 1. Tu primera acción es el diagnóstico operativo o una demo.' },
  ],
};

export function faqData(profile) {
  return faqComun.concat(faqMap[profile] || []);
}

export const recorridos = {
  prop: {
    label: 'Propietario / Inmueble',
    etapas: [
      { name: 'Prospección', objetivo: 'Identificar propietarios e inmuebles con potencial real de venta.', tu: 'Defines zonas, perfil de inmueble y prioridades de búsqueda.', tech: 'KAIROS organiza señales y contactos; BROX registra prospectos y su estado.', metrica: 'Prospectos nuevos · zonas activas · contactos iniciados.' },
      { name: 'Captación', objetivo: 'Conseguir el encargo del inmueble con condiciones claras.', tu: 'Negocias exclusividad, precio referencial y expectativas con el propietario.', tech: 'KAIROS prepara argumentos y registra acuerdos; BROX guarda la captación y sus términos.', metrica: 'Captaciones firmadas · tasa contacto→captación.' },
      { name: 'Validación', objetivo: 'Confirmar que el inmueble es viable para publicar.', tu: 'Revisas situación legal básica, precio de mercado y estado del inmueble.', tech: 'KAIROS reúne datos y dudas; BROX marca pendientes de validación.', metrica: 'Inmuebles validados · pendientes por resolver.' },
      { name: 'Preparación', objetivo: 'Ordenar la información antes de publicar.', tu: 'Reúnes fotos, datos y argumentos, y defines el mensaje.', tech: 'KAIROS arma fichas y checklist; BROX centraliza el material del inmueble.', metrica: 'Inmuebles listos para publicar · completitud de ficha.' },
      { name: 'Publicación', objetivo: 'Publicar con intención, canal y mensaje correctos.', tu: 'Eliges canales, mensaje y momento; defines el seguimiento.', tech: 'KAIROS sugiere mensaje y responde primeras consultas; BROX registra dónde se publicó.', metrica: 'Publicaciones activas · consultas por canal.' },
      { name: 'Gestión de interesados', objetivo: 'Filtrar interesados, coordinar visitas y obtener evidencia del mercado.', tu: 'Defines criterios, decides prioridades, reportas al propietario.', tech: 'KAIROS responde, califica, coordina visitas, registra objeciones y arma el reporte al propietario.', metrica: 'Consultas calificadas · visitas realizadas · conversión consulta→visita→oferta.' },
      { name: 'Negociación', objetivo: 'Conducir ofertas y contraofertas hacia un acuerdo.', tu: 'Negocias precio y condiciones; alineas a propietario y comprador.', tech: 'KAIROS ordena la conversación y registra acuerdos; BROX alerta riesgos y tiempos.', metrica: 'Ofertas recibidas · ofertas→acuerdo · tiempo de negociación.' },
      { name: 'Formalización', objetivo: 'Cerrar la operación con todo en regla.', tu: 'Coordinas documentos, firmas y entrega.', tech: 'KAIROS organiza los próximos pasos; BROX deja trazabilidad del cierre.', metrica: 'Cierres formalizados · tiempo captación→cierre.' },
    ],
  },
  comp: {
    label: 'Comprador / Interesado',
    etapas: [
      { name: 'Contacto', objetivo: 'Atender al interesado con rapidez y orden.', tu: 'Recibes la consulta y defines cómo responder.', tech: 'KAIROS responde al instante y registra el interés; BROX crea el contacto.', metrica: 'Consultas atendidas · tiempo de primera respuesta.' },
      { name: 'Calificación', objetivo: 'Entender necesidad, presupuesto y urgencia.', tu: 'Decides si el interesado es prioritario y cómo avanzar.', tech: 'KAIROS pregunta y califica necesidad, presupuesto y urgencia.', metrica: 'Consultas calificadas · % prioritarios.' },
      { name: 'Viabilidad', objetivo: 'Confirmar que lo que busca existe y es alcanzable.', tu: 'Contrastas expectativa con la oferta disponible y el presupuesto.', tech: 'KAIROS cruza requisitos con inmuebles; BROX marca coincidencias.', metrica: 'Interesados viables · ajuste expectativa-presupuesto.' },
      { name: 'Selección', objetivo: 'Elegir los inmuebles adecuados para mostrar.', tu: 'Priorizas opciones según criterio y encaje.', tech: 'KAIROS arma la lista corta; BROX guarda las opciones enviadas.', metrica: 'Opciones enviadas · opciones→interés.' },
      { name: 'Visita', objetivo: 'Coordinar y realizar visitas con propósito.', tu: 'Agendas, acompañas y recoges impresiones.', tech: 'KAIROS coordina la visita y recuerda; BROX registra resultado y objeciones.', metrica: 'Visitas realizadas · visita→oferta.' },
      { name: 'Oferta', objetivo: 'Obtener una oferta concreta del interesado.', tu: 'Trabajas objeciones y acompañas la decisión.', tech: 'KAIROS registra objeciones y próximos pasos; BROX alerta oportunidades en riesgo.', metrica: 'Ofertas presentadas · interés→oferta.' },
      { name: 'Formalización', objetivo: 'Cerrar con el comprador en regla.', tu: 'Coordinas documentos y firma.', tech: 'KAIROS ordena los pasos; BROX deja trazabilidad.', metrica: 'Cierres · tiempo oferta→cierre.' },
    ],
  },
  broker: {
    label: 'Bróker / Líder',
    etapas: [
      { name: 'Calificación de captación', objetivo: 'Decidir qué captaciones valen la pena.', tu: 'Filtras captaciones por potencial y encaje con la estrategia.', tech: 'BROX prioriza captaciones; KAIROS aporta el contexto de las conversaciones.', metrica: 'Captaciones aceptadas · % de calidad.' },
      { name: 'Auditoría comercial', objetivo: 'Revisar el avance real de cada operación.', tu: 'Detectas dónde se estanca el proceso y por qué.', tech: 'BROX muestra estados y cuellos de botella; KAIROS resume conversaciones.', metrica: 'Operaciones al día · etapas estancadas.' },
      { name: 'Control de negociación', objetivo: 'Intervenir a tiempo donde hay riesgo.', tu: 'Decides cuándo entrar y cómo apoyar al agente.', tech: 'BROX alerta riesgos y oportunidades calientes; KAIROS da el detalle.', metrica: 'Intervenciones a tiempo · oportunidades salvadas.' },
      { name: 'Validación de cierre', objetivo: 'Confirmar que el cierre cumple el método.', tu: 'Revisas condiciones, documentos y trazabilidad.', tech: 'BROX valida el checklist de cierre; KAIROS ordena pendientes.', metrica: 'Cierres validados · incidencias.' },
      { name: 'Análisis de desempeño', objetivo: 'Medir y mejorar por agente, inmueble, canal y etapa.', tu: 'Lees resultados y decides ajustes y formación.', tech: 'BROX entrega métricas y comparativos; KAIROS alimenta los datos.', metrica: 'Desempeño por agente · conversión por etapa.' },
    ],
  },
};

const kairosAgente = [
  'Atiende y responde consultas al instante.',
  'Registra y califica necesidad, presupuesto y urgencia.',
  'Agenda visitas y deja la próxima acción.',
  'Resume cada conversación para tu seguimiento.',
];

export const profiles = {
  solo: {
    profileLabel: 'Trabajo independiente',
    heroMicro: 'Para quien atiende propietarios, interesados y publicaciones por su cuenta.',
    titular: 'Ordena tu trabajo y proyecta una imagen más profesional, aunque trabajes de forma independiente.',
    apoyo: 'Atiendes propietarios, interesados, publicaciones, visitas y seguimiento tú mismo. SIVAN te ayuda a preparar mejor, publicar con intención y gestionar interesados con más orden, sin reemplazar tu criterio.',
    dolor: [
      'Demasiado depende de tu memoria y de tus chats.',
      'Publicas inmuebles sin tener siempre la información ordenada.',
      'Las consultas llegan, pero no todas tienen próxima acción clara.',
      'Algunos interesados se enfrían porque el seguimiento no queda visible.',
      'Cuesta saber qué canal, mensaje o inmueble funciona mejor.',
    ],
    metodoMode: 'agente',
    kairosTag: 'copiloto conversacional',
    kairosFraming: 'Tu copiloto conversacional para atender, registrar, calificar y dar seguimiento. Tú mantienes el criterio.',
    kairosBullets: kairosAgente,
    broxView: 'individual',
    broxTitle: 'vista individual',
    broxNote: 'Vista personal de tus inmuebles, interesados, tareas, alertas y métricas. No muestra información de otros agentes.',
    diagnosticoName: 'Diagnóstico gratuito',
    diagnosticoText: 'Test de 2 minutos. Evalúa Preparación, Publicación y Gestión de interesados.',
    programaTipo: 'Oferta principal',
    programaText: '4 semanas para preparar mejor, publicar con intención y gestionar interesados con más orden.',
    programaCta: 'Postular al Programa Fundadores',
    ctaPrincipal: 'Quiero mi diagnóstico gratuito',
    ctaSecundario: 'Postular al Programa Fundadores',
    ctaApoyo: 'Ver cómo funciona',
  },
  agencia: {
    profileLabel: 'Estoy en una agencia',
    heroMicro: 'Para quien compite dentro de una agencia y necesita diferenciarse.',
    titular: 'Diferénciate con método, responde mejor y defiende tu valor con argumentos.',
    apoyo: 'En una agencia, no gana solo quien se mueve más. Gana quien prepara mejor, responde a tiempo, hace seguimiento y puede demostrar con claridad qué está pasando con cada oportunidad.',
    dolor: [
      'Compites por resultados y necesitas mostrar profesionalismo.',
      'Tus oportunidades pueden perderse por falta de seguimiento visible.',
      'Necesitas responder mejor sin depender de estar conectado todo el día.',
      'Te conviene reportar con más claridad a tu agencia o líder.',
      'Debes defender tu valor con argumentos, no solo con actividad.',
    ],
    metodoMode: 'agente',
    kairosTag: 'copiloto conversacional',
    kairosFraming: 'Atiende y ordena consultas para que llegues con mejor información a reuniones, reportes o cierres. Tú mantienes el criterio.',
    kairosBullets: kairosAgente,
    broxView: 'individual',
    broxTitle: 'vista individual',
    broxNote: 'Tu propia cartera, interesados, tareas y métricas personales. No ves métricas de otros agentes salvo permisos definidos por la empresa.',
    diagnosticoName: 'Diagnóstico gratuito',
    diagnosticoText: 'Evalúa Preparación, Publicación y Gestión de interesados, con foco en orden personal y diferenciación.',
    programaTipo: 'Oferta principal',
    programaText: 'Enfoque en diferenciarte, responder mejor y defender tu valor con argumentos.',
    programaCta: 'Postular al Programa Fundadores',
    ctaPrincipal: 'Quiero mi diagnóstico gratuito',
    ctaSecundario: 'Postular al Programa Fundadores',
    ctaApoyo: 'Hablar con SIVAN',
  },
  equipo: {
    profileLabel: 'Lidero un equipo',
    heroMicro: 'Para quien dirige un equipo o una agencia y necesita ver dónde intervenir.',
    titular: 'Estandariza y mide tu operación sin perseguir cada conversación.',
    apoyo: 'Liderar un equipo no debería significar revisar chats, pedir reportes a última hora o enterarte tarde de una oportunidad caliente. SIVAN te ayuda a ver dónde intervenir, qué está en riesgo y qué necesita atención.',
    dolor: [
      'No siempre sabes qué captaciones valen la pena.',
      'Las alertas llegan tarde o dependen de que alguien las reporte.',
      'Cuesta ver dónde se caen las oportunidades.',
      'Hay consultas sin seguimiento oportuno.',
      'No puedes medir bien por agente, inmueble, canal o etapa.',
      'Revisar todo manualmente consume tiempo y desgasta al equipo.',
    ],
    metodoMode: 'lider',
    resumenEquipo: 'Ves Propietario/Inmueble y Comprador/Interesado como señales de lo que ocurre en el equipo, no como tu recorrido personal de trabajo.',
    kairosTag: 'fuente conversacional del equipo',
    kairosFraming: 'La fuente que ordena las conversaciones del equipo y alimenta información útil hacia BROX. Sin revisar chats uno por uno.',
    kairosBullets: [
      'Captura información desde la atención diaria del equipo.',
      'Ordena y clasifica cada conversación.',
      'Alimenta señales, riesgos y alertas hacia BROX.',
      'Te entrega lo relevante sin que persigas cada chat.',
    ],
    broxView: 'equipo',
    broxTitle: 'dashboard de equipo',
    broxNote: 'Decisiones pendientes, alertas, riesgos, rendimiento y seguimiento del equipo. Control sin revisar cada chat ni todo de todos.',
    diagnosticoName: 'Diagnóstico operativo',
    diagnosticoText: 'Revisa orden, seguimiento, alertas, control, estandarización y necesidades de formación del equipo.',
    programaTipo: 'Opción secundaria',
    programaText: 'Alinea al equipo con una base profesional común: procesos más claros, mejor seguimiento comercial y una gestión más ordenada desde el primer nivel.',
    programaCta: 'Capacitar a mi equipo',
    ctaPrincipal: 'Solicitar diagnóstico operativo',
    ctaSecundario: 'Solicitar demo',
    ctaApoyo: 'Capacitar a mi equipo en Nivel 1',
  },
};

export const profileLabels = {
  solo: { t: 'Trabajo independiente', sub: 'Agente independiente' },
  agencia: { t: 'Estoy en una agencia', sub: 'Agente dentro de una agencia' },
  equipo: { t: 'Lidero un equipo', sub: 'Broker o líder comercial' },
};

export const levelDefs = [
  { n: 1, status: 'ABIERTO AHORA', open: true, title: 'Preparación · Publicación · Gestión de interesados', detail: 'El foco de esta primera cohorte. En 4 semanas implementas el Nivel 1 sobre tu operación real, acompañado paso a paso y con KAIROS y BROX activos.' },
  { n: 2, status: 'PRÓXIMAMENTE', open: false, title: 'Prospección · Captación · Validación', detail: 'La siguiente apertura: conseguir y validar inmuebles con método. Se habilita al cerrar la cohorte del Nivel 1.' },
  { n: 3, status: 'MÁS ADELANTE', open: false, title: 'Negociación · Formalización · medición avanzada · trazabilidad', detail: 'El nivel avanzado: negociar, formalizar y medir todo el proceso. Disponible después del Nivel 2.' },
];

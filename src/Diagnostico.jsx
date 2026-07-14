import { useState } from 'react';
import { s, H } from './lib.jsx';
import { C, ASSETS } from './theme.js';
import { WhatsAppIcon } from './icons.jsx';
import { wppUrl } from './contact.js';
import { QUESTIONS, STAGES, STAGE_ORDER, ACTIONS, scoreDiagnostico } from './diagnostico-data.js';

const N = QUESTIONS.length;
const HOME = './';

// Color del nivel (semáforo sobrio).
const levelColor = (total) => (total <= 5 ? C.redDeep : total <= 11 ? C.blue : C.green);

export default function Diagnostico() {
  const [step, setStep] = useState('intro');     // 'intro' | 0..N-1 | 'lead' | 'result'
  const [answers, setAnswers] = useState(Array(N).fill(null));
  const [lead, setLead] = useState({ name: '', phone: '' });
  const [tried, setTried] = useState(false);

  const onQuestion = typeof step === 'number';
  const progress = step === 'intro' ? 0 : step === 'result' ? 100 : step === 'lead' ? 100 : ((step + 1) / N) * 100;

  const choose = (qi, p) => {
    setAnswers((a) => { const n = [...a]; n[qi] = p; return n; });
    setTimeout(() => setStep(qi < N - 1 ? qi + 1 : 'lead'), 240);
  };

  const back = () => {
    if (onQuestion) setStep(step === 0 ? 'intro' : step - 1);
    else if (step === 'lead') setStep(N - 1);
    else if (step === 'result') setStep('lead');
  };

  const nameOk = lead.name.trim().length >= 2;
  const phoneOk = lead.phone.replace(/\D/g, '').length >= 6;
  const submitLead = () => { setTried(true); if (nameOk && phoneOk) setStep('result'); };

  return (
    <div style={s('min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:26px 20px 64px;')}>

      {/* barra superior */}
      <div style={s('width:100%;max-width:760px;display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:8px;')}>
        <a href={HOME} style={s('display:inline-flex;align-items:center;')}>
          <img src={ASSETS.sivanLogo} alt="SIVAN Solutions" style={s('height:34px;width:auto;display:block;')} />
        </a>
        <a href={HOME} style={s("display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#565D67;")}>← Volver al inicio</a>
      </div>

      {/* progreso */}
      <div style={s('width:100%;max-width:760px;margin:14px 0 18px;')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;')}>
          <span style={s("display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;color:#3A414B;")}>
            <span style={s('width:18px;height:2px;border-radius:2px;background:' + C.blue + ';')} />DIAGNÓSTICO GRATUITO
          </span>
          <span style={s("font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:#565D67;")}>
            {onQuestion ? 'Pregunta ' + (step + 1) + ' de ' + N : step === 'result' ? 'Resultado' : step === 'lead' ? 'Último paso' : '2 minutos'}
          </span>
        </div>
        <div style={s('height:6px;background:#E6E8EC;border-radius:999px;overflow:hidden;')}>
          <div style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg,#2563EB,#60A5FA)', width: progress + '%', transition: 'width .45s cubic-bezier(.22,.61,.36,1)', boxShadow: '0 0 10px rgba(37,99,235,.5)' }} />
        </div>
      </div>

      {/* tarjeta principal */}
      <div key={String(step)} style={s('width:100%;max-width:760px;background:#fff;border:1px solid #E6E8EC;border-radius:24px;padding:38px;box-shadow:0 1px 2px rgba(16,19,26,.04),0 30px 64px -42px rgba(16,19,26,.34);animation:sivanPop .4s cubic-bezier(.22,.61,.36,1) both;')}>

        {step === 'intro' && <Intro onStart={() => setStep(0)} />}

        {onQuestion && (
          <Question
            qi={step} question={QUESTIONS[step]} selected={answers[step]}
            onChoose={(p) => choose(step, p)} onBack={back} />
        )}

        {step === 'lead' && (
          <Lead lead={lead} setLead={setLead} tried={tried} nameOk={nameOk} phoneOk={phoneOk}
            onSubmit={submitLead} onBack={back} />
        )}

        {step === 'result' && <Result answers={answers} lead={lead} />}
      </div>

      <div style={s("max-width:760px;margin-top:18px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#71777F;text-align:center;line-height:1.5;")}>
        Evalúa Preparación · Publicación · Gestión de interesados — el motor del Método SIVAN.
      </div>
    </div>
  );
}

/* ------------------------------- Intro ----------------------------------- */
function Intro({ onStart }) {
  return (
    <div>
      <div style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:34px;line-height:1.08;letter-spacing:-.02em;color:#10131A;")}>
        Test de Profesionalización del <span style={s('background:linear-gradient(100deg,#2563EB,#60A5FA);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;')}>Agente</span>
      </div>
      <p style={s('font-size:17px;font-weight:500;color:#10131A;margin:14px 0 0;line-height:1.55;max-width:46em;')}>
        Una autoevaluación breve basada en el motor SIVAN. Identifica en minutos dónde se te escapan
        oportunidades al <strong>preparar</strong>, <strong>publicar</strong> y <strong>dar seguimiento</strong> a tus inmuebles — y qué hacer al respecto.
      </p>
      <div style={s('display:flex;flex-wrap:wrap;gap:9px;margin-top:20px;')}>
        {STAGE_ORDER.map((k) => (
          <span key={k} style={s("display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#2563EB;background:#E8F1FF;border:1px solid #BFD3F7;border-radius:999px;padding:6px 13px;")}>
            <span style={s('width:6px;height:6px;border-radius:50%;background:' + C.blue + ';')} />{STAGES[k].name}
          </span>
        ))}
      </div>
      <div style={s('display:flex;flex-wrap:wrap;align-items:center;gap:13px;margin-top:28px;')}>
        <H as="button" onClick={onStart}
          style="display:inline-flex;align-items:center;gap:9px;background:#2563EB;color:#fff;border:0;cursor:pointer;border-radius:13px;padding:15px 26px;font-weight:700;font-size:16.5px;box-shadow:0 16px 32px -14px rgba(37,99,235,.95);transition:transform .18s ease,box-shadow .18s ease,background .18s ease;"
          hover="background:#1D4FD7;transform:translateY(-2px);box-shadow:0 22px 40px -12px rgba(37,99,235,1);">Comenzar test →</H>
        <span style={s("font-family:'JetBrains Mono',monospace;font-size:12px;color:#565D67;")}>8 preguntas · sin costo · sin compromiso</span>
      </div>
    </div>
  );
}

/* ------------------------------ Pregunta --------------------------------- */
function Question({ qi, question, selected, onChoose, onBack }) {
  return (
    <div>
      <div style={s('display:flex;align-items:center;gap:10px;margin-bottom:14px;')}>
        <span style={s("display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.06em;color:#1D4FD7;background:#E8F1FF;border:1px solid #BFD3F7;border-radius:999px;padding:5px 12px;")}>
          {STAGES[question.stage].name}
        </span>
        <span style={s("font-family:'JetBrains Mono',monospace;font-size:11px;color:#71777F;")}>{question.id}</span>
      </div>
      <div style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:25px;line-height:1.2;letter-spacing:-.01em;color:#10131A;")}>{question.q}</div>
      <div style={s('display:flex;flex-direction:column;gap:11px;margin-top:22px;')}>
        {question.opts.map((o, i) => {
          const on = selected === o.p;
          return (
            <H key={i} as="button" onClick={() => onChoose(o.p)}
              style={'display:flex;align-items:flex-start;gap:13px;width:100%;text-align:left;cursor:pointer;font-family:inherit;border-radius:15px;padding:16px 18px;font-size:15.5px;line-height:1.45;transition:transform .14s ease,box-shadow .14s ease,border-color .14s ease,background .14s ease;'
                + (on
                  ? 'background:#E8F1FF;border:1.5px solid #2563EB;color:#10131A;box-shadow:0 14px 30px -16px rgba(37,99,235,.6);'
                  : 'background:#fff;border:1.5px solid #D8DCE2;color:#2C313A;')}
              hover={on ? '' : 'border-color:#2563EB;transform:translateY(-2px);box-shadow:0 14px 30px -18px rgba(37,99,235,.45);'}>
              <span style={s('flex:0 0 auto;width:24px;height:24px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;transition:all .14s ease;margin-top:1px;'
                + (on ? 'background:#2563EB;border:1px solid #2563EB;color:#fff;' : 'background:#fff;border:1.5px solid #C9CDD3;color:transparent;'))}>✓</span>
              <span style={s('font-weight:' + (on ? '600' : '500') + ';')}>{o.t}</span>
            </H>
          );
        })}
      </div>
      <div style={s('margin-top:20px;')}>
        <H as="button" onClick={onBack}
          style="background:transparent;border:0;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12.5px;font-weight:600;color:#565D67;padding:6px 0;"
          hover="color:#10131A;">← Atrás</H>
      </div>
    </div>
  );
}

/* ------------------------------- Lead ------------------------------------ */
function Lead({ lead, setLead, tried, nameOk, phoneOk, onSubmit, onBack }) {
  const field = 'width:100%;border-radius:13px;padding:14px 16px;font-family:inherit;font-size:16px;color:#10131A;background:#fff;border:1.5px solid #D8DCE2;outline:none;transition:border-color .15s ease,box-shadow .15s ease;';
  const label = "font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.08em;color:#3A414B;margin-bottom:7px;display:block;";
  const err = (show) => (tried && show ? 'border-color:' + C.redDeep + ';' : '');
  return (
    <div>
      <div style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:27px;line-height:1.12;letter-spacing:-.02em;color:#10131A;")}>Tu resultado está listo.</div>
      <p style={s('font-size:16px;font-weight:500;color:#2C313A;margin:11px 0 0;line-height:1.55;max-width:44em;')}>
        Déjanos tu nombre y WhatsApp para mostrarte el resultado y enviarte la orientación con tus próximos pasos. Sin spam.
      </p>
      <div style={s('display:flex;flex-direction:column;gap:16px;margin-top:24px;max-width:420px;')}>
        <div>
          <label style={s(label)}>NOMBRE</label>
          <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })}
            placeholder="Tu nombre" style={s(field + err(!nameOk))} />
        </div>
        <div>
          <label style={s(label)}>WHATSAPP</label>
          <input value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            inputMode="tel" placeholder="Ej. 999 888 777" style={s(field + err(!phoneOk))} />
          {tried && !phoneOk && <div style={s('font-size:12.5px;color:' + C.redDeep + ';margin-top:6px;')}>Ingresa un número de WhatsApp válido.</div>}
        </div>
      </div>
      <div style={s('display:flex;flex-wrap:wrap;align-items:center;gap:13px;margin-top:26px;')}>
        <H as="button" onClick={onSubmit}
          style="display:inline-flex;align-items:center;gap:9px;background:#2563EB;color:#fff;border:0;cursor:pointer;border-radius:13px;padding:15px 26px;font-weight:700;font-size:16.5px;box-shadow:0 16px 32px -14px rgba(37,99,235,.95);transition:transform .18s ease,box-shadow .18s ease,background .18s ease;"
          hover="background:#1D4FD7;transform:translateY(-2px);box-shadow:0 22px 40px -12px rgba(37,99,235,1);">Ver mi resultado →</H>
        <H as="button" onClick={onBack}
          style="background:transparent;border:0;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12.5px;font-weight:600;color:#565D67;"
          hover="color:#10131A;">← Atrás</H>
      </div>
    </div>
  );
}

/* ------------------------------ Resultado -------------------------------- */
function Result({ answers, lead }) {
  const { total, pct, weakest, level } = scoreDiagnostico(answers);
  const col = levelColor(total);
  const minP = Math.min(pct.prep, pct.pub, pct.gest);
  // "Satisfecho": opera con método (≥12) y está sólido (≥67%) en TODAS las etapas.
  // En ese caso no marcamos nada como crítico: felicitamos y orientamos a escalar.
  const satisfied = total >= 12 && minP >= 67;
  const weakNames = weakest.map((k) => STAGES[k].name).join(' y ');
  const barGrad = (p) => (p < 50
    ? 'linear-gradient(90deg,' + C.redDeep + ',#E0796F)'
    : p < 80 ? 'linear-gradient(90deg,#2563EB,#60A5FA)'
      : 'linear-gradient(90deg,#1E9E6A,#34D399)');
  const showWeak = (k) => !satisfied && weakest.includes(k) && pct[k] < 80;

  const ESCALATE = [
    'Estandariza tu proceso en una sola herramienta para no depender de la memoria.',
    'Mide por canal, etapa y agente para sostener tus resultados.',
    'Automatiza seguimiento y reportes con KAIROS + BROX.',
  ];

  const msg = satisfied
    ? 'Hola SIVAN, soy ' + (lead.name || 'un agente') + '. Hice el Diagnóstico Gratuito: ' + total + '/16 (' + level.name + '). Ya opero con método y quiero sostenerlo y escalar con su tecnología.'
    : 'Hola SIVAN, soy ' + (lead.name || 'un agente') + '. Hice el Diagnóstico Gratuito: ' + total + '/16 (' + level.name + '). Mi etapa más débil es ' + weakNames + '. Quisiera orientación para profesionalizar mi operación.';
  const wpp = wppUrl(msg);

  return (
    <div>
      <div style={s("font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;color:#3A414B;")}>TU RESULTADO{lead.name ? ' · ' + lead.name.toUpperCase() : ''}</div>

      {/* medidor 0–16 */}
      <div style={s('display:flex;align-items:baseline;gap:10px;margin-top:12px;')}>
        <span style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:46px;line-height:1;color:" + col + ";")}>{total}</span>
        <span style={s('font-size:16px;font-weight:600;color:#565D67;')}>/ 16</span>
        <span style={s("margin-left:auto;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:" + col + ";")}>{level.name}</span>
      </div>
      <div style={s('height:12px;background:#E7E9EE;border-radius:999px;overflow:hidden;margin-top:12px;box-shadow:inset 0 1px 2px rgba(16,19,26,.08);')}>
        <div style={{ height: '100%', borderRadius: '999px', width: (total / 16) * 100 + '%', background: 'linear-gradient(90deg,' + col + ',' + col + 'cc)', boxShadow: '0 0 10px -1px ' + col, transition: 'width .9s cubic-bezier(.22,.61,.36,1)' }} />
      </div>
      <p style={s('font-size:16px;font-weight:500;color:#10131A;margin:16px 0 0;line-height:1.55;')}>{level.msg}</p>

      {/* % por etapa (semáforo: verde sólido · azul en progreso · rojo crítico) */}
      <div style={s('margin-top:24px;display:flex;flex-direction:column;gap:13px;')}>
        {STAGE_ORDER.map((k) => {
          const weak = showWeak(k);
          const strong = pct[k] >= 80;
          return (
            <div key={k}>
              <div style={s('display:flex;justify-content:space-between;align-items:center;font-size:13.5px;margin-bottom:5px;')}>
                <span style={s('font-weight:' + (weak ? '700' : '600') + ';color:' + (weak ? C.redDeep : '#2C313A') + ';')}>
                  {STAGES[k].name}{weak ? ' · a reforzar' : (strong ? ' · sólido' : '')}
                </span>
                <span style={s("font-family:'JetBrains Mono',monospace;font-weight:700;color:#10131A;")}>{pct[k]}%</span>
              </div>
              <div style={s('height:9px;background:#E7E9EE;border-radius:999px;overflow:hidden;')}>
                <div style={{ height: '100%', borderRadius: '999px', width: pct[k] + '%', background: barGrad(pct[k]), transition: 'width .9s cubic-bezier(.22,.61,.36,1)' }} />
              </div>
            </div>
          );
        })}
      </div>

      {satisfied ? (
        /* ---- Sin nada crítico: felicitación + cómo escalar ---- */
        <div style={s('margin-top:24px;background:linear-gradient(160deg,#F1FBF6,#E6F6EE);border:1px solid #BFE5D0;border-radius:18px;padding:22px;')}>
          <div style={s("display:inline-flex;align-items:center;gap:8px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#10131A;")}>
            <span style={s('display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:' + C.green + ';color:#fff;font-size:14px;font-weight:800;')}>✓</span>
            ¡Vas muy bien! Operas con método
          </div>
          <div style={s('font-size:15px;font-weight:500;color:#10131A;margin-top:8px;line-height:1.5;')}>
            Preparas, publicas y gestionas interesados con orden en las tres etapas — no hay fugas críticas. Tu siguiente salto es <strong>sostenerlo, medirlo y escalar</strong>:
          </div>
          <div style={s('display:flex;flex-direction:column;gap:9px;margin-top:14px;')}>
            {ESCALATE.map((a, i) => (
              <div key={i} style={s('display:flex;align-items:flex-start;gap:11px;font-size:15px;color:#10131A;line-height:1.45;')}>
                <span style={s("flex:0 0 auto;width:22px;height:22px;border-radius:7px;background:" + C.green + ";color:#fff;display:inline-flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;margin-top:1px;")}>{i + 1}</span>
                <span style={s('font-weight:500;')}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ---- Hay foco de mejora: acciones por etapa más débil ---- */
        <div style={s('margin-top:24px;background:linear-gradient(160deg,#F7FAFF,#EEF4FE);border:1px solid #BFD3F7;border-radius:18px;padding:22px;')}>
          <div style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#10131A;")}>Tu foco para esta semana</div>
          <div style={s('font-size:14px;color:#2C313A;margin-top:4px;font-weight:500;')}>Etapa más débil: <strong>{weakNames}</strong>. Empieza por aquí:</div>
          {weakest.map((k) => (
            <div key={k} style={s('margin-top:14px;')}>
              {weakest.length > 1 && <div style={s("font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.06em;color:#1D4FD7;margin-bottom:8px;")}>{STAGES[k].name.toUpperCase()}</div>}
              <div style={s('display:flex;flex-direction:column;gap:9px;')}>
                {ACTIONS[k].map((a, i) => (
                  <div key={i} style={s('display:flex;align-items:flex-start;gap:11px;font-size:15px;color:#10131A;line-height:1.45;')}>
                    <span style={s('flex:0 0 auto;width:22px;height:22px;border-radius:7px;background:#2563EB;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-family:\'JetBrains Mono\',monospace;font-size:11px;font-weight:700;margin-top:1px;')}>{i + 1}</span>
                    <span style={s('font-weight:500;')}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={s('display:flex;flex-wrap:wrap;gap:13px;margin-top:26px;')}>
        <H as="a" href={wpp} target="_blank" rel="noopener"
          style={'display:inline-flex;align-items:center;gap:11px;background:' + C.whatsapp + ';color:#fff;border-radius:13px;padding:15px 24px;font-weight:700;font-size:16.5px;box-shadow:0 16px 32px -14px rgba(37,211,102,.95);transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;'}
          hover="filter:brightness(1.05);transform:translateY(-2px);box-shadow:0 22px 42px -12px rgba(37,211,102,1);">
          <span style={s('display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:rgba(255,255,255,.2);flex:0 0 auto;')}><WhatsAppIcon size={19} /></span>
          Recibir orientación por WhatsApp
        </H>
        <H as="a" href={HOME + '#fundadores'}
          style="display:inline-flex;align-items:center;background:#fff;color:#8A6F2E;border:1.5px solid #D8C39A;border-radius:13px;padding:15px 24px;font-weight:700;font-size:15px;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease;"
          hover="border-color:#A88C52;transform:translateY(-2px);box-shadow:0 16px 30px -16px rgba(168,140,82,.8);">Ver Programa Fundadores</H>
      </div>
      <div style={s('margin-top:18px;')}>
        <a href={HOME} style={s("font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#565D67;")}>← Volver al inicio</a>
      </div>
    </div>
  );
}

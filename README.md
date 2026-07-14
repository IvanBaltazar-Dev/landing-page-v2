# SIVAN Solutions — Landing

Profile-conditioned, ultra-premium landing page for SIVAN Solutions. Built with **React 18 + Vite + Anime.js**.

The page shows a common entry (hero + selector), then re-renders the content below for the chosen profile — **Trabajo independiente**, **Estoy en una agencia**, or **Lidero un equipo** — exactly as specified: no se muestra todo a todos.

## Run

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

> Requires Node 18+. On first `npm install`, Vite/esbuild download a small native binary.

## What's implemented

- **Pearl / cream hero** with a generated architectural proptech background (floor plans, property nodes, buildings and data routes), scanning property visual, metallic frame and floating KAIROS/BROX cards.
- **Selector** ("¿Cómo trabajas hoy?") — three cards that switch the whole conditioned section via React state. The chosen profile persists while navigating.
- **Método SIVAN completo** with three interactive journeys: Propietario/Inmueble (8 stages), Comprador/Interesado (7 stages), and Bróker/Líder (5 stages). Every stage opens its objective, professional responsibility, technology role and key metric.
- **Diagnóstico**, **KAIROS** (animated chat copilot + K→BROX data connection), and **BROX**, whose individual/team previews reproduce the current ControlLocal Dashboard structure: work queue, operational signals, capture health and performance.
- **Programa Fundadores** — high-contrast platinum and champagne-gold presentation that explicitly limits the first cohort to four implementation stages: Preparación, Publicación, Gestión de interesados and Seguimiento comercial.
- **Anime.js motion system** — scoped React animations, staggered introductions, moving metallic sheen, floating product cards and scroll-synchronised background parallax.
- **KAIROS + BROX fusion engine** — animated commercial story from conversation to qualification, visit, next action and operational decision.
- **Transparencia**, profile-filtered **FAQ** accordion, **Contacto** (WhatsApp + email), final CTA, and footer with colored social icons.
- Reveal-on-scroll, full hover interactivity, and responsive collapse on narrow screens.

## Project structure

```
index.html            # entry + Google Fonts
src/main.jsx          # React root
src/App.jsx           # state, timers, computed view-model, full markup
src/data.js           # profiles, recorridos, FAQ, chat, levels (content)
src/lib.jsx           # CSS-string→style-object parser, hover wrapper, image placeholder
src/styles.css        # resets, keyframes, responsive rules
public/assets/        # sivan-logo / kairos-logo / brox-logo / casa-venta (.webp, optimizados)
.assets-original/     # PNG originales (fuente para re-exportar; fuera del build)
scripts/optimize-assets.mjs  # regenera los .webp desde .assets-original/ (requiere `sharp`)
```

## Placeholders to replace with real data

- WhatsApp: `+51 999 999 999` → `wa.me/51999999999`
- Email: `hola@sivansolutions.com`
- Social URLs: `/sivansolutions` (Facebook, TikTok, YouTube)
- Programa Fundadores: cupos **8 / 20** and price **US$ 390 / 690**
- Property images: the hero and 360° slots show styled placeholders — drop real photos into `public/assets/` and pass `src` to `<ImageSlot>` in `App.jsx`.

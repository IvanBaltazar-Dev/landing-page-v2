// ============================================================================
//  SIVAN · Import brand assets (one-off, v3 professional pass)
//  Pulls the chosen icons from the brand kit + the cinematic render, backs up
//  the source PNGs to .assets-original/, and emits optimized WebP into
//  public/assets/. Non-destructive (nothing is deleted/moved).
//
//  Usage:  node scripts/import-brand-assets.mjs
//  Requires: sharp  (npm install sharp --no-save --legacy-peer-deps)
// ============================================================================
import sharp from 'sharp';
import { mkdir, copyFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ICONS = 'F:/products/sivan_solutions (1)/icons';
const SIVAN = `${ICONS}/Sistema visual completo SIVAN/assets`;
const KAIROS = `${ICONS}/Sistema visual KAIROS/assets`;
const BROX = `${ICONS}/Producción técnica BROX landing/entrega`;
const PICS = 'C:/Users/Ivan Piero Baltazar/Pictures/SIVAN/landing_page';

const ASSETS = path.resolve('public/assets');
const BACKUP = path.resolve('.assets-original');

// h / w = max box (fit:inside, never enlarge/distort). photo=true → no alpha need.
const JOBS = [
  // ── SIVAN ────────────────────────────────────────────────────────────────
  { src: `${SIVAN}/01-logo-horizontal/logo-horizontal-original.png`, orig: 'sivan-logo.png',          out: 'sivan-logo.webp',          h: 160, q: 92 },
  { src: `${SIVAN}/04-isotipo/isotipo-original.png`,                  orig: 'sivan-isotipo.png',        out: 'sivan-isotipo.webp',        w: 220, h: 220, q: 92 },
  { src: `${SIVAN}/05-favicon/favicon-512.png`,                       orig: 'sivan-favicon.png',        out: 'sivan-favicon.webp',        w: 256, h: 256, q: 92 },
  { src: `${SIVAN}/07-sello-cohorte/sello-cohorte-circular.png`,      orig: 'sivan-sello-cohorte.png',  out: 'sivan-sello-cohorte.webp',  w: 520, h: 520, q: 90 },
  // ── KAIROS ───────────────────────────────────────────────────────────────
  { src: `${KAIROS}/01-logo-horizontal/kairos-horizontal-original.png`, orig: 'kairos-logo.png',        out: 'kairos-logo.webp',          h: 170, q: 92 },
  { src: `${KAIROS}/04-isotipo/isotype-blanco.png`,                    orig: 'kairos-iso-blanco.png',   out: 'kairos-iso-blanco.webp',    w: 200, h: 200, q: 92 },
  // ── BROX (premium = gold) ─────────────────────────────────────────────────
  { src: `${BROX}/horizontal-sin-eslogan/sin-eslogan-1200x400-premium.png`, orig: 'brox-logo.png',      out: 'brox-logo.webp',            h: 170, q: 92 },
  { src: `${BROX}/isotipo/isotipo-512x512-premium.png`,               orig: 'brox-iso.png',             out: 'brox-iso.webp',             w: 200, h: 200, q: 92 },
  // ── Photographic (cinematic + page background) ────────────────────────────
  { src: `${PICS}/ChatGPT Image 13 jul 2026, 10_22_08 a.m.png`,       orig: 'kairos-brox-cinematic.png', out: 'kairos-brox-cinematic.webp', w: 1680, q: 80, photo: true },
  { src: path.join(ASSETS, 'sivan-proptech-bg-v2.png'),              orig: 'sivan-proptech-bg-v2.png', out: 'sivan-proptech-bg-v2.webp', w: 1920, q: 76, photo: true },
];

const kb = (n) => (n / 1024).toFixed(1) + ' KB';

async function main() {
  if (!existsSync(BACKUP)) await mkdir(BACKUP, { recursive: true });
  let tIn = 0, tOut = 0;

  for (const job of JOBS) {
    let src = job.src;
    if (!existsSync(src)) src = path.join(BACKUP, job.orig); // re-run: source from backup
    if (!existsSync(src)) { console.warn(`!  missing ${job.orig} (${job.src})`); continue; }

    // preserve the source PNG in the backup folder (idempotent)
    const backupPath = path.join(BACKUP, job.orig);
    if (path.resolve(src) !== path.resolve(backupPath)) await copyFile(src, backupPath);

    const before = (await stat(src)).size;
    const meta = await sharp(src).metadata();
    const dst = path.join(ASSETS, job.out);

    let pipe = sharp(src).resize({ width: job.w, height: job.h, fit: 'inside', withoutEnlargement: true });
    pipe = job.photo
      ? pipe.webp({ quality: job.q, effort: 6 })
      : pipe.webp({ quality: job.q, effort: 6, alphaQuality: 100 });
    await pipe.toFile(dst);

    const after = (await stat(dst)).size;
    const om = await sharp(dst).metadata();
    tIn += before; tOut += after;
    console.log(
      `✓ ${job.out.padEnd(26)} ${(meta.width + 'x' + meta.height).padEnd(11)} alpha:${om.hasAlpha ? 'Y' : 'n'} ` +
      `${kb(before).padStart(10)} → ${om.width}x${om.height} ${kb(after).padStart(9)}`
    );
  }
  console.log(`\nTotal: ${kb(tIn)} → ${kb(tOut)}  (-${(100 * (1 - tOut / tIn)).toFixed(1)}%)`);
}
main().catch((e) => { console.error(e); process.exit(1); });

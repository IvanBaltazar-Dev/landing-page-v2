// ============================================================================
//  SIVAN · Optimización de assets (one-off)
//  Convierte los PNG pesados de public/assets a WebP, redimensionando a ~2x
//  del tamaño real de uso en la landing. Los originales se preservan en
//  .assets-original/ (fuera de public/, para que no entren al build).
//
//  Uso:  node scripts/optimize-assets.mjs
//  Requiere: sharp  (npm install sharp --no-save)
// ============================================================================
import sharp from 'sharp';
import { mkdir, rename, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ASSETS_DIR = path.resolve('public/assets');
const BACKUP_DIR = path.resolve('.assets-original');

// width/height = caja máxima del resultado (manteniendo proporción con `fit:inside`).
// fit:'inside' nunca agranda ni deforma: encoja al borde que toque primero.
const JOBS = [
  // logos (transparencia, bordes nítidos / degradados metálicos) → quality alto
  { in: 'sivan-logo.png',  out: 'sivan-logo.webp',  h: 76,   quality: 90 },
  { in: 'brox-logo.png',   out: 'brox-logo.webp',   h: 92,   quality: 90 },
  { in: 'kairos-logo.png', out: 'kairos-logo.webp', h: 80,   quality: 90 },
  // iconos de marca cuadrados (BrandIcon, máx 36px en pantalla) → 72px (2x)
  { in: 'brox-b.png',      out: 'brox-b.webp',      w: 72, h: 72, quality: 90 },
  { in: 'Kairos-k.png',    out: 'Kairos-k.webp',    w: 72, h: 72, quality: 90 },
  // foto del inmueble (object-fit:cover en contenedor ~515x478) → ~1024px, foto
  { in: 'casa-venta.png',  out: 'casa-venta.webp',  w: 1024, h: 1024, quality: 82 },
];

const kb = (n) => (n / 1024).toFixed(1) + ' KB';

async function main() {
  if (!existsSync(BACKUP_DIR)) await mkdir(BACKUP_DIR, { recursive: true });

  let totalIn = 0, totalOut = 0;
  for (const job of JOBS) {
    // Fuente: public/assets/ (primera pasada) o .assets-original/ (re-ejecución).
    let src = path.join(ASSETS_DIR, job.in);
    if (!existsSync(src)) src = path.join(BACKUP_DIR, job.in);
    const dst = path.join(ASSETS_DIR, job.out);
    if (!existsSync(src)) { console.warn(`!  falta ${job.in}, omitido`); continue; }

    const before = (await stat(src)).size;
    const meta = await sharp(src).metadata();

    await sharp(src)
      .resize({
        width: job.w,
        height: job.h,
        fit: 'inside',           // mantiene proporción, nunca deforma
        withoutEnlargement: true // no agrandar si el origen ya es menor
      })
      .webp({ quality: job.quality, effort: 6, alphaQuality: 100 })
      .toFile(dst);

    const after = (await stat(dst)).size;
    const outMeta = await sharp(dst).metadata();
    totalIn += before; totalOut += after;

    const pct = (100 * (1 - after / before)).toFixed(1);
    console.log(
      `✓ ${job.in.padEnd(16)} ${meta.width}x${meta.height} ${kb(before).padStart(10)}` +
      ` →  ${job.out.padEnd(16)} ${outMeta.width}x${outMeta.height} ${kb(after).padStart(9)}  (-${pct}%)`
    );
  }

  // Mover los PNG originales (incl. el huérfano brox-vertical.png) al backup
  for (const f of await readdir(ASSETS_DIR)) {
    if (f.toLowerCase().endsWith('.png')) {
      await rename(path.join(ASSETS_DIR, f), path.join(BACKUP_DIR, f));
    }
  }

  console.log(`\nTotal:  ${kb(totalIn)}  →  ${kb(totalOut)}  ` +
    `(-${(100 * (1 - totalOut / totalIn)).toFixed(1)}%)`);
  console.log(`Originales PNG movidos a ${path.relative(process.cwd(), BACKUP_DIR)}/`);
}

main().catch((e) => { console.error(e); process.exit(1); });

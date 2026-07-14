import { useState, createElement } from 'react';

/**
 * Convert a CSS declaration string ("color:#fff;padding:8px") into a React
 * style object with camelCased keys. Lets us port the design's inline style
 * strings (and the JS-built style strings) verbatim. Results are cached.
 */
const _cache = new Map();

function camel(prop) {
  prop = prop.trim();
  if (prop.startsWith('--')) return prop; // CSS custom property — keep as-is
  const vendor = prop.startsWith('-');
  const parts = prop.split('-').filter(Boolean);
  let out = '';
  parts.forEach((part, i) => {
    if (out === '') {
      out = vendor ? part.charAt(0).toUpperCase() + part.slice(1) : part;
    } else {
      out += part.charAt(0).toUpperCase() + part.slice(1);
    }
  });
  return out;
}

export function s(css) {
  if (!css) return {};
  if (typeof css !== 'string') return css; // already an object
  if (_cache.has(css)) return _cache.get(css);
  const obj = {};
  css.split(';').forEach((decl) => {
    const idx = decl.indexOf(':');
    if (idx === -1) return;
    const prop = decl.slice(0, idx).trim();
    const val = decl.slice(idx + 1).trim();
    if (!prop || !val) return;
    obj[camel(prop)] = val;
  });
  _cache.set(css, obj);
  return obj;
}

/**
 * Hover-aware element. Mirrors the design's `style-hover` semantics: the
 * `hover` style merges on top of `style` while the pointer is over it.
 * Accepts CSS strings or style objects for both.
 */
export function H({ as = 'div', style, hover, children, ...rest }) {
  const [over, setOver] = useState(false);
  const base = s(style);
  const merged = over && hover ? { ...base, ...s(hover) } : base;
  return createElement(
    as,
    {
      ...rest,
      style: merged,
      onMouseEnter: (e) => { setOver(true); rest.onMouseEnter && rest.onMouseEnter(e); },
      onMouseLeave: (e) => { setOver(false); rest.onMouseLeave && rest.onMouseLeave(e); },
    },
    children
  );
}

/**
 * Fillable image placeholder stand-in. The prototype used a drag-to-fill
 * <image-slot>; in production we render a styled empty state with the caption.
 * Pass `src` to show a real image instead.
 */
export function ImageSlot({ radius = 12, placeholder = 'Drop an image', src, style, priority = false, width, height }) {
  const wrap = {
    ...s(style),
    borderRadius: (s(style).borderRadius) || radius + 'px',
    overflow: 'hidden',
    background: src ? '#ECEDEF' : 'linear-gradient(135deg,#F2F1ED,#E4E5E8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  if (src) {
    // `priority` → imagen crítica (LCP): carga eager + alta prioridad de red.
    return (
      <div style={wrap}>
        <img
          src={src}
          alt={placeholder}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }
  return (
    <div style={wrap}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        letterSpacing: '.04em',
        color: '#9AA0A8',
        textAlign: 'center',
        padding: '0 10px',
      }}>{placeholder}</span>
    </div>
  );
}

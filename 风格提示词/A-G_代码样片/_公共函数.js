// A–G 参考实现共用的小工具函数
const SANS = '"Noto Sans SC", "PingFang SC", sans-serif';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const TAU = Math.PI * 2;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ss = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const eOut = t => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const eBack = t => { t = clamp(t, 0, 1); const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const nz = (x, y, t) => Math.sin(x * 1.7 + t) * Math.cos(y * 1.3 - t * 0.7) + Math.sin((x + y) * 0.9 + t * 0.5) * 0.5 + Math.cos(x * 0.6 - y * 1.1 - t * 0.3) * 0.35;
const hex = (h, a = 1) => { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
const toRGB = h => h[0] === '#' ? (n => [n >> 16 & 255, n >> 8 & 255, n & 255])(parseInt(h.slice(1), 16)) : h.match(/[\d.]+/g).slice(0, 3).map(Number);
const mixHex = (h1, h2, t) => { const a = toRGB(h1), b = toRGB(h2), c = k => Math.round(lerp(a[k], b[k], t)); return `rgb(${c(0)},${c(1)},${c(2)})`; };
function vgrad(ctx, h, c1, c2) { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c1); g.addColorStop(1, c2); return g; }
function glowDot(ctx, x, y, r, col, a) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, hex(col, a)); g.addColorStop(1, hex(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
function offscreen(w, h, dpr) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w * dpr)); c.height = Math.max(1, Math.round(h * dpr)); const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0); return [c, x]; }
function paperTex(w, h, dpr, base, seed) {
  const [c, x] = offscreen(w, h, dpr); const r = rng(seed);
  x.fillStyle = base; x.fillRect(0, 0, w, h);
  for (let i = 0; i < w * h / 40; i++) { x.fillStyle = r() < .5 ? 'rgba(0,0,0,.035)' : 'rgba(255,255,255,.05)'; x.fillRect(r() * w, r() * h, 1, 1); }
  x.strokeStyle = 'rgba(90,70,40,.05)'; x.lineWidth = .6;
  for (let i = 0; i < w * h / 900; i++) { const px = r() * w, py = r() * h, a = r() * TAU, l = 4 + r() * 14; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l); x.stroke(); }
  return c;
}

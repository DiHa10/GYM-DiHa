// Draws the 2-frame illustrations (ex/<slug>-0.svg, -1.svg) for library exercises that have no photo
// in free-exercise-db. Reuses the app mascot so the style matches.  Run: node tools/gen-art.mjs
import { writeFileSync } from 'node:fs';
import { actSvg, pose } from '../mascot.js';
import { photoSlug } from '../library.js';

const ACC = '#4a7fa7', SOFT = '#9fb7cc';

// Figure (mascot coords 140x160, feet at y~152) placed in the 300x200 scene
function figure(p, { x = 150, floor = 168, s = 1.05, rk = false, state = 'happy' } = {}) {
  const svg = actSvg({ name: '', dur: 1, frames: [pose(p)], rk }, state, true);
  const w = 140 * s, h = 160 * s;
  return svg.replace('<svg viewBox="0 0 140 160"', `<svg x="${(x - w / 2).toFixed(1)}" y="${(floor - 152 * s).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" viewBox="0 0 140 160"`);
}

const shuttle = (x, y, r = 0, ghost = false) => `<g transform="translate(${x} ${y}) rotate(${r})" ${ghost ? 'opacity=".55"' : ''}>
  <path d="M-6 -12 L6 -12 L2.5 0 L-2.5 0 Z" fill="#fff" stroke="#8b9bb0" stroke-width="1.2" ${ghost ? 'stroke-dasharray="2 2"' : ''}/>
  <path d="M-3 -12 L-1.2 0 M3 -12 L1.2 0" stroke="#c3cdd9" stroke-width=".8"/>
  <circle cy="2.5" r="3.2" fill="#f1e2c6" stroke="#b49a72" stroke-width="1"/></g>`;
const arrow = (d, { dash = true, color = ACC, w = 2.5 } = {}) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" ${dash ? 'stroke-dasharray="6 5"' : ''} marker-end="url(#arr)"/>`;
const motion = d => `<path d="${d}" fill="none" stroke="${SOFT}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 7"/>`;

function scene(body, { floor = true } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="600" height="400">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f7fb"/><stop offset="1" stop-color="#dde7f1"/></linearGradient>
  <marker id="arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${ACC}"/></marker>
</defs>
<rect width="300" height="200" fill="url(#bg)"/>
${floor ? '<rect y="158" width="300" height="42" fill="#cfdbe7"/><path d="M0 158 H300" stroke="#bccbdb" stroke-width="1.5"/>' : ''}
${body}
</svg>`;
}

// Badminton court seen from behind the player: net at the top, 6 target corners
const court = (active) => {
  const pts = { fl: [92, 124], fr: [208, 124], ml: [56, 150], mr: [244, 150], bl: [40, 182], br: [260, 182] }, c = [150, 160];
  return `<path d="M24 196 L276 196 L226 116 L74 116 Z" fill="#7fae95" stroke="#fff" stroke-width="2"/>
  <path d="M150 116 V196 M49 156 H251" stroke="#fff" stroke-width="1.5" opacity=".8"/>
  <rect x="70" y="96" width="160" height="20" fill="rgb(255 255 255 / .35)" stroke="#fff" stroke-width="1.2"/>
  <path d="M70 101 H230 M70 106 H230 M70 111 H230" stroke="#fff" stroke-width=".6" opacity=".7"/>
  ${Object.entries(pts).map(([k, [x, y]]) => `<circle cx="${x}" cy="${y}" r="6" fill="${k === active ? '#f4c542' : '#fff'}" stroke="${ACC}" stroke-width="2"/>`).join('')}
  ${Object.entries(pts).map(([k, [x, y]]) => k === active ? '' : `<path d="M${c[0]} ${c[1]} L${(c[0] + (x - c[0]) * .8).toFixed(0)} ${(c[1] + (y - c[1]) * .8).toFixed(0)}" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 4" opacity=".8"/>`).join('')}
  <circle cx="${c[0]}" cy="${c[1]}" r="4" fill="#fff"/>
  ${active ? arrow(`M${c[0]} ${c[1]} L${pts[active][0] - 8} ${pts[active][1] + 8}`, { dash: false, color: '#f4c542', w: 3 }) : ''}`;
};

const ladder = `<g stroke="#e9b44c" stroke-width="3" fill="none">
  <path d="M10 186 L290 186 M24 166 L276 166"/>
  ${Array.from({ length: 9 }, (_, i) => { const t = i / 8; return `<path d="M${(10 + 280 * t).toFixed(0)} 186 L${(24 + 252 * t).toFixed(0)} 166"/>`; }).join('')}
</g>`;

const RACKET_UP = { aL: [46, 56, 40, 40], aR: [102, 62, 106, 46], rr: -45 };        // wind-up: racket up beside the head (not over the face)
const RACKET_DOWN = { aL: [46, 82, 44, 98], aR: [90, 84, 66, 100], rr: 175, y: 2 }; // follow-through across the body
const READY = { aL: [46, 84, 42, 76], aR: [94, 84, 100, 74] };                       // racket in front, ready

const ART = {
  'Burpee': [
    scene(figure({ y: 26, lL: [30, 134, 54, 150], lR: [110, 134, 86, 150], aL: [58, 100, 65, 122], aR: [82, 100, 75, 122] })), // deep squat, knees out, hands on the floor
    scene(motion('M128 186 v-14 M150 188 v-18 M172 186 v-14') + figure({ y: -14, aL: [44, 52, 40, 34], aR: [96, 52, 100, 34], lL: [58, 118, 54, 134], lR: [82, 118, 86, 134] }, { state: 'celebrate' })),
  ],
  'Six-corner footwork': [
    scene(court(null) + figure({ ...READY, y: 4, lL: [56, 128, 54, 148], lR: [84, 128, 86, 148] }, { floor: 172, s: .62, rk: true }), { floor: false }),
    scene(court('fr') + figure({ aL: [46, 80, 40, 92], aR: [98, 66, 110, 52], rr: -15, x: 6, y: 8, lL: [58, 132, 50, 148], lR: [94, 124, 102, 148] }, { x: 196, floor: 140, s: .5, rk: true }), { floor: false }),
  ],
  'Shadow badminton': [
    scene(shuttle(214, 34, 200, true) + motion('M210 52 Q200 120 120 150') + figure(RACKET_UP, { rk: true })),
    scene(motion('M190 40 Q206 100 128 150') + figure(RACKET_DOWN, { rk: true })),
  ],
  'Split step drill': [
    scene(figure({ ...READY, y: -8, lL: [64, 120, 64, 138], lR: [76, 120, 76, 138] }, { rk: true }) + motion('M124 190 h12 M164 190 h12')),
    scene(figure({ ...READY, y: 8, lL: [50, 128, 46, 148], lR: [90, 128, 94, 148] }, { rk: true }) + arrow('M100 182 L66 182') + arrow('M200 182 L234 182')),
  ],
  'Agility ladder': [
    scene(ladder + figure({ aL: [56, 84, 62, 72], aR: [94, 90, 98, 104], lL: [58, 110, 62, 128], lR: [78, 128, 79, 148] }, { x: 105, floor: 176 }), { floor: false }),
    scene(ladder + figure({ aR: [84, 84, 78, 72], aL: [46, 90, 42, 104], lR: [82, 110, 78, 128], lL: [62, 128, 61, 148] }, { x: 190, floor: 176 }) + arrow('M118 194 L160 194'), { floor: false }),
  ],
  'Multi-shuttle drill': [
    scene(`<rect x="250" y="138" width="40" height="24" rx="4" fill="#8aa0b8"/>${[256, 266, 276, 286].map(x => shuttle(x, 140, 180)).join('')}`
      + arrow('M262 60 Q200 70 150 120') + shuttle(176, 92, 230) + shuttle(120, 40, 250, true)
      + figure({ y: 10, lL: [50, 126, 42, 148], lR: [84, 132, 96, 148], aL: [48, 82, 40, 96], aR: [98, 82, 112, 90], rr: 40 }, { x: 120, rk: true })),
    scene(`<rect x="250" y="138" width="40" height="24" rx="4" fill="#8aa0b8"/>${[256, 266, 276, 286].map(x => shuttle(x, 140, 180)).join('')}`
      + arrow('M262 70 Q220 30 186 34') + shuttle(176, 30, 210)
      + figure({ y: -10, aR: [98, 54, 96, 34], aL: [46, 56, 40, 40], rr: -10, lL: [58, 118, 56, 136], lR: [82, 118, 84, 136] }, { x: 140, rk: true, state: 'celebrate' })),
  ],
  'Heavy racket swing': [
    scene(motion('M210 52 Q200 120 120 150') + figure(RACKET_UP, { rk: 'bag' })),
    scene(motion('M190 40 Q206 100 128 150') + figure(RACKET_DOWN, { rk: 'bag' })),
  ],
  'Lateral lunge': [
    scene(figure({ aL: [54, 84, 66, 88], aR: [86, 84, 74, 88], lL: [58, 128, 54, 148], lR: [82, 128, 86, 148] })),
    scene(figure({ x: 12, y: 12, aL: [54, 84, 66, 88], aR: [86, 84, 74, 88], lR: [104, 130, 108, 148], lL: [60, 133, 44, 148] }) + arrow('M150 190 L200 190')),
  ],
};

for (const [name, frames] of Object.entries(ART)) frames.forEach((svg, i) => writeFileSync(`ex/${photoSlug(name)}-${i}.svg`, svg));
console.log(Object.keys(ART).length, 'exercises drawn');
export const ART_NAMES = Object.keys(ART);

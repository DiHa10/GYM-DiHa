// Gym Man mascot: SVG + SMIL keyframes. Each action = list of poses, looped.
// Pose: aL/aR = arm [elbowX, elbowY, handX, handY] (relative to body), lL/lR = leg [kneeX, kneeY, footX, footY] (absolute),
// x/y = body offset. Paths keep the same commands in every frame so <animate d> can morph them.
const SKIN = '#f5c79a', INK = '#2b1d14', SHORTS = '#2f3b4c', HAIR = '#3a2a20', HAIR_HI = '#5c4434';
const SH = { L: [56, 68], R: [84, 68] }, HIP = { L: [63, 106], R: [77, 106] };
const BASE = { aL: [50, 88, 48, 106], aR: [90, 88, 92, 106], lL: [62, 128, 61, 148], lR: [78, 128, 79, 148], x: 0, y: 0 };
const F = o => ({ ...BASE, ...o });
const SAD = { aL: [52, 90, 54, 108], aR: [88, 90, 86, 108], lL: [63, 129, 61, 148], lR: [77, 129, 79, 148], y: 3 };

// Shown first on badminton days; rk = racket in the right hand
export const BADMINTON_ACTIONS = {
  celebrate: [
    { name: 'Nhảy đập cầu', dur: .9, rk: true, frames: [F({ aL: [46, 56, 42, 40], aR: [98, 54, 96, 34], y: 5, lL: [58, 126, 60, 148], lR: [82, 126, 80, 148] }),
      F({ aL: [46, 72, 40, 84], aR: [94, 60, 86, 78], y: -14, lL: [58, 118, 54, 134], lR: [82, 118, 86, 134] })] },
  ],
  happy: [
    { name: 'Đập cầu', dur: 1, rk: true, frames: [F({ aL: [46, 56, 40, 40], aR: [98, 54, 96, 34], x: -2 }),
      F({ aL: [48, 80, 50, 96], aR: [94, 62, 86, 80], x: 2, y: 2 })] },
    { name: 'Thủ thế đỡ cầu', dur: 1.2, rk: true, frames: [
      F({ aL: [46, 80, 40, 72], aR: [94, 80, 102, 70], x: -4, y: 8, lL: [50, 128, 48, 148], lR: [86, 128, 88, 148] }),
      F({ aL: [46, 80, 40, 72], aR: [94, 80, 102, 70], x: 4, y: 8, lL: [54, 128, 52, 148], lR: [90, 128, 92, 148] })] },
  ],
};
export const actionsFor = (state, badminton) => badminton ? [...(BADMINTON_ACTIONS[state] || []), ...ACTIONS[state]] : ACTIONS[state];

export const ACTIONS = {
  celebrate: [
    { name: 'Nhảy ăn mừng', dur: .8, db: true, frames: [F({ aL: [44, 52, 40, 34], aR: [96, 52, 100, 34] }),
      F({ aL: [42, 48, 36, 28], aR: [98, 48, 104, 28], y: -14, lL: [58, 118, 54, 134], lR: [82, 118, 86, 134] })] },
    { name: 'Nhảy múa', dur: 1, frames: [
      F({ aL: [44, 52, 40, 34], aR: [100, 72, 112, 62], x: -3, y: -2, lL: [59, 128, 57, 148], lR: [81, 124, 87, 146] }),
      F({ aL: [40, 72, 28, 62], aR: [96, 52, 100, 34], x: 3, y: -2, lL: [59, 124, 53, 146], lR: [81, 128, 83, 148] })] },
    { name: 'Đẩy tạ qua đầu', dur: 1.2, db: true, frames: [F({ aL: [42, 72, 42, 56], aR: [98, 72, 98, 56] }),
      F({ aL: [46, 50, 46, 30], aR: [94, 50, 94, 30] })] },
  ],
  happy: [
    { name: 'Khoe cơ bắp', dur: 1.2, frames: [F({ aL: [38, 66, 42, 48], aR: [102, 66, 98, 48] }),
      F({ aL: [36, 64, 41, 45], aR: [104, 64, 99, 45], y: -1 })] },
    { name: 'Cuốn tạ tay', dur: 1.6, db: true, frames: [F({ aL: [50, 90, 47, 108], aR: [90, 90, 88, 70] }),
      F({ aL: [50, 90, 52, 70], aR: [90, 90, 93, 108] })] },
    { name: 'Squat', dur: 1.8, frames: [F({ aL: [54, 84, 64, 82], aR: [86, 84, 76, 82] }),
      F({ aL: [54, 84, 64, 82], aR: [86, 84, 76, 82], y: 16, lL: [50, 126, 61, 148], lR: [90, 126, 79, 148] })] },
    { name: 'Vẫy chào', dur: .7, frames: [F({ aR: [100, 58, 104, 38] }), F({ aR: [100, 58, 114, 44] })] },
  ],
  worried: [
    { name: 'Gãi đầu', dur: .5, frames: [F({ aL: [42, 88, 58, 102], aR: [100, 56, 88, 28] }),
      F({ aL: [42, 88, 58, 102], aR: [100, 57, 91, 30] })] },
    { name: 'Đi tới đi lui', dur: 2, frames: [
      F({ x: -5, aL: [46, 88, 46, 106], aR: [86, 88, 90, 106], lL: [57, 128, 55, 148], lR: [73, 127, 76, 147] }),
      F({ x: 5, aL: [50, 88, 50, 106], aR: [90, 88, 94, 106], lL: [67, 127, 64, 147], lR: [83, 128, 85, 148] })] },
    { name: 'Xem đồng hồ', dur: 1.5, frames: [F({ aL: [50, 90, 68, 84], aR: [90, 90, 72, 82] }),
      F({ aL: [50, 90, 68, 82], aR: [90, 90, 72, 80], y: 1 })] },
  ],
  sad: [
    { name: 'Ủ rũ', dur: 3, frames: [F(SAD), F({ ...SAD, y: 6, aL: [52, 92, 55, 111], aR: [88, 92, 85, 111], lL: [63, 130, 61, 148], lR: [77, 130, 79, 148] })] },
    { name: 'Đá chân buồn bã', dur: 1.6, frames: [F(SAD), F({ ...SAD, lR: [80, 128, 90, 142] })] },
  ],
};

const SHIRT = { celebrate: ['#8fb8d8', '#5b78ad'], happy: ['#8bb4d1', '#4a7fa7'], worried: ['#aab4c3', '#7d8798'], sad: ['#98a2b0', '#646e7d'] };

const FACE = {
  celebrate: {
    eyes: `<path d="M58 42 Q62 37 66 42 M74 42 Q78 37 82 42" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    brows: 'M57 33 Q61.5 30 66 33 M74 33 Q78.5 30 83 33',
    mouth: `<path d="M61 50 Q70 63 79 50 Z" fill="#8c2f1b"/><path d="M66 56.5 Q70 60 74 56.5 Q70 54.5 66 56.5Z" fill="#ff7b7b"/>`,
  },
  happy: { brows: 'M57 33 Q61.5 31 66 33 M74 33 Q78.5 31 83 33', mouth: `<path d="M62 51 Q70 58 78 51" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` },
  worried: { brows: 'M57 35 L66 32.5 M74 32.5 L83 35', mouth: `<path d="M63 54 Q66.5 51 70 54 Q73.5 57 77 54" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    extra: `<path d="M92 28 Q89 33 92 35 Q95 33 92 28Z" fill="#7cc6fe"><animateTransform attributeName="transform" type="translate" values="0 0;0 8" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.4s" repeatCount="indefinite"/></path>` },
  sad: { brows: 'M57 36 L66 31.5 M74 31.5 L83 36', mouth: `<path d="M62 57 Q70 50 78 57" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    extra: [62, 78].map((cx, i) => `<ellipse cx="${cx}" cy="47" rx="1.8" ry="2.6" fill="#5fa8f5"><animate attributeName="cy" values="47;60" dur="1.5s" begin="${i * .7}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.5s" begin="${i * .7}s" repeatCount="indefinite"/></ellipse>`).join('') },
};
const openEyes = dy => `<g class="eyes">${[62, 78].map(x => `<ellipse cx="${x}" cy="${42 + dy}" rx="3" ry="4" fill="${INK}"/><circle cx="${x + 1}" cy="${40.5 + dy}" r="1.1" fill="#fff"/>`).join('')}</g>`;

const racket = `<path d="M0 0 L9 -11" stroke="#222" stroke-width="3" stroke-linecap="round"/><ellipse cx="14" cy="-18" rx="5.5" ry="7.5" transform="rotate(38 14 -18)" fill="rgb(255 255 255 / .35)" stroke="#222" stroke-width="2"/>`;
const dumbbell = `<rect x="-12" y="-2" width="24" height="4" rx="1" fill="#555"/><rect x="-15" y="-7" width="6" height="14" rx="1.5" fill="${INK}"/><rect x="9" y="-7" width="6" height="14" rx="1.5" fill="${INK}"/>`;
const shoe = `<path d="M-7 3 Q-8 -4 0 -4 Q8 -4 11 3 Z" fill="#fff" stroke="#bbb" stroke-width="1"/><path d="M-3 -1 L5 -1" stroke="#6a7cb0" stroke-width="1.6"/>`;

export function mascotSvg(state, idx = 0, still = false, badminton = false) {
  const list = actionsFor(state, badminton), act = list[idx % list.length];
  const fr = still ? [act.frames[0], act.frames[0]] : [...act.frames, act.frames[0]];
  const dur = act.dur + 's', kt = fr.map((_, i) => (i / (fr.length - 1)).toFixed(3)).join(';');
  const ease = `calcMode="spline" keyTimes="${kt}" keySplines="${Array(fr.length - 1).fill('.45 0 .55 1').join(';')}" dur="${dur}" repeatCount="indefinite"`;
  const anim = (attr, f) => `<animate attributeName="${attr}" values="${fr.map(f).join(';')}" ${ease}/>`;
  const move = f => `<animateTransform attributeName="transform" type="translate" values="${fr.map(f).join(';')}" ${ease}/>`;
  // Limbs are quadratic curves with the joint as control point: soft elbows/knees, morph smoothly between poses
  const armD = (p, k) => `M${SH[k]} Q${p['a' + k].slice(0, 2)} ${p['a' + k].slice(2)}`;
  const legD = (p, k) => `M${HIP[k][0] + p.x},${HIP[k][1] + p.y} Q${p['l' + k].slice(0, 2)} ${p['l' + k].slice(2)}`;
  // Shorts leg follows the start of the leg curve (t = .3), so it bends with the leg in squat/jump
  const shortD = (p, k) => {
    const hx = HIP[k][0] + p.x, hy = HIP[k][1] + p.y - 4, [kx, ky, fx, fy] = p['l' + k], t = .3;
    const at = (a, b, c) => ((1 - t) ** 2 * a + 2 * t * (1 - t) * b + t * t * c).toFixed(1);
    return `M${hx},${hy} L${at(hx, kx, fx)},${at(hy, ky, fy)}`;
  };
  const limb = (d, w) => `<path d="${d(fr[0])}" stroke="${SKIN}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round">${anim('d', d)}</path>`;
  const face = FACE[state], [c1, c2] = SHIRT[state];
  const tilt = { sad: 'rotate(-8 70 60)', worried: 'rotate(5 70 60)' }[state] || '';

  return `<svg viewBox="0 0 140 160" role="img" aria-label="Man: ${act.name}">
  <defs>
    <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
  </defs>
  <ellipse cx="70" cy="153" rx="28" ry="4.5" fill="#000" opacity=".15">${anim('rx', p => 28 + Math.min(0, p.y) * .6)}</ellipse>
  ${['L', 'R'].map(k => limb(p => legD(p, k), 10)).join('')}
  ${['L', 'R'].map(k => `<g transform="translate(${fr[0]['l' + k].slice(2).join(' ')})">${move(p => p['l' + k].slice(2).join(' '))}<g transform="translate(0 3)">${shoe}</g></g>`).join('')}
  ${['L', 'R'].map(k => `<path d="${shortD(fr[0], k)}" stroke="${SHORTS}" stroke-width="15" stroke-linecap="round" fill="none">${anim('d', p => shortD(p, k))}</path>`).join('')}
  <g>${move(p => `${p.x} ${p.y}`)}
    <path d="M56 100 Q70 97 84 100 Q86.5 106 85 112 Q70 116 55 112 Q53.5 106 56 100 Z" fill="${SHORTS}"/>
    <path d="M56.5 102.5 Q70 105.5 83.5 102.5" stroke="#fff" stroke-width="1.5" fill="none" opacity=".6"/>
    <rect x="65" y="55" width="10" height="13" rx="4" fill="${SKIN}"/>
    <path d="M56 65.5 Q63 61.5 70 62.5 Q77 61.5 84 65.5 Q87.5 84 84.5 103.5 Q70 107.5 55.5 103.5 Q52.5 84 56 65.5 Z" fill="url(#shirt)"/>
    <path d="M79 64 Q84 64.5 84 65.5 Q87.5 84 84.5 103.5 Q82 104.5 80 105 Q83 84 79 64 Z" fill="#000" opacity=".07"/>
    <path d="M63 63.5 Q70 73 77 63.5 Q70 65.5 63 63.5 Z" fill="${SKIN}"/>
    <g transform="${tilt}">
      <circle cx="49" cy="43" r="4" fill="${SKIN}"/><circle cx="91" cy="43" r="4" fill="${SKIN}"/>
      <circle cx="70" cy="40" r="21" fill="${SKIN}"/>
      <!-- Ivy League: short tapered sides, longer top, left side part, front swept up -->
      <path d="M48.5 38 Q47 26 52 20 Q58 13 70 13 Q83 12.5 89 19 Q93.5 25 91.5 38 Q90 31 88 28 Q84 24.5 77 25.5 Q70 26.5 63 24.5 L61 22.5 Q57 25 54 28 Q50.5 32 48.5 38 Z" fill="${HAIR}"/>
      <path d="M48.5 38 L49.5 44 L51.5 44 L51 35 Z M91.5 38 L90.5 44 L88.5 44 L89 35 Z" fill="${HAIR}"/>
      <path d="M61 22.5 Q58 18 57 14.5" stroke="${HAIR_HI}" stroke-width="1.2" fill="none"/>
      <path d="M66 16.5 Q77 14 85 19.5" stroke="${HAIR_HI}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
      ${face.eyes || openEyes(state === 'sad' ? 2 : 0)}
      <path d="${face.brows}" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="57" cy="49" rx="4" ry="2.4" fill="#ff8fa3" opacity=".45"/><ellipse cx="83" cy="49" rx="4" ry="2.4" fill="#ff8fa3" opacity=".45"/>
      ${face.mouth}${face.extra || ''}
    </g>
    ${['L', 'R'].map(k => limb(p => armD(p, k), 9)).join('')}
    ${act.rk ? `<g transform="translate(${fr[0].aR.slice(2).join(' ')})">${move(p => p.aR.slice(2).join(' '))}${racket}</g>` : ''}
    ${act.db ? ['L', 'R'].map(k => `<g transform="translate(${fr[0]['a' + k].slice(2).join(' ')})">${move(p => p['a' + k].slice(2).join(' '))}${dumbbell}</g>`).join('') : ''}
  </g>
</svg>`;
}

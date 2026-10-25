import {
  DAY_NAMES, WEEK_ORDER, defaultData, ymd, weekStart, weekDone, mascotState, needsReminder,
  streaks, personalRecords, periodRange, periodStats, heatmap, lastPerformance, exerciseHistory, bmiInfo, bodyCheer, buildIcs,
} from './logic.js';
import { mascotSvg, actionsFor } from './mascot.js';
import { icon, hydrateIcons } from './icons.js';
hydrateIcons();
import { LIBRARY, NO_PHOTO, photoSlug, groupFor, groupItems, RATINGS, RATING_LABELS } from './library.js';

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fmtDate = s => s.split('-').reverse().join('/');

// Fill fields added in later versions so old saves/backups keep working
const normalize = d => ({ ...defaultData(), ...d, settings: { ...defaultData().settings, ...d.settings } });
let data;
try { data = JSON.parse(localStorage.getItem('gym')); } catch { data = null; }
data = data?.settings ? normalize(data) : defaultData();

function save() {
  try { localStorage.setItem('gym', JSON.stringify(data)); } catch { toast('⚠️ Không lưu được dữ liệu'); }
  render();
}

function toast(msg, onClick) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  t.classList.toggle('clickable', !!onClick); t.onclick = onClick || null;
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), onClick ? 10000 : 2800);
}

// ---------- Mascot ----------
const MSG = {
  celebrate: ['Tuần này ĐỦ BUỔI rồi! Quá đỉnh! 🎉', 'Kỷ luật thép! Man tự hào về bạn! 🏆', 'Cơ bắp đang cảm ơn bạn đó! 💪', 'Đủ chỉ tiêu! Tập thêm là bonus nha! 🔥'],
  happy: ['Đang đúng tiến độ, giữ vững nhé! 💪', 'Ngon lành! Cứ thế mà tiến! 🚀', 'Man sẵn sàng tập cùng bạn! 🏋️'],
  worried: ['Hơi chậm 1 buổi rồi, tập bù nha! 😬', 'Man hơi lo... hôm nay đi tập không? 🥺', 'Chậm chút thôi, vẫn kịp mà! ⏰'],
  sad: ['Man nhớ phòng gym lắm rồi... 😢', 'Bỏ nhiều buổi quá rồi, quay lại đi bạn! 💔', 'Một buổi thôi cũng được, bắt đầu lại nhé! 🙏'],
};

// Mood lines on badminton days (celebrate keeps the generic lines)
const MSG_BADMINTON = {
  happy: ['Sân đang chờ, xách vợt lên! 🏸', 'Hôm nay đập cầu cho đã tay nào! 🏸', 'Giữ nhịp chân, đánh hết từng cầu! 🏸'],
  worried: ['Chậm 1 buổi rồi, ra sân bù ngay hôm nay nha! 🏸', 'Vợt nằm trong túi lâu quá rồi đó... 🥺'],
  sad: ['Sân cầu nhớ bạn lắm rồi... quay lại đi! 😢', 'Bỏ nhiều buổi quá, đánh 1 trận thôi cũng được! 🏸'],
};

// [câu nói, tác giả]. Câu của người nổi tiếng là bản dịch; câu ghi "GYM DIHA" là lời app tự viết.
const QUOTES = [
  ['Bạn đang có nguy cơ sống một cuộc đời quá thoải mái, đến chết vẫn không biết mình có thể mạnh đến đâu.', 'David Goggins'],
  ['Ai sẽ khiêng những chiếc thuyền?', 'David Goggins'],
  ['Tôi ghét từng phút tập luyện, nhưng tôi tự nhủ: Đừng bỏ cuộc. Chịu khổ bây giờ để sống cả đời như một nhà vô địch.', 'Muhammad Ali'],
  ['Ai cũng muốn to, nhưng chẳng ai muốn nâng tạ nặng cả.', 'Ronnie Coleman'],
  ['Ba bốn rep cuối cùng mới là thứ làm cơ bắp phát triển.', 'Arnold Schwarzenegger'],
  ['Kỷ luật là tự do.', 'Jocko Willink'],
  ['Nghỉ ngơi ở vạch đích, không phải giữa đường.', 'Kobe Bryant'],
  ['Máu, mồ hôi và sự tôn trọng. Hai thứ đầu bạn cho đi, thứ cuối cùng bạn phải giành lấy.', 'Dwayne "The Rock" Johnson'],
  ['Chăm chỉ đánh bại tài năng khi tài năng không chịu chăm chỉ.', 'Tim Notke'],
  ['Hôm nay tôi làm điều người khác không làm, để ngày mai tôi đạt được điều người khác không thể.', 'Jerry Rice'],
  ['Mỡ không tự biến mất vì bạn lướt xem người khác tập.', 'GYM DIHA'],
  ['Không ai quan tâm bạn mệt. Người ta chỉ nhìn thấy kết quả.', 'GYM DIHA'],
  ['Cơ thể bạn bây giờ là bản báo cáo của thói quen 6 tháng qua.', 'GYM DIHA'],
  ['Bạn không thiếu thời gian. Bạn thiếu ưu tiên.', 'GYM DIHA'],
  ['Động lực sẽ hết. Lịch tập thì vẫn còn đó.', 'GYM DIHA'],
  ['Hôm nay bỏ tập là bạn đang ký tên đồng ý với phiên bản yếu hơn của mình.', 'GYM DIHA'],
  ['Không ai đến cứu bạn đâu. Tự đứng dậy mà đi tập.', 'GYM DIHA'],
  ['Mệt thì nghỉ một set. Bỏ cả buổi là thói quen xấu đang thắng.', 'GYM DIHA'],
  ['Cái gương không nói dối. Lý do của bạn thì có.', 'GYM DIHA'],
  ['Bạn sợ đau cơ một ngày, nhưng không sợ yếu cả đời?', 'GYM DIHA'],
  ['Một năm nữa bạn sẽ ước mình đã bắt đầu từ hôm nay.', 'GYM DIHA'],
  ['Ăn như cũ, tập như cũ, thì đừng mong thân hình mới.', 'GYM DIHA'],
  ['Người ta thấy bạn đẹp sau 1 năm. Không ai thấy 200 buổi bạn lết vào phòng gym.', 'GYM DIHA'],
  ['Thứ Hai không phải ngày bắt đầu. Ngay bây giờ mới là ngày bắt đầu.', 'GYM DIHA'],
  ['Thoải mái là kẻ thù của tiến bộ.', 'GYM DIHA'],
  ['Không tăng tạ, không tăng rep, thì cơ bắp lấy lý do gì để lớn?', 'GYM DIHA'],
  ['Điện thoại để xa ra. Set tiếp theo đang chờ.', 'GYM DIHA'],
  ['Bạn không cần thêm thông tin. Bạn cần làm điều mình đã biết.', 'GYM DIHA'],
  ['Kỷ luật là làm cả khi không ai nhìn và không muốn làm.', 'GYM DIHA'],
  ['Lười hôm nay thì trả giá bằng sức khỏe ngày mai. Lãi suất rất cao.', 'GYM DIHA'],
  ['Bạn mạnh hơn cái cảm giác "để mai tính".', 'GYM DIHA'],
  ['Mồ hôi là mỡ đang khóc.', 'GYM DIHA'],
  ['Không đo thì không biết. Không ghi thì không tiến.', 'GYM DIHA'],
  ['Đứng cân 3 tuần? Không phải do cơ địa, mà do bạn ăn nhiều hơn mình nghĩ.', 'GYM DIHA'],
  ['Giỏi nhất không phải người tập hăng nhất, mà là người không bỏ buổi nào.', 'GYM DIHA'],
  ['Bắt đầu tệ cũng được. Không bắt đầu mới là tệ nhất.', 'GYM DIHA'],
];

let quoteIdx = null;
const showQuote = () => { const [q, a] = QUOTES[quoteIdx]; $("#quote").textContent = `“${q}”`; $("#quote-author").textContent = `— ${a}`; };
function nextQuote() {
  const box = $('.quote');
  box.classList.add('fade');
  setTimeout(() => {
    quoteIdx = (quoteIdx + 1 + Math.floor(Math.random() * (QUOTES.length - 1))) % QUOTES.length; // never the same one
    showQuote();
    box.classList.remove('fade');
  }, 250);
}
$('#new-quote').onclick = nextQuote;
setInterval(() => { if (!document.hidden) nextQuote(); }, 60_000); // new quote every minute

// ---------- Week / month stats ----------
let statsKind = 'week';
const fmtVolume = kg => kg >= 1000 ? `${(kg / 1000).toFixed(1)} tấn` : `${kg} kg`;
function drawStats() {
  const now = new Date(), cur = periodStats(data.sessions, periodRange(statsKind, now)), prev = periodStats(data.sessions, periodRange(statsKind, now, 1));
  const diff = cur.gym + cur.badminton - prev.gym - prev.badminton, label = statsKind === 'week' ? 'tuần trước' : 'tháng trước';
  const cell = (v, l) => `<div><b>${v}</b><span>${l}</span></div>`;
  $('#stats-grid').innerHTML = cell(cur.gym, 'buổi gym') + cell(cur.badminton, 'buổi cầu lông')
    + cell(`${+(cur.minutes / 60).toFixed(1)} giờ`, 'đánh cầu') + cell(cur.games, 'trận') + cell(fmtVolume(cur.volume), 'tổng tạ') + cell(cur.days, 'ngày có tập');
  $('#stats-diff').textContent = diff > 0 ? `▲ ${diff} buổi so với ${label}` : diff < 0 ? `▼ ${-diff} buổi so với ${label}` : `Bằng ${label}`;
  $('#stats-diff').className = 'hint ' + (diff > 0 ? 'up' : diff < 0 ? 'down' : '');
  document.querySelectorAll('[data-stats]').forEach(b => b.classList.toggle('on', b.dataset.stats === statsKind));
  const hm = heatmap(data.sessions, now), today = ymd(now), KIND = { gym: 'Gym', badminton: 'Cầu lông', both: 'Gym + cầu lông' };
  $('#heatmap').innerHTML = hm.map(w => `<div class="hm-col">${w.map(d =>
    `<i class="hm ${d.kind || ''}${d.date === today ? ' today' : ''}" title="${fmtDate(d.date)}${KIND[d.kind] ? ': ' + KIND[d.kind] : ''}"></i>`).join('')}</div>`).join('');
  // month label above the first week column of each month
  $('#heat-months').innerHTML = hm.map((w, i) => {
    const m = w[0].date.slice(5, 7);
    return `<span>${i === 0 || m !== hm[i - 1][0].date.slice(5, 7) ? 'T' + +m : ''}</span>`;
  }).join('');
}
document.querySelectorAll('[data-stats]').forEach(b => b.onclick = () => { statsKind = b.dataset.stats; drawStats(); });

// ---------- Mascot: cycles through actions of its mood, tap for next ----------
let mState, mBad = false, actIdx = 0;
// Badminton day: today's plan is "Cầu lông" or today's last session was badminton
const badmintonDay = now => groupFor(data.settings.plan[now.getDay()]) === 'Cầu lông'
  || data.sessions.filter(s => s.date === ymd(now)).at(-1)?.kind === 'badminton';
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
function drawMascot() {
  const confetti = mState === 'celebrate'
    ? Array.from({ length: 14 }, (_, i) => `<span class="confetti" style="left:${(i * 37) % 100}%;animation-duration:${2 + (i % 4) * .6}s;animation-delay:${(i % 7) * .3}s">${['🎉', '✨', '💪', '⭐'][i % 4]}</span>`).join('')
    : '';
  const acts = actionsFor(mState, mBad);
  $('#mascot').innerHTML = confetti + mascotSvg(mState, actIdx, still, mBad);
  $('#mascot-action').textContent = `Man đang: ${acts[actIdx % acts.length].name} · chạm để đổi`;
}
// Next action with a short fade, so the pose change is not a hard jump
function nextAction() {
  $('#mascot').classList.add('fade');
  setTimeout(() => { actIdx++; drawMascot(); $('#mascot').classList.remove('fade'); }, 200);
}
$('.mascot-card').onclick = nextAction;
$('.mascot-card').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextAction(); } };
setInterval(() => { if (!document.hidden) nextAction(); }, 7000);

// ---------- Render ----------
function render() {
  const now = new Date(), today = ymd(now), { settings, sessions } = data;
  const state = mascotState(data, now), bad = badmintonDay(now), msgs = (bad && MSG_BADMINTON[state]) || MSG[state];

  // Home
  if (state !== mState || bad !== mBad) { mState = state; mBad = bad; actIdx = 0; drawMascot(); }
  $('#mascot-msg').textContent = msgs[now.getDate() % msgs.length];
  quoteIdx ??= Math.floor(new Date(today).getTime() / 864e5) % QUOTES.length; // new quote each day
  showQuote();

  const done = weekDone(sessions, now);
  $('#week-count').textContent = `${done}/${settings.goal} buổi`;
  $('#week-bar').style.width = Math.min(100, done / settings.goal * 100) + '%';
  const trained = new Set(sessions.map(s => s.date)), badDays = new Set(sessions.filter(s => s.kind === 'badminton').map(s => s.date));
  $('#week-days').innerHTML = WEEK_ORDER.map((dow, i) => {
    const d = new Date(weekStart(now)); d.setDate(d.getDate() + i);
    const key = ymd(d), sched = settings.days.includes(dow);
    const cls = ['day', sched && 'sched', trained.has(key) && 'done', sched && !trained.has(key) && key < today && 'missed', key === today && 'today'].filter(Boolean).join(' ');
    return `<div class="${cls}">${DAY_NAMES[dow]}<b>${badDays.has(key) ? icon('racket') : trained.has(key) ? icon('check') : d.getDate()}</b><small>${esc(settings.plan[dow] || '')}</small></div>`;
  }).join('');
  $('#streak').textContent = streaks(data, now).current;
  $('#total').textContent = sessions.length;

  const banner = $('#banner');
  banner.hidden = !needsReminder(data, now);
  banner.textContent = bad ? `⏰ Đã quá ${settings.time} rồi! Hôm nay có lịch cầu lông, xách vợt ra sân thôi! 🏸`
    : `⏰ Đã quá ${settings.time} rồi! Hôm nay có lịch tập${settings.plan[now.getDay()] ? ' ' + settings.plan[now.getDay()] : ''}, đi thôi!`;
  drawStats();
  $('#backup-banner').hidden = !(sessions.length >= 5 && Date.now() - (data.lastBackup || 0) > 14 * 864e5);

  // History
  const libNames = LIBRARY.flatMap(g => groupItems(g).map(i => i[0]));
  $('#ex-names').innerHTML = [...new Set([...sessions.flatMap(s => s.exercises.map(e => e.name)), ...libNames])].map(n => `<option value="${esc(n)}">`).join('');
  $('#history').innerHTML = [...sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 60).map(s => `
    <div class="item"><div class="row"><b>${fmtDate(s.date)}</b><span><button class="small" data-edit-session="${s.id}">Sửa</button> <button class="small" data-del-session="${s.id}">Xóa</button></span></div>
    ${s.kind === 'badminton' ? `<p>${badmintonText(s)}</p>` : ''}
    ${s.exercises.map(e => `<p><b>${esc(e.name)}</b>: ${e.sets.map(x => `${x.reps}×${x.kg || 0}kg`).join(', ')}</p>`).join('') || (s.kind ? '' : '<p>Đã tập (không ghi chi tiết)</p>')}</div>`).join('')
    || '<p class="hint">Chưa có buổi tập nào.</p>';

  // Plan
  $('#goal').value = settings.goal;
  $('#time').value = settings.time;
  $('#plan-days').innerHTML = WEEK_ORDER.map(dow => `<div class="plan-day">
    <input type="checkbox" data-day="${dow}" ${settings.days.includes(dow) ? 'checked' : ''} aria-label="Tập ${DAY_NAMES[dow]}">
    <b>${DAY_NAMES[dow]}</b><input type="text" data-muscle="${dow}" placeholder="Nhóm cơ (VD: Ngực)" value="${esc(settings.plan[dow] || '')}"><button class="small" type="button" data-lib-day="${dow}" aria-label="Chọn bài mẫu ${DAY_NAMES[dow]} từ thư viện">${icon('book')}</button>
    <textarea data-tpl="${dow}" rows="2" placeholder="Bài tập, mỗi dòng 1 bài" aria-label="Bài tập mẫu ${DAY_NAMES[dow]}">${esc((settings.templates[dow] || []).join('\n'))}</textarea></div>`).join('');
  $('#notif').innerHTML = icon('bell') + ('Notification' in window && Notification.permission === 'granted' ? ' Thông báo đã bật' : ' Bật thông báo trong app');

  // Body
  const body = [...data.body].sort((a, b) => a.date.localeCompare(b.date));
  $('#body-cheer').textContent = bodyCheer(body, settings.height);
  if (document.activeElement !== $('#b-height')) $('#b-height').value = settings.height || '';
  const lastW = [...body].reverse().find(b => b.weight)?.weight;
  $('#bmi').innerHTML = bmiCard(bmiInfo(lastW, settings.height), lastW);
  $('#chart').innerHTML = lineChart(body.filter(b => b.weight).map(b => ({ date: b.date, v: b.weight })), 'kg');
  const sel = $('#ex-select'), cur = sel.value, names = [...new Set(sessions.flatMap(s => s.exercises.map(e => e.name.trim())))];
  sel.innerHTML = names.map(n => `<option>${esc(n)}</option>`).join('') || '<option value="">Chưa có bài</option>';
  if (names.includes(cur)) sel.value = cur;
  drawExChart();
  $('#body-list').innerHTML = body.filter(b => b.weight).reverse().map(b => `<div class="item"><div class="row">
    <span><b>${fmtDate(b.date)}</b> — ${b.weight} kg</span>
    <button class="small" data-del-body="${b.id}">Xóa</button></div></div>`).join('');

  drawLibrary();
}

const BMI_CAT = { under: ['Thiếu cân', 'var(--warn)'], normal: ['Bình thường', 'var(--ok)'], over: ['Thừa cân', 'var(--warn)'], obese: ['Béo phì', 'var(--bad)'] };
function bmiCard(info, weight) {
  if (!info) return `<p class="hint">${weight ? 'Nhập chiều cao để tính BMI.' : 'Ghi cân nặng bên dưới để tính BMI.'}</p>`;
  const [label, color] = BMI_CAT[info.cat], pos = Math.min(100, Math.max(0, (info.bmi - 15) / (32 - 15) * 100)); // scale 15-32
  const seg = (from, to, c) => `<span style="width:${(to - from) / 17 * 100}%;background:${c}"></span>`;
  return `<div><span class="bmi-num">${info.bmi}</span><span class="bmi-cat" style="color:${color}">${label}</span></div>
    <div class="bmi-scale">${seg(15, 18.5, 'var(--warn)')}${seg(18.5, 23, 'var(--ok)')}${seg(23, 25, 'var(--warn)')}${seg(25, 32, 'var(--bad)')}
      <i class="bmi-marker" style="left:${pos}%"></i></div>
    <div class="bmi-labels"><span>15</span><span>18.5</span><span>23</span><span>25</span><span>32</span></div>
    <p>Cân nặng chuẩn cho bạn: <b>${info.min} – ${info.max} kg</b></p>
    <p>${info.diff ? `${info.cat === 'under' ? 'Thiếu' : 'Dư'} <b>${info.diff} kg</b> so với mức chuẩn.` : '✅ Bạn đang ở mức cân nặng chuẩn.'}</p>
    <p class="hint">Theo chuẩn BMI châu Á (WHO): 18.5–22.9 là bình thường. BMI không phân biệt cơ và mỡ, người tập tạ nhiều cơ có thể bị tính cao hơn thực tế.</p>`;
}

// pts: [{date, v}] oldest first
function lineChart(pts, unit) {
  if (pts.length < 2) return '<p class="hint">Cần ít nhất 2 lần ghi để vẽ biểu đồ.</p>';
  const W = 320, H = 160, P = 28, vs = pts.map(p => +p.v);
  const pad = Math.max(1, (Math.max(...vs) - Math.min(...vs)) * .1), lo = Math.min(...vs) - pad, hi = Math.max(...vs) + pad;
  const x = i => P + i * (W - 2 * P) / (pts.length - 1), y = v => H - P - (v - lo) / (hi - lo) * (H - 2 * P);
  const xy = pts.map((p, i) => `${x(i).toFixed(1)},${y(+p.v).toFixed(1)}`).join(' ');
  const diff = +(vs[vs.length - 1] - vs[0]).toFixed(1);
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ ${unit}">
    <polyline points="${xy}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round"/>
    ${pts.map((p, i) => `<circle cx="${x(i)}" cy="${y(+p.v)}" r="3.5" fill="var(--accent)"><title>${fmtDate(p.date)}: ${p.v} ${unit}</title></circle>`).join('')}
    <text x="${P}" y="${H - 6}" font-size="11" fill="var(--muted)">${fmtDate(pts[0].date)}</text>
    <text x="${W - P}" y="${H - 6}" font-size="11" fill="var(--muted)" text-anchor="end">${fmtDate(pts[pts.length - 1].date)}</text>
    <text x="${W - P}" y="14" font-size="12" fill="var(--text)" text-anchor="end">${vs[vs.length - 1]} ${unit} (${diff > 0 ? '+' : ''}${diff})</text>
  </svg>`;
}

function drawExChart() {
  const name = $('#ex-select').value;
  $('#chart-ex').innerHTML = name ? lineChart(exerciseHistory(data.sessions, name).map(h => ({ date: h.date, v: h.kg })), 'kg')
    : '<p class="hint">Ghi vài buổi tập có mức tạ để xem tiến bộ.</p>';
}
$('#ex-select').onchange = drawExChart;

// ---------- Log form ----------
function addSetRow(box, reps = '', kg = '') {
  const row = document.createElement('div');
  row.className = 'set';
  const stepper = (cls, ph, mode, val, label) => `<div class="step">
      <button type="button" class="dec" aria-label="Giảm ${label}">${icon('minus')}</button>
      <input type="number" class="${cls}" placeholder="${ph}" inputmode="${mode}" min="0" step="any" value="${val}" aria-label="${label}">
      <button type="button" class="inc" aria-label="Tăng ${label}">${icon('plus')}</button></div>`;
  row.innerHTML = `<span class="hint">${box.children.length + 1}</span>
    ${stepper('reps', 'Reps', 'numeric', reps, 'số reps')}${stepper('kg', 'Kg', 'decimal', kg, 'mức tạ kg')}
    <button class="small check" type="button" aria-label="Xong set, bắt đầu nghỉ">${icon('check')}</button>
    <button class="small del" type="button" aria-label="Xóa set">${icon('x')}</button>`;
  row.querySelector('.del').onclick = () => row.remove();
  row.querySelectorAll('.step button').forEach(b => b.onclick = () => {
    const input = b.parentElement.querySelector('input'), step = input.classList.contains('kg') ? 2.5 : 1;
    input.value = Math.max(0, +((+input.value || 0) + (b.classList.contains('inc') ? step : -step)).toFixed(2));
    input.dispatchEvent(new Event('input', { bubbles: true })); // keeps the form "dirty" tracking working
  });
  row.querySelector('.check').onclick = () => { if (row.classList.toggle('done')) { navigator.vibrate?.(30); startRest(); } };
  box.append(row);
}

// sets: from an edited session; otherwise copied from the last time this exercise was done
function addExercise(name = '', sets = null) {
  const ex = document.createElement('div');
  ex.className = 'ex';
  ex.innerHTML = `<div class="ex-head"><button class="small icon-btn" type="button" aria-label="Bỏ bài này">${icon('x')}</button>
    <input class="name" list="ex-names" placeholder="Tên bài (VD: Squat)" aria-label="Tên bài tập"></div>
    <div class="prev"></div><div class="sets"></div><button class="small add-set" type="button">+ Set</button>`;
  const box = ex.querySelector('.sets'), nameInput = ex.querySelector('.name');
  ex.querySelector('button').onclick = () => ex.remove();
  ex.querySelector('.add-set').onclick = () => {
    const last = box.lastElementChild; // copy previous set for fast entry
    addSetRow(box, last?.querySelector('.reps').value ?? '', last?.querySelector('.kg').value ?? '');
  };
  const showPrev = () => {
    const p = lastPerformance(data.sessions, nameInput.value, $('#log-date').value);
    ex.querySelector('.prev').textContent = p ? `Lần trước (${fmtDate(p.date)}): ${p.text}` : '';
    return p;
  };
  nameInput.oninput = showPrev;
  nameInput.value = name;
  const last = name ? showPrev() : null;
  (sets || last?.sets || [{ reps: '', kg: '' }]).forEach(st => addSetRow(box, st.reps, st.kg));
  $('#exercises').append(ex);
  return ex;
}

let editingId = null, dirty = false, logKind = 'gym';
const INTENSITY = ['', 'Nhẹ', 'Vừa', 'Nặng'];
const badmintonText = s => [icon('racket') + ' Cầu lông', s.minutes && `${s.minutes} phút`, s.games && `${s.games} trận`, INTENSITY[s.intensity]].filter(Boolean).join(' · ');
function setKind(k, fields = {}) {
  logKind = k;
  document.querySelectorAll('[data-kind]').forEach(b => b.classList.toggle('on', b.dataset.kind === k));
  $('#bad-fields').hidden = k !== 'badminton';
  $('#bad-min').value = fields.minutes || '';
  $('#bad-games').value = fields.games || '';
  $('#bad-int').value = fields.intensity || 2;
}
document.querySelectorAll('[data-kind]').forEach(b => b.onclick = () => setKind(b.dataset.kind));
const dayOf = date => new Date(date + 'T00:00').getDay();

function fillTemplate() {
  $('#exercises').innerHTML = '';
  const day = dayOf($('#log-date').value), tpl = data.settings.templates[day] || [];
  setKind(groupFor(data.settings.plan[day]) === 'Cầu lông' ? 'badminton' : 'gym'); // day planned as "Cầu lông" opens in badminton mode
  tpl.length ? tpl.forEach(n => addExercise(n)) : addExercise();
  dirty = false;
}

function resetLog() {
  editingId = null;
  $('#editing').hidden = true;
  $('#save-log').textContent = 'Lưu buổi tập';
  $('#log-date').value = ymd(new Date());
  fillTemplate();
}

function editSession(id) {
  const s = data.sessions.find(x => x.id === id);
  if (!s) return;
  editingId = id;
  $('#log-date').value = s.date;
  setKind(s.kind || 'gym', s);
  $('#exercises').innerHTML = '';
  s.exercises.length ? s.exercises.forEach(e => addExercise(e.name, e.sets)) : addExercise();
  $('#editing').hidden = false;
  $('#editing b').textContent = fmtDate(s.date);
  $('#save-log').textContent = 'Cập nhật buổi tập';
  go('log');
}

$('#exercises').addEventListener('input', () => { dirty = true; });
$('#log-date').onchange = () => { if (!dirty && !editingId) fillTemplate(); };
$('#cancel-edit').onclick = resetLog;
$('#add-ex').onclick = () => addExercise().querySelector('.name').focus();
$('#save-log').onclick = e => {
  const btn = e.currentTarget, date = $('#log-date').value;
  if (btn.disabled) return;
  if (!date) return toast('Chọn ngày trước nhé');
  const exercises = [...document.querySelectorAll('#exercises .ex')].map(ex => ({
    name: ex.querySelector('.name').value.trim(),
    sets: [...ex.querySelectorAll('.set')].map(r => ({ reps: +r.querySelector('.reps').value || 0, kg: +r.querySelector('.kg').value || 0 })).filter(s => s.reps > 0),
  })).filter(e => e.name && e.sets.length);
  const before = personalRecords(data.sessions).count;
  const wasCelebrating = mascotState(data, new Date()) === 'celebrate';
  const bad = logKind === 'badminton'
    ? { kind: 'badminton', minutes: +$('#bad-min').value || 0, games: +$('#bad-games').value || 0, intensity: +$('#bad-int').value }
    : null;
  const same = !editingId && data.sessions.find(s => s.date === date);
  if (editingId) {
    const s = data.sessions.find(x => x.id === editingId);
    ['kind', 'minutes', 'games', 'intensity'].forEach(k => delete s[k]); // switching badminton -> gym drops its fields
    Object.assign(s, { date, exercises }, bad);
  } else if (same && confirm(`Ngày ${fmtDate(date)} đã có buổi tập.\nOK = gộp vào buổi đó · Hủy = lưu thành buổi riêng`)) {
    same.exercises.push(...exercises);
    Object.assign(same, bad);
  } else data.sessions.push({ id: uid(), date, exercises, ...bad });
  btn.disabled = true; setTimeout(() => { btn.disabled = false; }, 800); // stop double-tap duplicates
  save();
  const prs = personalRecords(data.sessions).count - before;
  const nowCelebrating = mascotState(data, new Date()) === 'celebrate';
  toast(!wasCelebrating && nowCelebrating ? '🎉 ĐỦ BUỔI TUẦN NÀY! Man nhảy múa luôn!' : prs > 0 ? `📈 Phá ${prs} kỷ lục mới! Quá mạnh!` : bad ? '🏸 Đã lưu buổi cầu lông! Đánh hay lắm!' : '💪 Đã lưu! Giỏi lắm!');
  resetLog();
  go('home');
};

// ---------- Plan ----------
$('#plan-days').onchange = e => {
  const t = e.target;
  if (t.dataset.day) {
    const d = +t.dataset.day;
    data.settings.days = t.checked ? [...data.settings.days, d] : data.settings.days.filter(x => x !== d);
  }
  if (t.dataset.muscle) data.settings.plan[t.dataset.muscle] = t.value.trim();
  if (t.dataset.tpl) data.settings.templates[t.dataset.tpl] = t.value.split('\n').map(x => x.trim()).filter(Boolean);
  save();
};
$('#goal').onchange = e => { data.settings.goal = Math.min(7, Math.max(1, +e.target.value || 1)); save(); };
$('#time').onchange = e => { if (e.target.value) { data.settings.time = e.target.value; save(); } };

function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
$('#dl-ics').onclick = () => {
  if (!data.settings.days.length) return toast('Chọn ít nhất 1 ngày tập trước nhé');
  download('lich-tap-gym.ics', buildIcs(data.settings, new Date()), 'text/calendar');
  toast('Mở file vừa tải để thêm vào Lịch 📅');
};
$('#notif').onclick = async () => {
  if (!('Notification' in window)) return toast('Trình duyệt này không hỗ trợ thông báo');
  const p = await Notification.requestPermission();
  toast(p === 'granted' ? '🔔 Đã bật thông báo' : 'Bạn đã từ chối thông báo');
  render();
};
$('#export').onclick = () => {
  data.lastBackup = Date.now();
  download(`gym-backup-${ymd(new Date())}.json`, JSON.stringify(data, null, 1), 'application/json');
  save();
};
$('#backup-banner').onclick = () => { go('plan'); $('#export').scrollIntoView({ block: 'center' }); };
$('#import').onchange = async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  try {
    const d = JSON.parse(await f.text());
    if (!Array.isArray(d.sessions) || !Array.isArray(d.body) || !d.settings) throw 0;
    if (!confirm('Nhập file sẽ THAY THẾ toàn bộ dữ liệu hiện tại. Tiếp tục?')) return;
    data = normalize(d); save(); toast('✅ Đã nhập dữ liệu');
  } catch { toast('❌ File không hợp lệ'); }
};

// ---------- Body ----------
$('#b-height').onchange = e => { const h = +e.target.value; data.settings.height = h >= 100 && h <= 250 ? h : 0; save(); };
$('#save-body').onclick = () => {
  const date = $('#b-date').value, weight = +$('#b-weight').value || 0;
  if (!date || !weight) return toast('Nhập ngày và cân nặng nhé');
  data.body.push({ id: uid(), date, weight });
  $('#b-weight').value = '';
  save(); toast('⚖️ Đã lưu cân nặng');
};

// ---------- Edit / delete (delegated) ----------
document.addEventListener('click', e => {
  const s = e.target.dataset.delSession, b = e.target.dataset.delBody;
  if (e.target.dataset.editSession) editSession(e.target.dataset.editSession);
  if (e.target.dataset.libDay) { const d = +e.target.dataset.libDay; openLibrary(groupFor(data.settings.plan[d]), d); }
  if (s && confirm('Xóa buổi tập này?')) { data.sessions = data.sessions.filter(x => x.id !== s); save(); }
  if (b && confirm('Xóa số đo này?')) { data.body = data.body.filter(x => x.id !== b); save(); }
});

// ---------- Theme: auto (follow phone) -> light -> dark ----------
const THEMES = { auto: ['contrast', 'Tự động theo máy'], light: ['sun', 'Sáng'], dark: ['moon', 'Tối'] };
function applyTheme(t) {
  if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t;
  try { t === 'auto' ? localStorage.removeItem('theme') : localStorage.setItem('theme', t); } catch {}
  $('#theme-btn').innerHTML = icon(THEMES[t][0]);
  $('#theme-btn').setAttribute('aria-label', `Chế độ màu: ${THEMES[t][1]}. Chạm để đổi`);
  return t;
}
let theme = applyTheme(document.documentElement.dataset.theme || 'auto');
$('#theme-btn').onclick = () => {
  theme = applyTheme({ auto: 'light', light: 'dark', dark: 'auto' }[theme]);
  toast(`Chế độ màu: ${THEMES[theme][1]}`);
};

// ---------- Exercise library ----------
let libGroup = LIBRARY[0].group, libSub = '', libOpen = null, libDay = null; // libSub '' = all sub-areas
const libSel = new Set();
const photo = (name, cls = '') => NO_PHOTO.has(name)
  ? `<div class="anim ${cls}" aria-hidden="true">${NO_PHOTO.get(name)}</div>`
  : `<div class="anim ${cls}"><img src="ex/${photoSlug(name)}-0.jpg" alt="${esc(name)} – tư thế đầu" loading="lazy"><img src="ex/${photoSlug(name)}-1.jpg" alt="" loading="lazy"></div>`;

const stars = n => `<span class="stars" aria-label="${n} trên 5 sao">${'★'.repeat(n)}<i>${'★'.repeat(5 - n)}</i></span>`;

function libItem([name, vi, cue, sub], best, showSub) {
  const pr = best[name.toLowerCase()], r = RATINGS[name];
  return `<div class="lib-item ${libSel.has(name) ? 'sel' : ''}" data-name="${esc(name)}">
    ${photo(name)}
    <div class="lib-text"><b>${esc(name)}</b><small>${vi}${showSub ? ' · ' + sub : ''}</small>
      <span class="mini">${icon('bone')}${r[0]} ${icon('target')}${r[1]} ${icon('flame')}${r[2]}</span>${pr ? `<span class="pr">🏆 Kỷ lục ${pr} kg</span>` : ''}</div>
    <input type="checkbox" data-ex="${esc(name)}" ${libSel.has(name) ? 'checked' : ''} aria-label="Chọn ${esc(name)}">
    ${libOpen === name ? `<div class="lib-detail">${photo(name)}
      ${RATING_LABELS.map(([ic, label], k) => `<div class="stars-row">${icon(ic)}<span>${label}</span>${stars(r[k])}</div>`).join('')}
      <p>${cue}</p></div>` : ''}
  </div>`;
}

function drawLibrary() {
  const q = $('#lib-search').value.trim().toLowerCase(), best = personalRecords(data.sessions).best;
  const sortKey = $('#lib-sort').value, g = LIBRARY.find(x => x.group === libGroup);
  const sorted = list => sortKey === '' ? list : [...list].sort((a, b) => RATINGS[b[0]][sortKey] - RATINGS[a[0]][sortKey]);
  $('#lib-groups').innerHTML = LIBRARY.map(x => `<button class="chip ${!q && x.group === libGroup ? 'on' : ''}" type="button" data-group="${x.group}">${x.group}</button>`).join('');
  $('#lib-subs').innerHTML = q ? '' : ['', ...g.subs.map(s => s[0])].map(s => `<button class="chip ${s === libSub ? 'on' : ''}" type="button" data-sub="${s}">${s || 'Tất cả'}</button>`).join('');
  let html;
  if (q) {
    html = sorted(LIBRARY.flatMap(x => groupItems(x).filter(i => `${i[0]} ${i[1]} ${i[3]} ${x.group}`.toLowerCase().includes(q))))
      .map(i => libItem(i, best, true)).join('');
  } else if (libSub) {
    html = sorted(groupItems(g).filter(i => i[3] === libSub)).map(i => libItem(i, best)).join('');
  } else {
    html = g.subs.map(([sub]) => `<h3 class="lib-sec">${sub}</h3>` + sorted(groupItems(g).filter(i => i[3] === sub)).map(i => libItem(i, best)).join('')).join('');
  }
  $('#lib-list').innerHTML = (html || '<p class="hint">Không tìm thấy bài nào.</p>') +
    '<p class="hint rating-note">Điểm sao mang tính tham khảo cho người khỏe mạnh. Có chấn thương thì hỏi bác sĩ hoặc HLV.</p>';
  $('#lib-day').innerHTML = WEEK_ORDER.map(d => `<option value="${d}" ${d === libDay ? 'selected' : ''}>${DAY_NAMES[d]}${data.settings.plan[d] ? ' · ' + esc(data.settings.plan[d]) : ''}</option>`).join('');
  $('#lib-bar').hidden = !libSel.size;
  $('#lib-count').textContent = `Đã chọn ${libSel.size}`;
}

function openLibrary(group, day) {
  if (group && group !== libGroup) { libGroup = group; libSub = ''; }
  libDay = day;
  $('#lib-search').value = '';
  drawLibrary();
  go('library');
}

$('#lib-search').oninput = drawLibrary;
$('#lib-groups').onclick = e => {
  const g = e.target.closest('[data-group]')?.dataset.group;
  if (g) { libGroup = g; libSub = ''; $('#lib-search').value = ''; drawLibrary(); }
};
$('#lib-subs').onclick = e => {
  const b = e.target.closest('[data-sub]');
  if (b) { libSub = b.dataset.sub; drawLibrary(); }
};
$('#lib-sort').onchange = drawLibrary;
$('#lib-list').onclick = e => {
  const item = e.target.closest('.lib-item');
  if (!item || e.target.matches('input')) return;
  libOpen = libOpen === item.dataset.name ? null : item.dataset.name; // tap to show/hide how-to
  drawLibrary();
};
$('#lib-list').onchange = e => {
  const n = e.target.dataset.ex;
  if (n) { e.target.checked ? libSel.add(n) : libSel.delete(n); drawLibrary(); }
};
$('#lib-day').onchange = e => { libDay = +e.target.value; };
$('#lib-to-log').onclick = () => {
  // drop untouched blank rows so the picked exercises are not mixed with an empty one
  document.querySelectorAll('#exercises .ex').forEach(ex => {
    if (!ex.querySelector('.name').value.trim() && ![...ex.querySelectorAll('input')].some(i => i.value)) ex.remove();
  });
  libSel.forEach(n => addExercise(n));
  toast(`➕ Đã thêm ${libSel.size} bài vào buổi tập`);
  libSel.clear(); dirty = true;
  drawLibrary(); go('log');
};
$('#lib-to-tpl').onclick = () => {
  const d = +$('#lib-day').value, t = data.settings.templates;
  t[d] = [...new Set([...(t[d] || []), ...libSel])];
  toast(`📅 Đã thêm ${libSel.size} bài vào bài mẫu ${DAY_NAMES[d]}`);
  libSel.clear();
  save();
};
$('#lib-open').onclick = () => { const d = dayOf($('#log-date').value); openLibrary(groupFor(data.settings.plan[d]), d); };

// ---------- Navigation ----------
// Android Back: any tab -> Home -> exit. History holds at most [home, current tab].
let currentTab = 'home';
const TAB_ORDER = ['home', 'log', 'plan', 'body', 'library'];
function show(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.id === tab));
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('active', b.dataset.go === tab));
  if (tab !== currentTab) { // slide in from the side of the tab we came from
    const el = $('#' + tab);
    el.classList.remove('enter-left', 'enter-right');
    void el.offsetWidth; // restart the animation
    el.classList.add(TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(currentTab) ? 'enter-right' : 'enter-left');
  }
  $('#fab').hidden = tab !== 'home';
  scrollTo(0, 0);
  currentTab = tab;
  updateWakeLock();
}
function go(tab) {
  if (tab === currentTab) return show(tab);
  if (tab === 'home') return history.state?.tab && history.state.tab !== 'home' ? history.back() : show('home');
  currentTab === 'home' ? history.pushState({ tab }, '') : history.replaceState({ tab }, '');
  show(tab);
}
addEventListener('popstate', e => show(e.state?.tab || 'home'));
document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));

// Keep the screen on while logging a workout or resting, so the timer is not delayed by the phone sleeping
let wakeLock = null;
async function updateWakeLock() {
  const want = document.visibilityState === 'visible' && (currentTab === 'log' || !$('#rest').hidden);
  try {
    if (want && !wakeLock && navigator.wakeLock) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    } else if (!want && wakeLock) await wakeLock.release();
  } catch { wakeLock = null; }
}
document.addEventListener('visibilitychange', updateWakeLock);

// ---------- Rest timer between sets ----------
// shortcut: timers are throttled in background tabs, so the end alert can be late while the app is hidden
let restEnd = 0, restTimer, audio;
function startRest(sec = data.settings.rest) {
  try { audio ??= new AudioContext(); audio.resume(); } catch {} // created on a tap so it is allowed to play later
  restEnd = Date.now() + sec * 1000;
  $('#rest').hidden = false;
  clearInterval(restTimer); restTimer = setInterval(tickRest, 250); tickRest();
  updateWakeLock();
}
function stopRest() { clearInterval(restTimer); $('#rest').hidden = true; updateWakeLock(); }
function tickRest() {
  const left = Math.ceil((restEnd - Date.now()) / 1000);
  $('#rest-left').textContent = Math.max(0, left);
  if (left <= 0) { stopRest(); restDone(); }
}
async function restDone() {
  navigator.vibrate?.([300, 100, 300]);
  try {
    const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
    o.frequency.value = 880; o.connect(g); g.connect(audio.destination);
    g.gain.setValueAtTime(.3, t); g.gain.exponentialRampToValueAtTime(.001, t + .6); o.start(t); o.stop(t + .6);
  } catch {}
  toast('💪 Hết giờ nghỉ! Vào set tiếp theo!');
  if (document.hidden && window.Notification?.permission === 'granted') {
    (await navigator.serviceWorker?.getRegistration())?.showNotification('Hết giờ nghỉ!', { body: 'Vào set tiếp theo 💪', icon: 'icon-192.png', tag: 'rest' });
  }
}
$('#rest').onclick = e => {
  const sec = +e.target.dataset.rest;
  if (sec) { data.settings.rest = sec; save(); startRest(sec); }
  if (e.target.id === 'rest-skip') stopRest();
};

// ---------- Reminder while app is open ----------
async function checkReminder() {
  if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) render(); // don't wipe what user is typing
  const now = new Date();
  if (!needsReminder(data, now) || window.Notification?.permission !== 'granted' || localStorage.getItem('notified') === ymd(now)) return;
  localStorage.setItem('notified', ymd(now));
  const reg = await navigator.serviceWorker?.getRegistration();
  const bad = badmintonDay(now), title = bad ? 'Đến giờ đánh cầu rồi!' : 'Đến giờ tập rồi!';
  const body = bad ? 'Sân đang chờ, xách vợt lên! 🏸' : `Hôm nay có lịch tập${data.settings.plan[now.getDay()] ? ' ' + data.settings.plan[now.getDay()] : ''}. Man đang đợi bạn 💪`;
  reg ? reg.showNotification(title, { body, icon: 'icon-192.png', tag: 'gym' }) : new Notification(title, { body });
}

Object.keys(localStorage).filter(k => k.startsWith('notified-')).forEach(k => localStorage.removeItem(k)); // old per-day keys

if ('serviceWorker' in navigator) {
  const hadSW = !!navigator.serviceWorker.controller; // first install is not an "update"
  navigator.serviceWorker.register('sw.js');
  navigator.serviceWorker.addEventListener('message', e => {
    if (e.data === 'updated' && hadSW) toast('✨ Có bản mới. Chạm để tải lại', () => location.reload());
  });
}
navigator.storage?.persist?.(); // ask Android not to evict app data when storage runs low
$('#b-date').value = ymd(new Date());
resetLog();
const startTab = new URLSearchParams(location.search).get('tab'), startKind = new URLSearchParams(location.search).get('kind');
history.replaceState({ tab: 'home' }, '', location.pathname); // also drops ?tab= from home-screen shortcuts
if (['log', 'plan', 'body', 'library'].includes(startTab)) go(startTab);
if (startKind === 'badminton') setKind('badminton');
checkReminder();
setInterval(checkReminder, 60_000);
document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && checkReminder());

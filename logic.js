// Pure logic (no DOM) so it can be tested with node: `node test.mjs`
export const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first

export const defaultData = () => ({
  settings: { goal: 3, days: [1, 3, 5], time: '18:00', plan: {}, templates: {}, rest: 90, height: 0 }, // templates: {dow: ['Bench press', ...]}
  sessions: [], // {id, date:'YYYY-MM-DD', exercises:[{name, sets:[{reps, kg}]}]}
  body: [],     // {id, date, weight} (old saves may also have waist)
});

export function ymd(d) {
  const z = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}

export function weekStart(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}

const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

// Distinct training days in the week containing d
export function weekDone(sessions, d) {
  const s = ymd(weekStart(d)), e = ymd(addDays(weekStart(d), 7));
  return new Set(sessions.filter(x => x.date >= s && x.date < e).map(x => x.date)).size;
}

// How many sessions should be done before today (today still counts as "chance")
export function expectedSoFar(settings, now) {
  const elapsed = (now.getDay() + 6) % 7;
  const { days, goal } = settings;
  if (!days.length) return Math.min(goal, Math.floor(goal * elapsed / 7));
  let n = 0;
  for (let i = 0; i < elapsed; i++) if (days.includes(addDays(weekStart(now), i).getDay())) n++;
  return Math.min(goal, n);
}

export function mascotState(data, now) {
  const done = weekDone(data.sessions, now);
  if (done >= data.settings.goal) return 'celebrate';
  const behind = expectedSoFar(data.settings, now) - done;
  return behind <= 0 ? 'happy' : behind === 1 ? 'worried' : 'sad';
}

export function needsReminder(data, now) {
  const { days, time } = data.settings;
  const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  return days.includes(now.getDay())
    && !data.sessions.some(s => s.date === ymd(now))
    && hm >= time
    && weekDone(data.sessions, now) < data.settings.goal;
}

// Week streaks: current (current week counts only once met) and best ever
export function streaks(data, now) {
  const goal = data.settings.goal;
  if (!data.sessions.length) return { current: 0, best: 0 };
  const first = data.sessions.reduce((a, s) => (s.date < a ? s.date : a), data.sessions[0].date);
  const [y, m, d] = first.split('-').map(Number);
  const met = [];
  for (let w = weekStart(new Date(y, m - 1, d)); w <= now; w = addDays(w, 7)) met.push(weekDone(data.sessions, w) >= goal);
  let best = 0, run = 0;
  for (const ok of met) { run = ok ? run + 1 : 0; best = Math.max(best, run); }
  if (!met[met.length - 1]) met.pop(); // current week not finished yet: don't break streak
  let current = 0;
  for (let i = met.length - 1; i >= 0 && met[i]; i--) current++;
  return { current, best };
}

const norm = s => s.trim().toLowerCase();
const maxKg = ex => Math.max(0, ...ex.sets.map(s => +s.kg || 0));

// Personal records: times an exercise's top weight beat its previous best
export function personalRecords(sessions) {
  const best = {}; let count = 0;
  for (const s of [...sessions].sort((a, b) => a.date.localeCompare(b.date))) {
    for (const ex of s.exercises) {
      const k = norm(ex.name), kg = maxKg(ex);
      if (k in best && kg > best[k]) count++;
      if (!(k in best) || kg > best[k]) best[k] = kg;
    }
  }
  return { count, best };
}

export function lastPerformance(sessions, name, beforeDate = '9999') {
  const k = norm(name);
  if (!k) return null;
  const s = [...sessions].filter(s => s.date < beforeDate).sort((a, b) => b.date.localeCompare(a.date))
    .find(s => s.exercises.some(e => norm(e.name) === k));
  if (!s) return null;
  const ex = s.exercises.find(e => norm(e.name) === k);
  return { date: s.date, sets: ex.sets, text: ex.sets.map(x => `${x.reps}×${x.kg || 0}kg`).join(', ') };
}

// Top weight per training day for one exercise, oldest first
export function exerciseHistory(sessions, name) {
  const k = norm(name), byDate = {};
  for (const s of sessions) for (const ex of s.exercises) {
    if (norm(ex.name) === k) byDate[s.date] = Math.max(byDate[s.date] || 0, maxKg(ex));
  }
  return Object.keys(byDate).sort().map(date => ({ date, kg: byDate[date] }));
}

// BMI with WHO Asia-Pacific cut-offs (used for Vietnamese adults)
export const BMI_NORMAL = [18.5, 22.9];
export function bmiInfo(weight, heightCm) {
  if (!weight || !heightCm) return null;
  const h2 = (heightCm / 100) ** 2, bmi = weight / h2;
  const min = +(BMI_NORMAL[0] * h2).toFixed(1), max = +(BMI_NORMAL[1] * h2).toFixed(1);
  const cat = bmi < 18.5 ? 'under' : bmi < 23 ? 'normal' : bmi < 25 ? 'over' : 'obese';
  const diff = +(weight > max ? weight - max : weight < min ? min - weight : 0).toFixed(1); // kg to reach normal range
  return { bmi: +bmi.toFixed(1), cat, min, max, diff };
}

// Encouragement for the Body tab: BMI + change since last weigh-in + total change + realistic ETA (0.5 kg/week)
export function bodyCheer(body, heightCm) {
  const ws = body.filter(b => b.weight).sort((a, b) => a.date.localeCompare(b.date));
  if (!ws.length) return 'Bước lên cân đi. Không đo thì không biết, không biết thì không thay đổi được. ⚖️';
  const last = ws[ws.length - 1].weight, prev = ws.length > 1 ? ws[ws.length - 2].weight : last;
  const change = +(last - prev).toFixed(1), total = +(last - ws[0].weight).toFixed(1), info = bmiInfo(last, heightCm);
  if (!info) return 'Nhập chiều cao để man tính BMI và mức cân chuẩn cho bạn. 📏';
  const weeks = Math.ceil(info.diff / 0.5);
  const sinceStart = ws.length > 2 && total ? ` Tổng cộng ${total > 0 ? 'tăng' : 'giảm'} ${Math.abs(total)} kg từ lần cân đầu.` : '';
  if (info.cat === 'normal') {
    const edge = +(info.max - last).toFixed(1);
    if (edge <= 1) return `Đang ở vùng chuẩn nhưng chỉ còn ${edge} kg là chạm mép trên. Siết lại ăn uống trước khi trượt. ⚠️`;
    return change > 0
      ? `Vẫn chuẩn, nhưng vừa tăng ${change} kg. Giữ nhịp tập, đừng để tăng thành thói quen.${sinceStart} 💪`
      : `Cân nặng chuẩn (${info.min}–${info.max} kg). Giữ được mới là khó, bạn đang làm tốt.${sinceStart} 🏆`;
  }
  if (info.cat === 'under') {
    if (change > 0) return `Tăng ${change} kg, đúng hướng!${sinceStart} Còn thiếu ${info.diff} kg, khoảng ${weeks} tuần nếu ăn đủ đạm và tập nặng đều. 💪`;
    if (change < 0) return `Lại giảm ${-change} kg. Đừng bỏ bữa, thêm bữa phụ giàu đạm. Còn thiếu ${info.diff} kg. 🍚`;
    return `Thiếu ${info.diff} kg so với chuẩn. Ăn dư khoảng 300 kcal mỗi ngày và tập tạ, cơ sẽ lên. 🍚`;
  }
  if (change < 0) return `Giảm ${-change} kg so với lần trước!${sinceStart} Còn ${info.diff} kg, giữ nhịp 0.5 kg/tuần là khoảng ${weeks} tuần nữa. 🔥`;
  if (change > 0) return `Tăng lại ${change} kg. Một lần thì không sao, đừng để thành hai. Còn ${info.diff} kg về chuẩn, quay lại kỷ luật ngay hôm nay. 🎯`;
  return `Dư ${info.diff} kg so với chuẩn. Muốn kim cân nhúc nhích thì phải thay đổi: bớt đồ ngọt, thêm cardio, ngủ đủ. Khoảng ${weeks} tuần là tới. 🔥`;
}

// Recurring calendar events with alarm: phone calendar reminds on time, no server needed
export function buildIcs(settings, now) {
  const ICS_DAY = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const [hh, mm] = settings.time.split(':');
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GymMan//VI', 'CALSCALE:GREGORIAN'];
  for (const d of settings.days) {
    let start = new Date(now);
    while (start.getDay() !== d) start = addDays(start, 1);
    const muscle = (settings.plan[d] || '').replace(/[,;\\\n]/g, ' ');
    lines.push('BEGIN:VEVENT', `UID:gymman-${d}@local`, `DTSTAMP:${stamp}`,
      `DTSTART:${ymd(start).replace(/-/g, '')}T${hh}${mm}00`, 'DURATION:PT1H',
      `RRULE:FREQ=WEEKLY;BYDAY=${ICS_DAY[d]}`,
      `SUMMARY:💪 Đi tập gym${muscle ? ' - ' + muscle : ''}`,
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Đến giờ tập rồi! Man đang đợi bạn 💪', 'TRIGGER:PT0M', 'END:VALARM',
      'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

import assert from 'node:assert/strict';
import { LIBRARY, groupFor, groupItems, NO_PHOTO, photoSlug, RATINGS } from './library.js';
import { existsSync } from 'node:fs';
import { weekStart, ymd, weekDone, mascotState, needsReminder, streaks, personalRecords, lastPerformance, exerciseHistory, bmiInfo, bodyCheer, buildIcs, defaultData } from './logic.js';

const S = (date, exercises = []) => ({ id: date, date, exercises });
const ex = (name, ...kgs) => ({ name, sets: kgs.map(kg => ({ reps: 10, kg })) });

// 2026-10-21 is a Wednesday
const wed = new Date(2026, 9, 21, 19, 0);
assert.equal(ymd(weekStart(wed)), '2026-10-19');
assert.equal(ymd(weekStart(new Date(2026, 9, 25))), '2026-10-19'); // Sunday belongs to previous Monday

const data = defaultData(); // goal 3, days Mon/Wed/Fri, 18:00
assert.equal(mascotState(data, wed), 'worried'); // missed Monday
data.sessions.push(S('2026-10-19'));
assert.equal(mascotState(data, wed), 'happy');
assert.equal(needsReminder(data, wed), true); // Wed scheduled, 19:00 >= 18:00, not trained
assert.equal(needsReminder(data, new Date(2026, 9, 21, 17, 0)), false);
data.sessions.push(S('2026-10-21'), S('2026-10-21'));
assert.equal(weekDone(data.sessions, wed), 2); // same day counted once
assert.equal(needsReminder(data, wed), false);
data.sessions.push(S('2026-10-22'));
assert.equal(mascotState(data, wed), 'celebrate');

const lazy = defaultData();
assert.equal(mascotState(lazy, new Date(2026, 9, 24)), 'sad'); // Sat, missed Mon+Wed+Fri

// streaks: weeks of 12 Oct and 19 Oct met; current week (26 Oct) unfinished doesn't break it
const st = defaultData(); st.settings.goal = 1;
st.sessions = [S('2026-10-05'), S('2026-10-13'), S('2026-10-20')];
assert.deepEqual(streaks(st, new Date(2026, 9, 27)), { current: 3, best: 3 });
st.sessions = [S('2026-10-05'), S('2026-10-20')];
assert.deepEqual(streaks(st, new Date(2026, 9, 27)), { current: 1, best: 1 });

const prs = [S('2026-10-01', [ex('Squat', 40, 50)]), S('2026-10-03', [ex('squat ', 55)]), S('2026-10-05', [ex('Squat', 50)])];
assert.equal(personalRecords(prs).count, 1);
assert.equal(lastPerformance(prs, 'SQUAT').text, '10×50kg');
assert.equal(lastPerformance(prs, 'Squat', '2026-10-05').text, '10×55kg');
assert.deepEqual(lastPerformance(prs, 'Squat').sets, [{ reps: 10, kg: 50 }]);
prs.push(S('2026-10-05', [ex('SQUAT', 52)]));
assert.deepEqual(exerciseHistory(prs, 'squat'), [{ date: '2026-10-01', kg: 50 }, { date: '2026-10-03', kg: 55 }, { date: '2026-10-05', kg: 52 }]);
assert.deepEqual(exerciseHistory(prs, 'Bench'), []);

// 170cm: normal 53.5-66.2 kg
assert.deepEqual(bmiInfo(70, 170), { bmi: 24.2, cat: 'over', min: 53.5, max: 66.2, diff: 3.8 });
assert.equal(bmiInfo(50, 170).cat, 'under');
assert.equal(bmiInfo(50, 170).diff, 3.5);
assert.equal(bmiInfo(60, 170).diff, 0);
assert.equal(bmiInfo(60, 0), null);
const W = (date, weight) => ({ date, weight });
assert.match(bodyCheer([W('2026-10-01', 71), W('2026-10-08', 70)], 170), /Đã giảm 1 kg.*3.8 kg/);
assert.match(bodyCheer([W('2026-10-01', 60)], 170), /chuẩn/);
assert.match(bodyCheer([W('2026-10-01', 60)], 0), /chiều cao/);

const ics = buildIcs(data.settings, wed);
assert.match(ics, /DTSTART:20261021T180000/);
assert.match(ics, /RRULE:FREQ=WEEKLY;BYDAY=MO/);
assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 3);

assert.equal(groupFor('Ngực + tay sau'), 'Ngực');
assert.equal(groupFor('Tay sau'), 'Tay sau');
assert.equal(groupFor('Lưng xô'), 'Lưng');
assert.equal(groupFor(''), null);
const allNames = LIBRARY.flatMap(g => groupItems(g).map(i => i[0].toLowerCase()));
assert.equal(new Set(allNames).size, allNames.length, 'library names must be unique');
for (const g of LIBRARY) for (const i of groupItems(g)) {
  assert.equal(i.length, 4, i[0]); // name, vi, cue, sub
  assert.ok(RATINGS[i[0]]?.length === 3 && RATINGS[i[0]].every(r => r >= 1 && r <= 5), 'rating ' + i[0]);
  if (!NO_PHOTO.has(i[0])) assert.ok(existsSync(`ex/${photoSlug(i[0])}-1.jpg`), 'missing photo ' + i[0]);
}

assert.equal(Object.keys(RATINGS).length, allNames.length, 'no ratings for unknown exercises');

console.log('OK all tests passed');

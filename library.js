// Built-in exercise library by muscle group.
// Item: [name (English, as used in most gyms), Vietnamese name, short form cue].
// Photos: ex/<slug>-0.jpg (start) and -1.jpg (end) from free-exercise-db (public domain, Unlicense).
export const LIBRARY = [
  { group: 'Ngực', icon: '🫁', aliases: ['ngực', 'chest'], items: [
    ['Bench press', 'Đẩy ngực ngang tạ đòn', 'Ép bả vai ra sau, hạ tạ chạm giữa ngực, đẩy thẳng lên. Chân bám sàn.'],
    ['Incline bench press', 'Đẩy ngực trên tạ đòn', 'Ghế dốc 30–45°, hạ tạ về ngực trên, khuỷu tay chếch khoảng 45°.'],
    ['Dumbbell bench press', 'Đẩy ngực tạ đơn', 'Hạ tạ sâu ngang ngực, đẩy lên và khép nhẹ hai tạ ở trên.'],
    ['Incline dumbbell press', 'Đẩy ngực trên tạ đơn', 'Ghế dốc 30–45°, hạ chậm 2–3 giây, không khóa cứng khuỷu tay.'],
    ['Dumbbell fly', 'Bay ngực tạ đơn', 'Khuỷu hơi cong cố định, mở tay như ôm thùng lớn, cảm nhận căng ngực.'],
    ['Cable crossover', 'Kéo cáp ép ngực', 'Bước lên một bước, người hơi đổ trước, kéo hai tay gặp nhau trước bụng.'],
    ['Chest press machine', 'Máy đẩy ngực', 'Chỉnh ghế để tay cầm ngang ngực, đẩy ra rồi về chậm.'],
    ['Pec deck', 'Máy ép ngực', 'Lưng áp ghế, ép hai tay vào giữa, giữ 1 giây rồi mở chậm.'],
    ['Dips', 'Chống xà kép', 'Người đổ trước để vào ngực, hạ tới khi vai ngang khuỷu rồi đẩy lên.'],
    ['Push up', 'Hít đất', 'Thân thẳng từ đầu tới gót, siết bụng, hạ ngực gần sàn.'],
  ] },
  { group: 'Lưng', icon: '🦅', aliases: ['lưng', 'xô', 'back'], items: [
    ['Deadlift', 'Kéo tạ đòn từ sàn', 'Lưng thẳng, tạ sát ống chân, đẩy hông ra trước khi đứng lên. Không cong lưng.'],
    ['Pull up', 'Hít xà đơn', 'Treo thẳng tay, kéo ngực lên xà bằng lưng, hạ chậm hết tầm.'],
    ['Lat pulldown', 'Kéo xô máy', 'Ngả người nhẹ, kéo thanh về ngực trên, ép bả vai xuống và vào trong.'],
    ['Barbell row', 'Chèo tạ đòn', 'Gập hông khoảng 45°, lưng thẳng, kéo tạ về rốn.'],
    ['Dumbbell row', 'Chèo tạ đơn 1 tay', 'Một tay một gối chống ghế, kéo tạ về hông như kéo cưa.'],
    ['Seated cable row', 'Kéo cáp ngồi', 'Ngồi thẳng lưng, kéo tay cầm về bụng, ưỡn ngực, không giật người.'],
    ['T-bar row', 'Chèo T-bar', 'Gập hông, lưng thẳng, kéo tạ về ngực dưới, siết lưng giữa.'],
    ['Face pull', 'Kéo cáp về mặt', 'Cáp ngang mặt, kéo dây về trán, tách hai tay ra hai bên tai.'],
    ['Back extension', 'Ưỡn lưng', 'Gập người từ hông, nâng lên tới khi thân thẳng, không ưỡn quá.'],
  ] },
  { group: 'Vai', icon: '🏔️', aliases: ['vai', 'shoulder'], items: [
    ['Overhead press', 'Đẩy vai tạ đòn', 'Siết bụng và mông, đẩy tạ thẳng qua đầu, không ngả lưng.'],
    ['Dumbbell shoulder press', 'Đẩy vai tạ đơn', 'Tạ ngang tai, đẩy lên gần chạm nhau, hạ chậm.'],
    ['Lateral raise', 'Nâng tạ ngang (vai giữa)', 'Khuỷu hơi cong, nâng tạ sang ngang tới vai, dẫn bằng khuỷu tay.'],
    ['Front raise', 'Nâng tạ trước (vai trước)', 'Nâng tạ ra trước tới ngang vai, không đánh đà người.'],
    ['Rear delt fly', 'Bay vai sau', 'Gập người, mở tay sang ngang, siết sau vai, tạ nhẹ thôi.'],
    ['Arnold press', 'Đẩy vai Arnold', 'Bắt đầu lòng bàn tay hướng vào mặt, vừa đẩy vừa xoay ra ngoài.'],
    ['Upright row', 'Kéo tạ dọc thân', 'Kéo tạ sát người lên ngực, khuỷu cao hơn cổ tay, không quá vai.'],
    ['Shrug', 'Nhún vai (cầu vai)', 'Tay thẳng, nhún vai lên sát tai, giữ 1 giây, không xoay vai.'],
  ] },
  { group: 'Tay trước', icon: '💪', aliases: ['tay trước', 'bắp tay', 'biceps', 'tay'], items: [
    ['Barbell curl', 'Cuốn tạ đòn', 'Khuỷu tay cố định sát người, cuốn tạ lên, hạ chậm, không đung đưa.'],
    ['Dumbbell curl', 'Cuốn tạ đơn', 'Xoay lòng bàn tay ngửa khi cuốn lên, hạ hết tầm.'],
    ['Hammer curl', 'Cuốn búa', 'Lòng bàn tay hướng vào nhau như cầm búa, cuốn lên ngang vai.'],
    ['Preacher curl', 'Cuốn trên ghế dốc', 'Bắp tay áp ghế, hạ gần thẳng tay, không bật tạ ở dưới.'],
    ['Cable curl', 'Cuốn cáp', 'Đứng thẳng, khuỷu sát người, cuốn tay cầm lên, căng liên tục.'],
    ['Concentration curl', 'Cuốn tập trung', 'Ngồi, khuỷu tì đùi trong, cuốn chậm, siết bắp tay ở đỉnh.'],
  ] },
  { group: 'Tay sau', icon: '🦾', aliases: ['tay sau', 'triceps'], items: [
    ['Triceps pushdown', 'Kéo cáp tay sau', 'Khuỷu sát hông cố định, đẩy xuống tới thẳng tay, về chậm.'],
    ['Overhead triceps extension', 'Duỗi tay sau qua đầu', 'Khuỷu chỉ thẳng lên trần, hạ dây ra sau đầu rồi duỗi thẳng.'],
    ['Skull crusher', 'Duỗi tay sau nằm', 'Nằm ghế, hạ tạ về trán bằng cách gập khuỷu, cánh tay trên đứng yên.'],
    ['Close-grip bench press', 'Đẩy ngực tay hẹp', 'Tay cầm rộng bằng vai, khuỷu khép sát người khi hạ tạ.'],
    ['Bench dips', 'Chống ghế tay sau', 'Tay chống mép ghế, lưng sát ghế, hạ tới khuỷu 90° rồi đẩy lên.'],
    ['Triceps kickback', 'Đá tay sau tạ đơn', 'Gập người, cánh tay trên song song sàn, duỗi tay thẳng ra sau.'],
  ] },
  { group: 'Chân', icon: '🦵', aliases: ['chân', 'đùi', 'leg'], items: [
    ['Squat', 'Gánh tạ đòn', 'Chân rộng bằng vai, ngồi xuống như ngồi ghế, gối theo hướng mũi chân, lưng thẳng.'],
    ['Front squat', 'Gánh tạ trước', 'Tạ trên vai trước, khuỷu cao, thân thẳng đứng hơn back squat.'],
    ['Leg press', 'Đạp đùi máy', 'Chân giữa bàn đạp, hạ tới gối 90°, không khóa gối khi đạp lên.'],
    ['Lunge', 'Chùng chân', 'Bước dài, hạ tới hai gối gần 90°, gối trước không vượt mũi chân nhiều.'],
    ['Bulgarian split squat', 'Chùng chân 1 chân sau gác ghế', 'Chân sau gác ghế, hạ thẳng xuống, dồn lực vào chân trước.'],
    ['Leg extension', 'Đá đùi trước máy', 'Đá chân lên thẳng, giữ 1 giây, hạ chậm.'],
    ['Leg curl', 'Móc đùi sau máy', 'Móc gót về mông, hông áp ghế, hạ chậm.'],
    ['Romanian deadlift', 'Deadlift chân thẳng (đùi sau)', 'Gối hơi cong, đẩy hông ra sau, tạ trượt sát đùi tới khi căng đùi sau.'],
    ['Hack squat', 'Gánh máy hack', 'Lưng áp đệm, chân giữa bàn, hạ sâu có kiểm soát.'],
    ['Calf raise', 'Nhón bắp chân', 'Nhón lên cao nhất, giữ 1 giây, hạ gót xuống sâu.'],
  ] },
  { group: 'Mông', icon: '🍑', aliases: ['mông', 'glute'], items: [
    ['Hip thrust', 'Đẩy hông tạ đòn', 'Lưng trên tựa ghế, đẩy hông lên tới thân thẳng, siết mông ở trên.'],
    ['Glute bridge', 'Cầu mông', 'Nằm sàn, gót gần mông, đẩy hông lên, siết mông 1–2 giây.'],
    ['Cable kickback', 'Đá chân sau cáp', 'Đá chân thẳng ra sau bằng mông, không ưỡn lưng.'],
    ['Hip abduction machine', 'Máy dạng hông', 'Mở hai chân ra ngoài, giữ 1 giây, về chậm.'],
    ['Sumo deadlift', 'Deadlift sumo', 'Chân rộng, mũi chân xoay ngoài, tay cầm trong gối, lưng thẳng.'],
    ['Step up', 'Bước bục', 'Đạp cả bàn chân lên bục, dùng chân trên để đứng lên.'],
  ] },
  { group: 'Bụng', icon: '🍫', aliases: ['bụng', 'core', 'abs'], items: [
    ['Crunch', 'Gập bụng', 'Cuộn vai lên bằng bụng, không kéo cổ, thở ra khi lên.'],
    ['Plank', 'Plank giữ thẳng người', 'Khuỷu dưới vai, siết bụng và mông, người thẳng như tấm ván.'],
    ['Hanging leg raise', 'Treo xà nâng chân', 'Treo xà, nâng chân bằng bụng, không đung đưa.'],
    ['Russian twist', 'Xoay người kiểu Nga', 'Ngả người ra sau, giữ lưng thẳng, xoay thân sang hai bên.'],
    ['Cable crunch', 'Gập bụng cáp', 'Quỳ, giữ dây cạnh đầu, gập bụng kéo khuỷu về đùi.'],
    ['Ab wheel', 'Lăn bánh xe bụng', 'Siết bụng, lăn ra xa trong tầm giữ được lưng thẳng rồi kéo về.'],
    ['Bicycle crunch', 'Gập bụng đạp xe', 'Khuỷu chéo chạm gối đối diện, chân đạp như đạp xe.'],
  ] },
  { group: 'Cardio', icon: '🏃', aliases: ['cardio', 'chạy', 'đốt mỡ'], items: [
    ['Treadmill', 'Chạy bộ máy', 'Khởi động 5 phút đi bộ, giữ nhịp thở đều, không bám tay vịn.'],
    ['Stationary bike', 'Đạp xe tại chỗ', 'Chỉnh yên để gối hơi cong khi chân duỗi, đạp đều nhịp.'],
    ['Elliptical', 'Máy chạy elip', 'Đứng thẳng, dùng cả tay và chân, nhẹ cho khớp gối.'],
    ['Rowing machine', 'Máy chèo thuyền', 'Đạp chân trước, rồi ngả lưng, cuối cùng kéo tay. Về theo thứ tự ngược lại.'],
    ['Jump rope', 'Nhảy dây', 'Nhảy thấp bằng mũi chân, quay dây bằng cổ tay.'],
    ['Burpee', 'Bật nhảy burpee', 'Ngồi xuống, bật chân ra sau thành chống đẩy, thu chân lại rồi bật nhảy lên.'],
  ] },
];

export const NO_PHOTO = new Set(['Burpee']);
export const photoSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Library group matching a day's muscle text, e.g. "Ngực + tay sau" -> 'Ngực'.
// First mentioned group wins; at the same spot the longer alias wins ("tay sau" over "tay").
export function groupFor(text = '') {
  const t = text.toLowerCase();
  let best = null, at = Infinity, len = 0;
  for (const g of LIBRARY) for (const a of g.aliases) {
    const i = t.indexOf(a);
    if (i >= 0 && (i < at || (i === at && a.length > len))) { best = g.group; at = i; len = a.length; }
  }
  return best;
}

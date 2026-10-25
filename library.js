// Built-in exercise library: muscle group -> sub-area -> exercises.
// Item: [name (English, as used in most gyms), Vietnamese name, short form cue].
// Photos: ex/<slug>-0.jpg (start) and -1.jpg (end) from free-exercise-db (public domain, Unlicense).
export const LIBRARY = [
  { group: 'Ngực', icon: '🫁', aliases: ['ngực', 'chest'], subs: [
    ['Ngực trên', [
      ['Incline bench press', 'Đẩy ngực trên tạ đòn', 'Ghế dốc 30–45°, hạ tạ về ngực trên, khuỷu tay chếch khoảng 45°.'],
      ['Incline dumbbell press', 'Đẩy ngực trên tạ đơn', 'Ghế dốc 30–45°, hạ chậm 2–3 giây, không khóa cứng khuỷu tay.'],
      ['Incline dumbbell fly', 'Bay ngực trên tạ đơn', 'Ghế dốc, khuỷu hơi cong, mở tay rộng rồi ép tạ lên trên ngực trên.'],
      ['Low cable fly', 'Kéo cáp từ dưới lên', 'Cáp đặt thấp, kéo hai tay từ hông lên gặp nhau ngang cằm.'],
    ]],
    ['Ngực giữa', [
      ['Bench press', 'Đẩy ngực ngang tạ đòn', 'Ép bả vai ra sau, hạ tạ chạm giữa ngực, đẩy thẳng lên. Chân bám sàn.'],
      ['Dumbbell bench press', 'Đẩy ngực tạ đơn', 'Hạ tạ sâu ngang ngực, đẩy lên và khép nhẹ hai tạ ở trên.'],
      ['Dumbbell fly', 'Bay ngực tạ đơn', 'Khuỷu hơi cong cố định, mở tay như ôm thùng lớn, cảm nhận căng ngực.'],
      ['Chest press machine', 'Máy đẩy ngực', 'Chỉnh ghế để tay cầm ngang ngực, đẩy ra rồi về chậm.'],
      ['Pec deck', 'Máy ép ngực', 'Lưng áp ghế, ép hai tay vào giữa, giữ 1 giây rồi mở chậm.'],
      ['Push up', 'Hít đất', 'Thân thẳng từ đầu tới gót, siết bụng, hạ ngực gần sàn.'],
    ]],
    ['Ngực dưới', [
      ['Decline bench press', 'Đẩy ngực dưới tạ đòn', 'Ghế dốc xuống, móc chân chắc, hạ tạ về ngực dưới.'],
      ['Decline dumbbell press', 'Đẩy ngực dưới tạ đơn', 'Ghế dốc xuống, đẩy tạ thẳng lên trên ngực dưới, hạ chậm.'],
      ['Decline dumbbell fly', 'Bay ngực dưới tạ đơn', 'Ghế dốc xuống, khuỷu hơi cong, mở tay rồi ép tạ về giữa.'],
      ['Dips', 'Chống xà kép', 'Người đổ trước để vào ngực, hạ tới khi vai ngang khuỷu rồi đẩy lên.'],
      ['Cable crossover', 'Kéo cáp ép ngực từ trên xuống', 'Cáp đặt cao, người hơi đổ trước, kéo hai tay gặp nhau trước bụng.'],
    ]],
  ] },
  { group: 'Lưng', icon: '🦅', aliases: ['lưng', 'xô', 'back'], subs: [
    ['Xô (lưng rộng)', [
      ['Pull up', 'Hít xà đơn', 'Treo thẳng tay, kéo ngực lên xà bằng lưng, hạ chậm hết tầm.'],
      ['Lat pulldown', 'Kéo xô máy', 'Ngả người nhẹ, kéo thanh về ngực trên, ép bả vai xuống và vào trong.'],
      ['Close-grip pulldown', 'Kéo xô tay hẹp', 'Tay cầm hẹp, kéo về ngực, khuỷu đi sát thân.'],
      ['Straight-arm pulldown', 'Kéo cáp tay thẳng', 'Tay gần thẳng, kéo thanh từ trên xuống đùi bằng xô, không gập khuỷu.'],
      ['Dumbbell pullover', 'Kéo tạ qua đầu', 'Nằm ngang ghế, tay gần thẳng, hạ tạ ra sau đầu rồi kéo về trên ngực.'],
    ]],
    ['Lưng giữa (dày lưng)', [
      ['Barbell row', 'Chèo tạ đòn', 'Gập hông khoảng 45°, lưng thẳng, kéo tạ về rốn.'],
      ['Dumbbell row', 'Chèo tạ đơn 1 tay', 'Một tay một gối chống ghế, kéo tạ về hông như kéo cưa.'],
      ['Seated cable row', 'Kéo cáp ngồi', 'Ngồi thẳng lưng, kéo tay cầm về bụng, ưỡn ngực, không giật người.'],
      ['T-bar row', 'Chèo T-bar', 'Gập hông, lưng thẳng, kéo tạ về ngực dưới, siết lưng giữa.'],
    ]],
    ['Lưng dưới', [
      ['Deadlift', 'Kéo tạ đòn từ sàn', 'Lưng thẳng, tạ sát ống chân, đẩy hông ra trước khi đứng lên. Không cong lưng.'],
      ['Back extension', 'Ưỡn lưng', 'Gập người từ hông, nâng lên tới khi thân thẳng, không ưỡn quá.'],
      ['Good morning', 'Cúi chào tạ đòn', 'Tạ trên vai, gối hơi cong, đẩy hông ra sau và cúi tới khi thân gần ngang.'],
    ]],
  ] },
  { group: 'Vai', icon: '🏔️', aliases: ['vai', 'shoulder'], subs: [
    ['Vai trước', [
      ['Overhead press', 'Đẩy vai tạ đòn', 'Siết bụng và mông, đẩy tạ thẳng qua đầu, không ngả lưng.'],
      ['Dumbbell shoulder press', 'Đẩy vai tạ đơn', 'Tạ ngang tai, đẩy lên gần chạm nhau, hạ chậm.'],
      ['Arnold press', 'Đẩy vai Arnold', 'Bắt đầu lòng bàn tay hướng vào mặt, vừa đẩy vừa xoay ra ngoài.'],
      ['Front raise', 'Nâng tạ trước', 'Nâng tạ ra trước tới ngang vai, không đánh đà người.'],
    ]],
    ['Vai giữa', [
      ['Lateral raise', 'Nâng tạ ngang', 'Khuỷu hơi cong, nâng tạ sang ngang tới vai, dẫn bằng khuỷu tay.'],
      ['Cable lateral raise', 'Nâng cáp ngang', 'Đứng nghiêng cạnh cáp, nâng tay sang ngang tới vai, căng liên tục.'],
      ['Upright row', 'Kéo tạ dọc thân', 'Kéo tạ sát người lên ngực, khuỷu cao hơn cổ tay, không quá vai.'],
    ]],
    ['Vai sau', [
      ['Rear delt fly', 'Bay vai sau', 'Gập người, mở tay sang ngang, siết sau vai, tạ nhẹ thôi.'],
      ['Reverse pec deck', 'Máy bay vai sau', 'Ngồi úp mặt vào máy, mở tay ra sau ngang vai, về chậm.'],
      ['Face pull', 'Kéo cáp về mặt', 'Cáp ngang mặt, kéo dây về trán, tách hai tay ra hai bên tai.'],
    ]],
    ['Cầu vai', [
      ['Shrug', 'Nhún vai tạ đòn', 'Tay thẳng, nhún vai lên sát tai, giữ 1 giây, không xoay vai.'],
      ['Dumbbell shrug', 'Nhún vai tạ đơn', 'Tạ hai bên hông, nhún thẳng lên, hạ chậm hết tầm.'],
    ]],
  ] },
  { group: 'Tay trước', icon: '💪', aliases: ['tay trước', 'bắp tay', 'biceps', 'tay'], subs: [
    ['Bắp tay tổng hợp', [
      ['Barbell curl', 'Cuốn tạ đòn', 'Khuỷu tay cố định sát người, cuốn tạ lên, hạ chậm, không đung đưa.'],
      ['Dumbbell curl', 'Cuốn tạ đơn', 'Xoay lòng bàn tay ngửa khi cuốn lên, hạ hết tầm.'],
      ['Cable curl', 'Cuốn cáp', 'Đứng thẳng, khuỷu sát người, cuốn tay cầm lên, căng liên tục.'],
    ]],
    ['Đầu dài (bắp ngoài)', [
      ['Incline dumbbell curl', 'Cuốn tạ đơn ghế dốc', 'Ngả lưng ghế dốc, tay buông thẳng sau thân, cuốn lên không đưa khuỷu ra trước.'],
      ['Hammer curl', 'Cuốn búa', 'Lòng bàn tay hướng vào nhau như cầm búa, cuốn lên ngang vai.'],
    ]],
    ['Đầu ngắn (bắp trong)', [
      ['Preacher curl', 'Cuốn trên ghế dốc', 'Bắp tay áp ghế, hạ gần thẳng tay, không bật tạ ở dưới.'],
      ['Concentration curl', 'Cuốn tập trung', 'Ngồi, khuỷu tì đùi trong, cuốn chậm, siết bắp tay ở đỉnh.'],
    ]],
    ['Cẳng tay', [
      ['Reverse curl', 'Cuốn tạ úp tay', 'Cầm tạ úp lòng bàn tay, cuốn lên, giữ cổ tay thẳng.'],
      ['Wrist curl', 'Cuốn cổ tay', 'Cẳng tay tì ghế, chỉ gập cổ tay lên xuống, tạ nhẹ.'],
    ]],
  ] },
  { group: 'Tay sau', icon: '🦾', aliases: ['tay sau', 'triceps'], subs: [
    ['Đầu dài', [
      ['Overhead triceps extension', 'Duỗi tay sau qua đầu', 'Khuỷu chỉ thẳng lên trần, hạ dây ra sau đầu rồi duỗi thẳng.'],
      ['Skull crusher', 'Duỗi tay sau nằm', 'Nằm ghế, hạ tạ về trán bằng cách gập khuỷu, cánh tay trên đứng yên.'],
    ]],
    ['Đầu ngoài & giữa', [
      ['Triceps pushdown', 'Kéo cáp tay sau thanh thẳng', 'Khuỷu sát hông cố định, đẩy xuống tới thẳng tay, về chậm.'],
      ['Rope pushdown', 'Kéo cáp tay sau dây thừng', 'Đẩy dây xuống rồi tách hai đầu dây ra ở cuối, khuỷu sát hông.'],
      ['Triceps kickback', 'Đá tay sau tạ đơn', 'Gập người, cánh tay trên song song sàn, duỗi tay thẳng ra sau.'],
    ]],
    ['Bài nặng (nhiều khớp)', [
      ['Close-grip bench press', 'Đẩy ngực tay hẹp', 'Tay cầm rộng bằng vai, khuỷu khép sát người khi hạ tạ.'],
      ['Triceps dips', 'Chống xà kép tay sau', 'Thân thẳng đứng, khuỷu khép sát, hạ tới 90° rồi đẩy lên.'],
      ['Bench dips', 'Chống ghế tay sau', 'Tay chống mép ghế, lưng sát ghế, hạ tới khuỷu 90° rồi đẩy lên.'],
    ]],
  ] },
  { group: 'Chân', icon: '🦵', aliases: ['chân', 'đùi', 'leg'], subs: [
    ['Đùi trước', [
      ['Squat', 'Gánh tạ đòn', 'Chân rộng bằng vai, ngồi xuống như ngồi ghế, gối theo hướng mũi chân, lưng thẳng.'],
      ['Front squat', 'Gánh tạ trước', 'Tạ trên vai trước, khuỷu cao, thân thẳng đứng hơn back squat.'],
      ['Leg press', 'Đạp đùi máy', 'Chân giữa bàn đạp, hạ tới gối 90°, không khóa gối khi đạp lên.'],
      ['Hack squat', 'Gánh máy hack', 'Lưng áp đệm, chân giữa bàn, hạ sâu có kiểm soát.'],
      ['Leg extension', 'Đá đùi trước máy', 'Đá chân lên thẳng, giữ 1 giây, hạ chậm.'],
    ]],
    ['Đùi sau', [
      ['Romanian deadlift', 'Deadlift chân thẳng', 'Gối hơi cong, đẩy hông ra sau, tạ trượt sát đùi tới khi căng đùi sau.'],
      ['Leg curl', 'Móc đùi sau nằm', 'Móc gót về mông, hông áp ghế, hạ chậm.'],
      ['Seated leg curl', 'Móc đùi sau ngồi', 'Ngồi sát lưng ghế, kẹp đùi chắc, kéo gót xuống dưới ghế.'],
    ]],
    ['Tập 1 chân', [
      ['Lunge', 'Chùng chân', 'Bước dài, hạ tới hai gối gần 90°, gối trước không vượt mũi chân nhiều.'],
      ['Bulgarian split squat', 'Chùng chân sau gác ghế', 'Chân sau gác ghế, hạ thẳng xuống, dồn lực vào chân trước.'],
    ]],
    ['Đùi trong', [
      ['Hip adduction machine', 'Máy khép đùi', 'Khép hai chân vào giữa, giữ 1 giây, mở ra chậm.'],
    ]],
    ['Bắp chân', [
      ['Calf raise', 'Nhón bắp chân đứng', 'Nhón lên cao nhất, giữ 1 giây, hạ gót xuống sâu.'],
      ['Seated calf raise', 'Nhón bắp chân ngồi', 'Ngồi, đệm trên gối, nhón lên hết tầm rồi hạ gót sâu.'],
    ]],
  ] },
  { group: 'Mông', icon: '🍑', aliases: ['mông', 'glute'], subs: [
    ['Mông lớn', [
      ['Hip thrust', 'Đẩy hông tạ đòn', 'Lưng trên tựa ghế, đẩy hông lên tới thân thẳng, siết mông ở trên.'],
      ['Glute bridge', 'Cầu mông', 'Nằm sàn, gót gần mông, đẩy hông lên, siết mông 1–2 giây.'],
      ['Sumo deadlift', 'Deadlift sumo', 'Chân rộng, mũi chân xoay ngoài, tay cầm trong gối, lưng thẳng.'],
      ['Step up', 'Bước bục', 'Đạp cả bàn chân lên bục, dùng chân trên để đứng lên.'],
      ['Cable kickback', 'Đá chân sau cáp', 'Đá chân thẳng ra sau bằng mông, không ưỡn lưng.'],
    ]],
    ['Mông nhỏ (hông ngoài)', [
      ['Hip abduction machine', 'Máy dạng hông', 'Mở hai chân ra ngoài, giữ 1 giây, về chậm.'],
      ['Monster walk', 'Đi ngang dây kháng lực', 'Dây quanh gối hoặc cổ chân, hơi ngồi xuống, bước ngang giữ dây luôn căng.'],
    ]],
  ] },
  { group: 'Bụng', icon: '🍫', aliases: ['bụng', 'core', 'abs'], subs: [
    ['Bụng trên', [
      ['Crunch', 'Gập bụng', 'Cuộn vai lên bằng bụng, không kéo cổ, thở ra khi lên.'],
      ['Cable crunch', 'Gập bụng cáp', 'Quỳ, giữ dây cạnh đầu, gập bụng kéo khuỷu về đùi.'],
    ]],
    ['Bụng dưới', [
      ['Hanging leg raise', 'Treo xà nâng chân', 'Treo xà, nâng chân bằng bụng, không đung đưa.'],
      ['Reverse crunch', 'Gập bụng ngược', 'Nằm ngửa, cuộn hông và gối về ngực, hạ chậm không chạm sàn.'],
      ['Lying leg raise', 'Nằm nâng chân', 'Lưng dưới ép sàn, nâng chân thẳng lên 90°, hạ chậm.'],
    ]],
    ['Bụng chéo (liên sườn)', [
      ['Russian twist', 'Xoay người kiểu Nga', 'Ngả người ra sau, giữ lưng thẳng, xoay thân sang hai bên.'],
      ['Bicycle crunch', 'Gập bụng đạp xe', 'Khuỷu chéo chạm gối đối diện, chân đạp như đạp xe.'],
      ['Oblique crunch', 'Gập bụng nghiêng', 'Nằm nghiêng, cuộn vai về phía hông, siết eo.'],
    ]],
    ['Core ổn định', [
      ['Plank', 'Plank giữ thẳng người', 'Khuỷu dưới vai, siết bụng và mông, người thẳng như tấm ván.'],
      ['Ab wheel', 'Lăn bánh xe bụng', 'Siết bụng, lăn ra xa trong tầm giữ được lưng thẳng rồi kéo về.'],
    ]],
  ] },
  { group: 'Cầu lông', icon: '🏸', aliases: ['cầu lông', 'badminton'], subs: [
    ['Bộ chân (footwork)', [
      ['Six-corner footwork', 'Di chuyển 6 góc sân (米字步)', 'Bài kinh điển của cầu lông Trung Quốc: từ giữa sân bước ra 6 góc (2 lưới, 2 giữa, 2 cuối), mỗi lần đều về giữa và bước đệm.'],
      ['Shadow badminton', 'Đánh bóng không cầu', 'Cầm vợt di chuyển và vung đủ động tác như đánh thật, 30–60 giây mỗi hiệp, nghỉ 30 giây.'],
      ['Split step drill', 'Tập bước đệm', 'Nhún nhẹ, hai chân rộng hơn vai đúng lúc "đối thủ" chạm cầu, rồi bật ngay về hướng được gọi.'],
      ['Side shuffle', 'Bước trượt ngang', 'Hạ thấp trọng tâm, trượt ngang nhanh, không bắt chéo chân, giữ vợt trước người.'],
      ['Agility ladder', 'Thang dây nhanh nhẹn', 'Bước nhanh bằng mũi chân qua từng ô thang, mắt nhìn thẳng, tay đánh theo nhịp.'],
      ['Multi-shuttle drill', 'Tập đa cầu (多球)', 'Người phát cầu liên tục 15–20 quả vào các góc, người tập di chuyển và đánh hết, nghỉ rồi lặp lại.'],
    ]],
    ['Sức bật & tốc độ', [
      ['Jump squat', 'Bật nhảy squat', 'Ngồi xuống nửa chừng rồi bật thẳng lên, tiếp đất mềm bằng mũi chân và gối hơi cong.'],
      ['Split jump', 'Bật đổi chân', 'Từ tư thế chùng chân, bật lên đổi chân trên không, tiếp đất lại thành chùng chân.'],
      ['Lateral bound', 'Bật nhảy ngang 1 chân', 'Bật sang ngang bằng 1 chân, tiếp đất chân kia và giữ thăng bằng 1 giây.'],
      ['Lateral cone hops', 'Bật ngang qua chóp', 'Hai chân chụm, bật qua lại chóp hoặc vạch kẻ thật nhanh, chạm đất ngắn.'],
      ['Hurdle hops', 'Bật qua rào', 'Bật liên tục qua hàng rào thấp, dùng tay đánh đà, chạm đất ngắn.'],
      ['Tuck jump', 'Bật nhảy co gối', 'Bật cao, kéo gối lên sát ngực, tiếp đất mềm rồi bật tiếp.'],
      ['Box jump', 'Bật lên bục', 'Đánh tay bật lên bục bằng hai chân, đứng thẳng trên bục rồi bước xuống.'],
      ['Double-under jump rope', 'Nhảy dây quay kép (双摇)', 'Bài nhảy dây phổ biến ở Trung Quốc: bật cao hơn bình thường, quay dây 2 vòng mỗi lần nhảy bằng cổ tay.'],
    ]],
    ['Cổ tay & cẳng tay', [
      ['Reverse wrist curl', 'Cuốn cổ tay úp', 'Cẳng tay tì ghế, úp lòng bàn tay, nâng hạ cổ tay chậm, tạ nhẹ.'],
      ['Wrist roller', 'Cuộn dây tạ cổ tay', 'Tay duỗi trước ngực, xoay cổ tay cuộn dây tạ lên rồi thả xuống chậm.'],
      ['Heavy racket swing', 'Vung vợt nặng (có bao)', 'Vung vợt có bao hoặc vợt tập nặng theo đường đập cầu, 20–30 lần, cổ tay thả lỏng rồi bung lực.'],
    ]],
    ['Vai (phòng chấn thương)', [
      ['Band external rotation', 'Xoay ngoài vai dây kháng lực', 'Khuỷu kẹp sát hông 90°, xoay cẳng tay ra ngoài chống dây, về chậm.'],
      ['Band internal rotation', 'Xoay trong vai dây kháng lực', 'Khuỷu kẹp sát hông 90°, kéo cẳng tay vào bụng chống dây, về chậm.'],
      ['Band pull-apart', 'Kéo giãn dây kháng lực', 'Tay thẳng trước ngực, kéo giãn dây sang hai bên, siết bả vai.'],
    ]],
    ['Sức mạnh đập cầu', [
      ['Medicine ball slam', 'Đập bóng tạ 1 tay', 'Đưa bóng qua đầu như đập cầu, xoay thân và đập mạnh xuống sàn.'],
      ['Medicine ball twist', 'Xoay người với bóng tạ', 'Cầm bóng trước ngực, xoay thân hết tầm sang hai bên, hông đứng vững.'],
    ]],
    ['Chân & thăng bằng', [
      ['Single-leg deadlift', 'Deadlift 1 chân', 'Đứng 1 chân, gập hông, chân kia duỗi ra sau, lưng thẳng, giữ thăng bằng.'],
      ['Lateral lunge', 'Chùng chân ngang', 'Bước rộng sang ngang, ngồi xuống chân bước, chân kia duỗi thẳng, đẩy về.'],
    ]],
  ] },
  { group: 'Cardio', icon: '🏃', aliases: ['cardio', 'chạy', 'đốt mỡ'], subs: [
    ['Máy cardio', [
      ['Treadmill', 'Chạy bộ máy', 'Khởi động 5 phút đi bộ, giữ nhịp thở đều, không bám tay vịn.'],
      ['Stationary bike', 'Đạp xe tại chỗ', 'Chỉnh yên để gối hơi cong khi chân duỗi, đạp đều nhịp.'],
      ['Elliptical', 'Máy chạy elip', 'Đứng thẳng, dùng cả tay và chân, nhẹ cho khớp gối.'],
      ['Rowing machine', 'Máy chèo thuyền', 'Đạp chân trước, rồi ngả lưng, cuối cùng kéo tay. Về theo thứ tự ngược lại.'],
    ]],
    ['Không cần máy (HIIT)', [
      ['Jump rope', 'Nhảy dây', 'Nhảy thấp bằng mũi chân, quay dây bằng cổ tay.'],
      ['Burpee', 'Bật nhảy burpee', 'Ngồi xuống, bật chân ra sau thành chống đẩy, thu chân lại rồi bật nhảy lên.'],
      ['Mountain climber', 'Leo núi tại chỗ', 'Tư thế chống đẩy, kéo gối luân phiên về ngực thật nhanh, hông không nhô cao.'],
      ['Star jump', 'Bật nhảy dang tay chân', 'Ngồi thấp rồi bật lên, dang tay chân hình ngôi sao, tiếp đất nhẹ.'],
    ]],
  ] },
];

// Stars 1-5: [joint-friendly, easy to learn, effective]. General guidance for healthy adults, not medical advice.
export const RATING_LABELS = [['bone', 'Thân thiện khớp'], ['target', 'Dễ tập'], ['flame', 'Hiệu quả']]; // [icon name, label]
export const RATINGS = {
  'Incline bench press': [3, 3, 5], 'Incline dumbbell press': [4, 4, 5], 'Incline dumbbell fly': [3, 3, 3], 'Low cable fly': [5, 4, 3],
  'Bench press': [3, 3, 5], 'Dumbbell bench press': [4, 4, 5], 'Dumbbell fly': [3, 3, 3], 'Chest press machine': [5, 5, 4], 'Pec deck': [4, 5, 3], 'Push up': [4, 5, 4],
  'Decline bench press': [3, 3, 4], 'Decline dumbbell press': [4, 3, 4], 'Decline dumbbell fly': [3, 3, 3], 'Dips': [2, 2, 5], 'Cable crossover': [5, 4, 3],
  'Pull up': [3, 2, 5], 'Lat pulldown': [4, 5, 4], 'Close-grip pulldown': [4, 5, 4], 'Straight-arm pulldown': [5, 4, 3], 'Dumbbell pullover': [3, 3, 3],
  'Barbell row': [3, 2, 5], 'Dumbbell row': [4, 4, 4], 'Seated cable row': [5, 5, 4], 'T-bar row': [3, 3, 4],
  'Deadlift': [2, 1, 5], 'Back extension': [4, 4, 3], 'Good morning': [2, 2, 3],
  'Overhead press': [3, 2, 5], 'Dumbbell shoulder press': [3, 4, 4], 'Arnold press': [3, 3, 4], 'Front raise': [4, 5, 2],
  'Lateral raise': [4, 4, 4], 'Cable lateral raise': [5, 4, 4], 'Upright row': [2, 4, 3],
  'Rear delt fly': [4, 4, 3], 'Reverse pec deck': [5, 5, 4], 'Face pull': [5, 4, 4], 'Shrug': [4, 5, 3], 'Dumbbell shrug': [4, 5, 3],
  'Barbell curl': [3, 5, 4], 'Dumbbell curl': [4, 5, 4], 'Cable curl': [5, 5, 3], 'Incline dumbbell curl': [3, 4, 4], 'Hammer curl': [5, 5, 4],
  'Preacher curl': [3, 4, 4], 'Concentration curl': [4, 5, 3], 'Reverse curl': [3, 4, 3], 'Wrist curl': [3, 5, 2],
  'Overhead triceps extension': [3, 4, 4], 'Skull crusher': [2, 3, 4], 'Triceps pushdown': [5, 5, 3], 'Rope pushdown': [5, 5, 4], 'Triceps kickback': [4, 4, 2],
  'Close-grip bench press': [3, 3, 5], 'Triceps dips': [2, 2, 5], 'Bench dips': [2, 4, 3],
  'Squat': [3, 2, 5], 'Front squat': [3, 2, 5], 'Leg press': [4, 5, 4], 'Hack squat': [3, 4, 4], 'Leg extension': [2, 5, 3],
  'Romanian deadlift': [3, 3, 5], 'Leg curl': [4, 5, 3], 'Seated leg curl': [4, 5, 3], 'Lunge': [3, 3, 4], 'Bulgarian split squat': [3, 2, 5],
  'Hip adduction machine': [5, 5, 2], 'Calf raise': [5, 5, 3], 'Seated calf raise': [5, 5, 3],
  'Hip thrust': [4, 3, 5], 'Glute bridge': [5, 5, 3], 'Sumo deadlift': [3, 2, 4], 'Step up': [4, 4, 4], 'Cable kickback': [5, 4, 3],
  'Hip abduction machine': [5, 5, 3], 'Monster walk': [5, 4, 2],
  'Crunch': [4, 5, 2], 'Cable crunch': [4, 4, 4], 'Hanging leg raise': [3, 2, 5], 'Reverse crunch': [4, 4, 3], 'Lying leg raise': [3, 4, 3],
  'Russian twist': [3, 4, 2], 'Bicycle crunch': [4, 4, 3], 'Oblique crunch': [4, 5, 2], 'Plank': [5, 5, 3], 'Ab wheel': [2, 2, 5],
  'Treadmill': [3, 5, 4], 'Stationary bike': [5, 5, 4], 'Elliptical': [5, 5, 4], 'Rowing machine': [4, 3, 5],
  'Jump rope': [2, 3, 4], 'Burpee': [2, 3, 5], 'Mountain climber': [3, 4, 4], 'Star jump': [2, 4, 3],
  'Six-corner footwork': [4, 3, 5], 'Shadow badminton': [5, 4, 4], 'Split step drill': [4, 4, 4], 'Side shuffle': [4, 5, 3], 'Agility ladder': [4, 4, 4], 'Multi-shuttle drill': [3, 3, 5],
  'Jump squat': [3, 4, 5], 'Split jump': [2, 3, 5], 'Lateral bound': [3, 3, 5], 'Lateral cone hops': [3, 4, 4], 'Hurdle hops': [2, 3, 4], 'Tuck jump': [2, 3, 4], 'Box jump': [3, 3, 5], 'Double-under jump rope': [2, 2, 5],
  'Reverse wrist curl': [3, 5, 3], 'Wrist roller': [3, 4, 4], 'Heavy racket swing': [3, 4, 4],
  'Band external rotation': [5, 5, 4], 'Band internal rotation': [5, 5, 3], 'Band pull-apart': [5, 5, 3],
  'Medicine ball slam': [3, 4, 4], 'Medicine ball twist': [4, 4, 3], 'Single-leg deadlift': [4, 3, 4], 'Lateral lunge': [3, 4, 4],
};

// Not in free-exercise-db: illustrated instead (ex/<slug>-0.svg / -1.svg, drawn by tools/gen-art.mjs)
export const SVG_ART = new Set(['Burpee', 'Six-corner footwork', 'Shadow badminton', 'Split step drill', 'Agility ladder', 'Multi-shuttle drill', 'Heavy racket swing', 'Lateral lunge']);
export const photoSrc = (name, frame) => `ex/${photoSlug(name)}-${frame}.${SVG_ART.has(name) ? 'svg' : 'jpg'}`;
export const photoSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Flat list of a group's exercises, each tagged with its sub-area
export const groupItems = g => g.subs.flatMap(([sub, items]) => items.map(i => [...i, sub]));

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

// Chương II «Tây Phù Liệt» — chapter data (format: src/story/chapters.js header): metadata, speakers, the battle script
// (BEATS), the prologue cards over the ink map of the Red River delta (PL_MAP), the epilogues, and the Tử Thủ trial
// fought on the same field (TRIAL, listed by ./trials.js). Text: .zh = Vietnamese, .en = English; seals and prologue
// cols stay Hán.
// History (Toàn thư / Cương mục; dates approximate): after Nam Tấn Vương Ngô Xương Văn fell in 965 the land split among
// twelve warlords. Nguyễn Siêu (阮超), styling himself Nguyễn Hữu Công, held Tây Phù Liệt (today Thanh Trì, Hà Nội) on
// the Red River. Đinh Bộ Lĩnh — adopted son and heir of Trần Lãm of Bố Hải Khẩu — marched on him; Nguyễn Siêu left his
// fort and crossed the river to raise more troops, and fell at the river crossing (accounts differ on the details: the
// script keeps it to "caught and killed at the crossing"). The battering ram, the officers (titles, no invented names)
// and the dialogue are the game's.
// Played as Đinh Bộ Lĩnh (ally: his son Đinh Liễn), Lê Hoàn (ally: Đinh Liễn, whom he served) or Đinh Liễn (ally: Lê
// Hoàn). Đinh Bộ Lĩnh speaks as the commander through his CHARS id, so as the hero he says those lines himself.
// Map (world/maps/tayphuliet.js): gates 'dike' (barricade), 'fortGate' / 'riverGate' (doors) — all shut at the start;
// sets 'ram' / 'burn'; anchors dike, outL, outR, gate, hall, rgate, ben, shoal, boats (zones 'landing' / 'ford' take fractions).
const NUM = { zh: 'Chương II', en: 'CHAPTER II' };
export const CH = {
  id: 'tayphuliet', num: NUM, title: { zh: 'Tây Phù Liệt', en: 'Tây Phù Liệt' },
  seal: '西扶烈', era: { zh: 'Khoảng năm 966', en: 'c. 966 AD' }, map: 'tayphuliet',
  heroes: ['dinhbolinh', 'lehoan', 'dinhlien'],
  ally: { dinhbolinh: 'dinhlien', lehoan: 'dinhlien', dinhlien: 'lehoan' },
  army: { foe: 'nguyen', ally: 'dinh' },
  // the Đinh van drawn up either side of the camp lane, holding rank until the hero marches past
  van: [{ x: -5, z: -164, n: 10, cols: 5, hold: true }, { x: 5, z: -164, n: 10, cols: 5, hold: true }],
  hq: [-29, 86],                                   // Nguyễn Siêu's hall inside the fort
  rank: { kos: [500, 1000, 1700], time: [540, 720, 900] },
};

export const SPK = {
  sieu: { name: { zh: 'Nguyễn Siêu', en: 'Nguyễn Siêu' }, seal: '超', side: 'wei', char: 'nguyensieu' },
  elder: { name: { zh: 'Cụ trưởng xóm', en: 'Hamlet Elder' }, seal: '老', side: 'shu' },
  dinhsoldier: { name: { zh: 'Quân Đinh', en: 'Đinh Soldier' }, seal: '丁', side: 'shu' },
  soldier: { name: { zh: 'Lính Nguyễn', en: 'Nguyễn Soldier' }, seal: '兵', side: 'wei' },
  ta: { name: { zh: 'Tả hiệu úy', en: 'Left Commander' }, seal: '左', side: 'wei' },
  huu: { name: { zh: 'Hữu hiệu úy', en: 'Right Commander' }, seal: '右', side: 'wei' },
  mon: { name: { zh: 'Tướng giữ cổng', en: 'Gate Warden' }, seal: '門', side: 'wei' },
  thanve: { name: { zh: 'Thân vệ đô úy', en: 'Guard Captain' }, seal: '衛', side: 'wei' },
  thuy: { name: { zh: 'Thủy quân đô úy', en: 'River Captain' }, seal: '水', side: 'wei' },
};

// officers (crowd.spawnOfficer): titles, not invented names; looks in the Nguyễn indigo (armies.js offLook keys)
const SIEU_HP = 2600;                            // the boss actor (NPC kit 'nguyensieu'), × game.diff.officerHp
export const OFF = {
  ta: { name: { zh: 'Tả hiệu úy', en: 'LEFT COMMANDER' }, hp: 650, look: { helm: 'cap', armor: 0x22283a, trim: 0xa8b0bc, cape: 0x1c2e62 } },
  huu: { name: { zh: 'Hữu hiệu úy', en: 'RIGHT COMMANDER' }, hp: 650, look: { helm: 'horn', armor: 0x22283a, trim: 0xa8b0bc, cape: 0x24408c, plume: 0x2e6ad8 } },
  mon: { name: { zh: 'Tướng giữ cổng', en: 'GATE WARDEN' }, hp: 950, look: { helm: 'wing', armor: 0x1a2236, trim: 0xd8c890, cape: 0x101a40, plume: 0xf0f4fa } },
  thanve: { name: { zh: 'Thân vệ đô úy', en: 'GUARD CAPTAIN' }, hp: 1000, look: { helm: 'crest', armor: 0x141a2a, trim: 0xe0e6ee, cape: 0x2a3a7a, plume: 0xe8eef6 } },
  thuy: { name: { zh: 'Thủy quân đô úy', en: 'RIVER CAPTAIN' }, hp: 1100, look: { helm: 'crest', armor: 0x1a2236, trim: 0xe0e6ee, cape: 0x24408c, plume: 0xf0f4fa } },
  long: { name: { zh: 'Đội trưởng thuyền rồng', en: 'DRAGON-BOAT CAPTAIN' }, hp: 520, look: { helm: 'horn', armor: 0x26303e, trim: 0xc8a050, cape: 0x16284e, plume: 0x2e6ad8 } },
};

const BL = 'dinhbolinh';
const NAG = { who: BL, zh: 'Chớ tham công mà đi một mình! Dẹp sạch quân trước mặt rồi hãy tiến.', en: 'Don\'t chase glory alone! Clear the enemy in front of you, then advance.',
  dinhbolinh: ['Quân trước mặt chưa dẹp xong, chưa vội tiến.', 'The enemy before me isn\'t broken yet. No need to hurry.'] };
const NAG_GATE = { who: BL, zh: 'Cổng thành còn đóng chặt. Đánh bại tướng giữ cổng trước đã!', en: 'The gate is still barred. Defeat the gate warden first!',
  dinhbolinh: ['Cổng thành còn đóng. Phải hạ tên tướng giữ cổng trước.', 'The gate is still shut. The warden must fall first.'] };
const NAG_FORT = { who: BL, zh: 'Cửa bến còn khóa. Hạ đám thân vệ trước dinh đã!', en: 'The river gate is still locked. Break the guard before the hall first!',
  dinhbolinh: ['Cửa bến còn khóa. Hạ đám thân vệ trước dinh đã.', 'The river gate is locked. The guard before the hall comes first.'] };
const RAM = ['gate', 0, -6];                      // the battering ram before the fort gate

// Pacing (default difficulty): a bot that attacks nonstop and never dodges clears in ≈ 6-7 min (hamlet 40 s · the two
// outposts 1.5 min · gate warden + ram 1.5 min · the fort and the hall guard 1.5 min · the pursuit 30 s · the duel 1.5
// min); a human reading the dialogue lands at ≈ 9-12 min. Officers only come forward after the hero has fought a while
// (kos / wait) or reached their post. The pursuit: Nguyễn Siêu walks from the river gate to his boats (≈ 27 s); the
// boats cast off when the 75 s timer runs out — a blow that wounds him (or reaching him at the boats) stops the flight.
export const BEATS = [
  // ---- the Đinh camp → the bamboo hamlet
  {
    when: { wait: 30 },
    obj: { zh: 'Vượt xóm lũy tre, tiến ra đồng', en: 'Push through the bamboo hamlet to the paddies', go: ['hamlet', 0, 0.9] },
    squads: [{ at: ['hamlet', -0.3, -0.35], n: 16 }, { at: ['hamlet', 0.35, 0.05], n: 18 }, { at: ['hamlet', -0.2, 0.6], n: 18 }, { at: ['paddies', 0, -0.6], n: 20 }],
    limit: { z: ['dike', 0, -7], nag: NAG },
    morale: 0,
    say: [
      { who: BL, zh: 'Nguyễn Siêu cậy thành đất, lưng tựa sông Cái, tự xưng Hữu Công. Hôm nay ta phá thành ấy!',
        en: 'Nguyễn Siêu trusts his earthen walls and the river at his back, and calls himself Lord Hữu Công. Today we break that fort!' },
      { who: 'hero', lehoan: ['Lê Hoàn xin đi tiên phong! Trước khi mặt trời lặn, thành đất kia phải mở cổng.', 'Let me lead the van! Before the sun goes down, that earthen fort will open its gate.'],
        dinhlien: ['Thưa cha, con xin đi trước. Cha cứ nổi trống mà tiến!', 'Father, let me go first. Beat the drums and follow!'] },
      { who: 'ally', dinhbolinh: ['Cha cứ yên lòng, Liễn này theo sát bên cha.', 'Rest easy, Father. I will be right at your side.'],
        lehoan: ['Lê tướng quân, ta giữ cánh sau, ngươi cứ việc xông lên!', 'General Lê, I will hold the rear. Charge as you please!'],
        dinhlien: ['Công tử cứ tiến, Lê Hoàn theo ngay phía sau!', 'Go on, my young lord. Lê Hoàn is right behind you!'] },
    ],
  },
  {
    when: [{ zone: 'hamlet' }, { kos: 30 }],
    waves: true,
    say: [
      { who: 'soldier', zh: 'Quân Đinh đến rồi! Giữ lấy xóm, đừng cho chúng qua lũy tre!', en: 'The Đinh are here! Hold the hamlet — don\'t let them past the bamboo!' },
      { who: 'elder', zh: 'Quân Hữu Công bắt dân xóm đắp lũy, vét thóc đem vào thành… xin các tướng quân cứu lấy dân!',
        en: 'Lord Hữu Công\'s men made us dig his walls and carried our rice into the fort... save us, generals!' },
      { who: 'hero', dinhbolinh: ['Các cụ cứ yên tâm. Quân ta đến là để bà con lại được cày cấy yên ổn.', 'Take heart, elders. We have come so you can plough your fields in peace again.'],
        lehoan: ['Cụ ạ, xin cho bà con đóng cửa mà ngồi. Việc ngoài này để quân Đinh lo.', 'Grandfather, tell everyone to bar their doors. Leave what happens out here to the Đinh army.'],
        dinhlien: ['Bà con đừng sợ! Quân họ Đinh không động đến một hạt thóc của dân.', 'Don\'t be afraid! The Đinh army will not touch a single grain of yours.'] },
    ],
  },
  // ---- the paddies: the two outposts on the dike line
  {
    when: [{ zone: 'paddies' }, { kos: 90, wait: 40 * 60 }],
    banner: { html: '<em>Tuyến đê</em> — hai đồn chặn đường vào thành', en: 'The dike line: two outposts bar the way to the fort', dur: 170 },
    officers: { ta: { at: ['outL', 0, -2], engaged: true } },
    squads: [{ at: ['outL', 8, -10], n: 18 }, { at: ['outL', -8, -14], n: 16 }, { at: ['paddies', 0.1, 0.1], n: 20 }],
    obj: { zh: 'Phá đồn tả: đánh bại Tả hiệu úy', en: 'Break the left outpost: defeat the Left Commander', go: 'ta' },
    say: [
      { who: BL, zh: 'Hai đồn trên đê giữ đường vào thành. Phá đồn tả trước!', en: 'The two outposts on the dike guard the road to the fort. Break the left one first!' },
      { who: 'ta', zh: 'Đê này là của Hữu Công! Lũ chăn trâu Hoa Lư, về mà chăn trâu đi!', en: 'This dike belongs to Lord Hữu Công! Go home and mind your buffalo, herd-boys of Hoa Lư!' },
    ],
  },
  {
    when: { down: 'ta' },
    banner: { html: '<em>Đồn tả</em> đã vỡ!', en: 'The left outpost has fallen!', dur: 150 },
    heal: 0.2, morale: 0.08, hush: true,
    officers: { huu: { at: ['outR', 0, -2], engaged: true } },
    squads: [{ at: ['outR', -8, -10], n: 18 }, { at: ['outR', 8, -14], n: 16 }],
    obj: { zh: 'Phá đồn hữu: đánh bại Hữu hiệu úy', en: 'Break the right outpost: defeat the Right Commander', go: 'huu' },
    say: [{ who: 'huu', zh: 'Đồn tả mất rồi ư? Không sao, còn đồn hữu này! Bắn!', en: 'The left outpost is gone? No matter, the right still stands! Loose!' }],
  },
  {
    when: { down: 'huu' },
    gate: 'dike', heal: 0.3, morale: 0.12, retire: true, hush: true, waves: false,
    banner: { html: '<em>Tuyến đê</em> đã phá — cửa đê mở!', en: 'The dike line is broken — the dike gate is open!', dur: 180 },
    obj: { zh: 'Tiến đến cổng thành Tây Phù Liệt', en: 'Advance on the gate of Tây Phù Liệt', go: ['gate', 0, -12] },
    limit: { z: ['gate', 0, -6], nag: NAG_GATE },
    squads: [{ at: ['approach', -0.35, -0.2], n: 20 }, { at: ['approach', 0.4, 0.05], n: 20 }, { at: ['gate', 0, -16], n: 18 }],
    say: [
      { who: 'ally', dinhbolinh: ['Cha ơi, cửa đê đã mở! Thành đất ngay trước mặt rồi!', 'Father, the dike gate is open! The fort is right ahead!'],
        lehoan: ['Đánh hay lắm, Lê tướng quân! Giờ đến lượt cổng thành.', 'Well fought, General Lê! Now for the fort gate.'],
        dinhlien: ['Công tử, cửa đê đã mở! Tiến thẳng tới cổng thành!', 'My lord, the dike gate is open! Straight on to the fort!'] },
    ],
  },
  // ---- the fort gate: the warden, then the battering ram
  {
    when: { at: ['gate', 0, -40] },
    waves: true,
    banner: { html: 'Cung thủ trên <em>thành đất</em> bắn xuống!', en: 'Archers on the earthen rampart open fire!', dur: 150 },
    officers: { mon: { at: ['gate', 0, -9] } },
    obj: { zh: 'Đánh bại Tướng giữ cổng', en: 'Defeat the Gate Warden', go: 'mon' },
    say: [
      { who: 'mon', zh: 'Cổng thành Tây Phù Liệt chưa từng mở cho giặc! Muốn vào, hãy bước qua xác ta!', en: 'The gate of Tây Phù Liệt has never opened to an enemy! Come in over my dead body!' },
      { who: 'hero', dinhbolinh: ['Thành đất thì cũng là đất. Đất thì phải về tay người cày!', 'An earthen wall is still earth — and earth belongs to those who till it!'],
        lehoan: ['Được! Ta bước qua đây!', 'Gladly! Here I come!'],
        dinhlien: ['Tên ta bay trước, người ta đến sau!', 'My arrows first, then me!'] },
    ],
  },
  {
    when: { down: 'mon' },
    set: 'ram', heal: 0.2, morale: 0.1, hush: true,
    banner: { html: 'Đẩy <em>xe phá thành</em> lên!', en: 'Bring up the battering ram!', dur: 160 },
    defend: { key: 'ram', at: RAM, r: 5, hp: 1500, name: { zh: 'Xe phá thành', en: 'Battering Ram' } },
    fail: { when: { hp: ['ram', 0.01] }, zh: 'Xe phá thành đã bị phá hủy……', en: 'The battering ram has been destroyed...' },
    obj: { zh: 'Giữ xe phá thành cho đến khi cổng vỡ', en: 'Guard the battering ram until the gate gives', go: RAM, timer: 35 },
    squads: [{ at: ['gate', -22, -12], n: 16, charge: true }, { at: ['gate', 22, -12], n: 16, charge: true }, { at: ['gate', 0, -30], n: 18, charge: true }],
    say: [
      { who: 'dinhsoldier', zh: 'Xe phá thành đến rồi! Một, hai… húc!', en: 'The ram is here! One, two... heave!' },
      { who: 'soldier', zh: 'Chúng phá cổng! Ra chặn chúng lại, mau!', en: 'They\'re breaking the gate! Out and stop them, now!' },
      { who: BL, zh: 'Giữ lấy xe phá thành! Cổng vỡ là thành vỡ!', en: 'Guard the ram! When the gate breaks, the fort breaks!' },
    ],
  },
  {
    when: { timer: true },
    gate: 'fortGate', defend: null, fail: null, heal: 0.3, morale: 0.15, retire: true, hush: true,
    banner: { html: '<em>Cổng thành</em> đã vỡ!', en: 'The fort gate is broken!', dur: 200, big: true },
    obj: { zh: 'Đánh vào dinh Nguyễn Hữu Công', en: 'Storm Lord Hữu Công\'s hall', go: ['hall', 0, 0] },
    limit: { z: ['rgate', 0, -5], nag: NAG_FORT },
    squads: [{ at: ['fort', -0.2, -0.6], n: 20 }, { at: ['fort', 0.4, -0.3], n: 20 }, { at: ['fort', -0.1, 0.1], n: 22 }, { at: ['hall', 8, -10], n: 16 }],
    say: [
      { who: 'ally', dinhbolinh: ['Cổng vỡ rồi! Cha, con theo cha vào thành!', 'The gate is down! Father, I\'m with you!'],
        lehoan: ['Cổng vỡ rồi! Lê Hoàn, ta cùng ngươi vào thành!', 'The gate is down! Lê Hoàn, we go in together!'],
        dinhlien: ['Cổng vỡ rồi! Công tử, Lê Hoàn đi bên cánh hữu!', 'The gate is down! My lord, Lê Hoàn takes the right flank!'] },
    ],
  },
  // the hero's companion takes the field beside him from the breach on
  { hero: ['dinhbolinh', 'lehoan'], actors: { buddy: { kit: 'dinhlien', role: 'ally', at: ['gate', -3, 8] } } },
  { hero: ['dinhlien'], actors: { buddy: { kit: 'lehoan', role: 'ally', at: ['gate', 3, 8] } } },
  // ---- inside the fort: the hall and its guard
  {
    when: { zone: 'fort' },
    waves: true,
    say: [
      { who: 'sieu', zh: 'Đinh Bộ Lĩnh! Ngươi vốn đứa chăn trâu đất Hoa Lư, cũng dám mơ làm chủ thiên hạ sao?', en: 'Đinh Bộ Lĩnh! A buffalo-herd from Hoa Lư, and you dream of ruling the realm?' },
      { who: 'hero', dinhbolinh: ['Chăn trâu thì đã sao? Trâu còn biết kéo cày cho dân ăn, còn ngươi chỉ biết vét thóc của dân!', 'And what of it? A buffalo at least pulls a plough to feed the people. All you do is empty their granaries!'],
        lehoan: ['Nguyễn Siêu, thành của ngươi đã mở. Ra đây mà đánh!', 'Nguyễn Siêu, your fort is open. Come out and fight!'],
        dinhlien: ['Kẻ nào nhục mạ cha ta, hãy nếm tên của Đinh Liễn!', 'Whoever insults my father can taste Đinh Liễn\'s arrows!'] },
    ],
  },
  {
    when: [{ kos: 60 }, { wait: 35 * 60 }, { near: [['hall', 0, 0], 18] }],
    officers: { thanve: { at: ['hall', 5, 0], engaged: true } },
    squads: [{ at: ['hall', 8, -12], n: 18, charge: true }, { at: ['hall', 8, 12], n: 18, charge: true }],
    obj: { zh: 'Đánh bại Thân vệ đô úy trước dinh', en: 'Defeat the Guard Captain before the hall', go: 'thanve' },
    say: [{ who: 'thanve', zh: 'Thân vệ, giữ thềm dinh! Không một tên giặc nào được bước lên!', en: 'Guards, hold the steps! Not one of them sets foot on the hall!' }],
  },
  // ---- the fort falls; Nguyễn Siêu runs for his boats across the shoal ford
  {
    when: { down: 'thanve' },
    set: 'burn', gate: 'riverGate', limit: { z: null }, retire: true, hush: true, heal: 0.3, morale: 0.1, waves: false,
    banner: { html: 'Thành <em>Tây Phù Liệt</em> đã vỡ — Nguyễn Siêu bỏ thành chạy ra bến!', en: 'Tây Phù Liệt has fallen — Nguyễn Siêu flees for the river!', dur: 230, big: true },
    actors: { sieu: { kit: 'nguyensieu', role: 'boss', at: ['rgate', 0, 14], yaw: 0, hp: SIEU_HP } },
    actor: { key: 'sieu', do: 'hold', at: ['boats', 0, 0] },
    officers: { thuy: { at: ['landing', 0.2, 0.2], engaged: true } },
    squads: [{ at: ['landing', -0.3, -0.2], n: 18 }, { at: ['landing', 0.35, 0.3], n: 18 }, { at: ['ford', 0, -0.4], n: 16 }],
    obj: { zh: 'Chặn Nguyễn Siêu trước khi hắn xuống thuyền!', en: 'Stop Nguyễn Siêu before he reaches his boats!', go: 'sieu', timer: 75 },
    fail: { when: { timer: true }, zh: 'Nguyễn Siêu đã xuống thuyền vượt sông……', en: 'Nguyễn Siêu has reached his boats and crossed the river...' },
    say: [
      { who: 'sieu', zh: 'Mất thành thì còn sông! Sang sông gọi thêm quân, ta sẽ trở lại!', en: 'I may lose the fort, but I still have the river! I\'ll raise more men across it and come back!' },
      { who: BL, zh: 'Hắn chạy ra bãi cạn! Chặn hắn lại, đừng để hắn xuống thuyền!', en: 'He\'s making for the shoal ford! Cut him off — don\'t let him reach the boats!' },
      { who: 'thuy', zh: 'Thủy quân, giữ bến! Đưa Hữu Công sang sông!', en: 'River troops, hold the landing! Get Lord Hữu Công across!' },
    ],
  },
  {
    when: [{ below: ['sieu', 0.9] }, { near: [['boats', 0, 0], 12] }],
    actor: { key: 'sieu', do: 'join' }, fail: null, morale: 0.1, waves: true,
    banner: { html: 'Nguyễn Siêu bị chặn lại nơi <em>bến sông</em>!', en: 'Nguyễn Siêu is cut off at the crossing!', dur: 200, big: true },
    obj: { zh: 'Đánh bại Nguyễn Siêu', en: 'Defeat Nguyễn Siêu', go: 'sieu' },
    squads: [{ at: ['shoal', -9, -16], n: 16, charge: true }, { at: ['shoal', 9, -16], n: 16, charge: true }],
    say: [
      { who: 'sieu', dinhbolinh: ['Đinh Bộ Lĩnh… được! Hôm nay một trong hai ta phải nằm lại bên sông này!', 'Đinh Bộ Lĩnh... so be it! One of us stays by this river today!'],
        lehoan: ['Một tên tướng trẻ mà dám cản đường Nguyễn Hữu Công? Tránh ra!', 'A boy general dares bar the way of Nguyễn Hữu Công? Stand aside!'],
        dinhlien: ['Con thằng chăn trâu đấy à? Nghe nói năm xưa ngươi làm con tin cho nhà Ngô. Hôm nay ngươi không về được nữa!', 'The herd-boy\'s son, is it? They say you were the Ngô\'s hostage once. You won\'t go home this time!'] },
      { who: 'hero', dinhbolinh: ['Đất này không thể chia làm mười hai mảnh nữa. Cầm giáo lên mà đánh!', 'This land will not stay cut in twelve pieces. Raise your spear and fight!'],
        lehoan: ['Muốn qua sông thì bước qua Lê Hoàn này trước đã!', 'If you want to cross this river, you\'ll have to get past Lê Hoàn first!'],
        dinhlien: ['Đinh Liễn hôm nay không làm con tin của ai cả. Đỡ tên!', 'Đinh Liễn is no one\'s hostage today. Mind my arrows!'] },
    ],
  },
  {
    when: { below: ['sieu', 0.5] },
    skip: { down: 'sieu' },
    banner: { html: '<em>Thuyền rồng</em> cập bãi — thủy quân Nguyễn Siêu đổ bộ!', en: 'Dragon boats run aground — Nguyễn Siêu\'s river troops come ashore!', dur: 170 },
    morale: -0.1,
    squads: [{ at: ['shoal', -9, 24], n: 16, charge: true }, { at: ['shoal', 9, 26], n: 16, charge: true }, { at: ['shoal', 0, 34], n: 16, charge: true }],
    officers: { long1: { at: ['shoal', -8, 28], engaged: true, like: 'long' }, long2: { at: ['shoal', 8, 28], engaged: true, like: 'long' } },
    say: [
      { who: 'sieu', zh: 'Thủy quân đâu! Lên bờ, giết sạch bọn chúng!', en: 'River troops, to me! Ashore, and cut them all down!' },
      { who: 'ally', dinhbolinh: ['Cha cứ đánh Nguyễn Siêu, bọn thủy quân để con chặn!', 'Fight Nguyễn Siêu, Father. I\'ll hold off his river troops!'],
        lehoan: ['Lê tướng quân, thủy quân để ta lo, ngươi lấy đầu Nguyễn Siêu!', 'General Lê, leave the river troops to me. You take Nguyễn Siêu!'],
        dinhlien: ['Công tử, quân thuyền để Lê Hoàn chặn! Hạ Nguyễn Siêu đi!', 'My lord, Lê Hoàn will stop the boatmen! Bring down Nguyễn Siêu!'] },
    ],
  },
  {
    when: { down: 'sieu' },
    win: true, waves: false, morale: 1,
    banner: { html: '<em>Nguyễn Siêu</em> tử trận nơi bến sông — Tây Phù Liệt đã bình định!', en: 'Nguyễn Siêu falls at the crossing — Tây Phù Liệt is ours!', dur: 260, big: true },
    say: [{ who: 'hero', dinhbolinh: ['Một sứ quân nữa đã ngã. Mười hai mối, rồi sẽ về một mối!', 'Another warlord falls. Twelve threads, and they will all be tied into one!'],
      lehoan: ['Nguyễn Siêu đã bị Lê Hoàn chặn lại nơi bãi cạn!', 'Lê Hoàn has cut down Nguyễn Siêu at the shoal ford!'],
      dinhlien: ['Thưa cha, Tây Phù Liệt đã về tay họ Đinh!', 'Father, Tây Phù Liệt belongs to the house of Đinh!'] }],
  },
];

// ---- prologue ink map of the Red River delta (viewBox 1600×900): the river from the north-west to the sea, the
// karsts of Hoa Lư, Tản Viên up-river, Tây Phù Liệt on the river, Bố Hải Khẩu by the coast; Đinh / Nguyễn arrows
const peaks = (list, h, w) => list.map(([x, y, k = 1]) =>
  `<path d="M${x - w * k} ${y} Q${x - w * k * 0.35} ${y - h * k * 0.55} ${x} ${y - h * k} Q${x + w * k * 0.3} ${y - h * k * 0.5} ${x + w * k} ${y}Z"/>`).join('');
const karsts = (list) => list.map(([x, y, h, w]) => `<path d="M${x - w} ${y} L${x - w * 0.8} ${y - h * 0.8} Q${x - w * 0.5} ${y - h * 1.05} ${x} ${y - h} Q${x + w * 0.6} ${y - h * 1.02} ${x + w * 0.75} ${y - h * 0.75} L${x + w} ${y}Z"/>`).join('');
const RIVER = 'M40 30 C190 110 330 200 470 250 S700 320 790 360 S960 470 1080 560 S1300 700 1420 820 S1520 880 1560 920';
const BRANCH = 'M790 360 C860 330 960 300 1060 330 S1240 420 1340 520 S1460 640 1560 700';
const COAST = 'M1060 920 C1180 860 1300 840 1390 790 S1520 700 1620 650';
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${peaks([[110, 230, 1.1], [220, 200, 1.35], [330, 235, 1.0], [420, 215, 0.8], [60, 330, 0.9]], 120, 90)}
  </g>
  <g class="pl-mark" data-id="hoalu" fill="url(#pl-mtn)" filter="url(#pl-ink)">${karsts([[420, 760, 90, 26], [470, 740, 120, 30], [520, 770, 80, 22], [565, 745, 105, 26], [610, 772, 70, 20], [380, 790, 60, 20]])}</g>
  <g filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${COAST}" stroke="#46524f" stroke-width="5" opacity=".6"/>
    <path d="M1180 880 q20 -8 40 0 q20 8 40 0 M1320 840 q20 -8 40 0 q20 8 40 0 M1460 760 q20 -8 40 0 q20 8 40 0 M1400 900 q20 -8 40 0 q20 8 40 0" stroke="#6f7c78" stroke-width="3" opacity=".5"/>
  </g>
  <g class="pl-mark" data-id="river" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${RIVER}" stroke="#7a6a4c" stroke-width="34" opacity=".35"/><path d="${RIVER}" stroke="#4e4430" stroke-width="8" opacity=".75"/>
    <path d="${BRANCH}" stroke="#7a6a4c" stroke-width="18" opacity=".3"/><path d="${BRANCH}" stroke="#4e4430" stroke-width="4" opacity=".6"/>
  </g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="river"><text class="sm river" x="905" y="500">富良江</text></g>
    <g class="pl-mark" data-id="tanvien"><text class="sm" x="150" y="270">傘圓山</text></g>
    <g class="pl-mark" data-id="daila"><text class="sm" x="640" y="282">大羅</text></g>
    <g class="pl-mark wei" data-id="dodong"><text class="sm" x="560" y="440">杜洞</text></g>
    <g class="pl-mark" data-id="hoalu"><rect x="482" y="790" width="30" height="30" rx="3"/><text x="530" y="816">華閭</text></g>
    <g class="pl-mark" data-id="bohai"><rect x="1236" y="680" width="34" height="34" rx="3"/><text x="1150" y="760">布海口</text><text class="sm" x="1290" y="706">陳覽</text></g>
    <g class="pl-mark wei" data-id="tayphu"><rect x="746" y="332" width="34" height="34" rx="3"/><text x="610" y="380">西扶烈</text><text class="sm" x="796" y="324">阮超</text></g>
  </g>`,
  arrows: [
    ['dinh1', 'shu', 'M1236 682 C1150 610 1000 520 880 430'],
    ['dinh2', 'shu', 'M520 780 C560 680 640 540 730 420'],
    ['nguyen1', 'wei', 'M786 352 C830 322 880 300 930 292'],
    ['dinh3', 'shu', 'M872 436 C840 410 810 392 784 372'],
  ],
};

// ---- prologue cards (format: chapters.js; `vi` = the Vietnamese prose beside the Hán columns). Card 5 branches on the hero.
export const PROLOGUE = [
  { cols: ['吳昌文既歿', '十二使君並起', '各據一方'], vi: 'Năm 965, Nam Tấn Vương Ngô Xương Văn tử trận. Mười hai sứ quân nổi lên, mỗi người cát cứ một phương.',
    en: 'In 965 Ngô Xương Văn, the last Ngô king, fell in battle. Twelve warlords rose, each holding his own corner of the land.',
    show: ['river', 'tanvien', 'daila', 'dodong'], focus: [800, 450, 1.04] },
  { cols: ['布海口陳覽', '以丁部領為子', '委以兵權'], vi: 'Sứ quân Trần Lãm ở Bố Hải Khẩu nhận Đinh Bộ Lĩnh làm con nuôi, giao cho cầm quân.',
    en: 'Trần Lãm, the warlord of Bố Hải Khẩu, took Đinh Bộ Lĩnh as his son and gave him command of his army.',
    show: ['bohai', 'hoalu'], focus: [1000, 640, 1.18] },
  { cols: ['阮超據西扶烈', '自稱阮右公', '臨江築壘'], vi: 'Nguyễn Siêu chiếm giữ Tây Phù Liệt, tự xưng Nguyễn Hữu Công, đắp lũy đất sát bờ sông Cái.',
    en: 'Nguyễn Siêu held Tây Phù Liệt, called himself Lord Nguyễn Hữu Công, and raised earthen walls on the bank of the Red River.',
    show: ['tayphu'], focus: [760, 360, 1.35] },
  { cols: ['丁部領舉兵', '溯江而上', '直取西扶烈'], vi: 'Đinh Bộ Lĩnh cất quân, ngược sông Cái mà lên, nhắm thẳng Tây Phù Liệt.',
    en: 'Đinh Bộ Lĩnh raised his army and marched up the Red River, straight for Tây Phù Liệt.',
    show: ['dinh1'], focus: [1000, 540, 1.14] },
  { dinhbolinh: { cols: ['昔日蘆花旗', '今為大將纛', '親率前鋒'], vi: 'Tương truyền thuở nhỏ chăn trâu, ông lấy bông lau làm cờ; nay cờ lau đã thành đại kỳ, ông tự mình dẫn tiên phong.',
    en: 'Legend says the herd-boy once led the village children under banners of reed flowers. Now the reed banner is a war standard, and he leads the van himself.' },
  lehoan: { cols: ['少年黎桓', '事丁璉', '請為先鋒'], vi: 'Lê Hoàn tuổi trẻ, theo hầu Đinh Liễn, xin được đi tiên phong.',
    en: 'The young Lê Hoàn, who serves Đinh Liễn, asks to lead the vanguard.' },
  dinhlien: { cols: ['長子丁璉', '隨父出征', '願先登'], vi: 'Trưởng tử Đinh Liễn theo cha xuất chinh, xin được là người đầu tiên trèo lên thành giặc.',
    en: 'Đinh Liễn, the eldest son, marches beside his father and asks to be first onto the enemy walls.' },
  show: ['dinh2'], focus: [640, 560, 1.2] },
  { cols: ['西扶烈城', '背江為險', '舟楫連岸'], vi: 'Thành Tây Phù Liệt lưng tựa sông lớn, thuyền bè neo kín bến: Nguyễn Siêu vẫn để dành đường lui trên mặt nước.',
    en: 'Tây Phù Liệt has the great river at its back and boats moored all along its landing. Nguyễn Siêu has kept the water as his road out.',
    show: ['nguyen1'], focus: [800, 340, 1.4] },
  { cols: ['金鼓動地', '蘆旗蔽野', '一戰定西扶'], vi: 'Trống đồng rền đất, cờ lau rợp đồng. Một trận này định đoạt Tây Phù Liệt.',
    en: 'Bronze drums shake the ground and reed banners cover the fields. One battle will decide Tây Phù Liệt.',
    show: ['dinh3'], focus: [800, 420, 1.08] },
];

// ---- result screen epilogue (win), branched on the hero
export const EPILOGUE = {
  dinhbolinh: {
    zh: ['Nguyễn Siêu ngã xuống nơi bến sông; quân Tây Phù Liệt kẻ hàng, người tan chạy.',
      'Đinh Bộ Lĩnh cho dập lửa trong thành, trả thóc cho dân các xóm, rồi quay cờ về phía Đỗ Động Giang.'],
    en: ['Nguyễn Siêu fell at the river crossing; his soldiers surrendered or scattered.',
      'Đinh Bộ Lĩnh had the fires in the fort put out, returned the rice to the hamlets around it, and turned his banners toward Đỗ Động Giang.'],
  },
  lehoan: {
    zh: ['Lê Hoàn chặn đứng Nguyễn Siêu giữa bãi cạn; tên tuổi người tướng trẻ vang khắp quân Đinh.',
      'Sử chép: Đinh Bộ Lĩnh thấy Lê Hoàn có trí dũng, cho coi hai nghìn quân.'],
    en: ['Lê Hoàn stopped Nguyễn Siêu on the shoal ford, and the young general\'s name ran through the whole Đinh army.',
      'The chronicles say Đinh Bộ Lĩnh, seeing his wisdom and courage, gave Lê Hoàn two thousand men to command.'],
  },
  dinhlien: {
    zh: ['Đinh Liễn đứng trên bến nhìn thuyền giặc trôi tan tác, nhớ lại những ngày làm con tin trong tay nhà Ngô.',
      'Hai cha con dựng cờ họ Đinh trên thành Tây Phù Liệt. Mười hai sứ quân, nay chẳng còn được mấy người.'],
    en: ['Standing on the landing, Đinh Liễn watched the enemy boats drift apart and remembered his days as a hostage of the Ngô.',
      'Father and son raised the Đinh banner over Tây Phù Liệt. Of the twelve warlords, few now remained.'],
  },
};

// ================================================================ Tử Thủ (死守) — the defence trial on this field
// The landing at the head of the shoal ford for four minutes, Nguyễn Siêu's river army coming across in ever heavier
// pushes (after chapter II: the fort burns behind the hero). Modelled on the engine's 死守 (src/story/trials.js `hold`):
// a defend point, the stage bounds of the landing, officers every 40-60 s, the warlord himself at the end; the clock is
// fixed, so KOs and damage decide the rank. Unlocked by clearing this chapter (core/progress.js 'tuthu').
const BEN = ['ben', 0, 4];                     // the ferry landing at the ford head (z ≈ 142)
export const TRIAL = {
  CH: {
    id: 'tuthu', num: { zh: 'Thử thách', en: 'TRIAL' }, title: { zh: 'Tử Thủ', en: 'Hold the Crossing' }, seal: '死守', map: 'tayphuliet',
    army: { foe: 'nguyen', ally: 'dinh' }, best: 'kos',
    rule: { zh: 'Giữ bến sông Cái bốn phút, không để mất bến; đánh tan càng nhiều càng cao hạng', en: 'Hold the Red River landing for 4:00. The more you cut down, the higher the rank.' },
    start: { x: 0, z: 134, yaw: 0, tilt: -0.06 },
    van: [{ x: -6, z: 124, n: 10, cols: 5, hold: true }, { x: 6, z: 124, n: 10, cols: 5, hold: true }],
    rank: { kos: [1200, 1700, 2400], time: [999, 999, 999], s: { kos: 2200, dmg: 0.35 } },   // fixed clock: KOs and damage decide
  },
  SPK, OFF,
  BEATS: [
    {
      when: { wait: 30 }, waves: true, morale: -0.1,
      defend: { key: 'ben', at: BEN, r: 5, hp: 4000, name: { zh: 'Bến đò', en: 'Ferry Landing' } },
      fail: { when: { hp: ['ben', 0.01] }, zh: 'Bến sông đã mất……', en: 'The landing has fallen...' },
      obj: { zh: 'Tử thủ bến sông Cái', en: 'Hold the Red River landing', go: BEN, timer: 240 },
      squads: [{ at: ['ford', 0, 0.1], n: 18 }, { at: ['ford', 0, 0.7], n: 18 }, { at: ['landing', -0.7, 0.3], n: 16 }],
      limit: { z: ['ford', 0, 0.3], back: ['ben', 0, -14] },
      say: [{ who: 'dinhsoldier', zh: 'Thuyền Nguyễn Siêu kéo đến kín sông! Giữ lấy bến!', en: 'Nguyễn Siêu\'s boats cover the river! Hold the landing!' }],
    },
    {
      when: { wait: 40 * 60 },
      officers: { thuy: { at: ['ford', 0, 0.5], engaged: true } },
      squads: [{ at: ['ben', -26, 6], n: 16, charge: true }, { at: ['ben', 26, 6], n: 16, charge: true }],
      say: [{ who: 'thuy', zh: 'Thủy quân, vượt bãi cạn! Lấy lại bến cho Hữu Công!', en: 'River troops, across the shoal! Take the landing back for Lord Hữu Công!' }],
    },
    {
      when: { wait: 50 * 60 },
      banner: { html: '<em>Tả, Hữu hiệu úy</em> vượt sông', en: 'The Left and Right Commanders cross the river', dur: 150 },
      officers: { ta: { at: ['ford', -0.5, 0.4], engaged: true }, huu: { at: ['ford', 0.5, 0.4], engaged: true } },
      squads: [{ at: ['ben', -30, 4], n: 18, charge: true }, { at: ['ben', 30, 4], n: 18, charge: true }, { at: ['ford', 0, 0.2], n: 20, charge: true }],
    },
    {
      when: { wait: 60 * 60 }, heal: 0.2,
      officers: { mon: { at: ['ford', -0.4, 0.6], engaged: true }, thanve: { at: ['ford', 0.4, 0.6], engaged: true } },
      squads: [{ at: ['ben', -24, 6], n: 18, charge: true }, { at: ['ben', 24, 6], n: 18, charge: true }],
    },
    {
      when: { wait: 50 * 60 }, morale: -0.1,
      banner: { html: '<em>Nguyễn Siêu</em> đích thân vượt sông', en: 'Nguyễn Siêu crosses the river himself', dur: 170, big: true },
      actors: { sieu: { kit: 'nguyensieu', role: 'boss', at: ['ford', 0, 0.6], hp: SIEU_HP } },
      squads: [{ at: ['ben', -30, 6], n: 20, charge: true }, { at: ['ben', 30, 6], n: 20, charge: true }, { at: ['ford', 0, 0.3], n: 20, charge: true }],
      say: [{ who: 'sieu', zh: 'Bến này là của ta! Hôm nay ta lấy lại!', en: 'This landing is mine! Today I take it back!' }],
    },
    {
      when: { timer: true }, win: true, defend: null, fail: null, morale: 1,
      banner: { html: '<em>Bến sông Cái</em> vẫn đứng vững!', en: 'The Red River landing holds!', dur: 260, big: true },
    },
  ],
  EPILOGUE: { any: { zh: ['Xác giặc ngập bãi cạn, thuyền rồng quay mũi; bến sông vẫn trong tay họ Đinh.'], en: ['The dead lay thick on the shoal and the dragon boats turned back. The landing stayed in Đinh hands.'] } },
};

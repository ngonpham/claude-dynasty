// Chương III «Đỗ Động Giang» — chapter data (format: src/story/chapters.js header; text: Vietnamese in .zh, English in
// .en, Hán only in seals / prologue cols): metadata, speakers, the battle script (BEATS), the prologue over the ink map
// of the delta south-west of Cổ Loa (PL_MAP) and the epilogues.
// History (≈ 967; Toàn thư, Cương mục): Đỗ Cảnh Thạc, once a general of Ngô Quyền famed for his strength, held Đỗ Động
// Giang (today Thanh Oai, Hà Nội), river and marsh country. He resisted Đinh Bộ Lĩnh longer than any other warlord; the
// siege dragged on for more than a year before he fell — killed in battle by most accounts, of his wounds by others.
// Played as Đinh Bộ Lĩnh, Phạm Bạch Hổ or Đinh Liễn: `hero` = the chosen one, `ally` = CH.ally[hero], who also comes
// onto the dueling ground as an ally actor. Đỗ Cảnh Thạc is the boss actor (his playable kit, like 呂布 at 虎牢關).
// Map (suquan/src/world/maps/dodong.js): gates 'raotre' (outer bamboo palisade), 'cuagiua' (middle rampart gate, burnt
// open by the sappers: set 'sappers'), 'cuatrong' (citadel gate on the ramp) — all shut at the start; anchors
// 'causeway' (the deck's middle, z -67), 'palisade' (z -47), 'gate2' (the middle gate's outer face, z 30), 'ramp' (the
// citadel gate, z 128), 'duel' (the dueling ground, z 158), 'hall'. Set 'calm' eases the rain on the win.

export const CH = {
  id: 'dodong', num: { zh: 'Chương III', en: 'CHAPTER III' }, title: { zh: 'Đỗ Động Giang', en: 'Đỗ Động Giang' },
  seal: '杜洞江', era: { zh: 'Khoảng năm 967', en: 'c. 967 AD' }, map: 'dodong',
  heroes: ['dinhbolinh', 'phambachho', 'dinhlien'],
  ally: { dinhbolinh: 'phambachho', phambachho: 'dinhbolinh', dinhlien: 'dinhbolinh' },
  army: { foe: 'do', ally: 'dinh' },
  // the van drawn up either side of the lane inside the siege camp's gate, holding rank until the hero marches out
  van: [{ x: -5.6, z: -159, n: 12, cols: 4, hold: true }, { x: 5.6, z: -159, n: 12, cols: 4, hold: true }],
  hq: [0, 176],                                   // Đỗ Cảnh Thạc's hall on the citadel mound
  rank: { kos: [500, 1000, 1700], time: [600, 780, 960] },
};

export const SPK = {
  nguyenbac: { name: { zh: 'Nguyễn Bặc', en: 'Nguyễn Bặc' }, seal: '阮', side: 'shu', char: 'nguyenbac' },
  dinhdien: { name: { zh: 'Đinh Điền', en: 'Đinh Điền' }, seal: '田', side: 'shu' },
  dinhbolinh: { name: { zh: 'Đinh Bộ Lĩnh', en: 'Đinh Bộ Lĩnh' }, seal: '丁', side: 'shu', char: 'dinhbolinh' },
  phambachho: { name: { zh: 'Phạm Bạch Hổ', en: 'Phạm Bạch Hổ' }, seal: '虎', side: 'shu', char: 'phambachho' },
  linhdinh: { name: { zh: 'Lính Đinh', en: 'Đinh Soldier' }, seal: '兵', side: 'shu' },
  docanhthac: { name: { zh: 'Đỗ Cảnh Thạc', en: 'Đỗ Cảnh Thạc' }, seal: '杜', side: 'wei', char: 'docanhthac' },
  tienphong: { name: { zh: 'Tiên phong Đỗ Động', en: 'Đỗ Động Vanguard' }, seal: '先', side: 'wei' },
  muusi: { name: { zh: 'Mưu sĩ Đỗ Động', en: 'Đỗ Động Advisor' }, seal: '謀', side: 'wei' },
  giudon: { name: { zh: 'Giữ đồn Đỗ Động', en: 'Stockade Keeper' }, seal: '守', side: 'wei' },
  kytuong: { name: { zh: 'Kỵ tướng Đỗ Động', en: 'Đỗ Động Rider' }, seal: '騎', side: 'wei' },
  linhdo: { name: { zh: 'Lính Đỗ Động', en: 'Đỗ Động Soldier' }, seal: '兵', side: 'wei' },
};

// crowd officers (looks: the 'do' army's officer list, suquan/src/crowd/armies.js). The keeper is the sturdiest; the
// boss is an actor (BEATS), not a crowd officer.
export const OFF = {
  tienphong: { name: { zh: 'Tiên phong Đỗ Động', en: 'ĐỖ ĐỘNG VANGUARD' }, hp: 700, look: { helm: 'horn', armor: 0x28181e, trim: 0xe0b450, cape: 0x6a1830, plume: 0x9a2ad0 } },
  muusi: { name: { zh: 'Mưu sĩ Đỗ Động', en: 'ĐỖ ĐỘNG ADVISOR' }, hp: 650, look: { helm: 'cap', armor: 0x1c1822, trim: 0xd0b060, cape: 0x2a1a38 } },
  giudon: { name: { zh: 'Giữ đồn Đỗ Động', en: 'STOCKADE KEEPER' }, hp: 1000, look: { helm: 'horn', armor: 0x1c1418, trim: 0xa8804a, cape: 0x3a1a4a, plume: 0x7a2aa8 } },
  kytuong: { name: { zh: 'Kỵ tướng Đỗ Động', en: 'ĐỖ ĐỘNG RIDER' }, hp: 900, look: { helm: 'crest', armor: 0x2c2036, trim: 0xb88a48, cape: 0x381a4e, plume: 0xc060f0 } },
  thanbinh: { name: { zh: 'Thân binh Đỗ Động', en: 'ĐỖ ĐỘNG HOUSEGUARD' }, hp: 340 },
};

// Đỗ Cảnh Thạc (boss actor: the playable kit 'docanhthac') holds the dueling ground before his hall until called in; he
// does not break off — he falls. The hero's ally comes up beside him for the duel (ally actor, invulnerable).
const DO = { kit: 'docanhthac', role: 'boss', at: ['duel', 0, 8], yaw: Math.PI, hp: 4400, poise: 460,
  name: { zh: 'Đỗ Cảnh Thạc', en: 'ĐỖ CẢNH THẠC' }, seal: '杜' };
const ALLY = {
  phambachho: { kit: 'phambachho', role: 'ally', name: { zh: 'Phạm Bạch Hổ', en: 'PHẠM BẠCH HỔ' }, seal: '虎', at: ['duel', -7, -18] },
  dinhbolinh: { kit: 'dinhbolinh', role: 'ally', name: { zh: 'Đinh Bộ Lĩnh', en: 'ĐINH BỘ LĨNH' }, seal: '丁', at: ['duel', 7, -18] },
};

const NAG = { who: 'nguyenbac', zh: 'Khoan đã! Tiên phong địch còn giữ đầu bờ đắp, chớ một mình xông lên.', en: 'Wait! Their vanguard still holds the causeway. Don\'t charge in alone.' };
const NAG_PAL = { who: 'linhdinh', zh: 'Rào tre còn chắn! Đợi tên lửa bén đã!', en: 'The palisade still stands! Wait for the fire arrows to catch!' };
const NAG_GATE = { who: 'nguyenbac', zh: 'Cổng lũy kín như bưng, thang không bám được — phải đốt cổng!', en: 'The rampart gate is shut tight and ladders won\'t hold. We have to burn it!' };
const NAG_RAMP = { who: 'dinhdien', zh: 'Cổng thành nội còn đóng. Dẹp quân dưới chân gò trước đã!', en: 'The citadel gate is still shut. Clear the foot of the mound first!' };

// Pacing (default difficulty): a bot that attacks nonstop clears in ≈ 6-7 min (paddies + vanguard 60 s · causeway and
// palisade 40 s · outer ring + reed ambush 70 s · the gate held 70 s · middle ring rider 40 s · citadel gate 30 s ·
// the duel ≈ 2 min); a human reading the dialogue and steering lands at ≈ 10-13 min. Officers come forward only after
// the hero has fought a while (kos / wait), so rushing shortens a stage but never skips one.
export const BEATS = [
  // ---- Trại vây quân Đinh: the briefing after a year of siege, then the flooded paddies
  {
    when: { wait: 30 },
    obj: { zh: 'Tiến qua đồng chiêm, áp sát đầm lau', en: 'Cross the flooded paddies to the reed marsh', go: ['dongchiem', 0, 0.6] },
    squads: [{ at: ['dongchiem', -0.32, -0.45], n: 20 }, { at: ['dongchiem', 0.3, -0.3], n: 20 }, { at: ['dongchiem', -0.2, 0.25], n: 22 }, { at: ['dongchiem', 0.28, 0.55], n: 20 }],
    limit: { z: ['causeway', 0, -15], nag: NAG },
    morale: -0.06,
    say: [
      { who: 'dinhdien', zh: 'Vây Đỗ Động đã hơn một năm. Mưa dầm, bùn ngập, quân ta mỏi mệt lắm rồi.', en: 'We have besieged Đỗ Động for more than a year. Endless rain, mud to the knee — the men are worn down.' },
      { who: 'nguyenbac', zh: 'Đỗ Cảnh Thạc dựng ba vòng đồn lũy giữa đầm: rào tre ngoài, lũy đất giữa, thành nội trên gò. Phải phá từng vòng một.',
        en: 'Đỗ Cảnh Thạc has built three rings in the marsh: the bamboo palisade, the earth rampart, the citadel on its mound. We break them one by one.' },
      { who: 'hero', dinhbolinh: ['Bao nhiêu sứ quân đã quy phục, chỉ còn Đỗ Động ngoan cố. Hôm nay phải đánh cho dứt!', 'So many warlords have bowed. Only Đỗ Động still holds out. Today we finish it!'],
        phambachho: ['Bạch Hổ này xin đi trước mở đường! Bùn sâu đến đâu cũng lội qua!', 'Let Bạch Hổ lead the way! However deep the mud, I\'ll wade through it!'],
        dinhlien: ['Thưa cha, con xin dẫn cung thủ đi trước, bắn rát mặt quân Đỗ!', 'Father, let me take the archers forward and keep Đỗ\'s men pinned!'] },
      { who: 'ally', dinhbolinh: ['Chúa công cứ tiến, Bạch Hổ theo sát bên cạnh!', 'Advance, my lord. Bạch Hổ will be at your side!'],
        phambachho: ['Bạch Hổ, mũi tiên phong giao cho ngươi. Đừng để quân ta chờ thêm một mùa mưa nữa!', 'Bạch Hổ, the vanguard is yours. Don\'t make our men wait out another rainy season!'],
        dinhlien: ['Liễn, theo sát quân tiên phong. Đỗ Cảnh Thạc là hổ tướng của Ngô Vương ngày trước — chớ khinh hắn.', 'Liễn, stay with the vanguard. Đỗ Cảnh Thạc was a tiger among the Ngô king\'s generals. Do not take him lightly.'] },
    ],
  },
  {
    when: [{ zone: 'dongchiem' }, { kos: 50 }],
    waves: true,
    say: [
      { who: 'linhdo', zh: 'Lại là lũ chăn trâu Hoa Lư! Ruộng bùn này sẽ chôn chân chúng nó!', en: 'The buffalo-boys of Hoa Lư again! This mud will swallow their feet!' },
      { who: 'hero', dinhbolinh: ['Chăn trâu thì đã sao? Trâu cày cũng xéo nát được bờ lũy!', 'Buffalo-boys, are we? A buffalo can trample a dike flat!'],
        phambachho: ['Bùn à? Bạch Hổ lớn lên giữa đầm lầy Đằng Châu đấy!', 'Mud? Bạch Hổ grew up in the marshes of Đằng Châu!'],
        dinhlien: ['Cung của ta bắn xa hơn tiếng các ngươi chửi.', 'My bow carries further than your insults.'] },
    ],
  },
  {
    when: [{ kos: 60, wait: 15 * 60 }, { wait: 60 * 60 }],
    officers: { tienphong: { at: ['causeway', 0, -20], engaged: true } },
    squads: [{ at: ['causeway', -14, -22], n: 14 }, { at: ['causeway', 14, -21], n: 14 }],
    obj: { zh: 'Đánh bại Tiên phong Đỗ Động', en: 'Defeat the Đỗ Động vanguard', go: 'tienphong' },
    say: [{ who: 'tienphong', zh: 'Tiên phong Đỗ Động ở đây! Đầu bờ đắp này, kẻ nào qua được?', en: 'The vanguard of Đỗ Động stands here! Who thinks he can cross this causeway?' }],
  },

  // ---- Đầm lau: the causeway and the outer bamboo palisade
  {
    when: { down: 'tienphong' },
    banner: { html: '<em>Tiên phong Đỗ Động</em> đã bị đánh bại!', en: 'The Đỗ Động vanguard is beaten', dur: 170 },
    heal: 0.3, morale: 0.1, retire: true, hush: true,
    obj: { zh: 'Vượt bờ đắp, phá rào tre ngoài', en: 'Cross the causeway and break the outer palisade', go: ['palisade', 0, -3] },
    limit: { z: ['palisade', 0, -3.2], nag: NAG_PAL },
    squads: [{ at: ['causeway', 0, -6], n: 14 }, { at: ['causeway', 0, 9], n: 14 }],
    say: [{ who: 'nguyenbac', zh: 'Tiên phong của chúng đã ngã! Bờ đắp hẹp, cứ đánh dồn một mạch tới chân rào tre!', en: 'Their vanguard is down! The causeway is narrow — drive straight through to the palisade!' }],
  },
  {
    // fire arrows: the palisade catches once he has fought at its foot a while (or 70 s passed)
    when: [{ at: ['palisade', 0, -12], kos: 30 }, { at: ['palisade', 0, -12], wait: 20 * 60 }, { wait: 70 * 60 }],
    gate: 'raotre', heal: 0.2, morale: 0.1, retire: true,
    banner: { html: '<em>Rào tre ngoài</em> đã bị phá!', en: 'The outer bamboo palisade is down — the first ring is broken', dur: 180 },
    obj: { zh: 'Tiến vào lũy ngoài', en: 'Push into the outer ring', go: ['luyngoai', 0, -0.2] },
    limit: { z: ['gate2', 0, -1.6], nag: NAG_GATE },
    say: [
      { who: 'linhdinh', zh: 'Tên lửa đã bén rào tre! Rào ngoài cháy rồi!', en: 'The fire arrows have caught the bamboo! The outer palisade is burning!' },
      { who: 'hero', dinhbolinh: ['Vòng thứ nhất đã phá! Tiến lên!', 'The first ring is broken! Forward!'],
        phambachho: ['Ha! Rào tre cháy như bó đuốc! Theo ta!', 'Ha! The bamboo burns like a torch! Follow me!'],
        dinhlien: ['Tên lửa trúng đích rồi! Xông vào!', 'The fire arrows struck true! Charge!'] },
    ],
  },

  // ---- Lũy ngoài: the burnt hamlet, then the ambush out of the reeds (the mid-battle twist)
  {
    when: { zone: 'luyngoai' },
    squads: [{ at: ['luyngoai', -0.3, -0.45], n: 18 }, { at: ['luyngoai', 0.3, -0.2], n: 18 }],
    waves: true,
    say: [{ who: 'linhdo', zh: 'Chúng vào được lũy ngoài rồi! Đốt hiệu, báo cho các đồn!', en: 'They\'re inside the outer ring! Light the signal, warn the posts!' }],
  },
  {
    when: [{ at: ['luyngoai', 0, -0.05] }, { kos: 120 }],
    banner: { html: '<em>Phục binh</em>! Quân Đỗ từ trong lau sậy xông ra', en: 'Ambush! Đỗ\'s men burst out of the reeds', dur: 170 },
    squads: [{ at: ['luyngoai', -0.62, -0.3], n: 16, charge: true }, { at: ['luyngoai', 0.62, -0.25], n: 16, charge: true },
      { at: ['luyngoai', -0.6, 0.3], n: 16, charge: true }, { at: ['luyngoai', 0.6, 0.35], n: 16, charge: true }],
    officers: { muusi: { at: ['luyngoai', 0.3, 0.35], engaged: true } },
    morale: -0.1,
    obj: { zh: 'Đánh bại Mưu sĩ Đỗ Động', en: 'Defeat the Đỗ Động advisor', go: 'muusi' },
    say: [
      { who: 'muusi', zh: 'Đầm lau Đỗ Động là của chúng ta. Bước chân vào đây là sa lưới!', en: 'The reeds of Đỗ Động belong to us. Step in here and you\'re in the net!' },
      { who: 'nguyenbac', zh: 'Phục binh trong lau sậy! Giết tên mưu sĩ cầm đầu, chúng sẽ tan!', en: 'Ambush in the reeds! Kill the advisor leading them and they\'ll scatter!' },
    ],
  },
  {
    when: { down: 'muusi' },
    banner: { html: '<em>Phục binh</em> đã tan!', en: 'The reed ambush is broken', dur: 150 },
    heal: 0.3, morale: 0.12, retire: true, hush: true,
    obj: { zh: 'Áp sát cổng lũy giữa', en: 'Close in on the middle rampart\'s gate', go: ['gate2', 0, -6] },
    say: [
      { who: 'muusi', zh: '…Đến lau sậy cũng không giữ nổi các ngươi…', en: '...Not even the reeds could hold you...' },
      { who: 'nguyenbac', zh: 'Lũy đất này tên bắn không thủng, thang dựng không lên. Phải cho quân phá lũy mang củi lau tới đốt cổng!',
        en: 'Arrows won\'t pierce that rampart and ladders won\'t hold. The sappers must bring reeds and brushwood to burn the gate!' },
    ],
  },

  // ---- the middle rampart: hold the gate while the sappers' fire takes; the keeper sallies out
  {
    when: { at: ['gate2', 0, -16] },
    set: 'sappers',
    obj: { zh: 'Giữ chân địch cho quân phá lũy đốt cổng', en: 'Hold them off while the sappers burn the gate', go: ['gate2', 0, -5], timer: 60 },
    defend: { key: 'sappers', at: ['gate2', 0, -5], r: 5, hp: 900, name: { zh: 'Quân phá lũy', en: 'Sappers' } },
    fail: { when: { hp: ['sappers', 0.01] }, zh: 'Quân phá lũy đã bị giết sạch…', en: 'The sappers have been cut down...' },
    squads: [{ at: ['gate2', -22, -8], n: 16, charge: true }, { at: ['gate2', 22, -10], n: 16, charge: true }],
    waves: false,
    say: [
      { who: 'dinhdien', zh: 'Quân phá lũy đã tới! Giữ chân địch quanh cổng cho đến khi lửa bén!', en: 'The sappers are here! Keep the enemy off them until the fire takes!' },
      { who: 'linhdo', zh: 'Chúng đốt cổng! Giết hết lũ mang củi!', en: 'They\'re burning the gate! Kill the ones with the brushwood!' },
      { who: 'hero', dinhbolinh: ['Kẻ nào muốn chạm tới quân phá lũy, phải bước qua ta trước!', 'Whoever wants the sappers must get past me first!'],
        phambachho: ['Cứ đốt đi! Bạch Hổ đứng đây, không tên nào lọt qua!', 'Burn it! Bạch Hổ stands here — not one of them gets through!'],
        dinhlien: ['Cung thủ, bắn chặn hai cánh! Bảo vệ quân phá lũy!', 'Archers, cover both flanks! Protect the sappers!'] },
    ],
  },
  {
    when: { wait: 22 * 60 },
    banner: { html: '<em>Giữ đồn Đỗ Động</em> mở cửa ngầm xông ra!', en: 'The stockade keeper sallies out through a postern!', dur: 160 },
    officers: { giudon: { at: ['gate2', -14, -10], engaged: true } },
    squads: [{ at: ['gate2', -18, -14], n: 12, charge: true }, { at: ['gate2', 18, -16], n: 12, charge: true }],
    obj: { zh: 'Đánh bại Giữ đồn, bảo vệ quân phá lũy', en: 'Defeat the stockade keeper and protect the sappers', go: 'giudon', keepTimer: true },
    say: [{ who: 'giudon', zh: 'Đồn này ta giữ hơn một năm, chưa từng mất một tấc đất! Ra cửa ngầm, đánh!', en: 'I have held this post for more than a year without losing an inch! Out through the postern — attack!' }],
  },
  {
    // the fire has eaten the gate through (the keeper beaten, or half a minute more)
    when: [{ timer: true, down: 'giudon' }, { timer: true, wait: 20 * 60 }],
    gate: 'cuagiua', defend: null, fail: null, heal: 0.3, morale: 0.15, retire: true, hush: true, waves: false,
    banner: { html: '<em>Cổng lũy giữa</em> đã cháy sập!', en: 'The middle rampart\'s gate has burnt through and fallen!', dur: 200, big: true },
    officers: { kytuong: { at: ['luygiua', 0, -0.2], engaged: true } },
    squads: [{ at: ['luygiua', -0.4, 0.1], n: 18 }, { at: ['luygiua', 0.4, 0.2], n: 18 }, { at: ['luygiua', 0, 0.6], n: 18 }],
    obj: { zh: 'Đánh bại Kỵ tướng Đỗ Động', en: 'Defeat the Đỗ Động rider', go: 'kytuong' },
    limit: { z: ['ramp', 0, -10], nag: NAG_RAMP },
    say: [
      { who: 'kytuong', zh: 'Kỵ binh Đỗ Động, theo ta! Giẫm nát bọn chúng ngay giữa cổng!', en: 'Riders of Đỗ Động, with me! Trample them in the gateway!' },
      { who: 'ally', dinhbolinh: ['Chúa công, vòng thứ hai đã mở! Chỉ còn thành nội!', 'My lord, the second ring is open! Only the citadel is left!'],
        phambachho: ['Bạch Hổ, làm tốt lắm! Giờ đến lượt thành nội!', 'Well done, Bạch Hổ! Now for the citadel!'],
        dinhlien: ['Liễn, giỏi lắm! Giữ vững tay cung, còn một vòng nữa!', 'Well done, Liễn! Keep your bow steady — one ring to go!'] },
    ],
  },

  // ---- Lũy giữa → the citadel: the rider, then the gate on the ramp; Đỗ Cảnh Thạc waits on his mound
  {
    when: { down: 'kytuong' },
    banner: { html: '<em>Kỵ tướng Đỗ Động</em> đã bị đánh bại!', en: 'The Đỗ Động rider is beaten', dur: 160 },
    heal: 0.25, morale: 0.1, retire: true, hush: true,
    actors: { docanhthac: DO },
    actor: { key: 'docanhthac', do: 'hold' },
    squads: [{ at: ['ramp', -1, -14], n: 18 }, { at: ['luygiua', 0, 0.85], n: 16 }],
    waves: true,
    obj: { zh: 'Phá cổng thành nội', en: 'Break the citadel gate', go: ['ramp', 0, -5] },
    say: [
      { who: 'docanhthac', zh: 'Hay lắm. Đã lâu lắm rồi mới có kẻ đến được chân gò này. Lên đây!', en: 'Well done. It has been a long time since anyone reached the foot of my mound. Come up!' },
      { who: 'nguyenbac', zh: 'Tiếng Đỗ Cảnh Thạc… Vây ngần ấy tháng mà hắn vẫn còn sức gầm như thế.', en: 'That\'s Đỗ Cảnh Thạc... after all these months of siege, he can still roar like that.' },
    ],
  },
  {
    when: [{ kos: 40 }, { wait: 35 * 60 }, { at: ['ramp', 0, -9], wait: 8 * 60 }],
    gate: 'cuatrong', limit: { z: null },
    banner: { html: '<em>Cổng thành nội</em> đã bị phá!', en: 'The citadel gate is broken — the mound is open', dur: 170 },
    obj: { zh: 'Đánh bại Đỗ Cảnh Thạc', en: 'Defeat Đỗ Cảnh Thạc', go: 'docanhthac' },
  },

  // ---- Thành nội: the duel
  {
    when: { at: ['duel', 0, -16] },
    skip: { down: 'docanhthac' },
    banner: { html: 'Sứ quân Đỗ Động — <em>Đỗ Cảnh Thạc</em>', en: 'Warlord of Đỗ Động: Đỗ Cảnh Thạc', dur: 170, big: true },
    actor: { key: 'docanhthac', do: 'join' },
    say: [
      { who: 'docanhthac', zh: 'Lũ chăn trâu Hoa Lư! Ta theo Ngô Vương đánh giặc từ thuở các ngươi còn cưỡi trâu ngoài bãi!',
        en: 'Buffalo-boys of Hoa Lư! I was fighting beside the Ngô king when you were still riding buffaloes in the fields!',
        dinhbolinh: ['Đinh Bộ Lĩnh! Thằng bé cầm cờ lau ngày nào nay cũng đòi xưng vương? Lũ chăn trâu Hoa Lư, Đỗ Cảnh Thạc chưa hàng ai bao giờ!',
          'Đinh Bộ Lĩnh! The boy with the reed banner wants to be king now? Buffalo-boys of Hoa Lư — Đỗ Cảnh Thạc has never yielded to anyone!'],
        phambachho: ['Phạm Bạch Hổ! Ngươi cũng từng là một sứ quân, sao lại quỳ trước lũ chăn trâu Hoa Lư?', 'Phạm Bạch Hổ! You were a warlord yourself — why kneel to the buffalo-boys of Hoa Lư?'],
        dinhlien: ['Con thằng chăn trâu Hoa Lư đấy à? Về bảo cha ngươi tự lên đây!', 'The buffalo-boy\'s son? Go home and tell your father to come up here himself!'] },
      { who: 'hero', dinhbolinh: ['Đỗ Cảnh Thạc, ông là tướng giỏi của Ngô Vương. Nhưng non sông không thể chia mười hai mảnh mãi!', 'Đỗ Cảnh Thạc, you were one of the Ngô king\'s finest. But this land cannot stay broken in twelve pieces forever!'],
        phambachho: ['Ta quy phục vì muốn non sông về một mối. Hạ kích xuống đi, Đỗ Cảnh Thạc!', 'I yielded because I want the realm made whole. Lower your halberd, Đỗ Cảnh Thạc!'],
        dinhlien: ['Cha ta không cần lên. Có con trai ông ấy là đủ!', 'My father need not come. His son is enough!'] },
    ],
  },
  {
    hero: ['dinhbolinh'],
    when: { wait: 6 * 60 },
    skip: { down: 'docanhthac' },
    actors: { phambachho: ALLY.phambachho },
    say: [{ who: 'phambachho', zh: 'Chúa công! Bạch Hổ tới đây — hai ta cùng đánh!', en: 'My lord! Bạch Hổ is here — we fight him together!' }],
  },
  {
    hero: ['phambachho', 'dinhlien'],
    when: { wait: 6 * 60 },
    skip: { down: 'docanhthac' },
    actors: { dinhbolinh: ALLY.dinhbolinh },
    say: [{ who: 'dinhbolinh', zh: 'Đỗ Cảnh Thạc! Đinh Bộ Lĩnh tới tiếp ngươi đây!', en: 'Đỗ Cảnh Thạc! Đinh Bộ Lĩnh has come to face you himself!' }],
  },
  {
    when: { below: ['docanhthac', 0.5] },
    skip: { down: 'docanhthac' },
    banner: { html: 'Trống trận <em>Đỗ Động</em> nổi dồn — thân binh xông ra!', en: 'The Đỗ Động war drums thunder — his houseguard charges!', dur: 170 },
    waves: true, morale: -0.1,
    squads: [{ at: ['duel', -18, 4], n: 14, charge: true }, { at: ['duel', 18, 6], n: 14, charge: true }, { at: ['duel', 0, -18], n: 14, charge: true }],
    officers: { thanbinh1: { at: ['duel', -12, 10], engaged: true, like: 'thanbinh' }, thanbinh2: { at: ['duel', 12, 10], engaged: true, like: 'thanbinh' } },
    say: [
      { who: 'docanhthac', zh: 'Nổi trống lên! Đỗ Động còn một người là còn đánh!', en: 'Beat the drums! While one man of Đỗ Động stands, we fight!' },
      { who: 'ally', dinhbolinh: ['Chúa công, thân binh để Bạch Hổ lo! Cứ nhằm Đỗ Cảnh Thạc!', 'Leave the houseguard to me, my lord! Go for Đỗ Cảnh Thạc!'],
        phambachho: ['Bạch Hổ, thân binh để ta! Hạ Đỗ Cảnh Thạc đi!', 'Bạch Hổ, I\'ll take the houseguard! Bring Đỗ Cảnh Thạc down!'],
        dinhlien: ['Liễn, thân binh để cha lo! Nhắm thẳng Đỗ Cảnh Thạc!', 'Liễn, leave the houseguard to me! Aim straight at Đỗ Cảnh Thạc!'] },
    ],
  },
  {
    when: { below: ['docanhthac', 0.2] },
    skip: { down: 'docanhthac' },
    say: [{ who: 'docanhthac', zh: 'Kích này… chưa gãy. Đỗ Cảnh Thạc… chưa gục!', en: 'This halberd... is not broken yet. Đỗ Cảnh Thạc... has not fallen!' }],
  },
  {
    when: { down: 'docanhthac' },
    win: true, waves: false, morale: 1, set: 'calm',
    banner: { html: 'Sứ quân <em>Đỗ Cảnh Thạc</em> đã ngã xuống — Đỗ Động Giang bình định!', en: 'The warlord Đỗ Cảnh Thạc has fallen — Đỗ Động Giang is taken!', dur: 280, big: true },
    say: [
      { who: 'docanhthac', zh: '…Ta không hàng. Nhưng ngã dưới tay các ngươi… cũng không nhục.', en: '...I do not yield. But to fall to you... is no shame.' },
      { who: 'hero', dinhbolinh: ['Hãy an táng ông ấy theo lễ một vị tướng. Từ nay Đỗ Động Giang về một mối với non sông.', 'Bury him with the rites due a general. From this day Đỗ Động Giang is one with the realm.'],
        phambachho: ['Cứng cỏi đến hơi thở cuối cùng… Bạch Hổ kính ông.', 'Unbending to his last breath... Bạch Hổ honours him.'],
        dinhlien: ['Thưa cha, Đỗ Động Giang đã bình định… Ông ấy đánh như một hổ tướng thật sự.', 'Father, Đỗ Động Giang is taken... He fought like a true tiger of a general.'] },
    ],
  },
];

// ---- prologue ink map (viewBox 1600×900): the delta south-west of Cổ Loa — the Red River (sông Cái) from the north-west
// past Đường Lâm and Cổ Loa to the sea, the Đáy leaving it and running south past Đỗ Động Giang's marshes to the Hoa Lư
// karst; Tây Phù Liệt on the Red River's south bank; Ba Vì in the far west. Troop arrows: the Đinh closing on Đỗ Động
// from Tây Phù Liệt, Hoa Lư and across the Đáy, Đỗ's sortie, the siege ring.
const peaks = (list, h, w) => list.map(([x, y, k = 1]) =>
  `<path d="M${x - w * k} ${y} Q${x - w * k * 0.35} ${y - h * k * 0.55} ${x} ${y - h * k} Q${x + w * k * 0.3} ${y - h * k * 0.5} ${x + w * k} ${y}Z"/>`).join('');
const karstPeaks = (list) => list.map(([x, y, k = 1]) =>                                 // tall round-shouldered limestone towers
  `<path d="M${x - 22 * k} ${y} C${x - 26 * k} ${y - 60 * k} ${x - 16 * k} ${y - 96 * k} ${x} ${y - 100 * k} C${x + 18 * k} ${y - 96 * k} ${x + 24 * k} ${y - 56 * k} ${x + 20 * k} ${y}Z"/>`).join('');
const SONG = 'M-20 70 C140 100 300 118 450 140 S760 196 880 238 S1150 380 1300 520 S1520 760 1640 860';
const DAY = 'M452 146 C470 260 560 360 600 450 S640 600 720 690 S880 790 960 920';
const CREEK = 'M560 420 C610 440 650 470 700 470 S780 450 820 476';
const marsh = Array.from({ length: 26 }, (_, i) => {                                     // reed-marsh hatching round Đỗ Động
  const x = 610 + (i % 7) * 30 + (i % 2) * 12, y = 430 + Math.floor(i / 7) * 26;
  return `<path d="M${x} ${y} l6 -14 M${x + 8} ${y} l2 -16 M${x + 15} ${y} l-3 -13"/>`;
}).join('');
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${peaks([[110, 300, 1.2], [200, 270, 1.5], [300, 310, 1.0]], 130, 90)}
    ${peaks([[1380, 120, 0.7], [1500, 140, 0.8]], 90, 70)}
  </g>
  <g class="pl-mark" data-id="hoalu" fill="url(#pl-mtn)" filter="url(#pl-ink)">${karstPeaks([[700, 820, 0.9], [744, 800, 1.2], [790, 830, 0.8], [650, 840, 0.7], [836, 812, 1.0], [604, 820, 0.6]])}</g>
  <g class="pl-mark" data-id="song" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${SONG}" stroke="#6f7c78" stroke-width="40" opacity=".35"/><path d="${SONG}" stroke="#46524f" stroke-width="8" opacity=".7"/>
  </g>
  <g class="pl-mark" data-id="day" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${DAY}" stroke="#6f7c78" stroke-width="18" opacity=".35"/><path d="${DAY}" stroke="#46524f" stroke-width="4" opacity=".7"/>
  </g>
  <g class="pl-mark" data-id="marsh" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <ellipse cx="700" cy="468" rx="140" ry="62" fill="#6f7c78" opacity=".16"/>
    <path d="${CREEK}" stroke="#46524f" stroke-width="3" opacity=".6"/>
    <g stroke="#3a3a2a" stroke-width="2.4" opacity=".55">${marsh}</g>
  </g>
  <g class="pl-mark" data-id="ring" filter="url(#pl-ink)" fill="none">
    <ellipse cx="700" cy="468" rx="178" ry="92" stroke="#2f6f68" stroke-width="5" stroke-dasharray="18 14" opacity=".75"/>
  </g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="coloa"><rect x="884" y="128" width="34" height="34" rx="3"/><text x="934" y="158">Cổ Loa</text></g>
    <g class="pl-mark" data-id="duonglam"><rect x="290" y="156" width="28" height="28" rx="3"/><text x="332" y="182">Đường Lâm</text></g>
    <g class="pl-mark" data-id="tayphuliet"><rect x="852" y="316" width="28" height="28" rx="3"/><text x="896" y="342">Tây Phù Liệt</text></g>
    <g class="pl-mark wei" data-id="dodong"><rect x="684" y="452" width="34" height="34" rx="3"/><text x="760" y="610">Đỗ Động Giang</text><text class="sm" x="760" y="648">Đỗ Cảnh Thạc</text></g>
    <g class="pl-mark" data-id="hoalu"><rect x="728" y="736" width="34" height="34" rx="3"/><text x="790" y="764">Hoa Lư</text><text class="sm" x="790" y="802">Đinh Bộ Lĩnh</text></g>
    <g class="pl-mark" data-id="song"><text class="sm river" x="1040" y="300">sông Cái</text></g>
    <g class="pl-mark" data-id="day"><text class="sm river" x="420" y="330">sông Đáy</text></g>
    <g class="pl-mark" data-id="bavi"><text class="sm" x="120" y="340">núi Tản Viên</text></g>
  </g>`,
  arrows: [
    ['dinh2', 'shu', 'M866 352 C836 392 790 428 736 458'],
    ['dinh1', 'shu', 'M744 730 C730 650 716 580 704 510'],
    ['dinh3', 'shu', 'M500 610 C548 566 600 520 664 488'],
    ['do1', 'wei', 'M690 452 C670 410 650 382 622 352'],
  ],
};

// ---- prologue cards (format: chapters.js; `vi` = the Vietnamese prose). Card 5 branches on the hero.
export const PROLOGUE = [
  { cols: ['西扶烈既破', '丁軍移師', '指杜洞江'], vi: 'Tây Phù Liệt đã phá. Quân Đinh chuyển binh, nhắm thẳng Đỗ Động Giang.',
    en: 'Tây Phù Liệt has fallen. The Đinh army turns its strength toward Đỗ Động Giang.',
    show: ['coloa', 'duonglam', 'song', 'tayphuliet', 'dinh2'], focus: [780, 330, 1.12] },
  { cols: ['杜景碩', '吳王舊將', '據杜洞江'], vi: 'Đỗ Cảnh Thạc, tướng cũ của Ngô Vương Quyền, nổi tiếng sức khỏe hơn người, cát cứ vùng Đỗ Động Giang.',
    en: 'Đỗ Cảnh Thạc, once a general of King Ngô Quyền and famed for his strength, holds the Đỗ Động river country as his own.',
    show: ['dodong', 'day', 'do1'], focus: [690, 480, 1.3] },
  { cols: ['沮洳之地', '竹柵土壘', '三重相守'], vi: 'Đất trũng, đầm lầy chằng chịt. Rào tre, lũy đất — ba vòng đồn lũy nương nhau mà giữ.',
    en: 'Low, drowned country, a maze of marsh. Bamboo palisades and earthen ramparts: three rings, each covering the next.',
    show: ['marsh'], focus: [700, 470, 1.45] },
  { cols: ['丁師圍之', '經年不下', '士卒疲困'], vi: 'Quân Đinh vây đã hơn một năm vẫn chưa hạ được. Mưa dầm, bùn lầy, binh sĩ mỏi mệt.',
    en: 'The Đinh have besieged it for more than a year and still it stands. Rain, mud, and weary men.',
    show: ['ring', 'hoalu', 'dinh1', 'dinh3', 'bavi'], focus: [700, 600, 1.08] },
  { dinhbolinh: { cols: ['萬勝王', '親率諸將', '誓破杜洞'], vi: 'Vạn Thắng Vương Đinh Bộ Lĩnh thân dẫn các tướng, thề phá cho được Đỗ Động.',
    en: 'Đinh Bộ Lĩnh, the Vạn Thắng Vương, leads his generals himself, sworn to break Đỗ Động.' },
  phambachho: { cols: ['范白虎', '舊據藤州', '歸丁為先鋒'], vi: 'Phạm Bạch Hổ, xưa cát cứ Đằng Châu, nay theo nhà Đinh làm tiên phong.',
    en: 'Phạm Bạch Hổ, who once held Đằng Châu, now rides in the Đinh vanguard.' },
  dinhlien: { cols: ['丁璉', '萬勝王長子', '從父出征'], vi: 'Đinh Liễn, con trưởng của Vạn Thắng Vương, theo cha ra trận.',
    en: 'Đinh Liễn, eldest son of the Vạn Thắng Vương, marches at his father\'s side.' },
  show: [], focus: [700, 520, 1.3] },
  { cols: ['雨暗沮洳', '鼓角相聞', '決戰杜洞'], vi: 'Mưa phủ đầm lầy, trống và tù và vang dậy. Trận quyết chiến ở Đỗ Động bắt đầu.',
    en: 'Rain shrouds the marsh; drums and horns answer each other. The decisive battle of Đỗ Động begins.',
    show: [], focus: [720, 470, 1.04] },
];

// ---- result screen epilogue (win), branched on the hero. Straight where the sources agree; the manner of Đỗ's death
// is given as the accounts give it.
export const EPILOGUE = {
  dinhbolinh: {
    zh: ['Đỗ Cảnh Thạc chống giữ đến cùng, không chịu hàng. Phần nhiều sử cũ chép ông tử trận; có sách lại chép ông trúng thương rồi mất.',
      'Cuộc vây Đỗ Động Giang, kéo dài hơn một năm, đến đây mới dứt. Thế cát cứ tan dần; Đinh Bộ Lĩnh sắp thu non sông về một mối.'],
    en: ['Đỗ Cảnh Thạc held out to the very end and never yielded. Most of the old histories say he fell in battle; others, that he died of his wounds.',
      'The siege of Đỗ Động Giang, more than a year long, was over at last. The warlords\' realms were crumbling; Đinh Bộ Lĩnh was close to making the land whole again.'],
  },
  phambachho: {
    zh: ['Phạm Bạch Hổ cùng quân Đinh phá ba vòng đồn lũy Đỗ Động. Đỗ Cảnh Thạc chống giữ đến hơi thở cuối cùng.',
      'Một sứ quân đã quy phục đứng trước một sứ quân không chịu hàng. Từ Đằng Châu đến Đỗ Động, thế cát cứ đang tan; non sông sắp về một mối.'],
    en: ['Phạm Bạch Hổ and the Đinh host broke Đỗ Động\'s three rings. Đỗ Cảnh Thạc held out to his last breath.',
      'A warlord who had yielded stood over one who never would. From Đằng Châu to Đỗ Động, the age of the warlords was ending; the realm would soon be one.'],
  },
  dinhlien: {
    zh: ['Đinh Liễn theo cha phá Đỗ Động, lập công trong cuộc vây dài nhất của thời loạn mười hai sứ quân.',
      'Năm 968, Đinh Bộ Lĩnh lên ngôi Hoàng đế ở Hoa Lư, đặt quốc hiệu Đại Cồ Việt; về sau Đinh Liễn được phong Nam Việt Vương.'],
    en: ['Đinh Liễn fought at his father\'s side to take Đỗ Động, the longest siege of the Twelve Warlords\' anarchy.',
      'In 968 Đinh Bộ Lĩnh took the throne at Hoa Lư and named the realm Đại Cồ Việt; Đinh Liễn was later made Nam Việt Vương.'],
  },
};

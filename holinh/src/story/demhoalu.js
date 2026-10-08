// Màn II «Đêm Vỡ Hoa Lư» — stage data (format: src/story/chapters.js header; text convention: holinh/DESIGN.md §2 — .zh
// carries Vietnamese, .en English, seals and prologue cols Hán): metadata, speakers, the battle script (BEATS), the
// prologue over the ink map of Hoa Lư and the seven roads (PL_MAP) and the epilogues.
// Source: the comic's chapters 2–5 (Di mệnh dưới trời sao · Đêm vỡ Hoa Lư · Chín mươi chín cỗ quan · Lời thề bảy bóng).
// History (comic D1, holinh/DESIGN.md §2): in 979 Đinh Tiên Hoàng was killed in his palace at Hoa Lư; Dương hậu stood
// regent for the boy emperor; Nguyễn Bặc is historical. The 99 coffins and the seven roads are legend; the raiders,
// Mặt Sẹo, the seven offices and every line here are fiction. The king's death is TOLD (a guard, a bronze cup still
// turning on the floor), never shown, and whoever struck him is never named: Mặt Sẹo leads the night's raiders, no more.
// Played as Hữu Tướng, Tả Tướng or Thầy Mo: `hero` = the chosen one, `ally` = CH.ally[hero], who fights beside him as an
// allied actor from the start; any other guardian speaks by his CHARS id (pixel portrait), everyone else under a seal.
// Map (holinh/src/world/maps/demhoalu.js): zones ngoai / hanhlang / sanrong / noicung / kho; anchors start, cuaNgoai,
// bell, cuaTrai, cuaNgam, cuaSan, court, cuaTay, cuaDong, dien, cuaNoi, hau, matdao, cuaKho, kho, altar; engine gates
// 'cuaTrai', 'cuaSan', 'cuaNoi', 'cuaKho' (shut at the start, opened here); sets 'sealNgoai', 'snuff', 'sealTay',
// 'sealDong', 'matdao', 'candles', 'seven'.

export const CH = {
  id: 'demhoalu', num: { zh: 'Màn II', en: 'STAGE II' }, title: { zh: 'Đêm Vỡ Hoa Lư', en: 'The Night Hoa Lư Broke' },
  seal: '華閭夜', era: { zh: 'Năm Kỷ Mão · 979', en: '979 AD' }, map: 'demhoalu',
  heroes: ['huutuong', 'tatuong', 'thaymo'],
  ally: { huutuong: 'tatuong', tatuong: 'huutuong', thaymo: 'huutuong' },
  army: { foe: 'thichkhach', ally: 'holinh' },
  // the night watch of the guards' quarter, drawn up either side of the hero, holding until he moves off
  van: [{ x: -6, z: -160, n: 10, cols: 5, hold: true }, { x: 6, z: -160, n: 10, cols: 5, hold: true }],
  hq: [-21, 92],                                   // the queen's steps: where the raiders are going
  rank: { kos: [500, 1000, 1600], time: [600, 780, 960] },   // tuned to the pacing note above BEATS
};

export const SPK = {
  nguyenbac: { name: { zh: 'Nguyễn Bặc', en: 'Nguyễn Bặc' }, seal: '匐', side: 'shu' },
  duonghau: { name: { zh: 'Dương Hoàng hậu', en: 'Empress Dowager Dương' }, seal: '楊后', side: 'shu' },
  nucanve: { name: { zh: 'Nữ Cận Vệ', en: 'The Queen\'s Guard' }, seal: '衛', side: 'shu' },
  thive: { name: { zh: 'Thị vệ nội điện', en: 'Inner Palace Guard' }, seal: '侍', side: 'shu' },
  guard: { name: { zh: 'Lính cấm vệ', en: 'Palace Guard' }, seal: '兵', side: 'shu' },
  matseo: { name: { zh: 'Mặt Sẹo', en: 'Mặt Sẹo' }, seal: '疤面', side: 'wei' },
  raider: { name: { zh: 'Thích khách', en: 'Night Raider' }, seal: '影', side: 'wei' },
};

// crowd officers (HP: a default officer 520 ≈ 5 full combos); the night raiders' soot-black, ash-grey and dark teal
// (crowd/armies.js 'thichkhach'), each his own helm. Mặt Sẹo is an actor (NPC kit 'matseo') ≈ 5×.
const SEO_HP = 2600;
const KH = { armor: 0x101214, trim: 0x9ab8b4, cape: 0x1e3436 };
export const OFF = {
  moicua: { name: { zh: 'Kẻ mở cửa', en: 'THE DOOR-OPENER' }, hp: 480, look: { ...KH, helm: 'cap', cape: 0x16181a } },
  tatden: { name: { zh: 'Kẻ tắt đèn', en: 'THE LAMP-SNUFFER' }, hp: 560, look: { helm: 'cap', armor: 0x16181a, trim: 0x6a7a78, cape: 0x0e1012 } },
  cuatay: { name: { zh: 'Thủ lĩnh cửa Tây', en: 'WEST GATE LEADER' }, hp: 640, look: { ...KH, helm: 'crest', plume: 0x6a9a98 } },
  cuadong: { name: { zh: 'Thủ lĩnh cửa Đông', en: 'EAST GATE LEADER' }, hp: 640, look: { ...KH, helm: 'horn', cape: 0x223a3c, plume: 0x3a6a6a } },
  bongdem: { name: { zh: 'Thủ lĩnh bóng đêm', en: 'NIGHT LEADER' }, hp: 760, look: { ...KH, helm: 'wing', plume: 0x8ab8b4 } },
  thantin: { name: { zh: 'Thân tín Mặt Sẹo', en: 'SCARFACE\'S MAN' }, hp: 360, look: { helm: 'horn', armor: 0x1a1c1e, trim: 0x7a9a98, cape: 0x0a0c0e, plume: 0x2a5a5a } },
  phaan: { name: { zh: 'Kẻ phá ấn', en: 'THE SEAL-BREAKER' }, hp: 700, look: { ...KH, helm: 'crest', cape: 0x0a0c0e, plume: 0xb8d8d4 } },
};

const NAG_TRAI = { who: 'guard', zh: 'Cổng ngoài còn mở, tướng quân! Tin dữ sẽ theo đó mà ra!', en: 'The outer gate still stands open, General! The news will slip out through it!' };
const NAG_HL = { who: 'guard', zh: 'Cửa sân rồng còn cài then. Phải dẹp sạch hành lang đã!', en: 'The court gate is still barred. Clear the gallery first!' };
const NAG_SAN = { who: 'nguyenbac', zh: 'Cửa Tây, cửa Đông còn mở. Khóa thành trước, rồi mới tới nội cung!', en: 'The west and east gates still stand open. Seal the citadel first — then the inner palace!' };
const NAG_NOI = { who: 'nucanve', zh: 'Tướng quân đi đâu? Hoàng hậu còn ở sau tấm rèm này!', en: 'Where are you going, General? The Empress is still behind this curtain!' };
const NAG_KHO = { who: 'nguyenbac', zh: 'Kho kín chưa mở. Đi theo ta, đừng đi trước.', en: 'The store is not open yet. Follow me — don\'t go ahead.' };

// ally actor: the hero's partner (CH.ally) fights at his side from the guards' quarter on (an invulnerable allied actor)
const ALLY = (kit, name, seal) => ({ kit, role: 'ally', at: ['start', 5, 3], name, seal });

// Pacing (default difficulty): a human reading the dialogue lands at ≈ 8-11 min (the quarter and the outer gate 1.5
// min · the gallery 1.5 min · the court's two gates and the night leader 2.5 min · the queen's steps: 45 s held, then
// Mặt Sẹo 1.5-2 min · the store ≈ 1 min with its candle scene). Officers come forward only after the hero has fought a
// while (kos / wait), so rushing shortens a stage but never skips one. Rank thresholds: CH.rank.
export const BEATS = [
  // ---- Ngoại thành: the night that was too quiet; the news; the seal; shut the outer gate
  {
    when: { wait: 30 },
    morale: 0,
    banner: { html: 'Hoa Lư · <em>đêm năm Kỷ Mão</em>', en: 'Hoa Lư, a night in 979', dur: 190, big: true },
    obj: { zh: 'Canh giữ trại cấm vệ', en: 'Keep the night watch in the guards\' quarter' },
    limit: { z: ['cuaTrai', 0, -6], nag: NAG_TRAI },
    say: [
      { who: 'guard', zh: 'Đêm nay chó canh không sủa, chuông gác cũng không vang. Yên quá, tướng quân ạ.', en: 'Tonight no watchdog barked and no bell rang. It\'s too quiet, General.' },
      { who: 'hero', huutuong: ['Yên thế này không phải là yên. Thắp đuốc, gọi đủ người!', 'Quiet like this is not peace. Light the torches — wake every man!'],
        tatuong: ['Ta không thích cái im này. Anh em, cầm giáo lên!', 'I don\'t like this silence. Brothers — take up your spears!'],
        thaymo: ['Chuông đồng của ta tự rung mà không có gió... Núi Hoa Lư đang nín thở.', 'My bronze bells ring with no wind... The mountains of Hoa Lư are holding their breath.'] },
    ],
  },
  { hero: ['huutuong'], actors: { tatuong: ALLY('tatuong', { zh: 'Tả Tướng', en: 'THE LEFT GENERAL' }, '左將') } },
  { hero: ['tatuong', 'thaymo'], actors: { huutuong: ALLY('huutuong', { zh: 'Hữu Tướng', en: 'THE RIGHT GENERAL' }, '右將') } },
  {
    when: { wait: 8 * 60 },
    waves: true,
    banner: { html: 'Thích khách! <em>Cổng ngoại thành</em> bị mở từ bên trong!', en: 'Raiders! The outer gate was opened from within!', dur: 190 },
    squads: [{ at: ['cuaNgoai', -8, 10], n: 16, charge: true }, { at: ['cuaNgoai', 8, 12], n: 16, charge: true }, { at: ['ngoai', -0.55, -0.2], n: 12 }, { at: ['ngoai', 0.55, 0.1], n: 12 }],
    obj: { zh: 'Đẩy lùi thích khách', en: 'Drive back the raiders' },
    say: [
      { who: 'raider', zh: 'Giữ lấy cổng! Đường ra phải còn mở!', en: 'Hold the gate! The way out must stay open!' },
      { who: 'ally', huutuong: ['Hữu Tướng! Chúng đi vào bằng cổng của ta!', 'Right General! They came in through our own gate!'],
        tatuong: ['Lão Tả, chúng đông mà lặng. Không phải bọn trộm.', 'Old Left — they are many, and silent. These are no thieves.'],
        thaymo: ['Thầy Mo, đứng sau lưng tôi. Bọn này đi không tiếng động.', 'Master Mo, stay behind me. These men make no sound.'] },
    ],
  },
  {
    when: [{ kos: 25 }, { wait: 30 * 60 }],
    banner: { html: 'Tin dữ từ <em>nội điện</em>', en: 'Grave news from the inner palace', dur: 170 },
    say: [
      { who: 'thive', zh: 'Tướng quân! Nội điện... thị vệ phá cửa thì đã muộn.', en: 'General! The inner hall... when the guards broke the door, it was too late.' },
      { who: 'thive', zh: 'Không thấy kẻ ra tay. Chỉ có chiếc chén đồng còn quay trên nền.', en: 'No sign of who struck. Only a bronze cup, still turning on the floor.' },
      { who: 'hero', huutuong: ['...Lại một lần ta về muộn.', '...Late again. Once more, too late.'],
        tatuong: ['Bệ hạ... Thần đứng gác ở đây mà không hay biết gì.', 'Majesty... I stood guard here and knew nothing.'],
        thaymo: ['Chuông đã báo, mà người không kịp nghe.', 'The bells warned, and no one heard in time.'] },
    ],
  },
  {
    when: { wait: 9 * 60 },
    officers: { moicua: { at: ['cuaNgoai', 0, 7], engaged: true } },
    squads: [{ at: ['cuaNgoai', -6, 4], n: 12 }, { at: ['cuaNgoai', 6, 5], n: 12 }],
    obj: { zh: 'Hạ kẻ mở cửa, đóng cổng ngoại thành', en: 'Cut down the door-opener and shut the outer gate', go: 'moicua' },
    say: [
      { who: 'nguyenbac', zh: 'Thấy ấn như thấy vua! Phong tỏa cung thành — tin dữ không được ra khỏi Hoa Lư trước khi trời sáng.', en: 'This seal speaks for the king! Lock down the citadel — the news must not leave Hoa Lư before dawn.' },
      { who: 'nguyenbac', zh: 'Kẻ nào mở cổng ngoài, hạ hắn. Rồi đóng cổng lại!', en: 'Whoever opened the outer gate — cut him down. Then shut it!' },
    ],
  },
  {
    when: { down: 'moicua' },
    set: 'sealNgoai', gate: 'cuaTrai', heal: 0.2, morale: 0.1, retire: true, hush: true,
    banner: { html: '<em>Cổng ngoại thành</em> đã đóng!', en: 'The outer gate is shut!', dur: 190 },
    obj: { zh: 'Qua hành lang gỗ, tới sân rồng', en: 'Through the timber gallery to the dragon court', go: ['cuaSan', 0, -10] },
    limit: { z: ['cuaSan', 0, -4], nag: NAG_HL },
    say: [
      { who: 'guard', zh: 'Đóng cổng! Cài then! Dựng giáo lên!', en: 'Shut it! Drop the bar! Spears up!' },
      { who: 'nguyenbac', zh: 'Ta lên sân rồng. Các ngươi theo hành lang mà tới — coi chừng bóng tối.', en: 'I go up to the dragon court. Come by the gallery — and mind the dark.' },
    ],
  },

  // ---- Hành lang gỗ: the lamps go out one by one; the door only insiders know
  {
    when: { at: ['cuaTrai', 0, 5] },
    set: 'snuff', waves: true,
    banner: { html: 'Đèn trong <em>hành lang</em> lần lượt tắt...', en: 'The gallery lamps go out, one after another...', dur: 180 },
    squads: [{ at: ['hanhlang', 0, -0.55], n: 14, charge: true }, { at: ['hanhlang', 0, -0.2], n: 16 }, { at: ['hanhlang', 0, 0.2], n: 14 }],
    obj: { zh: 'Dẹp thích khách trong hành lang', en: 'Clear the raiders from the gallery', go: ['cuaNgam', 0, 0] },
    say: [
      { who: 'raider', zh: 'Tắt hết đèn đi. Trong bóng tối, chúng không thấy ta.', en: 'Put out every lamp. In the dark they cannot see us.' },
      { who: 'thaymo', huutuong: ['Hữu Tướng, đèn tắt từ trong ra. Kẻ tắt đèn đi trước các ông.', 'Right General, the lamps die from the far end in. Whoever snuffs them walks ahead of you.'],
        tatuong: ['Tả Tướng, đèn tắt từ trong ra. Kẻ tắt đèn đi trước các ông.', 'Left General, the lamps die from the far end in. Whoever snuffs them walks ahead of you.'],
        thaymo: ['Đèn tắt từ trong ra. Kẻ tắt đèn đi trước ta — và hắn thuộc đường.', 'The lamps die from the far end in. Whoever snuffs them walks ahead of me — and knows the way.'] },
    ],
  },
  {
    when: [{ at: ['cuaNgam', 0, -6] }, { kos: 45 }],
    officers: { tatden: { at: ['hanhlang', 0, 0.62] } },
    squads: [{ at: ['cuaNgam', 3, 2], n: 14, charge: true }, { at: ['hanhlang', 0, 0.45], n: 16 }],
    obj: { zh: 'Hạ kẻ tắt đèn', en: 'Cut down the lamp-snuffer', go: 'tatden' },
    say: [
      { who: 'hero', huutuong: ['Cửa ngầm này mở từ bên trong. Chỉ người trong cung mới biết lối này.', 'This hidden door was opened from inside. Only palace people know this way.'],
        tatuong: ['Một cánh cửa trong vách gỗ? Ta canh cung này mười năm mà không biết!', 'A door in the timber wall? Ten years I have guarded this palace and never knew it!'],
        thaymo: ['Gió lạnh từ khe cửa này. Kẻ dẫn đường không phải người ngoài.', 'A cold draught through this crack. Whoever led them in is no outsider.'] },
      { who: 'ally', huutuong: ['Chuyện cửa để sau. Kẻ tắt đèn ở cuối hành lang!', 'The door can wait. The lamp-snuffer is at the far end!'],
        tatuong: ['Ghi nhớ lấy, rồi đánh tiếp. Kẻ tắt đèn ở cuối hành lang!', 'Remember it, and fight on. The lamp-snuffer is at the far end!'],
        thaymo: ['Thầy Mo, xin nhớ lấy cánh cửa này. Giờ thì đánh!', 'Master Mo, mark this door. Now — fight!'] },
    ],
  },
  {
    when: { down: 'tatden' },
    gate: 'cuaSan', heal: 0.25, morale: 0.1, retire: true, hush: true,
    banner: { html: '<em>Cửa sân rồng</em> đã mở!', en: 'The dragon court gate is open!', dur: 180 },
    obj: { zh: 'Tới sân rồng, gặp Nguyễn Bặc', en: 'Reach the dragon court and Nguyễn Bặc', go: ['court', 0, -8] },
    limit: { z: ['cuaNoi', 0, -3], nag: NAG_SAN },
    say: [{ who: 'guard', zh: 'Sân rồng! Ngài Nguyễn Bặc đang đợi trước bậc điện!', en: 'The dragon court! Lord Nguyễn Bặc waits before the hall steps!' }],
  },

  // ---- Sân rồng: Nguyễn Bặc raises the seal; shut the west gate, then the east
  {
    when: { zone: 'sanrong' },
    waves: true,
    banner: { html: '<em>Nguyễn Bặc</em> giơ ấn — phong tỏa cung thành!', en: 'Nguyễn Bặc raises the seal: lock down the citadel!', dur: 200, big: true },
    actors: { nguyenbac: { kit: 'nguyenbac', role: 'ally', at: ['court', 0, 10], name: { zh: 'Nguyễn Bặc', en: 'NGUYỄN BẶC' }, seal: '匐' } },
    officers: { cuatay: { at: ['cuaTay', 9, 0] } },
    squads: [{ at: ['cuaTay', 10, -8], n: 14 }, { at: ['cuaTay', 10, 8], n: 14 }, { at: ['sanrong', 0.3, -0.3], n: 16, charge: true }, { at: ['sanrong', -0.1, 0.0], n: 14 }],
    obj: { zh: 'Đóng cửa Tây', en: 'Shut the west gate', go: 'cuatay' },
    say: [
      { who: 'nguyenbac', zh: 'Cửa Tây, cửa Đông còn mở. Đêm nay không một kẻ nào ra khỏi thành!', en: 'The west and east gates still stand open. Tonight not one man leaves this citadel!' },
      { who: 'nguyenbac', zh: 'Kẻ ra tay có thể bị bắt. Nhưng bàn tay sai khiến hắn vẫn đứng giữa triều đình.', en: 'The one who struck may yet be caught. But the hand that sent him still stands among the court.' },
      { who: 'hero', huutuong: ['Hữu Tướng lĩnh mệnh. Cửa Tây trước!', 'The Right General takes the order. The west gate first!'],
        tatuong: ['Một cổng một nhát giáo. Cửa Tây!', 'One gate, one spear. The west gate!'],
        thaymo: ['Ta không quen đóng cửa thành. Nhưng đêm nay, ta sẽ học.', 'I am no gatekeeper. But tonight I will learn.'] },
      { who: 'raider', zh: 'Cung thủ trên mái — bắn!', en: 'Archers on the roofs — loose!' },
    ],
  },
  {
    when: { down: 'cuatay' },
    set: 'sealTay', heal: 0.15, morale: 0.08,
    banner: { html: '<em>Cửa Tây</em> đã khóa!', en: 'The west gate is sealed!', dur: 170 },
    officers: { cuadong: { at: ['cuaDong', -9, 0], engaged: true } },
    squads: [{ at: ['cuaDong', -10, -8], n: 14 }, { at: ['cuaDong', -10, 8], n: 14 }, { at: ['sanrong', -0.4, -0.3], n: 14, charge: true }],
    obj: { zh: 'Đóng cửa Đông', en: 'Shut the east gate', go: 'cuadong' },
    say: [
      { who: 'guard', zh: 'Cửa Tây đã cài then! Sang cửa Đông!', en: 'The west gate is barred! To the east gate!' },
      { who: 'ally', huutuong: ['Còn cửa Đông. Tôi chặn đằng sau, ông cứ tiến!', 'The east gate still. I\'ll hold your back — go!'],
        tatuong: ['Cửa Đông! Lão Tả, đừng để một tên nào lọt!', 'The east gate! Old Left — let not one slip past!'],
        thaymo: ['Thầy Mo, cửa Đông. Tôi mở đường!', 'Master Mo — the east gate. I\'ll clear the way!'] },
    ],
  },
  {
    when: { down: 'cuadong' },
    set: 'sealDong', heal: 0.25, morale: 0.15, retire: true, hush: true,
    banner: { html: '<em>Trống đồng</em> sân rồng nổi lên — cung thành đã phong tỏa!', en: 'The bronze drums of the court sound: the citadel is sealed!', dur: 210, big: true },
    officers: { bongdem: { at: ['cuaNoi', 0, -10] } },
    squads: [{ at: ['dien', -24, 14], n: 16, charge: true }, { at: ['dien', 24, 14], n: 16, charge: true }, { at: ['cuaNoi', -10, -6], n: 12 }],
    obj: { zh: 'Hạ thủ lĩnh bóng đêm trước cửa nội cung', en: 'Defeat the night leader before the inner gate', go: 'bongdem' },
    say: [
      { who: 'nguyenbac', zh: 'Tin dữ đã bị khóa trong thành. Giờ — Hoàng hậu và ấu chúa!', en: 'The news is locked within these walls. Now — the Empress and the boy emperor!' },
      { who: 'raider', zh: 'Cửa đóng hết rồi... Vào nội cung! Tìm cho ra đứa trẻ!', en: 'Every gate is shut... Into the inner palace! Find the child!' },
    ],
  },
  {
    when: { down: 'bongdem' },
    gate: 'cuaNoi', heal: 0.2, morale: 0.1, retire: true, hush: true,
    banner: { html: '<em>Cửa nội cung</em> đã mở!', en: 'The inner palace gate is open!', dur: 170 },
    actors: { duonghau: { kit: 'duonghau', role: 'npc', at: ['hau', -2.5, 0], yaw: Math.PI / 2, name: { zh: 'Dương Hoàng hậu', en: 'EMPRESS DƯƠNG' }, seal: '楊后' },
      nucanve: { kit: 'nucanve', role: 'ally', at: ['hau', 2.5, 0], name: { zh: 'Nữ Cận Vệ', en: 'THE QUEEN\'S GUARD' }, seal: '衛' } },
    actor: [{ key: 'duonghau', do: 'hold', at: ['hau', -2.5, 0] }, { key: 'nucanve', do: 'hold', at: ['hau', 3, 0] }],
    squads: [{ at: ['hau', 14, -10], n: 14, charge: true }, { at: ['hau', 16, 10], n: 14, charge: true }],
    obj: { zh: 'Tới cung Hoàng hậu', en: 'Reach the Queen\'s quarters', go: ['hau', 8, 0] },
    limit: { z: ['cuaKho', 0, -4], nag: NAG_NOI },
    say: [{ who: 'nucanve', zh: 'Bên này! Hoàng hậu ở sau tấm rèm tím!', en: 'This way! The Empress is behind the violet curtain!' }],
  },

  // ---- Cung Hoàng hậu: hold her steps; Mặt Sẹo; he breaks off through a door the palace never showed
  {
    when: [{ near: [['hau', 0, 0], 16] }, { wait: 25 * 60 }],
    waves: true,
    defend: { key: 'hau', at: ['hau', 0, 0], r: 9, hp: 1400, name: { zh: 'Dương Hoàng hậu', en: 'Empress Dương' } },
    fail: { when: { hp: ['hau', 0.001] }, zh: 'Bậc cửa đã vỡ... Hoàng hậu và ấu chúa sa vào tay giặc.', en: 'The steps are lost... the Empress and the boy fall into the raiders\' hands.' },
    obj: { zh: 'Giữ bậc cửa Hoàng hậu', en: 'Hold the Empress\'s steps', go: ['hau', 6, 0], timer: 45 },
    squads: [{ at: ['noicung', 0.4, 0.6], n: 16, charge: true }, { at: ['noicung', 0.6, -0.2], n: 16, charge: true }, { at: ['noicung', -0.1, 0.75], n: 14, charge: true }],
    say: [
      { who: 'duonghau', zh: 'Ta còn giữ được con ta. Tướng quân, giữ lấy bậc cửa này.', en: 'I still hold my son. General — hold these steps.' },
      { who: 'nucanve', zh: 'Kẻ nào bước qua bậc này, phải qua song đao của ta trước.', en: 'Whoever climbs these steps must first get past my two sabres.' },
      { who: 'hero', huutuong: ['Hoàng hậu yên lòng. Đêm nay không ai qua được chỗ này.', 'Rest easy, Majesty. No one passes here tonight.'],
        tatuong: ['Thần ở đây. Giáo còn trong tay, cửa còn đứng.', 'I am here. While I hold this spear, this door stands.'],
        thaymo: ['Lão vẽ một vòng chuông quanh bậc này. Bóng tối không bước qua được.', 'This old man draws a ring of bells round these steps. The dark will not cross it.'] },
    ],
  },
  {
    when: { wait: 22 * 60 },
    squads: [{ at: ['matdao', -4, -12], n: 14, charge: true }, { at: ['noicung', 0.2, -0.6], n: 14, charge: true }],
    say: [{ who: 'raider', zh: 'Rèm tím kia! Đứa trẻ ở sau rèm!', en: 'The violet curtain! The child is behind it!' }],
  },
  {
    when: { timer: true },
    banner: { html: 'Thủ lĩnh thích khách — <em>Mặt Sẹo</em>', en: 'The raiders\' leader: Mặt Sẹo', dur: 190, big: true },
    actors: { matseo: { kit: 'matseo', role: 'boss', at: ['noicung', 0.5, 0.45], hp: SEO_HP, name: { zh: 'Mặt Sẹo', en: 'MẶT SẸO' }, seal: '疤面',
      retreatAt: 0.3, intro: { zh: 'Thủ lĩnh thích khách đêm Hoa Lư', en: 'Leader of the night raiders' } } },
    squads: [{ at: ['noicung', 0.55, 0.6], n: 12, charge: true }],
    obj: { zh: 'Đánh bại Mặt Sẹo', en: 'Defeat Mặt Sẹo', go: 'matseo' },
    say: [
      { who: 'matseo', zh: 'Đứa trẻ ở sau rèm kia phải không? Bước qua các ngươi là tới.', en: 'The child is behind that curtain, is he? Past you, and I\'m there.' },
      { who: 'hero', huutuong: ['Muốn qua, phải qua thanh đao này trước.', 'To pass, you pass this blade first.'],
        tatuong: ['Một vết sẹo chưa đủ dạy ngươi sao? Lại đây!', 'One scar wasn\'t lesson enough? Come here!'],
        thaymo: ['Mặt ngươi có vết chém cũ. Đêm nay đừng thêm vết nữa.', 'Your face carries an old cut. Don\'t earn another tonight.'] },
    ],
  },
  {
    when: { below: ['matseo', 0.65] },
    skip: { down: 'matseo' },
    morale: -0.08,
    officers: { thantin1: { at: ['noicung', 0.3, 0.7], engaged: true, like: 'thantin' }, thantin2: { at: ['noicung', 0.7, 0.3], engaged: true, like: 'thantin' } },
    squads: [{ at: ['noicung', 0.4, 0.7], n: 12, charge: true }],
    say: [
      { who: 'matseo', zh: 'Lên! Đứa nào chạm được tấm rèm, ta thưởng gấp đôi!', en: 'Up! Whoever touches that curtain gets double pay!' },
      { who: 'nucanve', zh: 'Bậc cửa để song đao này lo. Tướng quân, lo tên mặt sẹo!', en: 'Leave the steps to my sabres. General — see to the scarred one!' },
    ],
  },
  {
    when: { below: ['matseo', 0.37] },
    skip: { down: 'matseo' },
    set: 'matdao',
    actor: { key: 'matseo', do: 'retreat', at: ['matdao', 0, 0] },
    say: [{ who: 'matseo', zh: 'Hoa Lư nhiều cửa lắm. Có những cửa các ngươi chưa từng biết.', en: 'Hoa Lư has many doors. Some of them you have never seen.' }],
  },
  {
    when: { down: 'matseo' },
    set: 'matdao', defend: null, fail: null, waves: false, retire: true, heal: 0.3, morale: 0.15,
    banner: { html: '<em>Mặt Sẹo</em> thoát qua mật đạo!', en: 'Mặt Sẹo escapes by a hidden passage!', dur: 210, big: true },
    obj: { zh: 'Theo Nguyễn Bặc tới kho kín', en: 'Follow Nguyễn Bặc to the sealed store', go: ['cuaKho', 0, -8] },
    actor: { key: 'nguyenbac', do: 'hold', at: ['cuaKho', 3, -6] },
    say: [
      { who: 'hero', huutuong: ['Một tấm ván trong tường... Lại một lối chỉ người trong cung biết.', 'A panel in the wall... another way only palace people know.'],
        tatuong: ['Hắn chạy rồi! Để ta đuổi —', 'He\'s running! Let me after him —'],
        thaymo: ['Hắn đi vào lòng núi. Núi sẽ nhớ mặt hắn.', 'He goes into the mountain. The mountain will remember his face.'] },
      { who: 'nguyenbac', zh: 'Để hắn đi. Đêm nay việc lớn hơn một cái đầu.', en: 'Let him go. Tonight\'s work is greater than one man\'s head.' },
      { who: 'duonghau', zh: 'Người đi giữ mộ, người ở giữ nước. Đi đi, Nguyễn Bặc.', en: 'Some go to keep the tomb, some stay to keep the realm. Go, Nguyễn Bặc.' },
    ],
  },

  // ---- Kho kín: the store opened; the last raider; the sealed order; the 99 coffins; the seven before the flames
  {
    when: { near: [['cuaKho', 0, -6], 10] },
    gate: 'cuaKho', waves: true,
    banner: { html: '<em>Kho kín</em> mở cửa', en: 'The sealed store opens', dur: 170 },
    actor: { key: 'nguyenbac', do: 'follow' },
    officers: { phaan: { at: ['kho', 0, 14], engaged: true } },
    squads: [{ at: ['kho', -0.6, -0.55], n: 12, charge: true }, { at: ['kho', 0.6, -0.55], n: 12, charge: true }],
    obj: { zh: 'Hạ kẻ phá ấn trong kho kín', en: 'Cut down the seal-breaker inside the store', go: 'phaan' },
    limit: { z: ['altar', 0, -5], nag: NAG_KHO },
    say: [
      { who: 'nguyenbac', zh: 'Mật lệnh chỉ được mở khi vua không còn thở. Vậy mà đã có kẻ vào trước ta.', en: 'The sealed order opens only when the king breathes no more. And still someone came here before me.' },
      { who: 'raider', zh: 'Hộp ấn ở trên án! Lấy nó rồi rút!', en: 'The seal box is on the altar! Take it and go!' },
    ],
  },
  {
    when: { down: 'phaan' },
    set: 'candles', waves: false, retire: true, hush: true, heal: 0.3, morale: 0.2,
    banner: { html: '<em>Chín mươi chín</em> cỗ quan', en: 'Ninety-nine coffins', dur: 260, big: true },
    actor: { key: 'nguyenbac', do: 'hold', at: ['altar', -4.5, -3] },
    obj: { zh: 'Đứng trước chín mươi chín ngọn lửa', en: 'Stand before the ninety-nine flames', go: ['kho', 0, 1] },
    say: [
      { who: 'nguyenbac', zh: 'Bảy thẻ đồng không chữ. Một cuộn chỉ son. Tiên đế đã dặn từ nhiều năm trước.', en: 'Seven blank bronze tokens. A spool of cinnabar thread. The late emperor gave this order years ago.' },
      { who: 'nguyenbac', zh: 'Chín mươi chín cỗ quan — cùng gỗ, cùng khóa, cùng sức nặng. Chỉ một cỗ giữ long thể.', en: 'Ninety-nine coffins — the same wood, the same lock, the same weight. Only one holds the king.' },
      { who: 'hero', huutuong: ['Không người thợ nào biết đó là cỗ nào. Và ta cũng không cần biết.', 'No carpenter knows which one it is. Nor do I need to.'],
        tatuong: ['Một vị vua thắng lúc sống, vẫn có thể thua sau khi chết. Lần này thì không.', 'A king who won in life can still lose in death. Not this one.'],
        thaymo: ['Núi không giữ bí mật bằng đá, mà bằng những con đường khiến kẻ tham tự lạc.', 'Mountains keep secrets not with stone, but with roads that lose the greedy.'] },
    ],
  },
  {
    when: [{ wait: 14 * 60 }, { near: [['kho', 0, 1], 3], wait: 6 * 60 }],
    set: 'seven', win: true, morale: 1,
    banner: { html: 'Bảy bóng trước <em>chín mươi chín ngọn lửa</em>', en: 'Seven shadows before ninety-nine flames', dur: 320, big: true },
    say: [{ who: 'nguyenbac', zh: 'Từ đây, không ai còn đường riêng của mình.', en: 'From this night, no one walks a road of his own.' }],
  },
];

// ---- prologue ink map of Hoa Lư and its country (viewBox 1600×900, north up): the Hoàng Long river across the north,
// the Sào Khê winding through the citadel, the Đáy to the east; the karst towers ringing Hoa Lư and the Tràng An massif
// to the south; the two walled enclosures of the capital; and the seven threads — cinnabar arrows that leave Hoa Lư in
// seven directions and end in mist (where they go is never drawn)
const towers = (list) => list.map(([x, y, h, w]) =>
  `<path d="M${x - w} ${y} C${x - w} ${y - h * 0.7} ${x - w * 0.8} ${y - h} ${x} ${y - h} C${x + w * 0.8} ${y - h} ${x + w} ${y - h * 0.7} ${x + w} ${y}Z"/>`).join('');
const HOANGLONG = 'M-20 170 C180 200 360 150 560 190 S900 260 1100 220 S1380 160 1620 210';
const SAOKHE = 'M560 190 C600 300 660 360 720 430 S820 560 860 640 S940 760 1000 920';
const DAY = 'M1380 -20 C1360 160 1320 320 1350 480 S1420 760 1460 920';
const river = (d, w1, w2) => `<path d="${d}" stroke="#6f7c78" stroke-width="${w1}" opacity=".32"/><path d="${d}" stroke="#46524f" stroke-width="${w2}" opacity=".7"/>`;
// the seven threads: from the citadel (≈ 790, 450) out to the mist, each a different length and bend
const C0 = [790, 450];
const THREADS = [[300, 300], [520, 140], [1060, 150], [1300, 360], [1240, 700], [820, 820], [330, 690]];
const thread = ([x, y], i) => {
  const [cx, cy] = C0, mx = (cx + x) / 2 + (i % 2 ? 60 : -60), my = (cy + y) / 2 + (i % 3 ? -40 : 50);
  return [`t${i}`, 'wei', `M${cx} ${cy} C${(cx + mx) / 2} ${(cy + my) / 2} ${mx} ${my} ${x} ${y}`];
};
const mist = THREADS.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="150" ry="80" fill="#e8dcc0" opacity=".85" filter="url(#pl-blot)"/>`).join('');
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${towers([[120, 330, 120, 30], [190, 310, 150, 26], [260, 340, 100, 24], [1460, 330, 130, 28], [1530, 300, 110, 24], [140, 860, 140, 34], [260, 880, 110, 28], [1500, 860, 150, 34]])}
  </g>
  <g class="pl-mark" data-id="hoalu-karst" fill="url(#pl-mtn)" filter="url(#pl-ink)">${towers([[640, 420, 120, 26], [690, 380, 150, 24], [900, 400, 140, 26], [950, 440, 110, 22], [620, 540, 100, 24], [960, 560, 130, 26], [700, 600, 90, 20], [880, 610, 100, 22], [780, 330, 110, 22]])}</g>
  <g class="pl-mark" data-id="trangan" fill="url(#pl-mtn)" filter="url(#pl-ink)">${towers([[440, 760, 150, 30], [520, 720, 180, 28], [600, 780, 130, 26], [680, 740, 160, 28], [1040, 760, 150, 28], [1120, 720, 120, 24], [1200, 780, 160, 30], [470, 860, 120, 30], [1100, 860, 130, 30]])}</g>
  <g class="pl-mark" data-id="rivers" filter="url(#pl-ink)" fill="none" stroke-linecap="round">${river(HOANGLONG, 30, 7)}${river(SAOKHE, 18, 4)}${river(DAY, 26, 6)}</g>
  <g class="pl-mark" data-id="citadel" filter="url(#pl-ink)" fill="none" stroke="#24160b" stroke-width="6" opacity=".8">
    <path d="M700 430 L780 420 L790 500 L708 512Z"/><path d="M790 420 L880 428 L872 506 L792 500Z"/></g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="hoalu"><rect x="770" y="446" width="40" height="40" rx="3"/><text x="826" y="560">Hoa Lư</text><text class="sm" x="830" y="602">kinh đô Đại Cồ Việt</text></g>
    <g class="pl-mark" data-id="trangan"><text class="sm" x="520" y="660">Tràng An</text></g>
    <g class="pl-mark" data-id="rivers"><text class="sm river" x="200" y="150">Sông Hoàng Long</text><text class="sm river" x="1380" y="560">Sông Đáy</text><text class="sm river" x="900" y="700">Sào Khê</text></g>
    <g class="pl-mark" data-id="mist">${mist}</g>
    <g class="pl-mark wei" data-id="night"><text x="560" y="300">己卯之夜</text></g>
  </g>`,
  arrows: THREADS.map(thread),
};

// ---- prologue cards (format: chapters.js; cols Hán, vi Vietnamese prose, en English). Card 6 branches on the hero.
const T7 = THREADS.map((_, i) => `t${i}`);
export const PROLOGUE = [
  { cols: ['十二使君既平', '丁先皇定鼎', '都於華閭'], vi: 'Mười hai sứ quân đã dẹp yên. Đinh Tiên Hoàng lên ngôi, đặt quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư — giữa những ngọn núi đá vôi dựng đứng như tường thành.',
    en: 'The twelve warlords were put down. Đinh Tiên Hoàng took the throne, named the realm Đại Cồ Việt and made Hoa Lư his capital — among limestone peaks that stand like walls.',
    show: ['hoalu', 'hoalu-karst', 'citadel', 'rivers'], focus: [800, 450, 1.06] },
  { cols: ['先皇問阮匐', '朕若驟崩', '誰護朕身'], vi: 'Sau chiến thắng, nhà vua không hỏi ngai vàng bền bao lâu. Ông hỏi Nguyễn Bặc: nếu trẫm chết bất ngờ, ai giữ thân xác này khỏi tay kẻ muốn chia nước?',
    en: 'After victory the king did not ask how long his throne would last. He asked Nguyễn Bặc: if I die without warning, who will keep my body from those who would split the realm?',
    show: ['hoalu', 'citadel'], focus: [800, 470, 1.32] },
  { cols: ['死亦戰場', '墓若被掘', '民心復散'], vi: 'Một vị vua có thể thắng khi còn sống, mà vẫn thua sau khi chết. Mộ bị đào, long mạch bị phá — lòng dân lại tan thành mười hai cõi.',
    en: 'A king may win while he lives and still lose once he is dead. Dig up his tomb, break the dragon vein, and the people scatter again into twelve.',
    show: ['trangan', 'hoalu-karst'], focus: [760, 620, 1.18] },
  { cols: ['巫鈴讀山', '沙上七線', '多造假死'], vi: 'Thầy Mo Cun mang chuông đồng tới, rắc cát vẽ bảy dòng. Núi không giữ bí mật bằng đá, mà bằng những con đường khiến kẻ tham tự lạc. Muốn giấu một mộ thật, phải dựng nhiều cái chết giả.',
    en: 'Thầy Mo Cun came with his bronze bells and drew seven lines in sand. Mountains keep secrets not with stone but with roads that lose the greedy. To hide one true grave, raise many false deaths.',
    show: [...T7, 'mist'], focus: [800, 450, 1.04] },
  { cols: ['七枚銅符', '無一字', '各守其一'], vi: 'Bảy thẻ đồng không chữ đặt quanh một bông lau. Không ai được nắm trọn con đường: mỗi người giữ một mảnh, mỗi đoàn mang một lời dối, và tất cả gặp nhau đúng ngày.',
    en: 'Seven blank bronze tokens set round a reed plume. No one may hold the whole road: each keeps one piece, each party carries one lie, and all meet on the appointed day.',
    show: ['mist'], focus: [800, 450, 1.2] },
  { huutuong: { cols: ['右將', '立於沙盤之側', '不問歸期'], vi: 'Hữu Tướng đứng cạnh sa bàn, lặng lẽ như người đã quen nhận những mệnh lệnh không có ngày về.', en: 'The Right General stood by the sand table, silent, like a man long used to orders with no return.' },
    tatuong: { cols: ['左將跪受', '銅符一枚', '女在雨中'], vi: 'Tả Tướng quỳ nhận một thẻ đồng. Ngoài hành lang, con gái ông tập thương dưới mưa — nàng chỉ thấy cha cúi đầu.', en: 'The Left General knelt to receive a bronze token. Out in the gallery his daughter drilled with her spear in the rain — she saw only her father bow.' },
    thaymo: { cols: ['巫鈴入宮', '一束紅線', '七路由之'], vi: 'Thầy Mo vào cung với chuông đồng và một bó chỉ son. Bảy con đường sẽ đi qua tay ông — và chỉ tiếng chuông của ông đổi được đường giữa hành trình.', en: 'Thầy Mo came into the palace with his bronze bells and a bundle of cinnabar thread. Seven roads would pass through his hands — and only his bell could turn a road mid-journey.' },
    show: ['hoalu', 'citadel'], focus: [790, 470, 1.38] },
  { cols: ['己卯之夜', '犬不吠', '鐘不鳴'], vi: 'Năm Kỷ Mão (979). Đêm ấy, chó canh không sủa, chuông gác không vang. Một lối cửa chỉ người trong cung biết đã mở ra.',
    en: '979. That night no watchdog barked and no bell rang. A door only palace people knew had been opened.',
    show: ['night', 'hoalu'], focus: [700, 400, 1.24] },
];

// ---- result screen epilogue (win), branched on the hero: ch. 5 — the oath of the seven, the father who refused his
// daughter, and the last image: a shadow behind the violet curtain, a ring, a green glint, a letter burning
export const EPILOGUE = {
  huutuong: {
    zh: ['Trước bình minh, Hữu Tướng buộc một dải vải trẻ con cũ vào chuôi đao rồi giấu nó dưới bao tay. Năm xưa ông mất vợ con trong một trận lũ khi đang ngoài chiến tuyến; từ đó ông không rời nhiệm vụ nữa.',
      'Sáu bàn tay đặt quanh bát nước pha son, bàn tay thứ bảy chạm vào sau cùng. Bảy người thề không để bí mật sống lâu hơn nhiệm vụ. Ngoài cửa, An Nhiên xin một thẻ đồng — Tả Tướng khép bàn tay lớn lại: "Con chưa hiểu cái giá."',
      'Cùng lúc ấy, sau một tấm rèm tím, có bàn tay khép ngón đeo nhẫn. Viên đá xanh lóe lên một chấm lạnh. Một lá thư cháy trên ngọn đèn, tro rơi vào chậu nước.'],
    en: ['Before dawn the Right General tied an old child\'s cloth strip to his saber hilt and hid it under his gauntlet. Years ago he lost his wife and child to a flood while he was away at war; he has not left a duty since.',
      'Six hands rested round a bowl of cinnabar water; a seventh touched it last. Seven swore the secret would not outlive the task. At the door An Nhiên asked for a token — the Left General closed his great hand: "You don\'t yet understand the price."',
      'At that same hour, behind a violet curtain, a hand closed the finger that wore a ring. Its green stone gave one cold glint. A letter burned over a lamp, and the ash sank into a basin of water.'],
  },
  tatuong: {
    zh: ['An Nhiên đòi đi cùng. Trước mặt mọi người, Tả Tướng khép bàn tay lớn quanh thẻ đồng: "Con chưa hiểu cái giá." Nàng nghe thành khinh miệt; còn ông chỉ không dám nói ra chữ chết.',
      'Bảy người thề trên bát nước pha son, không để bí mật sống lâu hơn nhiệm vụ. Một giọt đỏ rơi khỏi vòng. Ngoài cửa, An Nhiên nhìn giọt son thấm xuống đất, và lặng lẽ quyết định sẽ tự chọn phần mình.',
      'Ở một gian khác, sau tấm rèm tím, có bàn tay khép ngón đeo nhẫn; viên đá xanh lóe lạnh. Một lá thư cháy thành tro trên ngọn đèn.'],
    en: ['An Nhiên asked to go. Before everyone the Left General closed his great hand round the bronze token: "You don\'t yet understand the price." She heard contempt; he simply could not bring himself to say the word death.',
      'Seven swore over a bowl of cinnabar water that the secret would not outlive the task. One red drop fell from the ring of hands. At the door An Nhiên watched it sink into the earth, and quietly decided to choose her own part.',
      'In another room, behind a violet curtain, a hand closed the finger that wore a ring; the green stone gave a cold glint. A letter burned to ash over a lamp.'],
  },
  thaymo: {
    zh: ['Thầy Mo kéo bảy sợi chỉ son qua sa bàn Tràng An; bảy sợi giao nhau ở một vòng trống không tên. Bảy đoàn sẽ rời Hoa Lư vào bảy giờ khác nhau, và chỉ tiếng chuông của ông đổi được đường giữa hành trình.',
      'Bảy người thề trên bát nước pha son. Ngoài cửa, An Nhiên xin một thẻ đồng; Tả Tướng từ chối con trước mặt mọi người. Thầy Mo không nói gì — ông chỉ nghe chuông mình rung khẽ, như khi núi sắp đổi mùa.',
      'Đêm ấy, sau một tấm rèm tím, có bàn tay khép ngón đeo nhẫn; viên đá xanh lóe lên một chấm lạnh. Một lá thư cháy trên ngọn đèn, tro chìm xuống chậu nước.'],
    en: ['Thầy Mo drew seven cinnabar threads across the sand table of Tràng An; they crossed at an empty ring with no name. Seven parties would leave Hoa Lư at seven different hours, and only his bell could turn a road mid-journey.',
      'Seven swore over a bowl of cinnabar water. At the door An Nhiên asked for a token; the Left General refused his daughter before them all. Thầy Mo said nothing — he only heard his bells stir, the way they do when the mountain is about to turn its season.',
      'That night, behind a violet curtain, a hand closed the finger that wore a ring; the green stone gave one cold glint. A letter burned over a lamp, and the ash sank into a basin of water.'],
  },
};

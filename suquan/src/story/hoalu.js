// Chương I «Hoa Lư» (951) — chapter data (format: src/story/chapters.js header; text convention: suquan/src/story/
// chapters.js — Vietnamese in .zh, English in .en, Hán in seals and prologue cols): metadata, speakers, the battle
// script (BEATS), the prologue over the ink map of the northern delta (PL_MAP) and the epilogues.
// History (Đại Việt sử ký toàn thư; Khâm định Việt sử thông giám cương mục): after Ngô Quyền's death (944) Dương Tam Kha
// seized the throne; in 950 Ngô Xương Văn (Nam Tấn Vương) took it back and called home his elder brother Ngô Xương Ngập
// (Thiên Sách Vương) to rule beside him. Đinh Bộ Lĩnh held Hoa Lư, a natural fortress of limestone gorges; his son Đinh
// Liễn had gone to the Ngô court and was held there. In 951 the two kings, with the generals Lã Xử Bình and Kiều Tri Hựu,
// attacked Hoa Lư and could not take it for over a month; they hung Liễn from the top of a pole and threatened to kill
// him unless his father surrendered. Đinh Bộ Lĩnh answered "Đại trượng phu cốt lập công danh, há bắt chước đàn bà
// thương con sao?" and had his crossbowmen aim at the pole; the kings, seeing it was no use, let Liễn go and withdrew.
// Game licence (said as such nowhere in the text, kept plausible): the sortie, the river landing, the duel. The hostage
// moment is told with restraint: the threat, the answer, the levelled bows, the Ngô losing heart — never a shot.
// Played as either sworn friend: `hero` = the chosen one, `ally` = the other, who speaks with his pixel portrait.
// Map (suquan/src/world/maps/hoalu.js): gates 'hoalu' (the citadel's doors), 'siege' and 'camp' (barricades), all shut
// at the start; anchors 'gate', 'landing', 'pole', 'siege', 'campgate', 'dais'; sets 'boats', 'hostage', 'freed'.

export const CH = {
  id: 'hoalu', num: { zh: 'Chương I', en: 'CHAPTER I' }, title: { zh: 'Hoa Lư', en: 'Hoa Lư' },
  seal: '華閭', era: { zh: 'Năm Tân Hợi · 951', en: '951 AD' }, map: 'hoalu',
  heroes: ['dinhbolinh', 'nguyenbac'],
  ally: { dinhbolinh: 'nguyenbac', nguyenbac: 'dinhbolinh' },
  army: { foe: 'ngo', ally: 'dinh' },
  // the Đinh ranks drawn up either side of the court road, holding until the hero marches past
  van: [{ x: -5.5, z: -149, n: 12, cols: 4, hold: true }, { x: 5.5, z: -149, n: 12, cols: 4, hold: true }],
  hq: [0, 188],                                    // the kings' pavilion
  rank: { kos: [400, 800, 1300], time: [540, 720, 900] },   // tuned to the pacing note above BEATS
};

export const SPK = {
  dinhdien: { name: { zh: 'Đinh Điền', en: 'Đinh Điền' }, seal: '田', side: 'shu' },
  lien: { name: { zh: 'Đinh Liễn', en: 'Đinh Liễn' }, seal: '璉', side: 'shu' },
  dinhsoldier: { name: { zh: 'Lính nhà Đinh', en: 'Đinh Soldier' }, seal: '兵', side: 'shu' },
  van: { name: { zh: 'Ngô Xương Văn', en: 'Ngô Xương Văn' }, seal: '南晉', side: 'wei', char: 'ngoxuongvan' },
  ngap: { name: { zh: 'Ngô Xương Ngập', en: 'Ngô Xương Ngập' }, seal: '天策', side: 'wei' },
  laxubinh: { name: { zh: 'Lã Xử Bình', en: 'Lã Xử Bình' }, seal: '呂', side: 'wei' },
  kieutrihuu: { name: { zh: 'Kiều Tri Hựu', en: 'Kiều Tri Hựu' }, seal: '矯', side: 'wei' },
  thuyquan: { name: { zh: 'Đô úy thủy quân', en: 'River Captain' }, seal: '水', side: 'wei' },
  tienphong: { name: { zh: 'Tiên phong nhà Ngô', en: 'Ngô Vanguard' }, seal: '鋒', side: 'wei' },
  soldier: { name: { zh: 'Lính nhà Ngô', en: 'Ngô Soldier' }, seal: '兵', side: 'wei' },
};

// crowd officers (HP: a default officer 520 ≈ 5 full combos). Looks: the Ngô court's black lacquer and imperial ochre
// (crowd/armies.js 'ngo'), each his own helm and plume.
export const OFF = {
  thuyquan: { name: { zh: 'Đô úy thủy quân', en: 'RIVER CAPTAIN' }, hp: 600, look: { helm: 'cap', armor: 0x221c16, trim: 0xd8b050, cape: 0x5a4410 } },
  tienphong: { name: { zh: 'Tiên phong nhà Ngô', en: 'NGÔ VANGUARD' }, hp: 650, look: { helm: 'wing', armor: 0x2a2218, trim: 0xc8a040, cape: 0x6a5010, plume: 0xe0b428 } },
  laxubinh: { name: { zh: 'Lã Xử Bình', en: 'LÃ XỬ BÌNH' }, hp: 1100, look: { helm: 'horn', armor: 0x221c16, trim: 0xf0c860, cape: 0x8a6a14, plume: 0xe0b428 } },
  kieutrihuu: { name: { zh: 'Kiều Tri Hựu', en: 'KIỀU TRI HỰU' }, hp: 1100, look: { helm: 'crest', armor: 0x2a2218, trim: 0xd8b050, cape: 0x6a5010, plume: 0xf0e0a0 } },
  guard: { name: { zh: 'Ngự lâm tướng', en: 'GUARD GENERAL' }, hp: 340, look: { helm: 'crest', armor: 0x16120e, trim: 0xf0c860, cape: 0x7a5a10, plume: 0xf0e0a0 } },
};

// Ngô Xương Văn: a boss actor (NPC kit 'ngoxuongvan', sword class). He breaks off at a quarter of his HP and runs for his
// boats — the kings withdrew from Hoa Lư, neither of them fell there.
const VAN = { kit: 'ngoxuongvan', role: 'boss', at: ['royal', 0, 0.2], yaw: Math.PI, hp: 3600, poise: 420, retreatAt: 0.25,
  name: { zh: 'Ngô Xương Văn', en: 'NGÔ XƯƠNG VĂN' }, seal: '南晉' };

const NAG = { who: 'dinhdien', zh: 'Khoan đã! Phía trước chưa dẹp xong, chớ một mình xông vào.', en: 'Wait! The way ahead isn\'t cleared yet. Don\'t go on alone.' };
const NAG_GATE = { who: 'dinhdien', zh: 'Cổng thành còn đóng. Dẹp hết bọn trèo thành đã, rồi hãy mở cổng!', en: 'The gate stays shut until the men on the walls are cleared!' };
const NAG_SIEGE = { who: 'dinhdien', zh: 'Lũy giặc còn vững. Phải hạ tướng giữ lũy trước!', en: 'Their line still holds. Bring down the general who keeps it first!' };
const NAG_POLE = { who: 'dinhdien', zh: 'Đứng lại! Giặc đang giữ cậu Liễn trên ngọn sào!', en: 'Hold! They have young Liễn up on that pole!' };
const NAG_CAMP = { who: 'dinhdien', zh: 'Cửa doanh trại có Kiều Tri Hựu trấn giữ. Hạ hắn trước!', en: 'Kiều Tri Hựu holds the camp gate. Bring him down first!' };

// Pacing (default difficulty): a scripted bot that attacks nonstop clears in ≈ 6 min (landing 60 s · gate yard 45 s ·
// siege lines 80 s · the pole ≈ 45 s of scene · camp gate 50 s · the duel ≈ 2 min); a human reading the dialogue and
// steering lands at ≈ 9-12 min. Officers come forward only after the hero has fought a while (kos / wait), so rushing
// shortens a stage but never skips one. Rank thresholds: CH.rank.
export const BEATS = [
  // ---- Thành Hoa Lư: the morning council; Ngô boats have slipped up the Sào Khê to the landing
  {
    when: { wait: 30 },
    obj: { zh: 'Đánh đuổi quân Ngô ở bến Sào Khê', en: 'Drive the Ngô from the Sào Khê landing', go: ['saokhe', 0, -0.5] },
    squads: [{ at: ['saokhe', -0.45, -0.55], n: 20 }, { at: ['saokhe', 0.45, -0.5], n: 20 }, { at: ['saokhe', -0.2, 0.55], n: 22 }, { at: ['saokhe', 0.35, 0.6], n: 20 }],
    limit: { z: ['yard', 0, -0.6], nag: NAG },
    morale: 0,
    say: [
      { who: 'dinhdien', zh: 'Quân Ngô vây Hoa Lư đã hơn một tháng. Đêm qua chúng theo sông Sào Khê lẻn thuyền vào tận bến!', en: 'The Ngô have besieged Hoa Lư for over a month. Last night their boats crept up the Sào Khê to our landing!' },
      { who: 'hero', dinhbolinh: ['Núi non Hoa Lư là thành, sông suối là hào. Kẻ nào lọt vào, đừng hòng ra!', 'These mountains are our walls, these streams our moat. Whoever creeps in here won\'t get out!'],
        nguyenbac: ['Để Bặc này mở đường! Bến sông phải sạch bóng giặc trước khi trời sáng hẳn.', 'Let Bặc clear the way! The landing will be free of them before the sun is up.'] },
      { who: 'ally', dinhbolinh: ['Chủ tướng, Bặc theo sau. Cứ đánh cho thỏa!', 'I\'m right behind you. Fight as hard as you like!'],
        nguyenbac: ['Bặc, đi đi! Ta giữ thành, chờ tin thắng của em.', 'Go, Bặc! I\'ll hold the citadel and wait for word of your victory.'] },
    ],
  },
  {
    when: [{ zone: 'saokhe' }, { kos: 50 }],
    waves: true,
    say: [
      { who: 'soldier', zh: 'Quân Đinh kéo ra rồi! Giữ lấy bến, đợi thuyền sau tới!', en: 'The Đinh are coming! Hold the landing until the next boats arrive!' },
      { who: 'dinhsoldier', zh: 'Giặc đông ở hai đầu cầu! Coi chừng cả hai bến lội!', en: 'They\'re thick at both ends of the bridge! Watch the fords too!' },
    ],
  },
  {
    when: [{ kos: 60, wait: 15 * 60 }, { wait: 55 * 60 }],
    officers: { thuyquan: { at: ['landing', 0, 16], engaged: true } },
    obj: { zh: 'Hạ đô úy thủy quân nhà Ngô', en: 'Defeat the Ngô river captain', go: 'thuyquan' },
    say: [{ who: 'thuyquan', zh: 'Ta dẫn thuyền rồng vào tận lòng Hoa Lư. Đinh Bộ Lĩnh, ngươi hết đường lui!', en: 'I\'ve brought dragon boats into the heart of Hoa Lư. Đinh Bộ Lĩnh, there\'s nowhere left to run!' }],
  },
  {
    when: { down: 'thuyquan' },
    banner: { html: 'Bến <em>Sào Khê</em> đã sạch giặc!', en: 'The Sào Khê landing is cleared — the Ngô boats burn', dur: 180 },
    heal: 0.3, morale: 0.12, waves: false, retire: true, hush: true, set: 'boats',
    obj: { zh: 'Dẹp quân Ngô trèo vào thành', en: 'Clear the Ngô who scaled the walls', go: ['yard', 0, 0.2] },
    limit: { z: ['gate', 0, -7], nag: NAG_GATE },
    say: [
      { who: 'dinhsoldier', zh: 'Báo! Giặc bắc thang trèo qua lũy, đang tràn vào sân cổng thành!', en: 'Report! They\'ve laddered the rampart and are pouring into the gate yard!' },
      { who: 'hero', dinhbolinh: ['Đốt hết thuyền giặc! Ra cổng thành!', 'Burn their boats! To the gate!'],
        nguyenbac: ['Thuyền giặc cháy cả rồi. Anh em, theo ta ra cổng!', 'Their boats are ablaze. Men, with me to the gate!'] },
    ],
  },

  // ---- Cổng thành: the ladder parties in the yard, then the sortie
  {
    when: { zone: 'yard' },
    squads: [{ at: ['yard', -0.5, -0.2], n: 18 }, { at: ['yard', 0.5, -0.1], n: 18 }, { at: ['yard', -0.3, 0.55], n: 16, charge: true }, { at: ['yard', 0.35, 0.6], n: 16, charge: true }],
    officers: { tienphong: { at: ['gate', 0, -12], engaged: true } },
    waves: true,
    obj: { zh: 'Hạ tiên phong nhà Ngô', en: 'Defeat the Ngô vanguard', go: 'tienphong' },
    say: [{ who: 'tienphong', zh: 'Mở cổng thành cho đại quân vào! Ai cản thì giết!', en: 'Open the gate for the main army! Cut down anyone in the way!' }],
  },
  {
    when: { down: 'tienphong' },
    gate: 'hoalu', limit: { z: ['siege', 0, -4], nag: NAG_SIEGE }, heal: 0.25, morale: 0.1, retire: true, hush: true,
    banner: { html: 'Mở <em>cổng thành</em> — xuất kích!', en: 'The gate opens — sally out!', dur: 190, big: true },
    obj: { zh: 'Phá lũy vây của nhà Ngô', en: 'Break the Ngô siege lines', go: ['field', 0, -0.3] },
    squads: [{ at: ['field', -0.45, -0.55], n: 22 }, { at: ['field', 0.45, -0.5], n: 22 }, { at: ['field', 0, -0.15], n: 24 }],
    say: [
      { who: 'dinhbolinh', zh: 'Quân Hoa Lư! Vây ta hơn tháng trời, giờ đến lượt ta ra đánh. Mở cổng!', en: 'Men of Hoa Lư! They\'ve penned us in for a month — now it\'s our turn. Open the gate!' },
      { who: 'ally', dinhbolinh: ['Lũy giặc ngay ngoài ruộng kia. Bặc đi bên trái, chủ tướng cứ thẳng đường giữa!', 'Their lines are just past the paddies. I\'ll take the left, you drive straight down the middle!'],
        nguyenbac: ['Bặc, đánh tan lũy giặc cho ta! Cờ lau Hoa Lư theo sau em!', 'Bặc, smash their lines for me! The reed banners of Hoa Lư are behind you!'] },
    ],
  },

  // ---- Lũy vây nhà Ngô: the paddies, then Lã Xử Bình
  {
    when: [{ zone: 'field' }, { kos: 40 }],
    waves: true,
    say: [{ who: 'soldier', zh: 'Quân Đinh mở cổng đánh ra! Mau báo tướng quân Lã Xử Bình!', en: 'The Đinh have opened the gate! Tell General Lã Xử Bình, quickly!' }],
  },
  {
    when: [{ kos: 80, wait: 15 * 60 }, { wait: 60 * 60 }],
    officers: { laxubinh: { at: ['siege', 0, -12], engaged: true } },
    squads: [{ at: ['field', -0.35, 0.45], n: 18, charge: true }, { at: ['field', 0.35, 0.45], n: 18, charge: true }],
    obj: { zh: 'Hạ tướng giữ lũy Lã Xử Bình', en: 'Defeat Lã Xử Bình, keeper of the siege lines', go: 'laxubinh' },
    say: [
      { who: 'laxubinh', zh: 'Lã Xử Bình ở đây! Lũ chăn trâu đất Hoa Lư, dám ra khỏi hang ư?', en: 'Lã Xử Bình is here! So the buffalo boys of Hoa Lư dare crawl out of their caves?' },
      { who: 'hero', dinhbolinh: ['Chăn trâu thì đã sao? Cờ lau ngày ấy, nay là cờ của quân Hoa Lư!', 'And what of it? The reed banners of those days fly over the army of Hoa Lư now!'],
        nguyenbac: ['Muốn qua cửa Hoa Lư, hỏi lưỡi đao của Nguyễn Bặc trước đã!', 'Whoever wants Hoa Lư asks Nguyễn Bặc\'s blade first!'] },
    ],
  },
  {
    when: { down: 'laxubinh' },
    hush: true, retire: true, waves: false, heal: 0.3, morale: 0.1, set: 'hostage',
    limit: { z: ['siege', 0, -5], nag: NAG_POLE },
    banner: { html: 'Quân Ngô treo <em>Đinh Liễn</em> lên ngọn sào!', en: 'The Ngô hoist Đinh Liễn up a pole before their lines!', dur: 230, big: true },
    obj: { zh: 'Đinh Liễn bị treo trên ngọn sào…', en: 'Đinh Liễn is held up on a pole...', go: ['pole', 0, -8] },
    say: [
      { who: 'ngap', zh: 'Đinh Bộ Lĩnh! Con ngươi là Liễn đang ở trong tay ta. Không ra hàng thì ta giết nó ngay trước mắt ngươi!', en: 'Đinh Bộ Lĩnh! Your son Liễn is in my hands. Surrender — or I kill him before your eyes!' },
      { who: 'lien', zh: 'Cha…!', en: 'Father...!' },
      { who: 'hero', nguyenbac: ['Liễn…! Lũ hèn, đem một đứa trẻ ra làm khiên chắn!', 'Liễn...! Cowards — hiding behind a child!'] },
      { who: 'dinhbolinh', zh: '……', en: '...' },
    ],
  },
  {
    when: { wait: 12 * 60 },
    banner: { html: 'Đinh Bộ Lĩnh không cúi đầu', en: 'Đinh Bộ Lĩnh will not bow', dur: 200 },
    say: [
      { who: 'dinhbolinh', zh: 'Đại trượng phu cốt lập công danh, há lại bắt chước đàn bà thương con sao?', en: 'A man of mettle lives to achieve great deeds. Shall I fret over my child like a woman?' },
      { who: 'dinhbolinh', zh: 'Nỏ thủ! Giương nỏ, nhắm thẳng ngọn sào!', en: 'Crossbowmen! Draw, and aim at the pole!' },
      { who: 'ally', dinhbolinh: ['Chủ tướng…! …Phải. Hoa Lư không thể vì một người mà quỳ gối.', 'Sir...! ...No. You\'re right. Hoa Lư cannot kneel for any one man.'] },
      { who: 'hero', nguyenbac: ['Anh Lĩnh…! …Bặc hiểu rồi. Hoa Lư không thể quỳ.', 'Lĩnh...! ...I understand. Hoa Lư cannot kneel.'] },
    ],
  },
  {
    when: { wait: 13 * 60 },
    banner: { html: 'Mười tay nỏ trên thành nhắm thẳng ngọn sào', en: 'On the wall, the crossbows are levelled at the pole', dur: 190 },
    morale: 0.05,
    say: [
      { who: 'van', zh: 'Hắn… hắn sai bắn cả con mình sao?', en: 'He... he\'d have them shoot his own son?' },
      { who: 'ngap', zh: 'Treo con hắn là để bắt hắn hàng. Nay hắn nhẫn tâm đến thế, còn treo làm gì nữa!', en: 'We hung the boy up to make him surrender. If he\'s that hard of heart, what use is it now?' },
    ],
  },
  {
    hero: ['dinhbolinh'],
    when: { wait: 9 * 60 },
    set: 'freed', gate: 'siege', heal: 0.4, morale: 0.22,
    banner: { html: 'Quân Ngô nản lòng, thả <em>Đinh Liễn</em> — sĩ khí quân Đinh dâng cao!', en: 'The Ngô lose heart and let Đinh Liễn go — the Đinh army\'s spirit soars!', dur: 240, big: true },
    actors: {
      lien: { kit: 'dinhlien', role: 'npc', at: ['pole', 3, -7], scale: 0.74, name: { zh: 'Đinh Liễn', en: 'ĐINH LIỄN' }, seal: '璉' },
      bac: { kit: 'nguyenbac', role: 'npc', at: ['pole', 5.5, -8], name: { zh: 'Nguyễn Bặc', en: 'NGUYỄN BẶC' }, seal: '匐' },
    },
    actor: [{ key: 'lien', do: 'retreat', at: ['hero', -2, -40] }, { key: 'bac', do: 'retreat', at: ['hero', 1, -40] }],
    say: [
      { who: 'ally', dinhbolinh: ['Bặc đón được cậu Liễn rồi! Để Bặc đưa cậu về thành, chủ tướng cứ đánh tới!', 'I have young Liễn! I\'ll take him back to the citadel — you press on!'] },
      { who: 'lien', zh: 'Cha! Con không sợ!', en: 'Father! I wasn\'t afraid!' },
      { who: 'hero', dinhbolinh: ['Giỏi lắm, Liễn. …Quân Hoa Lư! Giặc đã mất vía, đánh thẳng vào doanh trại!', 'Well done, Liễn. ...Men of Hoa Lư! They\'ve lost their nerve — straight at their camp!'] },
    ],
  },
  {
    hero: ['nguyenbac'],
    when: { wait: 9 * 60 },
    set: 'freed', gate: 'siege', heal: 0.4, morale: 0.22,
    banner: { html: 'Quân Ngô nản lòng, thả <em>Đinh Liễn</em> — sĩ khí quân Đinh dâng cao!', en: 'The Ngô lose heart and let Đinh Liễn go — the Đinh army\'s spirit soars!', dur: 240, big: true },
    actors: { lien: { kit: 'dinhlien', role: 'npc', at: ['pole', 3, -7], scale: 0.74, name: { zh: 'Đinh Liễn', en: 'ĐINH LIỄN' }, seal: '璉' } },
    actor: { key: 'lien', do: 'retreat', at: ['hero', -2, -40] },
    say: [
      { who: 'hero', nguyenbac: ['Liễn! Chạy về phía cổng thành, anh em ta che cho cháu!', 'Liễn! Run for the gate — our men will cover you!'] },
      { who: 'lien', zh: 'Chú Bặc! Con không sợ!', en: 'Uncle Bặc! I wasn\'t afraid!' },
      { who: 'dinhbolinh', zh: 'Bặc! Giặc đã mất vía. Đánh thẳng vào doanh trại, đừng cho chúng kịp hoàn hồn!', en: 'Bặc! They\'ve lost their nerve. Straight at their camp — don\'t give them time to recover!' },
    ],
  },
  {
    when: { wait: 4 * 60 },
    waves: true, retire: true,
    obj: { zh: 'Hạ Kiều Tri Hựu, phá cửa doanh trại', en: 'Defeat Kiều Tri Hựu and break the camp gate', go: 'kieutrihuu' },
    limit: { z: ['campgate', 0, -3], nag: NAG_CAMP },
    officers: { kieutrihuu: { at: ['campgate', 0, -10] } },
    squads: [{ at: ['siege', -16, 8], n: 18 }, { at: ['siege', 16, 10], n: 18 }, { at: ['campgate', -6, -18], n: 18 }, { at: ['campgate', 6, -16], n: 16 }],
    say: [{ who: 'kieutrihuu', zh: 'Kiều Tri Hựu giữ cửa doanh! Lũ thảo khấu Hoa Lư, lui về hang đi!', en: 'Kiều Tri Hựu holds this gate! Back to your caves, you hill bandits!' }],
  },
  {
    when: { at: ['campgate', 0, -24] },
    skip: { down: 'kieutrihuu' },
    say: [
      { who: 'hero', dinhbolinh: ['Kiều Tri Hựu! Doanh trại của chúa ngươi ở sau lưng ngươi kia. Tránh ra!', 'Kiều Tri Hựu! Your masters\' camp is right behind you. Stand aside!'],
        nguyenbac: ['Kiều Tri Hựu, xem đao Định Quốc của Nguyễn Bặc!', 'Kiều Tri Hựu — taste Nguyễn Bặc\'s glaive!'] },
    ],
  },
  {
    when: { down: 'kieutrihuu' },
    gate: 'camp', limit: { z: null }, heal: 0.3, morale: 0.12, retire: true, hush: true, waves: false,
    banner: { html: '<em>Doanh trại nhà Ngô</em> đã bị phá!', en: 'The Ngô camp gate is broken!', dur: 180 },
    obj: { zh: 'Tiến vào ngự doanh', en: 'Push on to the royal command', go: ['royal', 0, -0.5] },
    squads: [{ at: ['camp', -0.5, 0.2], n: 20 }, { at: ['camp', 0.5, 0.4], n: 20 }, { at: ['camp', 0, 0.75], n: 16 }],
    actors: { van: VAN },
    actor: { key: 'van', do: 'hold' },
    say: [
      { who: 'kieutrihuu', zh: 'Không giữ nổi nữa… Mau báo hai vua!', en: 'We can\'t hold it... Warn the two kings!' },
      { who: 'dinhdien', zh: 'Cửa doanh đã phá! Ngự doanh của Nam Tấn Vương ở ngay phía trước!', en: 'The camp gate is down! Nam Tấn Vương\'s command is just ahead!' },
    ],
  },

  // ---- Ngự doanh: Ngô Xương Văn (boss actor); the drums at half; he breaks off at a quarter and the siege lifts
  {
    when: { zone: 'royal' },
    skip: { down: 'van' },
    banner: { html: 'Nam Tấn Vương <em>Ngô Xương Văn</em>', en: 'Nam Tấn Vương: Ngô Xương Văn', dur: 160, big: true },
    actor: { key: 'van', do: 'join' },
    obj: { zh: 'Đánh lui Ngô Xương Văn', en: 'Drive back Ngô Xương Văn', go: 'van' },
    waves: true,
    say: [
      { who: 'van', dinhbolinh: ['Đinh Bộ Lĩnh! Cha ta dựng nước, ngươi chỉ là kẻ giữ động núi, sao dám chống lại thiên tử?', 'Đinh Bộ Lĩnh! My father raised this kingdom. You keep a cave in the hills — how dare you defy the throne?'],
        nguyenbac: ['Nguyễn Bặc? Chỉ là gia tướng của tên giữ động Hoa Lư. Lui ra!', 'Nguyễn Bặc? The retainer of a hill-cave chief. Out of my way!'] },
      { who: 'hero', dinhbolinh: ['Tiền Ngô Vương đánh tan quân Nam Hán, ai mà không kính. Nhưng ngôi vua không giữ được bằng cách treo con trẻ lên ngọn sào!', 'All revere the Former Ngô King who broke the Southern Han. But a throne isn\'t kept by hanging a child from a pole!'],
        nguyenbac: ['Gia tướng thì sao? Hôm nay gia tướng này đánh lui cả nhà vua!', 'A retainer, am I? Today this retainer drives back a king!'] },
    ],
  },
  {
    when: { below: ['van', 0.55] },
    skip: { down: 'van' },
    banner: { html: 'Trống trận nhà Ngô dồn dập — cấm quân xông ra!', en: 'The Ngô war drums thunder — the royal guard charges!', dur: 170 },
    morale: -0.1,
    squads: [{ at: ['royal', -0.9, 0.4], n: 16, charge: true }, { at: ['royal', 0.9, 0.3], n: 16, charge: true }, { at: ['royal', 0, -0.9], n: 14, charge: true }],
    officers: { guard1: { at: ['royal', -0.5, 0.55], engaged: true, like: 'guard' }, guard2: { at: ['royal', 0.5, 0.55], engaged: true, like: 'guard' } },
    say: [
      { who: 'ngap', zh: 'Đánh trống! Cấm quân đâu, bảo vệ Nam Tấn Vương!', en: 'Beat the drums! Royal guard, protect Nam Tấn Vương!' },
      { who: 'ally', dinhbolinh: ['Bặc đã đưa cậu Liễn vào thành, quay lại rồi đây! Cấm quân để Bặc lo!', 'Liễn is safe inside the walls and I\'m back! Leave the guard to me!'],
        nguyenbac: ['Bặc! Cấm quân để ta. Cứ nhằm Ngô Xương Văn mà đánh!', 'Bặc! I\'ll deal with the guard. Go for Ngô Xương Văn!'] },
    ],
  },
  {
    when: { down: 'van' },
    win: true, waves: false, morale: 1,
    banner: { html: 'Quân Ngô rút lui — <em>vòng vây Hoa Lư</em> đã giải!', en: 'The Ngô withdraw — the siege of Hoa Lư is lifted!', dur: 280, big: true },
    say: [
      { who: 'van', zh: 'Rút quân! Hoa Lư… hôm nay không đánh được.', en: 'Fall back! Hoa Lư... cannot be taken today.' },
      { who: 'hero', dinhbolinh: ['Núi sông Hoa Lư còn đây. Rồi sẽ có ngày non sông này về một mối!', 'The mountains and rivers of Hoa Lư still stand. One day this whole land will be one!'],
        nguyenbac: ['Giặc rút rồi! Anh Lĩnh, Hoa Lư vẫn đứng vững!', 'They\'re pulling out! Lĩnh — Hoa Lư still stands!'] },
    ],
  },
];

// ---- prologue ink map of the northern delta (viewBox 1600×900): the mountains of the north-west and west, the Red River
// (sông Cái / Nhị Hà) running south-east to the sea, the Đáy branching south along the delta's western edge, the
// limestone karst of Hoa Lư in the south-west; Cổ Loa (the Ngô court), Đường Lâm, Bố Hải Khẩu; the coast to the south-east
const peaks = (list, h, w) => list.map(([x, y, k = 1]) =>
  `<path d="M${x - w * k} ${y} Q${x - w * k * 0.35} ${y - h * k * 0.55} ${x} ${y - h * k} Q${x + w * k * 0.3} ${y - h * k * 0.5} ${x + w * k} ${y}Z"/>`).join('');
// karst: tall, narrow, round-shouldered towers
const towers = (list) => list.map(([x, y, h, w]) =>
  `<path d="M${x - w} ${y} C${x - w} ${y - h * 0.7} ${x - w * 0.8} ${y - h} ${x} ${y - h} C${x + w * 0.8} ${y - h} ${x + w} ${y - h * 0.7} ${x + w} ${y}Z"/>`).join('');
const NHIHA = 'M120 40 C260 140 420 210 600 280 S860 380 980 470 S1220 640 1330 760 S1450 860 1500 900';
const DAY = 'M600 282 C560 380 600 470 620 560 S700 720 760 800 S820 880 860 910';
const COAST = 'M640 905 C820 870 980 840 1120 790 S1380 640 1500 560 S1600 480 1620 470';
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${peaks([[60, 260, 1.2], [180, 230], [300, 250, 1.1], [90, 420, 1.1], [220, 400], [140, 560, 1.2], [260, 590], [380, 120, 0.9], [520, 90, 1.1], [700, 70, 0.8]], 120, 90)}
    ${peaks([[160, 760, 1.1], [300, 800], [420, 860, 1.2]], 130, 100)}
    ${peaks([[1120, 120, 0.9], [1280, 100, 1.1], [1440, 140, 0.8]], 90, 80)}
  </g>
  <g class="pl-mark" data-id="hoalu" fill="url(#pl-mtn)" filter="url(#pl-ink)">${towers([[470, 700, 90, 22], [515, 690, 120, 20], [560, 705, 80, 18], [600, 690, 104, 22], [640, 708, 70, 16], [495, 760, 70, 18], [585, 770, 86, 20], [540, 790, 60, 16]])}</g>
  <g class="pl-mark" data-id="nhiha" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${NHIHA}" stroke="#6f7c78" stroke-width="40" opacity=".35"/><path d="${NHIHA}" stroke="#46524f" stroke-width="8" opacity=".7"/>
  </g>
  <g class="pl-mark" data-id="day" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${DAY}" stroke="#6f7c78" stroke-width="18" opacity=".32"/><path d="${DAY}" stroke="#46524f" stroke-width="4" opacity=".65"/>
  </g>
  <g filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${COAST}" stroke="#46524f" stroke-width="5" opacity=".55"/><path d="${COAST} L1620 910 L640 910Z" fill="#6f7c78" opacity=".14" stroke="none"/>
  </g>
  <g class="pl-labels">
    <g class="pl-mark wei" data-id="coloa"><rect x="796" y="262" width="36" height="36" rx="3"/><text x="846" y="292">古螺</text><text class="sm" x="846" y="336">吳二王</text></g>
    <g class="pl-mark" data-id="duonglam"><rect x="420" y="232" width="28" height="28" rx="3"/><text x="330" y="222">唐林</text></g>
    <g class="pl-mark" data-id="bohai"><rect x="1150" y="610" width="28" height="28" rx="3"/><text x="1190" y="636">布海口</text></g>
    <g class="pl-mark" data-id="hoalu"><rect x="548" y="640" width="36" height="36" rx="3"/><text x="430" y="616">華閭</text><text class="sm" x="380" y="664">丁部領</text></g>
    <g class="pl-mark" data-id="lien"><text class="sm" x="740" y="380">丁璉 為質</text></g>
    <g class="pl-mark" data-id="nhiha"><text class="sm river" x="930" y="410">珥 河</text></g>
    <g class="pl-mark" data-id="day"><text class="sm river" x="660" y="520">底 江</text></g>
    <g class="pl-mark" data-id="sea"><text class="sm river" x="1300" y="800">海</text></g>
  </g>`,
  arrows: [
    ['ngo1', 'wei', 'M800 300 C760 420 690 520 610 640'],
    ['ngo2', 'wei', 'M836 310 C860 450 760 560 640 660'],
    ['yang', 'wei', 'M440 260 C560 250 680 262 790 278'],
    ['dinh1', 'shu', 'M566 640 C590 560 650 500 720 450'],
    ['dinh2', 'shu', 'M540 650 C520 560 520 480 560 420'],
  ],
};

// ---- prologue cards (format: chapters.js; `vi` = Vietnamese prose). Card 6 branches on the hero.
export const PROLOGUE = [
  { cols: ['吳王既薨', '楊三哥篡位', '朝綱日弛'], vi: 'Năm 944, Ngô Quyền người Đường Lâm mất. Dương Tam Kha cướp ngôi, triều Ngô ngày một suy yếu.',
    en: '944. Ngô Quyền of Đường Lâm dies; Dương Tam Kha seizes the throne, and the Ngô court falls into decline.',
    show: ['coloa', 'duonglam', 'nhiha', 'yang'], focus: [640, 300, 1.2] },
  { cols: ['南晉王昌文', '迎兄昌岌', '二王共政'], vi: 'Năm 950, Nam Tấn Vương Ngô Xương Văn giành lại ngôi, đón anh là Thiên Sách Vương Ngô Xương Ngập về cùng trị nước.',
    en: '950. Nam Tấn Vương Ngô Xương Văn retakes the throne and calls home his elder brother, Thiên Sách Vương Ngô Xương Ngập, to rule beside him.',
    show: ['coloa'], focus: [820, 320, 1.3] },
  { cols: ['丁部領', '據華閭洞', '山川險固'], vi: 'Ở phía nam, Đinh Bộ Lĩnh giữ động Hoa Lư — núi đá vôi dựng thành vách, sông suối làm hào, một thành lũy trời sinh.',
    en: 'In the south, Đinh Bộ Lĩnh holds Hoa Lư — limestone cliffs for walls, rivers for moats, a fortress made by nature.',
    show: ['hoalu', 'day', 'sea'], focus: [600, 660, 1.3] },
  { cols: ['部領遣子璉', '入朝', '二王執之'], vi: 'Đinh Bộ Lĩnh từng sai con là Đinh Liễn vào triều; hai vua Ngô giữ Liễn lại làm con tin.',
    en: 'Đinh Bộ Lĩnh had sent his son Đinh Liễn to the court; the two Ngô kings kept the boy as a hostage.',
    show: ['lien'], focus: [760, 400, 1.3] },
  { cols: ['辛亥之歲', '二王興師', '來攻華閭'], vi: 'Năm Tân Hợi (951), hai vua cùng các tướng Lã Xử Bình, Kiều Tri Hựu dẫn quân vào đánh Hoa Lư.',
    en: '951. The two kings, with their generals Lã Xử Bình and Kiều Tri Hựu, march on Hoa Lư.',
    show: ['ngo1', 'ngo2'], focus: [700, 500, 1.1] },
  { dinhbolinh: { cols: ['華閭城上', '丁部領', '誓不降吳'], vi: 'Trên thành Hoa Lư, Đinh Bộ Lĩnh quyết không chịu khuất phục nhà Ngô.',
    en: 'On the walls of Hoa Lư, Đinh Bộ Lĩnh vows never to bow to the Ngô.' },
    nguyenbac: { cols: ['阮匐', '少與部領遊', '願為前鋒'], vi: 'Nguyễn Bặc, bạn từ thuở nhỏ của Đinh Bộ Lĩnh, xin đi tiên phong.',
      en: 'Nguyễn Bặc, Đinh Bộ Lĩnh\'s friend since boyhood, asks to lead the van.' },
    show: ['dinh2'], focus: [560, 560, 1.4] },
  { cols: ['圍城月餘', '城終不下', '華閭門開'], vi: 'Vây hơn một tháng mà thành vẫn không hạ. Sáng nay, cổng Hoa Lư mở.',
    en: 'More than a month into the siege, Hoa Lư still stands. This morning, its gate opens.',
    show: ['dinh1'], focus: [640, 540, 1.08] },
];

// ---- result screen epilogue (win), branched on the hero
export const EPILOGUE = {
  dinhbolinh: {
    zh: ['Đánh hơn một tháng không được, hai vua Ngô thả Đinh Liễn rồi rút quân về. Hoa Lư đứng vững giữa núi non.',
      'Câu nói "Đại trượng phu cốt lập công danh" truyền khắp các động. Từ ngọn cờ lau bên bờ Sào Khê, con đường dẹp yên mười hai sứ quân bắt đầu.'],
    en: ['Unable to take it after more than a month, the two Ngô kings released Đinh Liễn and withdrew. Hoa Lư stood firm among its mountains.',
      'His words — "a man of mettle lives to achieve great deeds" — spread through the hill country. From the reed banners by the Sào Khê began the long road to bringing the twelve warlords to heel.'],
  },
  nguyenbac: {
    zh: ['Quân Ngô thả Đinh Liễn và rút khỏi Hoa Lư. Nguyễn Bặc đứng trên cổng thành, nhìn theo đoàn quân lui xa trong sương sớm.',
      'Người bạn chăn trâu thuở nào, từ đây là cánh tay phải của Đinh Bộ Lĩnh trên con đường thống nhất non sông.'],
    en: ['The Ngô released Đinh Liễn and pulled back from Hoa Lư. Nguyễn Bặc stood on the gate and watched their columns fade into the morning mist.',
      'The boyhood friend from the buffalo pastures was, from that day, Đinh Bộ Lĩnh\'s right hand on the road to one realm.'],
  },
};

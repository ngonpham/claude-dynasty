// Màn I «Cờ Lau Qua Quèn Thành» (c. 967) — stage data (format: src/story/chapters.js header; text: Vietnamese in .zh,
// English in .en, Hán in seals and prologue cols — holinh/DESIGN.md §2): metadata, speakers, the battle script (BEATS),
// the prologue over the ink map of the warlord years (PL_MAP) and the epilogues.
// Source: the comic's chapter 1 (all six panels: the land after the warlords, the reed plume on the king's helmet, the
// three-beat spearhead — Right General locks the left, Left General breaks the wooden gate, the king drives through —,
// the rival general laying down his sword, the twelve banners coming down before one great reed banner, the storks over
// the Hoa Lư banner years later), chapter 13 panel 1 (the same sparing seen in flashback: "dùng đời sau để tự trả lời
// mình") and chapter 2 panel 1 (the king). History (comic D1): Đinh Bộ Lĩnh brought the twelve warlords to heel by 967 and
// took the throne in 968. Quèn Thành, its warlord (never named), the two generals and Hàng Tướng are the comic's
// fiction; the reed banners of Đinh Bộ Lĩnh's boyhood are legend. Tone: the sparing is the climax, not a kill.
// Played as either general: `hero` = the chosen one, `ally` = the other (pixel portrait). Each leads his own beat of the
// spearhead; the other's beat is fought beside him by the partner as an allied actor.
// Map (holinh/src/world/maps/quenthanh.js): gate 'congo' (the wooden gate, shut at the start); anchors 'plume', 'khien',
// 'cong', 'coA', 'coB', 'coC', 'reed', 'go'; sets 'shields', 'banners' (×3: four banners each), 'reed', 'yield'.

export const CH = {
  id: 'quenthanh', num: { zh: 'Màn I', en: 'STAGE I' }, title: { zh: 'Cờ Lau Qua Quèn Thành', en: 'The Reed Banner over Quèn Thành' },
  seal: '蘆旗', era: { zh: 'Khoảng năm 967', en: 'c. 967 AD' }, map: 'quenthanh',
  heroes: ['huutuong', 'tatuong'],
  ally: { huutuong: 'tatuong', tatuong: 'huutuong' },
  army: { foe: 'suquan', ally: 'dinh' },
  // the Đinh ranks either side of the camp road, holding until the hero marches past
  van: [{ x: -5.5, z: -164, n: 12, cols: 4, hold: true }, { x: 5.5, z: -164, n: 12, cols: 4, hold: true }],
  hq: [0, 178],                                    // the warlord's pavilion on the mound
  rank: { kos: [400, 800, 1200], time: [480, 660, 840] },   // tuned to the pacing note above BEATS
};

export const SPK = {
  vua: { name: { zh: 'Đinh Bộ Lĩnh', en: 'Đinh Bộ Lĩnh' }, seal: '丁', side: 'shu', char: 'dinhtienhoang' },
  dinhsoldier: { name: { zh: 'Lính nhà Đinh', en: 'Đinh Soldier' }, seal: '兵', side: 'shu' },
  khienthu: { name: { zh: 'Đội trưởng khiên', en: 'Shield Captain' }, seal: '盾', side: 'shu' },
  // the rival general before he yields: Hàng Tướng's portrait under his old title (after: who 'hangtuong', his own name)
  tuongqt: { name: { zh: 'Tướng Quèn Thành', en: 'General of Quèn Thành' }, seal: '雄將', side: 'wei', char: 'hangtuong' },
  photuong: { name: { zh: 'Phó tướng', en: 'Lieutenant' }, seal: '副', side: 'wei' },
  kytuong: { name: { zh: 'Kỵ tướng Quèn Thành', en: 'Quèn Thành Rider' }, seal: '騎', side: 'wei' },
  tuongcanh: { name: { zh: 'Tướng đánh tạt sườn', en: 'Flank Captain' }, seal: '翼', side: 'wei' },
  tuongchong: { name: { zh: 'Tướng giữ bãi chông', en: 'Stake-Field Captain' }, seal: '柵', side: 'wei' },
  giucong: { name: { zh: 'Tướng giữ cổng', en: 'Gate Keeper' }, seal: '門', side: 'wei' },
  giuco: { name: { zh: 'Người giữ cờ', en: 'Banner Keeper' }, seal: '旗', side: 'wei' },
  soldier: { name: { zh: 'Lính sứ quân', en: 'Warlord\'s Soldier' }, seal: '兵', side: 'wei' },
};

// crowd officers (HP: a default officer 520 ≈ 5 full combos). Looks: the warlord host's weathered green-brown and rust
// (crowd/armies.js 'suquan'), each his own helm and plume.
export const OFF = {
  kytuong: { name: { zh: 'Kỵ tướng Quèn Thành', en: 'QUÈN THÀNH RIDER' }, hp: 620, look: { helm: 'wing', armor: 0x2e3220, trim: 0xc8a048, cape: 0x5a6a2e, plume: 0xe6dcc0 } },
  tuongcanh: { name: { zh: 'Tướng đánh tạt sườn', en: 'FLANK CAPTAIN' }, hp: 680, look: { helm: 'horn', armor: 0x34381e, trim: 0xb89a48, cape: 0x6a3a1a, plume: 0x8a3a1e } },
  tuongchong: { name: { zh: 'Tướng giữ bãi chông', en: 'STAKE-FIELD CAPTAIN' }, hp: 680, look: { helm: 'wing', armor: 0x3a3424, trim: 0xb09a58, cape: 0x4a5228, plume: 0x8a3a1e } },
  giucong: { name: { zh: 'Tướng giữ cổng', en: 'GATE KEEPER' }, hp: 900, look: { helm: 'horn', armor: 0x262a1a, trim: 0xd0a850, cape: 0x3a4220, plume: 0xe6dcc0 } },
  coA: { name: { zh: 'Người giữ cờ trại tây', en: 'WEST BANNER KEEPER' }, hp: 600, look: { helm: 'crest', armor: 0x34381e, trim: 0xb89a48, cape: 0x6a3a1a, plume: 0x8a3a1e } },
  coB: { name: { zh: 'Người giữ cờ trại đông', en: 'EAST BANNER KEEPER' }, hp: 600, look: { helm: 'crest', armor: 0x3a3424, trim: 0xa88a4a, cape: 0x5a5030, plume: 0xe6dcc0 } },
  coC: { name: { zh: 'Người giữ cờ trại bắc', en: 'NORTH BANNER KEEPER' }, hp: 680, look: { helm: 'cap', armor: 0x262a1a, trim: 0xd0b060, cape: 0x7a5a2a } },
  thanbinh: { name: { zh: 'Thân binh giữ gò', en: 'MOUND GUARD' }, hp: 340, look: { helm: 'crest', armor: 0x1e2214, trim: 0xd0a850, cape: 0x2a3216, plume: 0xe6dcc0 } },
};

// allied actors: the king (NPC kit, polearm) and the partner general for the beat the hero does not lead. The rival
// general: a boss actor (Hàng Tướng's own CHARS kit, the halberd) who breaks at a quarter — and yields instead of fleeing.
const VUA = { kit: 'dinhtienhoang', role: 'ally', name: { zh: 'Đinh Bộ Lĩnh', en: 'ĐINH BỘ LĨNH' }, seal: '丁' };
const TUONG = { kit: 'hangtuong', role: 'boss', at: ['go', 0, 6], yaw: Math.PI, hp: 3600, poise: 420, retreatAt: 0.25,
  name: { zh: 'Tướng Quèn Thành', en: 'GENERAL OF QUÈN THÀNH' }, seal: '雄將' };

const NAG = { who: 'vua', zh: 'Khoan! Đồng lầy chưa sạch giặc, chớ một mình xông lên.', en: 'Wait! The paddies aren\'t cleared. Don\'t charge on alone.' };
const NAG_GATE = { who: 'vua', zh: 'Cổng gỗ còn cài then. Hạ tên giữ cổng trước!', en: 'The wooden gate is still barred. Bring down its keeper first!' };
const NAG_FLAGS = { who: 'vua', zh: 'Mười hai lá cờ còn đứng. Chưa hạ hết cờ, chưa lên gò!', en: 'Twelve banners still stand. Not up the mound until they\'re down!' };

// Pacing (default difficulty): a scripted bot that attacks nonstop clears in ≈ 6 min (paddies 70 s · the flank or the
// stake field 60 s · the gate 40 s · the twelve banners ≈ 90 s · the duel ≈ 80 s + the sparing scene 30 s); a human
// reading the dialogue and steering lands at ≈ 9-12 min. Officers come forward only after the hero has fought a while
// (kos / wait), so rushing shortens a stage but never skips one. Rank thresholds: CH.rank.
export const BEATS = [
  // ---- Doanh trại nhà Đinh: the reed plume on the king's helmet
  {
    when: { wait: 30 },
    actors: { vua: { ...VUA, at: ['plume', 0, 5] } },
    actor: { key: 'vua', do: 'hold' },
    banner: { html: 'Đinh Bộ Lĩnh cài một <em>bông lau</em> lên mũ trụ', en: 'Đinh Bộ Lĩnh pins a white reed plume to his helmet', dur: 200 },
    obj: { zh: 'Theo cờ lau tiến qua đồng lầy', en: 'Follow the reed banners across the paddies', go: ['ruong', 0, -0.3] },
    squads: [{ at: ['ruong', -0.45, -0.3], n: 20 }, { at: ['ruong', 0.45, -0.25], n: 20 }, { at: ['ruong', -0.25, 0.35], n: 22 }, { at: ['ruong', 0.3, 0.4], n: 20 }],
    limit: { z: ['chong', 0, -0.9], nag: NAG },
    morale: 0,
    say: [
      { who: 'vua', zh: 'Thuở chăn trâu ở Hoa Lư, ta bẻ bông lau làm cờ, bày trận giả với lũ trẻ.', en: 'As a herd boy at Hoa Lư, I broke off reed plumes for banners and drilled the other boys in mock battles.' },
      { who: 'vua', zh: 'Hôm nay cờ lau ấy qua Quèn Thành. Đây là trận cuối của thời loạn!', en: 'Today that reed banner crosses Quèn Thành. This is the last battle of the troubled years!' },
      { who: 'hero', huutuong: ['Hữu dực đã sẵn. Cánh trái, để tôi khóa.', 'The right wing is ready. The left flank — I\'ll lock it.'],
        tatuong: ['Tả dực đã sẵn. Cổng gỗ kia, để tôi phá.', 'The left wing is ready. That wooden gate — I\'ll break it.'] },
      { who: 'ally', huutuong: ['Anh giữ sườn, tôi mở cửa. Gặp nhau trong sân trại!', 'You hold the flank, I\'ll open the door. We meet in their yard!'],
        tatuong: ['Đừng lo sườn trái. Khiên của tôi chưa từng lùi.', 'Don\'t worry about the left. My shields have never given ground.'] },
    ],
  },
  {
    when: [{ zone: 'ruong' }, { kos: 40 }],
    waves: true,
    say: [
      { who: 'soldier', zh: 'Quân Đinh lội qua ruộng rồi! Giữ lấy bờ đê!', en: 'The Đinh are wading the paddies! Hold the dikes!' },
      { who: 'dinhsoldier', zh: 'Bùn ngập đến gối! Bám theo bờ đê mà tiến!', en: 'The mud\'s knee-deep! Keep to the dikes and push on!' },
    ],
  },
  {
    when: [{ kos: 60, wait: 15 * 60 }, { wait: 55 * 60 }],
    officers: { kytuong: { at: ['ruong', 0.1, 0.55], engaged: true } },
    squads: [{ at: ['ruong', -0.4, 0.6], n: 16, charge: true }, { at: ['ruong', 0.45, 0.6], n: 16, charge: true }],
    obj: { zh: 'Hạ kỵ tướng Quèn Thành', en: 'Defeat the Quèn Thành rider', go: 'kytuong' },
    say: [
      { who: 'kytuong', zh: 'Bùn Quèn Thành là mồ của quân Đinh! Không ai lội qua nổi!', en: 'The mud of Quèn Thành is the Đinh army\'s grave! No one wades through it!' },
      { who: 'hero', huutuong: ['Bùn này ta đã lội qua mười trận. Thêm một trận nữa thôi.', 'I\'ve waded mud like this through ten battles. One more.'],
        tatuong: ['Bùn ngập gối thì giáo càng phải vững!', 'Knee-deep mud only means a steadier spear!'] },
    ],
  },
  {
    when: { down: 'kytuong' },
    banner: { html: '<em>Đồng lầy</em> đã thông!', en: 'The paddies are taken!', dur: 170 },
    heal: 0.25, morale: 0.1, waves: false, retire: true, hush: true, set: 'shields',
    say: [{ who: 'dinhsoldier', zh: 'Báo! Cánh trái có giặc — một toán theo thung lũng bên sườn đánh tạt vào!', en: 'Report! Enemies on the left — a column is coming down the side valley at our flank!' }],
  },

  // ---- the spearhead, beat one: the Right General locks the left flank (hero Hữu Tướng: he holds it himself)
  {
    hero: ['huutuong'],
    when: { wait: 3 * 60 },
    obj: { zh: 'Khóa cánh trái: giữ tuyến khiên', en: 'Lock the left flank: hold the shield line', go: ['khien', 3, 0] },
    defend: { key: 'khien', at: ['khien', 0, 0], r: 7, hp: 700, name: { zh: 'Tuyến khiên cánh trái', en: 'Left-Flank Shield Line' } },
    fail: { when: { hp: ['khien', 0.01] }, zh: 'Tuyến khiên cánh trái đã vỡ…', en: 'The left-flank shield line has broken...' },
    squads: [{ at: ['khien', 24, -14], n: 18, charge: true }, { at: ['khien', 26, 12], n: 18, charge: true }, { at: ['khien', 14, 0], n: 14 }],
    waves: true,
    say: [
      { who: 'vua', zh: 'Hữu Tướng! Cánh trái giao cho ngươi. Khóa chặt nó lại!', en: 'Right General! The left flank is yours. Lock it tight!' },
      { who: 'hero', huutuong: ['Khiên lên! Đứng vào hàng — không ai lùi một bước!', 'Shields up! Into line — no one gives a step!'] },
      { who: 'khienthu', zh: 'Tuân lệnh! Khiên đã dựng!', en: 'Yes, sir! The shields are up!' },
    ],
  },
  {
    hero: ['huutuong'],
    when: [{ kos: 50, wait: 20 * 60 }, { wait: 50 * 60 }],
    officers: { tuongcanh: { at: ['khien', 18, 0], engaged: true } },
    squads: [{ at: ['khien', 24, -10], n: 16, charge: true }, { at: ['khien', 24, 10], n: 16, charge: true }],
    obj: { zh: 'Hạ tướng đánh tạt sườn', en: 'Defeat the flank captain', go: 'tuongcanh' },
    say: [
      { who: 'tuongcanh', zh: 'Phá tuyến khiên! Vòng ra sau lưng quân Đinh!', en: 'Break the shield line! Get round behind the Đinh!' },
      { who: 'hero', huutuong: ['Sườn này đã khóa. Muốn qua thì bước qua ta.', 'This flank is locked. To pass, you go through me.'] },
    ],
  },
  {
    hero: ['huutuong'],
    when: { down: 'tuongcanh' },
    defend: null, fail: null, heal: 0.3, morale: 0.1, retire: true, hush: true, waves: true,
    banner: { html: 'Hữu Tướng <em>khóa cánh trái</em>!', en: 'The Right General locks the left flank!', dur: 200, big: true },
    obj: { zh: 'Qua bãi chông, hội quân trước cổng gỗ', en: 'Cross the stake field and join up before the wooden gate', go: ['cong', 0, -10] },
    limit: { z: ['cong', 0, -4], nag: NAG_GATE },
    actors: { tatuong: { kit: 'tatuong', role: 'ally', at: ['cong', 5, -14] } },
    actor: { key: 'tatuong', do: 'hold', at: ['cong', 3, -8] },
    squads: [{ at: ['chong', -0.5, -0.4], n: 18 }, { at: ['chong', 0.5, -0.3], n: 18 }, { at: ['chong', -0.3, 0.45], n: 18 }, { at: ['chong', 0.35, 0.5], n: 16 }],
    say: [
      { who: 'khienthu', zh: 'Cánh trái vững như núi! Hữu Tướng cứ đi!', en: 'The left stands like a mountain! Go, Right General!' },
      { who: 'ally', huutuong: ['Hữu Tướng! Tôi đã tới cổng gỗ. Dọn tên giữ cổng, phần còn lại để tôi!', 'Right General! I\'m at the wooden gate. Clear its keeper — leave the rest to me!'] },
    ],
  },
  // (hero Tả Tướng: the Right General holds the flank beside his shields while the hero goes on to the gate)
  {
    hero: ['tatuong'],
    when: { wait: 3 * 60 },
    actors: { huutuong: { kit: 'huutuong', role: 'ally', at: ['khien', -3, 2] } },
    actor: { key: 'huutuong', do: 'hold', at: ['khien', 2, 0] },
    obj: { zh: 'Tiến qua bãi chông, đến cổng gỗ', en: 'Advance through the stake field to the wooden gate', go: ['cong', 0, -10] },
    limit: { z: ['cong', 0, -4], nag: NAG_GATE },
    squads: [{ at: ['chong', -0.5, -0.4], n: 18 }, { at: ['chong', 0.5, -0.3], n: 18 }, { at: ['chong', -0.3, 0.45], n: 18 }, { at: ['chong', 0.35, 0.5], n: 16 }],
    waves: true,
    say: [
      { who: 'vua', zh: 'Hữu Tướng giữ sườn trái. Tả Tướng — cổng gỗ là của ngươi!', en: 'The Right General holds the left. Left General — the wooden gate is yours!' },
      { who: 'ally', tatuong: ['Khiên lên! Cánh trái đã khóa. Tả Tướng, cứ tiến!', 'Shields up! The left is locked. Left General, go!'] },
      { who: 'hero', tatuong: ['Anh em, theo ta! Thẳng tới cổng gỗ!', 'Men, with me! Straight for the wooden gate!'] },
    ],
  },
  {
    hero: ['tatuong'],
    when: [{ zone: 'chong' }, { kos: 40 }],
    say: [
      { who: 'soldier', zh: 'Giữ bãi chông! Không để chúng tới cổng!', en: 'Hold the stake field! Don\'t let them reach the gate!' },
      { who: 'khienthu', zh: 'Bên này khiên vẫn vững! Tả Tướng cứ yên tâm!', en: 'The shields are holding here! Don\'t look back, Left General!' },
    ],
  },

  {
    hero: ['tatuong'],
    when: [{ kos: 50, wait: 15 * 60 }, { wait: 45 * 60 }],
    officers: { tuongchong: { at: ['chong', 0.3, 0.15], engaged: true } },
    squads: [{ at: ['chong', -0.4, 0.3], n: 16, charge: true }, { at: ['chong', 0.5, 0.35], n: 16, charge: true }],
    obj: { zh: 'Hạ tướng giữ bãi chông', en: 'Defeat the captain of the stake field', go: 'tuongchong' },
    say: [
      { who: 'tuongchong', zh: 'Chông tre cắm ba lớp! Lũ Đinh muốn tới cổng thì bò qua đây!', en: 'Three rows of bamboo stakes! If the Đinh want the gate, they can crawl through!' },
      { who: 'hero', tatuong: ['Chông cắm cho ngựa. Ta đi bộ.', 'Stakes are for horses. I\'m on foot.'] },
    ],
  },
  {
    hero: ['tatuong'],
    when: { down: 'tuongchong' },
    heal: 0.2, morale: 0.08, hush: true,
    banner: { html: '<em>Bãi chông</em> đã thông!', en: 'The stake field is cleared!', dur: 170 },
    obj: { zh: 'Đến cổng gỗ', en: 'On to the wooden gate', go: ['cong', 0, -10] },
  },

  // ---- the spearhead, beat two: the Left General breaks the wooden gate
  {
    when: [{ near: [['cong', 0, -12], 24], kos: 20 }, { kos: 90 }, { wait: 70 * 60 }],
    officers: { giucong: { at: ['cong', 0, -9], engaged: true } },
    squads: [{ at: ['cong', -14, -10], n: 16, charge: true }, { at: ['cong', 14, -10], n: 16, charge: true }],
    obj: { zh: 'Hạ tướng giữ cổng gỗ', en: 'Defeat the keeper of the wooden gate', go: 'giucong' },
    say: [
      { who: 'giucong', zh: 'Cổng gỗ Quèn Thành chưa từng mở cho ai! Lui về!', en: 'The wooden gate of Quèn Thành has never opened for anyone! Back!' },
      { who: 'hero', huutuong: ['Hôm nay nó mở. Tả Tướng đang đợi sau lưng ta.', 'It opens today. The Left General is right behind me.'],
        tatuong: ['Chưa từng mở thì hôm nay mở!', 'Never opened? Then today it does!'] },
    ],
  },
  {
    when: { down: 'giucong' },
    gate: 'congo', heal: 0.25, morale: 0.12, retire: true, hush: true, limit: { z: ['san', 0, 0.9], nag: NAG_FLAGS },
    banner: { html: 'Tả Tướng <em>phá cổng gỗ</em>!', en: 'The Left General breaks the wooden gate!', dur: 210, big: true },
    say: [
      { who: 'hero', tatuong: ['Then cài gãy rồi! Một nhát giáo nữa… Đổ!', 'The bar\'s snapped! One more blow... Down it goes!'] },
      { who: 'ally', huutuong: ['Tránh ra! … Hây! Cổng đổ rồi!', 'Stand clear! ...Hah! The gate is down!'] },
    ],
  },

  // ---- the spearhead, beat three: the king drives through the gap; the twelve banners come down
  {
    when: { wait: 3 * 60 },
    actors: { vua: { ...VUA, at: ['cong', -3, -12] } },
    actor: [{ key: 'vua', do: 'join' }, { key: 'tatuong', do: 'join' }],
    banner: { html: 'Ba nhịp quân khớp nhau như <em>một lưỡi giáo</em>', en: 'Three beats of the army strike as one spear', dur: 210, big: true },
    obj: { zh: 'Đánh đổ mười hai lá cờ sứ quân (0/12): hạ người giữ cờ trại tây', en: 'Bring down the twelve banners (0/12): defeat the west banner keeper', go: 'coA' },
    officers: { coA: { at: ['coA', 0, 0], engaged: true } },
    squads: [{ at: ['san', -0.45, -0.4], n: 20 }, { at: ['san', 0.45, -0.35], n: 20 }, { at: ['coA', 6, 8], n: 16, charge: true }, { at: ['san', 0, 0.2], n: 18 }],
    waves: true,
    say: [
      { who: 'vua', zh: 'Hữu dực khóa, tả dực mở, trung quân xuyên thẳng. Theo ta!', en: 'The right wing locks, the left wing opens, the centre drives straight through. With me!' },
      { who: 'hero', huutuong: ['Mười hai lá cờ trong sân kia. Hạ từng lá một!', 'Twelve banners in that yard. We take them down one by one!'],
        tatuong: ['Cờ của mười hai trại! Đánh đổ chúng, giặc tự tan!', 'The banners of twelve camps! Bring them down and their men will scatter!'] },
      { who: 'giuco', zh: 'Giữ cờ! Cờ còn thì trại còn!', en: 'Guard the banners! While they stand, the camps stand!' },
    ],
  },
  {
    when: { down: 'coA' },
    set: 'banners', heal: 0.15, morale: 0.08,
    banner: { html: 'Bốn lá cờ <em>trại tây</em> lần lượt hạ xuống', en: 'One by one, the four banners of the west camps come down', dur: 180 },
    obj: { zh: 'Đánh đổ mười hai lá cờ sứ quân (4/12): hạ người giữ cờ trại đông', en: 'Bring down the twelve banners (4/12): defeat the east banner keeper', go: 'coB' },
    officers: { coB: { at: ['coB', 0, 0], engaged: true } },
    squads: [{ at: ['coB', -6, -10], n: 18, charge: true }, { at: ['coB', 4, 12], n: 18 }],
    say: [
      { who: 'soldier', zh: 'Cờ trại tây… đổ rồi!', en: 'The west camps\' banners... they\'re down!' },
      { who: 'vua', zh: 'Cờ đổ, người chớ đổ theo. Ai buông vũ khí thì để họ đi!', en: 'The banners fall — let the men live. Whoever drops his weapon, let him go!' },
    ],
  },
  {
    when: { down: 'coB' },
    set: 'banners', heal: 0.15, morale: 0.08,
    banner: { html: 'Bốn lá cờ <em>trại đông</em> lần lượt hạ xuống', en: 'One by one, the four banners of the east camps come down', dur: 180 },
    obj: { zh: 'Đánh đổ mười hai lá cờ sứ quân (8/12): hạ người giữ cờ trại bắc', en: 'Bring down the twelve banners (8/12): defeat the north banner keeper', go: 'coC' },
    officers: { coC: { at: ['coC', 0, 0], engaged: true } },
    squads: [{ at: ['coC', -12, -8], n: 18, charge: true }, { at: ['coC', 12, -6], n: 18, charge: true }],
    say: [
      { who: 'giuco', zh: 'Lá cờ cuối phải đứng! Tướng quân còn trên gò kia!', en: 'The last banners must stand! The general is still on the mound!' },
      { who: 'ally', huutuong: ['Còn bốn lá! Tôi che bên trái cho anh!', 'Four left! I\'ll cover your left!'],
        tatuong: ['Còn bốn lá! Khiên đã khóa sườn, cứ đánh tới!', 'Four left! The flank is locked — strike on!'] },
    ],
  },
  {
    when: { down: 'coC' },
    set: 'banners', waves: false, retire: true, hush: true, heal: 0.2,
    obj: { zh: 'Mười hai lá cờ đang hạ…', en: 'The twelve banners are coming down...' },
    say: [{ who: 'soldier', zh: 'Cờ… cờ hạ hết rồi…', en: 'The banners... they\'re all coming down...' }],
  },
  {
    when: { wait: 4 * 60 },
    set: 'reed', morale: 0.2, heal: 0.3, limit: { z: null },
    banner: { html: 'Mười hai lá cờ đã hạ — <em>cờ lau</em> dựng giữa trại!', en: 'The twelve banners are down — the reed banner rises over the yard!', dur: 260, big: true },
    obj: { zh: 'Lên gò chỉ huy', en: 'Climb the command mound', go: ['go', 0, -0.6] },
    actors: { hangtuong: TUONG },
    actor: { key: 'hangtuong', do: 'hold' },
    squads: [{ at: ['go', -0.55, -0.1], n: 16 }, { at: ['go', 0.55, -0.05], n: 16 }],
    say: [
      { who: 'vua', zh: 'Mười hai lá cờ, mười hai phương. Từ nay chỉ còn một hiệu lệnh.', en: 'Twelve banners, twelve quarters. From now on there is one command.' },
      { who: 'photuong', zh: 'Tướng quân! Sứ quân đã bỏ trại đi từ đêm qua… Ta còn giữ gò làm gì?', en: 'General! Our lord abandoned the camp last night... What are we holding this mound for?' },
      { who: 'tuongqt', zh: 'Quân sĩ còn đứng đây thì ta còn đứng đây.', en: 'While my men stand here, so do I.' },
    ],
  },

  // ---- Gò chỉ huy: the rival general (boss actor), the king fighting beside the hero; at a quarter he yields
  {
    when: { zone: 'go' },
    skip: { down: 'hangtuong' },
    banner: { html: '<em>Tướng Quèn Thành</em> giữ gò chỉ huy', en: 'The General of Quèn Thành holds the command mound', dur: 170, big: true },
    actor: { key: 'hangtuong', do: 'join' },
    obj: { zh: 'Đánh bại tướng Quèn Thành', en: 'Defeat the General of Quèn Thành', go: 'hangtuong' },
    waves: true,
    say: [
      { who: 'tuongqt', huutuong: ['Hữu Tướng nhà Đinh. Khiên của ngươi vững — xem kích của ta có vững hơn không!', 'The Đinh Right General. Your shields held — let\'s see if my halberd holds better!'],
        tatuong: ['Kẻ phá cổng gỗ đây sao? Cổng gỗ thì gãy, ta thì chưa!', 'So you\'re the one who broke the gate? The gate gave way. I haven\'t!'] },
      { who: 'vua', zh: 'Một viên tướng giữ quân khi chủ đã bỏ đi… Đánh cho ông ta thấy, nhưng chớ lấy mạng!', en: 'A general who stays with his men when his lord has fled... Beat him — but don\'t take his life!' },
    ],
  },
  {
    when: { below: ['hangtuong', 0.55] },
    skip: { down: 'hangtuong' },
    banner: { html: 'Thân binh giữ gò xông ra!', en: 'The mound guard charges!', dur: 160 },
    morale: -0.06,
    squads: [{ at: ['go', -0.85, 0.3], n: 14, charge: true }, { at: ['go', 0.85, 0.3], n: 14, charge: true }],
    officers: { thanbinh1: { at: ['go', -0.45, 0.5], engaged: true, like: 'thanbinh' }, thanbinh2: { at: ['go', 0.45, 0.5], engaged: true, like: 'thanbinh' } },
    say: [
      { who: 'photuong', zh: 'Bảo vệ tướng quân!', en: 'Protect the general!' },
      { who: 'ally', huutuong: ['Thân binh để tôi! Anh cứ nhằm ông ta!', 'Leave the guard to me! Go for him!'],
        tatuong: ['Thân binh để tôi lo! Anh cứ đánh!', 'I\'ll handle the guard! Keep at him!'] },
    ],
  },
  {
    when: { down: 'hangtuong' },
    hush: true, retire: true, waves: false, morale: 0.2, set: 'yield',
    buff: { def: 60, dur: 50 },                                                        // the scene: no stray blow lands
    actors: { hangtuong: { kit: 'hangtuong', role: 'npc', at: ['go', 0, 4], yaw: Math.PI, name: { zh: 'Tướng Quèn Thành', en: 'GENERAL OF QUÈN THÀNH' }, seal: '雄將' } },
    actor: [{ key: 'hangtuong', do: 'hold' }, { key: 'vua', do: 'hold', at: ['go', 2.5, 1] }],
    banner: { html: 'Tướng Quèn Thành quỳ xuống, <em>đặt gươm vào bùn</em>', en: 'The General of Quèn Thành kneels and lays his sword in the mud', dur: 230, big: true },
    obj: { zh: 'Kẻ đối địch đã buông vũ khí — đến bên ông', en: 'The enemy has laid down his arms — go to him', go: ['go', 0, 1.5] },
    say: [{ who: 'tuongqt', zh: 'Mười hai lá cờ đã hạ. Ta… xin buông gươm.', en: 'The twelve banners are down. I... lay down my sword.' }],
  },
  {
    when: [{ near: [['go', 0, 4], 7] }, { wait: 20 * 60 }],
    banner: { html: 'Đinh Bộ Lĩnh <em>đỡ ông đứng dậy</em>', en: 'Đinh Bộ Lĩnh lifts him to his feet', dur: 220 },
    say: [
      { who: 'vua', zh: 'Người thắng không chém kẻ đã buông gươm. Đứng dậy!', en: 'The victor does not strike a man who has laid down his sword. Stand up!' },
      { who: 'vua', zh: 'Ta không cần đầu ngươi. Ta cần ngươi dùng đời sau để tự trả lời mình.', en: 'I don\'t want your head. I want you to spend the rest of your life answering for yourself.' },
      { who: 'hangtuong', zh: 'Mạng này vua đã tha… từ nay là của đất này.', en: 'This life the king has spared... from today it belongs to this land.' },
      { who: 'hero', huutuong: ['Hàng ngũ còn chỗ. Đứng vào đi.', 'There\'s room in the ranks. Take your place.'],
        tatuong: ['Đứng dậy đi. Hàng ngũ còn chỗ cho một ngọn kích.', 'On your feet. The ranks have room for one more halberd.'] },
    ],
  },
  {
    when: { wait: 17 * 60 },
    win: true, morale: 1,
    banner: { html: 'Cờ lau qua Quèn Thành — <em>non sông chung một hiệu lệnh</em>', en: 'The reed banner crosses Quèn Thành — one command for the whole land', dur: 300, big: true },
    say: [{ who: 'vua', zh: 'Nhặt gươm lên. Từ nay nó đứng về phía đất này.', en: 'Pick up your sword. From today it stands for this land.' }],
  },
];

// ---- prologue ink map of the warlord years (viewBox 1600×900): the northern mountains, the Red River (珥河) running
// south-east to the sea, the Đáy (底江) along the delta's western edge, the karst country of the south-west — Hoa Lư and,
// in a valley north-west of it, Quèn Thành (雄營: the warlord's stockade; its name has no Hán of its own); the twelve
// banners scattered over the delta (data-id 'cos'), the Đinh arrows going out from Hoa Lư
const peaks = (list, h, w) => list.map(([x, y, k = 1]) =>
  `<path d="M${x - w * k} ${y} Q${x - w * k * 0.35} ${y - h * k * 0.55} ${x} ${y - h * k} Q${x + w * k * 0.3} ${y - h * k * 0.5} ${x + w * k} ${y}Z"/>`).join('');
const towers = (list) => list.map(([x, y, h, w]) =>
  `<path d="M${x - w} ${y} C${x - w} ${y - h * 0.7} ${x - w * 0.8} ${y - h} ${x} ${y - h} C${x + w * 0.8} ${y - h} ${x + w} ${y - h * 0.7} ${x + w} ${y}Z"/>`).join('');
// a small tattered banner on its pole at (x, y)
const flagMark = ([x, y]) => `<path d="M${x} ${y} v-44" stroke="#2e2620" stroke-width="3" fill="none"/><path d="M${x} ${y - 44} h24 l-4 9 l4 9 l-5 8 h-19Z" fill="#7a3a22" opacity=".8"/>`;
const COS = [[700, 250], [840, 230], [980, 300], [1110, 380], [760, 360], [900, 420], [1040, 500], [640, 470], [820, 560], [980, 640], [1160, 600], [700, 640]];
const NHIHA = 'M120 40 C260 140 420 210 600 280 S860 380 980 470 S1220 640 1330 760 S1450 860 1500 900';
const DAY = 'M600 282 C560 380 600 470 620 560 S700 720 760 800 S820 880 860 910';
const COAST = 'M640 905 C820 870 980 840 1120 790 S1380 640 1500 560 S1600 480 1620 470';
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${peaks([[60, 260, 1.2], [180, 230], [300, 250, 1.1], [90, 420, 1.1], [220, 400], [140, 560, 1.2], [260, 590], [380, 120, 0.9], [520, 90, 1.1], [700, 70, 0.8]], 120, 90)}
    ${peaks([[160, 760, 1.1], [300, 800], [420, 860, 1.2]], 130, 100)}
    ${peaks([[1120, 120, 0.9], [1280, 100, 1.1], [1440, 140, 0.8]], 90, 80)}
  </g>
  <g class="pl-mark" data-id="hoalu" fill="url(#pl-mtn)" filter="url(#pl-ink)">${towers([[500, 720, 90, 22], [545, 710, 120, 20], [590, 725, 80, 18], [630, 710, 104, 22], [668, 728, 70, 16], [525, 780, 70, 18], [612, 790, 86, 20]])}</g>
  <g class="pl-mark" data-id="quen" fill="url(#pl-mtn)" filter="url(#pl-ink)">${towers([[380, 560, 110, 20], [420, 548, 136, 22], [462, 566, 96, 18], [404, 610, 74, 16], [450, 618, 88, 18], [492, 600, 66, 14]])}</g>
  <g class="pl-mark" data-id="nhiha" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${NHIHA}" stroke="#6f7c78" stroke-width="40" opacity=".35"/><path d="${NHIHA}" stroke="#46524f" stroke-width="8" opacity=".7"/>
  </g>
  <g class="pl-mark" data-id="day" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${DAY}" stroke="#6f7c78" stroke-width="18" opacity=".32"/><path d="${DAY}" stroke="#46524f" stroke-width="4" opacity=".65"/>
  </g>
  <g filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${COAST}" stroke="#46524f" stroke-width="5" opacity=".55"/><path d="${COAST} L1620 910 L640 910Z" fill="#6f7c78" opacity=".14" stroke="none"/>
  </g>
  <g class="pl-mark" data-id="cos" filter="url(#pl-ink)">${COS.map(flagMark).join('')}</g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="hoalu"><rect x="570" y="650" width="36" height="36" rx="3"/><text x="620" y="680">華閭</text><text class="sm" x="620" y="724">丁部領</text></g>
    <g class="pl-mark wei" data-id="quen"><rect x="410" y="470" width="36" height="36" rx="3"/><text x="250" y="462">雄營</text><text class="sm" x="230" y="506">最後之壘</text></g>
    <g class="pl-mark wei" data-id="cos"><text class="sm" x="1180" y="300">十二使君</text></g>
    <g class="pl-mark" data-id="nhiha"><text class="sm river" x="1060" y="470">珥 河</text></g>
    <g class="pl-mark" data-id="day"><text class="sm river" x="660" y="520">底 江</text></g>
    <g class="pl-mark" data-id="sea"><text class="sm river" x="1300" y="800">海</text></g>
  </g>`,
  arrows: [
    ['dinh1', 'shu', 'M600 660 C660 560 720 460 820 400'],
    ['dinh2', 'shu', 'M630 690 C760 660 880 620 1000 600'],
    ['dinh3', 'shu', 'M560 650 C580 520 640 380 720 290'],
    ['gom', 'wei', 'M700 420 C620 440 540 480 470 520'],
    ['dinh4', 'shu', 'M560 690 C530 640 500 610 462 586'],
  ],
};

// ---- prologue cards (format: chapters.js; `vi` = Vietnamese prose). Card 5 branches on the hero.
export const PROLOGUE = [
  { cols: ['吳氏既衰', '十二使君', '各據一方'], vi: 'Nhà Ngô suy. Đất nước chia thành mười hai sứ quân, mỗi người giữ một cõi, dựng một lá cờ.',
    en: 'The house of Ngô has waned. The land splits among twelve warlords, each holding his own corner under his own banner.',
    show: ['cos', 'nhiha'], focus: [880, 430, 1.08] },
  { cols: ['丁部領', '起於華閭', '蘆花為旗'], vi: 'Ở Hoa Lư, Đinh Bộ Lĩnh — cậu bé chăn trâu từng bẻ bông lau làm cờ — dựng quân giữa núi đá.',
    en: 'At Hoa Lư, Đinh Bộ Lĩnh — the herd boy who once made banners of reed plumes — raises an army among the limestone peaks.',
    show: ['hoalu', 'day', 'sea'], focus: [600, 700, 1.3] },
  { cols: ['一旗一旗', '次第而平', '民始得安'], vi: 'Từng sứ quân hàng phục hay tan rã. Cờ lau đi đến đâu, dân được yên đến đó.',
    en: 'One by one the warlords yield or scatter. Wherever the reed banner goes, the people find peace.',
    show: ['dinh1', 'dinh2', 'dinh3'], focus: [800, 520, 1.1] },
  { cols: ['惟餘雄營', '據石山之谷', '十二旗聚'], vi: 'Còn lại Quèn Thành, một thung lũng giữa rừng núi đá vôi. Sứ quân nơi đây tụ cờ của mười hai trại, quyết đánh trận cuối.',
    en: 'Only Quèn Thành remains, a valley among the limestone towers. Its warlord gathers the banners of twelve camps for a last stand.',
    show: ['quen', 'gom'], focus: [440, 560, 1.35] },
  { huutuong: { cols: ['右將', '受命鎖翼', '盾牆不退'], vi: 'Hữu Tướng nhận lệnh khóa cánh trái: một tuyến khiên chặn con đường giặc đánh tạt sườn.',
    en: 'The Right General is ordered to lock the left flank: a wall of shields across the road the enemy would take round the side.' },
    tatuong: { cols: ['左將', '受命破門', '長槍開路'], vi: 'Tả Tướng nhận lệnh phá cổng gỗ của trại: một mũi giáo mở đường cho cả đạo quân.',
      en: 'The Left General is ordered to break the stockade\'s wooden gate: one spearhead to open the way for the whole army.' },
    show: ['dinh4'], focus: [500, 600, 1.4] },
  { cols: ['木門之後', '一將守丘', '不棄其兵'], vi: 'Sau cổng gỗ, trên gò chỉ huy, một viên tướng giáp xanh-nâu vẫn đứng cùng quân sĩ của mình.',
    en: 'Behind the wooden gate, on the command mound, a general in green-brown armour still stands with his men.',
    show: [], focus: [430, 540, 1.45] },
  { cols: ['夕陽穿煙', '蘆花在盔', '一戰定之'], vi: 'Chiều muộn. Nắng đỏ xuyên qua khói trận. Đinh Bộ Lĩnh cài một bông lau lên mũ trụ.',
    en: 'Late afternoon. A red sun through the battle smoke. Đinh Bộ Lĩnh pins a white reed plume to his helmet.',
    show: [], focus: [520, 620, 1.15] },
];

// ---- result screen epilogue (win), branched on the hero: ch. 1 panels 5-6 — one command for the whole land; years
// later the storks over the Hoa Lư banner veer, as if hearing a blade not yet drawn
export const EPILOGUE = {
  huutuong: {
    zh: ['Khi lá cờ cuối cùng hạ xuống, non sông lần đầu có chung một hiệu lệnh. Dân làng rời nơi trú ẩn, trẻ con đứng trên bờ đê nhìn đoàn quân đi qua.',
      'Hữu Tướng biết thống nhất trên chiến địa chưa phải là bình yên trong lòng người. Ông vẫn để tuyến khiên đứng thêm một đêm.',
      'Nhiều năm sau, Đại Cồ Việt đã có đế hiệu, kinh đô và luật lệnh. Song trên vương kỳ Hoa Lư, đàn cò trắng bỗng đổi hướng — như nghe thấy một lưỡi dao chưa rút khỏi vỏ.'],
    en: ['When the last banner came down, the land answered to one command for the first time. Villagers left their hiding places; children stood on the dikes to watch the army pass.',
      'The Right General knew a land united on the battlefield is not yet a land at peace. He left the shield line standing one more night.',
      'Years later, Đại Cồ Việt had an emperor\'s title, a capital and its laws. Yet over the royal banner at Hoa Lư, the white storks suddenly veered — as if they heard a blade not yet drawn.'],
  },
  tatuong: {
    zh: ['Cổng gỗ Quèn Thành nằm trong bùn; mười hai lá cờ hạ trước một cờ lau lớn. Viên tướng vừa buông gươm được giao lại quân của mình — từ đó người ta gọi ông là Hàng Tướng.',
      'Tả Tướng về doanh, cởi giáp, nghĩ đến đứa con gái nhỏ ở nhà. Thống nhất trên chiến địa chưa phải là bình yên trong lòng người.',
      'Nhiều năm sau, Đại Cồ Việt đã có đế hiệu, kinh đô và luật lệnh. Song trên vương kỳ Hoa Lư, đàn cò trắng bỗng đổi hướng — như nghe thấy một lưỡi dao chưa rút khỏi vỏ.'],
    en: ['The wooden gate of Quèn Thành lay in the mud; twelve banners had come down before one great reed banner. The general who laid down his sword was given back his men — and from then on he was called the Yielded General.',
      'The Left General rode back to camp, unbuckled his armour and thought of the little daughter waiting at home. A land united on the battlefield is not yet a land at peace.',
      'Years later, Đại Cồ Việt had an emperor\'s title, a capital and its laws. Yet over the royal banner at Hoa Lư, the white storks suddenly veered — as if they heard a blade not yet drawn.'],
  },
};

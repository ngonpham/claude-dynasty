// Màn IV «Cầu Gãy Trên Dòng Sâu» — stage data (format: src/story/chapters.js header; holinh/DESIGN.md §6): metadata,
// speakers, officers, the battle script (BEATS), the prologue cards over the ink map of the river country (PL_MAP), the
// epilogues. Text: .zh = Vietnamese, .en = English; seals and prologue cols stay Hán.
// Source: the comic's ch. 9 (the bridge, the fall, the coffin that floats, three bell strokes) and ch. 12 (the tavern
// village: three pestle beats, the cellar, Máu Lạnh at the table, the nets — beaten by a community; the bell toward the
// mountain), with ch. 8 p2-3 (carts switched at every station; the hunters split, Máu Lạnh takes the water road) and
// ch. 11 p3-5 (Quan Văn's hollow tube carried out of the ring) in the prologue. All of it is the comic's fiction.
// Played as Đinh Khang (the river line is his: alone until the reeds; An Nhiên and Nguyên Phong come in with the hollow
// tube), An Nhiên or Nguyên Phong (the two catch up with his column on the river road; he is an allied actor on the
// field from the bridgehead, falls with Máu Lạnh when the span breaks, comes up with him in the reeds).
// Máu Lạnh (NPCS 'maulanh') takes the field three times under one key: on the bridge (breaks off at 55 %: he hooks the
// ropes), in the shallows (breaks off at 40 %: cuts the net, dives downstream), in the tavern yard (no way out: at 0 HP
// he falls into the village's net — netted, not killed).
// Map (world/maps/caugay.js): gates 'road' (the cleft barricade) and 'village' (the village gate) — shut at the start;
// sets 'cross', 'collapse', 'float', 'bell', 'signal', 'hide', 'net', 'ring'; anchors station, rgate, bearers, shead,
// bridge, knot, nhead, duel, hide, landing, vgate, yard, net, door, jetty.
const DK = 'dinhkhang', AN = 'annhien', NP = 'nguyenphong';
export const CH = {
  id: 'caugay', num: { zh: 'Màn IV', en: 'STAGE IV' }, title: { zh: 'Cầu Gãy Trên Dòng Sâu', en: 'The Broken Bridge' },
  seal: '斷橋', era: { zh: 'Năm 979 · đường sông', en: '979 AD · the river road' }, map: 'caugay',
  heroes: [DK, AN, NP],
  ally: { dinhkhang: AN, annhien: DK, nguyenphong: DK },
  army: { foe: 'truysat', ally: 'holinh' },
  // the river line's escort, drawn up either side of the road behind the coffins' last cart
  van: [{ x: -3.5, z: -180, n: 8, cols: 4, hold: true }, { x: 3.5, z: -180, n: 8, cols: 4, hold: true }],
  hq: [0, 168],                                     // the tavern: where the hunt ends
  rank: { kos: [350, 700, 1100], time: [480, 660, 900] },
};

const ML = { zh: 'Máu Lạnh', en: 'Máu Lạnh' };
export const SPK = {
  maulanh: { name: ML, seal: '冷血', side: 'wei', char: 'maulanh' },
  chuquan: { name: { zh: 'Chủ quán', en: 'Tavern Keeper' }, seal: '店', side: 'shu' },
  danchai: { name: { zh: 'Dân chài', en: 'Fisherman' }, seal: '漁', side: 'shu' },
  elder: { name: { zh: 'Cụ trưởng làng', en: 'Village Elder' }, seal: '老', side: 'shu' },
  bearer: { name: { zh: 'Người khiêng quan', en: 'Coffin Bearer' }, seal: '夫', side: 'shu' },
  phucbinh: { name: { zh: 'Đội trưởng phục binh', en: 'Ambush Captain' }, seal: '伏', side: 'wei' },
  vachda: { name: { zh: 'Cung thủ trên vách', en: 'Cliff Archer' }, seal: '弓', side: 'wei' },
  thuyensan: { name: { zh: 'Đầu mục thuyền săn', en: 'Boat-Hunter Chief' }, seal: '舟', side: 'wei' },
  dodau: { name: { zh: 'Kẻ dò dấu', en: 'The Tracker' }, seal: '蹤', side: 'wei' },
};

// officers (crowd.spawnOfficer): titles, not names; looks in the hunters' black scale and violet (armies.js truysat) —
// Máu Lạnh's own men in his blue-grey
const ML_HP = [2400, 1700, 2800];                   // Máu Lạnh on the bridge / in the shallows / in the yard (× officerHp)
export const OFF = {
  phucbinh: { name: { zh: 'Đội trưởng phục binh', en: 'AMBUSH CAPTAIN' }, hp: 650, look: { helm: 'cap', armor: 0x201e26, trim: 0x8a8296, cape: 0x2e2440 } },
  vachda: { name: { zh: 'Cung thủ trên vách', en: 'CLIFF ARCHER' }, hp: 650, look: { helm: 'horn', armor: 0x1e1c24, trim: 0xa89ab0, cape: 0x3e2256, plume: 0x7a40b0 } },
  thuyensan: { name: { zh: 'Đầu mục thuyền săn', en: 'BOAT-HUNTER CHIEF' }, hp: 850, look: { helm: 'crest', armor: 0x18161e, trim: 0xd0c0e0, cape: 0x4a1e6e, plume: 0x9a50e0 } },
  dodau: { name: { zh: 'Kẻ dò dấu', en: 'THE TRACKER' }, hp: 950, look: { helm: 'cap', armor: 0x24222a, trim: 0xb8a8d0, cape: 0x3a2a50 } },
  thantin: { name: { zh: 'Thân tín của Máu Lạnh', en: 'MÁU LẠNH\'S MAN' }, hp: 700, look: { helm: 'horn', armor: 0x16141a, trim: 0x8a9aa8, cape: 0x2a3440, plume: 0x6a7a8a } },
};

const boss = (hp, retreatAt) => ({ kit: 'maulanh', role: 'boss', hp, retreatAt, name: ML, seal: '冷血' });
const NAG_ROAD = { who: 'bearer', zh: 'Khe đá còn bị chặn. Phải hạ tên đội trưởng phục binh trước đã!', en: 'The cleft is still blocked. Their ambush captain has to fall first!' };
const NAG_BRIDGE = { who: 'bearer', zh: 'Hắn còn đứng giữa cầu. Chưa qua được đâu!', en: 'He still stands mid-span. We can\'t cross yet!' };
const NAG_REEDS = { who: 'danchai', zh: 'Khoan đã! Thuyền chài còn đang kéo quan tài!', en: 'Wait! The fishing boats are still towing the coffin!' };
const NAG_VILLAGE = { who: 'danchai', zh: 'Bọn chúng chặn cổng làng rồi. Phải dẹp chúng trước!', en: 'They\'ve barred the village gate. Deal with them first!' };
const BACK = ['nhead', 0, -6];                      // after the fall: no way back onto the broken span

// Pacing (default difficulty): a bot that attacks nonstop clears in ≈ 6-7 min (the road 1 min · the bridgehead and the
// bridge duel 1.5 min · the knot 40 s · the shallows 1 min · the boats and the bell 1 min · the village 40 s · the
// tavern 1.5 min); a human reading the lines ≈ 10-12 min. Timers: the knot 40 s, the cellar 30 s.
export const BEATS = [
  // ---- the river road
  {
    when: { wait: 30 },
    obj: { zh: 'Mở đường ven sông tới khe đá', en: 'Clear the river road to the cleft', go: ['station', 0, 0] },
    squads: [{ at: ['road', -0.3, -0.05], n: 14 }, { at: ['road', 0.35, 0.3], n: 16 }, { at: ['station', 0, 10], n: 16 }],
    limit: { z: ['rgate', 0, -4], nag: NAG_ROAD },
    morale: 0,
    say: [
      { who: 'bearer', zh: 'Đường sông đây rồi. Qua khe đá, qua cầu là tới nhánh lau.', en: 'Here\'s the river road. Through the cleft and over the bridge, and we reach the reeds.' },
      { who: 'hero', dinhkhang: ['Đi đường nước, nơi không dấu chân nào ở lại. Kẻ săn sẽ mất dấu ta ở đây.', 'We take the water road, where no footprint stays. The hunters lose us here.'],
        annhien: ['Chiếc ống rỗng chỉ về đường sông. Đoàn Đinh Khang ở ngay phía trước.', 'The hollow tube points to the river road. Đinh Khang\'s column is just ahead.'],
        nguyenphong: ['Vết bánh mới đè lên vết cũ… Đoàn quan tài đã đổi xe ở trạm này.', 'New wheel ruts over old ones... The coffins changed carts at this station.'] },
      { who: 'nguyenphong', annhien: ['Trên vách có mắt. Chúng chờ sẵn trên đường này.', 'There are eyes on the cliffs. They were waiting on this road.'] },
      { who: 'annhien', nguyenphong: ['Vậy ta mở đường, ngươi trông vách đá.', 'Then I open the road. You watch the cliffs.'] },
    ],
  },
  // the partner rides with the hero; Đinh Khang waits with his bearers at the bridgehead
  { hero: [AN], actors: { phong: { kit: NP, role: 'ally', at: ['station', 3, -27] }, khang: { kit: DK, role: 'ally', at: ['bearers', 4, 2] } },
    actor: { key: 'khang', do: 'hold', at: ['bearers', 4, 2] } },
  { hero: [NP], actors: { nhien: { kit: AN, role: 'ally', at: ['station', -3, -27] }, khang: { kit: DK, role: 'ally', at: ['bearers', 4, 2] } },
    actor: { key: 'khang', do: 'hold', at: ['bearers', 4, 2] } },
  {
    when: [{ at: ['station', 0, -12] }, { kos: 25 }],
    waves: true,
    banner: { html: '<em>Quân truy sát</em> phục sẵn bên đường ven sông', en: 'The hunters lie in wait along the river road', dur: 160 },
    officers: { phucbinh: { at: ['station', 0, 16], engaged: true } },
    squads: [{ at: ['station', -8, 20], n: 16 }, { at: ['station', 8, 24], n: 16 }],
    obj: { zh: 'Đánh bại Đội trưởng phục binh', en: 'Defeat the Ambush Captain', go: 'phucbinh' },
    say: [{ who: 'phucbinh', zh: 'Đường nước cũng chẳng cứu được các ngươi! Chặn khe đá lại!', en: 'Not even the water road will save you! Seal the cleft!' }],
  },
  {
    when: { down: 'phucbinh' },
    gate: 'road', heal: 0.2, morale: 0.1, hush: true, retire: true,
    banner: { html: '<em>Khe đá</em> đã mở!', en: 'The cleft is open!', dur: 150 },
    obj: { zh: 'Lên đầu cầu, nơi đoàn khiêng quan đang chờ', en: 'Climb to the bridgehead where the bearers wait', go: ['bearers', 6, -12] },
    limit: { z: ['shead', 0, -3], nag: NAG_BRIDGE },
    squads: [{ at: ['shead', 0.35, -0.5], n: 16 }, { at: ['shead', -0.3, -0.15], n: 16 }, { at: ['shead', 0.25, 0.25], n: 16 }],
    say: [{ who: 'bearer', zh: 'Bảy cỗ đã lên tới đầu cầu! Chặn chúng lại, đừng cho đến gần!', en: 'All seven are up at the bridgehead! Hold them back — don\'t let them near!' }],
  },
  // ---- the bridgehead: the cliff archers, and the man in the middle of the bridge
  {
    when: [{ at: ['bearers', 0, -16] }, { kos: 45 }],
    banner: { html: 'Cây cầu duy nhất qua <em>vực nước</em>', en: 'The only bridge over the deep water', dur: 170 },
    actors: { maulanh: { ...boss(ML_HP[0], 0.55), at: ['bridge', 0, -3], yaw: Math.PI } },
    actor: { key: 'maulanh', do: 'hold', at: ['bridge', 0, -3] },
    officers: { vachda: { at: ['shead', 0.3, 0.45], engaged: true } },
    squads: [{ at: ['shead', 0.4, 0.3], n: 14 }, { at: ['shead', -0.4, 0.35], n: 14 }],
    obj: { zh: 'Dẹp quân truy sát ở đầu cầu', en: 'Break the hunters at the bridgehead', go: 'vachda' },
    say: [
      { who: 'bearer', zh: 'Sương tan rồi… Có người đứng giữa cầu!', en: 'The mist is lifting... someone is standing in the middle of the bridge!' },
      { who: 'maulanh', zh: 'Cỗ nào thật, ta chẳng cần biết. Cả bảy sẽ nằm dưới đáy sông.', en: 'Which one is real? I don\'t care. All seven go to the bottom.' },
      { who: 'hero', dinhkhang: ['Máu Lạnh. Hắn săn đường nước — vậy là hắn đang đứng trên đất của ta.', 'Máu Lạnh. He hunts the water road — so he stands on my ground.'],
        annhien: ['Một mình hắn mà chặn cả cây cầu?', 'He blocks the whole bridge alone?'],
        nguyenphong: ['Đầu trọc, song câu… Đó là Máu Lạnh.', 'Shaven head, twin hooks... That is Máu Lạnh.'] },
      { who: DK, annhien: ['Hai người tới đúng lúc. Dẹp đám ở đầu cầu, còn hắn để ta.', 'You came just in time. Clear the bridgehead — leave him to me.'],
        nguyenphong: ['Hai người tới đúng lúc. Dẹp đám ở đầu cầu, còn hắn để ta.', 'You came just in time. Clear the bridgehead — leave him to me.'] },
      { who: 'vachda', zh: 'Bắn xuống đám khiêng quan!', en: 'Shoot the bearers down!' },
    ],
  },
  { hero: [AN, NP], actor: { key: 'khang', do: 'follow' } },
  {
    when: { down: 'vachda' },
    heal: 0.2, hush: true, morale: 0.08,
    banner: { html: '<em>Máu Lạnh</em> giữ giữa cầu', en: 'Máu Lạnh holds the middle of the bridge', dur: 190, big: true },
    obj: { zh: 'Lên cầu, đánh lui Máu Lạnh', en: 'Take the bridge: drive Máu Lạnh back', go: 'maulanh' },
    limit: { z: ['bridge', 0, 7], nag: NAG_BRIDGE },
    squads: [{ at: ['bridge', 0, 12], n: 10 }],
    say: [
      { who: 'maulanh', zh: 'Lên đây. Cầu hẹp, nước sâu — ta thích chỗ này.', en: 'Come up. A narrow bridge and deep water — I like it here.' },
      { who: 'hero', dinhkhang: ['Cầu hẹp thì một người cũng đủ.', 'On a narrow bridge, one man is enough.'],
        annhien: ['Đinh Khang, ta cùng lên!', 'Đinh Khang, we go up together!'],
        nguyenphong: ['Trên cầu không có chỗ nấp. Đánh nhanh!', 'No cover on a bridge. Strike fast!'] },
    ],
  },
  // ---- the last knot: Máu Lạnh hooks the ropes; the bearers push the coffins over while the north end holds
  {
    when: { down: 'maulanh' },
    set: 'cross', hush: true, heal: 0.25, waves: true,
    banner: { html: 'Móc sắt bay ra — <em>ba dây cầu</em> đứt cùng lúc!', en: 'The iron hooks fly — three bridge ropes part at once!', dur: 200, big: true },
    limit: { z: ['nhead', 0, 8], nag: NAG_BRIDGE },
    defend: { key: 'knot', at: ['knot', 0, 0], r: 6, hp: 1600, name: { zh: 'Nút buộc cuối cùng', en: 'The Last Knot' } },
    fail: { when: { hp: ['knot', 0.01] }, zh: 'Nút buộc cuối cùng đã tuột — cả bảy cỗ quan chìm xuống vực……', en: 'The last knot slips — all seven coffins sink into the gorge...' },
    obj: { zh: 'Giữ nút buộc cuối cùng cho người khiêng đẩy quan qua cầu', en: 'Hold the last knot while the bearers push the coffins over', go: ['knot', 0, 0], timer: 40 },
    squads: [{ at: ['nhead', -16, 12], n: 16, charge: true }, { at: ['nhead', 18, 14], n: 16, charge: true }, { at: ['nhead', 0, 22], n: 14, charge: true }],
    say: [
      { who: 'hero', dinhkhang: ['Ta không giữ cầu. Ta giữ nút buộc cuối cùng — đẩy quan tài qua!', 'I don\'t hold the bridge. I hold the last knot — push the coffins across!'],
        annhien: ['Đinh Khang giữ dây! Ta giữ đầu cầu bắc!', 'Đinh Khang has the rope! I\'ll hold the north end!'],
        nguyenphong: ['Chúng kéo ra từ bãi lau! Ta chặn ở đầu cầu bắc!', 'They\'re pouring out of the reeds! I\'ll stop them at the north end!'] },
      { who: DK, annhien: ['Ta không giữ cầu — ta giữ nút buộc cuối cùng! Đừng để chúng chạm tới dây!', 'I don\'t hold the bridge — I hold the last knot! Keep them off the rope!'],
        nguyenphong: ['Ta không giữ cầu — ta giữ nút buộc cuối cùng! Đừng để chúng chạm tới dây!', 'I don\'t hold the bridge — I hold the last knot! Keep them off the rope!'] },
      { who: 'bearer', zh: 'Đẩy! Từng cỗ một, đừng dừng giữa cầu!', en: 'Push! One at a time — don\'t stop on the span!' },
    ],
  },
  { hero: [AN, NP], actor: { key: 'khang', do: 'hold', at: ['knot', -1, -1] } },
  {
    when: { wait: 20 * 60 },
    squads: [{ at: ['nhead', -24, 6], n: 12, charge: true }, { at: ['nhead', 24, 6], n: 12, charge: true }],
    say: [{ who: 'bearer', zh: 'Sáu cỗ… còn cỗ cuối! Dây rung rồi!', en: 'Six across... one more! The rope is shaking!' }],
  },
  // ---- the fall
  {
    when: { timer: true },
    set: 'collapse', defend: null, fail: null, hush: true, heal: 0.3, morale: 0.1, retire: true, waves: false,
    banner: { html: '<em>Cầu gãy!</em> Nhịp giữa đổ xuống dòng sâu', en: 'The bridge breaks! The middle span falls into the deep water', dur: 230, big: true },
    limit: { z: ['reeds', 0, 0.9], back: BACK, nag: NAG_REEDS },
    obj: { zh: 'Xuống nhánh sông lau', en: 'Go down into the reed branch', go: ['duel', -8, -10] },
    squads: [{ at: ['reeds', -0.35, -0.3], n: 12 }, { at: ['duel', 10, 12], n: 12 }],
    say: [
      { who: 'bearer', zh: 'Sáu cỗ đã sang! Cỗ thứ bảy… rơi theo nhịp cầu rồi!', en: 'Six are across! The seventh... it went down with the span!' },
      { who: 'hero', dinhkhang: ['Máu Lạnh rơi theo. Trên bờ hắn là sát thủ — dưới nước, ta chọn nhịp.', 'Máu Lạnh went down with it. On land he\'s an assassin — in the water, I choose the rhythm.'],
        annhien: ['Đinh Khang lao theo hắn xuống vực!', 'Đinh Khang dove after him into the gorge!'],
        nguyenphong: ['Hắn kéo cả Máu Lạnh xuống nước! Dòng chảy dồn về nhánh lau — theo ta!', 'He dragged Máu Lạnh into the water! The current runs into the reed branch — follow me!'] },
    ],
  },
  { hero: [AN, NP], actor: { key: 'khang', do: 'retreat', at: ['bridge', 0, 4] } },
  // ---- the shallows: Máu Lạnh comes up in the wrong place
  {
    when: [{ zone: 'reeds' }, { near: [['duel', 0, 0], 24] }],
    waves: true,
    banner: { html: 'Máu Lạnh ngoi lên <em>sai chỗ</em> — giữa lưới dân chài', en: 'Máu Lạnh surfaces in the wrong place — among the fishermen\'s nets', dur: 200, big: true },
    actors: { maulanh: { ...boss(ML_HP[1], 0.4), at: ['duel', 0, 0] } },
    squads: [{ at: ['duel', -14, 10], n: 14 }, { at: ['duel', 14, 8], n: 14 }],
    obj: { zh: 'Đánh Máu Lạnh giữa bãi nước nông', en: 'Fight Máu Lạnh in the shallows', go: 'maulanh' },
    say: [
      { who: 'danchai', zh: 'Lưới động rồi! Có người dưới nước!', en: 'The nets are moving! Someone\'s under the water!' },
      { who: 'hero', dinhkhang: ['Dưới nước ta chọn nhịp; lên bờ, ta chọn chỗ. Đây là chỗ của ta.', 'Below, I chose the rhythm; ashore, I choose the ground. This ground is mine.'],
        annhien: ['Đinh Khang! Ngươi còn sống!', 'Đinh Khang! You\'re alive!'],
        nguyenphong: ['Hắn trồi lên đúng giữa vòng lưới. Đinh Khang cố ý!', 'He came up right inside the ring of nets. Đinh Khang meant it!'] },
      { who: DK, annhien: ['Ta khóa hai lưỡi câu của hắn bằng chính dây móc. Giờ thì đánh!', 'I locked his two hooks with his own hook-rope. Now strike!'],
        nguyenphong: ['Ta khóa hai lưỡi câu của hắn bằng chính dây móc. Giờ thì đánh!', 'I locked his two hooks with his own hook-rope. Now strike!'] },
      { who: 'maulanh', zh: 'Nước… không phải chỗ của ta.', en: 'Water... is not my ground.' },
    ],
  },
  { hero: [AN, NP], actors: { khang: { kit: DK, role: 'ally', at: ['duel', -3, -3] } } },
  // ---- the coffin that floats; the hunters' boats
  {
    when: { down: 'maulanh' },
    set: 'float', hush: true, heal: 0.2,
    banner: { html: 'Máu Lạnh cắt lưới, lặn mất về hạ lưu', en: 'Máu Lạnh cuts the net and vanishes downstream', dur: 170 },
    officers: { thuyensan: { at: ['hide', 6, 6], engaged: true } },
    squads: [{ at: ['hide', -6, -8], n: 16, charge: true }, { at: ['hide', 12, -12], n: 14 }, { at: ['reeds', -0.4, 0.3], n: 14 }],
    obj: { zh: 'Đuổi thuyền săn, che chở dân chài kéo quan tài vào lau', en: 'Drive off the hunters\' boats; cover the fishermen towing the coffin into the reeds', go: 'thuyensan' },
    say: [
      { who: 'danchai', zh: 'Quan tài nổi lên rồi! Khung tre giấu dưới đáy đỡ nó! Kéo dây, đưa vào nhánh lau!', en: 'The coffin\'s come up! The bamboo frame hidden under it holds it! Haul — into the reeds!' },
      { who: 'hero', dinhkhang: ['Kế hoạch chưa bao giờ chỉ dựa vào tráng sĩ. Giữ lấy thuyền dân chài!', 'The plan never rested on warriors alone. Guard the fishermen\'s boats!'],
        annhien: ['Cỗ quan tưởng đã mất lại nổi lên… Giữ thuyền dân chài!', 'The coffin we thought lost has risen... Guard the fishing boats!'],
        nguyenphong: ['Thuyền săn đang áp tới. Ta nhắm mũi thuyền đầu!', 'The hunters\' boats are closing. I\'ll take the lead boat!'] },
      { who: 'thuyensan', zh: 'Cỗ quan trôi kia! Chặn thuyền chài lại!', en: 'There\'s the coffin, drifting! Cut off the fishing boats!' },
    ],
  },
  {
    when: { wait: 4 * 60 },
    banner: { html: 'Cỗ quan <em>biết nổi</em> — khung tre bí mật bật lên dưới đáy', en: 'The coffin floats — its hidden bamboo frame rises from below', dur: 190 },
  },
  {
    when: { down: 'thuyensan' },
    set: 'bell', hush: true, heal: 0.25, morale: 0.1, waves: false, retire: true,
    banner: { html: '<em>Ba tiếng chuông</em> truyền qua mặt nước', en: 'Three bell strokes carry across the water', dur: 200, big: true },
    obj: { zh: 'Chờ hiệu đáp từ trên núi', en: 'Wait for the answer from the peak', go: ['landing', 0, 0] },
    say: [
      { who: 'hero', dinhkhang: ['Ba tiếng. Tuyến sông còn sống.', 'Three strokes. The river line still lives.'],
        annhien: ['Đinh Khang rung chuông… ba tiếng.', 'Đinh Khang is ringing the bell... three strokes.'],
        nguyenphong: ['Ba tiếng chuông — hiệu của thầy ta đây.', 'Three strokes — that is my master\'s signal.'] },
      { who: 'danchai', zh: 'Quan tài đã nằm trong lau. Không ai thấy được đâu.', en: 'The coffin\'s in the reeds now. No one will ever see it.' },
    ],
  },
  {
    when: { wait: 4.5 * 60 },
    set: 'signal',
    banner: { html: 'Trên đỉnh núi, <em>ba đốm lửa</em> đáp lời', en: 'On the peak, three fires answer', dur: 190 },
    say: [{ who: 'thaymo', zh: 'Đường sông còn sống. Đổi một sợi chỉ.', en: 'The river road lives. Move one thread.' }],
  },
  // Đinh Khang's road: An Nhiên and Nguyên Phong come down the dike with the hollow tube
  { hero: [DK], actors: { nhien: { kit: AN, role: 'ally', at: ['landing', -3, 12] }, phong: { kit: NP, role: 'ally', at: ['landing', 3, 13] } } },
  // ---- the hollow tube leads to the village
  {
    when: { wait: 4 * 60 },
    waves: true,
    obj: { zh: 'Theo chiếc ống rỗng tới làng chài', en: 'Follow the hollow tube to the fishing village', go: ['vgate', 0, -30] },
    limit: { z: ['vgate', 0, -4], back: BACK, nag: NAG_VILLAGE },
    squads: [{ at: ['village', -0.25, -0.55], n: 14 }, { at: ['village', 0.3, -0.3], n: 14 }],
    say: [
      { who: AN, dinhkhang: ['Đinh Khang! Chiếc ống rỗng của Quan Văn dẫn chúng ta tới đây.', 'Đinh Khang! Quan Văn\'s hollow tube led us here.'] },
      { who: NP, dinhkhang: ['Trong ống không có chữ nào. Chỉ có một hướng: quán nhỏ cuối làng chài.', 'Not a word inside it. Only a direction: the little tavern at the end of the fishing village.'] },
      { who: 'hero', dinhkhang: ['Quán ấy không có trên bản đồ nào. Đi thôi.', 'That tavern is on no map. Let\'s go.'],
        annhien: ['Chiếc ống rỗng chỉ một nơi: quán nhỏ cuối làng chài.', 'The hollow tube points to one place: the little tavern at the end of the village.'],
        nguyenphong: ['Điều không được viết trong ống… là một quán nhỏ không có trên bản đồ.', 'What wasn\'t written in the tube... is a little tavern no map shows.'] },
      { who: 'ally', annhien: ['Ống rỗng của Quan Văn à? Vậy là đường sông đã nối được với núi.', 'Quan Văn\'s hollow tube? Then the river road joins the mountain.'],
        nguyenphong: ['Ống rỗng của Quan Văn à? Vậy là đường sông đã nối được với núi.', 'Quan Văn\'s hollow tube? Then the river road joins the mountain.'] },
    ],
  },
  {
    when: [{ zone: 'village' }, { kos: 40 }],
    banner: { html: '<em>Kẻ dò dấu</em> lục soát làng chài', en: 'The Tracker searches the fishing village', dur: 170 },
    officers: { dodau: { at: ['village', 0, 0.2], engaged: true } },
    squads: [{ at: ['village', -0.3, 0.45], n: 16 }, { at: ['village', 0.3, 0.55], n: 16 }],
    obj: { zh: 'Hạ Kẻ dò dấu trước khi hắn lần ra dấu quan tài', en: 'Bring down the Tracker before he finds the coffin\'s trail', go: 'dodau' },
    say: [
      { who: 'dodau', zh: 'Vết bánh dừng ở bờ nước… Lục từng nhà sàn!', en: 'The wheel tracks stop at the water... Search every stilt house!' },
      { who: 'elder', zh: 'Làng này chỉ có cá với lưới. Các ông tìm gì?', en: 'This village has only fish and nets. What are you looking for?' },
    ],
  },
  {
    when: { down: 'dodau' },
    gate: 'village', hush: true, heal: 0.25, morale: 0.1, retire: true, waves: false,
    banner: { html: '<em>Cổng làng</em> đã mở!', en: 'The village gate is open!', dur: 150 },
    obj: { zh: 'Tới quán nhỏ cuối làng', en: 'Reach the little tavern at the end of the village', go: ['yard', 0, 0] },
    limit: { z: ['door', 0, -2], back: BACK },
  },
  // ---- the tavern: three pestle beats; the cellar
  {
    when: [{ zone: 'tavern' }, { near: [['yard', 0, 0], 20] }],
    set: 'hide', waves: true,
    banner: { html: 'Ba tiếng chày liên hồi — <em>cả làng</em> thức dậy', en: 'Three pestle beats in a row — the whole village wakes', dur: 200, big: true },
    defend: { key: 'cellar', at: ['door', 0, 0], r: 6, hp: 1200, name: { zh: 'Hầm rượu', en: 'The Wine Cellar' } },
    fail: { when: { hp: ['cellar', 0.01] }, zh: 'Bọn truy sát đã lật sàn quán — cỗ quan bị tìm thấy……', en: 'The hunters have torn up the tavern floor — the coffin is found...' },
    obj: { zh: 'Giữ cửa quán khi dân làng giấu cỗ quan xuống hầm', en: 'Hold the tavern door while the village hides the coffin in the cellar', go: ['door', 0, 0], timer: 30 },
    squads: [{ at: ['yard', -16, -10], n: 14, charge: true }, { at: ['yard', 16, -8], n: 14, charge: true }],
    say: [
      { who: 'chuquan', zh: 'Chuông đồng… Vào đi. Đóng cửa lại.', en: 'A bronze bell... Come in. Shut the door.' },
      { who: 'chuquan', zh: 'Không ai hỏi trong quan tài có ai. Hạ xuống hầm, phủ rơm lên.', en: 'No one asks who is in the coffin. Down into the cellar, straw over it.' },
      { who: 'elder', zh: 'Người già giấu bánh xe, trẻ nhỏ lấy bùn phủ khóa. Nhanh tay!', en: 'Old ones hide the wheels, children smear mud on the lock. Quickly!' },
      { who: 'hero', dinhkhang: ['Ta giữ cửa. Không kẻ nào bước vào quán này.', 'I hold the door. No one walks into this tavern.'],
        annhien: ['Chúng bám tới tận đây. Giữ cửa quán!', 'They followed us all the way here. Hold the door!'],
        nguyenphong: ['Ta khóa ngả sau. Cửa trước để các ngươi!', 'I\'ll lock the back way. The front is yours!'] },
    ],
  },
  // ---- Máu Lạnh at the table; the trap
  {
    when: { timer: true },
    defend: null, fail: null, hush: true, heal: 0.3,
    banner: { html: '<em>Máu Lạnh</em> đến trước khi mưa ngớt', en: 'Máu Lạnh arrives before the rain stops', dur: 230, big: true },
    actors: { maulanh: { ...boss(ML_HP[2]), at: ['yard', 0, -14] } },
    officers: { thantin1: { at: ['yard', -9, -12], engaged: true, like: 'thantin' }, thantin2: { at: ['yard', 9, -12], engaged: true, like: 'thantin' } },
    squads: [{ at: ['yard', -15, -16], n: 14 }, { at: ['yard', 15, -16], n: 14 }],
    obj: { zh: 'Đánh bại Máu Lạnh', en: 'Defeat Máu Lạnh', go: 'maulanh' },
    limit: { z: ['door', 0, 0], back: ['vgate', 0, 2] },
    say: [
      { who: 'maulanh', zh: 'Không thấy quan tài. Chỉ thấy mười dân làng bình thản quá… và một bát canh chưa ai động đũa.', en: 'No coffin. Only ten villagers far too calm... and a bowl of soup no one has touched.' },
      { who: 'chuquan', zh: 'Mời khách dùng canh. Trời mưa, canh còn nóng.', en: 'Have some soup, guest. It\'s raining; the soup is still hot.' },
      { who: 'hero', dinhkhang: ['Lần này ta không tái đấu một mình.', 'This time I don\'t face him alone.'],
        annhien: ['Bên bờ sông hắn thoát một lần. Không có lần thứ hai.', 'He got away once by the river. Not a second time.'],
        nguyenphong: ['Cửa sau đã khóa. Hắn chỉ còn một lối — qua chúng ta.', 'The back way is locked. He has one road left — through us.'] },
    ],
  },
  {
    when: { below: ['maulanh', 0.7] },
    set: 'net', hush: true, morale: 0.15,
    banner: { html: '<em>Ba tiếng chày vang lên</em> — khói bếp, lưới cá, đòn tre!', en: 'Three pestle beats ring out — hearth smoke, fishing nets, bamboo poles!', dur: 220, big: true },
    actor: { key: 'maulanh', do: 'hold', at: ['net', 0, 0] },
    buff: { atk: 1.25, dur: 30, zh: 'Cả làng <em>siết lưới</em>', en: 'The whole village pulls the net tight' },
    say: [
      { who: 'chuquan', zh: 'Bây giờ!', en: 'Now!' },
      { who: 'elder', zh: 'Siết lưới! Đòn tre chặn chân hắn!', en: 'Pull the net tight! Poles across his legs!' },
      { who: 'ally', dinhkhang: ['Ta giữ nhịp! Đinh Khang, gạt song câu của hắn!', 'I\'ll keep the rhythm! Đinh Khang, knock his hooks aside!'],
        annhien: ['Ta gạt song câu, nàng ép hắn vào lưới!', 'I\'ll knock his hooks aside — you drive him into the net!'],
        nguyenphong: ['Ngả thoát khóa rồi chứ? Tốt — ép hắn vào lưới!', 'Is the way out locked? Good — drive him into the net!'] },
      { who: 'maulanh', zh: 'Lưới cá… đòn gánh… Một cái quán?', en: 'Fishing nets... carrying poles... A tavern?' },
    ],
  },
  {
    when: { below: ['maulanh', 0.3] },
    skip: { down: 'maulanh' },
    actor: { key: 'maulanh', do: 'join' },
    banner: { html: 'Máu Lạnh xé lưới — <em>lưới thứ hai</em> đã giăng sẵn!', en: 'Máu Lạnh tears the net — a second net is already waiting!', dur: 190 },
    squads: [{ at: ['yard', -12, -18], n: 12, charge: true }, { at: ['yard', 12, -18], n: 12, charge: true }],
    say: [
      { who: 'danchai', zh: 'Lưới thứ hai! Kéo!', en: 'Second net! Haul!' },
      { who: 'hero', dinhkhang: ['Ở đây không ai đánh một mình. Chỉ cần đủ người.', 'Here no one fights alone. We only need enough of us.'],
        annhien: ['Ép hắn về phía lưới! Đừng cho hắn quay lưng ra sông!', 'Drive him toward the net! Don\'t let him turn his back to the river!'],
        nguyenphong: ['Hắn lùi về bến! Ta khóa đường ấy!', 'He\'s backing toward the jetty! I\'ll close that way!'] },
    ],
  },
  {
    when: { down: 'maulanh' },
    win: true, set: 'ring', waves: false, morale: 1,
    banner: { html: '<em>Máu Lạnh</em> ngã vào lưới — bị cả một làng đánh bại', en: 'Máu Lạnh falls into the net — beaten by a whole village', dur: 260, big: true },
    say: [{ who: 'hero', dinhkhang: ['Lần đầu hắn thua — không phải vì một tráng sĩ, mà vì cả một làng.', 'The first time he ever lost — not to one warrior, but to a whole village.'],
      annhien: ['Trói hắn bằng chính dây móc của hắn.', 'Bind him with his own hook-rope.'],
      nguyenphong: ['Hắn còn sống. Để dân làng giữ hắn.', 'He lives. Let the village keep him.'] }],
  },
];

// ---- prologue ink map of the river country (viewBox 1600×900): the river out of the west through a karst gorge (one
// bridge), the reed branch opening north-east to a fishing village and its tavern, the bamboo forest of Quan Văn's
// students in the north-west, Hoa Lư far down at the south-west with the seven cinnabar threads leaving it, a peak in the
// north-east with three fires. Vague on purpose: no tomb, nothing past the signal peak.
const karsts = (list) => list.map(([x, y, h, w]) => `<path d="M${x - w} ${y} L${x - w * 0.8} ${y - h * 0.8} Q${x - w * 0.5} ${y - h * 1.05} ${x} ${y - h} Q${x + w * 0.6} ${y - h * 1.02} ${x + w * 0.75} ${y - h * 0.75} L${x + w} ${y}Z"/>`).join('');
const RIVER = 'M40 300 C220 330 380 370 520 410 S700 470 790 488 S940 520 1060 560 S1300 650 1580 760';
const BRANCH = 'M930 515 C980 470 1030 430 1110 395 S1230 340 1300 300';
const ROAD = 'M220 720 C300 620 400 520 520 440 S700 480 760 492';
const THREADS = ['M230 730 C300 660 380 600 470 560', 'M230 730 C280 640 300 560 330 470', 'M230 730 C340 700 450 700 560 690',
  'M230 730 C200 640 170 560 150 470', 'M230 730 C320 760 420 790 520 820', 'M230 730 C160 700 110 660 70 610'];
export const PL_MAP = {
  art: `<g class="pl-mark" data-id="karst" fill="url(#pl-mtn)" filter="url(#pl-ink)">${karsts([[700, 470, 110, 26], [742, 452, 140, 30], [830, 470, 120, 26], [870, 455, 90, 22],
    [690, 560, 90, 24], [760, 575, 130, 30], [840, 585, 100, 24], [900, 600, 80, 22], [600, 440, 70, 20], [980, 470, 70, 18]])}</g>
  <g fill="url(#pl-mtn)" filter="url(#pl-ink)" opacity=".7">${karsts([[160, 760, 60, 18], [200, 745, 80, 22], [250, 765, 55, 16], [1180, 250, 60, 18], [1250, 240, 80, 22],
    [1050, 300, 50, 16], [480, 260, 60, 18], [540, 250, 45, 14], [1400, 520, 70, 20], [1460, 500, 90, 24]])}</g>
  <g class="pl-mark" data-id="peak" filter="url(#pl-ink)"><g fill="url(#pl-mtn)">${karsts([[1420, 190, 150, 42], [1480, 205, 110, 30]])}</g>
    <circle cx="1402" cy="46" r="7" fill="#b8321e"/><circle cx="1420" cy="38" r="7" fill="#b8321e"/><circle cx="1438" cy="47" r="7" fill="#b8321e"/></g>
  <g class="pl-mark" data-id="bamboo" filter="url(#pl-ink)" stroke="#3d4a2a" stroke-width="3" opacity=".7">
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<path d="M${250 + i * 26} ${210 - (i % 3) * 10} l${(i % 2 ? 4 : -4)} -70"/>`).join('')}</g>
  <g class="pl-mark" data-id="river" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${RIVER}" stroke="#4e6a60" stroke-width="30" opacity=".3"/><path d="${RIVER}" stroke="#2e463e" stroke-width="7" opacity=".75"/></g>
  <g class="pl-mark" data-id="reeds" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${BRANCH}" stroke="#4e6a60" stroke-width="16" opacity=".3"/><path d="${BRANCH}" stroke="#2e463e" stroke-width="3.5" opacity=".7"/>
    ${[[990, 470], [1030, 440], [1080, 420], [1150, 380], [1000, 500], [1120, 410]].map(([x, y]) => `<path d="M${x} ${y} l-6 -22 M${x + 6} ${y} l2 -24 M${x + 12} ${y} l8 -20" stroke="#5a4a2a" stroke-width="2"/>`).join('')}</g>
  <g class="pl-mark" data-id="threads" filter="url(#pl-ink)" fill="none" stroke="#b8321e" stroke-width="2.5" stroke-dasharray="2 9" stroke-linecap="round" opacity=".8">
    ${THREADS.map((d) => `<path d="${d}"/>`).join('')}</g>
  <g class="pl-mark" data-id="road" filter="url(#pl-ink)" fill="none" stroke="#5a4028" stroke-width="3" stroke-dasharray="10 8" opacity=".7"><path d="${ROAD}"/></g>
  <g class="pl-mark" data-id="station" filter="url(#pl-ink)"><rect x="500" y="420" width="18" height="14" fill="#5a4028" opacity=".75"/></g>
  <g class="pl-mark" data-id="bridge" filter="url(#pl-ink)" stroke="#2b1d12" stroke-width="5" stroke-linecap="round"><path d="M772 462 L790 518"/>
    <path d="M766 470 l12 -4 M770 482 l12 -4 M774 494 l12 -4 M778 506 l12 -4" stroke-width="2.5"/></g>
  <g class="pl-mark" data-id="village" filter="url(#pl-ink)" fill="#3a2a1a" opacity=".8">
    ${[[1180, 360], [1205, 350], [1230, 338], [1196, 378], [1224, 368]].map(([x, y]) => `<path d="M${x - 9} ${y} L${x} ${y - 12} L${x + 9} ${y}Z"/><path d="M${x - 6} ${y} v8 M${x + 6} ${y} v8" stroke="#3a2a1a" stroke-width="2"/>`).join('')}</g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="river"><text class="sm river" x="1210" y="640">深江</text></g>
    <g class="pl-mark" data-id="hoalu"><rect x="212" y="712" width="30" height="30" rx="3"/><text x="140" y="800">華閭</text></g>
    <g class="pl-mark" data-id="road"><text class="sm" x="380" y="500">江路</text></g>
    <g class="pl-mark" data-id="bamboo"><text class="sm" x="270" y="250">竹林</text></g>
    <g class="pl-mark wei" data-id="gorge"><text x="700" y="610">深峽</text><text class="sm" x="808" y="455">一橋</text></g>
    <g class="pl-mark" data-id="reeds"><text class="sm" x="1010" y="520">蘆汊</text></g>
    <g class="pl-mark" data-id="village"><text class="sm" x="1160" y="420">漁村</text></g>
    <g class="pl-mark" data-id="tavern"><rect x="1290" y="284" width="26" height="26" rx="3"/><text x="1330" y="306">小店</text></g>
  </g>`,
  arrows: [
    ['khang', 'shu', 'M240 720 C320 620 420 520 530 440'],
    ['khang2', 'shu', 'M540 440 C640 470 700 478 760 488'],
    ['hunt', 'wei', 'M880 110 C880 230 840 360 792 452'],
    ['tube', 'shu', 'M340 190 C560 200 860 250 1150 340'],
    ['an', 'shu', 'M120 440 C230 440 360 440 500 432'],
    ['float', 'shu', 'M800 505 C860 520 900 520 960 480'],
  ],
};

// ---- prologue cards (format: chapters.js; `vi` = the Vietnamese prose beside the Hán columns). Card 5 branches on the hero.
export const PROLOGUE = [
  { cols: ['七路並發', '水路一條', '不留足跡'], vi: 'Bảy đường cùng mở trong một ngày. Đinh Khang nhận đường sông — nơi không dấu chân nào ở lại.',
    en: 'Seven roads opened in a single day. Đinh Khang took the river road — where no footprint stays.',
    show: ['hoalu', 'threads', 'river', 'khang'], focus: [640, 520, 1.04] },
  { cols: ['每過一站', '棺換一隊', '轍覆舊轍'], vi: 'Cứ qua một trạm, quan tài lại đổi đoàn. Bánh xe mới cán lên dấu cũ, người khiêng đổi áo; chính hộ linh cũng không biết mình đang giữ gì.',
    en: 'At every station the coffins changed columns. New wheels rolled over old ruts, the bearers changed coats; not even the guardians knew what they carried.',
    show: ['road', 'station'], focus: [520, 470, 1.25] },
  { cols: ['三刺分途', '冷血獵水', '各逐其餌'], vi: 'Ba sát thủ không đuổi chung một mồi. Mặt Sẹo săn người giữ thẻ, Hồng Diễm theo tín hiệu từ trong cung — còn Máu Lạnh săn đường nước.',
    en: 'The three assassins did not chase one prey. Mặt Sẹo hunted the token-bearers, Hồng Diễm followed signals from inside the palace — and Máu Lạnh hunted the water road.',
    show: ['hunt', 'karst'], focus: [820, 360, 1.15] },
  { cols: ['竹林被圍', '文官散圖', '空筒出圍'], vi: 'Trong rừng trúc bị vây, Quan Văn chia bản đồ cho học trò. Một chiếc ống bút rỗng — điều không được viết ra — theo người đưa tin lọt khỏi vòng vây.',
    en: 'Surrounded in the bamboo forest, Quan Văn split his map among his students. An empty brush tube — the thing never written — slipped out of the ring with a messenger.',
    show: ['bamboo', 'tube'], focus: [720, 260, 1.12] },
  { dinhkhang: { cols: ['丁康', '生於江上', '水下擇拍'], vi: 'Đinh Khang lớn lên trên sông. Trên bờ, chàng là một tráng sĩ; dưới nước, chàng là người chọn nhịp.',
    en: 'Đinh Khang grew up on the river. On land he is a warrior; in the water, he is the one who chooses the rhythm.' },
  annhien: { cols: ['安然', '代父而行', '循空筒南下'], vi: 'An Nhiên đi thay cha. Cùng Nguyên Phong, nàng lần theo chiếc ống rỗng xuôi về đường sông.',
    en: 'An Nhiên rides in her father\'s place. With Nguyên Phong she follows the hollow tube\'s trail down to the river road.' },
  nguyenphong: { cols: ['元風', '讀林如讀字', '諸路歸江'], vi: 'Nguyên Phong đọc dấu rừng như đọc chữ. Chiếc ống rỗng chỉ cho chàng một điều: mọi ngả rồi cũng đổ về sông.',
    en: 'Nguyên Phong reads the forest like writing. The hollow tube tells him one thing: every path runs down to the river in the end.' },
  show: ['an', 'khang2'], focus: [480, 460, 1.2] },
  { cols: ['深峽一橋', '七棺待渡', '冷血當中'], vi: 'Đường sông chỉ có một cây cầu bắc qua vực nước. Bảy cỗ quan chờ sang — và giữa cầu, một bóng người trọc đầu đứng chờ.',
    en: 'The river road has a single bridge over the deep gorge. Seven coffins wait to cross — and mid-span, a shaven-headed figure waits too.',
    show: ['gorge', 'bridge'], focus: [780, 490, 1.4] },
  { cols: ['蘆汊漁村', '圖上無名', '一店一鐘'], vi: 'Bên kia vực là nhánh sông lau và một làng chài không có trên bản đồ: một quán nhỏ, một quả chuông đồng.',
    en: 'Beyond the gorge lie a reed branch and a fishing village no map shows: a little tavern, a bronze bell.',
    show: ['reeds', 'village', 'tavern', 'float', 'peak'], focus: [1120, 360, 1.18] },
];

// ---- result screen epilogue (win), branched on the hero: the bell goes toward the mountain (ch. 12 p6); Thầy Mo moves a
// thread (ch. 9 p6)
export const EPILOGUE = {
  dinhkhang: {
    zh: ['Máu Lạnh nằm trong lưới cá giữa sân quán, hai lưỡi câu khóa bằng chính dây móc của hắn. Dân làng giải hắn đi trong đêm.',
      'Mưa tạnh. Chủ quán rung chuông báo đường sạch; tiếng chuông chuyền qua làng, qua bến, lên núi. Trên đỉnh, Thầy Mo đổi một sợi chỉ son.',
      'Đinh Khang hiểu ra: trên dòng sông này, chàng chưa từng đi một mình. Những người không tên đã thành một phần của lời thề.'],
    en: ['Máu Lạnh lay in a fishing net in the tavern yard, his two hooks locked with his own hook-rope. The villagers took him away in the night.',
      'The rain stopped. The keeper rang the bell to say the road was clear; the sound passed from village to landing to mountain. On the peak, Thầy Mo moved one cinnabar thread.',
      'Đinh Khang understood: on this river he had never travelled alone. Nameless people had become part of the oath.'],
  },
  annhien: {
    zh: ['An Nhiên nhìn dân làng siết lưới quanh kẻ sát thủ — những bàn tay chưa từng cầm giáo.',
      'Chủ quán rung chuông; dải đèn vàng nối nhau lên triền núi. Xa trên đỉnh, Thầy Mo đổi một sợi chỉ son, ba đoàn khác cùng đổi hướng.',
      'Nàng cất chiếc ống rỗng vào tay áo. Thứ không được viết ra vẫn còn dẫn đường.'],
    en: ['An Nhiên watched the villagers pull the net tight round the assassin — hands that had never held a spear.',
      'The keeper rang the bell; a chain of golden lamps climbed the mountainside. Far up on the peak, Thầy Mo moved one cinnabar thread, and three other columns turned at once.',
      'She tucked the hollow tube into her sleeve. The thing never written was still showing the way.'],
  },
  nguyenphong: {
    zh: ['Nguyên Phong chặn cửa sau quán bằng một cây đòn gánh — lần đầu chàng thấy cả một làng đánh nhau như một người.',
      'Tiếng chuông đi về phía núi. Trên đỉnh xa, ba đốm lửa của thầy chàng vẫn cháy; một sợi chỉ son vừa đổi chỗ.',
      'Dân thường không có tên trong sử sách. Đêm ấy, họ thành phần không tên của lời thề.'],
    en: ['Nguyên Phong barred the tavern\'s back door with a carrying pole — the first time he had seen a whole village fight as one.',
      'The bell\'s sound went toward the mountain. On the far peak his master\'s three fires still burned; one cinnabar thread had just been moved.',
      'Common people have no names in the chronicles. That night they became the nameless part of the oath.'],
  },
};

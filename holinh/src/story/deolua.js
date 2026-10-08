// Màn V «Đèo Lửa · Hang Tối» — stage data (format: src/story/chapters.js header): metadata, speakers, the battle script
// (BEATS), the prologue cards over the ink map of the karst country (PL_MAP), the epilogues, and the trial «Một Mình Giữ
// Đèo» fought on the same field (TRIAL, listed by ./trials.js). Text: .zh = Vietnamese, .en = English; seals and
// prologue cols stay Hán. Adapts comic ch. 13 «Món nợ của Hàng Tướng» and ch. 14 «Người cha trong hang tối» (+ ch. 6
// p1 in the prologue, ch. 15 p1-2 in the epilogues). Legend and fiction (holinh/DESIGN.md §2): the 99 coffins, the
// guardians, the hunters, every line.
// The party on the pass is always the same three — Hàng Tướng, An Nhiên, Nguyên Phong — the hero one of them, the other
// two fighting beside him as ally actors. At the foot the cavalry turn out to hunt Hàng Tướng himself; he gives his
// token to his lieutenant (the true column slips down into the reed valley) and draws the riders up the high pass with
// an empty coffin under the yellow banner; on the one-horse path the mountain itself is turned on them (the rockfall);
// at its end he sets the coffin behind him and turns (a defend point on a timer); then the crest and the beacon.
//   · hero hangtuong: his battle ends on the burning crest. He sends the two young ones down the far side, lights the
//     beacon, and makes his stand against the cavalry commander — a hero-filtered `win` beat (the cave beats after it
//     are for the others; hero-filtered beats are dropped for the heroes they don't list: src/story/index.js).
//   · annhien / nguyenphong: the commander falls, Hàng Tướng stays by the beacon ("đừng quay đầu"); down by moonlight;
//     the column of fire on the crest behind them; Đinh Khang comes up the water; the two halves of the token make a
//     sighting hole that points to the cave; in by the breathing water-gap; the Turnkey, the cell (gate 'cell'), the
//     Left General (npc actor) who said nothing for days asks only whether the coffins still move; Mặt Sẹo the
//     interrogator (boss, breaks off at 30 %); the truth about Nguyên Phong's father, the father who calls his daughter
//     a comrade; before he faints he names the Chief Eunuch; win at the moonlit back opening.
// Map (world/maps/deolua.js): gates 'coc' (barricade), 'cuahang' (never opens), 'cell' / 'tra' (doors); sets 'swap',
// 'rockfall', 'turn', 'beacon', 'sight'; anchors start, column, foot, t1-t3, coc, vai, mot0, motMid, rockfall, motEnd,
// quan, beacon, crest, descent, basin, sight, shore, mouth, gap, gapMid, hall, cellDoor, cell, door, tra, opening.
const NUM = { zh: 'Màn V', en: 'STAGE V' };
export const CH = {
  id: 'deolua', num: NUM, title: { zh: 'Đèo Lửa · Hang Tối', en: 'The Burning Pass, the Dark Cave' },
  seal: '火嶺', era: { zh: 'Năm 979 · hoàng hôn trên đèo', en: '979 AD · dusk on the pass' }, map: 'deolua',
  heroes: ['annhien', 'nguyenphong', 'hangtuong'],
  ally: { annhien: 'nguyenphong', nguyenphong: 'annhien', hangtuong: 'annhien' },
  army: { foe: 'truysat', ally: 'holinh' },
  // the escort of the column, drawn up beside the halted carts at the foot (they stay with the true column)
  van: [{ x: -9, z: -192, n: 10, cols: 5, hold: true }, { x: 9, z: -194, n: 10, cols: 5, hold: true }],
  hq: [2, 210],                                   // the interrogation chamber at the back of the cave
  rank: { kos: [450, 800, 1200], time: [420, 570, 720] },
};

export const SPK = {
  photuong: { name: { zh: 'Phó tướng', en: 'Lieutenant' }, seal: '副', side: 'shu' },
  kytuong: { name: { zh: 'Kỵ tướng truy sát', en: 'Hunter Cavalry Commander' }, seal: '騎', side: 'wei' },
  matseo: { name: { zh: 'Mặt Sẹo', en: 'Mặt Sẹo' }, seal: '疤面', side: 'wei', char: 'matseo' },
  linh: { name: { zh: 'Lính truy sát', en: 'Hunter' }, seal: '兵', side: 'wei' },
  dodau: { name: { zh: 'Kẻ dò dấu', en: 'The Tracker' }, seal: '探', side: 'wei' },
  cungthu: { name: { zh: 'Cung thủ trên đèo', en: 'Ridge Archer' }, seal: '弓', side: 'wei' },
  tuanthu: { name: { zh: 'Đội trưởng tuần hồ', en: 'Lake Patrol Captain' }, seal: '巡', side: 'wei' },
  gac: { name: { zh: 'Lính gác hang', en: 'Cave Guard' }, seal: '守', side: 'wei' },
  cainguc: { name: { zh: 'Cai ngục', en: 'The Turnkey' }, seal: '獄', side: 'wei' },
};

// officers (crowd.spawnOfficer): titles, not invented names; looks in the hunters' black iron and violet (armies.js)
const SEO_HP = 3000;                             // Mặt Sẹo, the boss actor (NPC kit 'matseo'), × game.diff.officerHp
export const OFF = {
  dodau: { name: { zh: 'Kẻ dò dấu', en: 'THE TRACKER' }, hp: 620, look: { helm: 'cap', armor: 0x201e26, trim: 0x8a8296, cape: 0x2e2440 } },
  cungthu: { name: { zh: 'Cung thủ trên đèo', en: 'RIDGE ARCHER' }, hp: 700, look: { helm: 'horn', armor: 0x1e1c24, trim: 0xa89ab0, cape: 0x3e2256, plume: 0x7a40b0 } },
  kyvien: { name: { zh: 'Kỵ binh tiên phong', en: 'VANGUARD RIDER' }, hp: 520, look: { helm: 'crest', armor: 0x24222a, trim: 0xb8a8d0, cape: 0x3e2256, plume: 0x9a50e0 } },
  kytuong: { name: { zh: 'Kỵ tướng truy sát', en: 'HUNTER CAVALRY COMMANDER' }, hp: 2200, boss: true, look: { helm: 'wing', armor: 0x141218, trim: 0xd0c0e0, cape: 0x4a1e6e, plume: 0x9a50e0 } },
  tuanthu: { name: { zh: 'Đội trưởng tuần hồ', en: 'LAKE PATROL CAPTAIN' }, hp: 650, look: { helm: 'cap', armor: 0x18161e, trim: 0x8a8296, cape: 0x2a2a48 } },
  cainguc: { name: { zh: 'Cai ngục', en: 'THE TURNKEY' }, hp: 900, look: { helm: 'horn', armor: 0x141218, trim: 0x8a7a5a, cape: 0x1e0c2e, plume: 0x5a3a20 } },
};

const HT = 'hangtuong', TT = 'tatuong';
const OTHERS = ['annhien', 'nguyenphong'];
const NAG_FOOT = { who: HT, zh: 'Khoan lên dốc. Dẹp xong bọn chặn đường đã.', en: 'Not up the slope yet. Clear the men barring the road first.',
  hangtuong: ['Chưa lên dốc vội. Bọn chặn đường phải dẹp trước.', 'Not up the slope yet. The men barring the road come first.'] };
const NAG_COC = { who: HT, zh: 'Rào cọc còn chắn lối. Hạ tên cung thủ giữ rào trước!', en: 'The stakes still bar the way. Bring down the archer who holds them first!',
  hangtuong: ['Rào cọc còn chắn. Tên cung thủ giữ rào phải ngã trước.', 'The stakes still bar the way. The archer who holds them must fall first.'] };
const NAG_HOLD = { who: HT, zh: 'Đừng rời đầu đường! Để lọt một tên là mất cờ vàng.', en: 'Don\'t leave the head of the path! Let one through and the banner is lost.',
  hangtuong: ['Chưa phải lúc lên đỉnh. Giữ đầu đường đã.', 'Not the crest yet. Hold the head of the path.'] };
const NAG_BACK = { who: 'hero', annhien: ['Không quay đầu. Ông ấy đã dặn.', 'No looking back. He told us.'],
  nguyenphong: ['Đừng quay đầu. Quay đầu là phụ ông ấy.', 'Don\'t look back. Looking back would betray him.'] };
const NAG_CAVE = { who: 'ally', annhien: ['Cửa phòng trong còn đóng. Cứu Tả Tướng trước đã.', 'The inner door is shut. Free the Left General first.'],
  nguyenphong: ['Phòng trong còn khóa. Lo cho cha ta trước đã.', 'The inner room is locked. My father first.'] };
const onPath = (dz, n = 14) => ({ at: ['motEnd', 0, dz], n, charge: true });                                        // up the ledge toward its head

// Pacing (default difficulty): a bot that attacks nonstop clears in ≈ 6-7 min (foot 1 min · the climb and the stakes
// 1.5 min · the ledge 40 s · the hold 50 s · the commander 40 s · basin and token 1 min · cave, cell, Mặt Sẹo 1.5 min ·
// the way out 40 s); Hàng Tướng's shorter run ends on the crest at ≈ 5 min. Officers come forward after the hero has
// fought a while (kos / wait) or reached their post.
export const BEATS = [
  // ---- the foot of the pass: the column halted in the mist, men barring the road ahead, dust behind
  {
    when: { wait: 30 },
    obj: { zh: 'Phá đám quân truy sát chặn chân đèo', en: 'Break the hunters barring the foot of the pass', go: ['foot', 0, 2] },
    squads: [{ at: ['chan', 0.35, 0.25], n: 16 }, { at: ['chan', -0.25, 0.5], n: 16 }, { at: ['foot', 6, 6], n: 18 }],
    limit: { z: ['foot', 0, 10], nag: NAG_FOOT },
    morale: 0,
    say: [
      { who: 'photuong', zh: 'Tướng quân, bụi ngựa phía sau! Cờ hiệu tím, đông lắm.', en: 'General, dust behind us — riders! Purple signal flags, a great many.' },
      { who: HT, zh: 'Phía trước cũng có kẻ chặn đường. Chúng biết đoàn này đi lối nào.', en: 'And men barring the road ahead. They knew which way this column would come.' },
      { who: 'hero', annhien: ['Kẻ nào chặn trước, để tôi mở đường!', 'Whoever bars the way, I\'ll open it!'],
        nguyenphong: ['Vết vó mới, vòng lên trước ta từ chiều. Không phải bọn đi lạc.', 'Fresh hoofprints that circled ahead of us this afternoon. These aren\'t strays.'],
        hangtuong: ['Đoàn quan dừng lại. Ai cầm giáo thì theo ta.', 'Halt the column. Every man with a spear, follow me.'] },
    ],
  },
  // the other two of the three take the field beside the hero
  { hero: ['annhien'], actors: { hang: { kit: HT, role: 'ally', at: ['start', -3, 7] }, ban: { kit: 'nguyenphong', role: 'ally', at: ['start', 3, 5] } } },
  { hero: ['nguyenphong'], actors: { hang: { kit: HT, role: 'ally', at: ['start', -3, 7] }, ban: { kit: 'annhien', role: 'ally', at: ['start', 3, 5] } } },
  { hero: ['hangtuong'], actors: { an: { kit: 'annhien', role: 'ally', at: ['start', -3, 6] }, phong: { kit: 'nguyenphong', role: 'ally', at: ['start', 3, 5] } } },
  {
    when: [{ kos: 30 }, { wait: 20 * 60 }],
    waves: true,
    say: [
      { who: 'linh', zh: 'Kẻ từng hàng ở đâu? Bắt sống hắn!', en: 'Where is the turncoat? Take him alive!' },
      { who: 'ally', annhien: ['Chúng gọi "kẻ từng hàng". Không ai hỏi đến quan tài.', '"The turncoat," they say. Not a word about the coffins.'],
        nguyenphong: ['Chúng không nhìn quan tài lấy một lần. Lạ thật.', 'They haven\'t looked at the coffins once. Strange.'],
        hangtuong: ['Chúng gọi ông đấy, tướng quân.', 'They are calling for you, General.'] },
    ],
  },
  {
    when: [{ kos: 50 }, { wait: 40 * 60 }],
    officers: { dodau: { at: ['foot', 8, 6], engaged: true } },
    squads: [{ at: ['foot', -10, 8], n: 16, charge: true }, { at: ['chan', 0.4, -0.4], n: 14, charge: true }],
    obj: { zh: 'Đánh bại Kẻ dò dấu', en: 'Defeat the Tracker', go: 'dodau' },
    say: [
      { who: 'dodau', zh: 'Mặc kệ quan tài! Kỵ tướng muốn đầu kẻ từng hàng — sống càng tốt.', en: 'Forget the coffins! The commander wants the turncoat — alive if we can.' },
      { who: HT, zh: 'Vậy ra chúng không săn quan tài. Chúng săn ta.', en: 'So they are not hunting coffins. They are hunting me.' },
      { who: HT, zh: 'Kẻ phản bội biết người từng hàng sẽ được giao con đường khó đoán nhất.', en: 'The traitor knew the man who once yielded would be given the hardest road to guess.' },
    ],
  },
  // ---- the swap (ch. 13 p3): the token to the lieutenant, the true column into the reeds, the yellow banner up the pass
  {
    when: { down: 'dodau' },
    set: 'swap', heal: 0.2, morale: 0.08, hush: true,
    banner: { html: '<em>Đổi áo, đổi mồi</em> — cờ vàng lên đèo cao', en: 'A change of cloaks, a change of bait — the yellow banner climbs the pass', dur: 200, big: true },
    obj: { zh: 'Kéo kỵ binh theo cờ vàng lên dốc lau', en: 'Draw the riders after the yellow banner up the reed climb', go: ['t2', 0, 0] },
    limit: { z: ['coc', 0, -4], nag: NAG_COC },
    squads: [{ at: ['t1', 0, 0], n: 16 }, { at: ['t2', 4, 0], n: 16 }, { at: ['column', 8, -6], n: 14, charge: true }],
    say: [
      { who: HT, zh: 'Phó tướng, giữ lấy thẻ của ta. Đưa đoàn thật xuống thung lau.', en: 'Lieutenant, take my token. Lead the true column down into the reed valley.' },
      { who: 'photuong', zh: 'Còn tướng quân?', en: 'And you, General?' },
      { who: HT, zh: 'Ta kéo cỗ quan rỗng lên đèo cao. Cờ vàng ở đâu, chúng theo đó.', en: 'I take the empty coffin up the high pass. Wherever the yellow banner goes, they follow.' },
      { who: 'hero', annhien: ['Đường tìm cha tôi cũng qua đỉnh đèo. Tôi đi cùng ông.', 'My road to my father crosses that crest too. I go with you.'],
        nguyenphong: ['Chuông chỉ về phía núi. Tôi lên đèo cùng ông.', 'The bell pointed to the mountain. I\'m climbing with you.'],
        hangtuong: ['Hai người xuống thung cùng đoàn thật đi.', 'You two, go down to the valley with the true column.'] },
      { who: 'ally', annhien: ['Ba người, một cờ vàng. Đủ để chúng nhìn lầm.', 'Three of us and one yellow banner. Enough to fool their eyes.'],
        nguyenphong: ['Vậy thì nhanh lên. Cờ vàng phải đi trước bụi ngựa.', 'Then move. The banner must stay ahead of their dust.'],
        hangtuong: ['Đường tìm cha tôi qua đỉnh đèo ấy. Ông không đuổi tôi được đâu.', 'My road to my father crosses that crest. You can\'t send me away.'] },
    ],
  },
  // ---- the white reed climb: the whole cavalry wheels after the banner
  {
    when: { zone: 'doc' },
    waves: true,
    banner: { html: 'Toàn bộ kỵ binh <em>đổi hướng</em> theo cờ vàng', en: 'The whole cavalry wheels after the yellow banner', dur: 170 },
    squads: [{ at: ['t1', -12, -8], n: 14, charge: true }, { at: ['t1', -24, -12], n: 14, charge: true }, { at: ['t3', 0, 0], n: 16 }],
    say: [
      { who: 'kytuong', zh: 'Cờ vàng! Cỗ quan thật ở đó! Tất cả theo cờ vàng!', en: 'The yellow banner! That\'s the true coffin! Everyone after the banner!' },
      { who: 'hero', annhien: ['Chúng cắn câu rồi. Không ai ngoái về thung lau.', 'They\'ve taken the bait. Not one looks back at the reed valley.'],
        nguyenphong: ['Bụi ngựa quay cả về phía ta. Đoàn thật thoát rồi.', 'All their dust is turning our way. The true column is clear.'],
        hangtuong: ['Theo đi. Theo cho hết đèo này.', 'Follow, then. Follow me to the end of this pass.'] },
    ],
  },
  {
    when: [{ at: ['t3', 0, 0] }, { kos: 80 }],
    officers: { cungthu: { at: ['coc', 3, -7], engaged: true } },
    squads: [{ at: ['coc', -6, -9], n: 14 }, { at: ['coc', 9, -12], n: 14 }],
    obj: { zh: 'Đánh bại Cung thủ trên đèo, phá rào cọc', en: 'Defeat the Ridge Archer and break the stake barricade', go: 'cungthu' },
    say: [{ who: 'cungthu', zh: 'Rào cọc này chặn cả ngựa lẫn người. Bắn!', en: 'These stakes stop horse and man alike. Loose!' }],
  },
  {
    when: { down: 'cungthu' },
    gate: 'coc', heal: 0.25, morale: 0.1, hush: true, retire: true,
    banner: { html: '<em>Rào cọc</em> đã phá — lên lưng đèo!', en: 'The stakes are down — onto the shoulder!', dur: 170 },
    obj: { zh: 'Qua lưng đèo, vào đường một ngựa', en: 'Cross the shoulder to the one-horse path', go: ['mot0', 0, 8] },
    limit: { z: ['quan', 0, -3] },
    squads: [{ at: ['vai', -8, -2], n: 16 }, { at: ['vai', 8, 4], n: 16 }, { at: ['t3', -6, 4], n: 12, charge: true }],
    say: [{ who: HT, zh: 'Lên! Trước mặt là đường một ngựa.', en: 'Up! The one-horse path lies ahead.' }],
  },
  // ---- the one-horse path (ch. 13 p4): numbers are a burden; the stakes that hold the rocks
  {
    when: { at: ['mot0', 0, 4] },
    waves: false,
    banner: { html: '<em>Con đường chỉ đủ một ngựa</em>', en: 'A path wide enough for one horse', dur: 190, big: true },
    obj: { zh: 'Vượt đường một ngựa', en: 'Cross the one-horse path', go: ['motEnd', 0, 4] },
    squads: [{ at: ['motMid', 0, -12], n: 12 }, { at: ['motMid', 0, 10], n: 12 }, { at: ['vai', 0, 2], n: 12, charge: true }],
    say: [
      { who: HT, zh: 'Đường này chỉ vừa một ngựa. Ở đây, quân đông thành gánh nặng.', en: 'This path takes one horse at a time. Up here, numbers are a burden.' },
      { who: 'hero', annhien: ['Một bên vực, một bên vách. Không ai vượt được ai.', 'A drop on one side, a wall on the other. No one gets past anyone.'],
        nguyenphong: ['Đá treo trên vách kia, chỉ chờ một mũi tên.', 'Those rocks on the wall are only waiting for one arrow.'],
        hangtuong: ['Mỗi bước ở đây đổi lấy một quãng cho đoàn thật.', 'Every step up here buys the true column another stretch of road.'] },
    ],
  },
  {
    when: { at: ['rockfall', 0, 2] },
    set: 'rockfall',
    limit: { z: ['quan', 0, -3], back: ['rockfall', 0, 3] },
    banner: { html: 'Cọc gãy — <em>đá lăn</em> chặn đường kỵ binh!', en: 'The stakes snap — boulders roll down across the riders\' road!', dur: 170 },
    squads: [onPath(-6, 10)],
    say: [
      { who: 'hero', nguyenphong: ['Một mũi tên, một cọc. Đá xuống!', 'One arrow, one stake. Down they go!'] },
      { who: HT, zh: 'Bắn đứt cọc giữ đá! Để núi chặn chúng một lúc.', en: 'Shoot out the stakes! Let the mountain hold them a while.',
        nguyenphong: ['Bắn khéo. Núi sẽ giữ chúng một lúc.', 'Well shot. The mountain will hold them a while.'] },
    ],
  },
  // ---- the turn (ch. 13 p5): the empty coffin set down behind him, the riders coming up the ledge one by one
  {
    when: { at: ['motEnd', 0, 0] },
    set: 'turn', heal: 0.2,
    banner: { html: 'Đến cuối đèo, <em>quay ngựa lại</em>', en: 'At the end of the pass, he turns his horse around', dur: 190, big: true },
    defend: { key: 'quan', at: ['quan', 0, 0], r: 5, hp: 1800, name: { zh: 'Cỗ quan rỗng', en: 'The Empty Coffin' } },
    fail: { when: { hp: ['quan', 0.01] }, zh: 'Kỵ binh đã cướp được cờ vàng……', en: 'The riders have taken the yellow banner...' },
    obj: { zh: 'Quay lại giữ đầu đường một ngựa', en: 'Turn and hold the head of the one-horse path', go: ['motEnd', 0, 1], timer: 50 },
    limit: { z: ['quan', 0, 2], back: ['rockfall', 0, 3], nag: NAG_HOLD },
    squads: [onPath(-16), onPath(-30)],
    say: [
      { who: HT, zh: 'Đặt cỗ quan sau lưng ta. Đến đây thì quay lại.', en: 'Set the coffin down behind me. This is where we turn.' },
      { who: 'kytuong', zh: 'Nó dừng lại rồi! Lên! Từng ngựa một, lên hết!', en: 'He has stopped! Up! One horse at a time — all of you, up!' },
      { who: 'hero', annhien: ['Một người một bước. Chúng đông, mặc chúng.', 'One man, one step at a time. Let them be many.'],
        nguyenphong: ['Chúng đến từng người một, như bầy thú qua khe.', 'They come one by one, like a herd through a gully.'],
        hangtuong: ['Cả đời ta theo sau người khác. Hôm nay để chúng theo sau ta.', 'All my life I followed others. Today they follow me.'] },
    ],
  },
  {
    when: { wait: 14 * 60 },
    officers: { kyvien1: { at: ['motEnd', 0, -14], engaged: true, like: 'kyvien' } },
    squads: [onPath(-24)],
    banner: { html: '<em>Kỵ binh tiên phong</em> xuống ngựa, leo lên', en: 'The vanguard riders dismount and climb', dur: 150 },
  },
  {
    when: { wait: 16 * 60 },
    heal: 0.1,
    officers: { kyvien2: { at: ['motEnd', 0, -16], engaged: true, like: 'kyvien' } },
    squads: [onPath(-20), onPath(-32)],
    say: [{ who: 'linh', zh: 'Đường hẹp quá, không dàn quân được!', en: 'The path\'s too narrow, we can\'t spread out!' }],
  },
  {
    when: { timer: true },
    defend: null, fail: null, heal: 0.3, morale: 0.12, hush: true,
    banner: { html: '<em>Đầu đường một ngựa</em> vẫn trong tay ta', en: 'The head of the one-horse path still holds', dur: 170 },
    obj: { zh: 'Lên đỉnh đèo', en: 'Climb onto the crest', go: ['crest', 0, 0] },
    limit: { z: ['crest', 0, 10], back: ['quan', 0, -6] },
    say: [{ who: HT, zh: 'Đủ rồi. Lên đỉnh đèo.', en: 'Enough. Up to the crest.' }],
  },
  // ---- Hàng Tướng's own road ends here (ch. 13 p5-6): the farewell, the beacon, the last stand — win on the burning crest
  {
    hero: [HT], when: { near: [['crest', 0, 0], 8] },
    actor: [{ key: 'an', do: 'retreat', at: ['descent', 0, 0] }, { key: 'phong', do: 'retreat', at: ['descent', 0, 0] }],
    obj: { zh: 'Đốt đèn hiệu trên đỉnh đèo', en: 'Light the beacon on the crest', go: ['beacon', -4, -3] },
    say: [
      { who: 'hero', hangtuong: ['Đến đây thôi. Hai người xuống núi, tìm Tả Tướng.', 'This is as far as you come. Go down the mountain and find the Left General.'] },
      { who: 'annhien', zh: 'Còn ông thì sao?', en: 'And what about you?' },
      { who: 'hero', hangtuong: ['Ta đốt đèn hiệu. Thấy lửa thì cứ đi, đừng quay đầu.', 'I light the beacon. When you see the fire, keep going. Don\'t look back.'] },
      { who: 'nguyenphong', zh: 'Quay đầu thì lựa chọn của ông thành vô nghĩa. Tôi hiểu.', en: 'If we look back, your choice means nothing. I understand.' },
    ],
  },
  {
    hero: [HT], when: { near: [['beacon', -4, -3], 5] },
    set: 'beacon', heal: 0.25, morale: -0.1, waves: true,
    banner: { html: '<em>Đèn hiệu</em> bùng cháy trên đỉnh đèo', en: 'The beacon blazes on the crest', dur: 200, big: true },
    officers: { kytuong: { at: ['quan', 0, -10], engaged: true } },
    squads: [onPath(-14, 16), onPath(-26, 16), { at: ['crest', -10, 4], n: 12, charge: true }],
    obj: { zh: 'Trận cuối: đánh bại Kỵ tướng truy sát', en: 'Last stand: defeat the Hunter Cavalry Commander', go: 'kytuong' },
    limit: { z: ['crest', 0, 10], back: ['quan', 0, -10] },
    say: [
      { who: 'kytuong', zh: 'Một mình mà dám chắn cả đoàn kỵ binh? Kẻ từng hàng, lần này chẳng ai tha ngươi nữa!', en: 'Alone against a whole troop of horse? Turncoat — this time no one will spare you!' },
      { who: 'hero', hangtuong: ['Năm xưa có người tha ta. Ta dùng phần đời ấy để trả lời.', 'Long ago a man spared me. I have spent that life on the answer.'] },
    ],
  },
  {
    hero: [HT], when: { below: ['kytuong', 0.5] }, skip: { down: 'kytuong' },
    squads: [onPath(-12, 14), { at: ['crest', 10, 6], n: 12, charge: true }],
    say: [
      { who: 'hero', hangtuong: ['Lửa còn cháy thì đèo còn người giữ.', 'While the fire burns, the pass has a keeper.'] },
      { who: 'hero', hangtuong: ['Phó tướng, đừng quay đầu. Đi cho hết đường.', 'Lieutenant, don\'t look back. Go to the end of the road.'] },
    ],
  },
  {
    hero: [HT], when: { down: 'kytuong' },
    win: true, waves: false, morale: 1,
    banner: { html: '<em>Cột lửa cuối cùng</em> — tuyến đèo đã cắt đuôi', en: 'The last column of fire — the pass road has shaken off its hunters', dur: 260, big: true },
    say: [{ who: 'hero', hangtuong: ['Món nợ được tha mạng, ta không trả cho một người. Ta trả cho mảnh đất này.', 'The debt of a spared life I do not pay to one man. I pay it to this land.'] }],
  },
  // ---- the others: the commander on the crest, Hàng Tướng stays by the beacon
  {
    hero: OTHERS, when: { near: [['crest', 0, 0], 9] },
    waves: true,
    officers: { kytuong: { at: ['quan', 0, -10], engaged: true } },
    squads: [onPath(-14, 16), onPath(-26, 14), { at: ['crest', 10, 6], n: 12, charge: true }],
    obj: { zh: 'Đánh bại Kỵ tướng truy sát', en: 'Defeat the Hunter Cavalry Commander', go: 'kytuong' },
    limit: { z: ['crest', 0, 10], back: ['quan', 0, -10] },
    say: [
      { who: 'kytuong', zh: 'Cỗ quan ấy rỗng ư? Không sao. Đầu kẻ từng hàng cũng đủ đổi thưởng.', en: 'The coffin is empty? No matter. The turncoat\'s head will fetch the reward.' },
      { who: HT, zh: 'Muốn đầu ta thì lên đây mà lấy.', en: 'Want my head? Come up and take it.' },
    ],
  },
  {
    hero: OTHERS, when: { down: 'kytuong' },
    heal: 0.35, morale: 0.15, hush: true, retire: true, waves: false,
    actor: { key: 'hang', do: 'hold', at: ['beacon', -4, -3] },
    banner: { html: '<em>Kỵ tướng truy sát</em> đã ngã — đỉnh đèo tạm yên', en: 'The Hunter Cavalry Commander has fallen — the crest is quiet for now', dur: 190 },
    obj: { zh: 'Xuống núi theo ánh trăng — đừng quay đầu', en: 'Go down the mountain by moonlight — don\'t look back', go: ['basin', 0, -8] },
    limit: { z: ['gap', 0, 2], back: ['crest', 0, 9], nag: NAG_BACK },
    say: [
      { who: HT, zh: 'Đến đây là hết đường của ta. Hai người xuống núi, cứu Tả Tướng.', en: 'This is where my road ends. You two go down and save the Left General.' },
      { who: 'hero', annhien: ['Ông ở lại một mình sao?', 'You stay here alone?'], nguyenphong: ['Còn ông thì sao?', 'And what about you?'] },
      { who: HT, zh: 'Ta đốt đèn hiệu. Thấy lửa thì cứ đi. Quay đầu là lựa chọn của ta thành vô nghĩa.', en: 'I light the beacon. When you see the fire, keep going. Look back, and my choice means nothing.' },
      { who: 'ally', annhien: ['Đi thôi. Đừng để ông ấy phải nói lần thứ hai.', 'Let\'s go. Don\'t make him say it twice.'],
        nguyenphong: ['Ta đi. Đó là lệnh của ông ấy.', 'We go. That is his order.'] },
    ],
  },
  // ---- the lake basin by moonlight: the column of fire behind them (ch. 13 p6), the patrol, Đinh Khang, the token
  {
    hero: OTHERS, when: { zone: 'thung' },
    set: 'beacon', waves: true, morale: 0.05,
    banner: { html: '<em>Cột lửa cuối cùng</em> bùng trên đỉnh đèo', en: 'The last column of fire blazes on the crest', dur: 220, big: true },
    officers: { tuanthu: { at: ['basin', 10, 8], engaged: true } },
    squads: [{ at: ['basin', -8, 10], n: 16 }, { at: ['basin', 14, -4], n: 16, charge: true }],
    obj: { zh: 'Dẹp toán tuần quanh hồ', en: 'Break the patrol by the lake', go: 'tuanthu' },
    say: [
      { who: 'ally', annhien: ['Lửa trên đỉnh đèo… tuyến đèo đã cắt đuôi.', 'Fire on the crest... the pass road has shaken them off.'],
        nguyenphong: ['Lửa trên đỉnh đèo. Ông ấy đã đốt rồi.', 'Fire on the crest. He has lit it.'] },
      { who: 'hero', annhien: ['Không quay đầu. Đi tiếp.', 'No looking back. Keep going.'], nguyenphong: ['Ông ấy dặn đừng quay đầu. Đi.', 'He told us not to look back. Go.'] },
      { who: 'tuanthu', zh: 'Ai đó? Có kẻ xuống từ đèo!', en: 'Who goes there? Someone\'s come down off the pass!' },
    ],
  },
  {
    hero: OTHERS, when: { down: 'tuanthu' },
    heal: 0.2, hush: true, waves: false,
    actors: { khang: { kit: 'dinhkhang', role: 'ally', at: ['shore', 2, 6] } },
    obj: { zh: 'Ghép hai nửa thẻ đồng dưới trăng', en: 'Fit the two halves of the bronze token together under the moon', go: ['sight', 0, 0] },
    say: [
      { who: 'dinhkhang', zh: 'Chuông đường sông báo về núi này. Tôi theo nước mà đến.', en: 'The river bell rang toward this mountain. I followed the water here.' },
      { who: 'hero', annhien: ['Đinh Khang! Đến đúng lúc.', 'Đinh Khang! Just in time.'], nguyenphong: ['Người của nước, đến đúng chỗ có nước.', 'The river man, right where the water is.'] },
    ],
  },
  {
    hero: OTHERS, when: { near: [['sight', 0, 0], 5] },
    set: 'sight',
    banner: { html: 'Hai nửa thẻ thành <em>một lỗ ngắm</em>', en: 'The two halves make a sighting hole', dur: 200 },
    say: [
      { who: 'nguyenphong', zh: 'Hai nửa thẻ không ghép thành chữ. Chúng thành một lỗ ngắm.', en: 'The two halves don\'t make a word. They make a sighting hole.' },
      { who: 'annhien', zh: 'Ánh trăng xuyên qua… chỉ đúng cửa hang bên kia hồ. Cha tôi ở trong đó.', en: 'The moonlight passes through... straight at the cave mouth across the lake. My father is in there.' },
    ],
  },
  {
    hero: OTHERS, when: { wait: 8 * 60 },
    obj: { zh: 'Cửa chính có quân canh — vào bằng khe nước thở', en: 'The main mouth is guarded — go in by the breathing gap', go: ['gapMid', 0, -4] },
    limit: { z: ['gapMid', 0, 0], back: ['crest', 0, 9], nag: NAG_BACK },
    squads: [{ at: ['mouth', 0, 2], n: 14 }, { at: ['basin', 16, 12], n: 12, charge: true }],
    say: [
      { who: 'gac', zh: 'Canh cho kỹ! Kỵ tướng dặn: lão già trong ngục không được ra.', en: 'Keep a sharp watch! The commander said the old man in the cell must not get out.' },
      { who: 'nguyenphong', zh: 'Nghe kìa: nước trong khe dâng lên rồi rút, theo nhịp gió. Đường ấy thở được.', en: 'Listen — the water in that gap rises and falls with the wind. That way can breathe.' },
      { who: 'dinhkhang', zh: 'Đường nước để tôi dẫn. Bọc chuông lại, đừng để nó kêu.', en: 'Leave the water road to me. Wrap the bell — don\'t let it ring.' },
    ],
  },
  // ---- in by the breathing water (ch. 14 p2), the hall, the cell (p3)
  {
    hero: OTHERS, when: { at: ['gap', 0, 6] },
    banner: { html: 'Vào hang bằng <em>đường nước thở</em>', en: 'Into the cave by the breathing water', dur: 170 },
    obj: { zh: 'Theo khe nước vào lòng hang', en: 'Follow the gap into the heart of the cave', go: ['hall', 0, -8] },
    limit: { z: ['door', 0, -2], back: ['gap', 0, 0], nag: NAG_CAVE },
    squads: [{ at: ['gapMid', 0, 6], n: 8 }],
    say: [{ who: 'hero', annhien: ['Đợi nước rút… thở một hơi… đi.', 'Wait for the water to fall... one breath... go.'],
      nguyenphong: ['Nước rút rồi. Một hơi ngắn, đi!', 'The water\'s down. One short breath — go!'] }],
  },
  {
    hero: OTHERS, when: { zone: 'hang' },
    banner: { html: '<em>Hang tối</em> — đuốc cháy dọc vách đá', en: 'The dark cave — torches along the rock walls', dur: 170 },
    actors: { ta: { kit: TT, role: 'npc', at: ['cell', -1.5, 0], yaw: -Math.PI / 2 } },
    actor: { key: 'ta', do: 'hold', at: ['cell', -1.5, 0] },
    officers: { cainguc: { at: ['hall', 8, 2], engaged: true } },
    squads: [{ at: ['hall', -8, 4], n: 16, charge: true }, { at: ['hall', 10, -4], n: 14 }, { at: ['hall', 0, 10], n: 14, charge: true }],
    obj: { zh: 'Hạ Cai ngục, lấy chìa khóa ngục', en: 'Bring down the Turnkey and take the cell keys', go: 'cainguc' },
    say: [
      { who: 'cainguc', zh: 'Kẻ nào lọt vào đây? Chặn hết các ngả!', en: 'Who got in here? Seal every passage!' },
      { who: 'hero', annhien: ['Cha!', 'Father!'], nguyenphong: ['Tả Tướng ở sau song gỗ kia!', 'The Left General — behind those bars!'] },
    ],
  },
  {
    hero: OTHERS, when: { down: 'cainguc' },
    gate: 'cell', heal: 0.25, morale: 0.1, hush: true,
    banner: { html: '<em>Cửa ngục</em> đã phá', en: 'The cell door is broken open', dur: 160 },
    actor: { key: 'ta', do: 'follow' },
    obj: { zh: 'Đến bên Tả Tướng', en: 'Go to the Left General', go: ['cellDoor', 0, 0] },
    say: [
      { who: TT, zh: 'Mấy ngày rồi ta không nói một lời. Giờ chỉ hỏi một câu…', en: 'For days I have not said a word. Now one question only...' },
      { who: TT, zh: 'Đoàn quan còn đi không?', en: 'Are the coffins still moving?' },
      { who: 'hero', annhien: ['Còn, thưa cha. Bảy đường vẫn đi.', 'They are, Father. All seven roads still move.'],
        nguyenphong: ['Còn đi. Hàng Tướng đã kéo kỵ binh lên đèo cho đoàn thật.', 'They still move. Hàng Tướng drew the riders up the pass for the true column.'] },
      { who: TT, zh: 'Vậy thì… giờ ta mới cho phép mình ngã.', en: 'Then... only now may I let myself fall.' },
    ],
  },
  // ---- Mặt Sẹo the interrogator: boss, breaks off at 30 %
  {
    hero: OTHERS, when: { wait: 12 * 60 },
    gate: 'tra', morale: -0.1,
    banner: { html: '<em>Mặt Sẹo</em> — kẻ tra hỏi trong hang tối', en: 'Mặt Sẹo — the interrogator of the dark cave', dur: 220, big: true },
    actors: { seo: { kit: 'matseo', role: 'boss', at: ['door', 0, 7], hp: SEO_HP, poise: 460, retreatAt: 0.3, name: { zh: 'Mặt Sẹo', en: 'MẶT SẸO' }, seal: '疤面' } },
    squads: [{ at: ['door', -6, -6], n: 12, charge: true }, { at: ['hall', -12, 0], n: 12, charge: true }],
    obj: { zh: 'Đánh bại Mặt Sẹo, kẻ tra hỏi', en: 'Defeat Mặt Sẹo, the interrogator', go: 'seo' },
    say: [
      { who: 'matseo', zh: 'Lão già câm suốt bao ngày, hóa ra là chờ con gái đến.', en: 'The old man kept his mouth shut for days — waiting for his daughter, it seems.' },
      { who: 'matseo', zh: 'Để ta hỏi lại từ đầu. Lần này hỏi cả bọn.', en: 'Let me start the questions over. All of you, this time.' },
      { who: 'hero', annhien: ['Ngươi hỏi cha ta đủ rồi. Giờ đến lượt ngọn giáo này hỏi ngươi.', 'You have questioned my father enough. Now my spear asks the questions.'],
        nguyenphong: ['Ngươi để dấu khắp rừng. Hôm nay dấu dừng ở đây.', 'You left tracks all through the forest. Today they end here.'] },
    ],
  },
  {
    hero: OTHERS, when: { below: ['seo', 0.65] }, skip: { down: 'seo' },
    squads: [{ at: ['door', 6, -4], n: 12, charge: true }, { at: ['hall', 12, 4], n: 12, charge: true }],
    say: [
      { who: 'matseo', zh: 'Lính gác đâu! Chặn ngả nước lại!', en: 'Guards! Block the water passage!' },
      { who: 'dinhkhang', zh: 'Ngả nước là của tôi. Không ai chặn được.', en: 'The water passage is mine. No one blocks it.' },
    ],
  },
  {
    hero: OTHERS, when: { down: 'seo' },
    heal: 0.3, morale: 0.15, hush: true, retire: true,
    banner: { html: 'Mặt Sẹo bỏ chạy theo <em>ngả nước sau hang</em>', en: 'Mặt Sẹo breaks off through the water passage behind the cave', dur: 200, big: true },
    obj: { zh: 'Đưa Tả Tướng ra cửa hang sau', en: 'Bring the Left General to the back opening of the cave', go: ['opening', 0, -2] },
    limit: { z: null, back: ['hall', 0, -6] },
    say: [
      { who: 'matseo', zh: 'Hôm nay để lão cho các ngươi. Đường còn dài, ta còn gặp lại.', en: 'Keep the old man today. The road is long — we\'ll meet again.' },
      // ch. 14 p4: the truth about Nguyên Phong's father
      { who: TT, zh: 'Nguyên Phong. Đây là dây cung của cha cậu.', en: 'Nguyên Phong. This was your father\'s bowstring.' },
      { who: TT, zh: 'Năm ấy cha cậu đỡ cho ta một mũi tên. Ta nhờ Thầy Mo nuôi cậu xa triều đình.', en: 'That year your father took an arrow meant for me. I asked the shaman to raise you far from the court.' },
      { who: 'nguyenphong', zh: 'Để tránh vòng báo oán… Vậy mà bao năm ông chẳng nói.', en: 'To keep me out of the cycle of revenge... and all these years you never said.' },
    ],
  },
  // ch. 14 p5: the father calls his daughter a comrade and waits for her order
  {
    hero: OTHERS, when: { wait: 15 * 60 },
    say: [
      { who: TT, zh: 'An Nhiên. Cha đã dùng sợ hãi làm tường quanh con. Cha sai rồi.', en: 'An Nhiên. I built a wall of fear around you. I was wrong.' },
      { who: TT, zh: 'Cha không bảo con trở về nữa. Con là người giữ tuyến. Cha chờ lệnh con.', en: 'I won\'t tell you to go home again. You hold this road now. I wait for your order.' },
      { who: 'annhien', zh: 'Vậy thì, thưa đồng đội: ra ánh trăng.', en: 'Then, comrade: out into the moonlight.' },
    ],
  },
  // ch. 14 p6: before he faints, the name
  {
    hero: OTHERS, when: { near: [['opening', 0, -2], 7], wait: 12 * 60 },
    banner: { html: 'Trước khi ngất đi, Tả Tướng nói một cái tên: <em>Hoạn Quan</em>', en: 'Before he faints, the Left General names a name: the Chief Eunuch', dur: 240, big: true },
    say: [
      { who: TT, zh: 'Kẻ tra hỏi biết mật ấn, biết giờ đổi ca, biết cả cách buộc chỉ trong kho.', en: 'The man who questioned me knew the seal, the change of the watch, even how the threads are knotted in the store.' },
      { who: TT, zh: 'Chỉ một người trong cung biết đủ những điều ấy… Là Hoạn Quan.', en: 'Only one man in the palace knows all of that... The Chief Eunuch.' },
      { who: 'hero', annhien: ['Hoạn Quan… người ta báo đã chết dưới vực.', 'The Chief Eunuch... they said he died at the bottom of a gorge.'],
        nguyenphong: ['Kẻ đã chết dưới vực… Thảo nào dấu chân hoàn hảo đến thế.', 'The man who died in the gorge... no wonder the tracks were so perfect.'] },
    ],
  },
  {
    hero: OTHERS, when: { wait: 13 * 60 },
    win: true, waves: false, morale: 1,
    banner: { html: '<em>Tả Tướng</em> đã ra khỏi hang tối', en: 'The Left General is free of the dark cave', dur: 260, big: true },
    say: [{ who: 'hero', annhien: ['Cha, con đưa cha ra ánh trăng.', 'Father, I\'ll take you out into the moonlight.'], nguyenphong: ['Ra thôi. Trăng còn sáng.', 'Out we go. The moon is still up.'] }],
  },
];

// ---- prologue ink map of the karst country (viewBox 1600×900): Hoa Lư's towers in the west, the reed valley, the pass
// climbing to its beacon, the lake basin and the cave beyond; the hunters' riders, the column's two roads
const karsts = (list) => list.map(([x, y, h, w]) => `<path d="M${x - w} ${y} L${x - w * 0.8} ${y - h * 0.8} Q${x - w * 0.5} ${y - h * 1.05} ${x} ${y - h} Q${x + w * 0.6} ${y - h * 1.02} ${x + w * 0.75} ${y - h * 0.75} L${x + w} ${y}Z"/>`).join('');
const PASS = 'M560 760 C600 700 640 690 660 640 S700 560 760 520 S860 470 900 430';
const DESC = 'M900 430 C950 450 990 500 1030 540 S1100 600 1150 610';
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${karsts([[120, 640, 150, 40], [200, 610, 190, 46], [290, 650, 130, 36], [380, 620, 170, 40], [90, 760, 110, 34], [330, 780, 120, 36]])}
    ${karsts([[1260, 520, 170, 44], [1350, 560, 210, 50], [1450, 520, 160, 40], [1540, 580, 190, 46], [1200, 700, 120, 36], [1480, 760, 140, 40]])}
  </g>
  <g class="pl-mark" data-id="pass" fill="url(#pl-mtn)" filter="url(#pl-ink)">${karsts([[700, 560, 150, 60], [820, 500, 230, 80], [930, 470, 280, 70], [1020, 500, 200, 60]])}</g>
  <g class="pl-mark" data-id="pass" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${PASS}" stroke="#4e4430" stroke-width="4" stroke-dasharray="10 7" opacity=".8"/>
  </g>
  <g class="pl-mark" data-id="lake" filter="url(#pl-ink)">
    <ellipse cx="1150" cy="640" rx="110" ry="42" fill="#7a6a4c" opacity=".3"/><ellipse cx="1150" cy="640" rx="96" ry="34" fill="none" stroke="#4e4430" stroke-width="3" opacity=".6"/>
    <path d="${DESC}" fill="none" stroke="#4e4430" stroke-width="3" stroke-dasharray="6 8" opacity=".55"/>
  </g>
  <g class="pl-mark" data-id="cave" filter="url(#pl-ink)"><path d="M1236 612 q14 -26 30 0 z" fill="#2a2218" opacity=".85"/></g>
  <g class="pl-mark" data-id="reeds" filter="url(#pl-ink)" stroke="#6f6448" stroke-width="3" opacity=".55" fill="none">
    <path d="M420 800 q6 -30 2 -50 M440 806 q4 -26 8 -46 M462 800 q2 -34 -4 -52 M484 808 q6 -28 10 -44 M506 802 q0 -30 -6 -48 M528 806 q8 -24 6 -42"/>
  </g>
  <g class="pl-mark" data-id="beacon" filter="url(#pl-ink)"><path d="M900 430 q-10 -40 4 -70 q8 24 18 8 q8 34 -6 62z" fill="#a8401c" opacity=".85"/></g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="hoalu"><rect x="214" y="676" width="30" height="30" rx="3"/><text x="160" y="730">華閭</text></g>
    <g class="pl-mark" data-id="reeds"><text class="sm" x="430" y="842">蘆谷</text></g>
    <g class="pl-mark" data-id="pass"><text x="700" y="440">火嶺</text></g>
    <g class="pl-mark" data-id="beacon"><text class="sm" x="932" y="350">烽臺</text></g>
    <g class="pl-mark" data-id="lake"><text class="sm river" x="1104" y="700">月湖</text></g>
    <g class="pl-mark wei" data-id="cave"><rect x="1236" y="580" width="30" height="30" rx="3"/><text x="1282" y="606">幽洞</text></g>
  </g>`,
  arrows: [
    ['column', 'shu', 'M260 720 C330 740 400 770 470 790'],
    ['riders', 'wei', 'M300 560 C380 610 470 680 540 750'],
    ['decoy', 'shu', 'M560 770 C620 690 700 580 890 440'],
    ['chase', 'wei', 'M520 780 C590 700 680 600 860 460'],
    ['down', 'shu', 'M910 440 C980 480 1060 560 1220 600'],
  ],
};

// ---- prologue cards (format: chapters.js; `vi` = the Vietnamese prose beside the Hán columns). Card 4 branches on the hero.
export const PROLOGUE = [
  { cols: ['昔為敵將', '先皇解其縛', '還其劍'], vi: 'Nhiều năm trước, Hàng Tướng từng đứng phía đối địch. Đinh Bộ Lĩnh cắt dây trói, trả lại thanh kiếm, bảo ông dùng đời sau mà tự trả lời mình.',
    en: 'Years ago, Hàng Tướng stood on the other side. Đinh Bộ Lĩnh cut his bonds, gave him back his sword, and told him to answer for himself with the rest of his life.',
    show: ['hoalu'], focus: [300, 660, 1.3] },
  { cols: ['七路分棺', '降將受嶺路', '最難測之途'], vi: 'Khi chín mươi chín cỗ quan chia bảy đường, người từng hàng nhận đường đèo — con đường khó đoán nhất.',
    en: 'When the ninety-nine coffins were split among seven roads, the man who once yielded took the mountain pass — the hardest road to guess.',
    show: ['pass', 'column'], focus: [620, 640, 1.18] },
  { cols: ['左將探西山', '中偽信', '陷於敵手'], vi: 'Trước giờ xuất phát, Tả Tướng đi dò cửa núi phía tây. Một tín hiệu giả mang đúng mật ấn của kho — và đoàn nhỏ biến mất.',
    en: 'Before the columns set out, the Left General scouted the western mountain gate. A false signal bearing the store\'s own secret seal — and his small party vanished.',
    show: ['cave'], focus: [1180, 600, 1.3] },
  { annhien: { cols: ['女承父路', '鈴指山中', '隨降將登嶺'], vi: 'An Nhiên nhận con đường của cha. Tiếng chuông đường sông vang về phía núi; nàng theo đoàn quan của Hàng Tướng lên đèo.',
    en: 'An Nhiên took up her father\'s road. The river bell rang toward the mountain; she follows Hàng Tướng\'s column up the pass.' },
  nguyenphong: { cols: ['獵人下山', '鈴指山中', '半符在懷'], vi: 'Nguyên Phong mang nửa thẻ đồng của cha. Tiếng chuông đường sông vang về phía núi; chàng theo đoàn quan của Hàng Tướng lên đèo.',
    en: 'Nguyên Phong carries his father\'s half of a bronze token. The river bell rang toward the mountain; he follows Hàng Tướng\'s column up the pass.' },
  hangtuong: { cols: ['報恩之日', '在此一嶺', '不負先皇'], vi: 'Món nợ ngày được tha chết, Hàng Tướng vẫn mang theo. Ông biết sẽ trả nó trên con đèo này.',
    en: 'Hàng Tướng has carried the debt of the day he was spared. He knows it will be paid on this pass.' },
  show: ['reeds', 'column'], focus: [460, 760, 1.3] },
  { cols: ['紫旗追騎', '尾隨不捨', '其志在人'], vi: 'Kỵ binh truy sát bám theo, cờ hiệu tím. Kẻ phản bội biết người từng hàng sẽ được giao tuyến khó đoán nhất.',
    en: 'The hunters\' riders close in under purple signal flags. The traitor knew the yielded man would be given the hardest road to guess.',
    show: ['riders'], focus: [440, 680, 1.22] },
  { cols: ['嶺上烽臺', '一騎之途', '落日如火'], vi: 'Trên đỉnh đèo có một đài lửa hiệu, và một con đường chỉ đủ một ngựa. Mặt trời lặn đỏ như lửa.',
    en: 'On the crest stands a signal beacon, and a path wide enough for one horse. The sun goes down like fire.',
    show: ['pass', 'beacon'], focus: [820, 520, 1.26] },
  { cols: ['嶺外有湖', '湖畔有洞', '月照幽穴'], vi: 'Bên kia đèo là thung hồ dưới trăng, và một hang tối. Hai nửa thẻ đồng vẫn chưa ghép lại.',
    en: 'Beyond the pass lies a lake basin under the moon, and a dark cave. The two halves of a bronze token have not yet been put together.',
    show: ['lake', 'cave', 'down'], focus: [1080, 580, 1.2] },
];

// ---- result screen epilogue (win), branched on the hero (ch. 13 p6; ch. 14 p6; ch. 15 p1-2)
export const EPILOGUE = {
  hangtuong: {
    zh: ['Từ thung xa, đoàn thật thấy một cột lửa vàng bùng trên đỉnh đèo, rồi khuất sau sương. Phó tướng nắm chặt chiếc thẻ.',
      'Không ai quay lại, vì chính ông đã dặn đừng quay đầu.', 'Hàng Tướng không trở về.'],
    en: ['From the far valley the true column saw a column of gold fire flare on the crest, then sink into the mist. The lieutenant held the token tight.',
      'No one turned back; he himself had told them not to.', 'Hàng Tướng did not come back.'],
  },
  annhien: {
    zh: ['Dưới trăng, Tả Tướng vẽ một chiếc nhẫn lên bụi rồi gạch một nét qua. An Nhiên hiểu.',
      'Ít lâu sau, một mật lệnh chặn đường đến tay nàng, mang ấn một chiếc nhẫn có vết xước hình móc — đóng hai ngày sau khi Hoạn Quan được báo đã chết.',
      'Trên đỉnh đèo, cột lửa đã tắt. Không ai quay đầu.'],
    en: ['Under the moon the Left General drew a ring in the dust and struck a line through it. An Nhiên understood.',
      'Soon after, an order to block the roads reached her, sealed with a ring bearing a hook-shaped scratch — stamped two days after the Chief Eunuch was reported dead.',
      'On the crest the column of fire had gone out. No one looked back.'],
  },
  nguyenphong: {
    zh: ['Nguyên Phong quấn sợi dây cung cũ của cha quanh cổ tay.',
      'Chàng ghép lại từng dấu: áo tím nhồi đá dưới khe, cỗ xe bị đẩy lật sau, móng ngựa đóng ngược. Cái chết đầu tiên chỉ là một cánh cửa.',
      'Trên đỉnh đèo, cột lửa đã tắt. Không ai quay đầu.'],
    en: ['Nguyên Phong wound his father\'s old bowstring around his wrist.',
      'He pieced the signs together: a violet robe stuffed with stones in the gorge, a cart pushed over afterward, horseshoes nailed on backward. The first death had only been a door.',
      'On the crest the column of fire had gone out. No one looked back.'],
  },
};

// ================================================================ Một Mình Giữ Đèo (獨守) — the hold trial on this field
// The head of the one-horse path for four minutes, alone, the hunters coming up the ledge in ever heavier pushes, the
// beacon burning behind (the field stands as after the stage: decoy coffin at the mouth, beacon lit). Modelled on
// 十二使君's 死守 (suquan tayphuliet TRIAL): a defend point (the empty coffin), the bounds of the ledge, officers every
// 40-50 s, the cavalry commander at the end; the clock is fixed, so KOs and damage decide the rank. Unlocked by clearing
// this stage (core/progress.js 'thudeo').
const QUAN = ['quan', 0, 0];
export const TRIAL = {
  CH: {
    id: 'thudeo', num: { zh: 'Thử thách', en: 'TRIAL' }, title: { zh: 'Một Mình Giữ Đèo', en: 'Alone on the Pass' }, seal: '獨守', map: 'deolua',
    army: { foe: 'truysat', ally: 'holinh' }, best: 'kos', van: [],
    rule: { zh: 'Một mình giữ đầu đường một ngựa bốn phút, không để mất cỗ quan; đánh tan càng nhiều càng cao hạng', en: 'Hold the head of the one-horse path alone for 4:00 and keep the coffin. The more you cut down, the higher the rank.' },
    start: { x: 0, z: 13, yaw: Math.PI, tilt: -0.04 },
    rank: { kos: [700, 1100, 1600], time: [999, 999, 999], s: { kos: 1400, dmg: 0.35 } },   // fixed clock: KOs and damage decide
  },
  SPK, OFF,
  BEATS: [
    {
      when: { wait: 30 }, waves: true, morale: -0.1,
      defend: { key: 'quan', at: QUAN, r: 5, hp: 3800, name: { zh: 'Cỗ quan rỗng', en: 'The Empty Coffin' } },
      fail: { when: { hp: ['quan', 0.01] }, zh: 'Kỵ binh đã cướp được cờ vàng……', en: 'The riders have taken the yellow banner...' },
      obj: { zh: 'Một mình giữ đầu đường một ngựa', en: 'Hold the head of the one-horse path alone', go: ['motEnd', 0, 1], timer: 240 },
      squads: [onPath(-12, 14), onPath(-26, 14), onPath(-40, 14)],
      limit: { z: ['quan', 0, 3], back: ['motMid', 0, -6] },
      say: [{ who: 'kytuong', zh: 'Chỉ một người trên đèo? Xông lên, từng ngựa một!', en: 'One man on the pass? Charge — one horse at a time!' }],
    },
    {
      when: { wait: 40 * 60 },
      officers: { kyvien1: { at: ['motEnd', 0, -16], engaged: true, like: 'kyvien' } },
      squads: [onPath(-14, 16), onPath(-30, 16)],
      banner: { html: '<em>Kỵ binh tiên phong</em> leo lên', en: 'The vanguard riders climb', dur: 150 },
    },
    {
      when: { wait: 45 * 60 },
      officers: { cungthu: { at: ['motEnd', 0, -22], engaged: true }, dodau: { at: ['motEnd', 0, -30], engaged: true } },
      squads: [onPath(-12, 16), onPath(-24, 16), onPath(-38, 16)],
      say: [{ who: 'cungthu', zh: 'Bắn lên đầu đường! Đừng để nó thở!', en: 'Shoot at the head of the path! Don\'t let him breathe!' }],
    },
    {
      when: { wait: 45 * 60 }, heal: 0.2,
      officers: { kyvien1: { at: ['motEnd', 0, -14], engaged: true, like: 'kyvien' }, kyvien2: { at: ['motEnd', 0, -24], engaged: true, like: 'kyvien' } },
      squads: [onPath(-12, 18), onPath(-26, 18), onPath(-40, 16)],
    },
    {
      when: { wait: 45 * 60 }, morale: -0.1,
      banner: { html: '<em>Kỵ tướng truy sát</em> đích thân lên đèo', en: 'The Hunter Cavalry Commander climbs the pass himself', dur: 170, big: true },
      officers: { kytuong: { at: ['motEnd', 0, -14], engaged: true } },
      squads: [onPath(-12, 18), onPath(-26, 18), onPath(-40, 18)],
      say: [{ who: 'kytuong', zh: 'Đèo này phải mở! Hôm nay ta tự tay mở!', en: 'This pass will open! Today I open it myself!' }],
    },
    {
      when: { timer: true }, win: true, defend: null, fail: null, morale: 1,
      banner: { html: '<em>Đèo lửa</em> vẫn còn người giữ!', en: 'The burning pass still has its keeper!', dur: 260, big: true },
    },
  ],
  EPILOGUE: { any: { zh: ['Một người, một ngọn đèn hiệu, một con đường chỉ đủ một ngựa. Kỵ binh quay đầu; đèo vẫn còn người giữ.'], en: ['One keeper, one beacon, one path wide enough for one horse. The riders turned back; the pass still had its keeper.'] } },
};

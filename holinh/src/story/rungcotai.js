// Màn III «Rừng Có Tai» — stage data (format: src/story/chapters.js header; text: Vietnamese in .zh, English in .en, Hán
// only in seals / prologue cols): metadata, speakers, the battle script (BEATS), the prologue over the ink map of the
// west mountain road out of Hoa Lư (PL_MAP) and the epilogues.
// Adapted from the comic «Hộ Linh Tráng Sĩ» ch. 6 (the daughter in her father's place), 7 (the hunter comes down the
// mountain), 8 p1-3 (the seven gates, the three hunters) and 10 (the forest has ears) — all fiction over the legend of
// the 99 coffins; the tomb's site is never hinted at, the 979 assassin never named.
// Played as An Nhiên or Nguyên Phong: `hero` = the chosen one, `ally` = the other (CH.ally), who joins at the glade as an
// ally actor. Thầy Mo stands by his bell post at the meeting (npc actor), then goes his own way. Tả Tướng is missing:
// he speaks only as remembered words. Hồng Diễm (NPC kit) is the boss: she breaks off at 30 % — she returns in Màn VI.
// Map (holinh/src/world/maps/rungcotai.js): gate 'raoda' (the felled-tree barricade out of the ambush slope) — shut at
// the start; anchors 'meet' / 'bell' (the glade), 'carts' (the halted carts), 'trap1-3' (the trap lines on the ridge),
// 'ridge', 'abatis', 'halt' (the escort halt), 'tracks' (the footprints), 'decoy' (the false bivouac east), 'ford',
// 'cart2' (the lead cart under the tree), 'fire' (the bearers' fire), 'duel', 'shelter'. Sets: 'cut1-3' / 'cutall',
// 'flood', 'tree', 'free', 'ink', 'calm'.

export const CH = {
  id: 'rungcotai', num: { zh: 'Màn III', en: 'STAGE III' }, title: { zh: 'Rừng Có Tai', en: 'The Forest Has Ears' },
  seal: '林有耳', era: { zh: 'Năm 979 · đường núi phía tây', en: '979 AD · the west mountain road' }, map: 'rungcotai',
  heroes: ['annhien', 'nguyenphong'],
  ally: { annhien: 'nguyenphong', nguyenphong: 'annhien' },
  army: { foe: 'truysat', ally: 'holinh' },
  // the escort and the bearers drawn up either side of the road outside the gate, holding until the hero moves off
  van: [{ x: -5, z: -182, n: 10, cols: 4, hold: true }, { x: 5, z: -182, n: 10, cols: 4, hold: true }],
  hq: [0, 150],                                   // where Hồng Diễm's riders come down
  rank: { kos: [350, 700, 1100], time: [480, 660, 840] },
};

export const SPK = {
  thaymo: { name: { zh: 'Thầy Mo Cun', en: 'Shaman Mo Cun' }, seal: '巫鈴', side: 'shu', char: 'thaymo' },
  duonghau: { name: { zh: 'Dương Hoàng hậu', en: 'Queen Dương' }, seal: '楊后', side: 'shu', char: 'duonghau' },
  tatuong: { name: { zh: 'Tả Tướng (lời dặn)', en: 'The Left General (remembered)' }, seal: '左將', side: 'shu', char: 'tatuong' },
  phu: { name: { zh: 'Người khiêng quan', en: 'Bearer' }, seal: '夫', side: 'shu' },
  linhho: { name: { zh: 'Lính hộ linh', en: 'Escort Soldier' }, seal: '護', side: 'shu' },
  hongdiem: { name: { zh: 'Mã Hồng Diễm', en: 'Mã Hồng Diễm' }, seal: '紅艷', side: 'wei', char: 'hongdiem' },
  phucbinh: { name: { zh: 'Đội trưởng phục binh', en: 'Ambush Captain' }, seal: '伏', side: 'wei' },
  cungthu: { name: { zh: 'Cung thủ trên đèo', en: 'Ridge Archer' }, seal: '弓', side: 'wei' },
  dodau: { name: { zh: 'Kẻ dò dấu', en: 'The Tracker' }, seal: '蹤', side: 'wei' },
  kytuong: { name: { zh: 'Kỵ tướng truy sát', en: 'Hunter Rider' }, seal: '騎', side: 'wei' },
  linhtruy: { name: { zh: 'Lính truy sát', en: 'Hunter' }, seal: '追', side: 'wei' },
};

// crowd officers (looks: the 'truysat' army's officer list, holinh/src/crowd/armies.js: black iron scale, violet). The
// boss is an actor (BEATS), not a crowd officer.
export const OFF = {
  cungthu: { name: { zh: 'Cung thủ trên đèo', en: 'RIDGE ARCHER' }, hp: 600, look: { helm: 'horn', armor: 0x1e1c24, trim: 0xa89ab0, cape: 0x3e2256, plume: 0x7a40b0 } },
  phucbinh: { name: { zh: 'Đội trưởng phục binh', en: 'AMBUSH CAPTAIN' }, hp: 900, look: { helm: 'horn', armor: 0x18161e, trim: 0xc8b8d8, cape: 0x4a1e6e, plume: 0x9a50e0 } },
  kytuong: { name: { zh: 'Kỵ tướng truy sát', en: 'HUNTER RIDER' }, hp: 850, look: { helm: 'crest', armor: 0x18161e, trim: 0xd0c0e0, cape: 0x4a1e6e, plume: 0x9a50e0 } },
  dodau: { name: { zh: 'Kẻ dò dấu', en: 'THE TRACKER' }, hp: 750, look: { helm: 'cap', armor: 0x201e26, trim: 0x8a8296, cape: 0x2e2440 } },
  kyhau: { name: { zh: 'Kỵ binh hộ vệ Hồng Diễm', en: 'HỒNG DIỄM\'S OUTRIDER' }, hp: 420, look: { helm: 'crest', armor: 0x221820, trim: 0xb08a8a, cape: 0x5a1820, plume: 0xc03040 } },
};

// Hồng Diễm (boss actor: NPC kit 'hongdiem') comes down from the west slope with her riders; she breaks off at 30 % —
// she follows other signals than theirs.
const HD = { kit: 'hongdiem', role: 'boss', at: ['duel', -14, 8], hp: 3800, poise: 400, retreatAt: 0.3,
  name: { zh: 'Mã Hồng Diễm', en: 'MÃ HỒNG DIỄM' }, seal: '紅艷' };
// the partner: Nguyên Phong comes down at the bell (hero An Nhiên); An Nhiên's convoy reaches him (hero Nguyên Phong)
const PARTNER = {
  nguyenphong: { kit: 'nguyenphong', role: 'ally', name: { zh: 'Nguyên Phong', en: 'NGUYÊN PHONG' }, seal: '元風', at: ['meet', 6, 9] },
  annhien: { kit: 'annhien', role: 'ally', name: { zh: 'An Nhiên', en: 'AN NHIÊN' }, seal: '安然', at: ['meet', 5, -9] },
};
const MO = { kit: 'thaymo', role: 'npc', name: { zh: 'Thầy Mo Cun', en: 'SHAMAN MO CUN' }, seal: '巫鈴', at: ['bell', 2, 2] };

const NAG = { who: 'linhho', zh: 'Xin chậm lại! Xe quan nặng, đường bùn trơn — đừng bỏ đoàn xa quá.', en: 'Slow down! The carts are heavy and the mud is slick. Don\'t leave the convoy behind.' };
const NAG_ABATIS = { who: 'phu', zh: 'Cây chặt chắn ngang đường rồi! Dẹp quân phục trước đã!', en: 'They\'ve felled trees across the road! Clear the ambush first!' };
const NAG_HALT = { who: 'phu', zh: 'Người khiêng phải đổi vai. Xin giữ quanh xe một lúc!', en: 'The bearers must change shoulders. Stay by the carts a while!' };
const NAG_FORD = { who: 'ally', annhien: ['Khoan! Đoàn xe còn ở phía sau, đừng đi một mình.', 'Wait! The carts are still behind. Don\'t go alone.'],
  nguyenphong: ['Phong! Đừng bỏ đoàn xe lại phía sau!', 'Phong! Don\'t leave the carts behind!'] };
const NAG_FIRE = { who: 'phu', zh: 'Lửa nhóm rồi đây — xin hai vị ghé xem sợi chỉ này đã.', en: 'The fire\'s lit. Come and look at this thread first, both of you.' };

// Pacing (default difficulty): a bot that attacks nonstop clears in ≈ 6 min (road + meeting 60 s · ambush 70 s · escort
// halt 40 s · footprints and the decoy 50 s · flood and the tree 50 s · the ink 20 s · Hồng Diễm ≈ 90 s); a human
// reading and steering ≈ 10-12 min. Officers come forward only after the hero has fought a while (kos / wait).
export const BEATS = [
  // ---- Cổng tây Hoa Lư: out into the rain
  {
    when: { wait: 30 },
    obj: { zh: 'Theo đường núi phía tây', en: 'Take the west mountain road', go: ['meet', 0, -8] },
    squads: [{ at: ['duongbun', 0.1, -0.55], n: 14 }, { at: ['duongbun', -0.2, -0.05], n: 16 }],
    limit: { z: ['meet', 0, 8], nag: NAG },
    morale: -0.04,
    say: [
      { who: 'duonghau', annhien: ['Giữ lấy nửa thẻ của cha con. Mệnh nước không hỏi con là trai hay gái — chỉ hỏi con có giữ nổi không.',
        'Keep your father\'s half of the token. The realm does not ask whether you are a son or a daughter, only whether you can hold.'] },
      { who: 'hero', annhien: ['Cha đi đường này rồi không về. Con sẽ đi hết nó.', 'Father took this road and did not come back. I will walk it to the end.'],
        nguyenphong: ['Chuông của thầy… Thầy gọi ta xuống núi, đến tận cổng Hoa Lư.', 'The master\'s bell... He called me down the mountain, all the way to the gate of Hoa Lư.'] },
      { who: 'linhho', zh: 'Năm cỗ quan đã phủ vải đen. Mưa xóa dấu bánh — đi thôi!', en: 'Five coffins under black cloth. The rain is wiping out our wheel tracks. Move!' },
      { who: 'thaymo', annhien: ['Nghe núi trước khi nghe lòng nóng, con.', 'Listen to the mountain before you listen to your hot heart, child.'],
        nguyenphong: ['Phong, đoàn xe đi đường tây. Con muốn biết cha con chết vì điều gì thì đi theo nó.', 'Phong, the convoy takes the west road. If you want to know what your father died for, go with it.'] },
    ],
  },
  {
    when: [{ zone: 'duongbun' }, { kos: 30 }],
    waves: true,
    say: [
      { who: 'linhtruy', zh: 'Đoàn xe ra cổng tây! Báo lên trên núi!', en: 'The convoy is out of the west gate! Signal the mountain!' },
      { who: 'hero', annhien: ['Chúng chờ sẵn ngoài cổng. Rừng này có tai thật.', 'They were waiting outside the gate. This forest truly has ears.'],
        nguyenphong: ['Bọn này mặc giáp vảy sắt, không phải lính triều. Lính thuê.', 'Iron scale, not palace troops. Hired men.'] },
    ],
  },

  // ---- the glade: the meeting — two ways of seeing one road, the fathers' oath
  {
    when: [{ near: [['meet', 0, 0], 12] }, { at: ['meet', 0, -4] }],
    actors: { thaymo: MO },
    actor: { key: 'thaymo', do: 'hold', at: ['bell', 2, 2] },
    banner: { html: 'Tiếng <em>chuông đồng</em> rung trên cành', en: 'A bronze bell rings in the branches', dur: 150 },
    say: [
      { who: 'thaymo', zh: 'Chuông này gọi người đã nghe nó từ thuở bé. Phong, xuống đây.', en: 'This bell calls the one who has heard it since he was small. Phong, come down.',
        nguyenphong: ['Đoàn xe đến rồi. Người cầm thương đi đầu — con gái Tả Tướng.', 'The convoy is here. The one with the spear in front is the Left General\'s daughter.'] },
    ],
  },
  {
    hero: ['annhien'],
    when: { wait: 4 * 60 },
    actors: { nguyenphong: PARTNER.nguyenphong },
    say: [
      { who: 'nguyenphong', zh: 'Đường lớn ấy, xe nặng đi ba ngày. Khe thú bên này, một ngày rưỡi.', en: 'The main road takes heavy carts three days. The game trail here, a day and a half.' },
      { who: 'hero', annhien: ['Ta cần người dẫn đường biết tuân lệnh, không cần người tự chọn lối.', 'I need a guide who follows orders, not one who picks his own way.'] },
      { who: 'nguyenphong', zh: 'Vậy cô tìm người khác. Rừng không nghe lệnh ai.', en: 'Then find someone else. The forest takes no one\'s orders.' },
    ],
  },
  {
    hero: ['nguyenphong'],
    when: { wait: 4 * 60 },
    actors: { annhien: PARTNER.annhien },
    say: [
      { who: 'annhien', zh: 'Ngươi là người Thầy Mo gọi? Đi theo đoàn, đường ta chỉ thì ngươi dẫn.', en: 'You\'re the one Thầy Mo called? Join the convoy. You lead where I point.' },
      { who: 'hero', nguyenphong: ['Ta dẫn đường ta biết. Đường lớn của cô, xe nặng đi ba ngày.', 'I lead on the paths I know. Your main road takes heavy carts three days.'] },
      { who: 'annhien', zh: 'Đây là quân lệnh, không phải chuyện săn hươu.', en: 'This is a military order, not a deer hunt.' },
    ],
  },
  {
    when: { wait: 9 * 60 },
    obj: { zh: 'Đưa đoàn xe qua đường núi', en: 'Bring the convoy along the mountain road', go: ['carts', 0, -6] },
    limit: { z: ['carts', 0, 8], nag: NAG },
    squads: [{ at: ['dauphuc', -0.4, -0.7], n: 14 }, { at: ['dauphuc', -0.1, -0.4], n: 14 }],
    actor: { key: 'thaymo', do: 'retreat', at: ['meet', -2, -30] },
    say: [
      { who: 'thaymo', zh: 'Hai đứa cãi nhau như hai mũi kiếm chạm nhau. Nhìn cái này đã.', en: 'You two clash like crossed blades. Look at this first.' },
      { who: 'thaymo', zh: 'Nửa miếng đồng của cha Phong khớp với thẻ của Tả Tướng. Hai người cha từng thề giữ con của nhau.',
        en: 'Phong\'s father\'s half of bronze fits the Left General\'s token. The two fathers swore to guard each other\'s child.' },
      { who: 'hero', annhien: ['…Cha chưa từng kể với con.', '...Father never told me.'],
        nguyenphong: ['…Thầy giữ nó suốt ngần ấy năm.', '...You kept this all these years.'] },
      { who: 'tatuong', annhien: ['«Có những lời hứa, giữ bằng cách đứng xa.»', '"Some promises are kept by standing far away."'] },
      { who: 'thaymo', zh: 'Ta đi đường của ta. Nhớ: nghe núi trước.', en: 'I go my own road. Remember: listen to the mountain first.' },
    ],
  },

  // ---- Sườn núi phục binh: arrows from the ridge — she holds the front, he cuts the trap lines behind
  {
    when: [{ at: ['carts', 0, -16] }, { kos: 60, wait: 20 * 60 }],
    banner: { html: '<em>Phục binh</em>! Tên từ sườn núi bắn xuống như mưa', en: 'Ambush! Arrows rain down from the ridge', dur: 180 },
    squads: [{ at: ['carts', -18, 6], n: 16, charge: true }, { at: ['carts', 16, -8], n: 16, charge: true },
      { at: ['ridge', -4, -14], n: 14 }, { at: ['ridge', -2, 14], n: 14 }],
    limit: { z: ['abatis', 0, -3], nag: NAG_ABATIS },
    morale: -0.1,
    say: [
      { who: 'phucbinh', zh: 'Bắn! Đừng để xe nào lọt khỏi sườn núi!', en: 'Loose! Not one cart leaves this slope!' },
      { who: 'hero', annhien: ['Ta giữ tuyến trước! Phong — dây bẫy phía sau!', 'I hold the front! Phong, the trap lines behind!'],
        nguyenphong: ['Dây bẫy giăng trên sườn — chúng sắp thả gỗ lăn! Ta lên cắt!', 'Trap lines on the ridge — they\'ll drop the logs! I\'m going up to cut them!'] },
      { who: 'ally', annhien: ['Dây để ta! Cô cứ giữ xe!', 'Leave the lines to me! You hold the carts!'],
        nguyenphong: ['Đi đi! Xe quan để ta!', 'Go! Leave the carts to me!'] },
    ],
  },
  // An Nhiên: hold the carts until the lines are cut
  {
    hero: ['annhien'],
    when: { wait: 2 * 60 },
    obj: { zh: 'Giữ tuyến trước, bảo vệ đoàn xe quan', en: 'Hold the front and guard the coffin carts', go: ['carts', 0, 0], timer: 40 },
    defend: { key: 'xequan', at: ['carts', 0, 0], r: 8, hp: 1000, name: { zh: 'Đoàn xe quan', en: 'Coffin Carts' } },
    fail: { when: { hp: ['xequan', 0.01] }, zh: 'Đoàn xe quan đã bị cướp…', en: 'The coffin carts have been taken...' },
    officers: { cungthu: { at: ['carts', 14, 10], engaged: true } },
  },
  {
    hero: ['annhien'],
    when: [{ timer: true }],
    set: 'cutall', defend: null, fail: null, heal: 0.25, morale: 0.1, retire: true, hush: true,
    banner: { html: '<em>Dây bẫy</em> trên sườn núi đã bị cắt!', en: 'The trap lines on the ridge are cut!', dur: 170 },
    officers: { phucbinh: { at: ['ridge', 0, 0], engaged: true } },
    obj: { zh: 'Lên sườn núi, đánh bại Đội trưởng phục binh', en: 'Climb the ridge and defeat the ambush captain', go: 'phucbinh' },
    say: [{ who: 'nguyenphong', zh: 'Ba dây đã đứt, gỗ không lăn được nữa! Tên chỉ huy ở trên đỉnh!', en: 'All three lines are cut, the logs won\'t roll! Their captain is up top!' }],
  },
  // Nguyên Phong: cut the three trap lines on the ridge while she holds the carts
  {
    hero: ['nguyenphong'],
    when: { wait: 2 * 60 },
    obj: { zh: 'Lên sườn núi, cắt dây bẫy thứ nhất', en: 'Climb the ridge and cut the first trap line', go: ['trap1', 0, 0] },
    officers: { cungthu: { at: ['trap2', 4, -6] } },
  },
  {
    hero: ['nguyenphong'],
    when: { near: [['trap1', 0, 0], 4.5] },
    set: 'cut1',
    banner: { html: 'Dây bẫy thứ nhất đã đứt', en: 'The first trap line is cut', dur: 120 },
    obj: { zh: 'Cắt dây bẫy thứ hai', en: 'Cut the second trap line', go: ['trap2', 0, 0] },
    squads: [{ at: ['trap2', 6, 8], n: 12, charge: true }],
  },
  {
    hero: ['nguyenphong'],
    when: { near: [['trap2', 0, 0], 4.5] },
    set: 'cut2',
    banner: { html: 'Dây bẫy thứ hai đã đứt', en: 'The second trap line is cut', dur: 120 },
    obj: { zh: 'Cắt dây bẫy cuối cùng', en: 'Cut the last trap line', go: ['trap3', 0, 0] },
    squads: [{ at: ['trap3', 6, 6], n: 12, charge: true }],
    say: [{ who: 'ally', nguyenphong: ['Mau lên! Bên dưới này đông quá!', 'Hurry! There are too many down here!'] }],
  },
  {
    hero: ['nguyenphong'],
    when: { near: [['trap3', 0, 0], 4.5] },
    set: 'cut3', heal: 0.25, morale: 0.1, retire: true, hush: true,
    banner: { html: '<em>Dây bẫy</em> trên sườn núi đã bị cắt!', en: 'The trap lines on the ridge are cut!', dur: 170 },
    officers: { phucbinh: { at: ['ridge', 0, 4], engaged: true } },
    obj: { zh: 'Đánh bại Đội trưởng phục binh', en: 'Defeat the ambush captain', go: 'phucbinh' },
    say: [{ who: 'ally', nguyenphong: ['Gỗ không lăn xuống… Ngươi cắt đúng lúc.', 'The logs didn\'t fall... You cut them just in time.'] }],
  },
  {
    when: { down: 'phucbinh' },
    banner: { html: '<em>Phục binh</em> trên sườn núi đã tan!', en: 'The ambush on the ridge is broken', dur: 170 },
    gate: 'raoda', heal: 0.3, morale: 0.15, retire: true, hush: true,
    obj: { zh: 'Hộ tống đoàn xe vào bãi rừng', en: 'Escort the convoy into the forest clearing', go: ['halt', 0, -4] },
    limit: { z: ['halt', 0, 10], nag: NAG_HALT },
    say: [
      { who: 'phucbinh', zh: '…Không ai nói đoàn này có người đọc được rừng…', en: '...No one said this convoy had someone who reads the forest...' },
      { who: 'hero', annhien: ['Dao của ngươi. Rơi lúc cắt dây.', 'Your knife. You dropped it cutting the lines.'],
        nguyenphong: ['Mũi tên cắm vào bánh xe… may mà không phải vào người.', 'An arrow in the wheel... better there than in someone.'] },
      { who: 'ally', annhien: ['Ta dẫn đường — cho đến khi tìm thấy Tả Tướng. Rồi ta về núi.', 'I\'ll guide you — until we find the Left General. Then I go back to the mountain.'],
        nguyenphong: ['Ngươi dẫn đường cho đến khi tìm thấy cha ta. Ta chấp thuận.', 'You guide us until we find my father. I agree.'] },
      { who: 'hero', annhien: ['Được. Đến lúc tìm thấy cha ta.', 'Agreed. Until we find my father.'],
        nguyenphong: ['Đến lúc tìm thấy ông ấy. Rồi tính.', 'Until we find him. After that, we\'ll see.'] },
    ],
  },

  // ---- Bãi rừng: the escort halt — the bearers change shoulders while the hunters strike from the trees
  {
    when: { at: ['halt', 0, -12] },
    obj: { zh: 'Giữ quanh xe cho người khiêng đổi vai', en: 'Guard the carts while the bearers change shoulders', go: ['halt', 0, 0], timer: 40 },
    defend: { key: 'doanxe', at: ['halt', 0, 0], r: 8, hp: 1000, name: { zh: 'Đoàn xe quan', en: 'Coffin Carts' } },
    fail: { when: { hp: ['doanxe', 0.01] }, zh: 'Đoàn xe quan đã bị cướp…', en: 'The coffin carts have been taken...' },
    squads: [{ at: ['halt', -22, 14], n: 14, charge: true }, { at: ['halt', 24, 10], n: 14, charge: true }, { at: ['halt', 10, 26], n: 14, charge: true }],
    waves: false,
    say: [
      { who: 'phu', zh: 'Vai mòn cả rồi… xin cho đổi người một lát!', en: 'Our shoulders are raw... let us change bearers a moment!' },
      { who: 'linhtruy', zh: 'Xe dừng rồi! Cướp lấy một cỗ quan — một cỗ thôi cũng được!', en: 'The carts have stopped! Grab a coffin — even one will do!' },
    ],
  },
  {
    when: { wait: 18 * 60 },
    banner: { html: '<em>Kỵ tướng truy sát</em> từ bìa rừng xông ra!', en: 'A hunter rider charges out of the treeline!', dur: 150 },
    officers: { kytuong: { at: ['halt', 18, 18], engaged: true } },
    squads: [{ at: ['halt', 20, 22], n: 10, charge: true }],
    obj: { zh: 'Đánh bại Kỵ tướng truy sát, giữ đoàn xe', en: 'Defeat the hunter rider and guard the carts', go: 'kytuong', keepTimer: true },
    say: [{ who: 'kytuong', zh: 'Năm cỗ quan, năm phần thưởng. Giết người khiêng trước!', en: 'Five coffins, five rewards. Kill the bearers first!' }],
  },
  {
    when: [{ timer: true, down: 'kytuong' }, { timer: true, wait: 40 * 60 }],
    defend: null, fail: null, heal: 0.2, morale: 0.1, retire: true, hush: true, waves: true,
    banner: { html: 'Đoàn xe đã đổi vai, lên đường', en: 'The bearers have changed — the convoy moves on', dur: 150 },
    obj: { zh: 'Xem dấu chân giữa bãi rừng', en: 'Look at the footprints in the clearing', go: ['tracks', 0, 0] },
    limit: { z: ['ford', 0, -16], nag: NAG_FORD },
    say: [{ who: 'ally', annhien: ['Khoan. Có dấu chân lính chạy về phía đông… quá thẳng.', 'Wait. Soldiers\' tracks running east... too straight.'],
      nguyenphong: ['Phong, dấu chân! Chúng rút về phía đông!', 'Phong, tracks! They\'re falling back east!'] }],
  },

  // ---- the footprints too perfect: the order says east, the forest says flood
  {
    when: { near: [['tracks', 0, 0], 7] },
    obj: { zh: 'Đi lối mòn phía đông', en: 'Take the east trail', go: ['decoy', 0, 0] },
    say: [
      { who: 'hero', annhien: ['Thẻ của cha chỉ hướng đông. Ta theo lệnh.', 'Father\'s token points east. We follow the order.'],
        nguyenphong: ['Lá khô nằm nguyên trong gót sâu nhất. Không ai giẫm lên nó — dấu này đóng bằng khuôn.', 'A dry leaf lies whole in the deepest heel. No one stepped on it. These were pressed with a mould.'] },
      { who: 'ally', annhien: ['Lá khô không vỡ dưới gót. Dấu này đóng khuôn — chúng muốn ta rời đường thật.', 'The dry leaf didn\'t break under the heel. A mould. They want us off the true road.'],
        nguyenphong: ['Thẻ của cha ta chỉ hướng đông. Ta theo lệnh.', 'My father\'s token points east. We follow the order.'] },
      { who: 'hero', annhien: ['Có thể. Nhưng lệnh là lệnh. Đi xem cho rõ.', 'Maybe. But an order is an order. We go and see.'],
        nguyenphong: ['Vậy ta đi trước, bắt kẻ đóng khuôn. Cô đừng rời xe.', 'Then I go first and catch whoever made the mould. Don\'t leave the carts.'] },
      { who: 'ally', annhien: ['…Ta đi cạnh cô. Sai thì cùng sai.', '...I\'ll walk beside you. If it\'s wrong, we\'re wrong together.'],
        nguyenphong: ['Ta đi cùng. Thẻ chỉ đông thì ta phải tận mắt xem.', 'I\'m coming. If the token says east, I must see it myself.'] },
    ],
  },
  {
    when: { near: [['decoy', 0, 0], 13] },
    banner: { html: 'Trại bỏ hoang — <em>bẫy</em> của kẻ dò dấu', en: 'An empty bivouac — the tracker\'s trap', dur: 160 },
    officers: { dodau: { at: ['decoy', 4, 2], engaged: true } },
    squads: [{ at: ['decoy', -2, 6], n: 12, charge: true }, { at: ['decoy', 2, -6], n: 12, charge: true }],
    obj: { zh: 'Đánh bại Kẻ dò dấu', en: 'Defeat the tracker', go: 'dodau' },
    say: [
      { who: 'dodau', zh: 'Dấu ta đóng chưa bao giờ sai mồi. Vào lưới rồi đấy.', en: 'My tracks have never failed to draw the prey. You\'re in the net.' },
      { who: 'hero', annhien: ['…Ngươi nói đúng. Một trại không, một cái bẫy.', '...You were right. An empty camp, and a trap.'],
        nguyenphong: ['Kẻ đóng khuôn đây rồi.', 'Here\'s the mould-maker.'] },
    ],
  },
  {
    when: { down: 'dodau' },
    banner: { html: '<em>Kẻ dò dấu</em> đã bị đánh bại!', en: 'The tracker is beaten', dur: 150 },
    heal: 0.2, morale: 0.08, retire: true, hush: true,
    obj: { zh: 'Quay về đường chính, vượt khe suối', en: 'Back to the main road and across the ravine', go: ['ford', 0, -12] },
    limit: { z: ['cart2', 0, 10], nag: NAG_FORD },
    say: [
      { who: 'dodau', zh: '…Dấu đã đóng sẵn cả rồi. Đường nào cũng có người chờ.', en: '...The tracks were laid long ago. Someone waits on every road.' },
      { who: 'hero', annhien: ['Chuông của Thầy Mo đang rung… không có gió.', 'Thầy Mo\'s bell is ringing... and there\'s no wind.'],
        nguyenphong: ['Kiến bỏ tổ kéo về tây. Trên nguồn mưa lớn — lũ sắp về khe.', 'The ants are leaving their nests for the west. Heavy rain upstream — a flood is coming down the ravine.'] },
      { who: 'ally', annhien: ['Kiến bỏ tổ về tây. Lũ sắp về khe — phải qua trước nó!', 'The ants are moving west. The flood is coming — we must cross before it!'],
        nguyenphong: ['Ngươi nghe núi giỏi hơn ta. Qua khe, mau!', 'You hear the mountain better than I do. Across the ravine, quickly!'] },
    ],
  },

  // ---- Khe suối: the flood comes, the big tree falls on the lead cart
  {
    when: { at: ['ford', 0, -14] },
    set: 'flood',
    banner: { html: '<em>Lũ về!</em> Nước khe dâng đục ngầu', en: 'The flood! The ravine rises, brown and fast', dur: 170, big: true },
    obj: { zh: 'Vượt khe, đến xe quan đi đầu', en: 'Cross the ravine to the lead cart', go: ['cart2', 3, -2] },
    squads: [{ at: ['cart2', 14, 10], n: 12 }, { at: ['cart2', -6, 16], n: 12 }],
    morale: -0.06,
    say: [
      { who: 'phu', zh: 'Nước lên nhanh quá! Xe đầu đã sang bờ, còn mấy xe sau…', en: 'The water\'s rising too fast! The lead cart is across, the others...' },
      { who: 'linhho', zh: 'Ghìm xe sau lại! Đợi nước rút!', en: 'Hold the rear carts back! Wait for the water to drop!' },
    ],
  },
  {
    when: { near: [['cart2', 0, 0], 11] },
    set: 'tree',
    banner: { html: 'Cây lớn đổ <em>đè lên xe quan</em>!', en: 'A great tree crashes down onto the coffin cart!', dur: 170, big: true },
    obj: { zh: 'Giữ xe quan dưới thân cây', en: 'Save the coffin cart under the tree', go: ['cart2', 3, -2], timer: 45 },
    defend: { key: 'xedau', at: ['cart2', 3, -2], r: 8, hp: 900, name: { zh: 'Xe quan đi đầu', en: 'The Lead Cart' } },
    fail: { when: { hp: ['xedau', 0.01] }, zh: 'Xe quan đã bị cuốn xuống khe…', en: 'The cart has been swept into the ravine...' },
    squads: [{ at: ['cart2', 16, 6], n: 14, charge: true }, { at: ['cart2', -2, 20], n: 14, charge: true }],
    waves: false,
    say: [
      { who: 'hero', annhien: ['Ta chống thương giữ thân cây! Cắt ách cho xe ra!', 'I\'ll hold the trunk on my spear! Cut the yoke and get the cart out!'],
        nguyenphong: ['Giữ thân cây! Ta cắt dây ách trước khi bùn kéo xe xuống vực!', 'Hold the trunk! I\'ll cut the yoke ropes before the mud drags it down!'] },
      { who: 'ally', annhien: ['Ta cắt ách! Giữ thêm chút nữa!', 'I\'m cutting the yoke! Hold a little longer!'],
        nguyenphong: ['Ta giữ nó! Ngươi cắt nhanh lên!', 'I\'ve got it! Cut faster!'] },
      { who: 'linhtruy', zh: 'Nước lũ giúp ta rồi! Đánh vào xe đầu!', en: 'The flood is on our side! Hit the lead cart!' },
    ],
  },
  {
    when: { wait: 20 * 60 },
    banner: { html: 'Kỵ binh truy sát lội nước đánh vào xe!', en: 'Hunter riders wade in at the cart!', dur: 150 },
    officers: { kytuong2: { at: ['cart2', 14, 14], engaged: true, like: 'kytuong' } },
    obj: { zh: 'Đánh bại Kỵ tướng truy sát, giữ xe quan', en: 'Defeat the hunter rider and save the cart', go: 'kytuong2', keepTimer: true },
  },
  {
    when: [{ timer: true, down: 'kytuong2' }, { timer: true, wait: 40 * 60 }],
    set: 'free', defend: null, fail: null, heal: 0.3, morale: 0.15, retire: true, hush: true, waves: true,
    banner: { html: '<em>Xe quan</em> đã thoát khỏi thân cây!', en: 'The coffin cart is free of the tree!', dur: 180 },
    obj: { zh: 'Đến bên đống lửa của người khiêng quan', en: 'Go to the bearers\' fire', go: ['fire', -2, -2] },
    limit: { z: ['fire', 0, 6], nag: NAG_FIRE },
    say: [
      { who: 'hero', annhien: ['Ngươi nói đúng về cơn lũ. Đây — thẻ của cha. Ngươi chọn đường.', 'You were right about the flood. Here: Father\'s token. You choose the road.'],
        nguyenphong: ['Thân cây không chạm được cỗ quan. Cô giữ chắc tay thật.', 'The trunk never touched the coffin. You held it steady.'] },
      { who: 'ally', annhien: ['Lối này, qua sườn tây. Thẻ trả cô — cô vẫn là người quyết.', 'This way, over the west slope. The token back to you. You still decide.'],
        nguyenphong: ['Ta trao thẻ cho ngươi xem hết. Lần này ngươi chọn lối.', 'I\'m showing you the whole token. This time you choose the way.'] },
      { who: 'hero', nguyenphong: ['Lối này, qua sườn tây. Thẻ trả cô — cô vẫn là người quyết.', 'This way, over the west slope. The token back to you. You still decide.'] },
    ],
  },

  // ---- the bearers' fire: purple ink under the mud on the cinnabar thread — someone inside the palace
  {
    when: { near: [['fire', 0, 0], 7] },
    set: 'ink',
    banner: { html: '<em>Mực tím</em> kho nội cung trên sợi chỉ son', en: 'Palace-store purple ink on the cinnabar thread', dur: 190 },
    say: [
      { who: 'phu', zh: 'Sợi chỉ này gỡ được ở dây bẫy trên sườn núi.', en: 'We took this thread off the trap lines on the ridge.' },
      { who: 'hero', annhien: ['Hơ lên lửa… bùn bong ra. Mực tím — loại kho nội cung dùng đánh dấu đồ ngự dụng.', 'Over the fire... the mud flakes off. Purple ink, the kind the palace store marks royal things with.'],
        nguyenphong: ['Bùn khô bong ra rồi. Màu tím này… cô nhận ra không?', 'The dried mud\'s come off. This purple... do you know it?'] },
      { who: 'ally', annhien: ['Kẻ săn ta không đoán đường. Hắn được người trong cung chỉ.', 'Whoever hunts us isn\'t guessing the road. Someone inside the palace shows him.'],
        nguyenphong: ['Mực kho nội cung. Kẻ săn ta không đoán đường — có người trong cung chỉ cho hắn.', 'Palace-store ink. The hunter isn\'t guessing. Someone inside the palace shows him the way.'] },
    ],
  },

  // ---- Rừng trên khe: Hồng Diễm and her riders come down the slope
  {
    when: { wait: 15 * 60 },
    banner: { html: '<em>Mã Hồng Diễm</em> cùng kỵ binh từ sườn núi lao xuống!', en: 'Mã Hồng Diễm and her riders sweep down the slope!', dur: 200, big: true },
    actors: { hongdiem: HD },
    squads: [{ at: ['duel', -20, 0], n: 14, charge: true }, { at: ['duel', 18, -4], n: 14, charge: true }],
    limit: { z: ['shelter', 0, -6] },
    obj: { zh: 'Đánh bại Mã Hồng Diễm', en: 'Defeat Mã Hồng Diễm', go: 'hongdiem' },
    say: [
      { who: 'hongdiem', zh: 'Năm cỗ quan, một con gái tướng, một thằng săn. Không đáng để ta xuống ngựa.', en: 'Five coffins, a general\'s daughter, a hunter boy. Hardly worth leaving my saddle.',
        annhien: ['Con gái Tả Tướng. Cha ngươi cứng đầu lắm — ngươi cũng thế à?', 'The Left General\'s daughter. Your father is stubborn. Are you?'],
        nguyenphong: ['Thằng săn của Thầy Mo. Rừng của ngươi, nhưng ngựa của ta nhanh hơn.', 'Thầy Mo\'s hunter boy. Your forest, but my horse is faster.'] },
      { who: 'hero', annhien: ['Cha ta ở đâu? Nói!', 'Where is my father? Speak!'],
        nguyenphong: ['Ngựa không lên được sườn đá. Xuống mà đánh.', 'Horses can\'t climb wet rock. Get down and fight.'] },
    ],
  },
  {
    when: { below: ['hongdiem', 0.65] },
    skip: { down: 'hongdiem' },
    officers: { kyhau1: { at: ['duel', -16, 12], engaged: true, like: 'kyhau' }, kyhau2: { at: ['duel', 16, 12], engaged: true, like: 'kyhau' } },
    squads: [{ at: ['duel', 0, 18], n: 12, charge: true }],
    say: [
      { who: 'hongdiem', zh: 'Kỵ binh! Vây lại — đừng để chúng tựa lưng vào nhau!', en: 'Riders! Close in. Don\'t let them stand back to back!' },
      { who: 'ally', annhien: ['Lưng ngươi có ta!', 'I\'ve got your back!'], nguyenphong: ['Ta giữ phía sau ngươi!', 'I\'ve got your back!'] },
    ],
  },
  {
    when: { below: ['hongdiem', 0.45] },
    skip: { down: 'hongdiem' },
    say: [
      { who: 'hongdiem', zh: 'Ngươi đánh không giống người chỉ để đòi cha.', en: 'You don\'t fight like someone who only wants her father back.',
        nguyenphong: ['Một thằng săn mà giữ được cả đoàn xe… thú vị.', 'A hunter boy holding a whole convoy... interesting.'] },
      { who: 'hero', annhien: ['Ta đánh vì đường này còn năm cỗ quan phía sau.', 'I fight because five coffins still follow on this road.'],
        nguyenphong: ['Ta đánh vì nàng ấy chưa lùi bước nào.', 'I fight because she hasn\'t taken one step back.'] },
    ],
  },
  {
    when: { down: 'hongdiem' },
    win: true, waves: false, morale: 1, set: 'calm',
    banner: { html: '<em>Mã Hồng Diễm</em> quay ngựa rút vào màn mưa', en: 'Mã Hồng Diễm wheels her horse and vanishes into the rain', dur: 280, big: true },
    say: [
      { who: 'hongdiem', zh: 'Đủ rồi. Ta không theo dấu các ngươi — ta theo tín hiệu khác. Rồi sẽ gặp lại.', en: 'Enough. I don\'t follow your tracks. I follow other signals. We\'ll meet again.' },
      { who: 'hero', annhien: ['Tín hiệu khác… từ đâu?', 'Other signals... from where?'],
        nguyenphong: ['Mực tím, tín hiệu… Rừng này có tai thật.', 'Purple ink, signals... This forest truly has ears.'] },
      { who: 'ally', annhien: ['Trời tạnh dần. Mái đá kia khô — nghỉ một đêm đã.', 'The rain is easing. That rock shelter is dry. Rest one night first.'],
        nguyenphong: ['Mưa ngớt rồi. Nghỉ dưới mái đá kia một đêm.', 'The rain\'s letting up. We rest under that rock for the night.'] },
    ],
  },
];

// ---- prologue ink map (viewBox 1600×900): Hoa Lư's karst cluster in the east, its seven gates; the west mountain road
// winding through the rain forest under a ridge, a ravine stream across it, the karst cliffs at its far end; a river to
// the north (vague: no names that place anything). Arrows: the convoy out of the west gate, Tả Tướng's lost scouting
// party, the hunters down from the ridge, the false trail east.
const karstPeaks = (list) => list.map(([x, y, k = 1]) =>
  `<path d="M${x - 22 * k} ${y} C${x - 26 * k} ${y - 60 * k} ${x - 16 * k} ${y - 96 * k} ${x} ${y - 100 * k} C${x + 18 * k} ${y - 96 * k} ${x + 24 * k} ${y - 56 * k} ${x + 20 * k} ${y}Z"/>`).join('');
const ROAD = 'M1150 640 C1060 630 990 600 920 560 S780 480 690 470 S540 460 460 420 S330 340 250 300';
const RIVER = 'M-20 170 C220 200 420 230 640 240 S1000 300 1240 300 S1500 260 1640 280';
const STREAM = 'M430 250 C450 320 470 380 480 430 S500 520 470 600';
const GATES7 = [[-150, 20], [-120, -70], [-40, -120], [60, -110], [140, -40], [150, 60], [70, 120]]
  .map(([dx, dy]) => `<path d="M1210 640 l${dx} ${dy}"/>`).join('');
const forest = Array.from({ length: 34 }, (_, i) => {                                       // rain-forest hatching along the road
  const x = 520 + (i % 12) * 34 + (i % 2) * 10, y = 470 + Math.floor(i / 12) * 34 - (i % 12) * 4;
  return `<path d="M${x} ${y} q6 -18 12 0 M${x + 6} ${y} v8"/>`;
}).join('');
const rain = Array.from({ length: 40 }, (_, i) => `<path d="M${300 + (i * 37) % 900} ${120 + (i * 53) % 560} l-10 26"/>`).join('');
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${karstPeaks([[120, 360, 1.3], [180, 330, 1.6], [250, 370, 1.1], [90, 420, 0.9], [330, 330, 1.2]])}
    ${karstPeaks([[1440, 180, 0.8], [1520, 200, 1.0], [1380, 220, 0.6]])}
  </g>
  <g class="pl-mark" data-id="hoalu" fill="url(#pl-mtn)" filter="url(#pl-ink)">${karstPeaks([[1180, 720, 1.0], [1230, 700, 1.3], [1290, 730, 0.9], [1130, 740, 0.7], [1340, 712, 1.1], [1250, 780, 0.8]])}</g>
  <g class="pl-mark" data-id="gates" filter="url(#pl-ink)" fill="none" stroke="#7a2a1c" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round" opacity=".7">${GATES7}</g>
  <g class="pl-mark" data-id="river" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${RIVER}" stroke="#6f7c78" stroke-width="30" opacity=".32"/><path d="${RIVER}" stroke="#46524f" stroke-width="6" opacity=".65"/>
  </g>
  <g class="pl-mark" data-id="road" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${ROAD}" stroke="#5a4a36" stroke-width="7" opacity=".7" stroke-dasharray="2 10"/>
    <path d="${ROAD}" stroke="#3a3024" stroke-width="2.5" opacity=".6"/>
  </g>
  <g class="pl-mark" data-id="forest" filter="url(#pl-ink)" fill="none" stroke="#2e3a2a" stroke-width="2.6" opacity=".6">
    <ellipse cx="720" cy="480" rx="230" ry="70" fill="#56664e" stroke="none" opacity=".16"/>${forest}
  </g>
  <g class="pl-mark" data-id="ridge" fill="url(#pl-mtn)" filter="url(#pl-ink)">${karstPeaks([[760, 420, 0.7], [810, 404, 0.9], [860, 420, 0.6]])}</g>
  <g class="pl-mark" data-id="stream" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="${STREAM}" stroke="#6f7c78" stroke-width="14" opacity=".3"/><path d="${STREAM}" stroke="#46524f" stroke-width="3" opacity=".7"/>
  </g>
  <g class="pl-mark" data-id="rain" stroke="#4a5462" stroke-width="2" opacity=".35" fill="none">${rain}</g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="hoalu"><rect x="1196" y="596" width="34" height="34" rx="3"/><text x="1246" y="624">Hoa Lư</text></g>
    <g class="pl-mark" data-id="road"><text class="sm" x="880" y="620">Đường núi phía tây</text></g>
    <g class="pl-mark" data-id="forest"><text class="sm" x="600" y="560">Rừng mưa</text></g>
    <g class="pl-mark wei" data-id="ridge"><rect x="796" y="352" width="28" height="28" rx="3"/><text x="840" y="378">Sườn núi</text><text class="sm" x="840" y="414">quân truy sát</text></g>
    <g class="pl-mark" data-id="stream"><text class="sm river" x="380" y="660">khe suối</text></g>
    <g class="pl-mark" data-id="river"><text class="sm river" x="760" y="214">sông</text></g>
    <g class="pl-mark" data-id="cliff"><rect x="228" y="270" width="28" height="28" rx="3"/><text x="160" y="250">Vách đá</text></g>
  </g>`,
  arrows: [
    ['convoy', 'shu', 'M1150 642 C1060 632 990 602 920 562'],
    ['convoy2', 'shu', 'M900 548 C820 500 760 478 690 472 C620 466 560 456 500 436'],
    ['tatuong', 'shu', 'M1120 610 C1040 560 980 500 900 470'],
    ['hunters', 'wei', 'M810 400 C800 430 780 452 760 470'],
    ['falsetrail', 'wei', 'M640 470 C700 520 760 560 820 600'],
  ],
};

// ---- prologue cards (format: chapters.js; `vi` = the Vietnamese prose). Card 4 and card 7 branch on the hero.
export const PROLOGUE = [
  { cols: ['七門七時開', '九十九棺', '分入山林江'], vi: 'Trong một ngày, bảy cổng Hoa Lư mở vào bảy giờ khác nhau. Chín mươi chín cỗ quan chia vào núi, rừng và sông.',
    en: 'In a single day the seven gates of Hoa Lư opened at seven different hours. Ninety-nine coffins went into the mountains, the forests and the rivers.',
    show: ['hoalu', 'gates', 'river'], focus: [1180, 600, 1.2] },
  { cols: ['左將探西山', '假號同密印', '一去無蹤'], vi: 'Trước giờ xuất phát, Tả Tướng đi dò cửa núi phía tây. Một tín hiệu giả mang đúng mật ấn — rồi đoàn nhỏ biến mất.',
    en: 'Before the hour came, the Left General rode to scout the west passes. A false signal bearing the true secret seal, and his small party vanished.',
    show: ['road', 'tatuong', 'rain'], focus: [980, 560, 1.18] },
  { cols: ['馬獨歸', '銅符折半', '一縷朱絲'], vi: 'Chỉ con ngựa trở về, yên trống, mang theo nửa thẻ đồng gãy và một sợi chỉ son bị cắt. Ông còn sống — kẻ địch cần con đường trong trí ông.',
    en: 'Only his horse came back, saddle empty, with half a broken bronze token and a cut cinnabar thread. He lives: the enemy needs the road in his head.',
    show: [], focus: [1150, 640, 1.4] },
  { annhien: { cols: ['安然請代父', '國命不問男女', '只問能守否'], vi: 'An Nhiên xin thay cha. Dương Hoàng hậu trao nửa thẻ đồng: “Mệnh nước không hỏi con là trai hay gái, chỉ hỏi con có giữ nổi không.”',
    en: 'An Nhiên asked to take her father\'s road. The Queen put the half token in her hand: "The realm does not ask if you are son or daughter, only if you can hold."' },
  nguyenphong: { cols: ['元風獵山中', '不受官命', '不拜印璽'], vi: 'Nguyên Phong sống bằng rừng, không nhận lệnh quan, không cúi trước ấn. Chàng tin tự do là không để lời thề nào buộc chân mình.',
    en: 'Nguyên Phong lives off the forest, takes no official\'s orders and bows to no seal. To him freedom is letting no oath bind his feet.' },
  show: [], focus: [1100, 600, 1.3] },
  { cols: ['巫贈銅鈴', '先聽山', '後聽心'], vi: 'Thầy Mo treo một chuông đồng nhỏ lên yên: “Nghe núi trước khi nghe lòng nóng.”',
    en: 'Thầy Mo hung a small bronze bell from the saddle: "Listen to the mountain before you listen to your hot heart."',
    show: ['forest', 'convoy'], focus: [900, 540, 1.15] },
  { cols: ['三刺客', '各追一路', '紅艷聽宮信'], vi: 'Ba sát thủ không đuổi cùng một mồi. Mặt Sẹo săn người giữ thẻ, Máu Lạnh săn đường nước, còn Hồng Diễm theo những tín hiệu phát ra từ trong cung.',
    en: 'Three assassins, three different prey. Scar-Face hunts the token-bearers, Cold Blood the water roads, and Hồng Diễm follows signals sent from inside the palace.',
    show: ['ridge', 'hunters', 'falsetrail'], focus: [780, 460, 1.3] },
  { annhien: { cols: ['城門半開', '單騎入雨', '不回首'], vi: 'Cổng Hoa Lư mở vừa đủ một người ngựa đi qua. An Nhiên không ngoái lại; trước mặt nàng là đường cha mất tích.',
    en: 'The gate of Hoa Lư opened just wide enough for one rider. An Nhiên did not look back; ahead lay the road where her father vanished.' },
  nguyenphong: { cols: ['銅鈴響林間', '巫喚元風', '下山'], vi: 'Trên núi, chuông đồng rung trên cành. Thầy Mo gọi Nguyên Phong xuống: “Con có muốn biết cha mình chết vì điều gì?”',
    en: 'Up on the mountain, a bronze bell rang in the branches. Thầy Mo called Nguyên Phong down: "Do you want to know what your father died for?"' },
  show: ['convoy2', 'stream', 'cliff'], focus: [700, 470, 1.12] },
  { cols: ['西山雨林', '五棺隨行', '林中有耳'], vi: 'Đường núi phía tây, mưa phủ kín rừng. Năm cỗ quan phủ vải đen lăn bánh. Rừng có tai.',
    en: 'The west mountain road, rain over the forest. Five coffins under black cloth roll on. The forest has ears.',
    show: [], focus: [720, 480, 1.04] },
];

// ---- result screen epilogue (win), branched on the hero: the rock shelter under the moon (ch. 10 p6)
export const EPILOGUE = {
  annhien: {
    zh: ['Đêm ấy, dưới mái đá, mưa tạnh. Trăng ló ra trên những ngọn núi đá, cò trắng bay về phía núi.',
      'An Nhiên và Nguyên Phong ngồi hai phía đống lửa nhỏ, cùng hong một tấm bản đồ. Không ai nói về món nợ của hai người cha hay lời thề với vua.',
      'Nàng chia cho chàng nửa tấm áo khô. Khoảng cách giữa hai người ngắn lại. Sợi chỉ tím nằm trong túi nàng — ở Hoa Lư, có người đã chỉ đường cho kẻ săn.'],
    en: ['That night, under the rock shelter, the rain stopped. The moon came out over the karst peaks; white storks flew toward the mountains.',
      'An Nhiên and Nguyên Phong sat on either side of a small fire, drying one map between them. Neither spoke of their fathers\' debt or of oaths to the king.',
      'She shared half of a dry cloak with him. The distance between them grew shorter. The purple thread lay in her pouch: in Hoa Lư, someone had shown the hunters the way.'],
  },
  nguyenphong: {
    zh: ['Đêm ấy, dưới mái đá, mưa tạnh. Trăng ló ra trên những ngọn núi đá, cò trắng bay về phía núi.',
      'Nguyên Phong ngồi bên lửa, An Nhiên ngồi phía bên kia, cùng hong một tấm bản đồ. Chàng nghe núi; lần đầu, chàng nghe cả tiếng thở của người bên cạnh.',
      'Nàng chia cho chàng nửa tấm áo khô. Chàng đã nói chỉ dẫn đường đến khi tìm thấy Tả Tướng — nhưng năm cỗ quan phía sau đã buộc chân chàng lâu hơn lời nói.'],
    en: ['That night, under the rock shelter, the rain stopped. The moon came out over the karst peaks; white storks flew toward the mountains.',
      'Nguyên Phong sat by the fire, An Nhiên across from him, drying one map between them. He listened to the mountain; for the first time he listened to the breathing beside him too.',
      'She shared half of a dry cloak with him. He had said he would guide only until they found the Left General, but the five coffins behind had bound his feet longer than any words.'],
  },
};

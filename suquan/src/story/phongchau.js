// Chương IV «Phong Châu» — chapter data (format: src/story/chapters.js header; text convention: suquan/DESIGN.md §2 —
// .zh carries Vietnamese, .en English, seals and prologue cols Hán): metadata, speakers, the battle script (BEATS), the
// prologue over the ink map of the whole delta (PL_MAP: all twelve warlords' seats, falling one by one) and the
// epilogues that close the campaign.
// History (967–968; Đại Việt sử ký toàn thư, Khâm định Việt sử thông giám cương mục; folk tradition marked as such):
// Kiều Công Hãn (矯公罕), grandson of Kiều Công Tiễn, styled Kiều Tam Chế, held Phong Châu — the old Văn Lang heartland
// where the Thao, Đà and Lô rivers come together at Bạch Hạc, under Nghĩa Lĩnh where the Hùng kings are remembered.
// Kiều Thuận held Hồi Hồ and Nguyễn Khoan Tam Đái close by. Đinh Bộ Lĩnh's army (Nguyễn Bặc is credited in some
// accounts) took Phong Châu; Kiều Công Hãn fled south and was cut down on the road, wounded, and died. With the last
// warlords gone, in 968 Đinh Bộ Lĩnh took the throne at Hoa Lư as Đinh Tiên Hoàng and named the realm Đại Cồ Việt.
// Played as any of four officers: `hero` = the chosen one, `ally` = CH.ally[hero] (pixel portrait), who also fights at
// his side as an allied actor. Everyone else speaks under a seal.
// Map (suquan/src/world/maps/phongchau.js): anchors landing / outW / outE / xom / laneW / laneE / luytre / ram / gate /
// bailey / inner / hall / court / stair / summit / shrine; gates 'luytre' (bamboo barricade), 'ngoaithanh' (outer gate),
// 'noithanh' (inner gate); set pieces 'beacon', 'burnW', 'burnE', 'ram', 'burn', 'dawn'.

export const CH = {
  id: 'phongchau', num: { zh: 'Chương IV', en: 'CHAPTER IV' }, title: { zh: 'Phong Châu', en: 'Phong Châu' },
  seal: '峰州', era: { zh: 'Năm 967–968', en: '967–968 AD' }, map: 'phongchau',
  heroes: ['dinhbolinh', 'nguyenbac', 'lehoan', 'khuongviet'],
  ally: { dinhbolinh: 'nguyenbac', nguyenbac: 'dinhbolinh', lehoan: 'nguyenbac', khuongviet: 'dinhbolinh' },
  army: { foe: 'kieu', ally: 'dinh' },
  // the landing party drawn up either side of the hero on the sand, holding rank until he marches past
  van: [{ x: -6, z: -172, n: 12, cols: 4, hold: true }, { x: 6, z: -172, n: 12, cols: 4, hold: true }],
  hq: [0, 190],                                    // the shrine on the summit of Nghĩa Lĩnh
  rank: { kos: [700, 1300, 2100], time: [660, 840, 1020] },   // the grandest field: tuned to the pacing note above BEATS
};

export const SPK = {
  kieuconghan: { name: { zh: 'Kiều Công Hãn', en: 'Kiều Công Hãn' }, seal: '矯', side: 'wei', char: 'kieuconghan' },
  kieuthuan: { name: { zh: 'Kiều Thuận', en: 'Kiều Thuận' }, seal: '順', side: 'wei' },
  nguyenkhoan: { name: { zh: 'Nguyễn Khoan', en: 'Nguyễn Khoan' }, seal: '寬', side: 'wei' },
  dinhdien: { name: { zh: 'Đinh Điền', en: 'Đinh Điền' }, seal: '佃', side: 'shu' },
  giucong: { name: { zh: 'Tướng giữ cổng', en: 'Gate Commander' }, seal: '門', side: 'wei' },
  soldier: { name: { zh: 'Lính họ Kiều', en: 'Kiều Soldier' }, seal: '兵', side: 'wei' },
  dinhsoldier: { name: { zh: 'Lính nhà Đinh', en: 'Đinh Soldier' }, seal: '丁', side: 'shu' },
};

// officers (crowd.spawnOfficer). HP: a default officer 520 (≈ 5 full combos); Kiều Thuận / Nguyễn Khoan are warlords in
// their own right (≈ 2×); the boss is an actor (NPC kit 'kieuconghan') ≈ 5×, × game.diff.officerHp.
const KHAN_HP = 2600;
const KIEU = { armor: 0x1e3424, trim: 0xe0b450, cape: 0x2a6a40 };
export const OFF = {
  dtW: { name: { zh: 'Đồn trưởng bến Tây', en: 'WEST POST CAPTAIN' }, hp: 480, look: { ...KIEU, helm: 'cap', cape: 0x1e4a2c } },
  dtE: { name: { zh: 'Đồn trưởng bến Đông', en: 'EAST POST CAPTAIN' }, hp: 480, look: { ...KIEU, helm: 'cap', cape: 0x1e4a2c } },
  kieuthuan: { name: { zh: 'Kiều Thuận', en: 'KIỀU THUẬN' }, hp: 1050, look: { helm: 'horn', armor: 0x1e3424, trim: 0xe0b450, cape: 0x2a6a40, plume: 0xd8402a } },
  nguyenkhoan: { name: { zh: 'Nguyễn Khoan', en: 'NGUYỄN KHOAN' }, hp: 1100, look: { helm: 'crest', armor: 0x243828, trim: 0xc0a050, cape: 0x1e4a2c, plume: 0xf0e0b0 } },
  giucong: { name: { zh: 'Tướng giữ cổng', en: 'GATE COMMANDER' }, hp: 650, look: { ...KIEU, helm: 'wing', plume: 0xd8402a } },
  tuongta: { name: { zh: 'Tả tướng Phong Châu', en: 'PHONG CHÂU LEFT GENERAL' }, hp: 760, look: { ...KIEU, helm: 'crest', plume: 0xe8d8a0 } },
  tuonghuu: { name: { zh: 'Hữu tướng Phong Châu', en: 'PHONG CHÂU RIGHT GENERAL' }, hp: 760, look: { ...KIEU, helm: 'horn', plume: 0xd8402a } },
  giusanh: { name: { zh: 'Tướng giữ đại sảnh', en: 'HALL GUARD GENERAL' }, hp: 820, look: { ...KIEU, helm: 'wing', cape: 0x6a1a10, plume: 0xf0c860 } },
  guard: { name: { zh: 'Thân binh họ Kiều', en: 'KIỀU HOUSEGUARD' }, hp: 340 },
};

const NAG_BEN = { who: 'dinhdien', zh: 'Khoan đã! Hai đồn canh ven sông còn đó — đốt chúng rồi hãy tiến lên đồi.', en: 'Wait! The two river posts still stand — burn them before you climb into the hills.' };
const NAG_HILL = { who: 'dinhdien', zh: 'Quân trên đồi chưa dẹp xong, đừng tiến một mình!', en: 'The hills aren\'t cleared yet — don\'t push on alone!' };
const NAG_LUY = { who: 'dinhdien', zh: 'Lũy tre chắn ngang đường. Phải hạ Nguyễn Khoan mới qua được!', en: 'The bamboo barricade blocks the road. Nguyễn Khoan must fall before we pass!' };
const NAG_GATE = { who: 'dinhdien', zh: 'Cổng thành đóng chặt, chờ xe phá thành tới!', en: 'The gate is shut fast — wait for the ram!' };
const NAG_INNER = { who: 'dinhdien', zh: 'Hai tướng giữ ngoại thành còn đó. Cổng trong chưa mở được!', en: 'The two generals of the outer bailey still stand. The inner gate won\'t open yet!' };
const NAG_HALL = { who: 'dinhdien', zh: 'Đại sảnh họ Kiều còn quân giữ. Dẹp nội thành trước đã!', en: 'Kiều\'s hall is still held. Clear the inner court first!' };

// ally actor: the hero's comrade (CH.ally) fights at his side from the landing on (an invulnerable allied actor)
const ALLY = (kit, name, seal) => ({ kit, role: 'ally', at: ['landing', 7, 3], name, seal });

// Pacing (default difficulty): a human reading the dialogue and steering lands at ≈ 11-14 min (landing and the two
// posts 2.5 min · hills, Kiều Thuận and the bamboo barricade 3 min · the ram 45 s fixed by its timer · outer bailey 1.5
// min · inner court and the hall 1.5 min · the summit duel 2.5 min). Officers come forward only after the hero has fought
// a while (kos / wait), so rushing shortens a stage but never skips one. Rank thresholds: CH.rank.
export const BEATS = [
  // ---- Bến Bạch Hạc: the night landing; burn the river posts
  {
    when: { wait: 30 },
    obj: { zh: 'Đốt đồn canh bến Tây', en: 'Burn the west river post', go: 'dtW' },
    officers: { dtW: { at: ['outW', 0, 0] } },
    squads: [{ at: ['ben', -0.3, -0.15], n: 20 }, { at: ['ben', 0.3, -0.1], n: 20 }, { at: ['ben', 0, 0.45], n: 22 }, { at: ['outW', 8, 2], n: 12 }],
    limit: { z: ['doi', 0, -0.98], nag: NAG_BEN },
    morale: 0,
    say: [
      { who: 'dinhbolinh', zh: 'Khắp nơi đã dẹp yên, chỉ còn Phong Châu của họ Kiều cùng vây cánh. Đêm nay, ta lấy lại đất tổ Hùng Vương!', en: 'Everywhere else is at peace; only the Kiều of Phong Châu and their allies remain. Tonight we take back the land of the Hùng kings!' },
      { who: 'dinhdien', zh: 'Thuyền đã cập bến Bạch Hạc. Hai đồn canh ven sông còn sáng đèn — đốt chúng trước khi họ Kiều kịp hay!', en: 'The boats are ashore at Bạch Hạc. Two river posts still burn their lamps — fire them before the Kiều are warned!' },
      { who: 'hero', dinhbolinh: ['Anh em, theo ta! Cờ lau đã tới chân núi Nghĩa Lĩnh!', 'With me, brothers! The reed banners have reached the foot of Nghĩa Lĩnh!'],
        nguyenbac: ['Nguyễn Bặc xin đi đầu. Đồn bến Tây, để tôi!', 'Let Nguyễn Bặc lead. The west post is mine!'],
        lehoan: ['Mạt tướng Lê Hoàn lĩnh mệnh — đồn bến Tây phải cháy!', 'Lê Hoàn takes the order — the west post burns!'],
        khuongviet: ['Nam mô A Di Đà Phật. Chỉ phá đồn giặc, xin chư tướng chớ phạm đến dân lành.', 'Namo Amitabha. Break their posts, my lords, but touch none of the common folk.'] },
      { who: 'ally', dinhbolinh: ['Chúa công cứ tiến, Nguyễn Bặc theo sát bên mình!', 'Go on, my lord — Nguyễn Bặc is at your side!'],
        nguyenbac: ['Bặc, đừng để ta bỏ lại phía sau đấy!', 'Bặc — don\'t leave me behind!'],
        lehoan: ['Lê Hoàn, ta đánh mặt tả, cậu lo đồn bến Tây!', 'Lê Hoàn — I take the left flank, you take the west post!'],
        khuongviet: ['Thầy yên lòng. Quân ta chỉ đánh kẻ cầm giáo.', 'Rest easy, Master. Our men strike only those who bear arms.'] },
    ],
  },
  { hero: ['dinhbolinh', 'lehoan'], actors: { nguyenbac: ALLY('nguyenbac', { zh: 'Nguyễn Bặc', en: 'NGUYỄN BẶC' }, '匐') } },
  { hero: ['nguyenbac', 'khuongviet'], actors: { dinhbolinh: ALLY('dinhbolinh', { zh: 'Đinh Bộ Lĩnh', en: 'ĐINH BỘ LĨNH' }, '丁') } },
  {
    when: [{ kos: 30 }, { wait: 20 * 60 }],
    set: 'beacon', waves: true,
    banner: { html: 'Lửa hiệu bùng lên trên <em>núi Nghĩa Lĩnh</em>!', en: 'A beacon flares on Nghĩa Lĩnh!', dur: 200 },
    say: [
      { who: 'soldier', zh: 'Quân Đinh đổ bộ! Đốt lửa hiệu, báo về thành!', en: 'The Đinh have landed! Light the beacon — warn the fort!' },
      { who: 'kieuconghan', zh: 'Thằng chăn trâu Hoa Lư dám mò tới tận Phong Châu? Lửa hiệu đã cháy — Hồi Hồ, Tam Đái sẽ kéo quân về!', en: 'The buffalo boy of Hoa Lư dares come all the way to Phong Châu? The beacon is lit — Hồi Hồ and Tam Đái will march!' },
      { who: 'ally', dinhbolinh: ['Chúa công, hắn gọi viện binh. Phải đánh nhanh, trước khi Kiều Thuận và Nguyễn Khoan kịp tới!', 'My lord, he calls for help. We strike fast — before Kiều Thuận and Nguyễn Khoan arrive!'],
        nguyenbac: ['Bặc, lửa hiệu đã sáng. Đánh cho nhanh, đừng để viện binh kịp hợp!', 'Bặc, the beacon is lit. Strike fast — don\'t let their reinforcements join!'],
        lehoan: ['Lê Hoàn, lửa hiệu kia gọi viện binh. Đánh cho nhanh!', 'Lê Hoàn — that beacon calls for help. Fast, now!'],
        khuongviet: ['Thầy xem, lửa hiệu đã cháy. Trận này phải đánh cho mau.', 'Look, Master — the beacon burns. This fight must be quick.'] },
    ],
  },
  {
    when: { down: 'dtW' },
    set: 'burnW', heal: 0.15, morale: 0.08,
    banner: { html: 'Đồn bến Tây <em>bốc cháy</em>!', en: 'The west post is ablaze!', dur: 160 },
    officers: { dtE: { at: ['outE', 0, 0], engaged: true } },
    squads: [{ at: ['outE', -7, 4], n: 14 }, { at: ['ben', 0.2, 0.3], n: 18, charge: true }],
    obj: { zh: 'Đốt đồn canh bến Đông', en: 'Burn the east river post', go: 'dtE' },
    say: [{ who: 'dinhsoldier', zh: 'Đồn Tây cháy rồi! Sang bến Đông!', en: 'The west post burns! On to the east landing!' }],
  },
  {
    when: { down: 'dtE' },
    set: 'burnE', heal: 0.3, morale: 0.12, waves: false, retire: true, hush: true,
    banner: { html: 'Hai đồn ven sông đã cháy — <em>Bến Bạch Hạc</em> trong tay ta!', en: 'Both river posts burn — Bạch Hạc landing is ours!', dur: 190 },
    obj: { zh: 'Tiến qua đồi trung du', en: 'Advance through the midland hills', go: ['laneE', 0, -10] },
    limit: { z: ['laneE', 0, 24], nag: NAG_HILL },
    say: [
      { who: 'dinhdien', zh: 'Qua mấy quả đồi kia là thành Phong Châu. Đường đồi quanh co, coi chừng phục binh!', en: 'Beyond those hills lies the fort of Phong Châu. The hill road twists — watch for ambush!' },
      { who: 'hero', dinhbolinh: ['Đồi bát úp trùng trùng... Đất tổ quả là hiểm yếu.', 'Hill after rounded hill... the land of our forefathers is a fortress itself.'],
        nguyenbac: ['Phục binh thì cứ ra. Đao này đang khát!', 'Let them ambush. This blade is thirsty!'],
        lehoan: ['Đường đồi hẹp, quân ta đi thành hai cánh!', 'The hill paths are narrow — two columns!'],
        khuongviet: ['Rừng chè yên tĩnh quá. Nơi yên tĩnh nhất thường giấu đao binh.', 'The tea hills are too quiet. The quietest places hide the most blades.'] },
    ],
  },

  // ---- Đồi trung du: Kiều Thuận's ambush from Hồi Hồ
  {
    when: { zone: 'doi' },
    waves: true,
    squads: [{ at: ['doi', -0.4, -0.85], n: 18 }, { at: ['doi', 0.4, -0.8], n: 18 }, { at: ['laneE', 0, -16], n: 16 }],
    say: [{ who: 'soldier', zh: 'Quân Đinh lên đồi rồi! Giữ lấy đường chè!', en: 'The Đinh are in the hills! Hold the tea road!' }],
  },
  {
    when: [{ at: ['laneE', 0, -8] }, { kos: 90 }],
    banner: { html: '<em>Kiều Thuận</em> từ Hồi Hồ kéo quân tới cứu!', en: 'Kiều Thuận marches in from Hồi Hồ!', dur: 190 },
    officers: { kieuthuan: { at: ['laneE', 0, 16], engaged: true } },
    squads: [{ at: ['laneW', 0, 0], n: 16, charge: true }, { at: ['laneE', 0, 22], n: 16, charge: true }, { at: ['xom', 2, 0], n: 14, charge: true },
      { at: ['doi', 0, 0.55], n: 16 }],
    morale: -0.1,
    obj: { zh: 'Đánh bại Kiều Thuận', en: 'Defeat Kiều Thuận', go: 'kieuthuan' },
    say: [
      { who: 'kieuthuan', zh: 'Ta là Kiều Thuận đất Hồi Hồ! Họ Kiều một nhà, há để Phong Châu lọt vào tay quân Hoa Lư!', en: 'I am Kiều Thuận of Hồi Hồ! The Kiều are one house — Phong Châu will never fall to Hoa Lư!' },
      { who: 'hero', dinhbolinh: ['Kiều Thuận! Ngươi bỏ Hồi Hồ tới đây, thì cứ ở lại đây!', 'Kiều Thuận! You left Hồi Hồ to come here — then here you stay!'],
        nguyenbac: ['Tới đúng lúc. Đỡ cho ta phải đi tận Hồi Hồ!', 'Right on time. Saves me the march to Hồi Hồ!'],
        lehoan: ['Viện binh của giặc tới rồi — đánh tan chúng giữa đồi!', 'Their relief force — break it among the hills!'],
        khuongviet: ['Vì một chữ "họ" mà đem quân liều chết... Thí chủ, nghĩ lại đi!', 'You throw your men away for a family name... Think again, sir!'] },
    ],
  },
  {
    when: { down: 'kieuthuan' },
    banner: { html: '<em>Kiều Thuận</em> đại bại!', en: 'Kiều Thuận is routed!', dur: 170 },
    heal: 0.3, morale: 0.12, retire: true, hush: true,
    officers: { nguyenkhoan: { at: ['luytre', 0, -10] } },
    squads: [{ at: ['luytre', -10, -14], n: 16 }, { at: ['luytre', 12, -14], n: 16 }],
    obj: { zh: 'Đánh bại Nguyễn Khoan, phá lũy tre', en: 'Defeat Nguyễn Khoan and break the bamboo barricade', go: 'nguyenkhoan' },
    limit: { z: ['luytre', 0, -3], nag: NAG_LUY },
    say: [
      { who: 'kieuthuan', zh: 'Không giữ nổi... Rút về Hồi Hồ!', en: 'We can\'t hold... Back to Hồi Hồ!' },
      { who: 'nguyenkhoan', zh: 'Nguyễn Khoan đất Tam Đái ở đây! Lũy tre này, không một tên lính Đinh nào qua được!', en: 'Nguyễn Khoan of Tam Đái stands here! Not one Đinh soldier gets past this bamboo wall!' },
    ],
  },
  {
    when: { down: 'nguyenkhoan' },
    gate: 'luytre', heal: 0.3, morale: 0.15, retire: true, hush: true,
    banner: { html: '<em>Lũy tre</em> đã phá — trước mặt là thành Phong Châu!', en: 'The bamboo barricade is down — the fort of Phong Châu lies ahead!', dur: 190 },
    obj: { zh: 'Tiến đến cổng ngoại thành', en: 'Advance on the outer gate', go: ['gate', 0, -16] },
    limit: { z: ['gate', 0, -4], nag: NAG_GATE },
    squads: [{ at: ['gate', -14, -14], n: 18 }, { at: ['gate', 14, -12], n: 18 }],
    say: [
      { who: 'nguyenkhoan', zh: 'Tam Đái... không về được nữa rồi...', en: 'Tam Đái... I won\'t see it again...' },
      { who: 'ally', dinhbolinh: ['Chúa công, nhìn kìa — thành đất ba tầng, tựa lưng vào núi. Cổng ngoài đóng chặt!', 'My lord, look — an earthen fort in three tiers, its back to the mountain. The outer gate is shut fast!'],
        nguyenbac: ['Bặc, thành đất kia đắp ba tầng. Đưa xe phá thành lên!', 'Bặc, that earth fort rises in three tiers. Bring up the ram!'],
        lehoan: ['Lê Hoàn, cổng ngoài là gỗ lim. Phải dùng xe phá thành!', 'Lê Hoàn, the outer gate is ironwood. It will take the ram!'],
        khuongviet: ['Thầy ơi, cổng thành đóng chặt. Xe phá thành đang tới.', 'Master, the gate is shut. The ram is coming up.'] },
    ],
  },

  // ---- Ngoại thành: guard the ram until the gate breaks, then the outer bailey
  {
    when: { at: ['gate', 0, -22] },
    set: 'ram', waves: true,
    obj: { zh: 'Bảo vệ xe phá thành cho đến khi cổng vỡ', en: 'Guard the battering ram until the gate breaks', go: ['ram', 0, 0], timer: 40 },
    defend: { key: 'ram', at: ['ram', 0, 0], r: 7, hp: 1000, name: { zh: 'Xe phá thành', en: 'Battering Ram' } },
    fail: { when: { hp: ['ram', 0.001] }, zh: 'Xe phá thành bị đốt cháy... cổng thành vẫn đứng vững.', en: 'The ram is burnt to ash... and the gate still stands.' },
    officers: { giucong: { at: ['gate', 9, -9], engaged: true } },
    squads: [{ at: ['gate', -12, -8], n: 14, charge: true }, { at: ['gate', 12, -8], n: 14, charge: true }, { at: ['luytre', 0, 10], n: 12, charge: true }],
    say: [
      { who: 'dinhdien', zh: 'Xe phá thành tới rồi! Giữ chân bọn chúng cho tới khi cổng vỡ!', en: 'The ram is here! Hold them off until the gate gives!' },
      { who: 'giucong', zh: 'Đốt cái xe ấy đi! Đừng để nó chạm tới cổng!', en: 'Burn that ram! Don\'t let it touch the gate!' },
    ],
  },
  {
    when: { timer: true },
    gate: 'ngoaithanh', defend: null, fail: null, heal: 0.3, morale: 0.2, retire: true, hush: true,
    banner: { html: '<em>Cổng ngoại thành</em> đã vỡ!', en: 'The outer gate is broken!', dur: 230, big: true },
    officers: { tuongta: { at: ['bailey', -14, 8] }, tuonghuu: { at: ['bailey', 14, 14] } },
    squads: [{ at: ['bailey', -20, 0], n: 20 }, { at: ['bailey', 20, -10], n: 20 }, { at: ['bailey', 0, 18], n: 20 }],
    obj: { zh: 'Chiếm ngoại thành: đánh bại Tả tướng', en: 'Take the outer bailey: defeat the Left General', go: 'tuongta' },
    limit: { z: ['inner', 0, -5], nag: NAG_INNER },
    say: [
      { who: 'dinhsoldier', zh: 'Cổng vỡ rồi! Xông vào!', en: 'The gate\'s down! In, in!' },
      { who: 'hero', dinhbolinh: ['Ngoại thành đã mở. Đánh thẳng lên!', 'The outer wall is open. Straight up the hill!'],
        nguyenbac: ['Ha! Gỗ lim cũng không chịu nổi!', 'Ha! Not even ironwood could take it!'],
        lehoan: ['Vào thành! Giữ đội ngũ, đừng tản ra!', 'Into the fort! Keep ranks — don\'t scatter!'],
        khuongviet: ['Cổng đã vỡ. Xin chư quân chớ đốt nhà dân trong thành.', 'The gate is down. I beg you, burn no homes within.'] },
    ],
  },
  {
    when: { down: 'tuongta' },
    obj: { zh: 'Đánh bại Hữu tướng', en: 'Defeat the Right General', go: 'tuonghuu' },
    say: [{ who: 'soldier', zh: 'Tả tướng tử trận rồi! Hữu tướng, cứu với!', en: 'The Left General is down! Right General, help!' }],
  },
  {
    when: { down: 'tuonghuu' },
    gate: 'noithanh', heal: 0.3, morale: 0.15, retire: true, hush: true, waves: false,
    banner: { html: '<em>Cổng nội thành</em> đã mở!', en: 'The inner gate is open!', dur: 190 },
    officers: { giusanh: { at: ['hall', 13, -8] } },
    squads: [{ at: ['court', -14, 0], n: 20 }, { at: ['court', 20, -10], n: 18 }, { at: ['court', 0, 12], n: 18 }],
    obj: { zh: 'Đánh vào nội thành: hạ tướng giữ đại sảnh', en: 'Storm the inner court: defeat the hall\'s guard general', go: 'giusanh' },
    limit: { z: ['stair', 0, -4], nag: NAG_HALL },
    say: [
      { who: 'dinhdien', zh: 'Đại sảnh và kho lương của họ Kiều ở ngay trong kia. Hạ được tướng giữ sảnh, ta phóng hỏa!', en: 'Kiều\'s hall and his granary are just within. Bring down their guard general and we put them to the torch!' },
      { who: 'giusanh', zh: 'Đại sảnh của chúa ta, kẻ nào bước vào phải để đầu lại!', en: 'Whoever sets foot in my lord\'s hall leaves his head behind!' },
    ],
  },
  {
    when: { down: 'giusanh' },
    set: 'burn', heal: 0.35, morale: 0.2, retire: true, hush: true, waves: true, limit: { z: null },
    banner: { html: 'Đại sảnh họ Kiều <em>bốc cháy</em>!', en: 'Kiều\'s hall goes up in flames!', dur: 230, big: true },
    // Kiều Công Hãn takes his stand before the shrine on the summit and holds it (a boss actor: telegraphed blows, poise,
    // the boss bar); he breaks and flees at the end — the script counts that as his fall
    actors: { kieuconghan: { kit: 'kieuconghan', role: 'boss', at: ['summit', 0, 4], hp: KHAN_HP, name: { zh: 'Kiều Công Hãn', en: 'KIỀU CÔNG HÃN' }, seal: '矯',
      retreatAt: 0.12, intro: { zh: 'Kiều Tam Chế · Sứ quân Phong Châu', en: 'Kiều Tam Chế, warlord of Phong Châu' } } },
    actor: { key: 'kieuconghan', do: 'hold' },
    squads: [{ at: ['stair', 4, 12], n: 14 }, { at: ['summit', -14, -6], n: 16 }, { at: ['summit', 14, -4], n: 16 }],
    obj: { zh: 'Lên đỉnh Nghĩa Lĩnh', en: 'Climb to the summit of Nghĩa Lĩnh', go: ['summit', 0, -10] },
    say: [
      { who: 'dinhsoldier', zh: 'Lửa! Lửa bén mái sảnh rồi! Kho lương họ Kiều cháy rồi!', en: 'Fire! The hall roof has caught! Kiều\'s granary is burning!' },
      { who: 'kieuconghan', zh: 'Đốt sảnh của ta?... Được lắm. Muốn lấy đầu Kiều Công Hãn thì lên núi mà lấy!', en: 'You burn my hall?... Very well. If you want Kiều Công Hãn\'s head, climb the mountain and take it!' },
    ],
  },

  // ---- Đỉnh Nghĩa Lĩnh: the duel; the bronze drums at half HP; he breaks and flees — the realm is one
  {
    when: { at: ['summit', 0, -16] },                   // z 166: under the tam quan, over the stair's head
    skip: { down: 'kieuconghan' },
    banner: { html: 'Sứ quân Phong Châu — <em>Kiều Công Hãn</em>', en: 'The warlord of Phong Châu: Kiều Công Hãn', dur: 170, big: true },
    actor: { key: 'kieuconghan', do: 'join' },
    obj: { zh: 'Đánh bại Kiều Công Hãn', en: 'Defeat Kiều Công Hãn', go: 'kieuconghan' },
    say: [
      { who: 'kieuconghan', dinhbolinh: ['Đinh Bộ Lĩnh! Thằng chăn trâu cũng dám xưng vương? Phong Châu là đất tổ, đâu phải bãi chăn trâu của ngươi!', 'Đinh Bộ Lĩnh! A buffalo boy calls himself king? Phong Châu is the land of our forefathers, not your grazing field!'],
        nguyenbac: ['Nguyễn Bặc! Chó săn của nhà Đinh, lên tới đây chỉ để nộp mạng!', 'Nguyễn Bặc! The Đinh\'s hunting hound, come all this way to die!'],
        lehoan: ['Một tên tướng trẻ ranh mà dám trèo lên Nghĩa Lĩnh? Để ta dạy ngươi phép tắc!', 'A green young officer dares climb Nghĩa Lĩnh? Let me teach you your place!'],
        khuongviet: ['Một nhà sư cầm phất trần đi đánh trận? Chùa của ngươi ở dưới chân núi kia mà!', 'A monk with a whisk, going to war? Your temple is at the foot of the mountain!'] },
      { who: 'hero', dinhbolinh: ['Đất tổ Hùng Vương không của riêng họ nào. Hôm nay, non sông về một mối!', 'The land of the Hùng kings belongs to no one clan. Today the realm becomes one!'],
        nguyenbac: ['Nguyễn Bặc chỉ biết một chủ, một nước. Kiều Công Hãn, nhận lấy nhát đao này!', 'Nguyễn Bặc serves one lord and one realm. Kiều Công Hãn — take this blade!'],
        lehoan: ['Trẻ hay già, đao kiếm sẽ trả lời. Kiều Công Hãn, xin chỉ giáo!', 'Young or old, the blade will answer. Kiều Công Hãn — have at you!'],
        khuongviet: ['Bần tăng lên núi chỉ để dứt một cuộc binh đao. Thí chủ hạ binh khí xuống, muôn nhà được yên.', 'This monk climbed the mountain only to end a war. Lay down your qua, and ten thousand homes have peace.'] },
    ],
  },
  {
    when: { below: ['kieuconghan', 0.5] },
    skip: { down: 'kieuconghan' },
    banner: { html: '<em>Trống đồng</em> rền vang — thân binh họ Kiều liều chết xông ra!', en: 'The bronze drums thunder — Kiều\'s houseguard charges to the death!', dur: 190 },
    morale: -0.1,
    squads: [{ at: ['summit', -18, 4], n: 16, charge: true }, { at: ['summit', 18, 2], n: 16, charge: true }, { at: ['summit', 0, 10], n: 14, charge: true }],
    officers: { guard1: { at: ['summit', -8, 8], engaged: true, like: 'guard' }, guard2: { at: ['summit', 8, 8], engaged: true, like: 'guard' } },
    say: [
      { who: 'kieuconghan', zh: 'Đánh trống đồng! Cho cả Nghĩa Lĩnh nghe tiếng!', en: 'Beat the bronze drums! Let all of Nghĩa Lĩnh hear!' },
      { who: 'ally', dinhbolinh: ['Chúa công, thân binh để Nguyễn Bặc lo. Hạ Kiều Công Hãn đi!', 'My lord, leave the houseguard to me. Take Kiều Công Hãn!'],
        nguyenbac: ['Bặc! Thân binh có ta chặn. Kết liễu hắn đi!', 'Bặc! I\'ll hold the houseguard. Finish him!'],
        lehoan: ['Lê Hoàn, thân binh có ta! Đánh thẳng vào Kiều Công Hãn!', 'Lê Hoàn, I have the houseguard! Go straight at Kiều Công Hãn!'],
        khuongviet: ['Thầy, cứ lo Kiều Công Hãn. Bọn thân binh, ta chặn!', 'Master, see to Kiều Công Hãn. I\'ll stop the houseguard!'] },
    ],
  },
  {
    when: { down: 'kieuconghan' },
    win: true, waves: false, morale: 1, set: 'dawn',
    banner: { html: '<em>Thống nhất sơn hà</em>', en: 'Kiều Công Hãn flees — the realm is one', dur: 300, big: true },
    say: [{ who: 'hero', dinhbolinh: ['Mười hai sứ quân đã dẹp yên. Từ nay, non sông về một mối!', 'The twelve warlords are no more. From this day, the realm is one!'],
      nguyenbac: ['Chúa công, Phong Châu đã phá! Mười hai sứ quân, không còn một ai!', 'My lord, Phong Châu has fallen! Not one of the twelve remains!'],
      lehoan: ['Kiều Công Hãn tháo chạy! Trời sắp sáng — buổi sáng của một nước!', 'Kiều Công Hãn flees! Dawn is coming — the dawn of one realm!'],
      khuongviet: ['Nam mô A Di Đà Phật. Binh đao đã dứt, trời đã hửng sáng.', 'Namo Amitabha. The war is over, and the sky grows light.'] }],
  },
];

// ---- prologue ink map of the whole delta (viewBox 1600×900, north up): the highlands to the north-west, the Thao /
// Đà / Lô meeting at Bạch Hạc under Nghĩa Lĩnh, the Red River (sông Cái) running down to the sea past Đại La, the Đuống
// to the east, the Đáy to the south-west past the karsts of Hoa Lư, the coast; the twelve warlords' seats (game-sketch
// geography, not survey: spread so every label reads), each with an ink cross (f-) or a teal ring (j-, joined Đinh)
const peaks = (list, h, w) => list.map(([x, y, k = 1]) =>
  `<path d="M${x - w * k} ${y} Q${x - w * k * 0.35} ${y - h * k * 0.55} ${x} ${y - h * k} Q${x + w * k * 0.3} ${y - h * k * 0.5} ${x + w * k} ${y}Z"/>`).join('');
const THAO = 'M-20 70 C100 110 220 190 330 255 S560 330 700 350 S900 470 1050 560 S1300 720 1620 770';
const DA = 'M-20 330 C100 300 230 280 330 255', LO = 'M430 -20 C410 80 360 180 330 255';
const DUONG = 'M700 350 C820 300 1000 300 1150 320 S1400 420 1620 470', DAY = 'M330 300 C360 420 420 520 520 600 S640 700 760 920';
const river = (d, w1, w2) => `<path d="${d}" stroke="#6f7c78" stroke-width="${w1}" opacity=".32"/><path d="${d}" stroke="#46524f" stroke-width="${w2}" opacity=".7"/>`;
// [id, dot x, dot y, place, warlord, joined Đinh (true) | Kiều's ally, still standing at this battle ('ally': no mark)]
const SEATS = [
  ['hoiho', 170, 150, 'Hồi Hồ', 'Kiều Thuận', 'ally'], ['tamdai', 560, 168, 'Tam Đái', 'Nguyễn Khoan', 'ally'], ['duonglam', 190, 380, 'Đường Lâm', 'Ngô Nhật Khánh'],
  ['dodong', 420, 470, 'Đỗ Động Giang', 'Đỗ Cảnh Thạc'], ['tayphuliet', 700, 322, 'Tây Phù Liệt', 'Nguyễn Siêu'], ['tiendu', 900, 196, 'Tiên Du', 'Nguyễn Thủ Tiệp'],
  ['sieuloai', 1130, 286, 'Siêu Loại', 'Lý Khuê'], ['tegiang', 900, 424, 'Tế Giang', 'Lã Đường'], ['dangchau', 1130, 520, 'Đằng Châu', 'Phạm Bạch Hổ', true],
  ['bohai', 1290, 650, 'Bố Hải Khẩu', 'Trần Lãm', true], ['binhkieu', 330, 760, 'Bình Kiều', 'Ngô Xương Xí'],
];
const seat = ([id, x, y, place, lord, joined]) => `<g class="pl-mark wei" data-id="w-${id}"><rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="3"/>` +
  `<text class="sm" x="${x + 22}" y="${y + 6}">${place}</text><text class="sm" x="${x + 22}" y="${y + 40}">${lord}</text></g>` +
  (joined === 'ally' ? '' : joined ? `<g class="pl-mark" data-id="j-${id}"><circle cx="${x}" cy="${y}" r="26" fill="none" stroke="#2f6f68" stroke-width="7"/></g>`
    : `<g class="pl-mark" data-id="f-${id}"><path d="M${x - 20} ${y - 20} L${x + 20} ${y + 20} M${x + 20} ${y - 20} L${x - 20} ${y + 20}" stroke="#24160b" stroke-width="8" stroke-linecap="round"/></g>`);
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${peaks([[60, 120, 0.8], [300, 96, 0.9], [470, 84, 0.8], [700, 120, 1.0], [790, 104, 1.1], [1350, 140, 0.9], [1480, 170, 1.0]], 110, 90)}
    ${peaks([[100, 620, 1.0], [210, 700, 0.9], [90, 860, 1.2], [470, 880, 0.8]], 120, 90)}
  </g>
  <g class="pl-mark" data-id="nghialinh" fill="url(#pl-mtn)" filter="url(#pl-ink)">${peaks([[268, 238, 0.5], [300, 230, 0.7]], 120, 60)}</g>
  <g class="pl-mark" data-id="hoalu-karst" fill="url(#pl-mtn)" filter="url(#pl-ink)">${peaks([[600, 650, 0.35], [624, 640, 0.45], [652, 652, 0.3], [580, 664, 0.3]], 110, 36)}</g>
  <g class="pl-mark" data-id="sea" filter="url(#pl-ink)"><path d="M760 920 C900 860 1060 800 1180 760 S1420 660 1620 600 L1620 920Z" fill="#6f7c78" opacity=".22"/>
    <path d="M760 920 C900 860 1060 800 1180 760 S1420 660 1620 600" fill="none" stroke="#46524f" stroke-width="5" opacity=".6"/></g>
  <g class="pl-mark" data-id="rivers" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    ${river(THAO, 36, 8)}${river(DA, 22, 5)}${river(LO, 22, 5)}${river(DUONG, 20, 5)}${river(DAY, 20, 5)}
  </g>
  <g class="pl-labels">
    ${SEATS.map(seat).join('')}
    <g class="pl-mark wei" data-id="phongchau"><rect x="316" y="238" width="30" height="30" rx="3"/><text x="356" y="272">Phong Châu</text><text class="sm" x="360" y="312">Kiều Công Hãn</text></g>
    <g class="pl-mark" data-id="hoalu"><rect x="624" y="660" width="32" height="32" rx="3"/><text x="668" y="694">Hoa Lư</text><text class="sm" x="672" y="732">Đinh Bộ Lĩnh</text></g>
    <g class="pl-mark" data-id="dala"><text class="sm" x="596" y="398">Đại La</text></g>
    <g class="pl-mark" data-id="rivers"><text class="sm river" x="110" y="96">Sông Thao</text><text class="sm river" x="1330" y="806">Sông Cái</text></g>
    <g class="pl-mark" data-id="nghialinh"><text class="sm" x="150" y="236">Nghĩa Lĩnh</text></g>
  </g>`,
  arrows: [
    ['a-join', 'shu', 'M640 660 C820 640 1040 620 1270 652'],
    ['a-south', 'shu', 'M612 690 C540 740 460 760 360 762'],
    ['a-west', 'shu', 'M630 664 C560 600 500 540 440 486'],
    ['a-north', 'shu', 'M660 660 C700 560 720 450 708 344'],
    ['a-east', 'shu', 'M670 664 C800 560 920 400 1110 300'],
    ['a-kieu', 'wei', 'M180 162 C230 190 280 220 320 246'],
    ['a-khoan', 'wei', 'M556 180 C480 210 410 236 352 252'],
    ['a-march', 'shu', 'M650 668 C680 560 700 440 640 360 S440 280 352 264'],
  ],
};

// ---- prologue cards (format: chapters.js; cols Hán, vi Vietnamese prose, en English). Card 7 branches on the hero.
const W_ALL = SEATS.map(([id]) => 'w-' + id).concat('phongchau');
export const PROLOGUE = [
  { cols: ['吳王既薨', '十二使君', '各據一方'], vi: 'Ngô Quyền mất năm 944, nhà Ngô suy dần. Đến khi Ngô Xương Văn tử trận (965), hào trưởng khắp nơi mỗi người giữ một phương — sử gọi là loạn mười hai sứ quân.',
    en: 'Ngô Quyền died in 944 and his house declined. When Ngô Xương Văn fell in 965, chieftains everywhere each held their own corner — the Anarchy of the Twelve Warlords.',
    show: ['rivers', 'sea', ...W_ALL], focus: [800, 450, 1.04] },
  { cols: ['華閭丁部領', '依陳明公', '眾附如雲'], vi: 'Ở Hoa Lư, Đinh Bộ Lĩnh về với sứ quân Trần Lãm (Trần Minh Công) ở Bố Hải Khẩu; Trần Lãm mất, ông nắm lấy binh quyền. Phạm Bạch Hổ ở Đằng Châu cũng xin theo về.',
    en: 'Đinh Bộ Lĩnh of Hoa Lư joined the warlord Trần Lãm at Bố Hải Khẩu and took up his command when Trần Lãm died. Phạm Bạch Hổ of Đằng Châu came over to him too.',
    show: ['hoalu', 'hoalu-karst', 'a-join', 'j-bohai', 'j-dangchau'], focus: [960, 640, 1.2] },
  { cols: ['唐林吳日慶', '平橋吳昌熾', '相繼歸降'], vi: 'Ngô Nhật Khánh ở Đường Lâm, Ngô Xương Xí ở Bình Kiều — dòng dõi nhà Ngô — lần lượt quy phục cờ lau.',
    en: 'Ngô Nhật Khánh of Đường Lâm and Ngô Xương Xí of Bình Kiều, heirs of the house of Ngô, bowed to the reed banners one after the other.',
    show: ['a-south', 'f-duonglam', 'f-binhkieu'], focus: [420, 600, 1.15] },
  { cols: ['西扶烈既陷', '杜洞江既平', '杜景碩死之'], vi: 'Thành Tây Phù Liệt của Nguyễn Siêu bị phá; Đỗ Động Giang sau trận vây dài cũng thất thủ, Đỗ Cảnh Thạc tử trận.',
    en: 'Nguyễn Siêu\'s fort at Tây Phù Liệt was stormed; Đỗ Động Giang fell after its long siege, and Đỗ Cảnh Thạc died fighting.',
    show: ['a-west', 'a-north', 'dala', 'f-tayphuliet', 'f-dodong'], focus: [580, 420, 1.2] },
  { cols: ['超類仙遊', '細江諸使', '次第削平'], vi: 'Siêu Loại, Tiên Du, Tế Giang — các sứ quân Lý Khuê, Nguyễn Thủ Tiệp, Lã Đường lần lượt bị dẹp yên.',
    en: 'Siêu Loại, Tiên Du, Tế Giang — the warlords Lý Khuê, Nguyễn Thủ Tiệp and Lã Đường were put down one by one.',
    show: ['a-east', 'f-sieuloai', 'f-tiendu', 'f-tegiang'], focus: [1000, 330, 1.2] },
  { cols: ['唯矯公罕', '據峰州', '三江之會'], vi: 'Chỉ còn Kiều Công Hãn — cháu Kiều Công Tiễn, xưng Kiều Tam Chế — giữ Phong Châu, đất tổ Văn Lang, nơi sông Thao, sông Đà, sông Lô đổ về dưới chân núi Nghĩa Lĩnh. Kiều Thuận ở Hồi Hồ, Nguyễn Khoan ở Tam Đái là hai cánh tay.',
    en: 'Only Kiều Công Hãn remained — grandson of Kiều Công Tiễn, styled Kiều Tam Chế — holding Phong Châu, the old heartland of Văn Lang where the Thao, Đà and Lô meet under Nghĩa Lĩnh. Kiều Thuận at Hồi Hồ and Nguyễn Khoan at Tam Đái were his two arms.',
    show: ['phongchau', 'nghialinh', 'a-kieu', 'a-khoan'], focus: [360, 230, 1.42] },
  { dinhbolinh: { cols: ['萬勝王親征', '夜溯大江', '直指峰州'], vi: 'Vạn Thắng Vương tự cầm quân, đêm ngược dòng sông Cái, thẳng hướng Phong Châu.', en: 'The King of Ten Thousand Victories takes the field himself, sailing upriver by night, straight for Phong Châu.' },
    nguyenbac: { cols: ['阮匐請先鋒', '夜泊白鶴', '誓破峰州'], vi: 'Nguyễn Bặc, người bạn chăn trâu thuở nhỏ, xin làm tiên phong, đêm cập bến Bạch Hạc, thề phá Phong Châu.', en: 'Nguyễn Bặc, his boyhood friend from the buffalo fields, asks to lead the van — to land at Bạch Hạc by night and break Phong Châu.' },
    lehoan: { cols: ['少將黎桓', '從萬勝王', '夜渡白鶴'], vi: 'Viên tướng trẻ Lê Hoàn theo Vạn Thắng Vương, đêm vượt sông đổ bộ lên bến Bạch Hạc.', en: 'The young officer Lê Hoàn follows the King of Ten Thousand Victories across the river by night, to the landing at Bạch Hạc.' },
    khuongviet: { cols: ['僧吳真流', '隨軍西上', '願止干戈'], vi: 'Thiền sư Ngô Chân Lưu theo quân ngược sông, nguyện sớm dứt binh đao cho muôn nhà. (Tương truyền, nhà sư đi giữa trận mà không ai dám phạm.)', en: 'The Zen master Ngô Chân Lưu goes upriver with the army, vowing to end the killing for every household. (Legend says no one dared raise a hand against him on the field.)' },
    show: ['a-march'], focus: [500, 400, 1.12] },
  { cols: ['一戰峰州', '十二使君盡', '山河歸一'], vi: 'Một trận ở Phong Châu — mười hai sứ quân sẽ không còn ai. Non sông về một mối.',
    en: 'One battle at Phong Châu, and not one of the twelve warlords will remain. The realm will be one.',
    show: [], focus: [700, 450, 1.04] },
];

// ---- result screen epilogue (win), branched on the hero: the end of the campaign — 968, Đại Cồ Việt, Hoa Lư
export const EPILOGUE = {
  dinhbolinh: {
    zh: ['Kiều Công Hãn bỏ thành chạy về phía nam; dọc đường bị hào trưởng địa phương chặn đánh, trọng thương mà chết. Mười hai sứ quân đến đây đều dẹp yên.',
      'Năm Mậu Thìn (968), Đinh Bộ Lĩnh lên ngôi Hoàng đế, tức Đinh Tiên Hoàng, đặt quốc hiệu là Đại Cồ Việt, đóng đô ở Hoa Lư.',
      'Cậu bé chăn trâu năm nào lấy bông lau làm cờ, nay đã gom non sông về một mối.'],
    en: ['Kiều Công Hãn abandoned his fort and fled south; on the road a local chieftain cut him off, and he died of his wounds. The twelve warlords were no more.',
      'In 968 Đinh Bộ Lĩnh took the throne as Emperor — Đinh Tiên Hoàng — named the realm Đại Cồ Việt and made Hoa Lư his capital.',
      'The buffalo boy who once marched the village children under banners of reed flowers had made the land one.'],
  },
  nguyenbac: {
    zh: ['Nguyễn Bặc truy kích không nghỉ. Kiều Công Hãn chạy về phía nam, trọng thương mà chết dọc đường; đất Phong Châu yên.',
      'Năm 968, người bạn chăn trâu thuở nhỏ của ông lên ngôi Hoàng đế ở Hoa Lư, đặt quốc hiệu Đại Cồ Việt.',
      'Năm 971, Nguyễn Bặc được phong Định Quốc Công, đứng đầu hàng võ tướng, một lòng với nhà Đinh đến hơi thở cuối cùng.'],
    en: ['Nguyễn Bặc gave chase without rest. Kiều Công Hãn fled south and died of his wounds on the road; Phong Châu was at peace.',
      'In 968 the friend of his buffalo-herding boyhood took the throne at Hoa Lư and named the realm Đại Cồ Việt.',
      'In 971 Nguyễn Bặc was made Duke Who Steadies the Realm (Định Quốc Công), first among the generals — loyal to the house of Đinh to his last breath.'],
  },
  lehoan: {
    zh: ['Thành Phong Châu cháy suốt đêm; đến sáng, cờ lau đã cắm trên đỉnh Nghĩa Lĩnh. Kiều Công Hãn bỏ chạy, trọng thương mà chết.',
      'Năm 968, Đinh Bộ Lĩnh lên ngôi, lập nước Đại Cồ Việt, đóng đô ở Hoa Lư. Viên tướng trẻ Lê Hoàn được tin dùng; năm 971 làm Thập đạo tướng quân, nắm quân mười đạo.',
      'Hơn mười năm sau, chính ông sẽ đem quân phá giặc Tống — nhưng đó là một câu chuyện khác.'],
    en: ['Phong Châu burned all night; by morning the reed banners flew on the summit of Nghĩa Lĩnh. Kiều Công Hãn fled, and died of his wounds.',
      'In 968 Đinh Bộ Lĩnh took the throne, founded Đại Cồ Việt and made Hoa Lư its capital. The young Lê Hoàn rose in his trust: in 971 he became General of the Ten Circuits, master of the realm\'s armies.',
      'A dozen years on he would lead those armies against the Song — but that is another story.'],
  },
  khuongviet: {
    zh: ['Lửa trên Nghĩa Lĩnh tàn dần trong sương sớm. Kiều Công Hãn bỏ chạy, trọng thương mà chết; binh đao mười hai sứ quân đến đây chấm dứt.',
      'Năm 968, Đinh Tiên Hoàng lên ngôi ở Hoa Lư, đặt quốc hiệu Đại Cồ Việt. Năm 971, thiền sư Ngô Chân Lưu được phong Tăng thống, ban hiệu Khuông Việt Thái sư — "người giúp nước Việt".',
      'Tương truyền, ông lấy lời Phật dạy khuyên vua lấy đức mà yên dân, cho muôn nhà sau loạn lạc được nghỉ ngơi.'],
    en: ['The fires on Nghĩa Lĩnh died down in the morning mist. Kiều Công Hãn fled and died of his wounds; the wars of the twelve warlords were over.',
      'In 968 Đinh Tiên Hoàng took the throne at Hoa Lư and named the realm Đại Cồ Việt. In 971 the Zen master Ngô Chân Lưu was made Supreme Patriarch and given the name Khuông Việt Thái sư — "he who aids the Việt".',
      'Tradition holds that he counselled the emperor to rule by virtue, so that every household could rest at last after the years of war.'],
  },
};

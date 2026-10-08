// Màn VI «Ngày Bốn Mươi Chín» — the finale of 護靈壯士 (format: src/story/chapters.js header; text convention:
// holinh/DESIGN.md §2 — .zh carries Vietnamese, .en English, seals and prologue cols Hán): metadata, speakers, the battle
// script (BEATS), the prologue over an ink map of Hoa Lư and the seven roads (PL_MAP) and the epilogues that close the
// game (comic ch. 18-20: the nameless burial, the empty cups, the warriors' song, the storks).
// Adapted from the comic «Hộ Linh Tráng Sĩ» ch. 15-17 (the prologue: the dead man's ring, his false death, his order to
// strike the rite; the battle: ch. 16 the rite under attack, ch. 17 seven roads become one). History: 979, Dương hậu
// regent for the boy emperor; the rite of the 49th day, the 99 coffins and the seven roads are legend; every guardian,
// assassin and line here is fiction. Tone rules: no gore; the tomb is never shown, named or hinted at — the true coffin
// only passes through a stone gate into darkness on a raft among its identical twins; the Chief Eunuch does not die on
// screen (he breaks off at retreatAt and is shut in among his own false corridors); the poison of the epilogue is only
// ever «rượu độc» and sleep; the 979 assassin is never named; the boy emperor never speaks.
// Played as any of five guardians: `hero` = the chosen one, `ally` = CH.ally[hero] (pixel portrait), who fights at his /
// her side once on the field. Story allies on the field (hero-model actors): Dương hậu (npc, kneeling at the rite — hold),
// Thầy Mo (npc, the bells — hold; at the end he closes the stone works in the hall), Nữ Cận Vệ (ally, the inner stair),
// and the guardians who are not the hero where the comic puts them: Hữu Tướng on the outer ring, Tả Tướng on the bridge,
// Đinh Khang at the water-gate, An Nhiên / Nguyên Phong at the hero's side. Everyone else speaks under a seal.
// Map (holinh/src/world/maps/ngay49.js): zones vongngoai / santle / bensong / caucu / bacda / cuada / dientim; anchors
// shields / slopeW / slopeE / rite / queen / altar / innerstair / barricade / sluice / bridge / door / hall; gate
// 'raoban' (the traitor's barricade); set pieces 'candle49', 'arrow', 'beacons', 'sluice', 'door', 'seal'.

export const CH = {
  id: 'ngay49', num: { zh: 'Màn VI', en: 'STAGE VI' }, title: { zh: 'Ngày Bốn Mươi Chín', en: 'The Forty-Ninth Day' },
  seal: '七七', era: { zh: 'Năm 979 · ngày thứ bốn mươi chín', en: '979 AD · the forty-ninth day' }, map: 'ngay49',
  heroes: ['annhien', 'nguyenphong', 'tatuong', 'huutuong', 'dinhkhang'],
  ally: { annhien: 'nguyenphong', nguyenphong: 'annhien', tatuong: 'annhien', huutuong: 'tatuong', dinhkhang: 'annhien' },
  army: { foe: 'phanthan', ally: 'holinh' },
  // the escort's shield line either side of the road on the outer ring, holding until the hero marches past
  van: [{ x: -7, z: -176, n: 12, cols: 4, hold: true }, { x: 7, z: -176, n: 12, cols: 4, hold: true }],
  hq: [0, 100],                                    // the violet hall
  rank: { kos: [500, 900, 1400], time: [600, 780, 960] },
};

export const SPK = {
  duonghau: { name: { zh: 'Dương Hoàng hậu', en: 'Queen Dương' }, seal: '楊后', side: 'shu', char: 'duonghau' },
  nucanve: { name: { zh: 'Nữ Cận Vệ', en: 'The Queen\'s Guard' }, seal: '衛', side: 'shu', char: 'nucanve' },
  hoanquan: { name: { zh: 'Hoạn Quan Tổng Quản', en: 'The Chief Eunuch' }, seal: '宦官', side: 'wei', char: 'hoanquan' },
  hongdiem: { name: { zh: 'Mã Hồng Diễm', en: 'Mã Hồng Diễm' }, seal: '紅艷', side: 'wei', char: 'hongdiem' },
  matseo: { name: { zh: 'Mặt Sẹo', en: 'Mặt Sẹo' }, seal: '疤面', side: 'wei', char: 'matseo' },
  kytuong: { name: { zh: 'Kỵ tướng truy sát', en: 'Hunter Captain' }, seal: '騎', side: 'wei' },
  phanbinh: { name: { zh: 'Lính phản thần', en: 'Traitor\'s Soldier' }, seal: '兵', side: 'wei' },
  linh: { name: { zh: 'Lính hộ linh', en: 'Escort Soldier' }, seal: '護', side: 'shu' },
  danchai: { name: { zh: 'Dân chài', en: 'Fisherman' }, seal: '漁', side: 'shu' },
};

// officers (crowd.spawnOfficer), the traitor's host in palace violet and black iron (armies.js 'phanthan'). HP: a default
// officer 520 (≈ 5 full combos); the three bosses are actors (NPC kits) below, × game.diff.officerHp.
const PHAN = { armor: 0x16101a, trim: 0xf0c860, cape: 0x6a2490, plume: 0xb060f0 };
export const OFF = {
  kyW: { name: { zh: 'Kỵ tướng cánh tây', en: 'WEST RIDER CAPTAIN' }, hp: 520, look: { ...PHAN, helm: 'crest', armor: 0x221a2a, cape: 0x3a1a4e, plume: 0x9a48d0 } },
  kyE: { name: { zh: 'Kỵ tướng cánh đông', en: 'EAST RIDER CAPTAIN' }, hp: 520, look: { ...PHAN, helm: 'crest', armor: 0x221a2a, cape: 0x3a1a4e, plume: 0x9a48d0 } },
  phale: { name: { zh: 'Tướng phá lễ', en: 'RITE BREAKER' }, hp: 600, look: { ...PHAN, helm: 'horn' } },
  giuluy: { name: { zh: 'Tướng giữ lũy', en: 'BARRICADE CAPTAIN' }, hp: 680, look: { ...PHAN, helm: 'wing', plume: 0xf0c860 } },
  tuongben: { name: { zh: 'Tướng giữ bến', en: 'LANDING CAPTAIN' }, hp: 720, look: { ...PHAN, helm: 'horn', cape: 0x4a1e62 } },
  thanbinh: { name: { zh: 'Thân binh nội cung', en: 'PALACE BODYGUARD' }, hp: 380, look: { ...PHAN, helm: 'cap', cape: 0x2a0c3a } },
};

const NAG_OUT = { who: 'linh', zh: 'Kỵ binh còn trên dốc — giữ vòng ngoài đã!', en: 'Riders still on the slopes — hold the outer ring first!' };
const NAG_RITE = { who: 'nucanve', zh: 'Đừng rời vòng nến! Lễ chưa xong.', en: 'Don\'t leave the candle ring! The rite isn\'t done.' };
const NAG_LUY = { who: 'linh', zh: 'Lũy chắn còn đứng — phải hạ tướng giữ lũy!', en: 'The barricade still stands — bring down its captain!' };
const NAG_BANK = { who: 'danchai', zh: 'Cầu đá còn bị chặn! Giữ bến cho cống mở trước đã.', en: 'The bridge is still held! Keep the landing till the sluice opens.' };
const NAG_BRIDGE = { who: 'linh', zh: 'Mặt Sẹo còn chặn đầu cầu!', en: 'Mặt Sẹo still holds the bridge!' };
const NAG_STAIR = { who: 'nguyenphong', zh: 'Khoan — có kẻ bám sau lưng ta trên bậc đá!', en: 'Wait — someone is on our heels on the stairs!' };
const NAG_DOOR = { who: 'annhien', zh: 'Hồng Diễm còn đó. Chưa qua cửa được.', en: 'Hồng Diễm is still there. We can\'t go through yet.' };

// hero-model actors: friends hold their posts or follow the hero; names / seals for the field label
const NAME = {
  annhien: [{ zh: 'An Nhiên', en: 'AN NHIÊN' }, '安然'], nguyenphong: [{ zh: 'Nguyên Phong', en: 'NGUYÊN PHONG' }, '元風'],
  tatuong: [{ zh: 'Tả Tướng', en: 'THE LEFT GENERAL' }, '左將'], huutuong: [{ zh: 'Hữu Tướng', en: 'THE RIGHT GENERAL' }, '右將'],
  dinhkhang: [{ zh: 'Đinh Khang', en: 'ĐINH KHANG' }, '丁康'], thaymo: [{ zh: 'Thầy Mo Cun', en: 'SHAMAN MO CUN' }, '巫鈴'],
  duonghau: [{ zh: 'Dương Hoàng hậu', en: 'QUEEN DƯƠNG' }, '楊后'], nucanve: [{ zh: 'Nữ Cận Vệ', en: 'THE QUEEN\'S GUARD' }, '衛'],
};
const FRIEND = (kit, role, at, o = {}) => ({ kit, role, at, name: NAME[kit][0], seal: NAME[kit][1], ...o });

// Pacing (default difficulty): a human reading the dialogue lands at ≈ 11-14 min (outer ring 2 min · the rite: arrow,
// Hồng Diễm, the 50 s to the last bell 3.5 min · barricade and landing 1.5 min · the sluice's 35 s · the bridge duel
// 1.5 min · the stairs and the door 1.5 min · the Chief Eunuch 2.5 min). Officers come forward only after the hero has
// fought a while (kos / wait); limits keep each stage until its beat. Rank thresholds: CH.rank.
export const BEATS = [
  // ---- Vòng ngoài: dawn, the last candle; Hữu Tướng's shields; the hooves in the mountains (ch. 16 p1, p3)
  {
    when: { wait: 30 },
    set: 'candle49', morale: 0,
    banner: { html: 'Bình minh ngày thứ bốn mươi chín — <em>ngọn nến cuối</em> được thắp', en: 'Dawn of the forty-ninth day — the last candle is lit', dur: 220 },
    obj: { zh: 'Giữ vòng ngoài', en: 'Hold the outer ring', go: ['vongngoai', 0, 0.35] },
    actors: {
      duonghau: FRIEND('duonghau', 'npc', ['queen', 0, 0], { yaw: 0 }),
      thaymo: FRIEND('thaymo', 'npc', ['queen', 3, 1.2], { yaw: -0.4 }),
      nucanve: FRIEND('nucanve', 'ally', ['innerstair', 0, 0]),
    },
    actor: [{ key: 'duonghau', do: 'hold', at: ['queen', 0, 0] }, { key: 'thaymo', do: 'hold', at: ['queen', 3, 1.2] }, { key: 'nucanve', do: 'hold', at: ['innerstair', 0, 0] }],
    squads: [{ at: ['vongngoai', -0.5, 0.1], n: 18 }, { at: ['vongngoai', 0.5, 0.2], n: 18 }, { at: ['vongngoai', 0, 0.55], n: 16 }],
    limit: { z: ['santle', 0, -1.02], nag: NAG_OUT },
    say: [
      { who: 'thaymo', zh: 'Ngọn nến thứ bốn mươi chín đã cháy. Từ giờ tới tiếng chuông cuối, lễ không được ngừng.', en: 'The forty-ninth candle burns. From now to the last bell, the rite must not stop.' },
      { who: 'hero', annhien: ['Về kịp rồi. Kéo hết chúng về đây — càng xa đường linh cữu càng tốt.', 'We made it back. Draw them all here — the farther from the coffin\'s road, the better.'],
        nguyenphong: ['Vó ngựa dội cả vào vách núi... Chúng đông hơn ta tưởng.', 'Hooves echoing off the cliffs... more of them than I thought.'],
        tatuong: ['Con gái ta bảo phải về đây giữ lễ. Lần này, ta theo lệnh nó.', 'My daughter said we hold the rite here. This time, I follow her order.'],
        huutuong: ['Vòng ngoài là của ta. Khiên lên — không một con ngựa nào chạm tới vòng nến.', 'The outer ring is mine. Shields up — not one horse reaches the candles.'],
        dinhkhang: ['Con nước chưa đổi. Trước khi xuống cống đá, tôi giữ vòng ngoài với Hữu Tướng.', 'The tide hasn\'t turned. Until I go down to the sluice, I hold the outer ring with the Right General.'] },
      { who: 'ally', annhien: ['Tôi lên dốc trước. Cung thủ nào ló mặt, tôi hạ trước.', 'I\'ll take the slope. Any archer who shows his face goes down first.'],
        nguyenphong: ['Phong, đừng để chúng nhìn ra hướng linh cữu đi. Đánh cho thật ồn vào!', 'Phong, don\'t let them see which way the coffin went. Make all the noise you can!'],
        tatuong: ['Cha, vai cha còn băng. Đứng sau con một bước.', 'Father, your shoulder is still bound. Stay a step behind me.'] },
    ],
  },
  { hero: ['annhien', 'nguyenphong', 'tatuong', 'dinhkhang'], actors: { huutuong: FRIEND('huutuong', 'ally', ['shields', 0, 0]) }, actor: { key: 'huutuong', do: 'hold', at: ['shields', 0, 0] } },
  { hero: ['annhien'], actors: { nguyenphong: FRIEND('nguyenphong', 'ally', ['vongngoai', 0.12, -0.5]) } },
  { hero: ['nguyenphong', 'tatuong'], actors: { annhien: FRIEND('annhien', 'ally', ['vongngoai', 0.12, -0.5]) } },
  {
    when: [{ kos: 30 }, { wait: 20 * 60 }],
    waves: true,
    banner: { html: 'Tiếng vó ngựa dội vào núi — <em>kỵ binh truy sát</em> tràn xuống dốc!', en: 'Hooves echo off the mountains — the hunters\' riders pour down the slopes!', dur: 200 },
    officers: { kyW: { at: ['slopeW', 0, 0] }, kyE: { at: ['slopeE', 0, 0] } },
    squads: [{ at: ['slopeW', 6, -2], n: 16, charge: true }, { at: ['slopeE', -6, -2], n: 16, charge: true }, { at: ['vongngoai', -0.4, 0.6], n: 14 }, { at: ['vongngoai', 0.4, 0.6], n: 14 }],
    obj: { zh: 'Hạ kỵ tướng cánh tây', en: 'Bring down the west rider captain', go: 'kyW' },
    say: [
      { who: 'kytuong', zh: 'Đánh thẳng vào sân lễ! Bắt lấy lão thầy mo!', en: 'Straight at the rite! Take the old shaman!' },
      { who: 'huutuong', zh: 'Khiên chụm lại! Giữ thêm đúng một khắc nữa!', en: 'Close the shields! Hold one more quarter-hour!',
        huutuong: ['Không còn ai đợi ta trở về. Vậy thì ta đứng đây — giữ thêm đúng một khắc nữa.', 'No one is waiting for me to come home. So I stand here — one more quarter-hour.'] },
    ],
  },
  {
    when: { down: 'kyW' },
    obj: { zh: 'Hạ kỵ tướng cánh đông', en: 'Bring down the east rider captain', go: 'kyE' },
    squads: [{ at: ['slopeE', -10, 0], n: 14, charge: true }],
    say: [{ who: 'linh', zh: 'Cánh tây gãy rồi! Còn bọn trên dốc đông!', en: 'The west wing is broken! The east slope still holds!' }],
  },

  // ---- Sân tế: the arrow three steps from the Queen; keep the rite (ch. 16 p2)
  {
    when: { down: 'kyE' },
    set: 'arrow', heal: 0.2, morale: 0.08, retire: true, hush: true,
    banner: { html: 'Một mũi tên cắm xuống cách Hoàng hậu ba bước. <em>Bà không ngoảnh lại.</em>', en: 'An arrow strikes three steps from the Queen. She does not turn.', dur: 220 },
    defend: { key: 'rite', at: ['rite', 0, 0], r: 7, hp: 2200, name: { zh: 'Nghi lễ', en: 'The Rite' } },
    fail: { when: { hp: ['rite', 0.01] }, zh: 'Nghi lễ đứt giữa chừng — kẻ phản bội đã biết linh cữu thật rời đi.', en: 'The rite is broken — the traitor knows the true coffin has gone.' },
    obj: { zh: 'Giữ nghi lễ — đừng để quân địch lọt vào vòng nến', en: 'Keep the rite — let no foe into the candle ring', go: ['rite', 0, -7] },
    limit: { z: ['innerstair', 0, 4], nag: NAG_RITE },
    officers: { phale: { at: ['santle', 0.75, 0.35], engaged: true } },
    squads: [{ at: ['santle', -0.8, -0.2], n: 16, charge: true }, { at: ['santle', 0.8, -0.1], n: 16, charge: true }, { at: ['santle', -0.7, 0.6], n: 14, charge: true }],
    say: [
      { who: 'duonghau', zh: 'Đừng ai dừng tay vì ta. Lễ mà dừng, hắn sẽ biết linh cữu thật đã rời nơi này.', en: 'Let no one stop for me. If the rite stops, he will know the true coffin has left this place.' },
      { who: 'thaymo', zh: 'Chuông còn rung thì đường còn kín.', en: 'While the bells ring, the road stays hidden.' },
      { who: 'hero', annhien: ['Không mũi tên nào được rơi gần hơn thế nữa!', 'No arrow falls any closer than that!'],
        nguyenphong: ['Cung thủ trên vách đá phía tây! Để tôi.', 'Archers on the west cliff! Leave them to me.'],
        tatuong: ['Hoàng hậu không ngoảnh lại... thì ta cũng không được lùi.', 'The Queen does not turn... so neither may I step back.'],
        huutuong: ['Vòng ngoài thủng một chỗ. Lui về giữ vòng nến!', 'The outer ring has a gap. Fall back to the candles!'],
        dinhkhang: ['Bà ấy không quay đầu lấy một lần. Ta phải đứng vững hơn thế!', 'She hasn\'t turned her head even once. We must stand firmer than that!'] },
    ],
  },

  // ---- the inner ring: Hồng Diễm through three ranks, stopped by Nữ Cận Vệ (ch. 16 p4) — not a word between them
  {
    when: [{ kos: 40 }, { wait: 30 * 60 }],
    banner: { html: 'Hồng Diễm vượt qua ba lớp lính — và dừng trước <em>Nữ Cận Vệ</em>', en: 'Hồng Diễm breaks through three ranks — and stops before the Queen\'s Guard', dur: 220 },
    actors: { hongdiem: { kit: 'hongdiem', role: 'boss', at: ['innerstair', 0, 9], hp: 2000, retreatAt: 0.55, name: { zh: 'Mã Hồng Diễm', en: 'MÃ HỒNG DIỄM' }, seal: '紅艷',
      intro: { zh: 'Mã Hồng Diễm · nữ sát thủ áo đỏ', en: 'Mã Hồng Diễm, the assassin in crimson' } } },
    squads: [{ at: ['innerstair', -12, 12], n: 10, charge: true }, { at: ['innerstair', 12, 12], n: 10, charge: true }],
    obj: { zh: 'Cùng Nữ Cận Vệ đánh lui Hồng Diễm', en: 'Drive Hồng Diễm back with the Queen\'s Guard', go: 'hongdiem' },
    say: [
      { who: 'hero', annhien: ['Hồng Diễm! Bậc thềm này, ngươi không bước thêm được đâu.', 'Hồng Diễm! Not one more step up these stairs.'],
        nguyenphong: ['Ả vượt qua ba lớp lính mà không một tiếng động...', 'Through three ranks, without a sound...'],
        tatuong: ['Nữ Cận Vệ chặn được ả rồi. Ta đánh bên sườn!', 'The Queen\'s Guard has her. I take the flank!'],
        huutuong: ['Hai người ấy không nói một lời. Lọt qua một bước là đổi cả số phận triều đình.', 'Not a word between those two. One step past, and the court\'s fate changes.'],
        dinhkhang: ['Áo đỏ, tóc buộc cao... Hồng Diễm. Đỡ lấy Nữ Cận Vệ!', 'Crimson armour, high ponytail... Hồng Diễm. Back up the Queen\'s Guard!'] },
    ],
  },
  {
    when: { down: 'hongdiem' },
    heal: 0.25, morale: 0.1,
    banner: { html: 'Hồng Diễm lùi khỏi bậc thềm. <em>Nữ Cận Vệ</em> không đuổi theo.', en: 'Hồng Diễm falls back from the steps. The Queen\'s Guard does not give chase.', dur: 190 },
    obj: { zh: 'Giữ nghi lễ tới tiếng chuông cuối', en: 'Keep the rite until the last bell', go: ['rite', 0, -7], timer: 50 },
    squads: [{ at: ['slopeW', 10, 0], n: 12, charge: true }, { at: ['slopeE', -10, 0], n: 12, charge: true }, { at: ['innerstair', 0, 14], n: 12, charge: true }],
    say: [
      { who: 'hongdiem', zh: 'Chưa xong đâu.', en: 'This isn\'t over.' },
      { who: 'nucanve', zh: 'Ai về chỗ nấy. Hoàng hậu chưa đứng dậy, ta chưa rời bậc thềm này.', en: 'Back to your posts. Until the Queen rises, I do not leave these steps.' },
    ],
  },
  // An Nhiên and Nguyên Phong ride back with the Left General — the first time under his daughter's order (ch. 16 p5)
  {
    hero: ['huutuong', 'dinhkhang'],
    banner: { html: 'An Nhiên và Nguyên Phong quay về — <em>Tả Tướng</em> theo sau', en: 'An Nhiên and Nguyên Phong ride back — the Left General with them', dur: 200 },
    actors: { tatuong: FRIEND('tatuong', 'ally', ['rite', -6, -15]), annhien: FRIEND('annhien', 'ally', ['rite', 6, -15]) },
    say: [
      { who: 'annhien', zh: 'Chúng tôi về để kéo quân địch khỏi đường linh cữu, không phải để bỏ tuyến!', en: 'We came back to draw the enemy off the coffin\'s road — not to abandon ours!' },
      { who: 'nguyenphong', zh: 'Dây máy bắn trên dốc — đứt rồi!', en: 'The ropes of the siege engine on the slope — cut!' },
      { who: 'tatuong', zh: 'Lần đầu tiên, ta theo lệnh con gái mình. Không chút ngần ngại.', en: 'For the first time, I follow my daughter\'s order. Without a moment\'s doubt.' },
    ],
  },
  {
    hero: ['annhien', 'nguyenphong'],
    banner: { html: '<em>Tả Tướng</em> dẫn hậu quân tới — vai còn băng', en: 'The Left General brings up the rearguard, his shoulder still bound', dur: 200 },
    actors: { tatuong: FRIEND('tatuong', 'ally', ['rite', -6, -15]) },
    say: [
      { who: 'tatuong', zh: 'An Nhiên, con bảo đánh đâu, cha đánh đó.', en: 'An Nhiên — where you say strike, I strike.' },
      { who: 'hero', annhien: ['Cha... Vậy cha giữ phía tây cho con.', 'Father... then hold the west for me.'],
        nguyenphong: ['Dây máy bắn trên dốc — một mũi tên là đủ. Ông ấy theo lệnh An Nhiên thật rồi.', 'The siege engine\'s ropes up the slope — one arrow will do. He really does follow An Nhiên now.'] },
    ],
  },
  {
    hero: ['tatuong'],
    banner: { html: '<em>Nguyên Phong</em> bắn đứt dây máy bắn trên dốc!', en: 'Nguyên Phong cuts the ropes of the siege engine on the slope!', dur: 200 },
    say: [
      { who: 'nguyenphong', zh: 'Máy bắn câm rồi! Tả Tướng, sân lễ vẫn là của ta!', en: 'The siege engine is silent! Left General, the rite ground is still ours!' },
      { who: 'hero', tatuong: ['Con gái ta nói đúng: về đây là kéo chúng khỏi đường linh cữu.', 'My daughter was right: coming back here draws them off the coffin\'s road.'] },
    ],
  },
  // the last bell: seven beacons answer on the peaks; the attack has unknowingly covered the hour (ch. 16 p6)
  {
    when: { timer: true },
    set: 'beacons', defend: null, fail: null, waves: false, retire: true, hush: true, heal: 0.35, morale: 0.2,
    banner: { html: 'Tiếng chuông cuối — <em>bảy ngọn lửa</em> đáp lời trên bảy đỉnh núi', en: 'The last bell — seven fires answer on seven peaks', dur: 260, big: true },
    officers: { giuluy: { at: ['barricade', 0, -5] } },
    squads: [{ at: ['barricade', -12, -6], n: 16 }, { at: ['barricade', 12, -6], n: 16 }],
    obj: { zh: 'Phá lũy chắn đường ra bến sông', en: 'Break the barricade on the river road', go: 'giuluy' },
    limit: { z: ['barricade', 0, -2.5], nag: NAG_LUY },
    say: [
      { who: 'thaymo', zh: 'Bảy đường đã tới chỗ của mình. Chúng đánh vào lễ — mà chẳng hay đã che đúng giờ hợp tuyến.', en: 'The seven roads are in place. They struck at the rite — never knowing they covered the very hour the roads joined.' },
      { who: 'duonghau', zh: 'Lễ đã trọn. Đi đi — đừng ai quay lại vì ta.', en: 'The rite is done. Go — and let no one turn back for me.' },
      { who: 'hero', annhien: ['Bảy ngọn lửa... Những đoàn còn lại đều đã tới nơi.', 'Seven fires... every party still standing has arrived.'],
        nguyenphong: ['Cò trắng bay xuyên qua dãy lửa... Đi thôi.', 'Storks flying through the line of fires... Time to go.'],
        tatuong: ['Hữu Tướng đã giữ được vòng ngoài. Giờ thì xuống bến!', 'The Right General held the outer ring. Now, down to the river!'],
        huutuong: ['Đủ một khắc. Giờ mở đường ra bến cho Đinh Khang.', 'The quarter-hour is held. Now clear the way to the river for Đinh Khang.'],
        dinhkhang: ['Con nước đang đổi. Tôi phải xuống cống đá ngay!', 'The tide is turning. I have to get down to the sluice now!'] },
    ],
  },
  {
    when: { down: 'giuluy' },
    gate: 'raoban', heal: 0.2, morale: 0.1, waves: true,
    banner: { html: '<em>Lũy chắn phản thần</em> đã vỡ!', en: 'The traitor\'s barricade is down!', dur: 170 },
    obj: { zh: 'Xuống bến sông', en: 'Down to the river landing', go: ['sluice', -10, -14] },
    limit: { z: ['bridge', 0, -16], nag: NAG_BANK },
    say: [{ who: 'phanbinh', zh: 'Lũy vỡ rồi! Lui về giữ bến!', en: 'The barricade\'s down! Fall back to the landing!' }],
  },

  // ---- Bến sông: Đinh Khang opens the stone sluice on the turning tide (ch. 17 p2)
  {
    when: { at: ['barricade', 0, 10] },
    officers: { tuongben: { at: ['sluice', -12, -4] } },
    squads: [{ at: ['bensong', -0.5, 0.1], n: 18 }, { at: ['bensong', 0.4, -0.1], n: 16 }, { at: ['sluice', -6, 2], n: 14 }],
    obj: { zh: 'Hạ tướng giữ bến', en: 'Bring down the landing captain', go: 'tuongben' },
    say: [{ who: 'phanbinh', zh: 'Giữ lấy cầu đá! Không đứa nào được qua sông!', en: 'Hold the stone bridge! No one crosses the river!' }],
  },
  {
    hero: ['annhien', 'nguyenphong', 'tatuong', 'huutuong'],
    actors: { dinhkhang: FRIEND('dinhkhang', 'ally', ['sluice', 0, 0]) }, actor: { key: 'dinhkhang', do: 'hold', at: ['sluice', 0, 0] },
    say: [{ who: 'dinhkhang', zh: 'Cho tôi ba mươi hơi thở dưới nước. Giữ bến giúp tôi!', en: 'Give me thirty breaths under the water. Hold the landing for me!' }],
  },
  { hero: ['dinhkhang'], say: [{ who: 'hero', dinhkhang: ['Cống đá ở kia. Dẹp bọn giữ bến trước đã!', 'There\'s the sluice. Clear the landing guards first!'] }] },
  {
    when: { down: 'tuongben' },
    heal: 0.2,
    defend: { key: 'sluice', at: ['sluice', 0, 0], r: 8, hp: 800, name: { zh: 'Cống đá', en: 'The Stone Sluice' } },
    fail: { when: { hp: ['sluice', 0.01] }, zh: 'Bến sông thất thủ — cống đá không mở kịp con nước.', en: 'The landing is lost — the sluice missed the tide.' },
    obj: { zh: 'Giữ bến sông tới khi con nước đổi', en: 'Hold the landing until the tide turns', go: ['sluice', 0, -3], timer: 35 },
    squads: [{ at: ['sluice', -18, -10], n: 16, charge: true }, { at: ['sluice', 6, -16], n: 14, charge: true }, { at: ['bensong', -0.6, -0.4], n: 14, charge: true }],
    say: [
      { who: 'danchai', zh: 'Giữ chặt dây! Nước sắp đổi chiều!', en: 'Hold the ropes fast! The water\'s about to turn!' },
      { who: 'dinhkhang', zh: 'Cống này chỉ mở được đúng lúc triều đổi. Sớm hay muộn một hơi là hỏng cả.', en: 'This sluice opens only as the tide turns. A breath early or late, and all is lost.' },
    ],
  },
  {
    when: { timer: true },
    set: 'sluice', defend: null, fail: null, waves: false, retire: true, hush: true, heal: 0.3, morale: 0.15,
    banner: { html: 'Cống đá mở đúng lúc triều đổi — nước rút, <em>cửa hang</em> hiện ra', en: 'The sluice opens on the turning tide — the water drops and a cave mouth shows', dur: 240, big: true },
    obj: { zh: 'Lên cầu đá', en: 'Onto the stone bridge', go: ['bridge', 0, -12] },
    limit: { z: ['bridge', 0, -2], nag: NAG_BRIDGE },
    say: [
      { who: 'dinhkhang', zh: 'Cửa hang chỉ hiện trong vài hơi thở. Bè quan — đi đi!', en: 'The cave mouth shows for only a few breaths. The raft — go!' },
      { who: 'danchai', zh: 'Bè đã qua cửa đá... chìm vào bóng tối rồi. Không để lại một dấu nào.', en: 'The raft is through the stone gate... into the dark. Not a trace left behind.' },
    ],
  },

  // ---- Cầu đá: Tả Tướng holds the bridge where he was once taken; Mặt Sẹo falls to his line (ch. 17 p3)
  {
    when: { at: ['bridge', 0, -16] },
    waves: true,
    banner: { html: 'Trên cây cầu đá cũ — <em>Mặt Sẹo</em> chặn đường', en: 'On the old stone bridge — Mặt Sẹo bars the way', dur: 190 },
    actors: { matseo: { kit: 'matseo', role: 'boss', at: ['bridge', 0, 5], hp: 2600, name: { zh: 'Mặt Sẹo', en: 'MẶT SẸO' }, seal: '疤面',
      intro: { zh: 'Mặt Sẹo · kẻ từng bắt Tả Tướng trên cầu này', en: 'Mặt Sẹo, who once took the Left General on this bridge' } } },
    actor: { key: 'tatuong', do: 'hold', at: ['bridge', -2, -5] },
    squads: [{ at: ['bridge', -14, 12], n: 14, charge: true }, { at: ['bridge', 14, 12], n: 14, charge: true }],
    obj: { zh: 'Hạ Mặt Sẹo trên cầu đá', en: 'Defeat Mặt Sẹo on the stone bridge', go: 'matseo' },
    limit: { z: ['bridge', 0, 12], nag: NAG_BRIDGE },
    say: [
      { who: 'matseo', zh: 'Lại cây cầu này, lão tướng. Lần trước ngươi quỳ ngay chỗ này.', en: 'This bridge again, old general. Last time you knelt right here.' },
      { who: 'tatuong', zh: 'Lần này ta đứng.', en: 'This time I stand.' },
      { who: 'hero', annhien: ['Cha, lần này con đứng cạnh cha.', 'Father, this time I stand beside you.'],
        nguyenphong: ['Cây cầu nơi ông ấy bị bắt... Ông ấy chọn đứng lại đúng chỗ này.', 'The bridge where he was taken... he chose to make his stand right here.'],
        huutuong: ['Tả Tướng, cầu là của ông. Ta giữ hai đầu!', 'Left General, the bridge is yours. I\'ll hold both ends!'],
        dinhkhang: ['Rơi xuống sông là vào đất của tôi. Mặt Sẹo, ngươi không qua được đâu.', 'Fall in the river and you\'re on my ground. Mặt Sẹo, you won\'t get across.'] },
    ],
  },
  {
    when: { below: ['matseo', 0.5] },
    skip: { down: 'matseo' },
    squads: [{ at: ['bridge', 0, 16], n: 14, charge: true }, { at: ['bridge', -12, -14], n: 12, charge: true }],
    say: [
      { who: 'matseo', zh: 'Lão già vẫn còn sức đấy!', en: 'The old man still has some strength!' },
      { who: 'tatuong', zh: 'Ta già, nhưng hàng thương này chưa già.', en: 'I am old. This line of spears is not.' },
    ],
  },
  {
    when: { down: 'matseo' },
    heal: 0.3, morale: 0.15, waves: false, retire: true, hush: true,
    banner: { html: 'Mặt Sẹo ngã xuống trên cầu đá — trước <em>hàng thương của Tả Tướng</em>', en: 'Mặt Sẹo falls on the stone bridge — before the Left General\'s line', dur: 210 },
    obj: { zh: 'Lên bậc đá ướt', en: 'Up the wet stone stairs', go: ['door', 0, -11] },
    limit: { z: ['door', 0, -6], nag: NAG_STAIR },
    say: [
      { who: 'tatuong', zh: 'Đi tiếp đi. Cầu này để ta giữ.', en: 'Go on. I\'ll hold this bridge.',
        annhien: ['Đi đi, An Nhiên. Cha không bảo con lùi lại nữa. Cầu này để cha.', 'Go, An Nhiên. I won\'t order you back again. Leave the bridge to me.'],
        tatuong: ['An Nhiên, con đi trước. Cha không bảo con lùi lại nữa.', 'An Nhiên, you go first. I won\'t order you back again.'] },
      { who: 'hero', annhien: ['...Vâng, thưa cha.', '...Yes, Father.'] },
    ],
  },
  // as the Left General, he opens the gap and lets her go on alone; he follows once the bridge is clear
  { hero: ['tatuong'], actor: { key: 'annhien', do: 'retreat', at: ['door', 0, -4] } },

  // ---- Bậc đá ướt → Cửa đá: Hồng Diễm, offered a way out, refuses; the door closes between them (ch. 17 p4)
  {
    when: { at: ['door', 0, -14] },
    banner: { html: 'Trên bậc đá ướt, <em>Hồng Diễm</em> đuổi kịp từ phía sau', en: 'On the wet stone stairs, Hồng Diễm catches up from behind', dur: 190 },
    actors: { hongdiem2: { kit: 'hongdiem', role: 'boss', at: ['door', 0, -26], hp: 1500, name: { zh: 'Mã Hồng Diễm', en: 'MÃ HỒNG DIỄM' }, seal: '紅艷',
      intro: { zh: 'Mã Hồng Diễm · lần cuối', en: 'Mã Hồng Diễm, one last time' } } },
    obj: { zh: 'Chặn Hồng Diễm trên bậc đá', en: 'Stop Hồng Diễm on the stairs', go: 'hongdiem2' },
    limit: { z: ['door', 0, -3], nag: NAG_DOOR },
    squads: [{ at: ['door', 0, -34], n: 10, charge: true }],
    say: [
      { who: 'hongdiem', zh: 'An Nhiên. Cánh cửa kia không cứu được ngươi đâu.', en: 'An Nhiên. That door won\'t save you.' },
      { who: 'annhien', zh: 'Ta không cần nó cứu. Ta chỉ cần ngươi dừng lại.', en: 'I don\'t need it to save me. I need you to stop.' },
    ],
  },
  { hero: ['tatuong'], actors: { annhien: FRIEND('annhien', 'ally', ['door', 0, -7]) } },
  {
    when: { below: ['hongdiem2', 0.3] },
    actor: { key: 'hongdiem2', do: 'hold', at: ['door', 0, -24] },
    obj: { zh: 'Qua cửa đá', en: 'Through the stone door', go: ['door', 0, 8] },
    limit: { z: ['dientim', 0, -0.4] },
    say: [
      { who: 'annhien', zh: 'Đi đi. Lòng trung đặt sai chỗ cũng chỉ là xiềng xích. Ta mở cho ngươi một lối lui.', en: 'Go. Loyalty in the wrong place is only a chain. I\'m giving you a way back.' },
      { who: 'hongdiem', zh: 'Ngoài sợi xích ấy, ta chẳng còn gì để giữ.', en: 'Beyond that chain, I have nothing left to hold.' },
      { who: 'nguyenphong', zh: 'An Nhiên, cửa đá! Đi!', en: 'An Nhiên, the stone door! Go!' },
    ],
  },
  {
    when: { at: ['door', 0, 5] },
    set: 'door', heal: 0.3, retire: true, hush: true, waves: false,
    actor: { key: 'hongdiem2', do: 'retreat', at: ['door', 0, -44] },
    banner: { html: 'Cửa đá khép lại <em>giữa hai người</em>', en: 'The stone door closes between them', dur: 220, big: true },
    obj: { zh: 'Tiến vào điện tím', en: 'Into the violet hall', go: ['dientim', 0, -0.5] },
    limit: { z: ['dientim', 0, -0.3], back: ['door', 0, 2] },
    say: [{ who: 'annhien', zh: 'Ta đã cho ngươi một lối đi, Hồng Diễm...', en: 'I gave you a way out, Hồng Diễm...' }],
  },

  // ---- Điện tím: the dead man steps out alive, the ring on his hand (ch. 15 p3-4); the hollow tube (ch. 17 p5)
  {
    when: { at: ['dientim', 0, -0.7] },
    waves: true,
    banner: { html: 'Kẻ chết bước ra ánh sáng — <em>Hoạn Quan Tổng Quản</em>', en: 'The dead man steps into the light — the Chief Eunuch', dur: 240, big: true },
    actors: { hoanquan: { kit: 'hoanquan', role: 'boss', at: ['dientim', 0, 0.25], hp: 4400, poise: 520, retreatAt: 0.05, name: { zh: 'Hoạn Quan Tổng Quản', en: 'THE CHIEF EUNUCH' }, seal: '宦官',
      intro: { zh: 'Kẻ chết vẫn sống · chiếc nhẫn ngọc lục', en: 'The dead man who lives — the green ring' } } },
    squads: [{ at: ['dientim', -0.65, 0.2], n: 14 }, { at: ['dientim', 0.65, 0.2], n: 14 }],
    obj: { zh: 'Đánh bại Hoạn Quan Tổng Quản', en: 'Defeat the Chief Eunuch', go: 'hoanquan' },
    limit: { z: null, back: ['door', 0, 2] },
    say: [
      { who: 'hoanquan', zh: 'Ngạc nhiên sao? Một chiếc áo nhồi đá, mấy móng ngựa đóng ngược — cả triều đình đã khóc ta.', en: 'Surprised? A robe stuffed with stones, a few horseshoes nailed on backward — and the whole court wept for me.' },
      { who: 'hero', annhien: ['Chiếc nhẫn ngọc lục... Ấn trên mật lệnh là của ngươi.', 'The green ring... the seal on that order was yours.'],
        nguyenphong: ['Áo tím nguyên vẹn, không một vết xước. Kẻ chết dưới vực trông khỏe quá.', 'A violet robe without a scratch. For a man dead at the bottom of a gorge, you look well.'],
        tatuong: ['Trong hang tối, ta đã gọi tên ngươi. Giờ thì ta được nhìn mặt.', 'In the dark cave I spoke your name. Now I see your face.'],
        huutuong: ['Ngươi từng thề cùng chúng ta trước chín mươi chín ngọn nến.', 'You swore with us before ninety-nine candles.'],
        dinhkhang: ['Đổi nơi vua nằm lấy tương lai cho mình... Ngươi bán cả sông núi này.', 'Trading where the king lies for your own future... you would sell these very rivers and mountains.'] },
      { who: 'hoanquan', zh: 'Kẻ nắm bí mật phải nắm quyền. Ta không quỳ trước một đứa trẻ trên ngai — phương Bắc trả giá rất hậu.', en: 'Whoever holds the secret should hold power. I will not kneel to a child on a throne — and the North pays handsomely.' },
    ],
  },
  {
    when: { below: ['hoanquan', 0.5] },
    skip: { down: 'hoanquan' },
    morale: -0.05,
    banner: { html: 'Lửa tím bùng lên — <em>thân binh nội cung</em> xông ra!', en: 'The violet flames flare — the palace bodyguards rush in!', dur: 190 },
    officers: { thanbinh1: { at: ['dientim', -0.5, 0.5], engaged: true, like: 'thanbinh' }, thanbinh2: { at: ['dientim', 0.5, 0.5], engaged: true, like: 'thanbinh' } },
    squads: [{ at: ['dientim', -0.7, -0.2], n: 14, charge: true }, { at: ['dientim', 0.7, -0.2], n: 14, charge: true }],
    say: [
      { who: 'hoanquan', zh: 'Bảy mảnh bản đồ đã ở trong tay ta. Chỉ còn ghép lại.', en: 'All seven pieces of the map are in my hand. They only need joining.' },
      { who: 'nguyenphong', zh: 'Ông có mọi mảnh giấy — trừ khoảng trắng của Quan Văn. Thứ ông khinh là phần duy nhất mở đường.', en: 'You have every scrap of paper — except Quan Văn\'s blank spaces. The part you scorned is the only part that opens the way.' },
      { who: 'hoanquan', zh: 'Một cái ống tre rỗng?...', en: 'An empty bamboo tube?...' },
    ],
  },
  // he breaks off into his own false corridors; the trail burns, Thầy Mo closes the stone works (ch. 17 p6)
  {
    when: { down: 'hoanquan' },
    set: 'seal', waves: false, retire: true, hush: true, heal: 0.3, morale: 0.2,
    banner: { html: 'Thầy Mo đóng cơ quan đá — kẻ phản bội bị bỏ lại <em>giữa những ngả đường giả của chính hắn</em>', en: 'Thầy Mo closes the stone works — the traitor is left among the false roads he made himself', dur: 300, big: true },
    actors: { thaymo: FRIEND('thaymo', 'npc', ['hall', -6, -14]) },
    actor: { key: 'thaymo', do: 'hold', at: ['hall', -6, -14] },
    say: [
      { who: 'nguyenphong', zh: 'Sợi chỉ cuối cùng — cháy rồi. Từ đây không còn dấu nào dẫn về.', en: 'The last thread — burned. From here, no trace leads back.' },
      { who: 'thaymo', zh: 'Núi khép lại. Ngả nào hắn dựng, ngả ấy giữ hắn.', en: 'The mountain closes. Every false road he built now holds him.' },
      { who: 'hoanquan', zh: 'Tiếng gì... dưới nước... xa dần...', en: 'That sound... on the water... fading...' },
    ],
  },
  {
    when: { wait: 9 * 60 },
    win: true, morale: 1,
    banner: { html: '<em>Bảy đường hội một</em>', en: 'Seven roads become one', dur: 300, big: true },
    say: [{ who: 'hero', annhien: ['Xong rồi, Phong. Về điểm hẹn thôi.', 'It\'s done, Phong. Back to the meeting place.'],
      nguyenphong: ['Gió đổi rồi. Về thôi, An Nhiên.', 'The wind has turned. Let\'s go home, An Nhiên.'],
      tatuong: ['Con gái ta đã đi hết con đường của nó.', 'My daughter has walked her road to its end.'],
      huutuong: ['Một khắc, rồi thêm một khắc nữa. Thế là đủ.', 'One quarter-hour, and then another. It is enough.'],
      dinhkhang: ['Nước đã khép lại. Sông không kể chuyện cho ai.', 'The water has closed. The river tells no one.'] }],
  },
];

// ---- prologue ink map (viewBox 1600×900, north up; a sketch, not a survey): the karsts of Hoa Lư, the rite ground below
// them in its ring of seven peaks, the gorge of the false death and the traitor's camp to the north-west, and the seven
// roads — cinnabar threads leaving Hoa Lư in seven directions and bending back to vanish into one bank of mist (no
// destination is drawn or named)
const peaks = (list, h, w) => list.map(([x, y, k = 1]) =>
  `<path d="M${x - w * k} ${y} Q${x - w * k * 0.35} ${y - h * k * 0.55} ${x} ${y - h * k} Q${x + w * k * 0.3} ${y - h * k * 0.5} ${x + w * k} ${y}Z"/>`).join('');
const ROADS = ['M560 322 C520 160 800 80 980 180 S1140 420 1150 528', 'M572 318 C700 200 900 230 1020 330 S1120 470 1140 534',
  'M578 340 C760 330 900 400 1000 450 S1100 520 1136 545', 'M570 358 C680 520 860 640 980 640 S1110 590 1140 556',
  'M552 362 C520 600 760 800 960 760 S1120 640 1150 562', 'M544 340 C380 360 300 560 520 720 S1000 820 1160 566',
  'M550 322 C420 160 600 40 860 60 S1240 300 1160 530'];
const RITE = [660, 520], RING = Array.from({ length: 7 }, (_, i) => { const a = -2.6 + i * 0.86; return [RITE[0] + Math.cos(a) * 118, RITE[1] + 26 + Math.sin(a) * 92]; });
export const PL_MAP = {
  art: `<g class="pl-mtns" fill="url(#pl-mtn)" filter="url(#pl-ink)">
    ${peaks([[90, 150, 0.9], [260, 120, 1.0], [420, 140, 0.8], [1320, 110, 0.9], [1470, 160, 1.0], [140, 820, 1.1], [340, 870, 0.9], [1480, 840, 1.0]], 110, 80)}
  </g>
  <g class="pl-mark" data-id="hoalu-karst" fill="url(#pl-mtn)" filter="url(#pl-ink)">${peaks([[500, 340, 0.5], [530, 320, 0.7], [566, 330, 0.55], [600, 344, 0.45], [470, 352, 0.4], [630, 356, 0.35]], 130, 40)}</g>
  <g class="pl-mark" data-id="peaks" fill="url(#pl-mtn)" filter="url(#pl-ink)">${peaks(RING.map(([x, y]) => [x, y, 0.42]), 140, 40)}</g>
  <g class="pl-mark" data-id="fires">${RING.map(([x, y]) => `<path d="M${x - 9} ${y - 58} Q${x} ${y - 92} ${x + 9} ${y - 58}Z" fill="#c8401c" opacity=".9"/><circle cx="${x}" cy="${y - 64}" r="20" fill="#e0782a" opacity=".22"/>`).join('')}</g>
  <g class="pl-mark" data-id="river" filter="url(#pl-ink)" fill="none" stroke-linecap="round">
    <path d="M-20 430 C160 470 300 420 420 440 S600 600 780 600 S1000 700 1200 690 S1460 760 1620 740" stroke="#6f7c78" stroke-width="22" opacity=".3"/>
    <path d="M-20 430 C160 470 300 420 420 440 S600 600 780 600 S1000 700 1200 690 S1460 760 1620 740" stroke="#46524f" stroke-width="5" opacity=".65"/></g>
  <g class="pl-mark" data-id="candles"><circle cx="${RITE[0]}" cy="${RITE[1]}" r="34" fill="none" stroke="#a8281c" stroke-width="5" stroke-dasharray="3 7"/>
    <circle cx="${RITE[0]}" cy="${RITE[1]}" r="9" fill="#24160b"/></g>
  <g class="pl-mark" data-id="gorge" filter="url(#pl-ink)"><path d="M300 290 C320 260 340 250 352 220 M318 300 C340 268 362 256 372 226" fill="none" stroke="#24160b" stroke-width="7" stroke-linecap="round"/></g>
  <g class="pl-mark" data-id="roads" filter="url(#pl-ink)" fill="none" stroke="#a8281c" stroke-width="4" stroke-dasharray="16 9" stroke-linecap="round" opacity=".85">
    ${ROADS.map((d) => `<path d="${d}"/>`).join('')}</g>
  <g class="pl-mark" data-id="mist" filter="url(#pl-blot)" fill="#e2cfa6">
    <ellipse cx="1160" cy="548" rx="170" ry="96" opacity=".96"/><ellipse cx="1210" cy="520" rx="120" ry="70" opacity=".9"/><ellipse cx="1110" cy="580" rx="110" ry="60" opacity=".9"/></g>
  <g class="pl-labels">
    <g class="pl-mark" data-id="hoalu"><rect x="508" y="350" width="30" height="30" rx="3"/><text x="550" y="384">Hoa Lư</text></g>
    <g class="pl-mark" data-id="rite"><text class="sm" x="${RITE[0] + 48}" y="${RITE[1] + 12}">Sân tế ngày bốn mươi chín</text></g>
    <g class="pl-mark wei" data-id="hq"><rect x="190" y="176" width="28" height="28" rx="3"/><text x="230" y="210">Hoạn Quan</text><text class="sm" x="234" y="248">kẻ chết vẫn sống</text></g>
    <g class="pl-mark" data-id="gorge"><text class="sm" x="384" y="300">Khe núi · chiếc áo tím</text></g>
    <g class="pl-mark" data-id="roads"><text class="sm" x="880" y="90">Bảy đường</text></g>
    <g class="pl-mark" data-id="peaks"><text class="sm" x="${RITE[0] + 130}" y="${RITE[1] + 120}">Bảy đỉnh núi</text></g>
  </g>`,
  arrows: [
    ['a-hoan', 'wei', 'M232 214 C360 300 480 420 620 500'],
    ['a-hunt', 'wei', 'M240 640 C380 600 500 560 616 536'],
    ['a-ride', 'shu', 'M420 820 C500 720 580 640 646 562'],
  ],
};

// ---- prologue cards (cols Hán, vi Vietnamese prose, en English): comic ch. 15 — the dead man's finger. Card 7 branches.
export const PROLOGUE = [
  { cols: ['亡者之印', '死後二日', '密令猶存'], vi: 'Một mật lệnh chặn đường mang ấn chiếc nhẫn có vết xước hình móc. Nó được đóng hai ngày sau khi Hoạn Quan Tổng Quản được báo đã chết dưới vực.',
    en: 'An order to block the roads bore the seal of a ring with a hook-shaped scratch. It was stamped two days after the Chief Eunuch was reported dead at the bottom of a gorge.',
    show: ['hq'], focus: [300, 240, 1.32] },
  { cols: ['紫袍填石', '馬蹄倒釘', '假死之門'], vi: 'Nguyên Phong ghép lại dấu vết: áo tím nhồi đá dưới khe, xe bị đẩy lật sau, móng ngựa đóng ngược. Cái chết đầu tiên chỉ là cánh cửa cho phản bội từ bên trong.',
    en: 'Nguyên Phong pieced the signs together: a violet robe stuffed with stones in the ravine, a cart pushed over afterward, horseshoes nailed on backward. The first death was only a door for treason from within.',
    show: ['gorge'], focus: [360, 270, 1.4] },
  { cols: ['亡者復出', '綠玉指環', '笑不復掩'], vi: 'Kẻ chết bước ra trước đoàn quân truy sát — sống, không một vết thương. Chiếc nhẫn ngọc lục trên tay hắn xác nhận mọi ngờ vực.',
    en: 'The dead man stepped out before the hunters\' host — alive, without a wound. The green ring on his hand confirmed every suspicion.',
    show: ['a-hunt'], focus: [340, 360, 1.2] },
  { cols: ['握秘者', '當握權', '以陵易命'], vi: 'Hắn tin kẻ nắm bí mật phải nắm quyền, chứ không phụng sự một đứa trẻ trên ngai. Đem nơi vua nằm đổi với ngoại lực phương Bắc, hắn sẽ mua được tương lai cho mình.',
    en: 'He believed whoever holds the secret should hold power — not serve a child on a throne. Trade the king\'s resting place to the power in the North, and he would buy himself a future.',
    show: [], focus: [420, 330, 1.12] },
  { cols: ['不尋七路', '七七之日', '直擊祭場'], vi: 'Hắn không cần tìm đủ bảy đường. Hắn sẽ đánh thẳng vào lễ ngày thứ bốn mươi chín, buộc mọi hộ linh phải quay về cứu Hoàng hậu.',
    en: 'He did not need to find all seven roads. He would strike the rite on the forty-ninth day itself, and force every guardian to come back to save the Queen.',
    show: ['a-hoan', 'rite', 'candles'], focus: [520, 420, 1.15] },
  { cols: ['楊后跪祭', '巫鈴不息', '祭不可止'], vi: 'Dưới núi Hoa Lư, Dương hậu quỳ trước linh vị không tên, Thầy Mo giữ chuông. Lễ không được dừng — dừng, là kẻ phản bội biết linh cữu thật đã rời đi.',
    en: 'Below the mountains of Hoa Lư, Queen Dương kneels before a nameless tablet while Thầy Mo keeps the bells. The rite must not stop — if it stops, the traitor will know the true coffin has gone.',
    show: ['hoalu', 'hoalu-karst', 'river'], focus: [620, 450, 1.32] },
  { annhien: { cols: ['安然回馬', '引敵離路', '父從女令'], vi: 'An Nhiên quay ngựa trở về cùng Nguyên Phong — không phải để bỏ tuyến, mà để kéo quân địch khỏi đường của linh cữu. Tả Tướng đi cùng, lần đầu theo lệnh con.',
      en: 'An Nhiên turns her horse back with Nguyên Phong — not to abandon her road, but to draw the enemy off the coffin\'s. The Left General rides with her, for the first time under his daughter\'s order.' },
    nguyenphong: { cols: ['元風隨歸', '懷空竹筒', '白處開路'], vi: 'Nguyên Phong theo An Nhiên trở về, bên mình chiếc ống tre rỗng của Quan Văn — thứ kẻ phản bội sẽ khinh, và là phần duy nhất mở đường.',
      en: 'Nguyên Phong rides back with An Nhiên, Quan Văn\'s hollow bamboo tube at his side — the thing the traitor will scorn, and the only part that opens the way.' },
    tatuong: { cols: ['左將肩傷', '隨女而歸', '初從女令'], vi: 'Vai còn băng, Tả Tướng theo con gái trở về sân lễ — lần đầu theo lệnh con mà không ngần ngại.',
      en: 'His shoulder still bound, the Left General follows his daughter back to the rite — for the first time under her order, without hesitation.' },
    huutuong: { cols: ['右將守外環', '無家可歸', '再守一刻'], vi: 'Hữu Tướng nhận toàn bộ vòng ngoài. Ông không còn ai để trở về; phía sau ông là cả một triều đình cần giữ thêm đúng một khắc nữa.',
      en: 'The Right General takes the whole outer ring. He has no one left to go home to; behind him stands a whole court that needs one more quarter-hour.' },
    dinhkhang: { cols: ['丁康守水門', '待潮之轉', '一息之機'], vi: 'Đinh Khang về sớm, chờ con nước đổi chiều ở cống đá dưới chân núi. Cửa nước chỉ mở được trong vài hơi thở.',
      en: 'Đinh Khang comes back early to wait for the turning tide at the stone sluice below the mountain. The water-gate opens only for a few breaths.' },
    show: ['a-ride', 'roads'], focus: [780, 460, 1.05] },
  { cols: ['七路歸一', '七峰同火', '不言其處'], vi: 'Bảy con đường sẽ hội làm một. Hội ở đâu — sẽ không ai nói.',
    en: 'Seven roads will become one. Where — no one will ever say.',
    show: ['peaks', 'fires', 'mist'], focus: [860, 480, 1.04] },
];

// ---- result screen epilogue (win), branched on the hero: the end of the game (comic ch. 18-20). No place is named.
export const EPILOGUE = {
  annhien: {
    zh: ['Không có cỗ quan thứ một trăm để đánh dấu sự thật. Sáu người cùng đặt thẻ lên nắp, rồi bảy nắm đất từ bảy con đường phủ xuống — không trống, không bia, không ai xướng danh.',
      'Dưới gốc cây cổ thụ nơi điểm hẹn, Tả Tướng đặt gia huy trước mặt con gái: nàng chưa từng thề trong căn phòng ấy, nàng vẫn có thể đi. An Nhiên đáp: chính vì thế, lần ở lại này là của nàng.',
      'Nguyên Phong ngồi xuống bên nàng. Họ hát Tráng Sĩ Ca, nâng chén về bốn hướng, rồi uống chén rượu độc — để không ai còn có thể bị bắt mà nói.',
      'Mưa xóa lối mòn. Cò trắng bay qua núi đá. Không ai biết vua nằm dưới ngọn núi nào.'],
    en: ['No hundredth coffin marked the truth. Six of them laid their tokens on the lid together; then seven handfuls of earth from seven roads covered it — no drum, no stele, no name called out.',
      'Beneath the old tree at the meeting place, the Left General set his house crest before his daughter: she had never sworn in that room; she could still leave. An Nhiên answered that this was exactly why the staying was hers.',
      'Nguyên Phong sat down beside her. They sang the Song of the Warriors, raised their cups to the four directions and drank the poisoned wine — so that no one could ever be made to speak.',
      'Rain washed the path away. White storks crossed the karsts. No one knows under which mountain the king lies.'],
  },
  nguyenphong: {
    zh: ['Nguyên Phong đốt sợi chỉ son cuối cùng. Thầy Mo mở mạch nước ngầm cho bùn xóa dấu, rồi ném chiếc chuông đồng của mình xuống dòng suối.',
      'Ở điểm hẹn, Nguyễn Bặc nhìn số người ít đi mà không hỏi mộ ở đâu, dù chỉ một lần. Ông đẩy tờ lệnh sang bên: trang giấy ấy sẽ mãi để trắng.',
      'Chàng đặt nửa miếng đồng của cha giữa hai chén. Từng sợ mọi lời thề sẽ lấy mất tự do, giờ chàng chọn ở lại bên An Nhiên — không vì món nợ nào, không vì lệnh vua nào.',
      'Khúc hát nhỏ dần dưới gốc cây, như một đội quân ngủ say sau chuyến đi dài. Cò trắng bay qua núi; không ai biết vua nằm dưới ngọn núi nào.'],
    en: ['Nguyên Phong burned the last cinnabar thread. Thầy Mo let the underground water loose to wash out every trace, then threw his own bronze bell into the stream.',
      'At the meeting place Nguyễn Bặc saw how few had come back, and never once asked where. He pushed the order aside: that page would stay blank forever.',
      'He set his father\'s half of the bronze token between two cups. He had once feared every oath would take his freedom; now he chose to stay beside An Nhiên — for no debt, and for no king\'s order.',
      'The song faded beneath the tree, like an army asleep after a long march. White storks crossed the mountains; no one knows under which mountain the king lies.'],
  },
  tatuong: {
    zh: ['Bảy nắm đất từ bảy con đường phủ lên linh cữu. Vị vua từng gom non sông về một mối được an táng không trống, không bia, không tên.',
      'Dưới gốc cây cổ thụ, Tả Tướng tháo gia huy đặt trước mặt An Nhiên. Ông bảo nàng vẫn có thể rời đi; bàn tay ông không ngăn chén của nàng.',
      'Nàng đáp: chính vì chưa từng thề, lần ở lại này mới thuộc về nàng. Lần đầu tiên người cha không ra lệnh — ông chỉ nhắm mắt, và nâng chén cùng con.',
      'Mưa xóa lối, rêu phủ đá. Đàn cò trắng bay vòng qua núi mà không đậu xuống nơi nào.'],
    en: ['Seven handfuls of earth from seven roads covered the coffin. The king who had made the land one was laid to rest without drum, without stele, without a name.',
      'Beneath the old tree the Left General took off his house crest and laid it before An Nhiên. He told her she could still go; his hand did not stop her cup.',
      'She answered that because she had never sworn, this staying was truly hers. For the first time the father gave no order — he only closed his eyes, and raised his cup with his daughter.',
      'Rain erased the path; moss covered the stone. The storks circled over the mountains and settled nowhere.'],
  },
  huutuong: {
    zh: ['Hữu Tướng rót hai chén đầu cho Quan Văn và Hàng Tướng. Người đã ngã mang phần bí mật của họ đi; người sống phải tự quyết phần còn lại.',
      'Nguyễn Bặc không hỏi mộ ở đâu. Không có chiếu chỉ nào buộc họ phải chết — lựa chọn cuối cùng không thể thành công trạng của triều đình.',
      'Ông cất tiếng hát câu đầu Tráng Sĩ Ca; giọng khàn nối với giọng già, giọng trẻ. Sáu chén nâng về bốn hướng: cho vua đã khuất, người đã ngã, dân đã giúp, và đất nước chưa biết mình vừa được giữ.',
      'Rồi họ uống, để không ai có thể bị bắt mà nói. Ông không còn ai để trở về — nhưng đêm ấy, ông không ngủ một mình.'],
    en: ['The Right General poured the first two cups for Quan Văn and Hàng Tướng. The fallen had taken their share of the secret with them; the living had to decide on the rest.',
      'Nguyễn Bặc did not ask where. No decree bound them to die — the last choice could never become a merit of the court.',
      'He sang the first line of the Song of the Warriors; a hoarse voice, joined by old ones and young. Six cups were raised to the four directions: to the king who had passed, to the fallen, to the people who had helped, and to a land that did not know it had just been kept.',
      'Then they drank, so that no one could be made to speak. He had no one left to go home to — but that night, he did not fall asleep alone.'],
  },
  dinhkhang: {
    zh: ['Cửa hang chỉ hiện trong vài hơi thở. Bè quan lướt qua rồi nước khép lại, không một dấu vết; dòng sông của Đinh Khang giữ kín điều nó đã thấy.',
      'Thầy Mo ném chuông đồng xuống suối. Bảy nắm đất từ bảy con đường — không trống, không bia, không tên.',
      'Ở điểm hẹn, chàng trai sông nước từng chỉ tin vào sức một mình ngồi giữa đồng đội, hát Tráng Sĩ Ca, nâng chén về bốn hướng, và uống — để không ai có thể bị bắt mà nói.',
      'Mưa xóa lối mòn. Cò trắng bay qua những dòng sông; không ai biết vua nằm dưới ngọn núi nào.'],
    en: ['The cave mouth showed for only a few breaths. The raft slipped through, then the water closed without a trace; Đinh Khang\'s river kept what it had seen.',
      'Thầy Mo threw his bronze bell into the stream. Seven handfuls of earth from seven roads — no drum, no stele, no name.',
      'At the meeting place the river boy who had once trusted only his own strength sat among his comrades, sang the Song of the Warriors, raised his cup to the four directions, and drank — so that no one could be made to speak.',
      'Rain erased the path. White storks flew over the rivers; no one knows under which mountain the king lies.'],
  },
};

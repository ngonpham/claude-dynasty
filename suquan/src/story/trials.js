// Thử thách (演武試煉) of 十二使君 (overlay of src/story/trials.js: same export TRIALS, same trial format — read that
// header). Text: .zh = Vietnamese, .en = English, seals Hán.
//   thiennhan  Thiên Nhân Trảm (千人斬): 1,000 KOs within 3:00 below the Hoa Lư karsts — open from the start
//   binhsu     Bình Thập Nhị Sứ (平使君): the warlords one after another, duel by duel — opens with chapter IV
//   tuthu      Tử Thủ (死守): hold the Tây Phù Liệt crossing — defined with its field in ./tayphuliet.js (TRIAL), opens
//              with chapter II
import { TRIAL as tuthu } from './tayphuliet.js';

const NUM = { zh: 'Thử thách', en: 'TRIAL' };
/** One epilogue for every officer (result.js: a missing hero = the first entry). */
const epi = (zh, en) => ({ any: { zh: [zh], en: [en] } });
/** n charging blocks fanned round the hero, d metres out (they run straight in). */
const surge = (n, d = 22) => Array.from({ length: n }, (_, k) => {
  const a = (k + 0.5) / n * Math.PI * 2;
  return { at: ['hero', Math.sin(a) * d, Math.cos(a) * d], n: 18, charge: true };
});

// Thiên Nhân Trảm — offence: a thousand KOs against the clock (pacing as the engine's 千人斬: same waves, same gates).
const thiennhan = {
  CH: {
    id: 'thiennhan', num: NUM, title: { zh: 'Thiên Nhân Trảm', en: 'Thousand Slain' }, seal: '千人斬', map: 'hoalu',
    army: { foe: 'ngo', ally: 'dinh' }, best: 'time',
    rule: { zh: 'Đánh tan một nghìn quân trong ba phút; càng nhanh càng cao hạng', en: 'Cut down 1,000 within 3:00. The faster, the higher the rank.' },
    rank: { kos: [1000, 1000, 1000], time: [90, 115, 150], s: { time: 99, dmg: 0.35 } },
  },
  SPK: {}, OFF: {},
  BEATS: [
    {
      when: { wait: 30 }, army: true,
      obj: { zh: 'Đánh tan một nghìn quân', en: 'Defeat 1,000 soldiers', timer: 180 },
      fail: { when: { timer: true }, zh: 'Đã hết thời hạn……', en: 'Time is up...' },
    },
    { when: { kos: 300 }, squads: surge(3), banner: { html: '<em>Ba trăm</em> quân đã ngã', en: '300 down', dur: 130 } },
    { when: { kos: 300 }, heal: 0.2, squads: surge(4), banner: { html: '<em>Sáu trăm</em> quân đã ngã', en: '600 down', dur: 130 } },
    { when: { kos: 400 }, win: true, fail: null, morale: 1, banner: { html: '<em>Thiên Nhân Trảm</em> hoàn thành!', en: 'A thousand cut down!', dur: 260, big: true } },
  ],
  EPILOGUE: epi('Một người một ngựa, nghìn quân phải dạt.', 'One rider, and a thousand men gave way.'),
};

// Bình Thập Nhị Sứ — the duel: the warlords as boss actors one after another, a little fodder with each for the gauge.
// HP as in their chapters (the boss duels the campaign taught); time and damage decide the rank.
const boss = (kit, hp, more) => ({ kit, role: 'boss', at: ['hero', 0, 16], hp, ...more });
const fodder = [{ at: ['hero', -11, 12], n: 14 }, { at: ['hero', 11, 12], n: 14 }];
const binhsu = {
  CH: {
    id: 'binhsu', num: NUM, title: { zh: 'Bình Thập Nhị Sứ', en: 'Bring Down the Warlords' }, seal: '平使君', map: 'hoalu',
    army: { foe: 'do', ally: 'dinh' }, best: 'time', van: [],
    rule: { zh: 'Liên tiếp đánh bại Ngô Xương Văn, Nguyễn Siêu, Kiều Công Hãn và Đỗ Cảnh Thạc; càng nhanh càng cao hạng',
      en: 'Four duels in a row: Ngô Xương Văn, Nguyễn Siêu, Kiều Công Hãn, Đỗ Cảnh Thạc. The faster, the higher the rank.' },
    rank: { kos: [0, 0, 0], time: [200, 270, 360], s: { time: 200, dmg: 0.7 } },
  },
  SPK: {}, OFF: {},
  BEATS: [
    { when: { wait: 30 }, actors: { van: boss('ngoxuongvan', 2400) }, squads: fodder,
      obj: { zh: 'Ải thứ nhất: đánh bại Ngô Xương Văn', en: 'First gate: defeat Ngô Xương Văn', go: 'van' } },
    { when: { down: 'van' }, heal: 0.35, actors: { sieu: boss('nguyensieu', 2600) }, squads: fodder,
      obj: { zh: 'Ải thứ hai: đánh bại Nguyễn Siêu', en: 'Second gate: defeat Nguyễn Siêu', go: 'sieu' } },
    { when: { down: 'sieu' }, heal: 0.35, actors: { han: boss('kieuconghan', 3000) }, squads: fodder,
      obj: { zh: 'Ải thứ ba: đánh bại Kiều Công Hãn', en: 'Third gate: defeat Kiều Công Hãn', go: 'han' } },
    { when: { down: 'han' }, heal: 0.35, actors: { thac: boss('docanhthac', 4400, { poise: 460 }) }, squads: fodder,
      obj: { zh: 'Ải cuối: đánh bại Đỗ Cảnh Thạc', en: 'Last gate: defeat Đỗ Cảnh Thạc', go: 'thac' } },
    { when: { down: 'thac' }, win: true, morale: 1 },
  ],
  EPILOGUE: epi('Bốn sứ quân lần lượt ngã ngựa, khắp cõi không ai còn dám xưng hùng.', 'Four warlords fell one after another. No one in the land dares call himself lord now.'),
};

export const TRIALS = [thiennhan, tuthu, binhsu].filter(Boolean);

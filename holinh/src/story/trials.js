// Thử thách (演武試煉) of 護靈壯士 (overlay of src/story/trials.js: same export TRIALS, same trial format — read that
// header). Text: .zh = Vietnamese, .en = English, seals Hán. (holinh/DESIGN.md §6)
//   thiennhan  Thiên Nhân Trảm (千人斬): 1,000 KOs within 3:00 in the Quèn Thành valley — open from the start
//   thudeo     Một Mình Giữ Đèo (獨守): hold the burning pass — defined with its field in ./deolua.js (TRIAL), opens
//              with Màn V
//   baylo      Bảy Đường Truy Sát (七路): the five who hunted the coffins, duel by duel — opens with Màn VI
import { TRIAL as thudeo } from './deolua.js';

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
    id: 'thiennhan', num: NUM, title: { zh: 'Thiên Nhân Trảm', en: 'Thousand Slain' }, seal: '千人斬', map: 'quenthanh',
    army: { foe: 'suquan', ally: 'dinh' }, best: 'time',
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
  EPILOGUE: epi('Một người giữ một tuyến, nghìn quân phải dạt.', 'One guardian held one road, and a thousand men gave way.'),
};

// Bảy Đường Truy Sát — the duel: everyone who stood across the seven roads, as boss actors one after another, a little
// fodder with each for the gauge. HP close to their stages; time and damage decide the rank.
const boss = (kit, hp, more) => ({ kit, role: 'boss', at: ['hero', 0, 16], hp, ...more });
const fodder = [{ at: ['hero', -11, 12], n: 14 }, { at: ['hero', 11, 12], n: 14 }];
const baylo = {
  CH: {
    id: 'baylo', num: NUM, title: { zh: 'Bảy Đường Truy Sát', en: 'The Seven Roads Hunted' }, seal: '七路', map: 'quenthanh',
    army: { foe: 'phanthan', ally: 'holinh' }, best: 'time', van: [],
    rule: { zh: 'Liên tiếp đánh bại Hàng Tướng, Máu Lạnh, Hồng Diễm, Mặt Sẹo và Hoạn Quan; càng nhanh càng cao hạng',
      en: 'Five duels in a row: the Yielded General, Máu Lạnh, Hồng Diễm, Mặt Sẹo, the Eunuch. The faster, the higher the rank.' },
    rank: { kos: [0, 0, 0], time: [240, 320, 420], s: { time: 240, dmg: 0.7 } },
  },
  SPK: {}, OFF: {},
  BEATS: [
    { when: { wait: 30 }, actors: { hang: boss('hangtuong', 2800, { poise: 420, name: { zh: 'Hàng Tướng', en: 'THE YIELDED GENERAL' }, seal: '報恩' }) }, squads: fodder,
      obj: { zh: 'Ải thứ nhất: đánh bại Hàng Tướng', en: 'First gate: defeat the Yielded General', go: 'hang' } },
    { when: { down: 'hang' }, heal: 0.3, actors: { lanh: boss('maulanh', 2600, { name: { zh: 'Máu Lạnh', en: 'MÁU LẠNH' }, seal: '冷血' }) }, squads: fodder,
      obj: { zh: 'Ải thứ hai: đánh bại Máu Lạnh', en: 'Second gate: defeat Máu Lạnh', go: 'lanh' } },
    { when: { down: 'lanh' }, heal: 0.3, actors: { diem: boss('hongdiem', 2800, { name: { zh: 'Mã Hồng Diễm', en: 'MÃ HỒNG DIỄM' }, seal: '紅艷' }) }, squads: fodder,
      obj: { zh: 'Ải thứ ba: đánh bại Mã Hồng Diễm', en: 'Third gate: defeat Mã Hồng Diễm', go: 'diem' } },
    { when: { down: 'diem' }, heal: 0.3, actors: { seo: boss('matseo', 3400, { poise: 460, name: { zh: 'Mặt Sẹo', en: 'MẶT SẸO' }, seal: '疤面' }) }, squads: fodder,
      obj: { zh: 'Ải thứ tư: đánh bại Mặt Sẹo', en: 'Fourth gate: defeat Mặt Sẹo', go: 'seo' } },
    { when: { down: 'seo' }, heal: 0.35, actors: { hoan: boss('hoanquan', 4200, { poise: 440, name: { zh: 'Hoạn Quan Tổng Quản', en: 'THE CHIEF EUNUCH' }, seal: '宦官' }) }, squads: fodder,
      obj: { zh: 'Ải cuối: đánh bại Hoạn Quan', en: 'Last gate: defeat the Chief Eunuch', go: 'hoan' } },
    { when: { down: 'hoan' }, win: true, morale: 1 },
  ],
  EPILOGUE: epi('Năm kẻ chắn bảy đường lần lượt gục ngã. Bí mật vẫn nằm yên dưới núi.', 'The five who barred the seven roads fell one after another. The secret still sleeps under the mountain.'),
};

export const TRIALS = [thiennhan, thudeo, baylo].filter(Boolean);

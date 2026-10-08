// PLACEHOLDER script for Màn V «Đèo Lửa · Hang Tối» (holinh/DESIGN.md §6): a single fight on the borrowed field until the real
// stage lands. Format: src/story/chapters.js header; text: Vietnamese in .zh, English in .en, Hán in seals / cols.
export const CH = {
  id: 'deolua', num: { zh: 'Màn V', en: 'STAGE V' }, title: { zh: 'Đèo Lửa · Hang Tối', en: 'The Burning Pass, the Dark Cave' },
  seal: '火嶺', era: { zh: 'Năm 979 · đường đèo', en: '979 AD' }, map: 'deolua',
  heroes: ['annhien', 'nguyenphong', 'hangtuong'],
  ally: {},
  army: { foe: 'truysat', ally: 'holinh' },
  van: [],
  hq: [0, 150],
  rank: { kos: [200, 400, 600], time: [300, 420, 600] },
};
export const SPK = {};
export const OFF = {};
export const BEATS = [
  { when: { wait: 30 }, army: true, waves: true, obj: { zh: 'Đánh tan quân địch', en: 'Rout the enemy' } },
  { when: { kos: 150 }, win: true, morale: 1, banner: { html: '<em>Đèo Lửa · Hang Tối</em>', en: 'The Burning Pass, the Dark Cave', dur: 200, big: true } },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };
export const PROLOGUE = [{ cols: ['護靈壯士', '火嶺', '九十九棺'], vi: 'Đèo Lửa · Hang Tối.', en: 'The Burning Pass, the Dark Cave.', show: [], focus: [800, 450, 1.1] }];
export const EPILOGUE = { any: { zh: ['Đèo Lửa · Hang Tối.'], en: ['The Burning Pass, the Dark Cave.'] } };
// The trial «Một Mình Giữ Đèo» (獨守) is defined with this field (story/trials.js imports it); null until it lands.
export const TRIAL = null;

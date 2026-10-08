// PLACEHOLDER script for Màn I «Cờ Lau Qua Quèn Thành» (holinh/DESIGN.md §6): a single fight on the borrowed field until the real
// stage lands. Format: src/story/chapters.js header; text: Vietnamese in .zh, English in .en, Hán in seals / cols.
export const CH = {
  id: 'quenthanh', num: { zh: 'Màn I', en: 'STAGE I' }, title: { zh: 'Cờ Lau Qua Quèn Thành', en: 'The Reed Banner over Quèn Thành' },
  seal: '蘆旗', era: { zh: 'Khoảng năm 967', en: 'c. 967 AD' }, map: 'quenthanh',
  heroes: ['huutuong', 'tatuong'],
  ally: {},
  army: { foe: 'suquan', ally: 'dinh' },
  van: [],
  hq: [0, 150],
  rank: { kos: [200, 400, 600], time: [300, 420, 600] },
};
export const SPK = {};
export const OFF = {};
export const BEATS = [
  { when: { wait: 30 }, army: true, waves: true, obj: { zh: 'Đánh tan quân địch', en: 'Rout the enemy' } },
  { when: { kos: 150 }, win: true, morale: 1, banner: { html: '<em>Cờ Lau Qua Quèn Thành</em>', en: 'The Reed Banner over Quèn Thành', dur: 200, big: true } },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };
export const PROLOGUE = [{ cols: ['護靈壯士', '蘆旗', '九十九棺'], vi: 'Cờ Lau Qua Quèn Thành.', en: 'The Reed Banner over Quèn Thành.', show: [], focus: [800, 450, 1.1] }];
export const EPILOGUE = { any: { zh: ['Cờ Lau Qua Quèn Thành.'], en: ['The Reed Banner over Quèn Thành.'] } };

// PLACEHOLDER script for Màn VI «Ngày Bốn Mươi Chín» (holinh/DESIGN.md §6): a single fight on the borrowed field until the real
// stage lands. Format: src/story/chapters.js header; text: Vietnamese in .zh, English in .en, Hán in seals / cols.
export const CH = {
  id: 'ngay49', num: { zh: 'Màn VI', en: 'STAGE VI' }, title: { zh: 'Ngày Bốn Mươi Chín', en: 'The Forty-Ninth Day' },
  seal: '七七', era: { zh: 'Năm 979 · ngày thứ bốn mươi chín', en: '979 AD' }, map: 'ngay49',
  heroes: ['annhien', 'nguyenphong', 'tatuong', 'huutuong', 'dinhkhang'],
  ally: {},
  army: { foe: 'phanthan', ally: 'holinh' },
  van: [],
  hq: [0, 150],
  rank: { kos: [200, 400, 600], time: [300, 420, 600] },
};
export const SPK = {};
export const OFF = {};
export const BEATS = [
  { when: { wait: 30 }, army: true, waves: true, obj: { zh: 'Đánh tan quân địch', en: 'Rout the enemy' } },
  { when: { kos: 150 }, win: true, morale: 1, banner: { html: '<em>Ngày Bốn Mươi Chín</em>', en: 'The Forty-Ninth Day', dur: 200, big: true } },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };
export const PROLOGUE = [{ cols: ['護靈壯士', '七七', '九十九棺'], vi: 'Ngày Bốn Mươi Chín.', en: 'The Forty-Ninth Day.', show: [], focus: [800, 450, 1.1] }];
export const EPILOGUE = { any: { zh: ['Ngày Bốn Mươi Chín.'], en: ['The Forty-Ninth Day.'] } };

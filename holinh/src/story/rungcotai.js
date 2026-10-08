// PLACEHOLDER script for Màn III «Rừng Có Tai» (holinh/DESIGN.md §6): a single fight on the borrowed field until the real
// stage lands. Format: src/story/chapters.js header; text: Vietnamese in .zh, English in .en, Hán in seals / cols.
export const CH = {
  id: 'rungcotai', num: { zh: 'Màn III', en: 'STAGE III' }, title: { zh: 'Rừng Có Tai', en: 'The Forest Has Ears' },
  seal: '林有耳', era: { zh: 'Năm 979 · tuần thứ nhất', en: '979 AD' }, map: 'rungcotai',
  heroes: ['annhien', 'nguyenphong'],
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
  { when: { kos: 150 }, win: true, morale: 1, banner: { html: '<em>Rừng Có Tai</em>', en: 'The Forest Has Ears', dur: 200, big: true } },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };
export const PROLOGUE = [{ cols: ['護靈壯士', '林有耳', '九十九棺'], vi: 'Rừng Có Tai.', en: 'The Forest Has Ears.', show: [], focus: [800, 450, 1.1] }];
export const EPILOGUE = { any: { zh: ['Rừng Có Tai.'], en: ['The Forest Has Ears.'] } };

// PLACEHOLDER script for Màn IV «Cầu Gãy Trên Dòng Sâu» (holinh/DESIGN.md §6): a single fight on the borrowed field until the real
// stage lands. Format: src/story/chapters.js header; text: Vietnamese in .zh, English in .en, Hán in seals / cols.
export const CH = {
  id: 'caugay', num: { zh: 'Màn IV', en: 'STAGE IV' }, title: { zh: 'Cầu Gãy Trên Dòng Sâu', en: 'The Broken Bridge' },
  seal: '斷橋', era: { zh: 'Năm 979 · đường sông', en: '979 AD' }, map: 'caugay',
  heroes: ['dinhkhang', 'annhien', 'nguyenphong'],
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
  { when: { kos: 150 }, win: true, morale: 1, banner: { html: '<em>Cầu Gãy Trên Dòng Sâu</em>', en: 'The Broken Bridge', dur: 200, big: true } },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };
export const PROLOGUE = [{ cols: ['護靈壯士', '斷橋', '九十九棺'], vi: 'Cầu Gãy Trên Dòng Sâu.', en: 'The Broken Bridge.', show: [], focus: [800, 450, 1.1] }];
export const EPILOGUE = { any: { zh: ['Cầu Gãy Trên Dòng Sâu.'], en: ['The Broken Bridge.'] } };

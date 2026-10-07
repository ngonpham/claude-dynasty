// Chương II «Tây Phù Liệt» — PLACEHOLDER script (format: src/story/chapters.js header) on the placeholder field: cut down
// 200 soldiers and the chapter is won. The real battle (beats, officers, boss, prologue over the ink map, epilogues)
// replaces this module.
export const CH = {
  id: 'tayphuliet', num: { zh: 'Chương II', en: 'CHAPTER II' }, title: { zh: 'Tây Phù Liệt', en: 'Tây Phù Liệt' },
  seal: '西扶烈', era: { zh: 'Khoảng năm 966', en: 'c. 966 AD' }, map: 'tayphuliet',
  heroes: ['dinhbolinh', 'lehoan', 'dinhlien'],
  ally: {'dinhbolinh': 'lehoan', 'lehoan': 'dinhbolinh', 'dinhlien': 'dinhbolinh'},
  army: { foe: 'nguyen', ally: 'dinh' },
  hq: [0, 120],
  rank: { kos: [150, 200, 300], time: [240, 360, 480] },
};

export const SPK = {};
export const OFF = {};

export const BEATS = [
  { when: { wait: 30 }, army: true, obj: { zh: 'Đánh tan 200 quân địch', en: 'Defeat 200 soldiers' }, morale: 0 },
  { when: { kos: 200 }, win: true, morale: 1, banner: { html: '<em>Tây Phù Liệt</em> đã bình định!', en: 'Tây Phù Liệt is taken!', dur: 240, big: true } },
];

export const PROLOGUE = [
  { cols: ['十二使君', '天下分裂', '西扶烈'], vi: 'Mười hai sứ quân cát cứ, đất nước chia lìa.', en: 'Twelve warlords carve up the land.', show: [], focus: [800, 450, 1.05] },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };

export const EPILOGUE = {
  dinhbolinh: { zh: ['Tây Phù Liệt đã về tay nhà Đinh.'], en: ['Tây Phù Liệt falls to the house of Đinh.'] },
};

/** Tử Thủ (死守), the defence trial on this field (trial format: src/story/trials.js header), or null until it exists:
 *  suquan/src/story/trials.js lists it after Thiên Nhân Trảm (unlock 'tuthu': core/progress.js). */
export const TRIAL = null;

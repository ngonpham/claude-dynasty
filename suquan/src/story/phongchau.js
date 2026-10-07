// Chương IV «Phong Châu» — PLACEHOLDER script (format: src/story/chapters.js header) on the placeholder field: cut down
// 200 soldiers and the chapter is won. The real battle (beats, officers, boss, prologue over the ink map, epilogues)
// replaces this module.
export const CH = {
  id: 'phongchau', num: { zh: 'Chương IV', en: 'CHAPTER IV' }, title: { zh: 'Phong Châu', en: 'Phong Châu' },
  seal: '峰州', era: { zh: 'Năm 967–968', en: '967–968 AD' }, map: 'phongchau',
  heroes: ['dinhbolinh', 'nguyenbac', 'lehoan', 'khuongviet'],
  ally: {'dinhbolinh': 'nguyenbac', 'nguyenbac': 'dinhbolinh', 'lehoan': 'dinhbolinh', 'khuongviet': 'dinhbolinh'},
  army: { foe: 'kieu', ally: 'dinh' },
  hq: [0, 120],
  rank: { kos: [150, 200, 300], time: [240, 360, 480] },
};

export const SPK = {};
export const OFF = {};

export const BEATS = [
  { when: { wait: 30 }, army: true, obj: { zh: 'Đánh tan 200 quân địch', en: 'Defeat 200 soldiers' }, morale: 0 },
  { when: { kos: 200 }, win: true, morale: 1, banner: { html: '<em>Phong Châu</em> đã bình định!', en: 'Phong Châu is taken!', dur: 240, big: true } },
];

export const PROLOGUE = [
  { cols: ['十二使君', '天下分裂', '峰州'], vi: 'Mười hai sứ quân cát cứ, đất nước chia lìa.', en: 'Twelve warlords carve up the land.', show: [], focus: [800, 450, 1.05] },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };

export const EPILOGUE = {
  dinhbolinh: { zh: ['Phong Châu đã về tay nhà Đinh.'], en: ['Phong Châu falls to the house of Đinh.'] },
};

// Chương I «Hoa Lư» — PLACEHOLDER script (format: src/story/chapters.js header) on the placeholder field: cut down
// 200 soldiers and the chapter is won. The real battle (beats, officers, boss, prologue over the ink map, epilogues)
// replaces this module.
export const CH = {
  id: 'hoalu', num: { zh: 'Chương I', en: 'CHAPTER I' }, title: { zh: 'Hoa Lư', en: 'Hoa Lư' },
  seal: '華閭', era: { zh: 'Năm 951', en: '951 AD' }, map: 'hoalu',
  heroes: ['dinhbolinh', 'nguyenbac'],
  ally: {'dinhbolinh': 'nguyenbac', 'nguyenbac': 'dinhbolinh'},
  army: { foe: 'ngo', ally: 'dinh' },
  hq: [0, 120],
  rank: { kos: [150, 200, 300], time: [240, 360, 480] },
};

export const SPK = {};
export const OFF = {};

export const BEATS = [
  { when: { wait: 30 }, army: true, obj: { zh: 'Đánh tan 200 quân địch', en: 'Defeat 200 soldiers' }, morale: 0 },
  { when: { kos: 200 }, win: true, morale: 1, banner: { html: '<em>Hoa Lư</em> đã bình định!', en: 'Hoa Lư is taken!', dur: 240, big: true } },
];

export const PROLOGUE = [
  { cols: ['十二使君', '天下分裂', '華閭'], vi: 'Mười hai sứ quân cát cứ, đất nước chia lìa.', en: 'Twelve warlords carve up the land.', show: [], focus: [800, 450, 1.05] },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };

export const EPILOGUE = {
  dinhbolinh: { zh: ['Hoa Lư đã về tay nhà Đinh.'], en: ['Hoa Lư falls to the house of Đinh.'] },
};

// Chương III «Đỗ Động Giang» — PLACEHOLDER script (format: src/story/chapters.js header) on the placeholder field: cut down
// 200 soldiers and the chapter is won. The real battle (beats, officers, boss, prologue over the ink map, epilogues)
// replaces this module.
export const CH = {
  id: 'dodong', num: { zh: 'Chương III', en: 'CHAPTER III' }, title: { zh: 'Đỗ Động Giang', en: 'Đỗ Động Giang' },
  seal: '杜洞江', era: { zh: 'Khoảng năm 967', en: 'c. 967 AD' }, map: 'dodong',
  heroes: ['dinhbolinh', 'phambachho', 'dinhlien'],
  ally: {'dinhbolinh': 'phambachho', 'phambachho': 'dinhbolinh', 'dinhlien': 'dinhbolinh'},
  army: { foe: 'do', ally: 'dinh' },
  hq: [0, 120],
  rank: { kos: [150, 200, 300], time: [240, 360, 480] },
};

export const SPK = {};
export const OFF = {};

export const BEATS = [
  { when: { wait: 30 }, army: true, obj: { zh: 'Đánh tan 200 quân địch', en: 'Defeat 200 soldiers' }, morale: 0 },
  { when: { kos: 200 }, win: true, morale: 1, banner: { html: '<em>Đỗ Động Giang</em> đã bình định!', en: 'Đỗ Động Giang is taken!', dur: 240, big: true } },
];

export const PROLOGUE = [
  { cols: ['十二使君', '天下分裂', '杜洞江'], vi: 'Mười hai sứ quân cát cứ, đất nước chia lìa.', en: 'Twelve warlords carve up the land.', show: [], focus: [800, 450, 1.05] },
];
export const PL_MAP = { art: '<g class="pl-labels"></g>', arrows: [] };

export const EPILOGUE = {
  dinhbolinh: { zh: ['Đỗ Động Giang đã về tay nhà Đinh.'], en: ['Đỗ Động Giang falls to the house of Đinh.'] },
};

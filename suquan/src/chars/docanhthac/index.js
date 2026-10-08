// docanhthac: the officer entry (contract: src/chars/index.js header): metadata, his model and portrait (model.js) and
// his kit (kit.js: Lü Bu's halberd moveset in his own look, with a boss profile — he is chapter III's boss actor).
import { DOCANHTHAC_KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'docanhthac', side: { zh: 'Đỗ Động Giang', en: 'Đỗ Động' },
    name: { zh: 'Đỗ Cảnh Thạc', en: 'Đỗ Cảnh Thạc' }, courtesy: { zh: '杜景碩', en: 'Đỗ Động Giang' }, seal: '杜洞',
    title: { zh: 'Sứ quân Đỗ Động', en: 'Warlord of Đỗ Động' }, motto: 'Cựu tướng Ngô Vương · Sức địch muôn người · Thà chết không hàng',
    weapon: { zh: 'Phương thiên kích', en: 'Crescent Halberd' },
    bio: {
      zh: ['Vốn là tướng dưới trướng Ngô Vương, sức khỏe phi thường, cát cứ vùng Đỗ Động Giang.',
        'Cầm cự với quân Đinh lâu hơn mọi sứ quân khác, đến hơi thở cuối cùng vẫn không chịu hàng.'],
      en: ['Once a general of the Ngô king, a man of fearsome strength who held the Đỗ Động river country as his own.',
        'He held out against the Đinh host longer than any other warlord and would not yield to his last breath.'],
    },
    stats: { atk: 5, def: 4, speed: 4, range: 4 }, musou: { zh: 'Đỗ Động Cuồng Kích', en: 'Fury of Đỗ Động' }, accent: '#a040d8',
    lines: {
      intro: { zh: 'Đỗ Cảnh Thạc ở đây! Lũ chăn trâu Hoa Lư, lại đây nộp mạng!', en: 'Đỗ Cảnh Thạc stands here! Come, buffalo-boys of Hoa Lư, and die!' },
      musouEnd: { zh: 'Đỗ Động Giang không bao giờ quỳ gối!', en: 'Đỗ Động Giang kneels to no one!' },
      copy: ['一戟橫江', '寧死不降'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: DOCANHTHAC_KIT,
};

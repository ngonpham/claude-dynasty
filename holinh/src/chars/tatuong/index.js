// tatuong: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Zhang Fei's serpent-spear moveset on this officer's own model
// and look); model, portrait: model.js. Design token and look: holinh/DESIGN.md §3.
import { KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'tatuong', side: { zh: 'Hộ linh', en: 'Guardian' },
    name: { zh: 'Tả Tướng', en: 'The Left General' }, courtesy: { zh: '左將', en: 'Tả Tướng quân' }, seal: '左將',
    title: { zh: 'Người cha dựng tường', en: 'The Father Who Built a Wall' }, motto: 'Phá cổng gỗ · Giữ lời thề cũ · Cha của An Nhiên',
    weapon: { zh: 'Giáo lớn', en: 'Broad Spear' },
    bio: {
      zh: ['Tướng to lớn râu rậm, thời loạn sứ quân từng phá cổng gỗ mở đường cho chủ tướng; cha Nguyên Phong đã chết để cứu ông.',
        'Ông yêu con gái bằng cách ngăn con sống; bị bắt giữ trong hang tối, bị tra hỏi nhiều ngày mà không nói nửa lời.'],
      en: ['A towering bearded commander who broke the wooden gate for his lord in the warlord years; Nguyên Phong\'s father died to save him.',
        'He loves his daughter by keeping her from living. Taken and held in a dark cave, questioned for days, he said not one word.'],
    },
    stats: { atk: 5, def: 5, speed: 2, range: 4 }, musou: { zh: 'Tả Dực Phá Thành', en: 'The Left Wing Breaks the Wall' }, accent: '#c0602a',
    lines: {
      intro: { zh: 'Tả Tướng đây! Cổng nào chắn đường, ta phá cổng ấy!', en: 'The Left General is here! Whatever gate stands in the way, I break it!' },
      musouEnd: { zh: 'Con đi đi. Cha giữ cầu!', en: 'Go on, child. Your father holds the bridge!' },
      copy: ['左翼破城', '一槍開門'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KIT,
};

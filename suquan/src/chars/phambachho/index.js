// phambachho: the officer entry (contract: src/chars/index.js header): metadata, his white-tiger model and portrait
// (model.js) and his kit (kit.js: Zhang Fei's serpent-spear moveset in his own look).
import { PHAMBACHHO_KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'phambachho', side: { zh: 'Đằng Châu', en: 'Đằng Châu' },
    name: { zh: 'Phạm Bạch Hổ', en: 'Phạm Bạch Hổ' }, courtesy: { zh: '范白虎', en: 'Đằng Châu' }, seal: '白虎',
    title: { zh: 'Bạch Hổ Tướng Quân', en: 'The White Tiger' }, motto: 'Sứ quân Đằng Châu · Quy thuận nhà Đinh · Hổ gầm chấn núi',
    weapon: { zh: 'Xà mâu', en: 'Serpent Spear' },
    bio: {
      zh: ['Tên thật Phạm Phòng Át, sứ quân đất Đằng Châu; tương truyền mẹ mộng thấy hổ trắng mà sinh ra ông.',
        'Thấy Đinh Bộ Lĩnh là bậc chân chúa, đem cả quân Đằng Châu về hàng, cùng dẹp các sứ quân còn lại.'],
      en: ['Born Phạm Phòng Át, warlord of Đằng Châu — his mother, it is told, dreamed of a white tiger before his birth.',
        'Seeing in Đinh Bộ Lĩnh a true lord, he brought all Đằng Châu over to him and rode against the other warlords.'],
    },
    stats: { atk: 5, def: 4, speed: 2, range: 4 }, musou: { zh: 'Bạch Hổ Khiếu Sơn', en: 'White Tiger\'s Roar' }, accent: '#cfd8e8',
    lines: {
      intro: { zh: 'Bạch Hổ Đằng Châu đã tới! Đứa nào muốn nếm nanh hổ?', en: 'The White Tiger of Đằng Châu is here! Who wants a taste of the fang?' },
      musouEnd: { zh: 'Hổ đã gầm, núi rừng phải lặng!', en: 'When the tiger roars, the hills fall silent!' },
      copy: ['白虎一嘯', '千軍膽寒'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: PHAMBACHHO_KIT,
};

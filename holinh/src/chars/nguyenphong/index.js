// nguyenphong: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Huang Zhong's bow kit on this officer's own model
// and look); model, portrait: model.js. Design token and look: holinh/DESIGN.md §3.
import { KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'nguyenphong', side: { zh: 'Người núi', en: 'Of the Mountains' },
    name: { zh: 'Nguyên Phong', en: 'Nguyên Phong' }, courtesy: { zh: '元風', en: 'Tràng An' }, seal: '元風',
    title: { zh: 'Cung săn xuống núi', en: 'The Hunter Who Came Down the Mountain' }, motto: 'Thợ săn mồ côi · Đọc được rừng · Không cúi trước ấn',
    weapon: { zh: 'Cung săn', en: 'Hunting Bow' },
    bio: {
      zh: ['Thợ săn mồ côi do Thầy Mo nuôi lớn, sống bằng rừng, không nhận lệnh quan và không cúi trước ấn.',
        'Tiếng chuông của Thầy Mo gọi chàng xuống núi: cha chàng từng chết khi cứu Tả Tướng khỏi một mũi tên.'],
      en: ['An orphan hunter raised by the shaman Mo, living off the forest, taking no orders and bowing to no seal.',
        'The shaman\'s bell calls him down the mountain: his father died taking an arrow meant for the Left General.'],
    },
    stats: { atk: 4, def: 2, speed: 5, range: 5 }, musou: { zh: 'Phong Tiễn Xuyên Lâm', en: 'Wind Arrows Through the Forest' }, accent: '#7aa04a',
    lines: {
      intro: { zh: 'Rừng có tai. Ta nghe được chúng trước khi chúng thấy ta.', en: 'The forest has ears. I hear them before they see me.' },
      musouEnd: { zh: 'Gió núi không theo lệnh ai cả!', en: 'The mountain wind takes no one\'s orders!' },
      copy: ['山風無主', '穿林一箭'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KIT,
};

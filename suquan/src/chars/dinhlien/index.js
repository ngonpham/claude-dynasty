// dinhlien: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Huang Zhong's bow kit on his own model
// and look); model, portrait: model.js.
import { DINHLIEN_KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'dinhlien', side: { zh: 'Nhà Đinh', en: 'Đinh' },
    name: { zh: 'Đinh Liễn', en: 'Đinh Liễn' }, courtesy: { zh: '丁璉', en: 'Hoa Lư' }, seal: '南越',
    title: { zh: 'Nam Việt Vương', en: 'King of Nam Việt' }, motto: 'Trưởng tử nhà Đinh · Thần tiễn · Nam Việt Vương',
    weapon: { zh: 'Chiến cung', en: 'War Bow' },
    bio: {
      zh: ['Con trưởng của Đinh Bộ Lĩnh; năm 951 ở làm con tin nơi triều Ngô, bị quân Ngô giải đến trước thành Hoa Lư để uy hiếp cha.',
        'Lớn lên theo cha chinh chiến, bắn cung trăm phát trăm trúng, về sau được phong Nam Việt Vương.'],
      en: ['Eldest son of Đinh Bộ Lĩnh; a hostage of the Ngô court, paraded before Hoa Lư in 951 to make his father yield.',
        'He grew up at his father\'s side, an archer who never missed, and was later made King of Nam Việt.'],
    },
    stats: { atk: 4, def: 2, speed: 3, range: 5 }, musou: { zh: 'Nam Việt Thần Tiễn', en: 'Divine Arrows of Nam Việt' }, accent: '#e0702a',
    lines: {
      intro: { zh: 'Đinh Liễn ở đây! Mũi tên này không biết nương tay!', en: 'Đinh Liễn is here! These arrows know no mercy!' },
      musouEnd: { zh: 'Phụ thân, xem con mở đường!', en: 'Father — watch me clear the way!' },
      copy: ['南越神箭', '一矢開途'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: DINHLIEN_KIT,
};

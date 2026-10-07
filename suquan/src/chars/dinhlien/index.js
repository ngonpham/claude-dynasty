// dinhlien: the officer entry (contract: src/chars/index.js header). PLACEHOLDER kit and portrait: the engine's
// HUANGZHONG_KIT until this officer's own model / kit lands in this folder (model.js, kit.js).
import { HUANGZHONG_KIT } from '../../../../src/chars/huangzhong/kit.js';
import { CHARS as ENGINE_CHARS } from 'engine/chars/index.js';

export const CHAR = {
    id: 'dinhlien', side: { zh: 'Nhà Đinh', en: 'Đinh' },
    name: { zh: 'Đinh Liễn', en: 'Đinh Liễn' }, courtesy: { zh: '丁璉', en: 'Nam Việt Vương' }, seal: '南越',
    title: { zh: 'Nam Việt Vương', en: 'King of Nam Việt' }, motto: 'Trưởng tử nhà Đinh · Thần tiễn · Nam Việt Vương',
    weapon: { zh: 'Cung nỏ', en: 'War Bow' },
    bio: {
      zh: ['Con trưởng của Đinh Bộ Lĩnh; năm 951 từng bị quân nhà Ngô bắt làm con tin trước thành Hoa Lư.',
        'Lớn lên theo cha chinh chiến, bắn cung trăm phát trăm trúng, về sau được phong Nam Việt Vương.'],
      en: ['Eldest son of Đinh Bộ Lĩnh, held hostage by the Ngô court army before Hoa Lư in 951.',
        'He grew up at his father\'s side, an archer who never missed, and was later made King of Nam Việt.'],
    },
    stats: { atk: 4, def: 2, speed: 3, range: 5 }, musou: { zh: 'Nam Việt Thần Tiễn', en: 'Divine Arrows of Nam Việt' }, accent: '#d98a2a',
    lines: {
      intro: { zh: 'Đinh Liễn ở đây! Mũi tên này không biết nương tay!', en: 'Đinh Liễn is here! These arrows know no mercy!' },
      musouEnd: { zh: 'Cha ơi, xem con mở đường!', en: 'Father — watch me clear the way!' },
      copy: ['一矢既出', '萬軍辟易'],
    },
    portrait: ENGINE_CHARS.zhaoyun.portrait,
    kit: HUANGZHONG_KIT,
};

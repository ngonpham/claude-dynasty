// nguyenbac: the officer entry (contract: src/chars/index.js header). PLACEHOLDER kit and portrait: the engine's
// GUANYU_KIT until this officer's own model / kit lands in this folder (model.js, kit.js).
import { GUANYU_KIT } from '../../../../src/chars/guanyu/kit.js';
import { FACE, PAL } from '../../../../src/chars/guanyu/model.js';

export const CHAR = {
    id: 'nguyenbac', side: { zh: 'Nhà Đinh', en: 'Đinh' },
    name: { zh: 'Nguyễn Bặc', en: 'Nguyễn Bặc' }, courtesy: { zh: '阮匐', en: 'Đại Hữu' }, seal: '定國',
    title: { zh: 'Định Quốc Công', en: 'Duke Who Steadies the Realm' }, motto: 'Bạn cờ lau · Khai quốc công thần · Định Quốc Công',
    weapon: { zh: 'Đại đao', en: 'Great Glaive' },
    bio: {
      zh: ['Người Đại Hữu, cùng Đinh Bộ Lĩnh chăn trâu, tập trận cờ lau từ thuở nhỏ; sức khỏe hơn người.',
        'Theo chúa dẹp loạn mười hai sứ quân, đứng đầu hàng khai quốc công thần, được phong Định Quốc Công.'],
      en: ['A boy of Đại Hữu who herded buffalo beside Đinh Bộ Lĩnh and fought his reed-banner battles; strong beyond other men.',
        'He rode first among the founders through the war of the twelve warlords and was made Duke Who Steadies the Realm.'],
    },
    stats: { atk: 5, def: 4, speed: 3, range: 4 }, musou: { zh: 'Định Quốc Trảm', en: 'Realm-Steadying Cleave' }, accent: '#3cae6e',
    lines: {
      intro: { zh: 'Nguyễn Bặc ở đây! Lưỡi đao này chỉ phò một chủ!', en: 'Nguyễn Bặc stands here! This glaive serves one lord alone!' },
      musouEnd: { zh: 'Một đao định giang sơn!', en: 'One stroke to steady the realm!' },
      copy: ['一刀定國', '千軍盡斬'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: GUANYU_KIT,
};

// nguyenbac: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Guan Yu's glaive moveset on his own
// model and look); model, portrait: model.js.
import { NGUYENBAC_KIT } from './kit.js';
import { FACE, PAL } from './model.js';

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
    stats: { atk: 5, def: 4, speed: 3, range: 4 }, musou: { zh: 'Định Quốc Trảm', en: 'Realm-Steadying Cleave' }, accent: '#46a86c',
    lines: {
      intro: { zh: 'Nguyễn Bặc ở đây! Lưỡi đao này chỉ phò một chủ!', en: 'Nguyễn Bặc stands here! This glaive serves one lord alone!' },
      musouEnd: { zh: 'Một đao định giang sơn!', en: 'One stroke to steady the realm!' },
      copy: ['一刀定國', '同心扶主'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: NGUYENBAC_KIT,
};

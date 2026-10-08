// khuongviet: the officer entry (contract: src/chars/index.js header): metadata, his model and portrait (model.js) and
// his kit (kit.js: Zhuge Liang's fan moveset with a horsehair whisk, saffron light and his own seals: fx.js).
import { KHUONGVIET_KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'khuongviet', side: { zh: 'Nhà Đinh', en: 'Đinh' },
    name: { zh: 'Ngô Chân Lưu', en: 'Ngô Chân Lưu' }, courtesy: { zh: '匡越', en: 'Khuông Việt' }, seal: '匡越',
    title: { zh: 'Khuông Việt Đại Sư', en: 'The Master Who Upholds Việt' }, motto: 'Thiền sư · Phất trần trấn tà · Khuông phò nước Việt',
    weapon: { zh: 'Phất trần', en: 'Horsehair Whisk' },
    bio: {
      zh: ['Thiền sư dòng Vô Ngôn Thông, học rộng hiểu sâu, được nhà Đinh trọng dụng.',
        'Dã sử kể ông vung phất trần, bày ấn chú giữa trận, che chở quân Đinh trước muôn mũi giáo.'],
      en: ['A Zen master of the Vô Ngôn Thông line, deep in learning, honoured by the house of Đinh.',
        'Legend tells of him sweeping his whisk and laying seals of light across the field to shield the Đinh host.'],
    },
    stats: { atk: 3, def: 2, speed: 3, range: 5 }, musou: { zh: 'Phật Quang Hộ Quốc', en: 'Buddha-Light Guards the Realm' }, accent: '#f0a040',
    lines: {
      intro: { zh: 'A Di Đà Phật. Bần tăng xin vì muôn dân mà ra tay.', en: 'Amitābha. For the sake of the people, this monk takes the field.' },
      musouEnd: { zh: 'Quốc thái dân an, ấy là đạo vậy.', en: 'A realm at peace, a people at rest — that is the Way.' },
      copy: ['佛光護國', '萬法歸一'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KHUONGVIET_KIT,
};

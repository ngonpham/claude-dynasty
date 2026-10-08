// thaymo: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Zhuge Liang's fan moveset on this officer's own model
// and look); model, portrait: model.js. Design token and look: holinh/DESIGN.md §3.
import { KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'thaymo', side: { zh: 'Người Mường', en: 'Mường' },
    name: { zh: 'Thầy Mo Cun', en: 'Shaman Mo Cun' }, courtesy: { zh: '巫鈴', en: 'Núi Hoa Lư' }, seal: '巫鈴',
    title: { zh: 'Người đọc được núi', en: 'The One Who Reads the Mountains' }, motto: 'Chuông đồng · Chỉ son bảy đường · Nghe núi trước khi nghe lòng',
    weapon: { zh: 'Gậy chuông đồng', en: 'Bell Staff' },
    bio: {
      zh: ['Thầy mo người Mường, biết quá nhiều nên sống ngoài mọi cộng đồng; chính ông vạch bảy sợi chỉ son trên sa bàn Tràng An.',
        'Núi không giữ bí mật bằng đá, mà bằng những con đường khiến kẻ tham lam tự lạc. Chỉ tiếng chuông của ông mới đổi được đường.'],
      en: ['A Mường shaman who knows too much to live inside any village; it was he who drew the seven cinnabar threads across the Tràng An sand table.',
        'Mountains keep secrets not with stone, but with roads on which the greedy lose themselves. Only his bell can change a road mid-journey.'],
    },
    stats: { atk: 3, def: 2, speed: 3, range: 5 }, musou: { zh: 'Chuông Đồng Mở Núi', en: 'The Bronze Bell Opens the Mountain' }, accent: '#5a6ac8',
    lines: {
      intro: { zh: 'Nghe núi trước khi nghe lòng nóng. Núi đang bảo ta: chúng đến rồi.', en: 'Listen to the mountain before your hot heart. The mountain says: they are here.' },
      musouEnd: { zh: 'Chuông đã vang, đường đã đổi!', en: 'The bell has rung — the road has changed!' },
      copy: ['銅鈴開山', '七線迷蹤'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KIT,
};

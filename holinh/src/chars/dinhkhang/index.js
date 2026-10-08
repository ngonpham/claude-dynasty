// dinhkhang: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Liu Bei's twin-sword moveset on this officer's own model
// and look); model, portrait: model.js. Design token and look: holinh/DESIGN.md §3.
import { KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'dinhkhang', side: { zh: 'Hộ linh', en: 'Guardian' },
    name: { zh: 'Đinh Khang', en: 'Đinh Khang' }, courtesy: { zh: '丁康', en: 'Sông Hoàng Long' }, seal: '江龍',
    title: { zh: 'Tráng sĩ sông nước', en: 'The River Warrior' }, motto: 'Người của nước · Giữ đường sông · Dưới nước ta chọn nhịp',
    weapon: { zh: 'Đao sông, móc chèo', en: 'River Blade & Hook' },
    bio: {
      zh: ['Tráng sĩ sông nước mình đầy hình xăm, bơi lặn như rái cá; nhận tuyến đường sông, nơi không dấu chân nào ở lại.',
        'Trên bờ hắn là một thanh đao; dưới nước, mọi tiếng động tắt đi và Đinh Khang mới là người chọn nhịp.'],
      en: ['A tattooed river warrior who swims like an otter; he took the river road, where no footprint stays.',
        'On the bank he is one blade among many; under the water every sound dies, and Đinh Khang sets the rhythm.'],
    },
    stats: { atk: 3, def: 3, speed: 5, range: 2 }, musou: { zh: 'Giang Long Cuồng Lãng', en: 'Raging Wave of the River Dragon' }, accent: '#3a7ad0',
    lines: {
      intro: { zh: 'Sông là nhà của ta. Kẻ nào xuống nước, kẻ ấy thua!', en: 'The river is my home. Whoever comes into the water loses!' },
      musouEnd: { zh: 'Nước lặng thì sâu, nước giận thì cuốn!', en: 'Still water runs deep — angry water sweeps all away!' },
      copy: ['江龍狂浪', '一刀斷流'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KIT,
};

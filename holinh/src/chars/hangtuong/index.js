// hangtuong: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Lü Bu's halberd moveset on this officer's own model
// and look); model, portrait: model.js. Design token and look: holinh/DESIGN.md §3.
import { KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'hangtuong', side: { zh: 'Hộ linh', en: 'Guardian' },
    name: { zh: 'Hàng Tướng', en: 'The Yielded General' }, courtesy: { zh: '降將', en: 'Quèn Thành' }, seal: '報恩',
    title: { zh: 'Món nợ được tha chết', en: 'The Debt of a Spared Life' }, motto: 'Từng đứng phía đối địch · Được vua tha chết · Trả nợ cho đất này',
    weapon: { zh: 'Trường kích', en: 'Heavy Halberd' },
    bio: {
      zh: ['Tướng của sứ quân Quèn Thành, từng đứng phía đối địch; Đinh Bộ Lĩnh không chém kẻ đã buông gươm mà còn giao quân cho ông.',
        'Nhận tuyến đèo khó đoán nhất, ông dụ toàn bộ kỵ binh theo lá cờ vàng và một cỗ quan rỗng lên con đường chỉ đủ một ngựa.'],
      en: ['A general of the Quèn Thành warlord who once stood against the Đinh; Đinh Bộ Lĩnh did not cut down a man who had laid down his sword — he gave him troops.',
        'Given the least predictable road, the pass, he draws every rider after a yellow banner and an empty coffin up a path wide enough for one horse.'],
    },
    stats: { atk: 5, def: 4, speed: 3, range: 4 }, musou: { zh: 'Báo Ân Hỏa Lĩnh', en: 'Repaying a Life on the Burning Pass' }, accent: '#6a8a3a',
    lines: {
      intro: { zh: 'Mạng này vua đã tha một lần. Hôm nay ta trả!', en: 'My life was spared once by the king. Today I repay it!' },
      musouEnd: { zh: 'Đừng quay đầu! Quay đầu là phí lựa chọn của ta!', en: 'Don\'t look back! Looking back would waste my choice!' },
      copy: ['報恩火嶺', '一騎當關'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KIT,
};

// annhien: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Zhao Yun's spear moveset on this officer's own model
// and look); model, portrait: model.js. Design token and look: holinh/DESIGN.md §3.
import { KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'annhien', side: { zh: 'Hộ linh', en: 'Guardian' },
    name: { zh: 'An Nhiên', en: 'An Nhiên' }, courtesy: { zh: '安然', en: 'Hoa Lư' }, seal: '安然',
    title: { zh: 'Người con gái thay cha', en: 'The Daughter Who Rode in Her Father\'s Place' }, motto: 'Con gái Tả Tướng · Thay cha giữ tuyến · Hộ linh tráng sĩ',
    weapon: { zh: 'Thương', en: 'Spear' },
    bio: {
      zh: ['Con gái Tả Tướng, luyện thương từ nhỏ ngoài sân mưa; cha gạt nàng khỏi hàng ngũ hộ linh vì không dám nói chữ chết.',
        'Khi Tả Tướng mất tích, nàng trái lệnh nhận tuyến đường của cha — Dương Hoàng hậu trao thẻ: mệnh nước không hỏi trai hay gái.'],
      en: ['The Left General\'s daughter, trained with the spear since childhood in the rain of the yard; her father kept her out of the guardians\' ranks because he could not say the word death.',
        'When he vanished she took his road against orders. The Queen gave her the token: the realm does not ask whether you are a son or a daughter.'],
    },
    stats: { atk: 4, def: 3, speed: 5, range: 3 }, musou: { zh: 'Bạch Lau Phá Trận', en: 'White Reeds Break the Line' }, accent: '#d8402e',
    lines: {
      intro: { zh: 'Ta là An Nhiên, con gái Tả Tướng. Tuyến đường này, ta giữ!', en: 'I am An Nhiên, daughter of the Left General. This road is mine to hold!' },
      musouEnd: { zh: 'Mệnh nước không hỏi trai hay gái!', en: 'The realm does not ask if I am a son or a daughter!' },
      copy: ['代父出征', '白蘆破陣'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KIT,
};

// lehoan: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Liu Bei's twin-sword moveset on his own
// model and look); model, portrait: model.js.
import { LEHOAN_KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'lehoan', side: { zh: 'Nhà Đinh', en: 'Đinh' },
    name: { zh: 'Lê Hoàn', en: 'Lê Hoàn' }, courtesy: { zh: '黎桓', en: 'Ái Châu' }, seal: '十道',
    title: { zh: 'Thập Đạo Tướng Quân', en: 'General of the Ten Circuits' }, motto: 'Người Ái Châu · Song kiếm phá trận · Thập đạo tướng quân',
    weapon: { zh: 'Song kiếm', en: 'Twin Swords' },
    bio: {
      zh: ['Người Ái Châu, mồ côi từ nhỏ, khôn lớn theo Đinh Liễn, có chí khí và mưu lược.',
        'Lập nhiều chiến công trong cuộc dẹp loạn, được giao thống lĩnh mười đạo quân.'],
      en: ['An orphan of Ái Châu who grew up to serve Đinh Liễn, bold of heart and keen of mind.',
        'His deeds in the war of the warlords won him command of the ten circuits of the army.'],
    },
    stats: { atk: 3, def: 3, speed: 5, range: 3 }, musou: { zh: 'Thập Đạo Song Long', en: 'Twin Dragons of the Ten Circuits' }, accent: '#e0b040',
    lines: {
      intro: { zh: 'Lê Hoàn đất Ái Châu xin lĩnh tiên phong!', en: 'Lê Hoàn of Ái Châu takes the vanguard!' },
      musouEnd: { zh: 'Mười đạo quân, một lòng phò chúa!', en: 'Ten circuits, one heart for our lord!' },
      copy: ['雙劍破陣', '十道歸心'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: LEHOAN_KIT,
};

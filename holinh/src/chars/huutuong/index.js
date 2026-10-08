// huutuong: the officer entry (contract: src/chars/index.js header). Kit: kit.js (Guan Yu's glaive moveset on this officer's own model
// and look); model, portrait: model.js. Design token and look: holinh/DESIGN.md §3.
import { KIT } from './kit.js';
import { FACE, PAL } from './model.js';

export const CHAR = {
    id: 'huutuong', side: { zh: 'Hộ linh', en: 'Guardian' },
    name: { zh: 'Hữu Tướng', en: 'The Right General' }, courtesy: { zh: '右將', en: 'Hữu Tướng quân' }, seal: '右將',
    title: { zh: 'Người giữ trục', en: 'The One Who Holds the Line' }, motto: 'Khóa cánh trái · Không rời nhiệm vụ · Giữ thêm một khắc',
    weapon: { zh: 'Trường đao', en: 'Long Saber' },
    bio: {
      zh: ['Tướng già dày dạn, mặt đầy sẹo; từng mất vợ con trong một trận lũ khi đang ngoài chiến tuyến.',
        'Từ đó ông không rời nhiệm vụ nữa, vì sợ mọi lần quay về đều quá muộn — Nguyễn Bặc giao ông trục chỉ huy của bảy đường.'],
      en: ['A scarred old campaigner who lost his wife and children to a flood while he was away at the front.',
        'Since then he has never left his post, for fear every homecoming comes too late. Nguyễn Bặc gives him the command of the seven roads.'],
    },
    stats: { atk: 5, def: 4, speed: 3, range: 4 }, musou: { zh: 'Hữu Dực Trấn Quân', en: 'The Right Wing Holds the Army' }, accent: '#4a6aa8',
    lines: {
      intro: { zh: 'Hữu Tướng giữ cánh. Không một tên nào qua được tuyến này.', en: 'The Right General holds the flank. Not one of them gets past this line.' },
      musouEnd: { zh: 'Phía sau ta còn cả một triều đình!', en: 'Behind me stands a whole court!' },
      copy: ['右翼鎮軍', '寸步不退'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: KIT,
};

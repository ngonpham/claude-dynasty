// dinhbolinh: the officer entry (contract: src/chars/index.js header). PLACEHOLDER kit and portrait: the engine's
// ZHAOYUN_KIT until this officer's own model / kit lands in this folder (model.js, kit.js).
import { ZHAOYUN_KIT } from '../../../../src/chars/zhaoyun/kit.js';
import { FACE, PAL } from '../../../../src/chars/liubei/model.js';

export const CHAR = {
    id: 'dinhbolinh', side: { zh: 'Nhà Đinh', en: 'Đinh' },
    name: { zh: 'Đinh Bộ Lĩnh', en: 'Đinh Bộ Lĩnh' }, courtesy: { zh: '丁部領', en: 'Hoa Lư' }, seal: '萬勝',
    title: { zh: 'Vạn Thắng Vương', en: 'The King of Ten Thousand Victories' }, motto: 'Cờ lau tập trận · Vạn Thắng Vương · Thống nhất sơn hà',
    weapon: { zh: 'Thương cờ lau', en: 'Reed-Banner Spear' },
    bio: {
      zh: ['Người động Hoa Lư, thuở nhỏ chăn trâu, lấy bông lau làm cờ, được lũ trẻ tôn làm chủ tướng.',
        'Theo sứ quân Trần Lãm ở Bố Hải Khẩu, lần lượt dẹp yên mười hai sứ quân, được tôn là Vạn Thắng Vương.'],
      en: ['A buffalo-herd of Hoa Lư who led the village boys in mock battles under banners of reed flowers.',
        'Heir to the warlord Trần Lãm, he brought the twelve warlords down one by one and was hailed King of Ten Thousand Victories.'],
    },
    stats: { atk: 4, def: 3, speed: 5, range: 3 }, musou: { zh: 'Cờ Lau Vạn Thắng', en: 'Reed Banner of Ten Thousand Victories' }, accent: '#e0452c',
    lines: {
      intro: { zh: 'Ta là Đinh Bộ Lĩnh đất Hoa Lư! Kẻ nào dám cản đường thống nhất?', en: 'I am Đinh Bộ Lĩnh of Hoa Lư! Who dares stand in the way of one realm?' },
      musouEnd: { zh: 'Mười hai sứ quân, rồi cũng về một mối!', en: 'Twelve warlords — and all of them will come under one banner!' },
      copy: ['旗蘆所指', '萬勝歸一'],
    },
    portrait: { face: FACE, pal: PAL },
    kit: ZHAOYUN_KIT,
};

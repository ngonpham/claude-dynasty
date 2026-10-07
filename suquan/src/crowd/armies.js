// Armies of 十二使君 (overlay of src/crowd/armies.js: same contract, read that header for every key). The base soldier /
// officer palettes are the engine's (GRUNT / OFFICER, re-exported); the factions are the Đinh host and the warlords
// it brings to heel, 944–968. Officer `look.helm`: 'wing' | 'horn' | 'crest' | 'cap' (crowd/view.js).
// Look notes (10th-century Giao Châu, game-stylised): lacquered rattan / buffalo-hide lamellar instead of iron, cloth
// head-wraps (khăn) read through the helmet colours, bare tanned forearms, red / ochre / indigo dyes.
//   dinh    Đinh host (ally everywhere): oxblood lamellar, crimson coats and head-wraps, straw-gold tassels (cờ lau)
//   ngo     the Ngô court army of Nam Tấn Vương (ch. I): black lacquer, imperial ochre-yellow, gold rivets
//   nguyen  Nguyễn Siêu of Tây Phù Liệt (ch. II): river indigo, steel-blue, white tassels
//   do      Đỗ Cảnh Thạc of Đỗ Động Giang (ch. III): soot-black lacquer, violet dye, bronze
//   kieu    Kiều Công Hãn of Phong Châu (ch. IV): forest jade, bronze-green, red tassels
import { GRUNT, OFFICER, palette as basePalette } from 'engine/crowd/armies.js';

export { GRUNT, OFFICER };
export const palette = basePalette;

const SKIN = { skin: 0xc8916a, skinD: 0xa0704e };

export const ARMIES = {
  dinh: {
    name: { zh: 'Quân Đinh', en: 'Đinh Army' }, glyph: '丁', flag: '#a3261a', ink: '#f2d68a', ui: '#ff7a4e', glow: [0.22, 0.04, 0, 0],
    grunt: {
      ...SKIN, armor: 0x4a2a20, hi: 0x7a4a36, lace: 0x1e100c, plate: 0x5e3426, rivet: 0xc89a50, cloth: 0x8e2418, pants: 0x3a2a22,
      wrap: 0xb09868, wrapD: 0x6a5a40, boot: 0x2a1c14, helm: 0x6e1c14, helmHi: 0xb04a30, band: 0xd8301c, belt: 0x3c2418,
      buckle: 0xc8a050, bracer: 0x3a2418, tassel: 0xe0c070, crest: 0xe0c070, weapon: 0xb02a1a, shield: [0x8a2a18, 0x5a1a10, 0x76241a],
    },
    officer: {
      ...SKIN, armor: 0x5a1e16, hi: 0xa04a34, lace: 0x200a08, plate: 0x7a2a1c, rivet: 0xf0c860, cloth: 0xa82a1a, pants: 0x2e1e18,
      wrap: 0x6a4a30, wrapD: 0x3a2a1c, helm: 0x4a140e, helmHi: 0xe8c060, band: 0xd8301c, belt: 0x5a3a18, buckle: 0xf0c860,
      cape: [0x6a160e, 0xb02a1a], plume: 0xf0d080,
    },
    officers: [
      { zh: 'Đinh Điền', en: 'ĐINH ĐIỀN', look: { helm: 'crest', armor: 0x5a1e16, trim: 0xf0c860, cape: 0x8a2018, plume: 0xf0d080 } },
      { zh: 'Trịnh Tú', en: 'TRỊNH TÚ' },
      { zh: 'Lưu Cơ', en: 'LƯU CƠ', look: { helm: 'cap', armor: 0x4a2a20, trim: 0xd8b060, cape: 0x6a2a1a } },
      { zh: 'Phạm Hạp', en: 'PHẠM HẠP', look: { helm: 'horn', armor: 0x3e2018, trim: 0xc89a50, cape: 0x7a1e14, plume: 0xe0c070 } },
    ],
  },
  ngo: {
    name: { zh: 'Quân nhà Ngô', en: 'Ngô Court Army' }, glyph: '吳', flag: '#c99a1e', ink: '#2a1606', ui: '#f2d64a', glow: [0.16, 0.12, 0, 0],
    grunt: {
      ...SKIN, armor: 0x2a2420, hi: 0x5c5040, lace: 0x100c08, plate: 0x3a3228, rivet: 0xd0a848, cloth: 0xb08a22, pants: 0x2e2820,
      wrap: 0x9a8a60, wrapD: 0x5c5038, boot: 0x1c1610, helm: 0x2e2620, helmHi: 0xc8a040, band: 0xe0b428, belt: 0x2a2018,
      buckle: 0xd8b050, bracer: 0x2a2218, tassel: 0xf0c830, crest: 0xe0b428, weapon: 0xc89a20, shield: [0xb08a1c, 0x2a2016, 0x8a6c18],
    },
    officer: {
      ...SKIN, armor: 0x1a1612, hi: 0x6a5838, lace: 0x0a0806, plate: 0x2a241a, rivet: 0xf0c860, cloth: 0xc89a1e, pants: 0x1e1a14,
      wrap: 0x3a3226, wrapD: 0x1e1a14, helm: 0x16120e, helmHi: 0xf0c860, band: 0xe0b428, belt: 0x5a4418, buckle: 0xf0d070,
      cape: [0x7a5a10, 0xd0a020], plume: 0xf0e0a0,
    },
    officers: [
      { zh: 'Lã Xử Bình', en: 'LÃ XỬ BÌNH', look: { helm: 'horn', armor: 0x221c16, trim: 0xf0c860, cape: 0x8a6a14, plume: 0xe0b428 } },
      { zh: 'Kiều Tri Hựu', en: 'KIỀU TRI HỰU', look: { helm: 'crest', armor: 0x2a2218, trim: 0xd8b050, cape: 0x6a5010, plume: 0xf0e0a0 } },
      { zh: 'Ngự lâm tướng', en: 'GUARD GENERAL' },
      { zh: 'Quân sư nhà Ngô', en: 'NGÔ STRATEGIST', look: { helm: 'cap', armor: 0x1e1a14, trim: 0xf0c860, cape: 0x5a4410 } },
    ],
  },
  nguyen: {
    name: { zh: 'Quân Nguyễn Siêu', en: "Nguyễn Siêu's Army" }, glyph: '阮', flag: '#24488a', ink: '#f0e6c8', ui: '#6aa8ff', glow: [0, 0, 0.34, 0],
    grunt: {
      ...SKIN, armor: 0x26303e, hi: 0x5a6a80, lace: 0x0e121a, plate: 0x344256, rivet: 0xa8b0bc, cloth: 0x223a6e, pants: 0x262c38,
      wrap: 0x8a8e98, wrapD: 0x50545e, boot: 0x1a1c22, helm: 0x22304a, helmHi: 0x8a9ab0, band: 0x2e6ad8, belt: 0x22242c,
      buckle: 0xb8a868, bracer: 0x20283a, tassel: 0xe8eef6, crest: 0x2e6ad8, weapon: 0x2a5ac0, shield: [0x24447e, 0x16284e, 0x1e3868],
    },
    officer: {
      ...SKIN, armor: 0x1a2236, hi: 0x5a72a8, lace: 0x0a0e1a, plate: 0x283a62, rivet: 0xe0e6ee, cloth: 0x1c2e62, pants: 0x1a1e2e,
      wrap: 0x2c3654, wrapD: 0x1a1e2e, helm: 0x182238, helmHi: 0xe0e6ee, band: 0x2e6ad8, belt: 0x4a4430, buckle: 0xe0d090,
      cape: [0x101a40, 0x24408c], plume: 0xf0f4fa,
    },
    officers: [
      { zh: 'Thủy quân đô úy', en: 'RIVER CAPTAIN', look: { helm: 'crest', armor: 0x1a2236, trim: 0xe0e6ee, cape: 0x24408c, plume: 0xf0f4fa } },
      { zh: 'Tả hiệu úy', en: 'LEFT COMMANDER' },
      { zh: 'Hữu hiệu úy', en: 'RIGHT COMMANDER', look: { helm: 'horn', armor: 0x22283a, trim: 0xa8b0bc, cape: 0x1c2e62, plume: 0x2e6ad8 } },
      { zh: 'Mưu sĩ Tây Phù Liệt', en: 'WARLORD ADVISOR', look: { helm: 'cap', armor: 0x1e2636, trim: 0xc0c8d4, cape: 0x1a2a50 } },
    ],
  },
  do: {
    name: { zh: 'Quân Đỗ Cảnh Thạc', en: "Đỗ Cảnh Thạc's Army" }, glyph: '杜', flag: '#4a1f66', ink: '#f0d58a', ui: '#c080ff', glow: [0, 0, 0, 0.36],
    grunt: {
      ...SKIN, armor: 0x201c22, hi: 0x4c4254, lace: 0x0c0a0e, plate: 0x2e2834, rivet: 0xb08a48, cloth: 0x3c1a50, pants: 0x221c26,
      wrap: 0x685c68, wrapD: 0x3a323e, boot: 0x181418, helm: 0x26222a, helmHi: 0x9a7c48, band: 0x7a2aa8, belt: 0x2a1e22,
      buckle: 0xc09a48, bracer: 0x241c2a, tassel: 0x9a40d0, crest: 0x8030b0, weapon: 0x6a2490, shield: [0x481e60, 0x1a1420, 0x381a4c],
    },
    officer: {
      ...SKIN, armor: 0x141018, hi: 0x644e88, lace: 0x08060a, plate: 0x241e2e, rivet: 0xe0b450, cloth: 0x581e7e, pants: 0x1a1420,
      wrap: 0x382c44, wrapD: 0x1a1420, helm: 0x16121a, helmHi: 0xd8b050, band: 0x7a2aa8, belt: 0x583a1c, buckle: 0xf0c860,
      cape: [0x280c3a, 0x542078], plume: 0xa040e0,
    },
    officers: [
      { zh: 'Tiên phong Đỗ Động', en: 'ĐỖ ĐỘNG VANGUARD', look: { helm: 'horn', armor: 0x28181e, trim: 0xe0b450, cape: 0x6a1830, plume: 0x9a2ad0 } },
      { zh: 'Giữ đồn Đỗ Động', en: 'STOCKADE KEEPER' },
      { zh: 'Kỵ tướng Đỗ Động', en: 'ĐỖ ĐỘNG RIDER', look: { helm: 'crest', armor: 0x2c2036, trim: 0xb88a48, cape: 0x381a4e, plume: 0xc060f0 } },
      { zh: 'Mưu sĩ Đỗ Động', en: 'ĐỖ ĐỘNG ADVISOR', look: { helm: 'cap', armor: 0x1c1822, trim: 0xd0b060, cape: 0x2a1a38 } },
    ],
  },
  kieu: {
    name: { zh: 'Quân Kiều Công Hãn', en: "Kiều Công Hãn's Army" }, glyph: '矯', flag: '#2a6a46', ink: '#f2e6c8', ui: '#60e0a0', glow: [0, 0.14, 0, 0],
    grunt: {
      ...SKIN, armor: 0x2c3628, hi: 0x5a7254, lace: 0x101810, plate: 0x3c4c38, rivet: 0xb89a50, cloth: 0x2a5e3a, pants: 0x2c3428,
      wrap: 0x8a8a66, wrapD: 0x52523c, boot: 0x1e1c16, helm: 0x30402e, helmHi: 0x8a9a74, band: 0x2a8a4a, belt: 0x2a2a1c,
      buckle: 0xc0a050, bracer: 0x283424, tassel: 0xc8301e, crest: 0xc8301e, weapon: 0x2a7040, shield: [0x2a5a38, 0x182e1e, 0x22482e],
    },
    officer: {
      ...SKIN, armor: 0x1e3424, hi: 0x5e8c62, lace: 0x0c180e, plate: 0x2e5236, rivet: 0xe0b450, cloth: 0x1e5230, pants: 0x1e2c1c,
      wrap: 0x364a30, wrapD: 0x1e2c1c, helm: 0x1c3020, helmHi: 0xe0b450, band: 0x2a8a4a, belt: 0x5a4418, buckle: 0xf0c860,
      cape: [0x143a22, 0x2a6a40], plume: 0xd8402a,
    },
    officers: [
      { zh: 'Kiều Thuận', en: 'KIỀU THUẬN', look: { helm: 'horn', armor: 0x1e3424, trim: 0xe0b450, cape: 0x2a6a40, plume: 0xd8402a } },
      { zh: 'Nguyễn Khoan', en: 'NGUYỄN KHOAN', look: { helm: 'crest', armor: 0x243828, trim: 0xc0a050, cape: 0x1e4a2c, plume: 0xf0e0b0 } },
      { zh: 'Giữ ải Phong Châu', en: 'PASS KEEPER' },
      { zh: 'Mưu sĩ Phong Châu', en: 'PHONG CHÂU ADVISOR', look: { helm: 'cap', armor: 0x1e2c1c, trim: 0xe0b450, cape: 0x1e4a2c } },
    ],
  },
};

/** Free mode's pair (ids): the Ngô court army against the Đinh host (maps with no chapter of their own). */
export const FREE_ARMY = { foe: 'ngo', ally: 'dinh' };
/** { foe, ally } ids → { foe, ally } army objects (game.army). */
export const armyPair = (ids) => ({ foe: ARMIES[ids.foe], ally: ARMIES[ids.ally] });

// Armies of 護靈壯士 (overlay of src/crowd/armies.js: same contract, read that header for every key). The base soldier /
// officer palettes are the engine's (GRUNT / OFFICER, re-exported); the factions are the Đinh host, the guardians'
// escort and the four hosts that hunt the coffins (holinh/DESIGN.md §5). Officer `look.helm`: 'wing' | 'horn' | 'crest' |
// 'cap' (crowd/view.js). Grunt `headgear`: 'wrap' (cloth head-wrap) | 'hat' (conical hat) | none (a helmet).
// Look notes (late 10th-century Đại Cồ Việt, game-stylised as in 十二使君): lacquered rattan / buffalo-hide lamellar,
// head-wraps, bare tanned forearms; the hunters wear black iron scale and the traitor's palace violet.
//   dinh        the Đinh host (ally, Màn I): oxblood lamellar, crimson coats, straw-gold reed tassels
//   holinh      the guardians' escort and the loyal palace guard (ally, Màn II–VI): black lacquer, cinnabar, white reed tassels
//   suquan      the warlord host of Quèn Thành (Màn I): weathered green-brown, rust, bone-white tassels, conical hats
//   thichkhach  the night raiders in the palace (Màn II): soot-black, ash-grey, dark teal, masked head-wraps
//   truysat     the hunters, the traitor's hired riders (Màn III–V): black iron scale, violet
//   phanthan    the traitor's host on the forty-ninth day (Màn VI): palace violet, black iron, gold trim
import { GRUNT, OFFICER, palette as basePalette } from 'engine/crowd/armies.js';

export { GRUNT, OFFICER };
export const palette = basePalette;

const SKIN = { skin: 0xc8916a, skinD: 0xa0704e };

export const ARMIES = {
  dinh: {
    name: { zh: 'Quân Đinh', en: 'Đinh Army' }, glyph: '丁', flag: '#a3261a', ink: '#f2d68a', ui: '#ff7a4e', glow: [0.22, 0.04, 0, 0],
    grunt: {
      ...SKIN, armor: 0x4a2a20, hi: 0x7a4a36, lace: 0x1e100c, plate: 0x5e3426, rivet: 0xc89a50, cloth: 0x8e2418, pants: 0x3a2a22,
      wrap: 0xb09868, wrapD: 0x6a5a40, boot: 0x5a3a26, helm: 0x9a2418, helmHi: 0xc4462c, band: 0x3a1a10, belt: 0x3c2418, headgear: 'wrap',
      buckle: 0xc8a050, bracer: 0x3a2418, tassel: 0xe0c070, crest: 0xe0c070, weapon: 0xb02a1a, shield: [0x8a2a18, 0x5a1a10, 0x76241a],
    },
    officer: {
      ...SKIN, armor: 0x5a1e16, hi: 0xa04a34, lace: 0x200a08, plate: 0x7a2a1c, rivet: 0xf0c860, cloth: 0xa82a1a, pants: 0x2e1e18,
      wrap: 0x6a4a30, wrapD: 0x3a2a1c, helm: 0x4a140e, helmHi: 0xe8c060, band: 0xd8301c, belt: 0x5a3a18, buckle: 0xf0c860,
      cape: [0x6a160e, 0xb02a1a], plume: 0xf0d080,
    },
    officers: [
      { zh: 'Tì tướng nhà Đinh', en: 'ĐINH CAPTAIN', look: { helm: 'crest', armor: 0x5a1e16, trim: 0xf0c860, cape: 0x8a2018, plume: 0xf0d080 } },
      { zh: 'Đội trưởng cờ lau', en: 'REED-BANNER CAPTAIN' },
      { zh: 'Giáo úy nhà Đinh', en: 'ĐINH LIEUTENANT', look: { helm: 'cap', armor: 0x4a2a20, trim: 0xd8b060, cape: 0x6a2a1a } },
      { zh: 'Tiên phong nhà Đinh', en: 'ĐINH VANGUARD', look: { helm: 'horn', armor: 0x3e2018, trim: 0xc89a50, cape: 0x7a1e14, plume: 0xe0c070 } },
    ],
  },
  holinh: {
    name: { zh: 'Quân hộ linh', en: 'The Guardians\' Escort' }, glyph: '護', flag: '#1c1412', ink: '#e8402e', ui: '#ff6a52', glow: [0.2, 0.02, 0, 0],
    grunt: {
      ...SKIN, armor: 0x221a18, hi: 0x4e3a34, lace: 0x0e0a08, plate: 0x2e2420, rivet: 0xc89a50, cloth: 0xa82a1e, pants: 0x241c1a,
      wrap: 0xcfc4a8, wrapD: 0x8a806a, boot: 0x2a1e18, helm: 0x1a1412, helmHi: 0xc0382a, band: 0xb82a1e, belt: 0x1e1612, headgear: 'wrap',
      buckle: 0xc8a050, bracer: 0x1e1612, tassel: 0xf0ece0, crest: 0xf0ece0, weapon: 0xb02a1a, shield: [0x1e1614, 0x8a2216, 0x2a1e1a],
    },
    officer: {
      ...SKIN, armor: 0x16100e, hi: 0x5a3a30, lace: 0x0a0606, plate: 0x241a16, rivet: 0xe8c060, cloth: 0xb82a1e, pants: 0x1a1412,
      wrap: 0x3a2a24, wrapD: 0x1a1412, helm: 0x120c0a, helmHi: 0xe8c060, band: 0xd8301c, belt: 0x4a3018, buckle: 0xf0c860,
      cape: [0x1a0e0c, 0xa82a1e], plume: 0xf4f0e4,
    },
    officers: [
      { zh: 'Đội trưởng hộ linh', en: 'ESCORT CAPTAIN', look: { helm: 'crest', armor: 0x16100e, trim: 0xe8c060, cape: 0xa82a1e, plume: 0xf4f0e4 } },
      { zh: 'Cấm vệ Hoa Lư', en: 'HOA LƯ GUARD' },
      { zh: 'Giáo úy hộ linh', en: 'ESCORT LIEUTENANT', look: { helm: 'cap', armor: 0x1e1614, trim: 0xd8b060, cape: 0x6a1a12 } },
      { zh: 'Người khiêng quan', en: 'BEARER CHIEF', look: { helm: 'horn', armor: 0x221a18, trim: 0xc89a50, cape: 0x3a2a24, plume: 0xf0ece0 } },
    ],
  },
  suquan: {
    name: { zh: 'Quân sứ quân Quèn Thành', en: 'The Quèn Thành Warlord\'s Host' }, glyph: '雄', flag: '#4e5a2e', ink: '#ece2c4', ui: '#b8d070', glow: [0.06, 0.1, 0, 0],
    grunt: {
      ...SKIN, armor: 0x3a3424, hi: 0x6a6040, lace: 0x16140c, plate: 0x4a4430, rivet: 0xa88a4a, cloth: 0x52602e, pants: 0x34301e,
      wrap: 0x9a8e6a, wrapD: 0x5c5440, boot: 0x3a2e1c, helm: 0xb09a62, helmHi: 0xd2bc84, band: 0x8a3a1e, belt: 0x2a2416, headgear: 'hat',
      buckle: 0xb09a58, bracer: 0x2e2a1a, tassel: 0xe6dcc0, crest: 0x8a3a1e, weapon: 0x6a5a2a, shield: [0x4a5228, 0x2a2a16, 0x5e5a30],
    },
    officer: {
      ...SKIN, armor: 0x2e3220, hi: 0x6e7a48, lace: 0x10120a, plate: 0x3e4a2a, rivet: 0xd0a850, cloth: 0x4a5a28, pants: 0x262a1a,
      wrap: 0x4a4a30, wrapD: 0x262a1a, helm: 0x2a2e1c, helmHi: 0xd0a850, band: 0x8a3a1e, belt: 0x5a4418, buckle: 0xe0c060,
      cape: [0x2a3216, 0x5a6a2e], plume: 0xe6dcc0,
    },
    officers: [
      { zh: 'Tướng giữ trại', en: 'STOCKADE KEEPER', look: { helm: 'horn', armor: 0x2e3220, trim: 0xd0a850, cape: 0x5a6a2e, plume: 0xe6dcc0 } },
      { zh: 'Kỵ tướng Quèn Thành', en: 'QUÈN THÀNH RIDER' },
      { zh: 'Đội trưởng cầm cờ', en: 'BANNER CAPTAIN', look: { helm: 'crest', armor: 0x34381e, trim: 0xb89a48, cape: 0x6a3a1a, plume: 0x8a3a1e } },
      { zh: 'Mưu sĩ sứ quân', en: 'WARLORD ADVISOR', look: { helm: 'cap', armor: 0x262a1a, trim: 0xd0b060, cape: 0x3a4220 } },
    ],
  },
  thichkhach: {
    name: { zh: 'Bọn thích khách', en: 'The Night Raiders' }, glyph: '影', flag: '#1a1e22', ink: '#8ab8b4', ui: '#7ad8d0', glow: [0, 0.08, 0.1, 0],
    grunt: {
      ...SKIN, armor: 0x1a1c1e, hi: 0x3e4448, lace: 0x080a0a, plate: 0x24282a, rivet: 0x6a7a78, cloth: 0x223a3c, pants: 0x18191a,
      wrap: 0x2a2e30, wrapD: 0x16181a, boot: 0x101112, helm: 0x1c1e20, helmHi: 0x4a5a5a, band: 0x1e3a3c, belt: 0x141516, headgear: 'wrap',
      buckle: 0x6a7a78, bracer: 0x16181a, tassel: 0x3a6a6a, crest: 0x2a5a5a, weapon: 0x2a3a3c, shield: [0x1a1e20, 0x0e1012, 0x223032],
    },
    officer: {
      ...SKIN, armor: 0x101214, hi: 0x3a4a4c, lace: 0x060708, plate: 0x1c2224, rivet: 0x9ab8b4, cloth: 0x1a3436, pants: 0x121314,
      wrap: 0x1e2224, wrapD: 0x0e1012, helm: 0x0e1012, helmHi: 0x7a9a98, band: 0x2a5a5a, belt: 0x22262a, buckle: 0x9ab8b4,
      cape: [0x0a0c0e, 0x1e3436], plume: 0x6a9a98,
    },
    officers: [
      { zh: 'Thủ lĩnh bóng đêm', en: 'NIGHT LEADER', look: { helm: 'crest', armor: 0x101214, trim: 0x9ab8b4, cape: 0x1e3436, plume: 0x6a9a98 } },
      { zh: 'Thích khách mặt nạ', en: 'MASKED RAIDER' },
      { zh: 'Kẻ mở cửa ngầm', en: 'THE DOOR-OPENER', look: { helm: 'cap', armor: 0x16181a, trim: 0x6a7a78, cape: 0x16181a } },
      { zh: 'Cung thủ mái điện', en: 'ROOFTOP ARCHER', look: { helm: 'horn', armor: 0x1a1c1e, trim: 0x7a9a98, cape: 0x223a3c, plume: 0x3a6a6a } },
    ],
  },
  truysat: {
    name: { zh: 'Quân truy sát', en: 'The Hunters' }, glyph: '追', flag: '#3a1e4e', ink: '#d8c8a0', ui: '#b07ae8', glow: [0, 0, 0.06, 0.3],
    grunt: {
      ...SKIN, armor: 0x24222a, hi: 0x4c4858, lace: 0x0c0a0e, plate: 0x302c38, rivet: 0x8a8296, cloth: 0x3e2256, pants: 0x201e26,
      wrap: 0x5a5466, wrapD: 0x34303c, boot: 0x16141a, helm: 0x24222c, helmHi: 0x6a6280, band: 0x5a2a80, belt: 0x1e1a22,
      buckle: 0xa89ab0, bracer: 0x1e1c24, tassel: 0x7a40b0, crest: 0x6a30a0, weapon: 0x4a2a70, shield: [0x2e2440, 0x16141c, 0x3a2a50],
    },
    officer: {
      ...SKIN, armor: 0x18161e, hi: 0x5a5070, lace: 0x08070a, plate: 0x262232, rivet: 0xd0c0e0, cloth: 0x4a1e6e, pants: 0x18161c,
      wrap: 0x2e2a36, wrapD: 0x18161c, helm: 0x141218, helmHi: 0xb8a8d0, band: 0x7a30b0, belt: 0x3a2a40, buckle: 0xd0c0e0,
      cape: [0x1e0c2e, 0x4a1e6e], plume: 0x9a50e0,
    },
    officers: [
      { zh: 'Kỵ tướng truy sát', en: 'HUNTER RIDER', look: { helm: 'crest', armor: 0x18161e, trim: 0xd0c0e0, cape: 0x4a1e6e, plume: 0x9a50e0 } },
      { zh: 'Đội trưởng phục binh', en: 'AMBUSH CAPTAIN' },
      { zh: 'Cung thủ trên đèo', en: 'RIDGE ARCHER', look: { helm: 'horn', armor: 0x1e1c24, trim: 0xa89ab0, cape: 0x3e2256, plume: 0x7a40b0 } },
      { zh: 'Kẻ dò dấu', en: 'THE TRACKER', look: { helm: 'cap', armor: 0x201e26, trim: 0x8a8296, cape: 0x2e2440 } },
    ],
  },
  phanthan: {
    name: { zh: 'Quân phản thần', en: 'The Traitor\'s Host' }, glyph: '宦', flag: '#4a1a5e', ink: '#f0d27a', ui: '#d08aff', glow: [0.08, 0, 0.04, 0.34],
    grunt: {
      ...SKIN, armor: 0x221c26, hi: 0x4e4258, lace: 0x0c080e, plate: 0x2e2636, rivet: 0xc0a050, cloth: 0x5a2478, pants: 0x221c28,
      wrap: 0x6a5a74, wrapD: 0x3a3042, boot: 0x18141c, helm: 0x241c2c, helmHi: 0xc0a050, band: 0x7a2aa8, belt: 0x2a1e2e,
      buckle: 0xd0b060, bracer: 0x221a28, tassel: 0x9a48d0, crest: 0xd0b060, weapon: 0x6a2a90, shield: [0x4a1e62, 0x1a1420, 0x5a2a74],
    },
    officer: {
      ...SKIN, armor: 0x16101a, hi: 0x6a4e84, lace: 0x08060a, plate: 0x261c30, rivet: 0xf0c860, cloth: 0x6a2490, pants: 0x18121c,
      wrap: 0x382a44, wrapD: 0x18121c, helm: 0x140e18, helmHi: 0xf0c860, band: 0x8a30c0, belt: 0x5a3a1c, buckle: 0xf0c860,
      cape: [0x2a0c3a, 0x6a2490], plume: 0xb060f0,
    },
    officers: [
      { zh: 'Tướng phản thần', en: 'TRAITOR GENERAL', look: { helm: 'horn', armor: 0x16101a, trim: 0xf0c860, cape: 0x6a2490, plume: 0xb060f0 } },
      { zh: 'Cấm quân trở giáo', en: 'TURNCOAT GUARD' },
      { zh: 'Kỵ tướng phương Bắc', en: 'NORTHERN RIDER', look: { helm: 'crest', armor: 0x221a2a, trim: 0xd0b060, cape: 0x3a1a4e, plume: 0x9a48d0 } },
      { zh: 'Mưu sĩ nội cung', en: 'PALACE SCHEMER', look: { helm: 'cap', armor: 0x1a141e, trim: 0xf0c860, cape: 0x4a1e62 } },
    ],
  },
};

/** Free mode's pair (ids) on maps with no stage of their own: the hunters against the guardians' escort. */
export const FREE_ARMY = { foe: 'truysat', ally: 'holinh' };
/** { foe, ally } ids → { foe, ally } army objects (game.army). */
export const armyPair = (ids) => ({ foe: ARMIES[ids.foe], ally: ARMIES[ids.ally] });

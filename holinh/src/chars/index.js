// 護靈壯士 officer registry (overlay of src/chars/index.js: same exports, same CHARS entry / kit contract — read that
// header). Each officer lives in his / her own folder, holinh/src/chars/<id>/index.js → export const CHAR (metadata +
// kit); this file only assembles them, so officers are added / reworked without touching each other.
// Text convention of this game: name / title / weapon / bio / lines .zh carry VIETNAMESE (the headline text), .en
// English; seal and lines.copy stay Hán (red seal, vertical calligraphy); courtesy = { zh: the Hán name, en: home }.
// Roster and looks: holinh/DESIGN.md §3.
import { CHAR as ANNHIEN } from './annhien/index.js';
import { CHAR as NGUYENPHONG } from './nguyenphong/index.js';
import { CHAR as DINHKHANG } from './dinhkhang/index.js';
import { CHAR as HUUTUONG } from './huutuong/index.js';
import { CHAR as TATUONG } from './tatuong/index.js';
import { CHAR as THAYMO } from './thaymo/index.js';
import { CHAR as HANGTUONG } from './hangtuong/index.js';

export const CHARS = { annhien: ANNHIEN, nguyenphong: NGUYENPHONG, dinhkhang: DINHKHANG, huutuong: HUUTUONG, tatuong: TATUONG, thaymo: THAYMO, hangtuong: HANGTUONG };
/** The officer a battle falls back to when none (or an unknown id) is given. */
export const DEFAULT_CHAR = 'annhien';
export const CHAR_ORDER = ['annhien', 'nguyenphong', 'dinhkhang', 'huutuong', 'tatuong', 'thaymo', 'hangtuong'].filter((id) => CHARS[id]);

/** Paint a char's 20×20 portrait into a canvas (width/height 20; scale it with CSS, image-rendering: pixelated). */
export function paintPortrait(cv, char) {
  const g = cv.getContext('2d'), { face, pal } = char.portrait;
  g.clearRect(0, 0, cv.width, cv.height);
  face.forEach((row, y) => [...row].forEach((ch, x) => { if (pal[ch]) { g.fillStyle = pal[ch]; g.fillRect(x, y, 1, 1); } }));
}

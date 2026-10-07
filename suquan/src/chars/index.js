// 十二使君 officer registry (overlay of src/chars/index.js: same exports, same CHARS entry / kit contract — read that
// header). Each officer lives in his own folder, suquan/src/chars/<id>/index.js → export const CHAR (metadata + kit);
// this file only assembles them, so officers are added / reworked without touching each other.
// Text convention of this game: name / title / weapon / bio / lines .zh carry VIETNAMESE (the headline text), .en
// English; seal and lines.copy stay Hán (red seal, vertical calligraphy); courtesy = { zh: the Hán name, en: home }.
import { CHAR as DINHBOLINH } from './dinhbolinh/index.js';
import { CHAR as NGUYENBAC } from './nguyenbac/index.js';
import { CHAR as LEHOAN } from './lehoan/index.js';
import { CHAR as DINHLIEN } from './dinhlien/index.js';
import { CHAR as PHAMBACHHO } from './phambachho/index.js';
import { CHAR as KHUONGVIET } from './khuongviet/index.js';
import { CHAR as DOCANHTHAC } from './docanhthac/index.js';

export const CHARS = { dinhbolinh: DINHBOLINH, nguyenbac: NGUYENBAC, lehoan: LEHOAN, dinhlien: DINHLIEN, phambachho: PHAMBACHHO, khuongviet: KHUONGVIET, docanhthac: DOCANHTHAC };
/** The officer a battle falls back to when none (or an unknown id) is given. */
export const DEFAULT_CHAR = 'dinhbolinh';
export const CHAR_ORDER = ['dinhbolinh', 'nguyenbac', 'lehoan', 'dinhlien', 'phambachho', 'khuongviet', 'docanhthac'].filter((id) => CHARS[id]);

/** Paint a char's 20×20 portrait into a canvas (width/height 20; scale it with CSS, image-rendering: pixelated). */
export function paintPortrait(cv, char) {
  const g = cv.getContext('2d'), { face, pal } = char.portrait;
  g.clearRect(0, 0, cv.width, cv.height);
  face.forEach((row, y) => [...row].forEach((ch, x) => { if (pal[ch]) { g.fillStyle = pal[ch]; g.fillRect(x, y, 1, 1); } }));
}

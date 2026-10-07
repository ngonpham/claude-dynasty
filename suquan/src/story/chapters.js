// 十二使君 campaign registry (overlay of src/story/chapters.js: same exports CHAPTERS / chapter / chapterOpen, same
// chapter format — read that header for CH / SPK / OFF / BEATS / PROLOGUE / PL_MAP / EPILOGUE).
// Text convention: every { zh, en } pair carries VIETNAMESE in .zh (the line the HUD / screens lead with) and English
// in .en; seals and PROLOGUE cols stay Hán (red seals, vertical brush columns), each card's `vi` is its Vietnamese prose.
// Campaign (historical order, 951 → 968):
//   I   hoalu       Hoa Lư (951)          the Ngô court army besieges the karst citadel; Đinh Liễn held hostage
//   II  tayphuliet  Tây Phù Liệt (≈966)   storm Nguyễn Siêu's river fort, catch him at the crossing
//   III dodong      Đỗ Động Giang (≈967)  the long siege of Đỗ Cảnh Thạc's stockades; the duel
//   IV  phongchau   Phong Châu (967-968)  Kiều Công Hãn at the confluence; the realm is one: Đại Cồ Việt
import * as hoalu from './hoalu.js';
import * as tayphuliet from './tayphuliet.js';
import * as dodong from './dodong.js';
import * as phongchau from './phongchau.js';
import { TRIALS } from '../../../src/story/trials.js';
import { cleared } from '../../../src/core/progress.js';

export const CHAPTERS = [hoalu, tayphuliet, dodong, phongchau];
/** Chapter or trial module by id (unknown / missing id = the first chapter). */
export const chapter = (id) => CHAPTERS.find((m) => m.CH.id === id) || TRIALS.find((m) => m.CH.id === id) || CHAPTERS[0];
/** Chapter i (index into CHAPTERS) is playable: the first always, the others once the one before is cleared. */
export const chapterOpen = (i) => i === 0 || !!cleared(CHAPTERS[i - 1].CH.id);

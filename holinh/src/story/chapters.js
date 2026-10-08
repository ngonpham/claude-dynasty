// 護靈壯士 campaign registry (overlay of src/story/chapters.js: same exports CHAPTERS / chapter / chapterOpen, same
// chapter format — read that header for CH / SPK / OFF / BEATS / PROLOGUE / PL_MAP / EPILOGUE).
// Text convention: every { zh, en } pair carries VIETNAMESE in .zh (the line the HUD / screens lead with) and English
// in .en; seals and PROLOGUE cols stay Hán (red seals, vertical brush columns), each card's `vi` is its Vietnamese prose.
// Campaign (holinh/DESIGN.md §6), adapted from the comic «Hộ Linh Tráng Sĩ: Bí Ẩn Mộ Vua Đinh»:
//   I   quenthanh  Cờ Lau Qua Quèn Thành (c. 967)   the reed banner breaks the warlord's valley; the rival general spared
//   II  demhoalu   Đêm Vỡ Hoa Lư (979)              the king murdered; seal the citadel, the queen, the 99 coffins
//   III rungcotai  Rừng Có Tai (979)                An Nhiên rides in her father's place; Nguyên Phong; the false trail
//   IV  caugay     Cầu Gãy Trên Dòng Sâu (979)      Đinh Khang on the bridge; the tavern village nets Máu Lạnh
//   V   deolua     Đèo Lửa · Hang Tối (979)         Hàng Tướng's last pass; the Left General freed from the cave
//   VI  ngay49     Ngày Bốn Mươi Chín (979)         the rite under attack; seven roads become one; the traitor's end
import * as quenthanh from './quenthanh.js';
import * as demhoalu from './demhoalu.js';
import * as rungcotai from './rungcotai.js';
import * as caugay from './caugay.js';
import * as deolua from './deolua.js';
import * as ngay49 from './ngay49.js';
import { TRIALS } from '../../../src/story/trials.js';
import { cleared } from '../../../src/core/progress.js';

export const CHAPTERS = [quenthanh, demhoalu, rungcotai, caugay, deolua, ngay49];
/** Chapter or trial module by id (unknown / missing id = the first chapter). */
export const chapter = (id) => CHAPTERS.find((m) => m.CH.id === id) || TRIALS.find((m) => m.CH.id === id) || CHAPTERS[0];
/** Chapter i (index into CHAPTERS) is playable: the first always, the others once the one before is cleared. */
export const chapterOpen = (i) => i === 0 || !!cleared(CHAPTERS[i - 1].CH.id);

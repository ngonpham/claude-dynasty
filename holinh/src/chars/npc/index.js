// 護靈壯士 NPC registry (overlay of src/chars/npc/index.js: same export NPCS, same entry contract — read that header).
// Story figures who only take the field as hero-model actors (bosses, allies who fight beside the hero, escorts who stand
// by). Each lives in its own file here (export const NPC); playable officers that also fight as bosses (Hàng Tướng) are
// CHARS ids instead. Who is who: holinh/DESIGN.md §4.
import { NPC as MATSEO } from './matseo.js';
import { NPC as HONGDIEM } from './hongdiem.js';
import { NPC as MAULANH } from './maulanh.js';
import { NPC as HOANQUAN } from './hoanquan.js';
import { NPC as DINHTIENHOANG } from './dinhtienhoang.js';
import { NPC as NGUYENBAC } from './nguyenbac.js';
import { NPC as DUONGHAU } from './duonghau.js';
import { NPC as NUCANVE } from './nucanve.js';

export const NPCS = { matseo: MATSEO, hongdiem: HONGDIEM, maulanh: MAULANH, hoanquan: HOANQUAN,
  dinhtienhoang: DINHTIENHOANG, nguyenbac: NGUYENBAC, duonghau: DUONGHAU, nucanve: NUCANVE };

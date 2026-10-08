// PLACEHOLDER — Nguyễn Bặc (阮匐) borrows 十二使君's nguyensieu model (polearm class) until this NPC's own model lands
// (holinh/DESIGN.md §4). Export contract: NPC = { id, name, courtesy, seal, portrait, kit } (src/chars/npc/index.js).
import { NPC as T } from '../../../../suquan/src/chars/npc/nguyensieu.js';

export const NPC = { ...T, id: 'nguyenbac', name: { zh: 'Nguyễn Bặc', en: 'Nguyễn Bặc' }, courtesy: { zh: '阮匐', en: '' }, seal: '阮匐' };

// PLACEHOLDER — Đinh Tiên Hoàng (丁先皇) borrows 十二使君's kieuconghan model (polearm class) until this NPC's own model lands
// (holinh/DESIGN.md §4). Export contract: NPC = { id, name, courtesy, seal, portrait, kit } (src/chars/npc/index.js).
import { NPC as T } from '../../../../suquan/src/chars/npc/kieuconghan.js';

export const NPC = { ...T, id: 'dinhtienhoang', name: { zh: 'Đinh Tiên Hoàng', en: 'Đinh Tiên Hoàng' }, courtesy: { zh: '丁先皇', en: '' }, seal: '丁先皇' };

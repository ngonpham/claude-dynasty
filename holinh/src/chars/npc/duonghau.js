// PLACEHOLDER — Dương Hoàng hậu (楊后) borrows 十二使君's ngoxuongvan model (sword class) until this NPC's own model lands
// (holinh/DESIGN.md §4). Export contract: NPC = { id, name, courtesy, seal, portrait, kit } (src/chars/npc/index.js).
import { NPC as T } from '../../../../suquan/src/chars/npc/ngoxuongvan.js';

export const NPC = { ...T, id: 'duonghau', name: { zh: 'Dương Hoàng hậu', en: 'Dương Hoàng hậu' }, courtesy: { zh: '楊后', en: '' }, seal: '楊后' };

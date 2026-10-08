// PLACEHOLDER — Nữ Cận Vệ (女衛) borrows 十二使君's ngoxuongvan model (sword class) until this NPC's own model lands
// (holinh/DESIGN.md §4). Export contract: NPC = { id, name, courtesy, seal, portrait, kit } (src/chars/npc/index.js).
import { NPC as T } from '../../../../suquan/src/chars/npc/ngoxuongvan.js';

export const NPC = { ...T, id: 'nucanve', name: { zh: 'Nữ Cận Vệ', en: 'Nữ Cận Vệ' }, courtesy: { zh: '女衛', en: '' }, seal: '女衛' };

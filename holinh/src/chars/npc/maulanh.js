// PLACEHOLDER — Máu Lạnh (冷血) borrows 十二使君's ngoxuongvan model (sword class) until this NPC's own model lands
// (holinh/DESIGN.md §4). Export contract: NPC = { id, name, courtesy, seal, portrait, kit } (src/chars/npc/index.js).
import { NPC as T } from '../../../../suquan/src/chars/npc/ngoxuongvan.js';

export const NPC = { ...T, id: 'maulanh', name: { zh: 'Máu Lạnh', en: 'Máu Lạnh' }, courtesy: { zh: '冷血', en: '' }, seal: '冷血' };

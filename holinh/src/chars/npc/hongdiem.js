// PLACEHOLDER — Mã Hồng Diễm (紅艷) borrows 十二使君's ngoxuongvan model (sword class) until this NPC's own model lands
// (holinh/DESIGN.md §4). Export contract: NPC = { id, name, courtesy, seal, portrait, kit } (src/chars/npc/index.js).
import { NPC as T } from '../../../../suquan/src/chars/npc/ngoxuongvan.js';

export const NPC = { ...T, id: 'hongdiem', name: { zh: 'Mã Hồng Diễm', en: 'Mã Hồng Diễm' }, courtesy: { zh: '紅艷', en: '' }, seal: '紅艷' };

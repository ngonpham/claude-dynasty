// PLACEHOLDER — Hoạn Quan Tổng Quản (宦官) borrows 十二使君's ngoxuongvan model (sword class) until this NPC's own model lands
// (holinh/DESIGN.md §4). Export contract: NPC = { id, name, courtesy, seal, portrait, kit } (src/chars/npc/index.js).
import { NPC as T } from '../../../../suquan/src/chars/npc/ngoxuongvan.js';

export const NPC = { ...T, id: 'hoanquan', name: { zh: 'Hoạn Quan Tổng Quản', en: 'Hoạn Quan Tổng Quản' }, courtesy: { zh: '宦官', en: '' }, seal: '宦官' };

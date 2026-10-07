// 十二使君 NPC registry (overlay of src/chars/npc/index.js: same export NPCS, same entry contract — read that header).
// Story figures who only take the field as hero-model actors (bosses, allies who stand by). Each lives in its own file
// here (export const NPC); playable officers that also fight as bosses (Đỗ Cảnh Thạc) are CHARS ids instead.
import { NPC as NGOXUONGVAN } from './ngoxuongvan.js';
import { NPC as NGUYENSIEU } from './nguyensieu.js';
import { NPC as KIEUCONGHAN } from './kieuconghan.js';

export const NPCS = { ngoxuongvan: NGOXUONGVAN, nguyensieu: NGUYENSIEU, kieuconghan: KIEUCONGHAN };

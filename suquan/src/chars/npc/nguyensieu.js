// Nguyễn Siêu (阮超) — warlord of Tây Phù Liệt (ch. II): polearm class.
// NPC entry (contract: src/chars/npc/index.js): PLACEHOLDER model and portrait (the engine's zhangliao) until this
// warlord's own voxel def (build / chains / scale / reach: src/chars/defkit.js header) and 20×20 portrait land here.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as POLEARM from '../../../../src/chars/npc/polearm.js';
import { DEF } from '../../../../src/chars/npc/zhangliao.js';
import { NPCS as ENGINE_NPCS } from 'engine/chars/npc/index.js';

export const NPC = {
  id: 'nguyensieu', name: { zh: 'Nguyễn Siêu', en: 'Nguyễn Siêu' }, courtesy: { zh: '阮超', en: 'Tây Phù Liệt' }, seal: '西扶',
  portrait: ENGINE_NPCS.zhangliao.portrait, kit: npcKit(DEF, POLEARM),
};

// Kiều Công Hãn (矯公罕) — warlord of Phong Châu (ch. IV): polearm class.
// NPC entry (contract: src/chars/npc/index.js): PLACEHOLDER model and portrait (the engine's xiahouyuan) until this
// warlord's own voxel def (build / chains / scale / reach: src/chars/defkit.js header) and 20×20 portrait land here.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as POLEARM from '../../../../src/chars/npc/polearm.js';
import { DEF } from '../../../../src/chars/npc/xiahouyuan.js';
import { NPCS as ENGINE_NPCS } from 'engine/chars/npc/index.js';

export const NPC = {
  id: 'kieuconghan', name: { zh: 'Kiều Công Hãn', en: 'Kiều Công Hãn' }, courtesy: { zh: '矯公罕', en: 'Phong Châu' }, seal: '峰州',
  portrait: ENGINE_NPCS.xiahouyuan.portrait, kit: npcKit(DEF, POLEARM),
};

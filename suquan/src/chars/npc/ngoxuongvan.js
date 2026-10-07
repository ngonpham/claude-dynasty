// Ngô Xương Văn (吳昌文) — the Ngô court's king (ch. I, Hoa Lư 951): co-ruler with his brother Ngô Xương Ngập; sword class.
// NPC entry (contract: src/chars/npc/index.js): PLACEHOLDER model and portrait (the engine's caocao) until this
// warlord's own voxel def (build / chains / scale / reach: src/chars/defkit.js header) and 20×20 portrait land here.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as SWORD from '../../../../src/chars/npc/sword.js';
import { DEF } from '../../../../src/chars/npc/caocao.js';
import { NPCS as ENGINE_NPCS } from 'engine/chars/npc/index.js';

export const NPC = {
  id: 'ngoxuongvan', name: { zh: 'Ngô Xương Văn', en: 'Ngô Xương Văn' }, courtesy: { zh: '吳昌文', en: 'Nam Tấn Vương' }, seal: '南晉',
  portrait: ENGINE_NPCS.caocao.portrait, kit: npcKit(DEF, SWORD),
};

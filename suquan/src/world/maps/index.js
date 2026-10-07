// 十二使君 battlefield registry (overlay of src/world/maps/index.js: same exports MAPS / HOME, same map def format —
// read that header: sim pieces / zones / route / gates / water, render sky / light / terrain / dress(k) / build(root, k)).
// One module per field, named by id; suquan/src/world/viet.js holds the Vietnamese set-dressing helpers they share
// (karst towers, bamboo, stilt houses, thatch, banyans, paddies, boats, bronze drums, earthen ramparts).
//   hoalu       Hoa Lư 951 — the karst gorge citadel (ch. I, HOME: the title and select stand on it)
//   tayphuliet  Tây Phù Liệt — the warlord's river fort on the Red River (ch. II)
//   dodong      Đỗ Động Giang — marsh stockades of Đỗ Cảnh Thạc (ch. III)
//   phongchau   Phong Châu — the river confluence under Nghĩa Lĩnh (ch. IV)
import hoalu from './hoalu.js';
import tayphuliet from './tayphuliet.js';
import dodong from './dodong.js';
import phongchau from './phongchau.js';

export const MAPS = { hoalu, tayphuliet, dodong, phongchau };
/** The map the menus stand on (title / select) and free mode's default. */
export const HOME = 'hoalu';

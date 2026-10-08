// 護靈壯士 battlefield registry (overlay of src/world/maps/index.js: same exports MAPS / HOME, same map def format —
// read that header: sim pieces / zones / route / gates / water, render sky / light / terrain / dress(k) / build(root, k)).
// One module per field, named by its stage id; holinh/src/world/viet.js holds the set-dressing helpers they share
// (十二使君's Vietnamese kit re-exported, plus coffins, candles, altars, bells, storks, reed plumes).
//   quenthanh  Quèn Thành — the warlord valley among karsts (Màn I, HOME: the title and select stand on it)
//   demhoalu   Hoa Lư by night, 979 — the palace, the sealed store of the 99 coffins (Màn II)
//   rungcotai  the forest road in the rain — carts, the false trail, the flood (Màn III)
//   caugay     the gorge river, its one bridge, the reed branch and the tavern village (Màn IV)
//   deolua     the burning pass at dusk and the moonlit cave below it (Màn V)
//   ngay49     the ritual ground at dawn, the water-gate, the bridge, the stone door (Màn VI)
import quenthanh from './quenthanh.js';
import demhoalu from './demhoalu.js';
import rungcotai from './rungcotai.js';
import caugay from './caugay.js';
import deolua from './deolua.js';
import ngay49 from './ngay49.js';

export const MAPS = { quenthanh, demhoalu, rungcotai, caugay, deolua, ngay49 };
/** The map the menus stand on (title / select) and free mode's default. */
export const HOME = 'quenthanh';

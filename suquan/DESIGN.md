# 十二使君 · Thập Nhị Sứ Quân — design bible

A second game on the Voxel Musou engine: a Dynasty-Warriors-style musou set in the **Anarchy of the Twelve Warlords**
(Loạn 12 sứ quân, 944–968), when Đinh Bộ Lĩnh of Hoa Lư brought the twelve warlords down one by one and founded
Đại Cồ Việt. Plays at `/suquan/` next to the original game; nothing of the original changes.

## 1. Architecture: the overlay

`suquan/index.html` loads `suquan/src/main.js` and an **importmap** that swaps engine content modules for this game's:

```
"engine/": "../src/"                                  ← reach an ORIGINAL engine module on purpose
"../src/chars/index.js": "./src/chars/index.js"       ← overlay: same path under suquan/src, same exports
…
```

Rules (break them and two module instances appear, or the wrong game's data loads):

1. An overlay file lives at `suquan/src/<same path as in src/>` and keeps **every export** of the module it replaces.
2. Inside overlays (and `suquan/src/main.js`), import every engine module by its **engine path relative to the file**
   (`'../../../src/hero/rig.js'` from `suquan/src/ui/x.js`) — never by `./x.js` into suquan unless that file is not an
   overlay. The importmap then decides which version every importer gets, uniformly.
3. `engine/<path>` resolves WITHOUT the importmap remap: use it only to extend the original of the module you are
   replacing (e.g. armies.js re-exports the engine's GRUNT / OFFICER palettes). Never import an overlaid path through it
   anywhere else.
4. New overlay = `python3 suquan/tools/overlay.py <path under src>` (copies with imports re-pointed) + add its line to
   the importmap in `suquan/index.html`.
5. Engine changes (`src/`) are allowed only as behaviour-preserving generalisations both games use (e.g.
   `DEFAULT_CHAR`); the original game must play exactly as before.

Overlaid today: main, chars/index, chars/npc/index, crowd/armies, world/maps/index, story/chapters, story/trials,
core/progress, core/difficulty, ui/title (UI screens: see §7).

## 2. Text convention

Every `{ zh, en }` pair in this game's data carries **Vietnamese in `.zh`** (the line the HUD / screens lead with) and
English in `.en` (the small subtitle). Exceptions, kept in **Hán** (chữ Hán, as 10th-century Vietnamese wrote): seals
(`seal`, 2-4 glyphs), `lines.copy` (vertical Musou calligraphy), army `glyph` (banners), prologue `cols` (vertical brush
columns) — each prologue card adds `vi` (Vietnamese prose) beside `en`. Vietnamese must be correct, with full
diacritics, natural and period-flavoured (no modern slang). Name order is Vietnamese (family name first).

## 3. Officers (playable)

| id | Name | Hán | Weapon / borrowed moveset | Musou | Notes |
| --- | --- | --- | --- | --- | --- |
| `dinhbolinh` | Đinh Bộ Lĩnh | 丁部領 | Reed-banner spear — Zhao Yun's spear kit | Cờ Lau Vạn Thắng | Vạn Thắng Vương; red / gold; a reed-plume pennant on the spear |
| `nguyenbac` | Nguyễn Bặc | 阮匐 | Great glaive (đại đao) — Guan Yu's kit | Định Quốc Trảm | Định Quốc Công; childhood friend; jade |
| `lehoan` | Lê Hoàn | 黎桓 | Twin swords — Liu Bei's kit | Thập Đạo Song Long | young general under Đinh Liễn, later Lê Đại Hành; gold |
| `dinhlien` | Đinh Liễn | 丁璉 | War bow — Huang Zhong's kit | Nam Việt Thần Tiễn | eldest son; hostage of the Ngô in 951; amber |
| `phambachho` | Phạm Bạch Hổ | 范白虎 | Serpent spear — Zhang Fei's kit (roar) | Bạch Hổ Khiếu Sơn | warlord of Đằng Châu who joined Đinh; white-tiger motif |
| `khuongviet` | Ngô Chân Lưu (Khuông Việt) | 吳真流 / 匡越 | Horsehair whisk (phất trần) — Zhuge Liang's fan kit | Phật Quang Hộ Quốc | Zen master; legend-flavoured sigils; saffron / brown |
| `docanhthac` | Đỗ Cảnh Thạc | 杜景碩 | Crescent halberd — Lü Bu's kit | Đỗ Động Cuồng Kích | ch. III boss; unlocks after ch. III; violet |

Each officer folder `suquan/src/chars/<id>/` owns `index.js` (`export const CHAR`: the CHARS entry) plus its own
`model.js` (voxel def, 20×20 `FACE` / `PAL` portrait) and `kit.js` (borrowed moveset + own model, fx palette, Musou look).

Look direction (game-stylised 10th-century Giao Châu): lacquered rattan / buffalo-hide lamellar rather than Chinese
iron plate; cloth head-wraps (khăn) and topknots (búi tó) more than helmets; bare tanned forearms; tunics (áo) with side
slits, sashes, wrapped leggings, sandals or bare feet; red, ochre, indigo, saffron dyes; Đông Sơn motifs (bird / sun
rings of the bronze drums), dragons for the Đinh. Avoid copying any original officer's silhouette.

## 4. Bosses and NPCs

| key | Who | Where | Kit |
| --- | --- | --- | --- |
| `ngoxuongvan` | Ngô Xương Văn (Nam Tấn Vương) | ch. I | NPC sword class (`suquan/src/chars/npc/ngoxuongvan.js`) |
| `nguyensieu` | Nguyễn Siêu | ch. II | NPC polearm class |
| `docanhthac` | Đỗ Cảnh Thạc | ch. III | the playable kit as a boss actor (like Lü Bu at Hulao) |
| `kieuconghan` | Kiều Công Hãn | ch. IV | NPC polearm class |

Other figures speak under seals (SPK) or fight as crowd officers (OFF): Ngô Xương Ngập (Thiên Sách Vương), Trần Lãm,
Đinh Điền, Trịnh Tú, Lưu Cơ, Lã Xử Bình, Kiều Tri Hựu, Kiều Thuận, Nguyễn Khoan, Ngô Nhật Khánh, Lý Khuê, Lã Đường,
Nguyễn Thủ Tiệp, Ngô Xương Xí. Unattested generals are titles, not invented names ("Thủy quân đô úy").

## 5. Armies (`suquan/src/crowd/armies.js`)

`dinh` (ally, crimson / straw-gold, 丁) · `ngo` (ch. I, black lacquer + imperial ochre, 吳) · `nguyen` (ch. II,
river indigo, 阮) · `do` (ch. III, soot-black + violet, 杜) · `kieu` (ch. IV, forest jade, 矯).

## 6. Campaign

| # | id / map | Year | Heroes | Foe | Battle |
| --- | --- | --- | --- | --- | --- |
| I | `hoalu` | 951 | dinhbolinh, nguyenbac | ngo | The two Ngô kings besiege Hoa Lư for a month. Hold the gorge gates between the karsts, break the siege camps; the Ngô parade the hostage Đinh Liễn on a pole — Đinh Bộ Lĩnh will not bargain ("Đại trượng phu cốt lập công danh…"), the Ngô falter; duel Ngô Xương Văn, the siege lifts. |
| II | `tayphuliet` | ≈966 | dinhbolinh, lehoan, dinhlien | nguyen | Storm Nguyễn Siêu's fort on the Red River; he crosses the river to seek help; cut him off at the crossing among the boats and reeds. |
| III | `dodong` | ≈967 | dinhbolinh, phambachho, dinhlien | do | The long siege of Đỗ Động Giang: three rings of bamboo / earth stockades in the marsh; Đỗ Cảnh Thạc, unyielding, falls in the last duel. |
| IV | `phongchau` | 967–968 | dinhbolinh, nguyenbac, lehoan, khuongviet | kieu | Kiều Công Hãn at the confluence under Nghĩa Lĩnh (night, fires); Nguyễn Bặc's push; the warlord falls — 968, Đại Cồ Việt, Đinh Tiên Hoàng at Hoa Lư. |

Trials (`suquan/src/story/trials.js`): Thiên Nhân Trảm (1,000 in 3:00, open), Tử Thủ (hold the Tây Phù Liệt crossing,
after ch. II), Bình Thập Nhị Sứ (the four bosses back to back, after ch. IV). Unlocks: `suquan/src/core/progress.js`.

History is told straight where sources agree (Đại Việt sử ký toàn thư, Khâm định Việt sử thông giám cương mục) and
marked as legend (dã sử / truyền thuyết) in the prologue / epilogue wording where it is folk tradition (the reed
banners, the white tiger dream, the monk's sigils). Never invent atrocities or put modern politics in anyone's mouth.

## 7. Fields (`suquan/src/world/maps/<id>.js`, helpers `suquan/src/world/viet.js`)

Map format: `src/world/maps/index.js` header; worked example `src/world/maps/dingjun.js`. Fields run along +Z,
≈ 350-400 m, a DW stage shape (open start → chokepoints / gates → the commander). Vietnamese landscape language:
limestone karst towers (Hoa Lư / Tràng An), rivers and fords with boats, rice paddies and dikes, bamboo hedges (lũy
tre) round villages, stilt houses and thatch, banyans, areca palms, earthen ramparts (thành đất) with timber parapets,
bamboo palisades, temple gates, bronze drums (trống đồng), reed stands with white plumes (bông lau).

## 8. UI

Vietnamese UI everywhere (title, select, loading, HUD, pause, prologue, result, records), English subtitles small.
Fonts: a display face with full Vietnamese coverage for headlines (vendored under `suquan/fonts/`, OFL), Hán glyphs
falling back to the engine's brush stack. Logo: 十二使君 seal + "Thập Nhị Sứ Quân".

## 9. Testing

```
python3 -m http.server 8123        # repo root
W=960 H=540 node suquan/tools/shot.mjs "http://localhost:8123/suquan/?go=story&ch=hoalu&char=nguyenbac&enemies=60" /tmp/x.png 20000
```
`?go=free|story|trial&char=<id>&ch=<chapter|trial>&map=<map>&enemies=N` as in the original README. Swiftshader is slow
(a battle frame ≈ 0.5-1 s): budget 30-90 s per shot; check `PAGEERROR` lines first. Also play the battle script in
your head against the map's zone / anchor tables: every beat position must land on walkable ground.

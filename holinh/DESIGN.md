# 護靈壯士 · Hộ Linh Tráng Sĩ — design bible

A third game on the Voxel Musou engine, the second Vietnamese one: a Dynasty-Warriors-style musou adapted from the
comic shooting script **«Hộ Linh Tráng Sĩ: Bí Ẩn Mộ Vua Đinh»** (20 chapters × 6 panels; the user's design reference,
with its character design tokens and panel art). Year 979: Đinh Tiên Hoàng is murdered in his palace at Hoa Lư;
Nguyễn Bặc opens the sealed order — **99 identical coffins along seven roads** — so no one can find (and desecrate) the
true grave. Seven guardians (hộ linh) take the roads; the hunters close in from outside, a traitor works from inside.
Plays at `/holinh/` next to the original game (`/`) and 十二使君 (`/suquan/`); nothing of either changes.

Six stages (**Màn I–VI**), each a full DW stage: field, battle script, prologue ink map, epilogues.

## 1. Architecture: the overlay (same rules as suquan/DESIGN.md §1)

`holinh/index.html` loads `holinh/src/main.js` and an **importmap** that swaps engine content / UI modules for this
game's (`"../src/x.js": "./src/x.js"`). Rules:

1. An overlay file lives at `holinh/src/<same path as in src/>` and keeps **every export** of the module it replaces.
2. Inside holinh, import every ENGINE module by its engine path relative to the file (`'../../../../src/hero/model.js'`
   from `holinh/src/chars/annhien/kit.js`) — the importmap decides which version every importer gets.
3. `engine/<path>` = an ORIGINAL engine module, un-remapped (only to extend the module you replace).
4. **Reuse from 十二使君 is allowed and encouraged** by plain relative path, e.g. the Vietnamese set-dressing kit
   `holinh/src/world/viet.js` (re-exports `suquan/src/world/viet.js` + this game's own helpers), or a suquan officer's
   model *as a reference to copy from*. Never import a suquan module that is itself an importmap overlay key
   (chars/index, story/chapters, ui/*, …) — copy instead.
5. Engine (`src/`) and suquan files are **not edited** by this game.

Overlaid: main, chars/index, chars/npc/index, crowd/armies, world/maps/index, story/chapters, story/trials, core/progress,
core/difficulty, ui/title, ui/select, ui/loading, ui/hud, story/prologue, story/result, musou/overlay.

## 2. Text convention (as 十二使君)

Every `{ zh, en }` pair carries **Vietnamese in `.zh`** (the line the HUD / screens lead with) and English in `.en`.
Exceptions kept in **Hán**: seals (`seal`, 2-4 glyphs), `lines.copy` (vertical Musou calligraphy), army `glyph`
(banners), prologue `cols` (3 short vertical brush columns; each card also has `vi` Vietnamese prose beside `en`).
Vietnamese: full diacritics, natural, period-flavoured (no modern slang), terse like the comic's captions. After adding
Hán text, run `python3 holinh/fonts/subset.py` (rebuilds `holinh/fonts/han-brush.woff2`).

Tone (comic A1 / A5): restrained, non-gory — force, shadow, dust, water and emotional consequence; no wounds described.
Motifs: **bông lau** (white reed plume) = legitimacy; **cò trắng** (white storks) = memory / souls; **sợi chỉ son**
(cinnabar thread) = the decoy routes; **chuông đồng** (bronze bell) = the line between living and dead. The tomb's site is
**never** revealed or hinted at. The traitor is linked to "phe phương Bắc / ngoại lực", never a named real state.

History (comic D1): Đinh Tiên Hoàng unified the land after the 12 warlords; he and Đinh Liễn were killed in 979; Dương
hậu became regent for the boy emperor; Nguyễn Bặc is historical. The 99 coffins / seven roads are **legend**; An Nhiên,
Nguyên Phong, the seven offices, the assassins, the traitor and every line of dialogue are **fiction**. The assassin of
979 is never named (the comic shows only a shadow) — the game does not settle a historical debate.

## 3. Officers (playable) — `holinh/src/chars/<id>/` (index.js `CHAR`, model.js def + FACE / PAL, kit.js)

Each borrows an engine moveset exactly like its 十二使君 template (copy the template's kit.js pattern; build an
original model from the comic's design token and panel art).

| id | Name · Hán | Token (comic A4) | Weapon / borrowed kit | suquan template | Musou (vi · Hán seal) |
| --- | --- | --- | --- | --- | --- |
| `annhien` | An Nhiên · 安然 | AN_NHIEN: young warrior woman, long single braid, **red headband**, red-brown fitted lamellar over a white under-robe, fierce clear eyes | thương (spear-sword: long leaf blade) — Zhao Yun spear kit | `dinhbolinh` | Bạch Lau Phá Trận · 白蘆破陣 |
| `nguyenphong` | Nguyên Phong · 元風 | NGUYEN_PHONG: lean young mountain hunter, tousled hair half tied up, **moss-green / brown cloth layers**, leather bracers, quiver, short blade at hip | hunting bow — Huang Zhong bow kit (aim) | `dinhlien` | Phong Tiễn Xuyên Lâm · 風箭穿林 |
| `dinhkhang` | Đinh Khang · 丁康 | DINH_KHANG: young tattooed river warrior, cropped hair, **sleeveless indigo tunic**, rope belt, bare tattooed arms, swimmer build | curved river blade + hooked paddle-knife (twin) — Liu Bei twin-sword kit | `lehoan` | Giang Long Cuồng Lãng · 江龍狂浪 |
| `huutuong` | Hữu Tướng · 右將 | HUU_TUONG: lean scarred veteran, **shoulder-length black hair streaked grey**, dark leather lamellar, indigo cloak, grave eyes | long saber (trường đao) — Guan Yu glaive kit | `nguyenbac` | Hữu Dực Trấn Quân · 右翼鎮軍 |
| `tatuong` | Tả Tướng · 左將 | TA_TUONG: **towering bearded** commander, bronze-red heavy lamellar, red cloak, stern fatherly face | broad spear (giáo lớn) — Zhang Fei serpent-spear kit (roar) | `phambachho` | Tả Dực Phá Thành · 左翼破城 |
| `thaymo` | Thầy Mo Cun · 巫鈴 | THAY_MO: older Mường shaman, high cheekbones, grey-white beard, **indigo ritual robe with geometric (Mường) embroidery**, head-cloth, wooden staff hung with **bronze bells**, red cords | staff + bells — Zhuge Liang fan kit (sigils = bell / thread rings) | `khuongviet` | Chuông Đồng Mở Núi · 銅鈴開山 |
| `hangtuong` | Hàng Tướng · 降將 | HANG_TUONG: broad former rival general, **shaved temples**, topknot, beard, weathered **green-brown** lamellar, green cloak, humble resolute face | heavy halberd (kích) — Lü Bu halberd kit; also the Màn I boss (role 'boss', like Lü Bu at Hulao) | `docanhthac` | Báo Ân Hỏa Lĩnh · 報恩火嶺 |

`CHAR_ORDER` = the table order; `DEFAULT_CHAR = 'annhien'`. `hangtuong` unlocks after Màn I. Names: the two generals
have no personal names in the source — their offices are their names (`courtesy.zh` = the Hán, `.en` = home / role).
Women and men share the rig; give An Nhiên and the women NPCs slimmer shoulders, narrower waist, a long braid / ponytail
chain — never exaggerated.

## 4. NPCs — `holinh/src/chars/npc/<id>.js` (`export const NPC`, contract src/chars/npc/index.js, kit = npcKit)

| key | Who · Hán | Token | Class | Role in the game |
| --- | --- | --- | --- | --- |
| `matseo` | Mặt Sẹo · 疤面 | MAT_SEO: muscular, **diagonal facial scar**, black iron scale armor, heavy cleaver | polearm (a chopper-glaive: broad cleaver head on a short-long haft) | boss: Màn II (breaks off), Màn V (breaks off), Màn VI (falls to Tả Tướng's line) |
| `hongdiem` | Mã Hồng Diễm · 紅艷 | HONG_DIEM: athletic woman assassin, **high ponytail**, dark crimson riding armor, red cloak, cold yet wounded eyes | sword (narrow saber) | boss: Màn III (breaks off), Màn VI (refuses An Nhiên's offered way out; the stone door shuts) |
| `maulanh` | Máu Lạnh · 冷血 | MAU_LANH: compact **bald** assassin, pale blue-grey wraps, emotionless | sword (hooked blade; a second hook held in the off hand as a model part) | boss: Màn IV (netted by the village) |
| `hoanquan` | Hoạn Quan Tổng Quản · 宦官 | HOAN_QUAN: slender palace eunuch, pale oval face, **dark-violet robe**, black gauze cap, conspicuous **ring with a green stone**, unreadable smile | sword (thin straight jian) | final boss: Màn VI |
| `dinhtienhoang` | Đinh Tiên Hoàng (Đinh Bộ Lĩnh) · 丁先皇 | DINH_VUONG: broad-shouldered middle-aged emperor, square face, **reed-plume black-gold lamellar**, red cape, old scars | polearm (reed-plume spear) | ally actor in Màn I |
| `nguyenbac` | Nguyễn Bặc · 阮匐 | NGUYEN_BAC: weathered elder statesman-general, **iron-grey beard**, dark bronze court armor, square seal case at the hip | polearm (glaive) | ally / npc in Màn II; speaker everywhere |
| `duonghau` | Dương Hoàng hậu · 楊后 | DUONG_HAU: regal queen, late thirties, oval face, **black-red lacquered phoenix robe**, gold hairpin | sword (never fights: role 'npc') | npc at the ritual (Màn VI), Màn II escort |
| `nucanve` | Nữ Cận Vệ · 女衛 | NU_CAN_VE: athletic middle-aged woman guard, tight black-red armor, **twin sabers** | sword | ally actor Màn II and VI (holds Hồng Diễm) |

Other figures speak only under seals (SPK): Quan Văn (文), the tavern keeper (Chủ quán, 店), fishermen (Dân chài, 漁),
Hàng Tướng's lieutenant (Phó tướng, 副), the boy emperor is never a speaker, guards / soldiers (兵), the hunters'
captains (Kỵ tướng truy sát 騎, …). Unattested people are titles, not invented names.

## 5. Armies (`holinh/src/crowd/armies.js`)

| id | Who | Look | Glyph | Stages |
| --- | --- | --- | --- | --- |
| `dinh` | Đinh host | oxblood lamellar, crimson coats, straw-gold reed tassels, head-wraps | 丁 | ally, I |
| `holinh` | the guardians' escort / palace guard | black lacquer + cinnabar red, white reed tassels, head-wraps | 護 | ally, II–VI |
| `suquan` | the warlord host of Quèn Thành | weathered green-brown, rust, bone-white tassels, conical hats | 雄 | foe, I |
| `thichkhach` | the night raiders in the palace | soot-black, ash-grey, dark teal, cloth masks (head-wraps) | 影 | foe, II |
| `truysat` | the hunters (the traitor's hired riders) | black iron scale + violet | 追 | foe, III–V |
| `phanthan` | the traitor's host on the 49th day | palace violet + black iron, gold trim | 宦 | foe, VI |

## 6. Campaign — `holinh/src/story/<id>.js` + `holinh/src/world/maps/<id>.js` (chapter id = map id)

| # | id | Comic ch. | Era | Heroes | Foe / ally | Battle (beats in order) | Boss |
| --- | --- | --- | --- | --- | --- | --- | --- |
| I | `quenthanh` | 1 | c. 967 | huutuong, tatuong | suquan / dinh | «Cờ Lau Qua Quèn Thành». The warlord valley among karsts, twelve banners. Đinh Bộ Lĩnh (ally actor) pins a reed plume on his helm; Hữu Tướng locks the left, Tả Tướng breaks the wooden gate, the king drives through the gap (three beats like one spear). Down the twelve banners one by one (set piece). The rival general (Hàng Tướng) yields at 25 % — the king lifts him from the mud: spared, given a place. Epilogue: years later, storks over the Hoa Lư banner. | `hangtuong` (CHARS kit as boss, retreatAt 0.25) |
| II | `demhoalu` | 2–5 | 979 | huutuong, tatuong, thaymo | thichkhach / holinh | «Đêm Vỡ Hoa Lư». Night palace: lamps going out down a corridor, a secret door opened from inside. Too late for the king (told, never shown). Nguyễn Bặc seals the citadel (gates); reach Dương hậu and the boy emperor (defend point with Nữ Cận Vệ); fight to the sealed store where the order waits; the 99 coffins (set piece: candles); Mặt Sẹo leads the raiders, breaks off by a secret way. Ends on the oath of the seven (epilogue: the Hoạn Quan behind the purple curtain, the ring's green glint). | `matseo` (retreatAt 0.3) |
| III | `rungcotai` | 6, 7, 10 | 979 | annhien, nguyenphong | truysat / holinh | «Rừng Có Tai». Tả Tướng's horse came back alone; An Nhiên takes his road into the rain. Ambush on the forest road — arrows from the ridge — Nguyên Phong cuts the trap lines; escort the coffin carts (defend point: a cart) along the mud road; footprints too perfect (a false trail); the flood (set piece: the stream rises, a tree falls) — hold the cart; the purple-ink thread; Hồng Diễm and her riders. | `hongdiem` (retreatAt 0.3) |
| IV | `caugay` | 9, 12 | 979 | dinhkhang, annhien, nguyenphong | truysat / holinh | «Cầu Gãy Trên Dòng Sâu». The only bridge over the gorge river; Máu Lạnh blocks it; hold the last rope while the bearers push the coffins over (defend); the bridge breaks (set piece); the coffin floats up on its hidden bamboo frame, fishermen pull it into the reed branch; the tavern village (three pestle beats): villagers' nets, smoke, bamboo poles — beat Máu Lạnh together. The bell sounds toward the mountain. | `maulanh` (falls: netted) |
| V | `deolua` | 13, 14 | 979 | annhien, nguyenphong, hangtuong | truysat / holinh | «Đèo Lửa · Hang Tối». The pass at dusk: Hàng Tướng (ally actor, or the hero) draws the cavalry up the one-horse path with the yellow banner and an empty coffin; the beacon on the crest. **hangtuong as hero: his run ends at the burning crest — a hero-filtered `win` beat (his last stand; the epilogue says he did not come back).** Others: down into the moonlit cave by the breathing water-gap; break the cell; free Tả Tướng (npc actor); Mặt Sẹo the jailer (breaks off); Tả Tướng names the Hoạn Quan. Also defines the trial `thudeo`. | `matseo` (retreatAt 0.3) |
| VI | `ngay49` | 15–17 (+18–20 in the epilogue) | 979 | annhien, nguyenphong, tatuong, huutuong, dinhkhang | phanthan / holinh | «Ngày Bốn Mươi Chín». Dawn, the 49th candle: the ritual ring (defend point: Dương hậu + Thầy Mo keep the rite; it must not stop); Hữu Tướng's outer ring; Nữ Cận Vệ holds Hồng Diễm (ally vs boss clash); seven beacons answer on the peaks (set piece); the water-gate (Đinh Khang opens the sluice); the bridge (Tả Tướng vs Mặt Sẹo — Mặt Sẹo falls); the stone door (Hồng Diễm, given a way out, refuses; the door shuts); the Hoạn Quan — "the dead man's finger" — the last duel; Thầy Mo closes the stone works; the traitor is left among his own false roads. Epilogue (ch. 18–20): the nameless tomb, the empty cups, the warriors' song, the storks — never where. | `hongdiem`, `matseo`, `hoanquan` |

Hero branches: every hero-branched line / card / epilogue covers each listed hero; `ally` (CH.ally) = the partner who
speaks with a pixel portrait (an_nhien ↔ nguyenphong; huutuong ↔ tatuong; …). Stages unlock in order.

Trials (`holinh/src/story/trials.js`): **Thiên Nhân Trảm** (千人斬, 1,000 KOs in 3:00 on quenthanh, open) · **Một Mình
Giữ Đèo** (獨守, hold the burning pass 4:00 — `TRIAL` in `story/deolua.js`, opens with Màn V) · **Bảy Đường Truy
Sát** (七路, Hàng Tướng → Máu Lạnh → Hồng Diễm → Mặt Sẹo → Hoạn Quan back to back, opens with Màn VI). Unlocks:
`holinh/src/core/progress.js` (Tu La after a Hard clear; Hàng Tướng after Màn I; the two trials).

## 7. Fields (`holinh/src/world/maps/<id>.js`; helpers `holinh/src/world/viet.js`)

Map format: `src/world/maps/index.js` header; worked examples `suquan/src/world/maps/*.js`. Fields run along +Z,
≈ 350-400 m, a DW stage shape (open start → chokepoints / gates → the commander). Ninh Bình is a character (comic A1):
limestone karst towers (Hoa Lư / Tràng An), still green rivers, reed stands with white plumes, rice paddies, bamboo,
stilt houses and thatch, banyans, caves. Palette tags per stage (comic A3): I `[LAM]` red sun through smoke · II
`[PHẢN]`/`[LINH]` night, lamps and candles, violet · III `[SƯƠNG]` rain, indigo mist · IV `[NƯỚC]` jade water, silver
light · V dusk fire → `[NƯỚC]` moonlit cave · VI `[LINH]` dawn gold, candles, black lacquer.
`quenthanh` is **HOME** (title / select stand on it): it must define `stage: { title, select }`.

Shared props (holinh/src/world/viet.js): `coffin` (the 99 identical lacquered coffins), `coffinCart`, `candleRing`,
`altar`, `bellPost`, `stork` (white storks), `reedPlumes` — use them for continuity.

## 8. UI

As 十二使君 (Vietnamese UI, English subtitles), re-skinned: logo **護靈壯士** seal + «Hộ Linh Tráng Sĩ», subline
«BÍ ẨN MỘ VUA ĐINH · 979». Title key art: An Nhiên (spear) in front, Nguyên Phong drawing his bow behind. Save keys
`ho-linh-trang-si.save` / `ho-linh-trang-si.diff`.

## 9. Testing

```
node holinh/checks/walk.mjs [stage] [hero]       # headless: the whole battle script walked with real sim (QA assist)
node holinh/checks/trials-bot.mjs [trial] [hero] [difficulty] [seed] [--dodge]   # trials, inputs-only bot
python3 -m http.server 8123                       # repo root, then:
W=960 H=540 node holinh/tools/shot.mjs "http://localhost:8123/holinh/?go=story&ch=quenthanh&char=huutuong&enemies=60" /tmp/x.png 30000
```
`?go=free|story|trial&char=<id>&ch=<stage|trial>&map=<map>&enemies=N`. Swiftshader is slow (budget 30-90 s per shot);
check `PAGEERROR` lines first. Every beat position must land on walkable ground (walk.mjs `largeSpawnSnaps` empty).

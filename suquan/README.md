<h1 align="center">十二使君 · Thập Nhị Sứ Quân</h1>

<p align="center"><b>Loạn 12 sứ quân · 944–968</b><br>Một trò chơi hành động «nhất kỵ đương thiên» bằng khối voxel, chạy ngay trên trình duyệt.</p>

---

## Trò chơi

Năm 944, Ngô Quyền mất, triều Ngô suy yếu; các hào trưởng khắp Giao Châu chiếm cứ mỗi người một vùng, sử gọi là
**loạn mười hai sứ quân**. Người con động Hoa Lư thuở nhỏ chăn trâu, lấy bông lau làm cờ — **Đinh Bộ Lĩnh** — cùng bạn
cờ lau Nguyễn Bặc, Lê Hoàn, con trai Đinh Liễn và những sứ quân quy thuận, lần lượt dẹp yên các sứ quân, được tôn là
Vạn Thắng Vương, rồi năm 968 lên ngôi Hoàng đế, đặt quốc hiệu **Đại Cồ Việt**, đóng đô ở Hoa Lư.

Bạn điều khiển một vị tướng giữa chiến trường hàng trăm quân địch: chém qua từng lớp quân, hạ tướng địch, tích đầy thanh
vàng rồi tung **Vô Song**. Lời thoại, màn hình và bảng chỉ dẫn đều bằng tiếng Việt, tiếng Anh là phụ đề nhỏ; ấn triện,
câu đề Vô Song, chữ trên cờ hiệu và các cột thư pháp trong màn mở đầu giữ chữ Hán như người Việt thế kỷ X vẫn viết.

Lịch sử được kể theo những điều chính sử (Đại Việt sử ký toàn thư, Khâm định Việt sử thông giám cương mục) cùng chép;
những gì thuộc dã sử, truyền thuyết (cờ lau tập trận, giấc mộng bạch hổ, bùa phép của thiền sư) được ghi rõ là truyền thuyết.

## Chạy trò chơi

Không cần cài đặt hay build. Từ thư mục gốc của kho mã:

```sh
python3 -m http.server 8000
```

rồi mở **http://localhost:8000/suquan/** (trò chơi gốc *Voxel Musou* vẫn ở http://localhost:8000/). Cần trình duyệt có
WebGL2, nên dùng máy có card đồ họa rời; âm thanh bật sau lần bấm phím hoặc nhấp chuột đầu tiên.

Lối tắt khi phát triển (bỏ qua màn hình chọn): `?go=story|trial|free&char=<tướng>&ch=<chương / thử thách>&map=<chiến
trường>&enemies=N`, ví dụ `http://localhost:8000/suquan/?go=story&char=dinhbolinh&ch=hoalu`.

## Điều khiển

| Hành động | Bàn phím / chuột | Tay cầm |
| --- | --- | --- |
| Di chuyển | <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / phím mũi tên | cần trái |
| Tấn công | <kbd>J</kbd> / chuột trái — bấm liên tiếp ra trọn chuỗi đòn | <kbd>X</kbd> □ |
| Tụ lực | <kbd>K</kbd> / chuột phải — bấm giữa chuỗi đòn để ra đòn tụ lực | <kbd>Y</kbd> △ |
| Nhảy | <kbd>Space</kbd> | <kbd>A</kbd> × |
| Né đòn | <kbd>L</kbd> / <kbd>Shift</kbd> | <kbd>R1</kbd> <kbd>R2</kbd> |
| Vô Song | <kbd>I</kbd> — khi thanh vàng đầy | <kbd>B</kbd> ○ |
| Góc nhìn | chuột (bấm vào chiến trường để khóa chuột) / <kbd>Q</kbd><kbd>E</kbd> | cần phải |
| Khóa mục tiêu | <kbd>R</kbd> — về sau lưng, hoặc nhắm tướng địch gần nhất | <kbd>L1</kbd> <kbd>L2</kbd> |
| Ngắm bắn (Đinh Liễn) | giữ <kbd>K</kbd> / chuột phải, thả ra là bắn | giữ <kbd>Y</kbd> △ |
| Tạm dừng | <kbd>Esc</kbd> | — |

Chuỗi đòn: N1–N6 bằng <kbd>J</kbd>; bấm <kbd>K</kbd> sau đòn thứ *n* ra đòn tụ lực C(n+1). <kbd>H</kbd> bật / tắt
bảng phím trong trận.

## Các tướng

| Tướng | Hán | Binh khí | Vô Song | Ghi chú |
| --- | --- | --- | --- | --- |
| **Đinh Bộ Lĩnh** | 丁部領 | Thương cờ lau | Cờ Lau Vạn Thắng | Vạn Thắng Vương; nhanh, tầm dài |
| **Nguyễn Bặc** | 阮匐 | Đại đao | Định Quốc Trảm | Định Quốc Công; sóng đao trăng khuyết |
| **Lê Hoàn** | 黎桓 | Song kiếm | Thập Đạo Song Long | Thập đạo tướng quân; đòn hiệu triệu hồi sức quân ta |
| **Đinh Liễn** | 丁璉 | Cung | Nam Việt Thần Tiễn | Trưởng tử nhà Đinh; ngắm bắn, trúng đầu tăng bội |
| **Phạm Bạch Hổ** | 范白虎 | Xà mâu | Bạch Hổ Khiếu Sơn | Sứ quân Đằng Châu quy thuận; tiếng gầm chấn động |
| **Ngô Chân Lưu** (Khuông Việt) | 吳真流 · 匡越 | Phất trần | Phật Quang Hộ Quốc | Thiền sư; gió chém xa, ấn bùa trên đất |
| **Đỗ Cảnh Thạc** | 杜景碩 | Phương thiên kích | Đỗ Động Cuồng Kích | Sứ quân Đỗ Động Giang; mở sau Chương III |

## Chiến dịch

| Chương | Năm | Trận | Tướng ta | Địch |
| --- | --- | --- | --- | --- |
| I · Hoa Lư | 951 | Hai vua Ngô vây Hoa Lư; giữ các cửa ải giữa núi đá vôi, phá trại vây, đấu Ngô Xương Văn | Đinh Bộ Lĩnh, Nguyễn Bặc | Quân nhà Ngô 吳 |
| II · Tây Phù Liệt | ≈ 966 | Đánh thành ven sông Hồng của Nguyễn Siêu, chặn hắn ở bến đò | Đinh Bộ Lĩnh, Lê Hoàn, Đinh Liễn | Quân Nguyễn Siêu 阮 |
| III · Đỗ Động Giang | ≈ 967 | Vây ba vòng lũy tre giữa đầm lầy, quyết đấu Đỗ Cảnh Thạc | Đinh Bộ Lĩnh, Phạm Bạch Hổ, Đinh Liễn | Quân Đỗ Cảnh Thạc 杜 |
| IV · Phong Châu | 967–968 | Ngã ba sông dưới núi Nghĩa Lĩnh, đêm lửa trại; Kiều Công Hãn ngã, non sông về một mối | Đinh Bộ Lĩnh, Nguyễn Bặc, Lê Hoàn, Khuông Việt | Quân Kiều Công Hãn 矯 |

Mỗi chương mở đầu bằng một cuộn tranh mực trên bản đồ: cột thư pháp chữ Hán, lời kể tiếng Việt và phụ đề tiếng Anh.
Chương sau mở khi chương trước đã thắng.

## Thử thách và Tự do chiến

- **Thiên Nhân Trảm** (千人斬) — hạ một nghìn quân trong ba phút dưới chân núi Hoa Lư; mở từ đầu.
- **Tử Thủ** (死守) — giữ bến Tây Phù Liệt; mở sau Chương II.
- **Bình Thập Nhị Sứ** (平使君) — liên tiếp đấu Ngô Xương Văn, Nguyễn Siêu, Kiều Công Hãn và Đỗ Cảnh Thạc; mở sau Chương IV.
- **Tự do chiến** — tùy chọn tướng và chiến trường, quân địch kéo đến không ngừng, không ghi chiến tích.

## Độ khó, chiến tích và lưu trữ

Bốn độ khó: **Tân Binh · Bình Thường · Hiểm · Tu La** (Tu La mở sau khi thắng một trận bất kỳ ở độ khó Hiểm). Mỗi trận
thắng được xếp hạng S / A / B / C; bảng **Chiến tích** ghi hạng cao nhất, thời gian nhanh nhất và số quân hạ nhiều nhất
của từng tướng ở từng chương / thử thách và từng độ khó. Mọi thứ được mở khóa đều suy ra từ chiến tích. Dữ liệu lưu trong
`localStorage` của trình duyệt (khóa `thap-nhi-su-quan.save`, `thap-nhi-su-quan.diff`), tách riêng với trò chơi gốc.

## Kiến trúc: lớp phủ (overlay)

Trò chơi chạy trên **chính engine của Voxel Musou** (`src/`) mà không sửa logic của nó. `suquan/index.html` khai báo một
*importmap*: mỗi module nội dung hoặc giao diện của engine (`../src/chars/index.js`, `../src/story/chapters.js`,
`../src/ui/hud.js`…) được thay bằng bản cùng đường dẫn, cùng export trong `suquan/src/`. Các module engine import
chúng sẽ nhận bản của trò chơi này. Quy tắc chi tiết ở [`DESIGN.md`](DESIGN.md) §1; tạo một overlay mới bằng
`python3 suquan/tools/overlay.py <đường dẫn trong src>` rồi thêm một dòng vào importmap.

Đã phủ: tướng, NPC, các đạo quân, chiến trường, chương, thử thách, tiến trình, độ khó và toàn bộ giao diện (màn hình
tiêu đề, chọn tướng, nạp trận, HUD, màn mở đầu, kết quả, chữ Vô Song).

Phông chữ (`suquan/fonts/`, SIL OFL 1.1): **Playfair Display** cho tiêu đề, **Alegreya** cho lời thoại và văn bản,
**Be Vietnam Pro** cho chữ nhỏ — cả ba đủ dấu tiếng Việt — và **SQHan**, bộ con của Yuji Boku chứa mọi chữ Hán trò chơi
hiển thị. Khi thêm chữ Hán mới vào `suquan/`, chạy `python3 suquan/fonts/subset.py` để dựng lại `han-brush.woff2`.

## Ghi công

- Engine *Voxel Musou* và mã nguồn: MIT, xem [LICENSE](../LICENSE).
- [three.js](https://threejs.org/): MIT.
- Phông chữ: Playfair Display (The Playfair Display Project Authors), Alegreya (The Alegreya Project Authors), Be Vietnam
  Pro (The Be Vietnam Pro Project Authors), Yuji Boku (The Yuji Project Authors / Kinuta Font Factory) — SIL Open Font
  License 1.1, xem [fonts/OFL.txt](fonts/OFL.txt).

Đây là dự án của người hâm mộ, không liên quan đến KOEI TECMO. Không dùng tài nguyên nào từ các trò chơi gốc.

---

## English summary

**十二使君 · Thập Nhị Sứ Quân** is a Dynasty-Warriors-style voxel musou set in Vietnam's Anarchy of the Twelve Warlords
(944–968): Đinh Bộ Lĩnh of Hoa Lư and his captains bring the warlords down one by one and found Đại Cồ Việt in 968. It
runs on the Voxel Musou engine as an **overlay** — an importmap in `suquan/index.html` swaps the engine's content and UI
modules for this game's versions under `suquan/src/` (same paths, same exports); the original game at `/` is unchanged.

- **Run:** `python3 -m http.server 8000` in the repository root, then open http://localhost:8000/suquan/.
- **Officers:** Đinh Bộ Lĩnh (spear), Nguyễn Bặc (glaive), Lê Hoàn (twin swords), Đinh Liễn (bow), Phạm Bạch Hổ
  (serpent spear), Khuông Việt (whisk), Đỗ Cảnh Thạc (halberd, unlocked after chapter III).
- **Chapters:** Hoa Lư (951), Tây Phù Liệt (≈966), Đỗ Động Giang (≈967), Phong Châu (967–968).
- **Trials:** Thiên Nhân Trảm (1,000 KOs in 3:00), Tử Thủ (hold the crossing, after II), Bình Thập Nhị Sứ (four boss
  duels, after IV), plus endless Free Battle.
- **Progression:** four difficulties (Tu La unlocks after a Hard clear), S–C ranks, per-officer records in localStorage.
- **Controls:** WASD move, J attack, K charge (hold to aim with the bow), Space jump, L dodge, I Musou, R recenter, Esc pause.
- **Text:** Vietnamese everywhere with English subtitles; seals, Musou copy, banner glyphs and prologue columns in Hán.
- **Fonts:** Playfair Display, Alegreya, Be Vietnam Pro and a Yuji Boku subset, all SIL OFL 1.1 (`suquan/fonts/OFL.txt`).

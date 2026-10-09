<h1 align="center">護靈壯士 · Hộ Linh Tráng Sĩ</h1>

<p align="center"><b>Bí ẩn mộ vua Đinh · 979</b><br>Một trò chơi hành động «nhất kỵ đương thiên» bằng khối voxel, chạy ngay trên trình duyệt — sáu màn, bảy tráng sĩ, chín mươi chín cỗ quan tài.</p>

---

## Trò chơi

Năm 979, Đại Cồ Việt vừa thoát thời loạn mười hai sứ quân thì **Đinh Tiên Hoàng** bị sát hại ngay trong cung Hoa Lư.
Nguyễn Bặc mở mật lệnh nhà vua đã dự liệu từ trước: đóng **chín mươi chín cỗ quan tài giống hệt nhau**, chia theo
**bảy đường**, để không kẻ nào tìm được nơi an táng thật mà đào mộ, phá long mạch, biến ngôi mộ thành công cụ chia nước.
Bảy hộ linh nhận bảy tuyến đường; bị truy sát từ bên ngoài và phản bội từ bên trong, họ phải hoàn thành đại sự rồi mang
bí mật xuống mồ.

Trò chơi chuyển thể từ kịch bản truyện tranh **«Hộ Linh Tráng Sĩ: Bí Ẩn Mộ Vua Đinh»** (20 chương × 6 khung): bối cảnh,
cốt truyện, ma trận nhân vật và các *character design token* của truyện được dựng lại thành tướng, NPC, chiến trường và
kịch bản trận đánh. Bạn điều khiển một tráng sĩ giữa hàng trăm quân địch: chém qua từng lớp quân, hạ tướng địch, tích đầy
thanh vàng rồi tung **Vô Song**. Lời thoại và màn hình bằng tiếng Việt, tiếng Anh là phụ đề nhỏ; ấn triện, câu đề Vô Song,
chữ trên cờ hiệu và các cột thư pháp trong màn mở đầu giữ chữ Hán.

Ba tầng sự thật được tách bạch như trong phụ lục của kịch bản: **sử liệu nền** (Đinh Tiên Hoàng thống nhất đất nước; năm
979 ông và Đinh Liễn bị sát hại; Dương hậu nhiếp chính; Nguyễn Bặc) · **huyền tích** (99 quan tài, nhiều hướng đưa tang,
bí mật mộ vua) · **hư cấu chuyển thể** (An Nhiên, Nguyên Phong, bảy chức phận hộ linh, sát thủ, nội gián, lời thoại).
Trò chơi không nêu tên hung thủ năm 979 và **không bao giờ chỉ ra vị trí ngôi mộ**.

## Chạy trò chơi

Không cần cài đặt hay build. Từ thư mục gốc của kho mã:

```sh
python3 -m http.server 8000
```

rồi mở **http://localhost:8000/holinh/** (Voxel Musou gốc ở `/`, Thập Nhị Sứ Quân ở `/suquan/`). Cần trình duyệt có
WebGL2; âm thanh bật sau lần bấm phím hoặc nhấp chuột đầu tiên.

Lối tắt khi phát triển: `?go=story|trial|free&char=<tướng>&ch=<màn / thử thách>&map=<chiến trường>&enemies=N`, ví dụ
`http://localhost:8000/holinh/?go=story&char=annhien&ch=rungcotai`. Xem trước một mô hình: thêm `&actor=<id>`
(vd. `?go=free&enemies=0&actor=hoanquan`).

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
| Khóa mục tiêu | <kbd>R</kbd> | <kbd>L1</kbd> <kbd>L2</kbd> |
| Ngắm bắn (Nguyên Phong) | giữ <kbd>K</kbd> / chuột phải, thả ra là bắn | giữ <kbd>Y</kbd> △ |
| Tạm dừng | <kbd>Esc</kbd> | — |

## Các tráng sĩ

| Tướng | Hán | Binh khí | Vô Song | Ghi chú |
| --- | --- | --- | --- | --- |
| **An Nhiên** | 安然 | Thương | Bạch Lau Phá Trận | Con gái Tả Tướng, trái lệnh thay cha lên đường |
| **Nguyên Phong** | 元風 | Cung săn | Phong Tiễn Xuyên Lâm | Thợ săn mồ côi do Thầy Mo nuôi; ngắm bắn, trúng đầu tăng bội |
| **Đinh Khang** | 丁康 | Đao sông & móc chèo | Giang Long Cuồng Lãng | Tráng sĩ sông nước; giữ đường sông |
| **Hữu Tướng** | 右將 | Trường đao | Hữu Dực Trấn Quân | Người giữ trục chỉ huy của bảy đường |
| **Tả Tướng** | 左將 | Giáo lớn | Tả Dực Phá Thành | Cha An Nhiên; bị bắt giữ trong hang tối |
| **Thầy Mo Cun** | 巫鈴 | Gậy chuông đồng | Chuông Đồng Mở Núi | Thầy mo người Mường, người vạch bảy sợi chỉ son |
| **Hàng Tướng** | 降將 | Trường kích | Báo Ân Hỏa Lĩnh | Tướng từng được vua tha chết; mở sau Màn I |

Phía đối địch: ba sát thủ **Mặt Sẹo** (疤面), **Mã Hồng Diễm** (紅艷), **Máu Lạnh** (冷血) và kẻ phản bội trong cung,
**Hoạn Quan Tổng Quản** (宦官). Bên ta còn có Đinh Tiên Hoàng, Nguyễn Bặc, Dương Hoàng hậu và Nữ Cận Vệ trên chiến trường.

## Sáu màn

| Màn | Tên | Truyện | Tráng sĩ | Trận |
| --- | --- | --- | --- | --- |
| I | Cờ Lau Qua Quèn Thành | ch. 1 | Hữu Tướng, Tả Tướng | Thung lũng sứ quân giữa núi đá vôi; ba nhịp quân như một lưỡi giáo; mười hai lá cờ hạ xuống; Hàng Tướng buông gươm và được tha |
| II | Đêm Vỡ Hoa Lư | ch. 2–5 | Hữu Tướng, Tả Tướng, Thầy Mo | Đêm cung thành: phong tỏa các cổng, giữ Hoàng hậu và ấu đế, kho chín mươi chín cỗ quan, Mặt Sẹo |
| III | Rừng Có Tai | ch. 6, 7, 10 | An Nhiên, Nguyên Phong | Đường rừng trong mưa: phục binh, hộ tống xe quan, dấu chân giả, lũ quét, sợi chỉ mực tím, Hồng Diễm |
| IV | Cầu Gãy Trên Dòng Sâu | ch. 9, 12 | Đinh Khang, An Nhiên, Nguyên Phong | Cây cầu duy nhất qua vực nước; cầu gãy; quan tài nổi trên khung tre; quán nhỏ cả làng giăng lưới bắt Máu Lạnh |
| V | Đèo Lửa · Hang Tối | ch. 13–14 | An Nhiên, Nguyên Phong, Hàng Tướng | Hàng Tướng dụ kỵ binh lên con đèo chỉ đủ một ngựa; cột lửa báo; hang tối dưới trăng, cứu Tả Tướng, Mặt Sẹo |
| VI | Ngày Bốn Mươi Chín | ch. 15–17 (18–20 ở đoạn kết) | An Nhiên, Nguyên Phong, Tả Tướng, Hữu Tướng, Đinh Khang | Giữ nghi lễ giữa đại chiến; bảy ngọn lửa trên núi; cống đá, cầu đá, cửa đá; Hoạn Quan lộ mặt |

Mỗi màn mở đầu bằng một cuộn tranh mực trên bản đồ (cột thư pháp chữ Hán, lời kể tiếng Việt, phụ đề tiếng Anh) và khép
lại bằng đoạn kết riêng cho từng tráng sĩ. Màn sau mở khi màn trước đã thắng.

## Thử thách và Tự do chiến

- **Thiên Nhân Trảm** (千人斬) — hạ một nghìn quân trong ba phút ở thung lũng Quèn Thành; mở từ đầu.
- **Một Mình Giữ Đèo** (獨守) — giữ con đèo đang cháy; mở sau Màn V.
- **Bảy Đường Truy Sát** (七路) — liên tiếp đấu Hàng Tướng, Máu Lạnh, Hồng Diễm, Mặt Sẹo và Hoạn Quan; mở sau Màn VI.
- **Tự do chiến** — tùy chọn tướng và chiến trường, quân địch kéo đến không ngừng, không ghi chiến tích.

Bốn độ khó **Tân Binh · Bình Thường · Hiểm · Tu La** (Tu La mở sau khi thắng một trận ở độ khó Hiểm); hạng S / A / B / C;
chiến tích lưu trong `localStorage` (khóa `ho-linh-trang-si.save`, `ho-linh-trang-si.diff`), tách riêng với hai trò chơi kia.

## Kiến trúc

Như Thập Nhị Sứ Quân, trò chơi là một **lớp phủ (overlay)** trên engine của Voxel Musou (`src/`, không sửa): importmap
trong `holinh/index.html` thay từng module nội dung / giao diện bằng bản cùng đường dẫn, cùng export trong `holinh/src/`.
Bộ đạo cụ Việt (núi đá vôi, tre, lau, nhà sàn, thuyền, trống đồng…) và phông chữ dùng chung với `suquan/`; game này thêm
quan tài, nến, án thờ, chuông đồng, cò trắng, sợi chỉ son (`holinh/src/world/viet.js`). Quy tắc chi tiết, danh sách nhân
vật, đạo quân và kế hoạch từng màn: [`DESIGN.md`](DESIGN.md).

Kiểm tra không cần trình duyệt: `node holinh/checks/walk.mjs [màn] [tướng]` chạy trọn kịch bản trận với mô phỏng thật;
`node holinh/checks/trials-bot.mjs [thử thách] [tướng]` cho các thử thách.
Thêm chữ Hán mới thì chạy `python3 holinh/fonts/subset.py` để dựng lại `holinh/fonts/han-brush.woff2`.

## Ghi công

- Engine *Voxel Musou*: MIT, xem [LICENSE](../LICENSE). [three.js](https://threejs.org/): MIT.
- Phông chữ Playfair Display, Alegreya, Be Vietnam Pro, Yuji Boku — SIL Open Font License 1.1 ([fonts/OFL.txt](fonts/OFL.txt)).
- Cốt truyện chuyển thể từ kịch bản truyện tranh «Hộ Linh Tráng Sĩ: Bí Ẩn Mộ Vua Đinh» do người dùng cung cấp (bản biên
  tập từ các nguồn giới thiệu công khai về bộ phim cùng tên); mô hình voxel là thiết kế mới, không dùng hình ảnh của phim.

Dự án của người hâm mộ, không liên quan đến KOEI TECMO hay đơn vị sản xuất phim.

---

## English summary

**護靈壯士 · Hộ Linh Tráng Sĩ** (*The Guardians of the First Emperor's Tomb*) is a third game on the Voxel Musou engine,
adapted from a 20-chapter comic script: in 979, after Đinh Tiên Hoàng is murdered at Hoa Lư, seven guardians carry 99
identical coffins along seven roads so no one can find the true grave — hunted from outside, betrayed from within.

- **Run:** `python3 -m http.server 8000` in the repository root, then http://localhost:8000/holinh/.
- **Officers:** An Nhiên (spear), Nguyên Phong (bow), Đinh Khang (river blade & hook), the Right General (long saber), the
  Left General (broad spear), Shaman Mo Cun (bell staff), the Yielded General (halberd, after Stage I).
- **Stages:** Quèn Thành · The Night Hoa Lư Broke · The Forest Has Ears · The Broken Bridge · The Burning Pass, the Dark
  Cave · The Forty-Ninth Day.
- **Trials:** Thousand Slain, Alone on the Pass (after V), The Seven Roads Hunted (five boss duels, after VI), Free Battle.
- **Text:** Vietnamese with English subtitles; seals, Musou copy, banners and prologue columns in Hán.

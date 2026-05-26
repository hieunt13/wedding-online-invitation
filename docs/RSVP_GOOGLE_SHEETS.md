# RSVP → Google Sheets

## 1. Tạo Google Sheet

Hàng 1 (tiêu đề):

| Thời gian | Tên | Lời nhắn | Tham dự | Số khách | Khách của | Hiển thị UI |
|-----------|-----|----------|---------|----------|-----------|-------------|

Cột **Hiển thị UI** (G): mặc định `FALSE` khi khách gửi RSVP. Chỉ lời chúc bạn đổi thành `TRUE` (hoặc tick checkbox) mới hiện trên thiệp.

Gợi ý: chọn cột G → **Insert** → **Checkbox** để bật/tắt nhanh.

## 2. Apps Script

1. Trong Sheet: **Extensions** → **Apps Script**
2. Dán nội dung file [`scripts/google-sheets-rsvp-apps-script.js`](../scripts/google-sheets-rsvp-apps-script.js) (gồm `doPost` ghi RSVP và `doGet` đọc lời chúc)
3. **Deploy** → **New deployment** → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy **Web app URL** (dạng `https://script.google.com/macros/s/.../exec`)

Sau mỗi lần sửa script, cần **Deploy lại** (New deployment) để `doGet` có hiệu lực.

## 3. Biến môi trường

Tạo `.env.local` (local) và thêm secret trên Vercel (production):

```env
GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

Cùng một URL dùng cho ghi RSVP (`POST`) và đọc lời chúc (`GET`).

## 4. Chạy thử RSVP

```bash
npm run dev
```

Gửi form RSVP trên thiệp — dòng mới sẽ xuất hiện trong Sheet.

Nếu API RSVP trả lỗi **405 Method Not Allowed**: kiểm tra Web app đã deploy với `doPost`, và URL trong `.env` kết thúc bằng `/exec` (không phải `/dev`).

## 5. Lời chúc trên thiệp (marquee)

- Chỉ các hàng có **Lời nhắn** (cột C) không rỗng **và** **Hiển thị UI** (cột G) = `TRUE` mới hiển thị.
- RSVP mới luôn ghi `FALSE` ở cột G — bạn duyệt trên Sheet rồi bật `TRUE`.
- Thứ tự: mới nhất trước.
- Trên thiệp: section **Lời chúc** (băng chuyền ngang) trước footer — bật/tắt trong `wedding.config.json` → `wishes.enabled`.

### Kiểm tra `doGet`

Mở Web app URL trên trình duyệt (GET). Kết quả mong đợi:

```json
{ "wishes": [{ "name": "...", "message": "..." }] }
```

### Kiểm tra API Next.js

```bash
curl http://localhost:3000/api/wishes
```

Dữ liệu được cache khoảng **60 giây** trên server. Sau khi có RSVP mới, đợi ~1 phút hoặc refresh cứng để thấy lời chúc mới.

### Cấu hình hiển thị

Trong [`src/config/wedding.config.json`](../src/config/wedding.config.json):

```json
"wishes": {
  "enabled": true,
  "title": "Lời chúc từ bạn bè"
}
```

**Lưu ý:** Web app “Anyone” cho phép đọc mọi lời nhắn qua URL — phù hợp thiệp công khai; không dùng cho dữ liệu nhạy cảm.

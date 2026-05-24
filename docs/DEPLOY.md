# Deploy lên Vercel (GitHub Actions)

Pipeline: [`.github/workflows/vercel.yml`](../.github/workflows/vercel.yml)

| Sự kiện | Hành động |
|---------|-----------|
| PR → `main` | Lint + build + **Preview deploy** |
| Push → `main` | Lint + build + **Production deploy** |

## 1. Tạo project trên Vercel

1. Đăng nhập [vercel.com](https://vercel.com) → **Add New Project**
2. Import repo GitHub `wedding-online-invitation`
3. Framework: **Next.js** (tự nhận)
4. Chưa cần deploy tay — pipeline GitHub Actions sẽ deploy sau khi cấu hình secrets

## 2. Lấy secrets cho GitHub

### `VERCEL_TOKEN`

Vercel → **Account Settings** → **Tokens** → Create → copy token.

### `VERCEL_ORG_ID` và `VERCEL_PROJECT_ID`

Trên máy local (đã cài [Vercel CLI](https://vercel.com/docs/cli)):

```bash
npm i -g vercel
cd wedding-online-invitation
vercel login
vercel link
```

Sau `vercel link`, mở file `.vercel/project.json`:

```json
{
  "orgId": "team_xxxx",
  "projectId": "prj_xxxx"
}
```

- `orgId` → secret **VERCEL_ORG_ID**
- `projectId` → secret **VERCEL_PROJECT_ID**

## 3. Thêm secrets vào GitHub

Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret | Giá trị |
|--------|---------|
| `VERCEL_TOKEN` | Token từ bước 2 |
| `VERCEL_ORG_ID` | `orgId` |
| `VERCEL_PROJECT_ID` | `projectId` |

## 4. Chạy pipeline

```bash
git push origin main
```

Vào tab **Actions** trên GitHub để xem log. Production URL nằm trong Vercel dashboard hoặc output bước deploy.

## Ghi chú

- **Region**: `vercel.json` đặt `sin1` (Singapore) — đổi region nếu cần.
- **Ảnh local** (`/images/*`) nằm trong `public/` — Vercel serve tự động.
- Nếu build báo lockfile/workspace root: đảm bảo repo chỉ có một `package-lock.json` ở thư mục gốc project.

## Deploy thủ công (tùy chọn)

```bash
npm run build
vercel deploy --prebuilt --prod
```

## Khắc phục: mở link bị bắt đăng nhập Vercel

**Nguyên nhân:** Không phải lỗi code thiệp cưới. Vercel đang bật **Deployment Protection** (Vercel Authentication) — khách phải login tài khoản Vercel mới xem được.

### Cách tắt (khuyến nghị cho thiệp cưới public)

1. [vercel.com](https://vercel.com) → chọn project **wedding-online-invitation**
2. **Settings** → **Deployment Protection**
3. Ở mục **Production**:
   - Tắt **Vercel Authentication**, hoặc
   - Chọn **Only Preview Deployments** (chỉ bảo vệ preview, production mở công khai)
4. **Save**

### Link nên gửi khách

Dùng **Production domain**, ví dụ:

- `https://ten-project.vercel.app`
- hoặc domain riêng đã gắn (nếu có)

**Không** gửi link dạng deployment preview từ PR (thường bị bảo vệ):

- `https://wedding-online-invitation-xxxxx-team.vercel.app` (preview)

### Gửi thiệp có tên khách

```
https://ten-project.vercel.app/?guest=Nguyễn Văn An
```

### Vẫn bị login sau khi tắt?

- Kiểm tra **Team Settings** → **Deployment Protection** (cài team có thể override project)
- Thử tab ẩn danh / điện thoại chưa login Vercel
- **Deployments** → deployment **Production** → **Visit** để lấy đúng URL production


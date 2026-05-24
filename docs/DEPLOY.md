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

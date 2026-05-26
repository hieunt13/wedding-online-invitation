import { fetchWishesFromSheets } from "@/lib/get-wishes";

export const revalidate = 60;

export async function GET() {
  const result = await fetchWishesFromSheets();

  if (result.ok) {
    return Response.json({ wishes: result.wishes });
  }

  if (result.reason === "missing_env") {
    return Response.json(
      { error: "Lời chúc chưa được cấu hình (thiếu GOOGLE_SHEETS_WEB_APP_URL)." },
      { status: 503 },
    );
  }

  if (result.reason === "upstream_error") {
    return Response.json(
      { error: "Không đọc được lời chúc từ Google Sheets." },
      { status: 502 },
    );
  }

  return Response.json(
    { error: "Không kết nối được Google Sheets. Thử lại sau." },
    { status: 502 },
  );
}

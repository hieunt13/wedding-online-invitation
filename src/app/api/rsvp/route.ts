import { formatRsvpTimestamp, type RsvpSubmissionPayload } from "@/lib/rsvp";

function isValidPayload(body: unknown): body is RsvpSubmissionPayload {
  if (!body || typeof body !== "object") return false;
  const row = body as Record<string, unknown>;
  return (
    typeof row.name === "string" &&
    row.name.trim().length > 0 &&
    typeof row.attendance === "string" &&
    row.attendance.length > 0 &&
    typeof row.guestSide === "string" &&
    row.guestSide.length > 0
  );
}

export async function POST(request: Request) {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();

  if (!webAppUrl) {
    return Response.json(
      { error: "RSVP chưa được cấu hình (thiếu GOOGLE_SHEETS_WEB_APP_URL)." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return Response.json({ error: "Vui lòng điền đầy đủ thông tin." }, { status: 400 });
  }

  const payload = {
    timestamp: formatRsvpTimestamp(),
    name: body.name.trim(),
    message: (body.message ?? "").trim(),
    attendance: body.attendance,
    attendanceLabel: body.attendanceLabel,
    guestSide: body.guestSide,
    guestSideLabel: body.guestSideLabel,
    guestCount: (body.guestCount ?? "").trim(),
  };

  try {
    const upstream = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await upstream.text();
    console.log(text);
    let result: { ok?: boolean; error?: string } = {};
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      result = {};
    }

    if (!upstream.ok || result.ok === false) {
      return Response.json(
        { error: result.error ?? "Google Sheets từ chối lưu dữ liệu." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Không kết nối được Google Sheets. Thử lại sau." },
      { status: 502 },
    );
  }
}

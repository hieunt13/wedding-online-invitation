/**
 * Google Apps Script — dán vào Extensions → Apps Script của Google Sheet RSVP.
 * Deploy: Deploy → New deployment → Web app
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copy URL deployment vào .env → GOOGLE_SHEETS_WEB_APP_URL
 *
 * Hàng 1 (tiêu đề):
 * Thời gian | Tên | Lời nhắn | Tham dự | Số khách | Khách của | Hiển thị UI
 */
function isDisplayEnabled(value) {
  if (value === true) return true;
  if (value === false || value === "" || value == null) return false;
  var normalized = String(value).trim().toLowerCase();
  return (
    normalized === "true" ||
    normalized === "yes" ||
    normalized === "1" ||
    normalized === "có" ||
    normalized === "x"
  );
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.message || "",
      data.attendanceLabel || data.attendance || "",
      data.guestCount || "",
      data.guestSideLabel || data.guestSide || "",
      false,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, data: [
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.message || "",
      data.attendanceLabel || data.attendance || "",
      data.guestCount || "",
      data.guestSideLabel || data.guestSide || "",
      false,
    ] }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Đọc lời chúc hiển thị trên thiệp.
 * Cột G (Hiển thị UI) phải là true mới đưa lên UI.
 */
function doGet() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var wishes = [];

    for (var i = 1; i < rows.length; i++) {
      var name = String(rows[i][1] || "").trim();
      var message = String(rows[i][2] || "").trim();
      var displayOnUi = rows[i][6];

      if (!message) continue;
      if (!isDisplayEnabled(displayOnUi)) continue;

      wishes.push({
        name: name || "Khách mời",
        message: message,
      });
    }

    wishes.reverse();

    return ContentService.createTextOutput(
      JSON.stringify({ wishes: wishes }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ wishes: [], error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

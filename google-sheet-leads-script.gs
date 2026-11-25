/**
 * Boring Agents: save website form leads to Google Sheets.
 *
 * Setup (about 3 minutes):
 * 1. Open the "Boring Agents - Website Leads" sheet.
 * 2. Extensions > Apps Script. Delete what is there and paste this whole file. Save.
 * 3. Deploy > New deployment > Select type: Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, allow access, and copy the Web app URL (ends in /exec).
 * 4. Paste that URL into the website file, in the line:
 *      const SHEET_ENDPOINT = "";
 *
 * Each form submission adds one row with these columns:
 * Submitted at | Name | Business | Phone / WhatsApp | Email | City or area | Interested in | Message | Job suggestion
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = (e && e.parameter) || {};
  var clean = function (v) {
    v = String(v || '').slice(0, 2000);
    // Stop spreadsheet formula injection from form text.
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  };
  sheet.appendRow([
    new Date(),
    clean(p.name),
    clean(p.business),
    clean(p.phone),
    clean(p.email),
    clean(p.city),
    clean(p.interests),
    clean(p.message),
    clean(p.suggestion)
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

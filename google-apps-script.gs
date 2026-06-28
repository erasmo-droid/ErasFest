// Planilha de confirmações do Eras Fest 2026.
const PLANILHA_ID = '1WmHD4Lk-OwMYbSNCzYR7SK1KaLGettr7tcEDDptbwrs';
function doPost(e) {
  const arquivo = SpreadsheetApp.openById(PLANILHA_ID);
  const sheet = arquivo.getSheetByName('Confirmações')
    || arquivo.insertSheet('Confirmações');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data e hora', 'Nome', 'Presença', 'Acompanhantes']);
    sheet.setFrozenRows(1);
  }
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.nome || '', data.presenca || '', data.acompanhantes || '0']);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}



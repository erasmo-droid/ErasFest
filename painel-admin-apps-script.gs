// Use este código em um SEGUNDO projeto do Apps Script, exclusivo para o painel.
const PLANILHA_ID = '1WmHD4Lk-OwMYbSNCzYR7SK1KaLGettr7tcEDDptbwrs';
const ADMIN_EMAIL = 'erasmo@breconsultoria.com.br';

function autorizar_() {
  const email = Session.getActiveUser().getEmail().toLowerCase();
  if (email !== ADMIN_EMAIL.toLowerCase()) {
    throw new Error('Acesso não autorizado para esta conta.');
  }
}

function doGet() {
  autorizar_();
  return HtmlService.createHtmlOutputFromFile('painel-admin')
    .setTitle('Painel Eras Fest 2026')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getDados() {
  autorizar_();
  const sheet = SpreadsheetApp.openById(PLANILHA_ID).getSheetByName('Confirmações');
  if (!sheet || sheet.getLastRow() < 2) return [];
  if (sheet.getLastColumn() < 5) sheet.getRange(1, 5).setValue('Check-in');
  const tz = Session.getScriptTimeZone() || 'America/Sao_Paulo';
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues().map((r, i) => ({
    linha: i + 2,
    data: r[0] instanceof Date ? Utilities.formatDate(r[0], tz, 'dd/MM/yyyy HH:mm') : String(r[0] || ''),
    nome: String(r[1] || ''),
    presenca: String(r[2] || ''),
    acompanhantes: Number(r[3] || 0),
    checkin: r[4] === true || String(r[4]).toLowerCase() === 'sim'
  })).filter(r => r.nome);
}

function registrarCheckin(linha, presente) {
  autorizar_();
  linha = Number(linha);
  if (!Number.isInteger(linha) || linha < 2) throw new Error('Linha inválida.');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(PLANILHA_ID).getSheetByName('Confirmações');
    sheet.getRange(linha, 5).setValue(Boolean(presente));
    SpreadsheetApp.flush();
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

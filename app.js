// Cole aqui a URL publicada pelo Google Apps Script quando a planilha estiver pronta.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDHxay6CMy9igyYNDJjgwUWHeBqEeAYpdR9SBNWQusbVLlpcOvgFr69tbpeU7-LzzBLg/exec';

document.querySelectorAll('[data-rsvp-form]').forEach((form) => {
  const success = form.parentElement.querySelector('[data-success]');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = 'REGISTRANDO...';
    const payload = Object.fromEntries(new FormData(form));
    payload.dataHora = new Date().toISOString();

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
      } else {
        const respostas = JSON.parse(localStorage.getItem('erasFestRespostas') || '[]');
        respostas.push(payload);
        localStorage.setItem('erasFestRespostas', JSON.stringify(respostas));
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (_) {
      alert('Não foi possível registrar agora. Tente novamente em instantes.');
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });

  success?.querySelector('[data-reset]')?.addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
  });
});


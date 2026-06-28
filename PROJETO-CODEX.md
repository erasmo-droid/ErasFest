# Eras Fest 2026 — contexto para o Codex

> Leia este arquivo antes de alterar o projeto. Ele é o documento de continuidade entre computadores e sessões do Codex.

## Objetivo

O projeto possui duas aplicações ligadas à mesma Planilha Google:

1. **Convite público**, hospedado no GitHub Pages, para os convidados confirmarem presença.
2. **Painel administrativo privado**, hospedado no Google Apps Script, para consultar respostas e fazer check-in na portaria.

A identidade visual segue o flyer Eras Fest 2026: preto, vermelho, textura grunge e estética rock n' roll.

## Links de produção

- Site público: <https://erasmo-droid.github.io/ErasFest/>
- Repositório: <https://github.com/erasmo-droid/ErasFest>
- Planilha: <https://docs.google.com/spreadsheets/d/1WmHD4Lk-OwMYbSNCzYR7SK1KaLGettr7tcEDDptbwrs/edit>
- Endpoint público de confirmação: <https://script.google.com/macros/s/AKfycbxDHxay6CMy9igyYNDJjgwUWHeBqEeAYpdR9SBNWQusbVLlpcOvgFr69tbpeU7-LzzBLg/exec>
- Painel administrativo privado: <https://script.google.com/macros/s/AKfycbxPNVaVwZh0U5DZ0eoZVrN1voZUgGmUQRhQFNJMFs-XbwFyXjjiDrBeUcmuTrstPfv81g/exec?authuser=erasmo@breconsultoria.com.br>

## Estado atual

- Site público publicado e respondendo por HTTPS.
- Formulário testado e gravando na aba `Confirmações`.
- Colunas da planilha: `Data e hora`, `Nome`, `Presença`, `Acompanhantes` e `Check-in`.
- Painel administrativo implantado em um segundo projeto do Apps Script.
- Painel restrito à conta `erasmo@breconsultoria.com.br`.
- Usuários sem a conta autorizada recebem a mensagem `Acesso não autorizado para esta conta`.
- O painel combina os modelos escolhidos: **Lista administrativa + Check-in**.

## Arquitetura

```text
Convidado
   │
   ▼
GitHub Pages (index.html + app.js)
   │ POST
   ▼
Apps Script público (google-apps-script.gs)
   │
   ▼
Planilha Google / aba Confirmações
   ▲
   │ leitura + check-in
Apps Script privado (painel-admin-apps-script.gs + painel-admin.html)
   ▲
   │ login Google obrigatório
Administrador
```

## Arquivos principais

- `index.html`: convite público selecionado, modelo Palco.
- `styles.css`: estilos do convite e das prévias.
- `app.js`: envio das confirmações ao endpoint público.
- `google-apps-script.gs`: backend público que grava as confirmações.
- `painel-admin.html`: interface final do painel administrativo.
- `painel-admin-apps-script.gs`: backend privado, leitura e check-in.
- `PAINEL-ADMIN.md`: instruções de implantação do painel.
- `Flyer_Eras_Fest_2026-Story.png`: flyer vertical usado no convite.
- `Flyer_Eras_Fest_2026-quadrado.png`: flyer quadrado.

Arquivos `modelo-*.html` e `painel-*.html` são estudos e prévias. Não substitua a aplicação final por eles sem pedido expresso do usuário.

## Regras de segurança

1. O convite público pode gravar respostas, mas não deve listar convidados.
2. Nunca adicione leitura da planilha ao GitHub Pages: isso exporia nomes publicamente.
3. O painel real deve continuar no segundo Apps Script, protegido por login Google.
4. Não coloque senhas, tokens ou credenciais no repositório.
5. Não remova a validação de `ADMIN_EMAIL` do painel sem autorização expressa.
6. Ao adicionar outro administrador, use uma lista explícita de e-mails permitidos.

## Como trabalhar no computador de casa

```powershell
git clone https://github.com/erasmo-droid/ErasFest.git
cd ErasFest
```

Abra a pasta clonada no Codex e peça:

> Leia `PROJETO-CODEX.md` e continue o projeto Eras Fest 2026 respeitando a arquitetura e as regras de segurança.

Para visualizar o convite localmente, abra `index.html` no navegador. A produção é atualizada por push na branch `main`.

## Fluxo de publicação do site

```powershell
git add <arquivos alterados>
git commit -m "Descrição objetiva da mudança"
git push origin main
```

O GitHub Pages publica a branch `main`, pasta `/ (root)`. Após o push, aguarde a construção e valide:

- página principal;
- visual no celular;
- carregamento dos flyers;
- envio de uma confirmação de teste;
- registro correto na planilha.

Apague da planilha as linhas claramente identificadas como teste depois da validação.

## Atualização dos Apps Scripts

Alterar um arquivo `.gs` ou `painel-admin.html` no GitHub **não atualiza automaticamente** o Apps Script. Depois de editar:

1. Copie o conteúdo atualizado para o projeto correto no Apps Script.
2. Abra **Implantar > Gerenciar implantações > Editar**.
3. Selecione **Nova versão**.
4. Clique em **Implantar**.
5. Teste novamente a URL `/exec`.

Existem dois projetos separados:

- **Confirmação pública:** executa como o proprietário e permite acesso a qualquer pessoa.
- **Painel administrativo:** executa com usuário autenticado e valida `erasmo@breconsultoria.com.br`.

Não misture as implantações: as políticas de acesso são diferentes de propósito.

## Comportamento esperado

### Convite

- Solicita nome, presença e acompanhantes.
- Exibe confirmação visual após o envio.
- Registra data e hora automaticamente.
- Funciona bem em celular.

### Painel

- Lê respostas reais da aba `Confirmações`.
- Mostra confirmados, acompanhantes, ausências e total esperado.
- Permite busca e filtro.
- Alterna entre os modos `Lista` e `Check-in`.
- Grava a chegada na coluna `Check-in`.
- Conta o convidado e seus acompanhantes quando o grupo chega.

## Próximas melhorias possíveis

- Permitir mais de um administrador com lista de e-mails autorizados.
- Registrar horário exato do check-in em uma coluna adicional.
- Adicionar botão para desfazer check-in com confirmação.
- Gerar relatório final de presentes e ausentes.
- Melhorar compartilhamento em WhatsApp com imagem e metadados sociais.
- Criar QR Code para o convite público e atalho privado para o painel.

Antes de implementar qualquer melhoria, preserve o funcionamento atual e confirme se ela pertence ao convite público ou ao painel privado.

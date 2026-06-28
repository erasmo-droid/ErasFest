# Painel administrativo Eras Fest 2026

O painel combina a lista de presenças com o check-in de portaria. Ele deve ser publicado em um segundo projeto do Google Apps Script para manter os nomes dos convidados restritos à conta administradora.

1. Acesse `script.google.com` e crie um **Novo projeto**.
2. No arquivo `Código.gs`, cole o conteúdo de `painel-admin-apps-script.gs`.
3. Clique no `+` ao lado de Arquivos, escolha **HTML**, dê o nome `painel-admin` e cole o conteúdo de `painel-admin.html`.
4. Em **Configurações do projeto**, defina o fuso horário como `America/Sao_Paulo`.
5. Clique em **Implantar > Nova implantação > App da Web**.
6. Escolha **Executar como: usuário que acessa o app da Web** e permita acesso a usuários com conta Google.
7. Abra a URL usando a conta `erasmo@breconsultoria.com.br`.

Não publique esse painel como uma página pública do GitHub Pages. A versão hospedada no Apps Script valida a conta Google antes de liberar os dados.

# StoreLab · Portfólio do Projeto de Estágio

Site estático (HTML + CSS + JS, sem build) publicado no GitHub Pages.

## O que preencher
Tudo que muda fica em `js/dados.js` (procure por `PREENCHER` e `CONFIRMAR`):
- dados do aluno, orientador e matrícula;
- datas do cronograma e marcos da evolução;
- ID do vídeo (YouTube ou Google Drive, com acesso "qualquer pessoa com o link").

Arquivos:
- prints em `assets/telas/` (nomes listados em `js/dados.js`);
- relatório em `assets/docs/relatorio-estagio.pdf`;
- diagramas em `assets/diagramas/` (já incluídos; gerados a partir dos `.puml` do back-end).

## Rodar localmente
```bash
python3 -m http.server 8000   # abra http://localhost:8000
```

## Publicar no GitHub Pages
1. Crie um repositório público (ex.: `storelab-portfolio`) e faça push deste diretório na branch `main`.
2. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`**.
3. O site fica em `https://<seu-usuario>.github.io/storelab-portfolio/`.

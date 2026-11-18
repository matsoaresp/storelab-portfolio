/* ==========================================================================
   DADOS DO PORTFOLIO
   Tudo que muda (aluno, links, datas, prints, video, PDF) fica neste arquivo.
   Procure por "PREENCHER" e "CONFIRMAR" para achar o que falta.
   ========================================================================== */

window.PORTFOLIO = {
  /* 7. Identificacao do aluno ------------------------------------------- */
  aluno: {
    nome: "Mateus Soares Prado",
    matricula: "242072010",
    orientador: "Profa. Renata Porto Gransoti",
    curso: "Engenharia de Software",
    instituicao: "UniFil - Centro Universitário Filadélfia",
    empresa: "NPI - Núcleo de Práticas de Informática",
    periodo: "2026",
  },

  /* Evolucao do trabalho (linha do tempo). Tirado do historico do Git;
     acrescente/edite as entregas do bimestre. */
  marcos: [
    { data: "2026-05-18", titulo: "Início do projeto", texto: "Estrutura do front-end (React + Vite) e do back-end (Spring Boot), primeiras páginas e entidades." },
    { data: "2026-06-07", titulo: "Segurança e autenticação", texto: "Spring Security, JWT, cadastro e login integrados ao front-end." },
    { data: "2026-06-21", titulo: "Painel e integração", texto: "Dashboard do usuário, rotas protegidas e correções de autenticação." },
    { data: "2026-08-23", titulo: "Refatoração da gestão de usuários", texto: "Reorganização em camadas, DTOs e regras de papéis." },
    { data: "2026-08-28", titulo: "Projetos", texto: "Cadastro e gestão de projetos com membros e categorias." },
    { data: "2026-09-05", titulo: "Área do administrador", texto: "Gestão de professores, alunos e administradores; vínculo em massa." },
    { data: "2026-09-19", titulo: "Avaliação do professor", texto: "Parecer, nota e publicação na vitrine." },
    { data: "2026-11-14", titulo: "Comunidade, moderação e documentação", texto: "Estrelas, curtidas, moderação, notificações por e-mail, tema escuro e diagramas atualizados." }, // CONFIRMAR
  ],

  /* Repositorios publicos ------------------------------------------------ */
  repositorios: {
    frontend: "https://github.com/matsoaresp/StoreLab_FrontEnd",
    backend: "https://github.com/matsoaresp/StoreLab_BackEnd",
  },

  /* 3. Cronograma --------------------------------------------------------
     Os 7 casos de uso do relatorio (diagrama do Astah).
     status: "concluido" | "andamento" | "planejado". Datas AAAA-MM-DD.
     As marcadas com CONFIRMAR foram estimadas; ajuste para as datas reais. */
  cronograma: [
    { caso: "Gerenciar Usuários", atores: "Aluno, Professor, Administrador", inicio: "2026-05-28", conclusao: "2026-09-05", status: "concluido" },
    { caso: "Gerenciar Projetos", atores: "Aluno, Professor, Administrador", inicio: "2026-08-23", conclusao: "2026-09-19", status: "concluido" },
    { caso: "Aprovar Projeto", atores: "Professor", inicio: "2026-09-05", conclusao: "2026-09-19", status: "concluido" },
    { caso: "Gerenciar Categorias", atores: "Administrador", inicio: "2026-09-20", conclusao: "2026-10-03", status: "concluido" }, // CONFIRMAR
    { caso: "Avaliar Projeto", atores: "Visitante, Aluno", inicio: "2026-10-04", conclusao: "2026-10-17", status: "concluido" }, // CONFIRMAR
    { caso: "Moderar Comentários", atores: "Administrador", inicio: "2026-10-18", conclusao: "2026-10-31", status: "concluido" }, // CONFIRMAR
    { caso: "Receber Notificações por E-mail", atores: "Aluno", inicio: "2026-11-01", conclusao: "2026-11-07", status: "concluido" }, // CONFIRMAR
  ],

  /* 4. Documentacao --------------------------------------------------------
     Imagens em assets/diagramas/ (as mesmas figuras do relatorio) e links do
     Google Drive (todos com acesso "qualquer pessoa com o link"). */
  diagramas: [
    { grupo: "Diagrama de Casos de Uso", aba: "Casos de Uso", itens: [
      { titulo: "Casos de Uso · StoreLab", descricao: "Quatro atores e sete casos de uso dentro da fronteira do StoreLab. Aluno herda de Visitante e Administrador herda de Professor. (Figura 1 do relatório)", arquivo: "casos-de-uso.png", drive: "https://drive.google.com/file/d/1Jn2C-f075_y1DpkWQlBCD1PhK-9MTv4Q/view" },
    ]},
    { grupo: "Diagrama de Classes", aba: "Classes", itens: [
      { titulo: "Diagrama de Classes", descricao: "Classes de fronteira (telas), controle (controllers) e entidade (modelo de dados), com atributos, operações e multiplicidades. (Figura 3)", arquivo: "classes.png", drive: "https://drive.google.com/file/d/1Jdavfere5hcsRkSE0ushVoL5BNTvyHiu/view" },
    ]},
    { grupo: "Diagramas de Sequência", aba: "Sequência", itens: [
      { titulo: "Gerenciar Usuários", descricao: "Cadastro, edição, inativação, reativação e exclusão de usuários, incluindo as respostas da API em cada passo. (Figura 4)", arquivo: "sequencia-gerenciar-usuarios.png", drive: "https://drive.google.com/file/d/1U3SKaE79H_4IuGTxBI0bQKjf_CT4JkQ-/view" },
      { titulo: "Gerenciar Projetos", descricao: "Listagem, edição, inativação, reativação e exclusão de projetos pelo professor. (Figura 5)", arquivo: "sequencia-gerenciar-projetos.png", drive: "https://drive.google.com/file/d/1Nn9SBa4FhXVtFbLfKosYgmvZAjk3F11k/view" },
      { titulo: "Avaliar Projeto", descricao: "Avaliação com estrelas e comentário, por visitante e por usuário logado, com as regras de limite e de moderação. (Figura 6)", arquivo: "sequencia-avaliar-projeto.png" },
      { titulo: "Gerenciar Notificações", descricao: "Após o parecer do professor, uma notificação é criada para cada integrante e o e-mail é enviado de forma assíncrona. (Figura 7)", arquivo: "sequencia-gerenciar-notificacoes.png" },
      { titulo: "Gerenciar Categorias", descricao: "Criação, edição e exclusão de categorias pelo administrador, com verificação de nome duplicado. (Figura 8)", arquivo: "sequencia-gerenciar-categorias.png" },
    ]},
    { grupo: "Diagramas de Estados", aba: "Estados", itens: [
      { titulo: "Estados do Usuário", descricao: "O usuário nasce Ativo, pode ser inativado e reativado, e é removido quando não tem projeto vinculado. (Figura 9)", arquivo: "estados-usuario.png" },
      { titulo: "Estados do Projeto", descricao: "Em avaliação → Publicado quando aprovado; inativar e reativar em qualquer estado; exclusão lógica no fim. (Figura 10)", arquivo: "estados-projeto.png" },
      { titulo: "Estados do Comentário da Avaliação", descricao: "Comentário de visitante começa Pendente e vai para Aprovado ou Rejeitado na moderação; o de usuário logado já nasce Aprovado. (Figura 11)", arquivo: "estados-comentario.png" },
    ]},
    { grupo: "Outros diagramas", aba: "Outros", itens: [
      { titulo: "Diagrama Entidade-Relacionamento", descricao: "Tabelas do PostgreSQL com campos, tipos, chaves primárias e estrangeiras e cardinalidades. (Figura 2)", arquivo: "der.png", drive: "https://drive.google.com/file/d/1EMuXOBnKNdFq_1QTXHhxFg_h0tuAex0N/view" },
      { titulo: "Modelo Lógico do Banco (brModelo)", descricao: "Modelo lógico das tabelas gerado no brModelo, complementar ao DER.", arquivo: "modelo-logico.png" },
      { titulo: "Diagrama de Implantação", descricao: "Servidor Ubuntu com a aplicação Java 21 e o PostgreSQL, acessado pelo navegador do usuário com o front-end React via TCP/IP. (Figura 12)", arquivo: "implantacao.png", drive: "https://drive.google.com/file/d/1sTycuhw6CvDsAxuJ-9LDdbnSz8fOwvYa/view" },
      { titulo: "Workflow AS-IS (BPMN)", descricao: "Como era o processo antes do StoreLab: o aluno montava um portfólio estático e o professor aprovava manualmente para a galeria. (Figura 28)", arquivo: "bpmn-as-is.png", drive: "https://drive.google.com/file/d/1LwI2IQtraNmexVIqmc53FEnw71HmzV5n/view" },
    ]},
  ],

  /* Artefatos de requisitos (RUP), todos em PDF no Google Drive */
  artefatos: [
    { titulo: "Documento de Visão", descricao: "Propósito, escopo, funcionalidades principais e benefícios do sistema.", url: "https://drive.google.com/file/d/1RJbAlZX6ETqKzL5limzttOsXzRQ_lUPU/view" },
    { titulo: "Pedido do Investidor", descricao: "Necessidades e expectativas levantadas junto ao investidor.", url: "https://drive.google.com/file/d/1enU3AptA-CpgA7kas8cbpzN5yeyM_Qn5/view" },
    { titulo: "Especificação de Caso de Uso · Gerenciar Usuário", descricao: "Fluxos principal, alternativos e regras do caso de uso.", url: "https://drive.google.com/file/d/1I-6I7NkrIF7XZ7WOkXFbwfwoVtpJtBxO/view" },
    { titulo: "Especificação de Caso de Uso · Gerenciar Projeto", descricao: "Fluxos principal, alternativos e regras do caso de uso.", url: "https://drive.google.com/file/d/1BMFMaWh9FjMNq7fzkM5KMCK9-6bVxCNn/view" },
    { titulo: "Especificação Suplementar", descricao: "Requisitos não funcionais: desempenho, segurança, usabilidade e confiabilidade.", url: "https://drive.google.com/file/d/1IWBwtsW-2m2xO-ct_iI6-ooJIZ2hhHdc/view" },
    { titulo: "Glossário", descricao: "Termos técnicos e de domínio usados na documentação.", url: "https://drive.google.com/file/d/1UtSEGdy7Sqiq8Ff1zvNPSiFnNuYr001a/view" },
  ],

  /* Cronograma de entregas do estagio (figura do relatorio) */
  cronogramaEntregas: {
    imagem: "assets/diagramas/cronograma-entregas.png",
    drive: "https://drive.google.com/file/d/1rro6zhLUeif62PifMCVnFsFnWSKkSWrU/view",
  },

  /* 5. Telas --------------------------------------------------------------
     Prints em assets/telas/ (desktop, tema claro), agrupados por perfil. */
  telas: [
    { grupo: "Área pública", arquivo: "assets/telas/01-vitrine-hoje.webp", titulo: "Vitrine · Hoje", descricao: "Página inicial pública: jogos em destaque, lista de jogos e filtro por categoria, sem precisar de login." },
    { grupo: "Área pública", arquivo: "assets/telas/02-detalhe-projeto.webp", titulo: "Detalhe do projeto", descricao: "Capa, equipe com o criador, data de publicação, média de estrelas e avaliações." },
    { grupo: "Área pública", arquivo: "assets/telas/03-login.webp", titulo: "Login", descricao: "Entrada com login institucional e senha (autenticação JWT)." },
    { grupo: "Área pública", arquivo: "assets/telas/04-cadastro-aluno.webp", titulo: "Criar conta de aluno", descricao: "Autocadastro com validação de login, e-mail institucional e senha forte." },
    { grupo: "Área pública", arquivo: "assets/telas/05-setup-admin.webp", titulo: "Configuração inicial", descricao: "Cadastro do primeiro administrador do sistema." },
    { grupo: "Aluno", arquivo: "assets/telas/06-aluno-inicio.webp", titulo: "Início do aluno", descricao: "Resumo do dia, atalho para criar o projeto e projetos dos colegas na vitrine." },
    { grupo: "Aluno", arquivo: "assets/telas/07-aluno-meu-projeto.webp", titulo: "Meu projeto", descricao: "Projeto do aluno, colegas e andamento da avaliação (um projeto por aluno)." },
    { grupo: "Professor", arquivo: "assets/telas/08-professor-painel.webp", titulo: "Sua turma", descricao: "Painel do professor: destaques, contadores da turma e projetos aguardando parecer." },
    { grupo: "Professor", arquivo: "assets/telas/09-professor-alunos.webp", titulo: "Meus alunos", descricao: "Cadastro e acompanhamento dos alunos vinculados ao professor." },
    { grupo: "Professor", arquivo: "assets/telas/10-professor-projetos.webp", titulo: "Projetos", descricao: "Lista dos projetos com status da avaliação, notas e ações de gestão." },
    { grupo: "Administrador", arquivo: "assets/telas/11-admin-painel.webp", titulo: "Painel do administrador", descricao: "Destaques da vitrine, contadores do sistema e projetos aguardando avaliação." },
    { grupo: "Administrador", arquivo: "assets/telas/12-admin-professores.webp", titulo: "Professores", descricao: "Gestão de professores com busca e filtro por situação." },
    { grupo: "Administrador", arquivo: "assets/telas/13-admin-alunos.webp", titulo: "Alunos", descricao: "Gestão de alunos com professor responsável, busca e filtros." },
    { grupo: "Administrador", arquivo: "assets/telas/14-admin-administradores.webp", titulo: "Administradores", descricao: "Gestão das contas de administrador." },
    { grupo: "Administrador", arquivo: "assets/telas/15-admin-projetos.webp", titulo: "Projetos", descricao: "Acompanhar, avaliar e organizar os projetos dos alunos." },
    { grupo: "Administrador", arquivo: "assets/telas/16-vitrine-logado.webp", titulo: "Vitrine na área logada", descricao: "A vitrine dentro do painel, com categorias e atalho para a área do usuário." },
    { grupo: "Administrador", arquivo: "assets/telas/17-explorar.webp", titulo: "Explorar", descricao: "Todos os jogos com ordenação por em alta, recentes ou A-Z." },
  ],

  /* 5. Video (ate 5 min) --------------------------------------------------
     YouTube: cole so o ID (o trecho depois de "v=" ou de "youtu.be/").
     Google Drive: cole o ID do arquivo (o trecho entre "/d/" e "/view").
     O arquivo/video precisa estar como "Qualquer pessoa com o link". */
  video: {
    youtubeId: "", // PREENCHER (ou)
    driveId: "", // PREENCHER
    duracao: "", // ex.: "4:32"
  },

  /* 6. Relatorio de estagio -----------------------------------------------
     Coloque o PDF em assets/docs/relatorio-estagio.pdf */
  relatorio: {
    arquivo: "assets/docs/relatorio-estagio.pdf",
    atualizadoEm: "2026-11-17",
  },
};

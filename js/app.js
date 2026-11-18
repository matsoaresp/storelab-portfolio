(function () {
  "use strict";
  var D = window.PORTFOLIO || {};

  // Sempre abre no inicio (sem #secao no link), inclusive ao recarregar.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "texto") n.textContent = attrs[k];
      else if (k === "classe") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (filhos || []).forEach(function (f) { if (f) n.appendChild(typeof f === "string" ? document.createTextNode(f) : f); });
    return n;
  }

  function dataBR(iso) {
    if (!iso) return "—";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  function preencher(campo, valor) {
    $$('[data-campo="' + campo + '"]').forEach(function (n) { n.textContent = valor; });
  }

  /* ---------------- Tema (claro / sistema / escuro) ---------------- */
  var CHAVE = "storelab-portfolio:tema";
  var midia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function aplicarTema(tema, animar) {
    var escuro = tema === "escuro" || (tema === "sistema" && midia && midia.matches);
    var raiz = document.documentElement;
    if (animar && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raiz.classList.add("tema-transicao");
      setTimeout(function () { raiz.classList.remove("tema-transicao"); }, 400);
    }
    raiz.dataset.theme = escuro ? "dark" : "light";
    raiz.dataset.tema = tema;
    $$(".segmentado button").forEach(function (b) {
      b.setAttribute("aria-checked", String(b.dataset.tema === tema));
    });
  }

  $$(".segmentado button").forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem(CHAVE, b.dataset.tema); } catch (e) {}
      aplicarTema(b.dataset.tema, true);
    });
  });
  if (midia && midia.addEventListener) {
    midia.addEventListener("change", function () {
      if (document.documentElement.dataset.tema === "sistema") aplicarTema("sistema", true);
    });
  }
  aplicarTema(document.documentElement.dataset.tema || "sistema", false);

  /* ---------------- Menu movel ---------------- */
  var botaoMenu = $(".menu-botao");
  var menu = $("#menu-movel");
  function fecharMenu() { menu.hidden = true; botaoMenu.setAttribute("aria-expanded", "false"); }
  botaoMenu.addEventListener("click", function () {
    var abrir = menu.hidden;
    menu.hidden = !abrir;
    botaoMenu.setAttribute("aria-expanded", String(abrir));
  });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", fecharMenu); });

  /* ---------------- Secao ativa na navegacao ---------------- */
  if ("IntersectionObserver" in window) {
    var links = $$(".nav a");
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          var ativo = a.getAttribute("href") === "#" + e.target.id;
          a.classList.toggle("ativo", ativo);
          if (ativo) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { obs.observe(s); });

    var revelar = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visivel"); revelar.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".secao .cartao, .secao .subtitulo").forEach(function (n) { n.classList.add("revelar"); revelar.observe(n); });
  }

  /* ---------------- Aluno ---------------- */
  var aluno = D.aluno || {};
  ["nome", "matricula", "orientador", "curso", "instituicao", "periodo", "empresa"].forEach(function (k) {
    if (aluno[k]) preencher(k, aluno[k]);
  });
  if (!aluno.empresa) $$('[data-se="empresa"]').forEach(function (n) { n.remove(); });
  preencher("nome-rodape", aluno.nome || "");
  var iniciais = (aluno.nome || "")
    .replace(/^PREENCHER:\s*/, "")
    .split(/\s+/).filter(Boolean);
  preencher("iniciais", iniciais.length ? (iniciais[0][0] + (iniciais.length > 1 ? iniciais[iniciais.length - 1][0] : "")).toUpperCase() : "");

  /* ---------------- Links ---------------- */
  var repos = D.repositorios || {};
  $$('[data-link="repo-frontend"]').forEach(function (a) { a.href = repos.frontend || "#"; });
  $$('[data-link="repo-backend"]').forEach(function (a) { a.href = repos.backend || "#"; });

  /* ---------------- Cronograma ---------------- */
  var ROTULOS = { concluido: "Concluído", andamento: "Em andamento", planejado: "Planejado" };
  var corpo = $("#cronograma-corpo");
  var crono = D.cronograma || [];
  crono.forEach(function (c, i) {
    var status = ROTULOS[c.status] ? c.status : "planejado";
    corpo.appendChild(el("tr", {}, [
      el("td", { classe: "num", texto: "UC" + String(i + 1).padStart(2, "0") }),
      el("th", { scope: "row", texto: c.caso }),
      el("td", { texto: c.atores || "" }),
      el("td", { texto: dataBR(c.inicio) }),
      el("td", { texto: dataBR(c.conclusao) }),
      el("td", {}, [el("span", { classe: "status status-" + status, texto: ROTULOS[status] })]),
    ]));
  });
  var concluidos = crono.filter(function (c) { return c.status === "concluido"; }).length;
  var pct = crono.length ? Math.round((concluidos / crono.length) * 100) : 0;
  preencher("progresso-texto", concluidos + " de " + crono.length + " concluídos · " + pct + "%");
  var barra = $('[data-campo="progresso-barra"]');
  if (barra) barra.style.width = pct + "%";
  preencher("data-atualizacao", dataBR(D.relatorio && D.relatorio.atualizadoEm));

  /* ---------------- Linha do tempo ---------------- */
  var lt = $("#linha-tempo");
  (D.marcos || []).forEach(function (m) {
    lt.appendChild(el("li", {}, [
      el("time", { datetime: m.data, texto: dataBR(m.data) }),
      el("strong", { texto: m.titulo }),
      el("p", { texto: m.texto }),
    ]));
  });

  /* Rola so a fileira (horizontal) ate o item, sem mexer na rolagem da pagina. */
  function rolarFileira(fileira, item) {
    if (!fileira || !item) return;
    var f = fileira.getBoundingClientRect(), r = item.getBoundingClientRect();
    if (r.left < f.left) fileira.scrollLeft -= f.left - r.left + 8;
    else if (r.right > f.right) fileira.scrollLeft += r.right - f.right + 8;
  }

  /* ---------------- Abas + visualizador (diagramas e telas) ---------------- */
  var contadorAbas = 0;
  var visualizadores = [];

  // Abas acessiveis (setas trocam de aba quando o foco esta nelas).
  function criarAbas(container, rotulo, abas) {
    var id = "abas-" + (++contadorAbas);
    var lista = el("div", { classe: "abas", role: "tablist", "aria-label": rotulo });
    var paineis = el("div", { classe: "abas-paineis" });
    var botoes = [];
    var criados = {};

    function ativar(i, focar) {
      botoes.forEach(function (b, j) {
        var sel = i === j;
        b.setAttribute("aria-selected", String(sel));
        b.tabIndex = sel ? 0 : -1;
        var painel = document.getElementById(b.getAttribute("aria-controls"));
        if (sel && !criados[j]) { abas[j].montar(painel); criados[j] = true; }
        painel.hidden = !sel;
      });
      if (focar) botoes[i].focus();
      rolarFileira(lista.parentNode, botoes[i]);
    }

    abas.forEach(function (aba, i) {
      var b = el("button", {
        type: "button", role: "tab", classe: "aba", id: id + "-aba-" + i,
        "aria-controls": id + "-painel-" + i, "aria-selected": "false", tabindex: "-1",
      }, [aba.rotulo, aba.qtd ? el("span", { classe: "aba-qtd", texto: String(aba.qtd) }) : null]);
      b.addEventListener("click", function () { ativar(i, false); });
      b.addEventListener("keydown", function (e) {
        var n = botoes.length, alvo = null;
        if (e.key === "ArrowRight") alvo = (i + 1) % n;
        else if (e.key === "ArrowLeft") alvo = (i - 1 + n) % n;
        else if (e.key === "Home") alvo = 0;
        else if (e.key === "End") alvo = n - 1;
        if (alvo !== null) { e.preventDefault(); e.stopPropagation(); ativar(alvo, true); }
      });
      botoes.push(b);
      lista.appendChild(b);
      paineis.appendChild(el("div", { role: "tabpanel", classe: "aba-painel", id: id + "-painel-" + i, "aria-labelledby": b.id, hidden: "" }));
    });

    container.appendChild(el("div", { classe: "abas-rolagem" }, [lista]));
    container.appendChild(paineis);
    ativar(0, false);
  }

  // Visualizador: imagem grande + legenda + miniaturas. modo "navegador" desenha a moldura.
  function criarVisualizador(painel, itens, opcoes) {
    var atual = 0;
    var navegador = opcoes.modo === "navegador";
    var imgPalco = el("img", { alt: "" });
    var palco = el("button", { type: "button", classe: "vis-palco" + (navegador ? " vis-palco-tela" : " vis-palco-diagrama") }, [imgPalco]);
    var urlTexto = el("span", { classe: "vis-url-texto" });
    var moldura = navegador
      ? el("div", { classe: "vis-moldura" }, [
          el("div", { classe: "vis-barra" }, [el("span", { classe: "vis-pontos", "aria-hidden": "true" }, [el("i"), el("i"), el("i")]), el("span", { classe: "vis-url" }, [urlTexto])]),
          palco,
        ])
      : el("div", { classe: "vis-moldura vis-moldura-diagrama" }, [palco]);

    var titulo = el("h4", { classe: "vis-titulo" });
    var descricao = el("p", { classe: "vis-descricao" });
    var links = el("div", { classe: "doc-links vis-links" });
    var contador = el("span", { classe: "vis-contador", "aria-live": "polite" });
    var anterior = el("button", { type: "button", classe: "vis-seta", "aria-label": "Anterior" }, ["‹"]);
    var proximo = el("button", { type: "button", classe: "vis-seta", "aria-label": "Próximo" }, ["›"]);
    var multiplos = itens.length > 1;

    var info = el("div", { classe: "vis-info" }, [
      el("div", {}, [
        el("span", { classe: "vis-num" }), titulo, descricao, links,
      ]),
      multiplos ? el("div", { classe: "vis-controles" }, [anterior, contador, proximo]) : null,
    ]);

    var miniaturas = el("div", { classe: "vis-miniaturas" });
    var botoesMini = itens.map(function (it, i) {
      var b = el("button", { type: "button", classe: "vis-mini", "aria-label": it.titulo, title: it.titulo }, [
        el("img", { src: it.img, alt: "", loading: "lazy" }),
        el("span", { texto: it.titulo }),
      ]);
      b.addEventListener("click", function () { ir(i); });
      miniaturas.appendChild(b);
      return b;
    });

    function ir(i) {
      atual = (i + itens.length) % itens.length;
      var it = itens[atual];
      imgPalco.src = it.img;
      imgPalco.alt = (opcoes.prefixoAlt || "") + it.titulo;
      palco.dataset.ampliar = it.img;
      palco.dataset.titulo = it.titulo;
      palco.setAttribute("aria-label", "Ampliar: " + it.titulo);
      urlTexto.textContent = "storelab · " + it.titulo.toLowerCase();
      info.querySelector(".vis-num").textContent = it.num || "";
      titulo.textContent = it.titulo;
      descricao.textContent = it.descricao || "";
      descricao.hidden = !it.descricao;
      links.replaceChildren.apply(links, (it.links || []).map(function (l) {
        return el("a", { href: l.href, target: "_blank", rel: "noopener", texto: l.texto });
      }));
      contador.textContent = (atual + 1) + " / " + itens.length;
      botoesMini.forEach(function (b, j) {
        b.classList.toggle("ativo", j === atual);
        b.setAttribute("aria-current", j === atual ? "true" : "false");
      });
      if (multiplos) rolarFileira(miniaturas, botoesMini[atual]);
      [atual + 1, atual - 1].forEach(function (j) { // pre-carrega vizinhos
        var v = itens[(j + itens.length) % itens.length]; if (v) { var p = new Image(); p.src = v.img; }
      });
    }

    anterior.addEventListener("click", function () { ir(atual - 1); });
    proximo.addEventListener("click", function () { ir(atual + 1); });

    painel.appendChild(el("div", { classe: "vis" + (multiplos ? "" : " vis-unico") }, [moldura, info]));
    if (multiplos) painel.appendChild(miniaturas);
    ir(0);

    var reg = { painel: painel, ir: function (d) { ir(atual + d); }, multiplos: multiplos };
    visualizadores.push(reg);
  }

  // Setas do teclado navegam no visualizador visivel na tela.
  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if ($("#lightbox").open) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var meio = window.innerHeight / 2, melhor = null, menor = Infinity;
    visualizadores.forEach(function (v) {
      if (!v.multiplos || v.painel.hidden) return;
      var r = v.painel.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var d = Math.abs((r.top + r.bottom) / 2 - meio);
      if (d < menor) { menor = d; melhor = v; }
    });
    if (!melhor) return;
    e.preventDefault();
    melhor.ir(e.key === "ArrowRight" ? 1 : -1);
  });

  /* ---------------- Diagramas ---------------- */
  var BASE = "assets/diagramas/";
  var abasDocs = (D.diagramas || []).map(function (g) {
    var itens = g.itens.map(function (d) {
      var img = BASE + d.arquivo;
      var l = [{ href: img, texto: "Abrir imagem" }];
      if (d.drive) l.push({ href: d.drive, texto: "Ver no Google Drive" });
      return { img: img, titulo: d.titulo, descricao: d.descricao, links: l };
    });
    var rotulo = g.aba || g.grupo;
    return { rotulo: rotulo, qtd: itens.length > 1 ? itens.length : 0, montar: function (p) { criarVisualizador(p, itens, { prefixoAlt: "Diagrama: " }); } };
  });
  if ((D.artefatos || []).length) {
    abasDocs.push({
      rotulo: "Requisitos (RUP)", qtd: D.artefatos.length,
      montar: function (p) {
        var grade = el("div", { classe: "grade-artefatos" });
        D.artefatos.forEach(function (a) {
          grade.appendChild(el("a", { classe: "cartao artefato", href: a.url, target: "_blank", rel: "noopener" }, [
            el("span", { classe: "artefato-tag", texto: "PDF" }),
            el("strong", { texto: a.titulo }),
            el("p", { texto: a.descricao }),
            el("span", { classe: "artefato-abrir", texto: "Abrir no Google Drive ↗" }),
          ]));
        });
        p.appendChild(grade);
      },
    });
  }
  criarAbas($("#docs-diagramas"), "Categorias de diagramas", abasDocs);

  var ce = D.cronogramaEntregas || {};
  $$('[data-link="cronograma-drive"]').forEach(function (a) { if (ce.drive) a.href = ce.drive; else a.remove(); });

  /* ---------------- Telas ---------------- */
  var gruposTelas = [];
  (D.telas || []).forEach(function (t, i) {
    var g = gruposTelas[gruposTelas.length - 1];
    var nome = t.grupo || "Telas";
    if (!g || g.nome !== nome) { g = { nome: nome, itens: [] }; gruposTelas.push(g); }
    g.itens.push({
      img: t.arquivo, titulo: t.titulo, descricao: t.descricao, num: String(i + 1).padStart(2, "0"),
      links: [{ href: t.arquivo, texto: "Abrir em tamanho real" }],
    });
  });
  criarAbas($("#telas-visualizador"), "Perfis", gruposTelas.map(function (g) {
    return { rotulo: g.nome, qtd: g.itens.length, montar: function (p) { criarVisualizador(p, g.itens, { modo: "navegador", prefixoAlt: "Tela: " }); } };
  }));

  /* ---------------- Video ---------------- */
  var v = D.video || {};
  var moldura = $("#video-moldura");
  var linkVideo = $("#video-link");
  var src = "", externo = "";
  if (v.youtubeId) {
    src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.youtubeId);
    externo = "https://www.youtube.com/watch?v=" + encodeURIComponent(v.youtubeId);
  } else if (v.driveId) {
    src = "https://drive.google.com/file/d/" + encodeURIComponent(v.driveId) + "/preview";
    externo = "https://drive.google.com/file/d/" + encodeURIComponent(v.driveId) + "/view";
  }
  if (src) {
    moldura.appendChild(el("iframe", {
      src: src, title: "Vídeo de demonstração do StoreLab", loading: "lazy",
      allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen", allowfullscreen: "",
    }));
    linkVideo.href = externo;
    linkVideo.hidden = false;
  } else {
    moldura.appendChild(el("div", { classe: "video-pendente" }, [
      el("strong", { texto: "Vídeo em breve" }),
      el("small", { texto: "Defina youtubeId ou driveId em js/dados.js" }),
    ]));
  }
  if (v.duracao) preencher("video-duracao", "Duração: " + v.duracao + ".");

  /* ---------------- Relatorio ---------------- */
  var rel = D.relatorio || {};
  $$('[data-link="relatorio"]').forEach(function (a) { a.href = rel.arquivo || "#"; });
  var obj = $("[data-pdf]");
  if (obj && rel.arquivo) obj.setAttribute("data", rel.arquivo + "#view=FitH");
  preencher("relatorio-data", dataBR(rel.atualizadoEm));

  /* ---------------- Lightbox ---------------- */
  var dlg = $("#lightbox");
  var dlgImg = $("#lightbox-img");
  document.addEventListener("click", function (e) {
    var alvo = e.target.closest("[data-ampliar]");
    if (!alvo) return;
    dlgImg.src = alvo.dataset.ampliar;
    dlgImg.alt = alvo.dataset.titulo || "";
    $("#lightbox-titulo").textContent = alvo.dataset.titulo || "";
    $("#lightbox-abrir").href = alvo.dataset.ampliar;
    if (dlg.showModal) dlg.showModal(); else window.open(alvo.dataset.ampliar, "_blank", "noopener");
  });
  $(".lightbox-fechar").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
})();

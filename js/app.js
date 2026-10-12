/* =========================================================
   GPS DE VIAGEM — render, navegação e estado.
   Dados auditados vêm de data.js e nunca são alterados aqui;
   este arquivo só os apresenta.
   ========================================================= */

const ACCENT_VAR = { nl:"--ams", fr:"--par", intl:"--intl", eurostar:"--intl", ams:"--ams", par:"--par" };

const VIEWS = ["agora","viagem","frases","gastos","guia"];

/* hashes antigos continuam funcionando */
const LEGACY_HASH = {
  inicio:"agora", rotas:"viagem", eurostar:"viagem", checklist:"agora"
};

const DAY_NAMES = ["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];
const MONTHS = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

function accentOf(key){ return `var(${ACCENT_VAR[key] || "--ams"})`; }

/* NÃO CONFIRMADO vira chip. O texto permanece idêntico — muda só a pintura. */
function paintNC(value){
  if(typeof value !== "string") return value;
  return value.split(NC).join('<span class="chip nc">' + NC + '</span>');
}

function esc(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* =========================================================
   TEMPO
   ========================================================= */
function parseISO(iso){ return new Date(iso); }

function hhmm(iso){
  const d = parseISO(iso);
  return String(d.getHours()).padStart(2,"0") + ":" + String(d.getMinutes()).padStart(2,"0");
}
function dayKey(iso){ return iso.slice(0,10); }
function dayLabel(iso){
  const d = parseISO(iso);
  return String(d.getDate()).padStart(2,"0") + " " + MONTHS[d.getMonth()];
}
function weekdayLabel(iso){ return DAY_NAMES[parseISO(iso).getDay()]; }

function daysUntil(iso){
  const now = new Date();
  const target = parseISO(iso);
  const a = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const b = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((b - a) / 86400000);
}

/* =========================================================
   PRÓXIMA ROTA
   ========================================================= */
function computeNextRoute(){
  const now = new Date();
  return ROUTES.find(r => parseISO(r.orderISO) >= now) || null;
}

/* =========================================================
   TELA AGORA
   ========================================================= */
function renderCountdown(){
  const el = document.getElementById("countdown");
  const next = computeNextRoute();

  if(!next){
    el.innerHTML = `<div class="countdown"><span class="n">✓</span><span class="u">viagem concluída</span></div>`;
    return;
  }

  const d = daysUntil(next.orderISO);
  let n, u;
  if(d > 1){ n = d; u = "dias até a partida"; }
  else if(d === 1){ n = "1"; u = "dia até a partida"; }
  else if(d === 0){ n = "hoje"; u = "é o dia"; }
  else { n = "em curso"; u = "viagem acontecendo"; }

  const rolled = sessionStorage.getItem("gps-flap-done");
  el.innerHTML = `<div class="countdown">
      <span class="n"><span class="flap${rolled ? "" : " rolling"}">${n}</span></span>
      <span class="u">${u}</span>
    </div>`;
  try { sessionStorage.setItem("gps-flap-done","1"); } catch(e){}
}

function renderNextCard(){
  const el = document.getElementById("nextCard");
  const r = computeNextRoute();

  if(!r){
    el.innerHTML = `<div class="bp" style="--accent:var(--intl)">
        <div class="bp-top">
          <div class="bp-k">✓ Status</div>
          <div class="bp-route">VIAGEM CONCLUÍDA</div>
          <div class="bp-when">Você voltou para casa</div>
        </div>
      </div>`;
    return;
  }

  const leg = r.legs[0];
  const when = r.keyTime ? r.keyTime : (r.confirmedTime ? r.confirmedTime.dep : hhmm(r.orderISO));

  el.innerHTML = `
    <div class="bp" style="--accent:${accentOf(r.country)}">
      <div class="bp-top">
        <div class="bp-k">${r.modeIcon} Próxima rota · ${esc(r.code)}</div>
        <div class="bp-route">${esc(r.title).replace(" → ","<br>→ ")}</div>
        <div class="bp-when">${r.dateLabel ? esc(r.dateLabel) + " · " : ""}${esc(when)}</div>
      </div>
      <div class="perf"></div>
      <div class="bp-cell"><div class="bp-lab">O que pegar</div><div class="bp-val">${paintNC(leg.oQuePegar)}</div></div>
      <div class="bp-cell"><div class="bp-lab">Direção</div><div class="bp-val">${paintNC(leg.direcao)}</div></div>
      <div class="bp-cell"><div class="bp-lab">Onde descer</div><div class="bp-val">${paintNC(leg.ondeDescer)}</div></div>
      <div class="bp-cell"><div class="bp-lab">Tempo</div><div class="bp-val m">${esc(r.durationLabel)}</div></div>
      <div class="bp-cell" style="padding-top:0;border-top:none;">
        <button class="btn primary" style="width:100%" onclick="openDetail(${r.id})">Ver rota completa</button>
      </div>
    </div>`;
}

function renderAgoraAlerts(){
  const el = document.getElementById("agoraAlerts");
  el.innerHTML = `
    <div class="alert">
      <div class="h">⚠ Hospedagem faltando</div>
      <ul><li>Noite de <b>07/12 em Amsterdam</b>: não aparece nas reservas enviadas. O Volkshotel cobre apenas 02–04/12. Confirme esta cobertura antes de viajar.</li></ul>
    </div>
    <div class="note">
      🌇 <b>Em dezembro escurece cedo por aqui.</b> O dia é curto nos dois países e anoitece bem antes do jantar — passeio ao ar livre rende muito mais na primeira metade do dia.
    </div>`;
}

function renderFootNote(){
  document.getElementById("footNote").innerHTML =
    `Conteúdo baseado na auditoria feita com fontes oficiais (NS, GVB, Île-de-France Mobilités, Eurostar — reserva real). ` +
    `Itens marcados <span class="chip nc">${NC}</span> não foram verificados oficialmente — confirme no app correspondente antes de depender deles. ` +
    `A aba Guia é editorial e não exibe horário nem preço. Nenhuma compra ou reserva foi feita neste processo.`;
}

/* =========================================================
   CHECKLIST POR ROTA
   Itens derivados do dado auditado. Zera a cada partida.
   ========================================================= */
const CK_UNIVERSAL = [
  "Bateria do celular carregada — o guia e os bilhetes estão nele",
  "Captura de tela do bilhete salva — funciona sem internet"
];

const CK_BY_ROUTE = {
  1:[
    "Bilhete NS resolvido (app NS, máquina ou OVpay)",
    "Painel do trem diz <b>Amsterdam Centraal</b>",
    "No metrô, sentido <b>Gaasperplas</b> ou <b>Gein</b>",
    "Plano definido para a brecha das 14:55 às 16:00 — o quarto só abre às 16:00 e você chega com mala"
  ],
  2:[
    "Checkout do Volkshotel feito (limite 12:00)",
    "Metrô sentido <b>Centraal Station</b> — não Gaasperplas/Gein",
    "Toda a bagagem com você: daqui vai direto para o Eurostar"
  ],
  3:[
    "Passaporte na mão — há controle antes do embarque",
    "QR code do Eurostar aberto ou salvo no celular",
    "Na estação entre 09:40 e 09:55",
    "Checkout do Volkshotel feito"
  ],
  4:[
    "Bilhete RER B (€2,55) comprado e validado na catraca",
    "RER B sentido <b>sul</b> — Robinson / Saint-Rémy-lès-Chevreuse / Massy-Palaiseau",
    "Descer em <b>Port-Royal</b>, não em Denfert-Rochereau",
    "Plano definido para a brecha das 14:35 às 16:00 — o Eurostar chega antes do check-in"
  ],
  5:[
    "Checkout do Airbnb feito (limite 11:00)",
    "Nada esquecido no alojamento",
    "Bilhete RER B comprado e validado",
    "RER B sentido <b>norte</b> — Mitry-Claye / CDG, oposto da ida"
  ],
  6:[
    "Passaporte na mão",
    "QR code do Eurostar acessível",
    "Na estação entre 07:54 e 08:09"
  ],
  7:[
    "Hospedagem da noite de 07/12 resolvida",
    "Bilhete NS resolvido",
    "Painel confirma que o trem <b>para em Schiphol Airport</b>",
    "Mala pronta para o voo das 20:35"
  ]
};

function checklistFor(routeId){
  const specific = CK_BY_ROUTE[routeId] || [];
  return specific.concat(CK_UNIVERSAL).map((label,i) => ({ id:`r${routeId}-${i}`, label }));
}

const CK_KEY = "gps-viagem-checklist-v2";

function loadCk(){
  try { return JSON.parse(localStorage.getItem(CK_KEY) || "{}"); }
  catch(e){ return {}; }
}
function saveCk(state){
  try { localStorage.setItem(CK_KEY, JSON.stringify(state)); } catch(e){}
}

function renderChecklist(){
  const r = computeNextRoute();
  const list = document.getElementById("checklist");
  const title = document.getElementById("ckTitle");

  if(!r){
    title.textContent = "Checklist";
    list.innerHTML = `<div class="empty">A viagem terminou — nada pendente.</div>`;
    document.getElementById("ckCount").textContent = "";
    document.getElementById("ckBar").style.width = "100%";
    return;
  }

  title.textContent = `Antes da ${r.code}`;
  const items = checklistFor(r.id);
  const state = loadCk();

  list.innerHTML = items.map(it => `
    <li><button class="ck-item ${state[it.id] ? "done" : ""}" data-id="${it.id}" aria-pressed="${!!state[it.id]}">
      <span class="bx">✓</span><span class="lb">${it.label}</span>
    </button></li>`).join("");

  list.querySelectorAll(".ck-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const s = loadCk();
      s[id] = !s[id];
      saveCk(s);
      btn.classList.toggle("done", !!s[id]);
      btn.setAttribute("aria-pressed", String(!!s[id]));
      updateCkProgress(items);
    });
  });

  updateCkProgress(items);
}

function updateCkProgress(items){
  const state = loadCk();
  const done = items.filter(i => state[i.id]).length;
  document.getElementById("ckCount").textContent = `${done} / ${items.length} conferidos`;
  document.getElementById("ckBar").style.width = `${(done / items.length) * 100}%`;
}

/* =========================================================
   LINHA DO TEMPO (aba Viagem)
   ========================================================= */
function buildEvents(){
  const events = [];

  ROUTES.forEach(r => {
    events.push({ kind:"route", iso:r.orderISO, route:r });
  });

  STAYS.forEach(s => {
    events.push({ kind:"stay", iso:s.checkinISO, stay:s, type:"in" });
    events.push({ kind:"stay", iso:s.checkoutISO, stay:s, type:"out" });
  });

  events.sort((a,b) => parseISO(a.iso) - parseISO(b.iso));
  return events;
}

function renderTimeline(){
  const events = buildEvents();
  const now = new Date();
  let html = "";
  let currentDay = null;

  events.forEach((ev, idx) => {
    const key = dayKey(ev.iso);
    if(key !== currentDay){
      currentDay = key;
      html += `<div class="day">
          <span class="d mono">${dayLabel(ev.iso)}</span>
          <span class="w mono">${weekdayLabel(ev.iso)}</span>
          <span class="ln"></span>
        </div>`;
    }

    const past = parseISO(ev.iso) < now ? " past" : "";

    if(ev.kind === "route"){
      const r = ev.route;
      const confirmed = r.confirmedTime;

      /* Só exibe relógio quando o horário é publicado: confirmedTime ou keyTime.
         orderISO é chave de ordenação — mostrá-lo como horário contradiria o
         recNote da própria rota (ex.: Rota 05 ordena 07:30, recomenda 07:50–08:00). */
      const published = confirmed ? confirmed.dep
                      : (r.keyTime ? r.keyTime.split(" ")[0] : null);

      html += `<button class="row${past}" style="--accent:${accentOf(r.country)}" onclick="openDetail(${r.id})">
          <span class="tm mono${published ? "" : " est"}">${published ? esc(published) : "—"}</span>
          <span class="bd">
            <span class="ti"><span class="acc"></span><span>${esc(r.title)}</span></span>
            <span class="sub">${esc(r.code)} · ${r.modeIcon} ${esc(r.durationLabel)}</span>
            ${confirmed ? `<span><span class="chip ok">✓ ${esc(confirmed.tag)}</span></span>` : ""}
            ${published ? "" : `<span><span class="chip nc">Sem horário fixo</span></span>`}
          </span>
        </button>`;
    } else {
      const s = ev.stay;
      const isOut = ev.type === "out";
      const label = isOut ? `🏨 ${s.name} — checkout` : `🏨 ${s.name} — check-in`;
      const sub = isOut ? s.checkoutLabel : s.checkinLabel;

      html += `<div class="row stay${past}">
          <span class="tm mono">${hhmm(ev.iso)}</span>
          <span class="bd">
            <span class="ti"><span class="acc"></span><span>${esc(label)}</span></span>
            <span class="sub">${esc(sub)}</span>
            ${isOut ? `<span><span class="chip warn">Antes de sair</span></span>` : ""}
          </span>
        </div>`;

      /* Conflito 04/12: o Eurostar parte antes do limite de checkout. */
      if(isOut && s.id === "volkshotel"){
        html += `<div class="conflict">
            <span class="ic">⚠</span>
            <p>O Eurostar sai <b>50 min antes</b> do limite de checkout. Faça o checkout antes de ir para a estação.</p>
          </div>`;
      }
    }
  });

  document.getElementById("timeline").innerHTML = html;
}

/* =========================================================
   DETALHE DE ROTA
   ========================================================= */
function legHtml(leg){
  const rows = [
    ["Onde estou", leg.ondeEstou],
    ["O que pegar", leg.oQuePegar],
    ["Direção", leg.direcao],
    ["Paradas", Array.isArray(leg.paradas) ? leg.paradas.join(" → ") : leg.paradas],
    ["Onde descer", leg.ondeDescer],
    ["Saída", leg.saida],
    ["Caminhada", leg.caminhada],
    ["Destino", leg.destino]
  ];

  return `<div class="leg" style="--accent:${accentOf(leg.accent)}">
      ${leg.label ? `<div class="leg-title">${esc(leg.label)}</div>` : ""}
      ${rows.map(([k,v]) => `
        <div class="bp-cell">
          <div class="bp-lab">${k}</div>
          <div class="bp-val">${paintNC(v)}</div>
        </div>`).join("")}
      <div class="inforow"><span class="k">Tempo</span><span class="v">${paintNC(leg.duracao)}</span></div>
      <div class="inforow"><span class="k">Bilhete</span><span class="v">${paintNC(leg.ticket)}</span></div>
      <div class="inforow"><span class="k">Mala 23 kg</span><span class="v">${paintNC(leg.mala)}</span></div>
    </div>`;
}

function routeDetailHtml(r){
  let html = `<div class="d-hero" style="--accent:${accentOf(r.country)}">
      <div class="k">${esc(r.code)}${r.dateLabel ? " · " + esc(r.dateLabel) : ""}</div>
      <div class="t">${esc(r.title).replace(" → ","<br>→ ")}</div>
      <div class="m"><span>${r.modeIcon} ${esc(r.durationLabel)}</span><span>${r.legs.length} ${r.legs.length > 1 ? "trechos" : "trecho"}</span></div>
    </div>`;

  html += r.legs.map(legHtml).join("");

  if(r.confirmedTime){
    html += `<div class="confirmed">
        <span class="chip ok">✓ ${esc(r.confirmedTime.tag)}</span>
        <div class="time mono">${esc(r.confirmedTime.dep)}<span class="arrow">→</span>${esc(r.confirmedTime.arr)}</div>
        <div class="sub">${esc(r.confirmedTime.sub)}</div>
      </div>`;
  }
  if(r.checkinNote) html += `<div class="note">${r.checkinNote}</div>`;
  if(r.recNote)     html += `<div class="note">${r.recNote}</div>`;
  if(r.stayNotes)   html += r.stayNotes.map(n => `<div class="note ok">${n}</div>`).join("");
  if(r.hostNote)    html += `<div class="note">${r.hostNote}</div>`;

  if(r.naoConfunda && r.naoConfunda.length){
    html += `<div class="alert">
        <div class="h">⚠ Não confunda</div>
        <ul>${r.naoConfunda.map(t => `<li>${t}</li>`).join("")}</ul>
      </div>`;
  }

  html += `<a class="maps-btn" href="${mapsLink(r.mapsQuery)}" target="_blank" rel="noopener">📍 Abrir no Maps — ${esc(r.mapsQuery)}</a>`;
  return html;
}

function openDetail(id){
  const r = ROUTES.find(x => x.id === id);
  if(!r) return;
  document.getElementById("detailTitle").textContent = r.code;
  document.getElementById("detailBody").innerHTML = routeDetailHtml(r);
  const ov = document.getElementById("detailOverlay");
  ov.hidden = false;
  ov.classList.remove("enter");
  void ov.offsetWidth;
  ov.classList.add("enter");
  ov.scrollTop = 0;
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", "#rota-" + id);
}

function closeDetail(){
  document.getElementById("detailOverlay").hidden = true;
  document.body.style.overflow = "";
  const active = document.querySelector("#bottomnav button.active");
  history.replaceState(null, "", "#" + (active ? active.dataset.view : "agora"));
}

/* fechar arrastando para baixo */
function wireSwipeClose(el, closeFn){
  let y0 = null;
  el.addEventListener("touchstart", e => {
    if(el.scrollTop <= 0) y0 = e.touches[0].clientY;
  }, { passive:true });
  el.addEventListener("touchmove", e => {
    if(y0 === null) return;
    if(e.touches[0].clientY - y0 > 90){ y0 = null; closeFn(); }
  }, { passive:true });
  el.addEventListener("touchend", () => { y0 = null; }, { passive:true });
}

/* =========================================================
   FRASES
   ========================================================= */
let currentLang = "fr";

function renderLangSwitch(){
  document.getElementById("langSwitch").innerHTML = ["fr","nl"].map(k => {
    const p = PHRASES[k];
    return `<button class="${k === currentLang ? "on" : ""}" style="--accent:${accentOf(p.accent)}" onclick="setLang('${k}')">${p.flag} ${p.lang}</button>`;
  }).join("");
}

function setLang(k){
  currentLang = k;
  renderLangSwitch();
  renderPhrases();
}

function renderPhrases(){
  const p = PHRASES[currentLang];
  const acc = accentOf(p.accent);

  let html = `<div class="note">${p.intro}</div>`;

  html += p.groups.map(g => `
    <div class="phrase-group">
      <h3>${esc(g.title)}</h3>
      ${g.items.map((it,i) => `
        <button class="phrase" style="--accent:${acc}" onclick="showPhrase('${currentLang}','${esc(g.title)}',${i})">
          <span class="pt">${esc(it.pt)}</span>
          <span class="xx">${esc(it.xx)}</span>
          <span class="say mono">${esc(it.say)}</span>
        </button>`).join("")}
    </div>`).join("");

  document.getElementById("phrasesBody").innerHTML = html;
}

function showPhrase(lang, groupTitle, idx){
  const g = PHRASES[lang].groups.find(x => x.title === groupTitle);
  if(!g) return;
  const it = g.items[idx];
  document.getElementById("showPt").textContent = it.pt;
  document.getElementById("showXx").textContent = it.xx;
  document.getElementById("showSay").textContent = it.say;
  document.getElementById("showCard").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeShow(){
  document.getElementById("showCard").hidden = true;
  document.body.style.overflow = "";
}

/* =========================================================
   GASTOS
   ========================================================= */
const EXP_KEY  = "gps-viagem-gastos-v1";
const RATE_KEY = "gps-viagem-cotacao-v1";

function loadExpenses(){
  try { return JSON.parse(localStorage.getItem(EXP_KEY) || "[]"); }
  catch(e){ return []; }
}
function saveExpenses(list){
  try { localStorage.setItem(EXP_KEY, JSON.stringify(list)); } catch(e){}
}
function loadRate(){
  try { return JSON.parse(localStorage.getItem(RATE_KEY) || "null"); }
  catch(e){ return null; }
}

function saveRate(){
  const v = parseFloat(document.getElementById("rateInput").value.replace(",","."));
  if(!v || v <= 0){ return; }
  const now = new Date();
  const stamp = String(now.getDate()).padStart(2,"0") + "/" + String(now.getMonth()+1).padStart(2,"0");
  try { localStorage.setItem(RATE_KEY, JSON.stringify({ rate:v, stamp })); } catch(e){}
  renderGastos();
}

function fmtEur(n){ return "€" + n.toFixed(2).replace(".",","); }
function fmtBrl(n){ return "R$ " + n.toFixed(2).replace(".",","); }

function renderGastos(){
  const list = loadExpenses();
  const rate = loadRate();

  /* cotação */
  const note = document.getElementById("rateNote");
  if(rate){
    document.getElementById("rateInput").value = rate.rate;
    note.textContent = `Cotação de ${rate.stamp} — não é a de hoje.`;
  } else {
    note.textContent = "Sem cotação fixada: os valores aparecem só em euro.";
  }

  /* categorias no select */
  const sel = document.getElementById("expCat");
  if(!sel.options.length){
    sel.innerHTML = EXPENSE_CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${c.label}</option>`).join("");
  }

  /* atalhos de tarifa auditada */
  document.getElementById("fareShortcuts").innerHTML =
    "Atalhos: " + KNOWN_FARES.map((f,i) =>
      `<button class="btn sm" style="margin:4px 4px 0 0" onclick="quickFare(${i})">${esc(f.label)} ${fmtEur(f.eur)}</button>`
    ).join("");

  /* totais */
  const total = list.reduce((s,e) => s + e.eur, 0);
  const totalsEl = document.getElementById("totals");
  totalsEl.innerHTML = `
    <div class="total-card"><div class="k">Total em euro</div><div class="v mono">${fmtEur(total)}</div></div>
    <div class="total-card"><div class="k">Em real</div><div class="v mono">${rate ? fmtBrl(total * rate.rate) : "—"}${rate ? ` <small>· ${rate.stamp}</small>` : ""}</div></div>
    <div class="total-card"><div class="k">Lançamentos</div><div class="v mono">${list.length}</div></div>`;

  /* por categoria */
  const byCat = {};
  list.forEach(e => { byCat[e.cat] = (byCat[e.cat] || 0) + e.eur; });
  const max = Math.max(1, ...Object.values(byCat));
  document.getElementById("catBars").innerHTML = EXPENSE_CATEGORIES
    .filter(c => byCat[c.id])
    .map(c => `
      <div class="cat-bar">
        <div class="lab mono"><span class="nm">${c.icon} ${esc(c.label)}</span><span>${fmtEur(byCat[c.id])}</span></div>
        <div class="track"><i style="width:${(byCat[c.id] / max) * 100}%"></i></div>
      </div>`).join("");

  /* histórico */
  const el = document.getElementById("expList");
  if(!list.length){
    el.innerHTML = `<div class="empty">Nenhum gasto lançado ainda.</div>`;
    return;
  }
  el.innerHTML = list.slice().reverse().map(e => {
    const cat = EXPENSE_CATEGORIES.find(c => c.id === e.cat);
    return `<div class="exp">
        <span class="d">
          <span class="t">${esc(e.desc)}</span>
          <span class="m mono">${cat ? cat.icon + " " + esc(cat.label) : ""} · ${esc(e.when)}</span>
        </span>
        <span class="amt mono">${fmtEur(e.eur)}</span>
        <button class="del" onclick="removeExpense('${e.id}')" aria-label="Remover">×</button>
      </div>`;
  }).join("");
}

function quickFare(i){
  const f = KNOWN_FARES[i];
  document.getElementById("expDesc").value = f.label;
  document.getElementById("expAmt").value = f.eur;
  document.getElementById("expCat").value = f.cat;
}

function addExpense(){
  const desc = document.getElementById("expDesc").value.trim();
  const amt  = parseFloat(document.getElementById("expAmt").value.replace(",","."));
  const cat  = document.getElementById("expCat").value;
  if(!desc || !amt || amt <= 0) return;

  const now = new Date();
  const when = String(now.getDate()).padStart(2,"0") + "/" + String(now.getMonth()+1).padStart(2,"0");

  const list = loadExpenses();
  list.push({ id:String(Date.now()), desc, eur:amt, cat, when });
  saveExpenses(list);

  document.getElementById("expDesc").value = "";
  document.getElementById("expAmt").value = "";
  renderGastos();
}

function removeExpense(id){
  saveExpenses(loadExpenses().filter(e => e.id !== id));
  renderGastos();
}

function exportExpenses(){
  const data = JSON.stringify({ expenses:loadExpenses(), rate:loadRate() }, null, 2);
  const blob = new Blob([data], { type:"application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gastos-viagem.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function importExpenses(ev){
  const file = ev.target.files && ev.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if(Array.isArray(data.expenses)) saveExpenses(data.expenses);
      if(data.rate) localStorage.setItem(RATE_KEY, JSON.stringify(data.rate));
      renderGastos();
    } catch(e){}
  };
  reader.readAsText(file);
  ev.target.value = "";
}

/* =========================================================
   GUIA
   ========================================================= */
let currentCity = "ams";

const STAY_ORIGIN = {
  ams: "Volkshotel, Wibautstraat 150, Amsterdam",
  par: "12 Avenue de l'Observatoire, 75006 Paris"
};

function directionsLink(origin, destination){
  return "https://www.google.com/maps/dir/?api=1"
    + "&origin=" + encodeURIComponent(origin)
    + "&destination=" + encodeURIComponent(destination)
    + "&travelmode=transit";
}

function renderCitySwitch(){
  document.getElementById("citySwitch").innerHTML = `
    <button class="${currentCity === "ams" ? "on" : ""}" style="--accent:var(--ams)" onclick="setCity('ams')">🇳🇱 Amsterdam</button>
    <button class="${currentCity === "par" ? "on" : ""}" style="--accent:var(--par)" onclick="setCity('par')">🇫🇷 Paris</button>`;
}

function setCity(c){
  currentCity = c;
  renderCitySwitch();
  renderPlaces();
}

function renderPlaces(){
  const acc = accentOf(currentCity);
  const origin = STAY_ORIGIN[currentCity];
  const groups = PLACES.filter(g => g.city === currentCity);

  document.getElementById("placesBody").innerHTML = groups.map(g => `
    <div class="place-group">
      <h3>${esc(g.group)}</h3>
      ${g.items.map(p => {
        const dest = p.name + (currentCity === "ams" ? ", Amsterdam" : ", Paris");
        return `<div class="place" style="--accent:${acc}">
            <h4>${esc(p.name)}</h4>
            <div class="area mono">${esc(p.area)}</div>
            <p class="what">${esc(p.what)}</p>
            ${p.note ? `<p class="pnote">${esc(p.note)}</p>` : ""}
            ${p.warn ? `<p class="pwarn">⚠ ${esc(p.warn)}</p>` : ""}
            ${p.pending ? `<p class="pnote"><span class="chip nc">Link não verificado</span> O domínio existe, mas não consegui testá-lo automaticamente.</p>` : ""}
            <div class="place-btns">
              ${p.official
                ? `<a href="${p.official}" target="_blank" rel="noopener">🔗 Site oficial</a>`
                : `<a class="disabled" aria-disabled="true">Sem site oficial</a>`}
              <a href="${directionsLink(origin, dest)}" target="_blank" rel="noopener">📍 Como chegar daqui</a>
            </div>
          </div>`;
      }).join("")}
    </div>`).join("");
}

function renderTips(){
  document.getElementById("tipsBody").innerHTML = TIPS.map(t => `
    <div class="tip">
      <span class="ic">${t.icon}</span>
      <div><h4>${esc(t.title)}</h4><p>${t.body}</p></div>
    </div>`).join("");
}

function renderConfuse(){
  document.getElementById("confuseBody").innerHTML = `
    <div class="confuse" style="--accent:var(--ams)">
      <h4>🇳🇱 Amsterdam</h4>
      <div class="l"><b>Linha 53/54 → Gaasperplas / Gein</b> — para ir a Wibautstraat.</div>
      <div class="l"><b>Linha 53/54 → Centraal Station</b> — para voltar.</div>
      <div class="l no">✗ Nunca pegue sentido "Isolatorweg" — é outra linha.</div>
    </div>
    <div class="confuse" style="--accent:var(--par)">
      <h4>🇫🇷 Paris</h4>
      <div class="l"><b>Gare du Nord → Port-Royal</b> — estação certa para o alojamento.</div>
      <div class="l no">✗ Não desça em Denfert-Rochereau para ir para casa.</div>
    </div>
    <div class="confuse" style="--accent:var(--par)">
      <h4>🚈 RER B</h4>
      <div class="l">Para <b>Gare du Nord</b>: sentido norte — Mitry-Claye / Aéroport Charles de Gaulle.</div>
      <div class="l">Para <b>Port-Royal</b>: sentido sul — Robinson / Saint-Rémy-lès-Chevreuse / Massy-Palaiseau.</div>
    </div>`;
}

/* =========================================================
   EMERGÊNCIA
   ========================================================= */
function renderSos(){
  const e = EMERGENCY;
  let html = `<div class="sos-primary">
      <div class="k">${esc(e.primary.label)}</div>
      <a class="num mono" href="tel:${e.primary.tel}">${esc(e.primary.value)}</a>
      <div class="sub">${esc(e.primary.sub)}</div>
    </div>`;

  html += e.blocks.map(b => `
    <div class="sos-block">
      <h3>${esc(b.title)}</h3>
      ${b.items.map(it => `
        <div class="sos-row">
          <span class="k">${esc(it.k)}</span>
          <span class="v${it.v ? "" : " pend"}">${it.v ? esc(it.v) : "A preencher"}</span>
        </div>`).join("")}
      ${b.note ? `<div class="note">${esc(b.note)}</div>` : ""}
    </div>`).join("");

  html += `<div class="sec-head"><div class="kicker">Se acontecer</div><h2>O que fazer</h2></div>`;
  html += e.procedures.map(p => `
    <details class="proc">
      <summary>${esc(p.title)}</summary>
      <ol>${p.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    </details>`).join("");

  document.getElementById("sosBody").innerHTML = html;
}

function openSos(){
  const ov = document.getElementById("sosOverlay");
  ov.hidden = false;
  ov.classList.remove("enter");
  void ov.offsetWidth;
  ov.classList.add("enter");
  ov.scrollTop = 0;
  document.body.style.overflow = "hidden";
}
function closeSos(){
  document.getElementById("sosOverlay").hidden = true;
  document.body.style.overflow = "";
}

/* =========================================================
   NAVEGAÇÃO
   ========================================================= */
const seenViews = new Set();

function showView(name){
  if(!VIEWS.includes(name)) name = "agora";

  document.querySelectorAll(".view").forEach(v => {
    const match = v.id === "view-" + name;
    v.hidden = !match;
    if(match){
      v.classList.remove("entering");
      void v.offsetWidth;
      v.classList.add("entering");
    }
  });

  document.querySelectorAll("#bottomnav button").forEach(b => {
    b.classList.toggle("active", b.dataset.view === name);
  });

  /* cascata só na primeira abertura da aba */
  if(name === "viagem" && !seenViews.has("viagem")){
    document.getElementById("timeline").classList.add("stagger");
    setTimeout(() => document.getElementById("timeline").classList.remove("stagger"), 800);
  }
  seenViews.add(name);

  closeDetail();
  closeSos();
  window.scrollTo(0,0);
  if(location.hash.replace("#","") !== name){
    history.replaceState(null, "", "#" + name);
  }
}

function handleHash(){
  const hash = location.hash.replace("#","");
  if(!hash) return;

  const routeMatch = hash.match(/^rota-(\d+)$/);
  if(routeMatch){
    showView("viagem");
    openDetail(parseInt(routeMatch[1], 10));
    return;
  }
  if(hash === "sos"){ openSos(); return; }
  if(LEGACY_HASH[hash]){ showView(LEGACY_HASH[hash]); return; }
  if(VIEWS.includes(hash)) showView(hash);
}

/* =========================================================
   BOOT
   ========================================================= */
function boot(){
  /* Caminho relativo dentro de custom property resolve contra o CSS, não contra
     o documento. Setar no elemento evita essa armadilha. */
  document.querySelector(".hero-photo").style.backgroundImage = 'url("img/hero.webp")';

  renderCountdown();
  renderNextCard();
  renderChecklist();
  renderAgoraAlerts();
  renderFootNote();

  renderTimeline();

  renderLangSwitch();
  renderPhrases();

  renderGastos();

  renderCitySwitch();
  renderPlaces();
  renderTips();
  renderConfuse();

  renderSos();

  wireSwipeClose(document.getElementById("detailOverlay"), closeDetail);
  wireSwipeClose(document.getElementById("sosOverlay"), closeSos);

  document.addEventListener("keydown", e => {
    if(e.key !== "Escape") return;
    if(!document.getElementById("showCard").hidden){ closeShow(); return; }
    if(!document.getElementById("sosOverlay").hidden){ closeSos(); return; }
    if(!document.getElementById("detailOverlay").hidden){ closeDetail(); }
  });

  window.addEventListener("hashchange", handleHash);
  if(location.hash) handleHash();

  /* foto da aba Guia carrega depois, sem bloquear o primeiro render */
  const loadGuidePhoto = () => {
    const img = new Image();
    img.onload = () => {
      const g = document.getElementById("guidePhoto");
      g.style.backgroundImage = 'url("img/diario.webp")';
      requestAnimationFrame(() => g.classList.add("ready"));
    };
    img.src = "img/diario.webp";
  };
  if("requestIdleCallback" in window) requestIdleCallback(loadGuidePhoto, { timeout:1500 });
  else setTimeout(loadGuidePhoto, 300);
}

if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();

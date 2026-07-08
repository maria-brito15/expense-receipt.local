const STORAGE_KEY = "recibo_entries_v1";
const THEME_KEY = "recibo_theme_v1";
const MONTH_KEY = "recibo_month_v1";
const SALDO_KEY = "recibo_saldo_inicial_v1";

const HIGHLIGHTS = [
  { id: "none", color: null },
  { id: "yellow", color: "#f4e04d" },
  { id: "pink", color: "#f4a6c6" },
  { id: "green", color: "#a8e0b8" },
  { id: "blue", color: "#a6c8f0" },
  { id: "orange", color: "#f4b86a" },
  { id: "purple", color: "#cbb2e8" },
];

let items = [];
let searchQuery = "";
let sortMode = "date-desc";
let activeCat = null; // 'entrada' | 'saida' | null
let currentType = "saida";
let currentColor = null;
let editingId = null;
let saldoInicial = 0;

function loadSaldoInicial() {
  const raw = localStorage.getItem(SALDO_KEY);
  saldoInicial = raw ? parseFloat(raw) : 0;
  if (isNaN(saldoInicial)) saldoInicial = 0;
}
function saveSaldoInicial() {
  localStorage.setItem(SALDO_KEY, String(saldoInicial));
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    items = raw ? JSON.parse(raw) : [];
  } catch (e) {
    items = [];
  }
}
function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function formatMoney(n) {
  return n.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function uid() {
  return "e" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getFilteredSorted() {
  let list = items.slice();
  if (activeCat) {
    list = list.filter((i) => i.type === activeCat);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter((i) => i.desc.toLowerCase().includes(q));
  }
  switch (sortMode) {
    case "date-asc":
      list.sort((a, b) => a.date - b.date);
      break;
    case "date-desc":
      list.sort((a, b) => b.date - a.date);
      break;
    case "amount-asc":
      list.sort((a, b) => a.value - b.value);
      break;
    case "amount-desc":
      list.sort((a, b) => b.value - a.value);
      break;
    case "az":
      list.sort((a, b) => a.desc.localeCompare(b.desc));
      break;
  }
  return list;
}

function renderSwatches() {
  const wrap = document.getElementById("swatches");
  wrap.innerHTML = "";
  HIGHLIGHTS.forEach((h) => {
    const el = document.createElement("div");
    el.className =
      "swatch" +
      (h.color ? "" : " none") +
      (currentColor === h.color ? " selected" : "");
    if (h.color) el.style.background = h.color;
    el.title = h.id;
    el.addEventListener("click", () => {
      currentColor = h.color;
      renderSwatches();
    });
    wrap.appendChild(el);
  });
}

function renderChips() {
  const wrap = document.getElementById("chips");
  wrap.innerHTML = "";
  const cats = [
    { key: null, label: "tudo" },
    { key: "entrada", label: "+ entradas" },
    { key: "saida", label: "- saídas" },
  ];
  cats.forEach((c) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (activeCat === c.key ? " active" : "");
    btn.textContent = c.label;
    btn.addEventListener("click", () => {
      activeCat = c.key;
      render();
    });
    wrap.appendChild(btn);
  });
}

function renderLedger() {
  const wrap = document.getElementById("ledger");
  wrap.innerHTML = "";
  const list = getFilteredSorted();
  if (list.length === 0) {
    wrap.innerHTML =
      '<div class="empty">nenhum lançamento por aqui ainda.</div>';
    return;
  }
  list.forEach((item) => {
    const row = document.createElement("div");
    row.className = "entry";

    const descWrap = document.createElement("div");
    descWrap.className = "desc-wrap";

    const desc = document.createElement("span");
    desc.className = "desc";
    desc.textContent = item.desc;
    if (item.color) desc.style.background = item.color;
    descWrap.appendChild(desc);

    const amount = document.createElement("span");
    amount.className = "amount " + item.type;
    amount.textContent =
      (item.type === "entrada" ? "+ " : "- ") + "r$ " + formatMoney(item.value);

    const actions = document.createElement("div");
    actions.className = "actions";
    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.title = "editar";
    editBtn.addEventListener("click", () => {
      startEdit(item.id);
    });
    actions.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.title = "remover";
    delBtn.addEventListener("click", () => {
      items = items.filter((i) => i.id !== item.id);
      if (editingId === item.id) cancelEdit();
      saveItems();
      render();
    });
    actions.appendChild(delBtn);

    if (editingId === item.id) {
      row.classList.add("editing");
    }

    row.appendChild(descWrap);
    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.alignItems = "center";
    right.style.gap = "8px";
    right.appendChild(amount);
    right.appendChild(actions);
    row.appendChild(right);

    wrap.appendChild(row);
  });
}

function renderSummary() {
  const wrap = document.getElementById("summary");
  const entradas = items
    .filter((i) => i.type === "entrada")
    .reduce((s, i) => s + i.value, 0);
  const saidas = items
    .filter((i) => i.type === "saida")
    .reduce((s, i) => s + i.value, 0);
  const saldo = saldoInicial + entradas - saidas;
  wrap.innerHTML = `
    <div class="line"><span>saldo inicial</span><span class="val">${saldoInicial >= 0 ? "" : "- "}r$ ${formatMoney(Math.abs(saldoInicial))}</span></div>
    <div class="line"><span>total de entradas</span><span class="val" style="color:var(--entrada)">+ r$ ${formatMoney(entradas)}</span></div>
    <div class="line"><span>total de saídas</span><span class="val" style="color:var(--saida)">- r$ ${formatMoney(saidas)}</span></div>
    <div class="line total"><span>saldo</span><span class="val ${saldo >= 0 ? "pos" : "neg"}">${saldo >= 0 ? "+" : "-"} r$ ${formatMoney(Math.abs(saldo))}</span></div>
  `;
}

function render() {
  renderChips();
  renderLedger();
  renderSummary();
}

// --- form handlers ---
document.getElementById("btnEntrada").addEventListener("click", () => {
  setType("entrada");
});
document.getElementById("btnSaida").addEventListener("click", () => {
  setType("saida");
});

function setType(type) {
  currentType = type;
  document
    .getElementById("btnEntrada")
    .classList.toggle("active", type === "entrada");
  document
    .getElementById("btnSaida")
    .classList.toggle("active", type === "saida");
}

function startEdit(id) {
  const item = items.find((i) => i.id === id);
  if (!item) return;
  editingId = id;
  document.getElementById("valorInput").value = item.value;
  document.getElementById("descInput").value = item.desc;
  setType(item.type);
  currentColor = item.color || null;
  renderSwatches();
  document.getElementById("addBtn").textContent = "salvar alterações";
  document.getElementById("cancelEditBtn").style.display = "block";
  render();
  document.getElementById("valorInput").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function cancelEdit() {
  editingId = null;
  document.getElementById("valorInput").value = "";
  document.getElementById("descInput").value = "";
  currentColor = null;
  setType("saida");
  renderSwatches();
  document.getElementById("addBtn").textContent = "adicionar ao recibo";
  document.getElementById("cancelEditBtn").style.display = "none";
}

document.getElementById("cancelEditBtn").addEventListener("click", () => {
  cancelEdit();
  render();
});

document.getElementById("addBtn").addEventListener("click", () => {
  const valorInput = document.getElementById("valorInput");
  const descInput = document.getElementById("descInput");
  const value = parseFloat(valorInput.value);
  const desc = descInput.value.trim();
  if (isNaN(value) || value <= 0 || !desc) {
    valorInput.style.borderColor = "var(--saida)";
    descInput.style.borderColor = desc ? "var(--line)" : "var(--saida)";
    return;
  }
  valorInput.style.borderColor = "var(--line)";
  descInput.style.borderColor = "var(--line)";

  if (editingId) {
    const item = items.find((i) => i.id === editingId);
    if (item) {
      item.type = currentType;
      item.value = value;
      item.desc = desc;
      item.color = currentColor;
    }
    saveItems();
    cancelEdit();
    render();
    return;
  }

  items.push({
    id: uid(),
    type: currentType,
    value: value,
    desc: desc,
    color: currentColor,
    date: Date.now(),
  });
  saveItems();
  valorInput.value = "";
  descInput.value = "";
  currentColor = null;
  renderSwatches();
  render();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderLedger();
});
document.getElementById("sortSelect").addEventListener("change", (e) => {
  sortMode = e.target.value;
  renderLedger();
});

// --- saldo inicial ---
const saldoInicialInput = document.getElementById("saldoInicialInput");
saldoInicialInput.addEventListener("input", () => {
  const v = parseFloat(saldoInicialInput.value);
  saldoInicial = isNaN(v) ? 0 : v;
  saveSaldoInicial();
  renderSummary();
});

// --- month label persistence ---
const monthInput = document.getElementById("monthLabel");
const savedMonth = localStorage.getItem(MONTH_KEY);
if (savedMonth) monthInput.value = savedMonth;
monthInput.addEventListener("input", () => {
  localStorage.setItem(MONTH_KEY, monthInput.value);
});

// --- theme ---
const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "modo claro" : "modo escuro";
  localStorage.setItem(THEME_KEY, theme);
}
themeToggle.addEventListener("click", () => {
  const cur = document.body.getAttribute("data-theme");
  applyTheme(cur === "dark" ? "light" : "dark");
});
applyTheme(localStorage.getItem(THEME_KEY) || "light");

// --- csv export ---
function csvEscape(str) {
  if (str == null) return "";
  const s = String(str);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

document.getElementById("exportBtn").addEventListener("click", () => {
  const header = ["tipo", "valor", "descricao", "cor", "data"];
  const rows = items.map((i) =>
    [
      i.type,
      i.value.toFixed(2),
      csvEscape(i.desc),
      i.color || "",
      new Date(i.date).toISOString(),
    ].join(","),
  );
  const descMesLine = [
    "descricao_mes",
    csvEscape(document.getElementById("monthLabel").value || ""),
  ].join(",");
  const saldoLine = ["saldo_inicial", saldoInicial.toFixed(2)].join(",");
  const csv = [descMesLine, saldoLine, header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "recibo-" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click();
  URL.revokeObjectURL(url);
});

// --- csv import ---
function parseCsvLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQuotes = false;
      } else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        result.push(cur);
        cur = "";
      } else cur += c;
    }
  }
  result.push(cur);
  return result;
}

document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const text = ev.target.result;
    let lines = text.split(/\r?\n/).filter((l) => l.trim().length);
    if (lines.length < 2) {
      e.target.value = "";
      return;
    }

    // linhas opcionais de metadados: "descricao_mes,..." e "saldo_inicial,..."
    for (let m = 0; m < 2; m++) {
      const cols = parseCsvLine(lines[0]);
      const key = (cols[0] || "").trim().toLowerCase();
      if (key === "saldo_inicial") {
        const saldoImportado = parseFloat(cols[1]);
        if (!isNaN(saldoImportado)) {
          saldoInicial = saldoImportado;
          saveSaldoInicial();
          document.getElementById("saldoInicialInput").value = saldoInicial;
        }
        lines = lines.slice(1);
      } else if (key === "descricao_mes") {
        const descMes = (cols[1] || "").trim();
        if (descMes) {
          document.getElementById("monthLabel").value = descMes;
          localStorage.setItem(MONTH_KEY, descMes);
        }
        lines = lines.slice(1);
      } else {
        break;
      }
    }

    if (lines.length < 2) {
      render();
      e.target.value = "";
      return;
    }

    const header = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
    const idxTipo = header.indexOf("tipo");
    const idxValor = header.indexOf("valor");
    const idxDesc = header.indexOf("descricao");
    const idxCor = header.indexOf("cor");
    const idxData = header.indexOf("data");

    const imported = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      const type = (cols[idxTipo] || "saida").trim().toLowerCase();
      const value = parseFloat(cols[idxValor]);
      const desc = (cols[idxDesc] || "").trim();
      const color = (cols[idxCor] || "").trim() || null;
      const dateStr = cols[idxData];
      const date = dateStr ? new Date(dateStr).getTime() : Date.now();
      if (!desc || isNaN(value)) continue;
      imported.push({
        id: uid(),
        type: type === "entrada" ? "entrada" : "saida",
        value: value,
        desc: desc,
        color: color,
        date: isNaN(date) ? Date.now() : date,
      });
    }
    items = items.concat(imported);
    saveItems();
    render();
    e.target.value = "";
  };
  reader.readAsText(file, "utf-8");
});

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

// --- init ---
loadItems();
loadSaldoInicial();
saldoInicialInput.value = saldoInicial ? saldoInicial : "";
renderSwatches();
render();

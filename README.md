<div align="center">

# 🧾 Expense Receipt

**track your income and expenses like a thermal receipt — instantly.**
_no installs · no accounts · no server · just open and type_

[🇧🇷 read in portuguese](README.pt-BR.md) · [open the app →](https://maria-brito15.github.io/expense-receipt.local/index.html)

</div>

---

## ✨ why this exists

you know that moment when you need to split a grocery run, plan a trip budget, or just figure out how much you spent (or earned) this month — and the options are:

> ask an AI to make a list and sum it up for you, or type everything into a calculator by hand

both feel like _too much_. one is repetitive, the other requires opening yet another tab and explaining yourself. it should just be a page you open and start typing into.

so yeah — born from pure laziness. there's an old saying: _give a hard task to a lazy person, because they'll find an easier way to do it._ this is that.

this is also part of an ongoing series of small tools that follow the same philosophy: **"this is boring to do manually, why not build something to do it for me?"** — just like the [file name standardizer](https://github.com/maria-brito15/file-name-standardizer) that came before it.

---

## 🚀 usage

**online** — no install needed, just open the link:

> 🔗 [maria-brito15.github.io/expense-receipt.local/index.html](https://maria-brito15.github.io/expense-receipt.local/index.html)

**locally** — clone the repo and open the file directly in any browser:

```bash
git clone https://github.com/maria-brito15/expense-receipt.local.git
# then open index.html in your browser
```

```
type value + description  →  mark as income or expense  →  pick a highlight color  →  add
```

---

## 🎛️ features

- **add entries** — value, description, and whether it's income (`+`) or an expense (`-`). one field, one press, and it's on the receipt.
- **highlighter colors** — mark any entry with a highlighter color, just like circling something on a real paper receipt.
- **search** — filters the list live as you type.
- **entradas / saídas filter** — chips to isolate income, expenses, or see everything at once.
- **sorting** — by date (newest/oldest), amount (high/low), or A–Z.
- **running summary** — total income, total expenses, and balance, always visible at the bottom of the receipt.
- **import from CSV** — bring in entries from a `.csv` file; they're parsed and merged straight into your ledger.
- **export to PDF** — opens the browser print dialog with a clean receipt layout (all UI hidden).
- **light and dark mode** — toggle at the top, remembered between visits.
- **installable PWA** — add it to your home screen or desktop and it runs like a native app, offline included.
- **fully responsive** — same paper-receipt layout adapts from small phones to tablets and desktop.
- **persistent storage** — everything lives in `localStorage` as JSON. survives refreshes and restarts, nothing sent anywhere.

---

## 🏗️ code architecture

vanilla JS, zero dependencies, split into three files:

```
loadItems / saveItems     read and write the ledger to localStorage as JSON
getFilteredSorted()       applies search, entrada/saída filter, and sort mode
render()                  rebuilds the ledger, category chips, and summary
renderSwatches()          draws the highlighter color picker
parseCsvLine()            turns an imported CSV row into an entry object
applyTheme()               toggles and persists light/dark mode
```

the entire state lives in a handful of variables: `items`, `searchQuery`, `sortMode`, `activeCat`, `currentType`, and `currentColor`.

---

## 🛠️ tech stack

```
HTML5  ·  CSS3 custom properties  ·  vanilla JS ES6+
IBM Plex Mono  ·  localStorage  ·  zero build step
```

---

## 📁 project structure

```
index.html    <- markup and structure
style.css     <- theming, layout, and responsive rules
script.js     <- state, rendering, CSV import, and theme logic
sw.js         <- service worker, caches the app for offline use (must stay at root)
pwa/
  manifest.json          <- PWA metadata, install behavior
  icon-192.png            <- app icon
  icon-512.png            <- app icon
  icon-512-maskable.png   <- adaptive icon for Android
README.md     <- this file
```

---

<div align="center">

made with 💙 · runs in any browser · no internet needed after first load

</div>

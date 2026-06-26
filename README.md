<div align="center">

# 🧾 Expense Receipt

**track your spending like a thermal receipt — instantly.**
*no installs · no accounts · no server · just open and type*

[🇧🇷 ler em português](README.pt-BR.md) · [open the app →](https://maria-brito15.github.io/expense-receipt.local/index.html)

</div>

---

## ✨ why this exists

you know that moment when you need to split a grocery run, plan a trip budget, or just figure out how much you spent this week — and the options are:

> ask an AI to make a list and sum it up for you, or type everything into a calculator by hand

both feel like *too much*. one is repetitive, the other requires opening yet another tab and explaining yourself. it should just be a page you open and start typing into.

so yeah — born from pure laziness. there's an old saying: *give a hard task to a lazy person, because they'll find an easier way to do it.* this is that.

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
type item + price + category  →  add  →  see total  →  export PDF
```

---

## 🗂️ categories

| category | color |
|---|---|
| 🍽 Food | Orange |
| 🏠 Housing | Blue |
| 🚌 Transport | Green |
| 💊 Health | Red |
| 🎬 Leisure | Purple |
| 📚 Education | Teal |
| 👔 Clothing | Burnt orange |
| 📦 Other | Gray |

---

## 🎛️ features

- **add entries** — item name, price, and category. press `+` and it's in the ledger.
- **edit in place** — click the pencil on any row to change name, price, or category inline without leaving the page.
- **search** — filters the list live as you type.
- **category filter chips** — appear automatically based on what you've added. click one to isolate that category.
- **sorting** — by date (newest/oldest), amount (high/low), or A–Z.
- **spending charts** — toggle between a pie and a bar chart. updates live.
- **category breakdown bars** — each category shows its share of the total as a progress bar.
- **export to PDF** — opens the browser print dialog with a clean receipt layout (all UI hidden).
- **persistent storage** — everything lives in `localStorage`. survives refreshes and restarts, nothing sent anywhere.

---

## 🏗️ code architecture

vanilla JS, zero dependencies, one file:

```
loadItems / saveItems     read and write to localStorage
getFilteredSorted()       applies search, category filter, and sort mode
render()                  rebuilds the ledger, summary, breakdown, and chart
buildInlineEdit()         injects the edit form into a ledger row
updateChart()             destroys and recreates the Chart.js instance
addItem / removeItem      mutate the items array and trigger save + render
```

the entire state lives in four variables: `items`, `searchQuery`, `sortMode`, and `activeCat`.

---

## 🛠️ tech stack

```
HTML5  ·  CSS3 custom properties  ·  vanilla JS ES6+
IBM Plex Mono  ·  Chart.js 4.4.1  ·  localStorage  ·  zero build step
```

---

## 📁 project structure

```
index.html    <- the entire app (HTML + CSS + JS in one file)
README.md     <- this file
```

---

<div align="center">

made with 💙 · runs in any browser · no internet needed after first load

</div>

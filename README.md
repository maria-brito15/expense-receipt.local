# Expense Receipt

A single-file, zero-dependency spending planner that looks and feels like a thermal receipt. Open `index.html` in any browser — no server, no build step, no account required.

---

## Features

### Add entries
Type an item name, enter a price, pick a category, and press **+**. The ledger updates instantly and the running total recalculates.

### Edit entries
Click the **✎** pencil icon on any row to expand an inline form. Change the name, price, or category in place, then hit **SAVE** — or **CANCEL** to discard.

### Categories
Eight built-in categories, each with a distinct color dot:

| Category   | Color   |
|------------|---------|
| Food       | Orange  |
| Housing    | Blue    |
| Transport  | Green   |
| Health     | Red     |
| Leisure    | Purple  |
| Education  | Teal    |
| Clothing   | Burnt orange |
| Other      | Gray    |

### Search & filter
- **Search bar** — filters the ledger live as you type, matching against item names.
- **Category chips** — click any category chip (generated automatically from your current entries) to show only that category. The item count and total reflect the active filter.

### Sorting
Use the sort dropdown to reorder the ledger by:
- Date added (newest or oldest first)
- Amount (high to low or low to high)
- Name (A–Z)

### Spending charts
A **SPENDING BREAKDOWN** section below the summary renders your category totals visually. Toggle between two views:
- **PIE** — doughnut chart with a color-coded legend
- **BAR** — horizontal bar chart with dollar-value axis

The chart updates automatically whenever entries are added, edited, or removed.

### Category breakdown bars
Below the total, each active category appears as a labeled progress bar showing its share of total spending alongside its dollar amount.

### Export to PDF
Click **⬇ EXPORT PDF** to open the browser's print dialog. The toolbar, entry form, charts, and action buttons are hidden via print CSS, leaving a clean receipt layout ready to save as PDF.

### Persistent storage
All entries are saved to `localStorage` under the key `expense-receipt:items-v2`. Data survives page refreshes and browser restarts. Nothing is sent to a server.

---

## Usage

1. Download or copy `index.html` to your computer.
2. Open it in any modern browser (Chrome, Firefox, Safari, Edge).
3. Start adding expenses.

No internet connection is required after the initial load (Google Fonts and Chart.js are fetched from CDN on first open; after that the page works offline except for those assets).

---

## File structure

```
index.html   ← the entire app (HTML + CSS + JS in one file)
README.md    ← this file
```

---

## Technical notes

- **No framework.** Vanilla HTML, CSS, and JavaScript only.
- **Chart.js 4.4.1** loaded from `cdnjs.cloudflare.com` for the spending charts.
- **IBM Plex Mono** loaded from Google Fonts for the monospaced receipt aesthetic.
- Currency is formatted with `Intl.NumberFormat` via `toLocaleString('en-US', { style: 'currency', currency: 'USD' })`.
- The torn-edge receipt effect is achieved with CSS `::before` / `::after` pseudo-elements using repeating linear gradients — no images.
- Print styles hide all interactive UI so the exported PDF contains only the receipt content.

---

## Browser support

Works in any browser that supports CSS Grid, `localStorage`, and the Canvas API — which is every major browser released since 2017.

# Elasticsearch Restaurants Aggregations UI

> 🌐 Language / Ngôn ngữ: **English** | [Tiếng Việt](readme.vi.md)

## About

A frontend demo app built with **Vue 2** (no build tool) that demonstrates restaurant search and filtering powered by Elasticsearch aggregations. The app loads Vue components dynamically at runtime using `vue3-sfc-loader`, with Vuex for state management and BootstrapVue for UI components — all served from a plain `index.html` without a bundler.

> **Backend:** This UI connects to the [Elasticsearch-Restaurants-Aggregations-Api-Nodejs](https://github.com/dangkhoa2016/Elasticsearch-Restaurants-Aggregations-Api-Nodejs) API server.

---

## Screenshots

### Loading screen
![Loading vue components](screenshots/loading1.PNG)

### All done, starting app
![All done](screenshots/loading2.PNG)

### Search results
![Search results](screenshots/index.PNG)

### Filter with criteria
![Filter with criteria](screenshots/filter-criteria.PNG)

### No results found
![No results found](screenshots/filter-criteria-not-found.PNG)

### Restaurant detail — General tab
![Restaurant detail general](screenshots/open-detail-popup1.PNG)

### Restaurant detail — Features tab
![Restaurant detail features](screenshots/open-detail-popup2.PNG)

### Restaurant detail — Other info tab
![Restaurant detail other info](screenshots/open-detail-popup3.PNG)

---

## Technologies Used

| Layer | Technology |
|---|---|
| UI Framework | Vue 2.7.16 |
| State management | Vuex 3.6.2 |
| UI components | BootstrapVue 2.23.1 |
| CSS framework | Bootstrap 5.1.3 ¹ |
| Date picker | vue-ctk-date-time-picker 2.5.0 |
| SFC loader | vue3-sfc-loader (vue2 build) 0.8.4 |
| CDN | jsDelivr (combined bundle) |
| Build tool | None — plain HTML + vanilla JS |

> ¹ Bootstrap **CSS** 5.1.3 is used for styling even though BootstrapVue 2 targets Bootstrap 4. The component markup is still compatible for most use cases.

---

## Project Structure

```
index.html                  # Entry point — bootstraps CDN libs then loader.js
assets/
├── app.html                # Root Vue template (left-panel + right-panel + modal)
├── app.js                  # Root Vue instance + Vuex store wiring
├── loader.js               # Sequential loader: stores → .vue components → app
├── helpers.js              # Shared utility functions
├── style.css               # Global styles
├── dev.json / sample.json  # Local mock data for development
stores/
├── appStore.js             # API endpoint URL + showFilter flag
├── searchStore.js          # Search queries, sorts, pagination, fetch logic
└── displayStore.js         # Currently displayed restaurant detail
components/
└── restaurant-card.js      # JS component for a single restaurant card
vue/
├── left-panel.vue          # Sidebar with all filter panels
├── right-panel.vue         # Result grid + pagination + search bar
├── search-top.vue          # Search text input + method selector
├── search-result.vue       # Result count banner + restaurant cards
├── filter-card.vue         # Generic collapsible filter wrapper
├── multiple-checkbox-filter.vue  # Checkbox list filter (state, city, cuisine…)
├── boolean-radio-filter.vue      # Yes/No/N/A radio filter (bar, takeout…)
├── has-or-missing-filter.vue     # Has / Missing toggle filter
├── date-range-filter.vue         # Date range picker filter
└── restaurant-modal.vue          # Detail popup with General/Features/Other tabs
```

---

## How It Works

1. `index.html` loads **core CDN libraries** (Vue, Vuex, vue3-sfc-loader, BootstrapVue, date picker) in a single combined jsDelivr request.
2. After core is ready, `/assets/loader.js` is injected. It shows a **progress bar** while sequentially:
   - Loading Vuex store modules (`appStore`, `searchStore`, `displayStore`).
   - Loading the plain JS component (`restaurant-card`).
   - Compiling and registering all `.vue` SFC components at runtime via `vue3-sfc-loader`.
   - Calling the API to load filter aggregations (`GET /filters`).
3. Once loading completes, the main Vue app mounts on `#app` and triggers the initial search.

---

## Configuration

The API endpoint is set in `stores/appStore.js`:

```js
endpoint: 'https://your-api-server-url'
```

Change this value to point to your own running instance of the backend API.

---

## Running Locally

No build step required. Just serve the project root with any static file server.

```bash
# Using npx serve
npx serve .

# Using Node.js http-server
npx http-server . -p 8000

# Using Python
python3 -m http.server 8000

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

> Make sure the backend API server is running and the `endpoint` in `stores/appStore.js` points to it.

---

## Features

- **Full-text search** — search by name, description, contact phone, or address with multiple match methods (contains, starts-with, ends-with, exact).
- **Multi-checkbox filters** — filter by state, city, primary cuisine, dining style (most/least served).
- **Boolean radio filters** — filter by has bar, has takeout.
- **Has/Missing filters** — filter by presence of legacy photos or order-online links.
- **Date range filter** — filter by published date with pre-defined ranges or custom picker.
- **Pagination** — configurable page size (default 24).
- **Sorting** — sort results by available fields.
- **Restaurant detail modal** — view full details across three tabs: General, Features, Other info.

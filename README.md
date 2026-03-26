# ShelfLine — Product Dashboard

ShelfLine is a responsive, production-grade React dashboard for browsing, searching, and filtering products from the [FakeStore API](https://fakestoreapi.com/products).

---

## Setup instructions

```bash
npm install
npm start
```

App runs at `http://localhost:3000`. Use any valid email + password (6+ chars) to log in.

---

## Features_included

- **Mock Authentication** — login/logout with token stored in `localStorage`, protected routes
- **Live Search** — filters products by name as you type
- **Category Filter** — pill buttons for Men's, Women's, Electronics, Jewellery
- **Sort** — by Name (A–Z / Z–A), Price (low/high), Top Rated
- **Pagination** — 8 items per page with smart ellipsis
- **Stats Bar** — live count, average price, average rating, category count
- **Skeleton Loaders** — shimmer placeholders while data loads
- **Error State + Retry** — user-friendly error with retry button
- **Empty State** — clear feedback when no results match
- **Form Validation** — email regex + length checks with inline errors
- **Fully Responsive** — mobile-first, works from 320px to 4K

---

## Public API used

**FakeStore API** — `https://fakestoreapi.com/products`

Chosen because it returns realistic product data (title, price, category, image, description, rating) across 4 distinct categories — ideal for demonstrating filtering, sorting, and card-based UI.

---

## Tech Stack used

- React 18 + React Router v6
- Axios for HTTP requests
- CSS Modules (plain CSS, no framework)
- Google Fonts: Syne, DM Mono, DM Sans

---

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css
│   ├── SearchBar.jsx / .css
│   ├── FilterSort.jsx / .css
│   ├── DataCard.jsx / .css
│   └── Pagination.jsx / .css
├── pages/
│   ├── Login.jsx / .css
│   └── Dashboard.jsx / .css
├── App.js
├── index.js
└── index.css
```

---

## Assumptions made

- Authentication is mocked — any valid email + 6-char password grants access
- Product data is fetched fresh on each dashboard mount (no caching)
- "Jewellery" is the display spelling used for the `jewelery` API category

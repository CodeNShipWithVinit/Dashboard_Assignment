import React from 'react';
import './FilterSort.css';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: "men's clothing", label: "Men's" },
  { value: "women's clothing", label: "Women's" },
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewellery' },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'rating-desc', label: 'Top Rated' },
];

export default function FilterSort({ filterBy, setFilterBy, sortBy, setSortBy }) {
  return (
    <div className="filter-sort">
      <div className="filter-group">
        <span className="filter-label">Category</span>
        <div className="filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={`filter-pill ${filterBy === cat.value ? 'active' : ''}`}
              onClick={() => setFilterBy(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sort-group">
        <span className="filter-label">Sort by</span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

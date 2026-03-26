import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterSort from '../components/FilterSort';
import DataCard from '../components/DataCard';
import Pagination from '../components/Pagination';
import './Dashboard.css';

const API_URL = 'https://fakestoreapi.com/products';
const ITEMS_PER_PAGE = 8;

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line shimmer" style={{ width: '60%', height: '12px' }} />
        <div className="skeleton-line shimmer" style={{ width: '90%', height: '16px' }} />
        <div className="skeleton-line shimmer" style={{ width: '75%', height: '14px' }} />
        <div className="skeleton-line shimmer" style={{ width: '50%', height: '12px' }} />
      </div>
    </div>
  );
}

// Stats bar at the top of dashboard
function StatsBar({ data }) {
  const avgPrice = data.length ? (data.reduce((s, p) => s + p.price, 0) / data.length).toFixed(2) : '—';
  const avgRating = data.length ? (data.reduce((s, p) => s + (p.rating?.rate || 0), 0) / data.length).toFixed(1) : '—';
  const categories = [...new Set(data.map((p) => p.category))].length;

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-value">{data.length}</span>
        <span className="stat-label">Products</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value">${avgPrice}</span>
        <span className="stat-label">Avg. Price</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value">★ {avgRating}</span>
        <span className="stat-label">Avg. Rating</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value">{categories}</span>
        <span className="stat-label">Categories</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      setError('Failed to load products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ---- Reset page on filter/search/sort change ----
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterBy, sortBy]);

  // ---- Filter + Sort pipeline ----
  const filteredData = useMemo(() => {
    let result = [...data];

    
    if (filterBy !== 'all') {
      result = result.filter((item) => item.category === filterBy);
    }

    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) => item.title.toLowerCase().includes(q));
    }

    // Sort
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }
    // 'default' → no sort change

    return result;
  }, [data, filterBy, searchQuery, sortBy]);


  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="dashboard-layout">
      <Navbar totalProducts={data.length} />

      <main className="dashboard-main">
        <div className="dashboard-hero">
          <div>
            <h1 className="dashboard-title">Product Catalog</h1>
            <p className="dashboard-subtitle">Browse, search, and filter your entire inventory</p>
          </div>
          {!loading && !error && <StatsBar data={filteredData.length === data.length ? data : filteredData} />}
        </div>

        <div className="controls-bar">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterSort
            filterBy={filterBy} setFilterBy={setFilterBy}
            sortBy={sortBy} setSortBy={setSortBy}
          />
        </div>

        {!loading && !error && (
          <div className="results-info">
            <span className="results-count">
              {filteredData.length === 0
                ? 'No products found'
                : `${filteredData.length} product${filteredData.length !== 1 ? 's' : ''}`}
            </span>
            {(searchQuery || filterBy !== 'all') && filteredData.length < data.length && (
              <button
                className="clear-filters-btn"
                onClick={() => { setSearchQuery(''); setFilterBy('all'); setSortBy('default'); }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="grid-area">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="error-state">
            <div className="error-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="error-message">{error}</p>
            <button className="retry-btn" onClick={fetchData}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredData.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <p>No products match your search or filters.</p>
            <button className="retry-btn" onClick={() => { setSearchQuery(''); setFilterBy('all'); setSortBy('default'); }}>
              Reset Filters
            </button>
          </div>
        )}

        {!loading && !error && paginatedData.length > 0 && (
          <>
            <div className="grid-area">
              {paginatedData.map((product, idx) => (
                <DataCard
                  key={product.id}
                  {...product}
                  style={{ animationDelay: `${idx * 40}ms` }}
                />
              ))}
            </div>

            <div className="pagination-footer">
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

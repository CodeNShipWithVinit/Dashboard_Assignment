import React, { useState } from 'react';
import './DataCard.css';

const CATEGORY_COLORS = {
  "men's clothing": '#60a5fa',
  "women's clothing": '#f472b6',
  'electronics': '#34d399',
  'jewelery': '#fbbf24',
};

function StarRating({ rate, count }) {
  const full = Math.floor(rate);
  const half = rate - full >= 0.5;
  return (
    <div className="star-rating" title={`${rate} (${count} reviews)`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i <= full ? '#fbbf24' : (i === full + 1 && half ? 'url(#half)' : 'none')}
          stroke="#fbbf24" strokeWidth="1.5">
          <defs>
            <linearGradient id="half"><stop offset="50%" stopColor="#fbbf24" /><stop offset="50%" stopColor="none" /></linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="review-count">({count})</span>
    </div>
  );
}

export default function DataCard({ id, title, price, category, image, description, rating }) {
  const [imgError, setImgError] = useState(false);
  const catColor = CATEGORY_COLORS[category] || '#8888aa';

  return (
    <div className="data-card">
      <div className="card-image-wrap">
        {!imgError ? (
          <img
            src={image}
            alt={title}
            className="card-image"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
        <span className="card-id">#{id}</span>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-category" style={{ color: catColor, borderColor: catColor + '40', background: catColor + '12' }}>
            {category}
          </span>
          <span className="card-price">${price.toFixed(2)}</span>
        </div>

        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>

        {rating && <StarRating rate={rating.rate} count={rating.count} />}
      </div>
    </div>
  );
}

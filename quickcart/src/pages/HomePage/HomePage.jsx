import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import { fetchAllProducts } from '../../services/productService';
import './HomePage.css';

const CATEGORIES = [
  { key: 'smartphones',    label: 'Smartphones',    emoji: '📱' },
  { key: 'laptops',        label: 'Laptops',         emoji: '💻' },
  { key: 'womens-dresses', label: "Women's Dresses", emoji: '✦' },
  { key: 'fragrances',     label: 'Fragrances',      emoji: '◈' },
  { key: 'furniture',      label: 'Furniture',       emoji: '🛋' },
];

export default function HomePage() {
  const [grouped, setGrouped] = useState({});
  const [error, setError]     = useState('');

  useEffect(() => {
    fetchAllProducts()
      .then(products => {
        const g = {};
        CATEGORIES.forEach(c => {
          g[c.key] = products.filter(p => p.category === c.key).slice(0, 4);
        });
        setGrouped(g);
      })
      .catch(() => setError('Failed to load products. Please try again later.'));
  }, []);

  return (
    <div>
      <BannerSlider />

      {error && <p className="error-box">{error}</p>}

      {!error && (
        <div className="home-cate-wrap">
          {CATEGORIES.map(cat => (
            <div className="category-section" key={cat.key}>
              <h2 className="home-cate-title">{cat.emoji} {cat.label}</h2>
              <div className="home-category">
                {(grouped[cat.key] || Array(4).fill(null)).map((p, i) =>
                  p ? (
                    <Link to={`/product/${p.id}`} key={p.id} className="home-category-card">
                      <div className="home-media">
                        <img src={p.thumbnail} alt={p.title} loading="lazy" />
                      </div>
                      <h3 className="home-title">{p.title}</h3>
                    </Link>
                  ) : (
                    <div key={i} className="home-category-card skeleton" />
                  )
                )}
              </div>
              <Link to="/products" className="view-all-link">View All {cat.label}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

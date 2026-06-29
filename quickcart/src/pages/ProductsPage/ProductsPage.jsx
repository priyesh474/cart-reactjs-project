import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';
import { useProducts } from '../../hooks/useProducts';
import { toINR } from '../../utils/currency';
import './ProductsPage.css';

const CATEGORIES = [
  { value: 'all',                label: 'All Products' },
  { value: 'smartphones',        label: 'Smartphones' },
  { value: 'laptops',            label: 'Laptops' },
  { value: 'tablets',            label: 'Tablets' },
  { value: 'mens-watches',       label: "Men's Watches" },
  { value: 'womens-watches',     label: "Women's Watches" },
  { value: 'womens-dresses',     label: "Women's Dresses" },
  { value: 'womens-shoes',       label: "Women's Shoes" },
  { value: 'mens-shirts',        label: "Men's Shirts" },
  { value: 'mens-shoes',         label: "Men's Shoes" },
  { value: 'fragrances',         label: 'Fragrances' },
  { value: 'skincare',           label: 'Skincare' },
  { value: 'furniture',          label: 'Furniture' },
  { value: 'home-decoration',    label: 'Home Decor' },
  { value: 'sunglasses',         label: 'Sunglasses' },
  { value: 'jewellery',          label: 'Jewellery' },
  { value: 'sports-accessories', label: 'Sports' },
  { value: 'vehicle',            label: 'Vehicle' },
];

export default function ProductsPage() {
  const dispatch = useDispatch();
  const {
    products, total, loading, error, hasMore,
    category, searchInput, minP, maxP, addedId,
    setSearchInput, setMinP, setMaxP,
    handleCategory, handleSearch, handleLoadMore, handleAdd,
  } = useProducts(dispatch);

  return (
    <div className="home-page">
      {error && <p className="error-box">{error}</p>}

      <section className="products-section">
        <div className="section-head">
          <h2>All Products</h2>
          {total > 0 && <span className="items-count">{total} items available</span>}
        </div>

        {/* FILTER BAR */}
        <div className="filter-wrap">
          <h3 className="filter-title">Filter & Search</h3>

          <select
            className="category-filter"
            value={category}
            onChange={e => handleCategory(e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <form className="filter-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search phones, watches, furniture…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn primary search-btn">Search</button>
          </form>

          <div className="price-range">
            <label>Price ₹</label>
            <input
              type="number" placeholder="Min"
              value={minP} onChange={e => setMinP(e.target.value)}
            />
            <span>—</span>
            <input
              type="number" placeholder="Max"
              value={maxP} onChange={e => setMaxP(e.target.value)}
            />
          </div>
        </div>

        {/* GRID */}
        {products.length === 0 && !loading ? (
          <p className="no-results">No products found. Try a different search.</p>
        ) : (
          <div className="grid">
            {products.map(p => (
              <div className="card" key={p.id}>
                <Link className="card-item" to={`/product/${p.id}`}>
                  <div className="card-media">
                    <img src={p.thumbnail} alt={p.title} loading="lazy" />
                    <span className="card-chip">{p.category}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-desc">{p.description}</p>
                    <div className="rate-price">
                      <span className="rate">⭐ {p.rating?.toFixed(1)}</span>
                      <p className="price">₹{toINR(p.price).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </Link>
                <div className="actions">
                  <button
                    className={`btn add${addedId === p.id ? ' added' : ''}`}
                    onClick={() => handleAdd(p)}
                  >
                    {addedId === p.id ? '✓ Added to Cart' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            ))}

            {loading && Array(12).fill(null).map((_, i) => (
              <div key={'sk-' + i} className="skeleton skeleton-card" />
            ))}
          </div>
        )}

        {!loading && hasMore && (
          <div className="center">
            <button className="btn load" onClick={handleLoadMore}>Load More Products</button>
          </div>
        )}
      </section>
    </div>
  );
}

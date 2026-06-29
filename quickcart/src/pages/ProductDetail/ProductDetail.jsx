import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeItem } from '../../features/cart/cartSlice';
import { fetchProductById } from '../../services/productService';
import { toINR } from '../../utils/currency';
import { getStockClass, getStockLabel } from '../../utils/stock';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imgIdx, setImgIdx]   = useState(0);
  const [added, setAdded]     = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(null);
    setImgIdx(0);
    fetchProductById(id)
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  const handleAdd = () => {
    dispatch(addToCart({ ...product, image: product.thumbnail }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) return <div className="loading">Loading product…</div>;

  const images = product.images?.length ? product.images : [product.thumbnail];
  const filledStars = Math.round(product.rating);
  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <>
      <Link to="/products" className="back-btn">Back to Products</Link>

      <div className="product-detail">
        {/* LEFT: image gallery */}
        <div className="detail-gallery">
          <div className="detail-left">
            <img src={images[imgIdx]} alt={product.title} />
          </div>

          {images.length > 1 && (
            <div className="thumbnail-strip">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb-btn${i === imgIdx ? ' active' : ''}`}
                  onClick={() => setImgIdx(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: details */}
        <div className="detail-right">
          <p className="cat">{product.brand ? `${product.brand} · ` : ''}{product.category}</p>
          <h2>{product.title}</h2>
          <p className="desc">{product.description}</p>

          <div className="rating">
            {'★'.repeat(filledStars)}{'☆'.repeat(5 - filledStars)}
            <span>{product.rating?.toFixed(1)} / 5</span>
            {product.stock !== undefined && (
              <span className={`stock-badge ${getStockClass(product.stock)}`}>
                {getStockLabel(product.stock)}
              </span>
            )}
          </div>

          <hr />

          <p className="price">₹{toINR(product.price).toLocaleString('en-IN')}</p>

          {product.discountPercentage > 0 && (
            <p className="discount-info">
              <span className="original-price">₹{toINR(originalPrice).toLocaleString('en-IN')}</span>
              {'  '}
              <span className="discount-percent">{Math.round(product.discountPercentage)}% off</span>
            </p>
          )}

          <div className="detail-btn-wrap">
            <button
              className={`btn primary${added ? ' added' : ''}`}
              onClick={handleAdd}
              disabled={product.stock === 0}
              style={added ? { background: 'var(--success)' } : {}}
            >
              {product.stock === 0 ? 'Out of Stock' : added ? '✓ Added to Cart' : '+ Add to Cart'}
            </button>
            <button className="btn primary del" onClick={() => dispatch(removeItem(product.id))}>
              🗑
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

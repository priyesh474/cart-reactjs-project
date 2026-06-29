import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { addToCart} from '../features/cartSlice';
import { Link } from 'react-router-dom';

export default function HomeProducts() {

  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(8);
  const [category, setCategory] = useState("all");
  const [error, setError] = useState("");
  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); 
  const [searchQuery, setSearchQuery] = useState("");
  
  // const { items } = useSelector(s => s.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setError("");      
        console.log(response.data);
      } catch (error) {
        console.error("Error...", error);
        setError("Failed to load products. Please try again later....");  
      }
    };

    fetchProducts();
    // return () => (isMounted = false);
  }, []);

  const filteredByCategory = category === "all" ? products : products.filter(p => p.category === category);

  const filteredByPrice = filteredByCategory.filter(p => Math.round(p.price * 85) >= minPrice && Math.round(p.price * 85) <= maxPrice);

  const filteredBySearch = filteredByPrice.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleProducts = filteredBySearch.slice(0, visible);
  console.log(visibleProducts);
  
  return (
    <div className="home-page">

      {error && (
        <p className="error-box">
          {error}
        </p>
      )}

      {!error && (
        <section className="products-section">
          <div className="section-head">
            <h2>Featured Products</h2>
          </div>

          <div className='filter-wrap'>

              <h3 className='filter-title'>Filter : </h3>

              <select className="category-filter" onChange={(e) => { 
                setCategory(e.target.value); 
                setVisible(8); 
              }} >
                <option value="all">All</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
              </select>

              
              <input type="text" className="search-bar" placeholder="Search products..." value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisible(8); 
                }}
              />

              <div className="price-range">
                <label>Price Range: </label>
                <input type="number"  value={minPrice}  onChange={(e) => setMinPrice(Number(e.target.value))}  placeholder="Min Price"/>
                <span> to </span>
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} placeholder="Max Price"/>
              </div>
            </div>

          {filteredBySearch.length === 0 ? (
              <p className="no-results">
                No products found matching your search or price range.
              </p>
            ) : (
              <div className="grid">
                {visibleProducts.map(p => (
                  <div className="card" key={p.id}>

                    <Link className="card-item" to={`/product/${p.id}`}>
                      <div className="card-body">
                        <div className="card-media">
                          <img src={p.image} alt={p.title} />
                        </div>
                        <h3 className="card-title">{p.title}</h3>
                        <p className="card-desc">{p.description}</p>

                        <div className="rate-price">
                          <span className="rate">{p.rating.rate}⭐</span>
                          <p className="price">₹{Math.round(p.price * 85)}</p>
                        </div>
                      </div>
                    </Link>

                    <div className="actions">
                      <button className="btn add" onClick={() => dispatch(addToCart(p))}>
                        Add to Cart
                      </button>
                      {/* {
                        items.length === 0 ? " " : <button className="del" onClick={() => dispatch(removeItem(p.id))}>🗑</button>
                      } */}
                    </div>

                  </div>
                ))}
              </div>
            )}


          {visible < filteredBySearch.length && (
            <div className="center">
              <button className="btn load" onClick={() => setVisible(v => v + 8)}>
                Load More
              </button>
            </div>
          )}
        </section>
      )}

    </div>
  );
}

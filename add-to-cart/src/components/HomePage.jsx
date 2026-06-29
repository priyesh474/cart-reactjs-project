import { useEffect, useState } from 'react';
import BannerSlider from './BannerSlider';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  
  const [electronics, setElectronics] = useState([]);
  const [womenClothing, setWomenClothing] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const [menClothing, setMenClothing] = useState([]);

  console.log(products);
  

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        setProducts(response.data);
        setElectronics(response.data.filter(p => p.category === "electronics").slice(0, 4));
        setWomenClothing(response.data.filter(p => p.category === "women's clothing").slice(0, 4));
        setJewelry(response.data.filter(p => p.category === "jewelery").slice(0, 4));
        setMenClothing(response.data.filter(p => p.category === "men's clothing").slice(0, 4));
        setError("");      

      } catch (error) {
        console.error("Error...", error);
        setError("Failed to load products. Please try again later....");  
      }
    };
    fetchProducts();

  }, []);

  return (
    <div>
      <BannerSlider />

      {error && (
        <p className="error-box">
          {error}
        </p>
      )}

      {!error && (
        <div className='home-cate-wrap'>
          <div className="category-section">
            <h2 className='home-cate-title'>Electronics</h2>
            <div className="home-category">
              {electronics.map(p => (
                <div className="home-category-card" key={p.id}>
                  <div className="home-item">
                    <div className="home-body">
                      <div className="home-media">
                        <img src={p.image} alt={p.title} />
                      </div>
                      <h3 className="home-title">{p.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/products" className="view-all-link">View All</Link>
          </div>

          <div className="category-section">
            <h2 className='home-cate-title'>Women's Clothing</h2>
            <div className="home-category">
              {womenClothing.map(p => (
                <div className="home-category-card" key={p.id}>
                  <div className="home-item">
                    <div className="home-body">
                      <div className="home-media">
                        <img src={p.image} alt={p.title} />
                      </div>
                      <h3 className="home-title">{p.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/products" className="view-all-link">View All</Link>
          </div>

          <div className="category-section">
            <h2 className='home-cate-title'>Jewelry</h2>
            <div className="home-category">
              {jewelry.map(p => (
                <div className="home-category-card" key={p.id}>
                  <div className="home-item">
                    <div className="home-body">
                      <div className="home-media">
                        <img src={p.image} alt={p.title} />
                      </div>
                      <h3 className="home-title">{p.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/products" className="view-all-link">View All</Link>
          </div>

          <div className="category-section">
            <h2 className='home-cate-title'>Men's Clothing</h2>
            <div className="home-category">
              {menClothing.map(p => (
                <div className="home-category-card" key={p.id}>
                  <div className="home-item">
                    <div className="home-body">
                      <div className="home-media">
                        <img src={p.image} alt={p.title} />
                      </div>
                      <h3 className="home-title">{p.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/products" className="view-all-link">View All</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

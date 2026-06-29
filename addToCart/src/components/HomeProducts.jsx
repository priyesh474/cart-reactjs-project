import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import BannerSlider from './BannerSlider';

export default function HomeProducts(){
  const [products,setProducts]=useState([]);
  const [visible,setVisible]=useState(8);
  const dispatch = useDispatch();

  useEffect(()=>{ let mounted=true;
    axios.get('https://fakestoreapi.com/products').then(r=>{ if(mounted) setProducts(r.data); });
    return ()=> mounted=false;
  },[]);

  const visibleProducts = products.slice(0,visible);

  return (
    <div className="home-page">
      <BannerSlider />
      <section className="products-section">
        <div className="section-head">
          <h2>Featured Products</h2>
          <p className="muted">Curated picks for you</p>
        </div>

        <div className="grid">
          {visibleProducts.map(p=>(
            <article className="card" key={p.id}>
              <div className="card-media">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <div className="price">₹{Math.round(p.price * 85)}</div>

                <div className="actions">
                  <button className="btn add" onClick={()=>dispatch(addToCart(p))}>Add to Cart</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible < products.length && (
          <div className="center">
            <button className="btn load" onClick={()=>setVisible(v=>v+8)}>Load More</button>
          </div>
        )}
      </section>
    </div>
  );
}

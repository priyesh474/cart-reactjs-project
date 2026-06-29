import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../features/cartSlice";

export default function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios.get(`https://fakestoreapi.com/products/${id}`)
  //     .then(res => setProduct(res.data))
  //     .catch(err => console.log(err));
  // }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
        console.log(res);
        
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
        <Link to="/products" className="back-btn">Back to Products</Link>
        <div className="product-detail">

            <div className="detail-left">
                <img src={product.image} alt={product.title} className="detail-img" />
            </div>

            <div className="detail-right">
                <h2>{product.title}</h2>
                <p className="cat">Category: {product.category}</p>
                <p className="desc">{product.description}</p>

                <div className="rating">⭐ {product.rating.rate}</div>

                <h3 className="price">Price : ₹{Math.round(product.price * 85)}</h3>

                <hr />
                <div className="detail-btn-wrap">
                  <button className="btn primary" onClick={() => dispatch(addToCart(product))} >
                      Add to Cart
                  </button>
                  <button className="btn primary del" onClick={()=>dispatch(removeItem(product.id))}>🗑 Remove</button>
                </div>
            </div>

        </div>
    </>
  );
}

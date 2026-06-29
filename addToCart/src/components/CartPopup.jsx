import { useSelector,useDispatch } from "react-redux";
import { removeItem,toggleCart,clearCart } from "../features/cartSlice";
export default function CartPopup(){
 const {items,isOpen}=useSelector(s=>s.cart);
 const dispatch=useDispatch();
 const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);

 if(!isOpen)return null;
 return(<div className="cart-popup"><div className="cart-box">
  <h3>Your Cart</h3>
  {items.map((p) => (
  <div className="cart-item" key={p.id}>
    <img src={p.image} alt="" />

    <div style={{ flex: 1 }}>
      <p>{p.title}</p>
      <p>₹{p.price}</p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={() => dispatch(decreaseQty(p.id))} style={{ padding: "4px 8px" }}>-</button>
        
        <span>{p.qty}</span>
        
        <button onClick={() => dispatch(increaseQty(p.id))} style={{ padding: "4px 8px" }}>+</button>
      </div>
    </div>

    <button onClick={() => dispatch(removeItem(p.id))}>X</button>
  </div>
))}

  <h4>Total: ₹{total.toFixed(2)}</h4>
  <button className="checkout-btn" onClick={()=>{
    alert(`🎉 Order Successful! Total Amount: ₹${total.toFixed(2)}`);
    dispatch(clearCart()); dispatch(toggleCart());
  }}>Proceed to Checkout</button>
  <button className="close-btn" onClick={()=>dispatch(toggleCart())}>Continue Shopping</button>
 </div></div>);
}
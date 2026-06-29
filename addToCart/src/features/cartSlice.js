import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false },
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload;
      const it = state.items.find(i => i.id === p.id);
      if (it) it.qty += 1;
      else state.items.push({ ...p, qty: 1 });
    },
    increaseQty: (state, action) => {
      const it = state.items.find(i => i.id === action.payload);
      if (it) it.qty += 1;
    },
    decreaseQty: (state, action) => {
      const it = state.items.find(i => i.id === action.payload);
      if (!it) return;
      if (it.qty > 1) it.qty -= 1;
      else state.items = state.items.filter(i => i.id !== action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    toggleCart: (state) => { state.isOpen = !state.isOpen; },
    clearCart: (state) => { state.items = []; }
  }
});
export const { addToCart, increaseQty, decreaseQty, removeItem, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

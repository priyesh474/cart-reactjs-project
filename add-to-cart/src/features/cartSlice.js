import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: [], 
    isOpen: false ,
    darkMode: false
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.qty = existingItem.qty + 1;
      } else {
        state.items.push({
          ...product,
          qty: 1
        });
      }
    },

    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.qty = item.qty + 1;
      }
    },

    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item.qty > 1) {
        item.qty = item.qty - 1;
      } 
      // if (!item) {
      //   return;
      // }
      // if (item.qty > 1) {
      //   item.qty = item.qty - 1;
      // } else {
      //   state.items = state.items.filter(item => item.id !== id);
      // }
    },

    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);

    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  }
});


export const { addToCart, increaseQty, decreaseQty, removeItem, toggleCart, clearCart, toggleDarkMode } = cartSlice.actions;
export default cartSlice;

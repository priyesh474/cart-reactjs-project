import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '../features/cartSlice';
import cartSlice from '../features/cartSlice';
export const store = configureStore({ 
    reducer: { 
        cart: cartSlice.reducer
    } 
});

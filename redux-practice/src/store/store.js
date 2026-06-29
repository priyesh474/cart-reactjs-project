import { configureStore } from "@reduxjs/toolkit";
import  counterReducer, { counterSlice }  from "../slice/counter/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    },
})
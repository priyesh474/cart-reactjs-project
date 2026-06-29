import { configureStore } from '@reduxjs/toolkit'
import blogSlice from '../slice/blogSlice'

export const store = configureStore({
    reducer: {
        blog : blogSlice.reducer
    }
})  

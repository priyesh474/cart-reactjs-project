import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        items: [],
        isOpen: false
    },
    reducer: {
        createBlog: (state,action) => {
            console.log(state,action)
        },
    }
})

export const {createBlog} = blogSlice.actions
export default blogSlice
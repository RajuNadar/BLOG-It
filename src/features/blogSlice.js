import { createSlice, isAction, nanoid } from "@reduxjs/toolkit";

export const initialState = {
    blogs: []
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        createBlog: (state, action) => {
            const blog = {
                tittle: action.payload,
                slug: action.payload,
                featuredImage: action.payload,
                content: action.payload,
                status: action.payload,
                userId: action.payload,
                id: nanoid()
            }
            state.blogs.push(blog)
        },
        updateBlog: (state, action) => {

        },
        removeBlog: (state, action) => {
            state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
        }
    }
})

export default blogSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getArticles } from '../../api/api.js'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page) => {
  const response = await getArticles(page)
  return response
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: null,
    error: null,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
        loading: true,
      }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        status: 'resolved',
        posts: action.payload,
        loading: false,
      }))
      .addCase(fetchPosts.rejected, (state, action) => ({
        ...state,
        status: 'rejected',
        error: action.error.message,
        loading: false,
      }))
  },
})

export const selectLoadingPosts = (state) => state.posts.loading
export const selectPosts = (state) => state.posts.posts
export default postsSlice.reducer

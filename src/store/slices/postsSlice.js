import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getArticles } from '../../api/api.js'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page, token }) => {
    const response = await getArticles(page, token)
    return response
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: null,
    error: null,
    loading: true,
    page: 1,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.page = action.payload
      sessionStorage.setItem('currentPage', action.payload)
    },
  },
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
export const selectError = (state) => state.posts.error
export const selectPage = (state) => state.posts.page
export const { setCurrentPage } = postsSlice.actions
export default postsSlice.reducer

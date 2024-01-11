/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import getArticles from '../../api/api.js'

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
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
  },
})

export const { setPosts } = postsSlice.actions
export const selectPosts = (state) => state.posts.posts
export const isLoadingPosts = (state) => state.posts.loading
export default postsSlice.reducer

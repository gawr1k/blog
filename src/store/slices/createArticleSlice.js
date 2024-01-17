/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postCreateArticle } from '../../api/api.js'

export const createArticleAsync = createAsyncThunk(
  'articles/createArticle',
  async ({ jwtToken, article }) => {
    try {
      const createdArticle = await postCreateArticle(jwtToken, article)
      return createdArticle
    } catch (error) {
      console.error('createArticle Error:', error)
      throw error
    }
  }
)

const createArticlesSlice = createSlice({
  name: 'articles',
  initialState: {
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticleAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createArticleAsync.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createArticleAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default createArticlesSlice.reducer

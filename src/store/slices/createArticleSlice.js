/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postCreateArticle } from '../../api/api.js'

export const createArticleAsync = createAsyncThunk(
  'articles/createArticle',
  async ({ jwtToken, articleData }, { rejectWithValue }) => {
    try {
      const article = await postCreateArticle(jwtToken, articleData)
      return article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    creatingArticle: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticleAsync.pending, (state) => {
        state.creatingArticle = true
        state.error = null
      })
      .addCase(createArticleAsync.fulfilled, (state) => {
        state.creatingArticle = false
      })
      .addCase(createArticleAsync.rejected, (state, action) => {
        state.creatingArticle = false
        state.error = action.payload
      })
  },
})

export default articlesSlice.reducer

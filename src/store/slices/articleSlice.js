import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getArticle } from '../../api/api.js'

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async ({ slug, token }) => {
    const response = await getArticle(slug, token)
    return response
  }
)

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {
      article: {},
    },
    loading: true,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
        loading: true,
      }))
      .addCase(fetchArticle.fulfilled, (state, action) => ({
        ...state,
        status: 'resolved',
        article: action.payload,
        loading: false,
      }))
      .addCase(fetchArticle.rejected, (state, action) => ({
        ...state,
        status: 'rejected',
        error: action.error.message,
        loading: false,
      }))
  },
})

export const selectArticle = (state) => state.article.article.article
export const selectError = (state) => state.article.error
export const selectLoadingArticle = (state) => state.article.loading

export default articleSlice.reducer

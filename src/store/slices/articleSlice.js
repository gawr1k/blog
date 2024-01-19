import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getArticle, deleteArticle } from '../../api/api.js'

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async ({ slug, token }) => {
    const response = await getArticle(slug, token)
    return response
  }
)

export const dellArticle = createAsyncThunk(
  'article/dellArticle',
  async ({ slug, token }) => {
    const response = await deleteArticle(slug, token)
    return response
  }
)

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {
      article: {
        author: {
          username: false,
        },
      },
    },
    delete: false,
    loading: true,
    status: null,
    error: null,
  },
  reducers: {
    deleteInitial: (state) => {
      state.delete = false
    },
  },
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
      .addCase(dellArticle.rejected, (state) => ({
        ...state,
        delete: true,
      }))
  },
})

export const selectArticle = (state) => state.article.article.article
export const selectError = (state) => state.article.error
export const selectDelete = (state) => state.article.delete
export const selectLoadingArticle = (state) => state.article.loading
export const { deleteInitial } = articleSlice.actions

export default articleSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import { postCreateArticle } from '../../api/api.js'

export const createArticleAsync = createAsyncThunk(
  'articles/createArticle',
  async ({ jwtToken, article }) => {
    try {
      const createdArticle = await postCreateArticle(jwtToken, article)
      return createdArticle
    } catch (error) {
      message.error('createArticle Error:', error)
      throw error
    }
  }
)

const createArticlesSlice = createSlice({
  name: 'articles',
  initialState: {
    error: null,
    loading: false,
    createdArticle: { article: false },
  },
  reducers: {
    resetState: () => ({
      error: null,
      loading: false,
      createdArticle: { article: false },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticleAsync.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
        createdArticle: false,
      }))
      .addCase(createArticleAsync.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        createdArticle: action.payload,
      }))
      .addCase(createArticleAsync.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
  },
})

export const selectLoading = (state) => state.create.loading
export const selectArticle = (state) => state.create.createdArticle.article

export const { resetState } = createArticlesSlice.actions
export default createArticlesSlice.reducer

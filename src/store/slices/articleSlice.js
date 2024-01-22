import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

import {
  getArticle,
  postFavorite,
  deleteFavorite,
  deleteArticle,
  postCreateArticle,
  updateArticle,
} from '../../api/api.js'

const initialState = {
  article: {
    author: {
      username: '',
      bio: null,
      image: '',
      following: null,
    },
    body: '',
    createdAt: '',
    description: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
    updatedAt: '',
  },
  delete: false,
  loading: false,
  status: null,
  error: null,
}

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

export const updateArticleAsync = createAsyncThunk(
  'article/updateArticleAsync',
  async ({ jwtToken, article, slug }) => {
    const response = await updateArticle(jwtToken, article, slug)
    return response
  }
)

export const addFavorite = createAsyncThunk(
  'article/addFavorite',
  async ({ slug, token }) => {
    const article = await postFavorite(slug, token)
    return article
  }
)

export const removeFavorite = createAsyncThunk(
  'article/removeFavorite',
  async ({ slug, token }) => {
    const article = await deleteFavorite(slug, token)
    return article
  }
)

export const createArticleAsync = createAsyncThunk(
  'article/createArticleAsync',
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

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    deleteInitial: (state) => ({
      ...state,
      delete: false,
    }),
    resetZeroArticleState: () => initialState,
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
        article: action.payload.article,
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
      .addCase(updateArticleAsync.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
        loading: true,
      }))
      .addCase(updateArticleAsync.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        article: action.payload,
        loading: false,
      }))
      .addCase(updateArticleAsync.rejected, (state, action) => ({
        ...state,
        status: 'rejected',
        error: action.error.message,
        loading: false,
      }))
      .addCase(addFavorite.fulfilled, (state, action) => ({
        ...state,
        article: action.payload,
      }))
      .addCase(removeFavorite.fulfilled, (state, action) => ({
        ...state,
        article: action.payload,
      }))
      .addCase(createArticleAsync.pending, (state) => ({
        ...state,
        status: 'loading',
        loading: true,
        error: null,
        createdArticle: false,
      }))
      .addCase(createArticleAsync.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        loading: false,
        article: action.payload.article,
      }))
      .addCase(createArticleAsync.rejected, (state, action) => ({
        ...state,
        status: 'rejected',
        loading: false,
        error: action.payload,
      }))
  },
})

export const selectArticle = (state) => state.article.article
export const selectSlugArticle = (state) => state.article.article.slug
export const selectError = (state) => state.article.error
export const selectStatusArticle = (state) => state.article.status
export const selectDelete = (state) => state.article.delete
export const selectLoadingArticle = (state) => state.article.loading
export const { deleteInitial, resetZeroArticleState } = articleSlice.actions

export default articleSlice.reducer

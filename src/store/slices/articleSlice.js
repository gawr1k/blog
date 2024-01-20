import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  getArticle,
  deleteArticle,
  updateArticle,
  postFavorite,
  deleteFavorite,
} from '../../api/api.js'

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
  'article/reductionArticle',
  async ({ slug, articleData, token }) => {
    const response = await updateArticle(slug, articleData, token)
    return response
  }
)

export const addFavorite = createAsyncThunk(
  'likes/addFavorite',
  async ({ slug, token }) => {
    const article = await postFavorite(slug, token)
    return article
  }
)

export const removeFavorite = createAsyncThunk(
  'likes/removeFavorite',
  async ({ slug, token }) => {
    const article = await deleteFavorite(slug, token)
    return article
  }
)

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {
      article: {
        author: {
          username: null,
          bio: null,
          image: null,
          following: null,
        },
        body: null,
        createdAt: null,
        description: null,
        favorited: null,
        favoritesCount: null,
        slug: null,
        tagList: null,
        title: null,
        updatedAt: null,
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
      .addCase(updateArticleAsync.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
        loading: true,
      }))
      .addCase(updateArticleAsync.fulfilled, (state, action) => ({
        ...state,
        status: 'resolved',
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
  },
})

export const selectArticle = (state) => state.article.article.article
export const selectError = (state) => state.article.error
export const selectDelete = (state) => state.article.delete
export const selectLoadingArticle = (state) => state.article.loading
export const { deleteInitial } = articleSlice.actions

export default articleSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postFavorite, deleteFavorite } from '../../api/api.js'

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

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default likesSlice.reducer
export const { selectLikedArticles } = likesSlice.actions
export const selectLike = (state) => state.likes.article

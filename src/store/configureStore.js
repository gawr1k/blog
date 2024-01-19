import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './slices/postsSlice.js'
import articleSlice from './slices/articleSlice.js'
import loginSlice from './slices/loginSlice.js'
import profileSlice from './slices/profileSlice.js'
import createArticlesSlice from './slices/createArticleSlice.js'
import likesSlice from './slices/likesSlice.js'

export default configureStore({
  reducer: {
    posts: postsReducer,
    article: articleSlice,
    user: loginSlice,
    profile: profileSlice,
    create: createArticlesSlice,
    likes: likesSlice,
  },
})

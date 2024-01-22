import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './slices/postsSlice.js'
import articleSlice from './slices/articleSlice.js'
import loginSlice from './slices/loginSlice.js'

export default configureStore({
  reducer: {
    posts: postsReducer,
    article: articleSlice,
    user: loginSlice,
  },
})

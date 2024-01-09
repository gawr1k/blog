/* eslint-disable import/extensions */
import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './slices/postsSlice.js'

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
})

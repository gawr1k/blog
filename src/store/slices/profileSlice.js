/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { putUserProfile } from '../../api/api.js'

const initialState = {
  user: null,
  status: 'idle',
  error: null,
}

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (userData) => {
    const response = await putUserProfile(userData)
    return response.user
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [editProfile.pending]: (state) => {
      state.status = 'loading'
    },
    [editProfile.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload
    },
    [editProfile.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export default profileSlice.reducer

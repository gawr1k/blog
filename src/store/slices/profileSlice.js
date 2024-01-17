import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import { putUserProfile } from '../../api/api.js'

const initialState = {
  user: null,
  status: 'idle',
  error: null,
}
export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (userData) => {
    try {
      const response = await putUserProfile(userData)
      message.success('Profile updated successfully!')
      return response.user
    } catch (error) {
      console.error('editProfile Error:', error)
      message.error('Failed to update profile. Please try again.')
      throw error
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(editProfile.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        user: action.payload,
      }))
      .addCase(editProfile.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})

export default profileSlice.reducer

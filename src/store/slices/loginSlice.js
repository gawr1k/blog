import { message } from 'antd'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  postLoginUser,
  postRegisterUser,
  getProfile,
  putUserProfile,
} from '../../api/api.js'

const initialState = {
  user: {
    email: null,
    token: null,
    username: null,
    image: null,
  },
  status: 'idle',
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) => {
    try {
      const user = await postLoginUser(email, password)
      return user
    } catch (error) {
      message.error('Failed to log in. Please try again.')
      throw error
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData) => {
    const response = await postRegisterUser(userData)
    return response
  }
)

export const fetchGetProfile = createAsyncThunk(
  'user/fetchGetProfile',
  async ({ username, token }) => {
    const response = await getProfile(username, token)
    return response
  }
)

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async (userData) => {
    try {
      const response = await putUserProfile(userData)
      message.success('Profile updated successfully!')
      return response.user
    } catch (error) {
      message.error('Failed to update profile. Please try again.')
      throw error
    }
  }
)

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = {
        email: null,
        token: null,
        username: null,
      }
      localStorage.removeItem('user')
    },
    setLoginUser: (state, action) => {
      const { email, token, username, image } = action.payload
      state.user = {
        email: email || null,
        token: token || null,
        username: username || null,
        image: image || null,
      }
      state.status = 'succeeded'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload
        localStorage.setItem('user', JSON.stringify(user))
        return {
          ...state,
          status: 'succeeded',
          user: action.payload.user,
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        const { error } = action
        if (error.response) {
          const { status, data } = error.response

          return {
            ...state,
            status: 'failed',
            error: {
              status,
              message: data.message,
            },
          }
        }
        return {
          ...state,
          status: 'failed',
          error: error.message,
        }
      })
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload
        localStorage.setItem('user', JSON.stringify(user))
        return {
          ...state,
          status: 'succeeded',
          user: action.payload.user,
        }
      })
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchGetProfile.fulfilled, (state, action) => {
        const { image } = action.payload
        return {
          ...state,
          user: {
            ...state.user,
            image,
          },
          status: 'succeeded',
          error: action.error ? action.error.message : null,
        }
      })
      .addCase(editProfile.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(editProfile.fulfilled, (state, action) => {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(action.payload))
        return {
          ...state,
          status: 'succeeded',
          user: action.payload,
        }
      })
      .addCase(editProfile.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})
export const selectToken = (state) => state.user.user.token
export const selectStatus = (state) => state.user.status
export const { logoutUser, setLoginUser } = loginSlice.actions
export default loginSlice.reducer

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
    const user = await postLoginUser(email, password)
    return user
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
  async ({ token }) => {
    const response = await getProfile(token)
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
      localStorage.removeItem('token')
      return {
        ...state,
        user: {
          email: null,
          token: null,
          username: null,
          image: null,
        },
      }
    },
    setLoginUser: (state, action) => ({
      ...state,
      user: {
        email: null,
        token: action.payload,
        username: null,
        image: null,
      },
      status: 'succeeded',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token } = action.payload.user
        localStorage.setItem('token', token)
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
        const { token } = action.payload.user
        localStorage.setItem('token', token)
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
      .addCase(fetchGetProfile.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        status: 'succeeded',
        error: action.error ? action.error.message : null,
      }))
      .addCase(editProfile.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(editProfile.fulfilled, (state, action) => {
        localStorage.removeItem('token')
        const { token } = action.payload
        localStorage.setItem('token', token)
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
export const selectImageUser = (state) => state.user.user.image
export const selectEmail = (state) => state.user.user.email
export const selectToken = (state) => state.user.user.token
export const selectUserName = (state) => state.user.user.username
export const selectStatus = (state) => state.user.status
export const { logoutUser, setLoginUser } = loginSlice.actions
export default loginSlice.reducer

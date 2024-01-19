import { message } from 'antd'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postLoginUser, postRegisterUser, getProfile } from '../../api/api.js'

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
  'user/login',
  async ({ email, password }) => {
    try {
      const user = await postLoginUser(email, password)
      console.log(user)
      return user
    } catch (error) {
      message.error('Failed to log in. Please try again.')
      throw error
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await postRegisterUser(userData)
    console.log(response)
    return response
  }
)

export const fetchGetProfile = createAsyncThunk(
  'article/dellArticle',
  async ({ username, token }) => {
    const response = await getProfile(username, token)
    return response
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
        // console.log(action.payload)

        const { image } = action.payload
        // console.log(action.payload)
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
  },
})
export const selectToken = (state) => state.user.user.token
export const selectStatus = (state) => state.user.status
export const { logoutUser, setLoginUser } = loginSlice.actions
export default loginSlice.reducer

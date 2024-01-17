/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postLoginUser, postRegisterUser } from '../../api/api.js'

const initialState = {
  user: {
    email: null,
    token: null,
    username: null,
  },
  status: 'idle',
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const user = await postLoginUser(email, password)
    console.log(user)
    return user
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
      const { email, token, username } = action.payload
      state.user = {
        email: email || null,
        token: token || null,
        username: username || null,
      }
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
        console.log(action.payload)
        console.log(JSON.stringify(user))
        localStorage.setItem('user', JSON.stringify(user))
        return {
          ...state,
          status: 'succeeded',
          user: action.payload.user,
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        const { status, data } = action.payload.response
        return {
          ...state,
          status: 'failed',
          error: {
            status,
            message: data.message,
          },
        }
      })
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload
        console.log(action.payload)
        console.log(JSON.stringify())
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
  },
})

export const selectToken = (state) => state.user.user.token
export const { logoutUser, setLoginUser } = loginSlice.actions
export default loginSlice.reducer

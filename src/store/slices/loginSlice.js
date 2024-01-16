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
    return user
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await postRegisterUser(userData)
    return response.user
  }
)

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => ({
      ...state,
      user: {
        ...state.user,
        email: null,
        token: null,
        username: null,
      },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        user: action.payload.user,
      }))
      .addCase(loginUser.rejected, (state, action) => {
        const { status, data } = action.payload.response // Получаем статус и данные из ответа
        return {
          ...state,
          status: 'failed',
          error: {
            status,
            message: data.message, // Передаем сообщение об ошибке из ответа
          },
        }
      })
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))

      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        user: action.payload,
      }))

      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
  },
})

export const selectToken = (state) => state.user.user.token
export const { logoutUser } = loginSlice.actions
export default loginSlice.reducer

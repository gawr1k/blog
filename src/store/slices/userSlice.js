import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postLoginUser } from '../../api/api.js'

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
const userSlice = createSlice({
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
  },
})

export const selectToken = (state) => state.user.user.token
export const { logoutUser } = userSlice.actions
export default userSlice.reducer

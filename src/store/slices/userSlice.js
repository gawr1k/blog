import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  token: null,
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
      }
    },
    removeUser(state) {
      return {
        ...state,
        email: null,
        token: null,
        id: null,
      }
    },
  },
})

export const { setUsers, removeUser } = userSlice.actions
export default userSlice.reducer

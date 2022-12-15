import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthModel = {}

export const slice = createSlice({
  name: 'authRedux',
  initialState,
  reducers: {
    SaveAuthRedux: (state, action: PayloadAction<AuthModel>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    ClearAuthRedux: (state) => {
      state.token = undefined
      state.user = undefined
    },
    UpdateUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { SaveAuthRedux, ClearAuthRedux, UpdateUser } = slice.actions

export default slice.reducer

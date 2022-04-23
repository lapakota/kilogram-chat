import  User  from "../../models/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initState: User = {
  login: "",
  meta: [],
  name: "",
}

export const userSlice = createSlice({
  extraReducers: undefined,
  initialState: initState,
  name: "user",
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },
  },
})

export const { login } = userSlice.caseReducers

export default userSlice.reducer

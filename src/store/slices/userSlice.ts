import User from "../../models/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { stat } from "fs"

const initState: User = {
  login: "",
  meta: [],
  name: "",
  image: "",
}

export const userSlice = createSlice({
  extraReducers: undefined,
  initialState: initState,
  name: "user",
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },
    changeImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const { login, changeImage, changeName } = userSlice.caseReducers

export default userSlice.reducer

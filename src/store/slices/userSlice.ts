import BaseUser from "../../models/BaseUser"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import User from "../../models/User"

const initState: User = {
  activeChat: 0,
  login: "",
  meta: [],
  name: "",
  image: "",
  token: "",
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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    changeChat: (state, action: PayloadAction<number>) => {
      state.activeChat = action.payload
    },
  },
})

export const { login, changeImage, changeName, setToken, changeChat } =
  userSlice.actions

export default userSlice.reducer

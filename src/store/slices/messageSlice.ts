import Message from "../../models/Message"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import User from "../../models/User"

const user: User = {
  login: "",
  meta: [],
  name: "",
  token: "",
}
const initState: Message = {
  createdAt: "",
  id: "",
  meta: [],
  text: "",
  createdBy: user,
}

export const messageSlice = createSlice({
  extraReducers: undefined,
  initialState: initState,
  name: "message",
  reducers: {
    changeText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const { changeText } = messageSlice.actions

export default messageSlice.reducer

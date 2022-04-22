import { Message } from "../../models/Message"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initState: Message = {
  createdAt: "",
  id: "",
  meta: [],
  text: "",
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

export const { changeText } = messageSlice.caseReducers

export default messageSlice.reducer

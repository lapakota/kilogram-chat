import { Message } from "../../models/Message"
import { createSlice } from "@reduxjs/toolkit"

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
  reducers: {},
})

export const {} = messageSlice.caseReducers

export default messageSlice.reducer

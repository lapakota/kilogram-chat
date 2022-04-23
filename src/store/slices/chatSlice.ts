import  Chat  from "../../models/Chat"
import  User  from "../../models/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import  Message  from "../../models/Message"

const user: User = {
  login: "",
  meta: [],
  name: "",
}
const initialState: Chat = {
  id: "",
  members: [],
  messages: [],
  meta: [],
  name: "",
  owner: user,
  type: "",
}

export const chatSlice = createSlice({
  extraReducers: undefined,
  initialState: initialState,
  name: "chat",
  reducers: {
    // deleteMessage: (state, action: PayloadAction<string>) => {},
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
  },
})

export const { addMessage } = chatSlice.caseReducers

export default chatSlice.reducer

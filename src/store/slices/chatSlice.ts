import Chat from "../../models/Chat"
import User from "../../models/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Message from "../../models/Message"

const user: User = {
  login: "",
  meta: [],
  name: "",
  token: "",
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
    deleteMessage: (state, action: PayloadAction<Message>) => {
      state.messages.filter((message) => message.id !== action.payload.id)
    },
    addMessageId: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setChat: (state, action: PayloadAction<Chat>) => {
      state.messages = action.payload.messages
      state.id = action.payload.id
      state.name = action.payload.name
      state.image = action.payload.image
      state.meta = action.payload.meta
      state.members = action.payload.members
      state.owner = action.payload.owner
      state.type = action.payload.type
    },
  },
})

export const { addMessageId, deleteMessage, setChat } = chatSlice.actions

export default chatSlice.reducer

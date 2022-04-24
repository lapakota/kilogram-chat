import Chat from "../../models/Chat"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initState: { chats: Chat[] } = {
  chats: [],
}

export const chatsSlice = createSlice({
  extraReducers: undefined,
  initialState: initState,
  name: "chats",
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload)
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats.filter((x) => x.id !== action.payload)
    },
  },
})

export const { setChats, addChat } = chatsSlice.actions

export default chatsSlice.reducer

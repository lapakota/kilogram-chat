import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import chatReducer from "./slices/chatSlice"
import chatsReducer from "./slices/chatsSlice"
import usersReducer from "./slices/usersSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    chats: chatsReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

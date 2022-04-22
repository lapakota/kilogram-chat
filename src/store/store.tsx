import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import messageReducer from "./slices/messageSlice"
import chatReducer from "./slices/chatSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    chat: chatReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

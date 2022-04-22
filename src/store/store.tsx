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
//TODO Сделать юзеров и сообения через ссылки по id логинам
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

import { configureStore } from "@reduxjs/toolkit"

export const mainStore = configureStore({
  reducer: {},
})

export type RootState = ReturnType<typeof mainStore.getState>

export type AppDispatch = typeof mainStore.dispatch

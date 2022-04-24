import BaseUser from "../../models/BaseUser"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initState: { users: BaseUser[] } = {
  users: [],
}

export const usersSlice = createSlice({
  extraReducers: undefined,
  initialState: initState,
  name: "users",
  reducers: {
    setUsers: (state, action: PayloadAction<BaseUser[]>) => {
      state.users = action.payload
    },
  },
})
export const { setUsers } = usersSlice.actions

export default usersSlice.reducer

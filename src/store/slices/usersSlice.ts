import User from "../../models/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initState: { users: User[] } = {
  users: [],
}

export const usersSlice = createSlice({
  extraReducers: undefined,
  initialState: initState,
  name: "users",
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
  },
})
export const { setUsers } = usersSlice.actions

export default usersSlice.reducer

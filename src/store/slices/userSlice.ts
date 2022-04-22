import { User } from "../../models/User"
import { createSlice } from "@reduxjs/toolkit"

const initState: User = {
  login: "",
  meta: [],
  name: "",
}

export const userSlice = createSlice({
  extraReducers: undefined,
  initialState: initState,
  name: "user",
  reducers: {},
})

export const {} = userSlice.caseReducers

export default userSlice.reducer

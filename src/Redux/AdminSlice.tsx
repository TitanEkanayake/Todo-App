import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  userObj: any | null; // Replace 'any' with the actual type of userObj if possible
}

const initialState: UserState = {
  userId: null,
  userObj: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setUserObj(state, action: PayloadAction<any>) {
      state.userObj = action.payload;
    },
    logoutUser(state) {
      state.userId = null;
      state.userObj = null;
    },
  },
});

export const { setUserId, setUserObj, logoutUser } = userSlice.actions;
export const selectUserId = (state: { userIdReducer: UserState }) =>
  state.userIdReducer.userId;
export const selectUserObj = (state: { userIdReducer: UserState }) =>
  state.userIdReducer.userObj;

export default userSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Slices, type UserState } from "../types/ReduxData";

const initialState: UserState = {
    user: localStorage.getItem("user") || "",
    token: localStorage.getItem("token") || "",
    awards: [],
};

export const userSlice = createSlice({
    name: Slices.user,
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setAward: (state, action: PayloadAction<any>) => {
            if (!state.awards) state.awards = [];
            state.awards.push(action.payload);
        },
        setAwards: (state, action: PayloadAction<any[]>) => {
            state.awards = action.payload;
        },
    },
});

export const { setUser, setAward, setAwards } = userSlice.actions;

export default userSlice.reducer;

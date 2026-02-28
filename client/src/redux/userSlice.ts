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
            localStorage.setItem("user", action.payload.user);
            localStorage.setItem("token", action.payload.token);
        },
        clearUser: (state) => {
            state.user = "";
            state.token = "";
            localStorage.removeItem("user");
            localStorage.removeItem("token");
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

export const { setUser, clearUser, setAward, setAwards } = userSlice.actions;

export default userSlice.reducer;

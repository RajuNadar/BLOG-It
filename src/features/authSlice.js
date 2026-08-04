// to check is it user or not

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    status: false,
    userData: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
             state.status = true;
             state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer
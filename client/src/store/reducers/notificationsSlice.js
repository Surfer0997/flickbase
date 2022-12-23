import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    global: {}
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        errorGlobal:(state, action) => {
            state.global.error = true;
            state.global.msg = action.payload;
        },
        successGlobal: (state,action) => {
            state.global.success = true;
            state.global.msg = action.payload;
        },
        clearNotifications: (state) => {
            state.global = {};
        }
    }
});

export const {errorGlobal, successGlobal, clearNotifications} = notificationsSlice.actions;
export default notificationsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"; // this slice is for storing data about our site

const initialState = {
    layout: ''
}

export const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        setLayout:(state,action)=>{
            state.layout = action.payload;
        }
    }
});

export const {setLayout} = siteSlice.actions;
export default siteSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import {
  articleLike,
  changeEmail,
  isAuth,
  registerUser,
  signInUser,
  signOut,
  updateUserProfile,
} from '../actions/usersThunk';

const DEFAULT_USER_STATE = {
  loading: false,
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    age: null,
    roles: null,
    verified: null,
    likedArticles: null,
  },
  auth: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: DEFAULT_USER_STATE,
  reducers: {
    setVerify: state => {
      state.data.verified = true;
    },
  },
  extraReducers: builder => {
    builder
      // REGISTER
      .addCase(registerUser.pending, state => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(registerUser.rejected, state => {
        state.loading = false;
      })
      // SIGN IN
      .addCase(signInUser.pending, state => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(signInUser.rejected, state => {
        state.loading = false;
      })
      // IS AUTHENTICATED
      .addCase(isAuth.pending, state => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload.data };
        state.auth = action.payload.auth;
      })
      .addCase(isAuth.rejected, state => {
        state.loading = false;
      })
      // SIGNING OUT
      .addCase(signOut.fulfilled, state => {
        state.data = DEFAULT_USER_STATE.data;
        state.auth = false; // if to null, causes loop problem
      })
      // UPDATING PROFILE
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
      })
      // UPDATING EMAIL
      .addCase(changeEmail.pending, state => {
        state.loading = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(changeEmail.rejected, state => {
        state.loading = false;
      })
      // ADD LIKED ARTICLE
      .addCase(articleLike.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.likedArticles = [...action.payload];
        }
      });
  },
});

export const { setVerify } = usersSlice.actions;
export default usersSlice.reducer;

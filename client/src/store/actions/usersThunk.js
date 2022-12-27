import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader, removeTokenFromCookie } from '../../utils/tools';
import { errorGlobal, successGlobal } from '../reducers/notificationsSlice';
import { setVerify } from '../reducers/usersSlice';

export const registerUser = createAsyncThunk('users/registerUser', async ({ email, password }, { dispatch }) => {
  // dispatch from Thunk API object
  try {
    const request = await axios.post(`/api/auth/register`, {
      email,
      password,
    });

    dispatch(successGlobal('Welcome, check your email to validate account'));

    return { data: request.data.user, auth: true }; // our user slice need it
  } catch (error) {
    // from the server we have custom error message kind like {status: 'error', statusCode: 400, message: '...'}
    dispatch(errorGlobal(error.response.data.message)); // here it stores in axios
    throw error;
  }
});

export const signInUser = createAsyncThunk('users/signInUser', async ({ email, password }, { dispatch }) => {
  // dispatch from Thunk API object
  try {
    const request = await axios.post(`/api/auth/signin`, {
      email,
      password,
    });
    if (!request.data.user) throw Error();
    dispatch(successGlobal('Welcome, check your email to validate account'));
    return { data: request.data.user, auth: true }; // our user slice need it
  } catch (error) {
    dispatch(errorGlobal(error.response.data.message));
    throw error;
  }
});

export const isAuth = createAsyncThunk('users/isAuth', async () => {
  try {
    const request = await axios.get('/api/auth/isauth', getAuthHeader());
    return { data: request.data, auth: true }; // user
  } catch (error) {
    return { data: {}, auth: false }; // user
  }
});

export const signOut = createAsyncThunk('users/signOut', async () => {
  removeTokenFromCookie();
});

export const updateUserProfile = createAsyncThunk('users/updateuserProfile', async (data, { dispatch }) => {
  try {
    const profile = await axios.patch(`/api/users/profile`, data, getAuthHeader());
    dispatch(successGlobal('Profile updated!'));

    return { // returning this to exptra reducers
      firstname: profile.data.firstname,
      lastname: profile.data.lastname,
      age: profile.data.age,
    };
  } catch (error) {
    dispatch(errorGlobal(error.response.data.message));
    throw error;
  }
});


export const changeEmail = createAsyncThunk(
  'users/changeEmail',
   async(data, {dispatch})=>{
    try {
      const request = await axios.patch('/api/users/email', {newEmail: data.newEmail}, getAuthHeader());
      dispatch(successGlobal('Updated!'));
      return { // passing to reducers to update state, and send new letter to verify
        email: request.data.user.email,
        verified: false
      }
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
   }
);

export const accountVerify = createAsyncThunk(
  'users/accountVerify',
   async(token, {dispatch, getState})=>{
    try {
      const isUserAuthed = getState().users.auth;
      await axios.get(`/api/users/verifyEmail?validation=${token}`);

      if (isUserAuthed) {
        dispatch(setVerify())
      }

      dispatch(successGlobal('Verified!'));
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
   }
);

export const articleLike = createAsyncThunk(
  'users/articleLike',
   async(articleId, {dispatch, getState})=>{
    try {
      const state = getState();
      if (state.users.auth) {
        const oldLikes = state.users.data.likedArticles;
        if (oldLikes.includes(articleId)) {
          // delete
          const newLikedArticles = oldLikes.filter(article=>article!==articleId);
          const likedArticles = await axios.patch(`/api/users/likes`, {articles:newLikedArticles}, getAuthHeader());
          return likedArticles.data;
        } else {
          // add
          const likedArticles = await axios.post(`/api/users/likes`, {articleId}, getAuthHeader());
          return likedArticles.data;
        } 
      } else {
        dispatch(errorGlobal('Authorize to add favourite articles'));
        // test
      }
     
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
   }
)
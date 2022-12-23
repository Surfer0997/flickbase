import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '../../utils/tools';
import { errorGlobal, successGlobal } from '../reducers/notificationsSlice';

export const addArticle = createAsyncThunk('articles/addArticle', async (article, { dispatch }) => {
  try {
    const request = await axios.post('/api/articles/', article, getAuthHeader());
    dispatch(successGlobal('Post successfully added!'));
    return request.data;
  } catch (error) {
    dispatch(errorGlobal(error.response.data.message)); // here it stores in axios
    throw error;
  }
});

export const getAdminArticle = createAsyncThunk(
  // we don't want to store this in redux state, so we don't use extraReducers
  'articles/getAdminArticle',
  async (_id, { dispatch }) => {
    try {
      const request = await axios.get(`/api/articles/article/${_id}`, getAuthHeader());

      return request.data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message)); // here it stores in axios
      throw error;
    }
  }
);

export const updateArticle = createAsyncThunk('articles/updateArticle', async ({ values, articleId }, { dispatch }) => {
  try {
    await axios.patch(`/api/articles/article/${articleId}`, values, getAuthHeader());
    dispatch(successGlobal('Updated!'));
    return true;
  } catch (error) {
    dispatch(errorGlobal(error.response.data.message)); // here it stores in axios
    throw error;
  }
});

export const getPaginateArticles = createAsyncThunk(
  'articles/getPaginateArticles',
  async ({ page = 1, limit = 5, keywords = '' }, { dispatch }) => {
    try {
      const request = await axios.post('/api/articles/admin/paginate', { page, limit, keywords }, getAuthHeader());
      return request.data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message)); // here error stored in axios
      throw error;
    }
  }
);

export const changeArticleStatus = createAsyncThunk(
    'articles/changeArticleStatus',
    async ({ newStatus, _id }, { dispatch, getState }) => {
      try {
        const request = await axios.patch(`/api/articles/article/${_id}`, {status: newStatus}, getAuthHeader());
        // work but we don't display it in frontend -> new request to get all articles || update locally what we need
        const article = request.data;
        //// previous state
        const prevState = getState().articles.adminArticles.docs;
        /// find & update
        const position = prevState.findIndex(article => article._id === _id);
        // we cannot mutate prevState directly -> make a copy
        const newState = [...prevState];
        newState[position] = article;
        dispatch(successGlobal('Status changed!'));
        return newState;
      } catch (error) {
        dispatch(errorGlobal(error.response.data.message));
        throw error;
      }
    }
  );

  export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async ({_id }, { dispatch, getState }) => {
      try {
        await axios.delete(`/api/articles/article/${_id}`, getAuthHeader());
        dispatch(successGlobal('Deleted!'));
        // update frontend by refecthing DB
        const page = getState().articles.adminArticles.page;
        dispatch(getPaginateArticles({page}));

        return true;
      } catch (error) {
        dispatch(errorGlobal(error.response.data.message)); // here error stored in axios
        throw error;
      }
    }
  );

  export const homePageLoadMore = createAsyncThunk(
    'articles/homePageLoadMore',
    async (sort, { dispatch, getState }) => {
      try {
        const articles = await axios.post('/api/articles/all', sort); // no auth needed

        const state = getState().articles.articles; // we get not 4, then 8, then 12, but 4, then next 4, then next 4
        const prevState = [...state];
        const newState = [...prevState, ...articles.data];

        return {newState, sort}
      } catch (error) {
        dispatch(errorGlobal(error.response.data.message)); // here error stored in axios
        throw error;
      }
    }
  );

  export const getArticle = createAsyncThunk(
    'articles/getArticle',
    async (id, { dispatch }) => {
      try {
        const request = await axios.get(`/api/articles/users/article/${id}`);
        return request.data;
      } catch (error) {
        dispatch(errorGlobal(error.response.data.message)); // here error stored in axios
        throw error;
      }
    }
  );
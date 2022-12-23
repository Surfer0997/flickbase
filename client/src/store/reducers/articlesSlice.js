import { createSlice } from '@reduxjs/toolkit';
import { addArticle, changeArticleStatus, getArticle, getPaginateArticles, homePageLoadMore } from '../actions/articlesThunk';

const initialState = {
  homeSort: {
    sortby: '_id',
    order: 'asc',
    limit: 4,
    skip: 0,
  },
  loading: false,
  articles: [],
  current: null,
  adminArticles: {},
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearCurrentArticle: (state) => {
        state.current = null;
    }
  },
  extraReducers: builder => {
    builder
      // ADD ARTICLE
      .addCase(addArticle.pending, state => {
        state.loading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.lastAdded = action.payload; // Необаязательно и вообще не надо так, ребята
      })
      .addCase(addArticle.rejected, state => {
        state.loading = false;
      })
      // GET PAGINATE ARTICLES
      .addCase(getPaginateArticles.pending, state => {
        state.loading = true;
      })
      .addCase(getPaginateArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.adminArticles = action.payload;
      })
      .addCase(getPaginateArticles.rejected, state => {
        state.loading = false;
      })
      // CHANGE ARTICLE STATUS
      .addCase(changeArticleStatus.fulfilled, (state, action) => {
        state.adminArticles.docs = action.payload;
      })
      // HOMEPAGE LOAD MORE

      //  .addCase(homePageLoadMore.pending, (state)=>{state.loading = true}) // NOT USED STILL
      .addCase(homePageLoadMore.fulfilled, (state, action) => {
        state.articles = action.payload.newState;
        state.homeSort.skip = action.payload.sort.skip;
      })
    //  .addCase(homePageLoadMore.rejected, (state)=>{state.loading = false}) // NOT USED STILL
    // GET ARTICLE
    .addCase(getArticle.pending, state => {
        state.loading = true;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getArticle.rejected, state => {
        state.loading = false;
      })
  },
});
export const {clearCurrentArticle} = articlesSlice.actions;
export default articlesSlice.reducer;

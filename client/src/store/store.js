import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
import articlesReducer from "./reducers/articlesSlice";
import notificationsReducer from "./reducers/notificationsSlice";
import siteReducer from './reducers/siteSlice';

const store = configureStore({
    reducer: {
        users: usersReducer,
        articles: articlesReducer,
        notifications: notificationsReducer,
        site: siteReducer
    }
});

export default store;
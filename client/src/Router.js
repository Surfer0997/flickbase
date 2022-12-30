import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AccountVerify from './components/Auth/AccountVerify';
import Auth from './components/Auth/Auth';
import { Background } from './components/Background/Background';
import AdminArticles from './components/Dashboard/Articles/AdminArticles';
import AddArticle from './components/Dashboard/Articles/Edit_AddArticles/AddArticle';
import EditArticle from './components/Dashboard/Articles/Edit_AddArticles/EditArticle';
import AdminCategories from './components/Dashboard/Categories/AdminCategories';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardMain from './components/Dashboard/Main/DashboardMain';
import AdminProfile from './components/Dashboard/Profile/AdminProfile';
import Article from './components/Home/Article';
import Home from './components/Home/Home';
import Header from './components/Navigation/Header';
import AuthGuard from './HOC/AuthGuard';
import MainLayout from './HOC/MainLayout';
import { isAuth } from './store/actions/usersThunk';
import { Loader } from './utils/tools';
import './components/Background/Background.css';
import Contacts from './components/Contacts/Contacts';

const Router = () => {
  const [loading, setLoading] = useState(true); // so show content only after auto auth check
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      <Background />
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verification" element={<AccountVerify />} />
            <Route path="/articles/article/:id" element={<Article />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            >
              <Route index element={<DashboardMain />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="articles/add" element={<AddArticle />} />
              <Route path="articles/edit/:articleId" element={<EditArticle />} />
              <Route path="categories" element={<AdminCategories />} />
            </Route>
          </Routes>
        </MainLayout>
      )}
    </BrowserRouter>
  );
};

export default Router;

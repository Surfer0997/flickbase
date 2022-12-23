import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from '../../store/actions/usersThunk';
import { clearNotifications } from '../../store/reducers/notificationsSlice';
import { setLayout } from '../../store/reducers/siteSlice';
import { showToast } from '../../utils/tools';
import SideDrawer from './SideNavigation';

const Header = () => {
  const users = useSelector(state=>state.users);
  const notifications = useSelector(state=>state.notifications);
  const site = useSelector(state=>state.site);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
   // const pathname = location.pathname; // http://localhost:3000/dashboard/articles
   const pathname = location.pathname.split('/'); //pathname[1] -> dashboard

   if (pathname[1] === 'dashboard') {
    dispatch(setLayout('dash_layout')) // dashboard layout
   } else {
    dispatch(setLayout('')) // default layout
   }

  }, [location.pathname, dispatch])

  useEffect(()=>{
    const {global} = notifications;
    
    if(notifications && global.error) {
      const msg = global.msg ? global.msg : 'Error';
      showToast('ERROR', msg);
      dispatch(clearNotifications())
    }
    if(notifications && global.success) {
      const msg = global.msg ? global.msg : 'Good!';
      showToast('SUCCESS', msg);
      dispatch(clearNotifications())
    }
    
  }, [notifications, dispatch]);

  const signOutUser = () => {
    dispatch(signOut());
    navigate('/');
  }

  return (
    <>
    {!users.data.verified && users.auth && <div className='not_verified'>Not verified</div>}
    <nav className={`navbar fixed-top ${site.layout}`}>
      <Link to="/" className="navbar-brand d-flex align-items-center fredoka_ff">
        Flickbase
      </Link>
      <SideDrawer user={users} signOutUser={signOutUser}/>
    </nav>
    </>
  );
};

export default Header;
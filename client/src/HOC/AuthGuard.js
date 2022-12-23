import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


const AuthGuard = (props) => {
    // BETTER MAKE A REQUEST TO SERVER TO CHECK TOKEN AGAIN, here we can manually change in redux dev tools user.auth and get an access
    const users = useSelector(state=>state.users);
    const location = useLocation();

    if (!users.auth) {
        return <Navigate to='/auth' state={{from:location}} replace/>
    }


    return props.children;
}

export default AuthGuard;
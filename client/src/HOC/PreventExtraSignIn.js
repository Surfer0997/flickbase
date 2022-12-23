import { Navigate, useLocation } from "react-router-dom";


const PreventExtraSignIn = (props) => {
    // BETTER MAKE A REQUEST TO SERVER TO CHECK TOKEN AGAIN, here we can manually change in redux dev tools user.auth and get an access
    const location = useLocation();

    return (
        <>
        {props.users.auth ?
            <Navigate to='/dashboard' state={{from:location}} replace/>
            :
            props.children
        }
        </>
    )

}

export default PreventExtraSignIn;
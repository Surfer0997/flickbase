import { AdminTitle } from "../../../utils/tools";
import AuthProfile from "./AuthProfile";
import UserProfile from "./UserProfile";

const AdminProfile = () => {
    return (
        
        <><AdminTitle title="Profile"/>
        <AuthProfile/>
        <UserProfile/></>
    )
}

export default AdminProfile;
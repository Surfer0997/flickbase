import { Outlet } from "react-router-dom";
import AdminLayout from "../../HOC/AdminLayout";

const Dashboard = () => {
    return (
        <AdminLayout>
            <Outlet/>
        </AdminLayout>
    )
}

export default Dashboard;
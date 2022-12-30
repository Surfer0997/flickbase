// just to apply some styles to all main layout (as margin-top to be visible under header) + toasts

import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {
    const layout = useSelector(state=>state.site.layout); // 'dash_layout' | ''
    return (
        <Container className={`app_container mb-5 ${layout}`}>
            {props.children}
            <ToastContainer/>
        </Container>
    )
}

export default MainLayout;
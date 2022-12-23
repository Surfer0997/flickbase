import CircularProgress from '@mui/material/CircularProgress';
import {toast} from 'react-toastify';
import cookie from 'react-cookies';

export const errorHelper = (formik, values) => ({
  // MUI wants errors in this format to make "errored input red"
  error: formik.errors[values] && formik.touched[values] ? true : false,
  helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null,
});

export const Loader = () => {
  return <div className="root_loader">
    <CircularProgress/>
  </div>;
};

export const showToast = (type, msg) => {
    switch (type) {
        case 'SUCCESS':
            toast.success(msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        break;
        case 'ERROR':
            toast.error(msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
            default: return false;
    }    
}

export const getTokenFromCookie = () => cookie.load('x-access-token');
export const removeTokenFromCookie = () => cookie.remove('x-access-token', {path:'/'});
export const getAuthHeader = () => {
    return { headers: {'Authorization':`Bearer ${getTokenFromCookie()}`}}
}

export const AdminTitle = ({title}) => (
  <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
      <h1 className='h2'>{title}</h1>
  </div>
)

export const HTMLDecode = (input) => {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}
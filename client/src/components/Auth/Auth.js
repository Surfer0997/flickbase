import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { errorHelper, Loader } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, signInUser } from '../../store/actions/usersThunk';
import PreventExtraSignIn from '../../HOC/PreventExtraSignIn';

const Auth = () => {
  // component logic
  const [register, setRegister] = useState(false); // either we want to register or authenticate
  const navigate = useNavigate();
  // redux logic
  const users = useSelector(state => state.users);
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: 'artovod742@gmail.com',
      password: 'password123',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Sorry, email is required, we have to spam al least 10 emails rep day')
        .email('Enter coorect email for spam'),
      password: Yup.string()
        .required('The password is required')
        .min(8, 'The password is required to heat our servers, so make it longer'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    if (register) {
      // register
      dispatch(registerUser(values));
    } else {
      // sign in
      dispatch(signInUser(values));
    }
  };

  useEffect(() => {
    if (notifications && notifications.global.success) {
      /// redirect main
      navigate('/dashboard');
    }
  }, [notifications, navigate]);

  return (
    <PreventExtraSignIn users={users}>
      <div className="auth_container">
        <h1>Authenticate</h1>
        {users.loading ? (
          <Loader />
        ) : (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { width: '100%', marginTop: '20px' },
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              name="email"
              label="Enter ur email bro"
              variant="outlined"
              {...formik.getFieldProps('email')}
              {...errorHelper(formik, 'email')} // better way of manually handling formik errors
            />
            <TextField
              name="password"
              label="And password bro"
              type="password"
              variant="outlined"
              {...formik.getFieldProps('password')}
              {...errorHelper(formik, 'password')}
            />

            <div className="mt-2">
              <Button variant="contained" color="primary" type="submit" size="large">
                {register ? 'Register' : 'Log In'}
              </Button>

              <Button
                className="mt-3"
                variant="outlined"
                color="secondary"
                type="button"
                size="small"
                onClick={() => setRegister(!register)}
              >
                Want to {!register ? 'Register' : 'Log In'}
              </Button>
            </div>
          </Box>
        )}
      </div>
    </PreventExtraSignIn>
  );
};

export default Auth;

import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { accountVerify } from '../../store/actions/usersThunk';

import { Loader } from '../../utils/tools'


const AccountVerify = () => {
    const dispatch = useDispatch();
    const [search] = useSearchParams(); // we get verification token from query string http://localhost:3001/api/users/verifyEmail?validation=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Mzk2ZWRhMzUyMDg0ZWYwZjMxNGE0YTQiLCJpYXQiOjE2NzA4MzU2MTksImV4cCI6MTY3MDg3MTYxOX0.EMsyRFWZBT7gIZe1ez7VhBxjRYKjKUs2Tz-GkT_upCk
    const navigate = useNavigate();
    const token = search.get('t')

    useEffect(()=>{
        if(token){
            dispatch(accountVerify(token))
            .unwrap()
            .finally(()=>{
                navigate('/')
            })
        } else{
            navigate('/')
        }
    },[dispatch,navigate, token])

    return(
        <>
           <Loader/>
        </>
    )
}

export default AccountVerify;
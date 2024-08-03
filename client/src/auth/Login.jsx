import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Login = () => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
     
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    } else if (isSuccess) {
      navigate('/');
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const [formFields, setFormFields] = useState({
    email: '', password: '', department: ''
  });

  const { email, password, department } = formFields;

  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const values = {
      email, password, department
    };

    dispatch(loginUser(values));
    navigate(`/dashboard`)
  
  };

  return (
    <>
      <form className='shadow w-50 mx-auto mt-5 p-3'>
        <h2 className='text-center'>Log in here...</h2>
        <label htmlFor="">Username</label>
        <input name='email' value={email} onChange={handleChange} className='form-control' type="text" placeholder='Enter your registered email' />
        <label htmlFor="">Password</label>
        <input name='password' value={password} onChange={handleChange} className='form-control' type="password" placeholder='Enter your password' />
        <input name='department' type="text" value={department} onChange={handleChange} className='form-control mt-4 mb-3' placeholder='Enter your department' />
        <Link
      onClick={handleLogin}
      // to={`/dashboard/${user?.id}`}
      className={`w-100 px-3 py-2 rounded text-white my-2 border-0 fw-bold ${isLoading ? 'bg-secondary' : 'bg-dark'}`}
      style={{
        background: isLoading ? '#ccc' : '#00A884',
        pointerEvents: isLoading ? 'none' : 'auto'
      }}
    >
      {isLoading ? 'Signing in...' : 'Sign in'}
    </Link>
      </form>
    </>
  );
};

export default Login;

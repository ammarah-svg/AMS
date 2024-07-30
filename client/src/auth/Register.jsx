import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formFields, setFormFields] = useState({
    f_name: '', l_name: '', email: '', password: '', confirm_pass: '', gender: '', department: ''
  });

  const { f_name, l_name, email, password, confirm_pass, gender, department } = formFields;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isSuccess, message } = useSelector(state => state.auth);

  // Handle side effects with useEffect
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Registration successful!');
      navigate('/home'); // Redirect after successful registration
    }

    // Reset state when component unmounts or dependencies change
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm_pass) {
      toast.error('Passwords do not match');
      return;
    }

    const data = {
      f_name, l_name, email, password, gender, department
    };

    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit} className='w-50 mt-5 m-auto shadow text-center pb-5'>
      <h1 className='text-blue'>Sign Up</h1>
      <p>Please enter the following details</p>
      <input
        name='f_name'
        value={f_name}
        onChange={handleChange}
        className='form-control w-25 m-auto'
        type="text"
        placeholder='First name'
        required
      />
      <input
        name='l_name'
        value={l_name}
        onChange={handleChange}
        className='mt-4 form-control w-25 m-auto'
        type="text"
        placeholder='Last name'
        required
      />
      <input
        name='email'
        value={email}
        onChange={handleChange}
        className='form-control w-25 m-auto mt-4'
        type="email"
        placeholder='Email'
        required
      />
      <input
        name='password'
        value={password}
        onChange={handleChange}
        className='form-control w-25 m-auto mt-4'
        type="password"
        placeholder='Password'
        required
      />
      <input
        name='confirm_pass'
        value={confirm_pass}
        onChange={handleChange}
        className='form-control w-25 m-auto mt-4'
        type="password"
        placeholder='Confirm password'
        required
      />
      <select
        value={gender}
        onChange={handleChange}
        className='form-control w-25 mt-4 m-auto'
        name="gender"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        name='department'
        value={department}
        onChange={handleChange}
        className='form-control w-25 m-auto mt-4'
        type="text"
        placeholder='Department'
        required
      />
      <button className='form-control w-25 mx-auto mt-5 bg-primary text-white' type='submit'>
        Sign up
      </button>
    </form>
  );
};

export default Register;
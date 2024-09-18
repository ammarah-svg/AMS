import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { user, isSuccess, isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    id: user ? user._id : '', // Ensure _id is used if id is stored as _id
    f_name: '',
    l_name: '',
    email: '',
    password: '',
    gender: '',
    department: '',
  });

  useEffect(() => {
    if (user) {
      setValues({
        id: user._id || '',
        f_name: user.f_name || '',
        l_name: user.l_name || '',
        email: user.email || '',
        password: '',
        gender: user.gender || '',
        department: user.department || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      alert('Profile updated successfully');
      navigate('/dashboard');
      dispatch(reset()); // Reset state after successful update
    }

    if (isError) {
      alert(message);
      dispatch(reset()); // Reset state after error
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { f_name, l_name, email, password, gender, department, id } = values;
      const data = { id, f_name, l_name, email, password, gender, department };
      dispatch(updateUser(data)); // Dispatch update action
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Handle case when user data isn't ready yet
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='col-lg-7' action="">
        <input
          value={values.f_name}
          onChange={handleUpdate}
          className="form-control mt-3 w-25 mx-auto"
          type="text"
          name="f_name"
          placeholder="First name"
        />
        <input
          value={values.l_name}
          onChange={handleUpdate}
          className="form-control mt-3 w-25 mx-auto"
          type="text"
          name="l_name"
          placeholder="Last name"
        />
        <input
          value={values.email}
          onChange={handleUpdate}
          className="form-control mt-3 w-25 mx-auto"
          type="email"
          name="email"
          placeholder="Email"
          readOnly
        />
        <input
          value={values.password}
          onChange={handleUpdate}
          className="form-control mt-3 w-25 mx-auto"
          type="password"
          name="password"
          placeholder="Password"
          readOnly
        />
        <select
          value={values.gender}
          onChange={handleUpdate}
          className="form-control w-25 mt-4 m-auto"
          name="gender"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          value={values.department}
          onChange={handleUpdate}
          className="form-control mt-3 w-25 mx-auto"
          type="text"
          name="department"
          placeholder="Department"
        />
        <button type="submit" className='btn btn-dark w-25 m-auto'>
          Update
        </button>
      </form>
    </>
  );
};

export default ProfileEdit;

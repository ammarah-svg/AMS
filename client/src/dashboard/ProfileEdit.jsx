import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { updateUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const ProfileEdit = () => {

const dispatch=useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: user.id,
    f_name: user.f_name || '',
    l_name: user.l_name || '',
    email: user.email || '',
    password: '',
    gender: user.gender || '',
    department: user.department || '',
  });



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
    const { f_name, l_name, email, password, gender, department } = values;

    const data = {
      f_name,
      l_name,
      email,
      password,
      gender,
      department,
    };

    dispatch(updateUser(data));
    alert('success')
    navigate('/dashboard'); 


  } catch (error) {
    alert(error)
  }
    
  };

 
  return (
    <>
   
              <form onSubmit={handleSubmit} className='col-lg-7' action="">
            
              <input 
              onChange={handleUpdate}
            
              className="form-control mt-3 w-25 mx-auto"
              type="text"
              name="f_name"
              placeholder="First name"
            />
            <input   onChange={handleUpdate}
            
              className="form-control mt-3 w-25 mx-auto"
              type="text"
              name="l_name"
              placeholder="Last name"
            />
            <input    onChange={handleUpdate}
           
              type="email"
            
              className="form-control mt-3 w-25 mx-auto"
              name="email"
              placeholder="Email"
              readOnly
            />
            <input
               onChange={handleUpdate}
              className="form-control mt-3 w-25 mx-auto"
              type="password"
              readOnly
              name="password"
              placeholder="Password"
            />
            <select
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
          
             onChange={handleUpdate}
              className="form-control mt-3 w-25 mx-auto"
              type="text"
              name="department"
              placeholder="Department"
            />
            <button className='btn btn-dark w-25 m-auto'>Update</button>

              </form>

</>
  )
}

export default ProfileEdit
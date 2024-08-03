import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Panel from '../components/Panel';


const Dashboard = () => {
  const { id } = useParams();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className='dashboard-container pt-5 rounded-2'>
      <div className="dashboard-content shadow m-auto w-75 vh-50 row">
        
        <Sidebar />
        <Panel />
        {/* {isSuccess && user && (
          <div className="user-info">
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>User ID from URL: {id}</p>
            Add more user information as needed
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;

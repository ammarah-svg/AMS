import React from 'react';
import { useSelector } from 'react-redux';

const Panel = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  console.log(user); // You see the user in the console here

  return (
    <div style={{ height: '65vh' }} className="col-lg-9 bg-white p-4">
      <h1>Dashboard</h1>
      {/* Check if user exists before accessing its properties */}
      {user ? (
        <>
          <h4>User ID:</h4> <span>{user._id}</span>
          <p className="text-success">Welcome {user.f_name}...</p>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Panel;

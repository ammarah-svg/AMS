import React from 'react';
import { useSelector } from 'react-redux';

const Panel = () => {

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
  return (
    <div style={{height:'65vh'}} className="col-lg-9 bg-white p-4">
      <h1>Dashboard</h1>
      <h3 className='text-success'> Welcome {user?.f_name}...</h3>
     
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Panel;
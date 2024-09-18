import React from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdContactMail } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Sidebar = () => {

  // Extracting the user object from the Redux store
  const { user } = useSelector(state => state.auth);
  
  // Logging the user object for debugging
  console.log(user);

  // Ensure the user object exists before accessing the id
  const userId = user ? user._id : null;

  return (
    <div style={{ background: '#f4f6fa', height: '65vh' }} className="col-lg-3 vh-50">
      <ul className="d-flex flex-column text-capitalize list-unstyled text-dark p-3">
        <li className="fs-5 mt-3 d-flex align-items-center gap-3 cursor-pointer">
          <CgProfile className='' />
          {/* Dynamically insert user ID */}
          <a href={`/edit-profile`} className="text-dark list-style-none">
  Edit your profile
</a>
        </li>
        <li className="d-flex fs-5 mt-3 align-items-center gap-3 cursor-pointer">
          <IoMdCheckmarkCircleOutline />
          <a href="/mark-attendance" className="text-dark">Mark Attendance</a>
        </li>
        <li className="fs-5 mt-3 d-flex align-items-center gap-3 cursor-pointer">
          <MdContactMail className='text-black' />
          <a href="/leave-apply" className="text-dark">Apply for leave</a>
        </li>
        <li className="fs-5 mt-3 d-flex align-items-center gap-3 cursor-pointer">
          <FaThList className='text-black' />
          <a href="/view-records" className="text-dark">View records</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

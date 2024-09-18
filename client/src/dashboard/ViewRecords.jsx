import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewRecords } from '../features/auth/authSlice'; // Adjust path

const ViewRecords = () => {
    const dispatch = useDispatch();
    const { allUsers, isLoading, isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(viewRecords()); // Dispatch the action to fetch the records
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-danger mb-4">Students Records</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading records</p>}
            <div className="row">
                {allUsers && allUsers.length > 0 ? (
                    allUsers.map((user, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-success">{user.f_name} {user.l_name}</h5>
                                    <p className="card-text">
                                        <strong>Department:</strong> {user.department}<br />
                                        <strong>Gender:</strong> {user.gender}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No records found</p>
                )}
            </div>
        </div>
    );
};

export default ViewRecords;

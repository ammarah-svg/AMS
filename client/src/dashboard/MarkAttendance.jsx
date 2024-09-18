import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAttendance, fetchAttendanceRecords } from '../features/attendance/attSlice';

const MarkAttendance = () => {
    const [studentId, setStudentId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isPresent, setIsPresent] = useState(false);
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.attendance);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(markAttendance({ studentId, date, isPresent }));
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Student ID:
                    <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    Present:
                    <input type="checkbox" checked={isPresent} onChange={(e) => setIsPresent(e.target.checked)} />
                </label>
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
            {isError && <p>{message}</p>}
            {isSuccess && <p>Attendance marked successfully!</p>}
        </div>
    );
};

export default MarkAttendance;

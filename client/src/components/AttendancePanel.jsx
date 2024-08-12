import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AttendancePanel = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Present'); // Default status
    const [today, setToday] = useState('');
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        setToday(todayDate);
        setDate(todayDate); // Set default date to today
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Log the form data or send it to an API
        console.log('Name:', name);
        console.log('Date:', date);
        console.log('Status:', status);
        
        // Clear the form fields
        setName('');
        setDate(today);
        setStatus('Present');
    };

    return (
        <div style={{ height: '65vh' }} className="col-lg-9 bg-white p-4">
            <h1>Mark Attendance</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='text-capitalize' htmlFor="name">Name:</label>
                    <h6 className='text-success text-capitalize'>
                        {user?.f_name} {user?.l_name}
                    </h6>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        className='form-control'
                        id="date"
                        value={date}
                        min={today} // Restrict to today
                        max={today} // Restrict to today
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        className='form-control'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Present">Present</option>
                       
                    </select>
                </div>
                <button className='form-control mt-4 btn-dark' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AttendancePanel;

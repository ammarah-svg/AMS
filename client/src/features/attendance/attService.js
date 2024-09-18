import axios from 'axios';

// Base URL for API endpoints
const BASE_URL = 'http://localhost:5000/api/attendance';

// Function to mark attendance
export const markAttendance = async (attendanceData) => {
    try {
        const response = await axios.post(`${BASE_URL}/mark`, attendanceData);
        return response.data;
    } catch (error) {
        // Handle error appropriately
        throw new Error(error.response?.data?.message || 'Failed to mark attendance');
    }
};

// Function to fetch attendance records for a student
export const fetchAttendanceRecords = async (studentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/view-records/${studentId}`);
        return response.data;
    } catch (error) {
        // Handle error appropriately
        throw new Error(error.response?.data?.message || 'Failed to fetch attendance records');
    }
};

export const attService = {
    fetchAttendanceRecords, markAttendance
};
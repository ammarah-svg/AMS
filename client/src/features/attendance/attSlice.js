import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { attService } from './attService';

const initialState = {
    attendanceRecords: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

// Define async thunk for marking attendance
export const markAttendance = createAsyncThunk(
    'attendance/markAttendance',
    async (attendanceData, thunkAPI) => {
        try {
            const data = await markAttendanceService(attendanceData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Define async thunk for fetching attendance records
export const fetchAttendanceRecords = createAsyncThunk(
    'attendance/fetchAttendanceRecords',
    async (studentId, thunkAPI) => {
        try {
            const data = await fetchAttendanceRecordsService(studentId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(markAttendance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(markAttendance.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'Attendance marked successfully';
            })
            .addCase(markAttendance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchAttendanceRecords.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.attendanceRecords = action.payload;
            })
            .addCase(fetchAttendanceRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;

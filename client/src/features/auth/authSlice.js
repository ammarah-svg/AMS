import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';
import axios from 'axios';
const getUser = JSON.parse(localStorage.getItem('myUser'));

const initialState = {
    user: getUser ? getUser : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    allUsers: [],
};

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        const response = await authService.regUser(data);
        localStorage.setItem('myUser', JSON.stringify(response)); // Store user in local storage
        return response; // Ensure this returns the data correctly
    } catch (error) {
        // Handling different error structures
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        const response = await authService.logUser(data);
        localStorage.setItem('myUser', JSON.stringify(response));
        return response;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData, { rejectWithValue }) => {
      try {
        // Make sure to include the user's id in the endpoint
        const response = await axios.patch(`http://localhost:5000/api/user/profile-edit/${userData._id}`, userData); // Include the id
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return rejectWithValue(message);
      }
    }
  );

export const viewRecords = createAsyncThunk('auth/view-records', async (_, thunkAPI) => {
    try {
        const response = await authService.viewRecords();
        console.log(response); // Debugging output
        return response;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        console.log(message); // Debugging output
        return thunkAPI.rejectWithValue(message);
    }
});



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('myUser');
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                localStorage.setItem('myUser', JSON.stringify(action.payload)); // Update local storage
              })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(viewRecords.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(viewRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(viewRecords.fulfilled, (state, action) => {
                console.log("Users fetched from action payload:", action.payload); // Check if users are coming
                state.isLoading = false;
                state.isSuccess = true;
                state.allUsers = action.payload; // Assign API response to state
            })
            
            
            
            
            
            
            ;
    },
});

export const { reset, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
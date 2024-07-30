import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { authService } from './authService';

const getUser = JSON.parse(localStorage.getItem('myUser'));




const initialState = {
    user: getUser ? getUser : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    allUsers: [],
}

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        return authService.regUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
           
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer

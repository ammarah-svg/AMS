import axios from 'axios';

const base_url = 'http://localhost:5000/api/user';

const regUser = async (userData) => {
    const response = await axios.post(`${base_url}/register`, userData);
    if (response.data) {
        localStorage.setItem('myUser', JSON.stringify(response.data))
    }
    return response.data
}

const logUser = async (userData) => {
    const response = await axios.post(`${base_url}/login`, userData);
    if (response.data) {
        localStorage.setItem('myUser', JSON.stringify(response.data))
    }
    return response.data
}

const updateUser = async (userData) => {
    const response = await axios.put(`${base_url}/profile-edit`, userData); // Make sure the endpoint matches your backend
    if (response.data) {
        localStorage.setItem('myUser', JSON.stringify(response.data));
    }
    return response.data;
};




export const authService = {
    regUser, logUser, updateUser
}
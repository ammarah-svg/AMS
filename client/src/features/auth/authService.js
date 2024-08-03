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


async function updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    return user;

}




export const authService = {
    regUser, logUser, updateUser
}
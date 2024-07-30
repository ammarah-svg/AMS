import axios from 'axios';

const base_url = 'http://localhost:5173/api/user';

const regUser = async (userData) => {
    const response = await axios.post(`${base_url}/register`, userData);
    if (response.data) {
        localStorage.setItem('myUser', JSON.stringify(response.data))
    }
    return response.data
}

export const authService = {
    regUser
}

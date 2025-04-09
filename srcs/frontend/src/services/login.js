import axios from 'axios';

export const handleLogin = async (username, password) => {
    try {
        const response = await axios.post(
            '/api/auth/login',
            { username, password },
            { withCredentials: true }
        );
        // alert('Logged in successfully!');
        return { success: true, data: response.data };
    } catch (error) {
        let message = "Unknown error";
        if (error.response) {
            message = error.response.data.message;
        } else {
            message = error.message;
        }
        return { success: false, message };
    }
};

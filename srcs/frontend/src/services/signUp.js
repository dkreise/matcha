import axios from "axios";

export const handleSignUp = async (username, first_name, email, password) => {
    try {
        const response = await axios.post(
            '/api/auth/signup',
            { username, first_name, email, password },
            { withCredentials: true }
        );
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
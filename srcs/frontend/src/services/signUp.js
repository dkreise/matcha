import axios from "axios";

export const handleSignUp = async (username, first_name, email, password) => {
    try {
        const response = await axios.post('/api/users/register', { username, first_name, email, password });
        alert('Signed up successfully!');
    } catch (error) {
        if (error.response) { // Server responded with a status other than 2xx
            alert('Sign up failed: ' + error.response.data.message);
        } else { // No response from server (network error, etc.)
            alert('An error occurred: ' + error.message);
        }
    }
};
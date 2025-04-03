import axios from 'axios';

export const handleLogin = async (username, password) => {
    try {
        const response = await axios.post('/api/users/login', { username, password });
        alert('Logged in successfully!');
    } catch (error) {
        if (error.response) { // Server responded with a status other than 2xx
            alert('Login failed: ' + error.response.data.message);
        } else { // No response from server (network error, etc.)
            alert('An error occurred: ' + error.message);
        }
    }
};



// export const handleLogin = async (username, password) => {
//     try {
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//             // Handle successful login
//             alert('Logged in successfully!');
//         } else {
//             // Handle error
//             alert('Login failed');
//         }
//     } catch (error) {
//         alert('An error occurred: ' + error.message);
//     }
// };

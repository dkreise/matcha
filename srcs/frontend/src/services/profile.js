export const getProfileData = async (axiosPrivate) => {
    const response = await axiosPrivate.get(
        '/api/profile'
    );
    return response.data; // You can structure this however you want
};

export const updateProfileData = async (axiosPrivate, profileData) => {
    const response = await axiosPrivate.post(
        '/api/profile/update',
        profileData
    );
    return response.data;
};

// export const handleLogin = async (username, password) => {
//     try {
//         const response = await axios.post(
//             '/api/auth/login',
//             { username, password },
//             { withCredentials: true }
//         );
//         // alert('Logged in successfully!');
//         return { success: true, data: response.data };
//     } catch (error) {
//         let message = "Unknown error";
//         if (error.response) {
//             message = error.response.data.message;
//         } else {
//             message = error.message;
//         }
//         return { success: false, message };
//     }
// };

  
export const getRecommendations = async (axiosPrivate, limit = 1, afterId = null) => {
    const response = await axiosPrivate.get('/api/matches/recommendations', {
        params: {
            limit: limit,
            after: afterId,
        },
    });
    return response.data;
};

// export const getProfileData = async (axiosPrivate) => {
//     const response = await axiosPrivate.get(
//         '/api/profile'
//     );
//     return response.data; // You can structure this however you want
// };

// export const updateProfileData = async (axiosPrivate, profileData) => {
//     const response = await axiosPrivate.post(
//         '/api/profile/update',
//         profileData
//     );
//     return response.data;
// };
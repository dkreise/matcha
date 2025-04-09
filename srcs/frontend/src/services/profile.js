export const getProfileData = async (axiosPrivate) => {
    const response = await axiosPrivate.get(
        '/api/profile'
    );
    return response.data; // You can structure this however you want
};

  
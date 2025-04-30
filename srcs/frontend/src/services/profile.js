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

export const getAllTags = async (axiosPrivate) => {
    const response = await axiosPrivate.get(
        '/api/profile/all-tags'
    );
    return response.data;
};

export const associateTags = async (axiosPrivate, tag) => {
    const response = await axiosPrivate.post(
        '/api/profile/associate-tags',
        tag
    );
    return response.data;
};
  
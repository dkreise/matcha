export const getRecommendations = async (axiosPrivate, limit = 1, afterId = null) => {
    const response = await axiosPrivate.get('/api/matches/recommendations', {
        params: {
            limit: limit,
            after: afterId,
        },
    });
    return response.data;
};

export const getSharedTags = async (axiosPrivate, targetId) => {
    const response = await axiosPrivate.get(`/api/matches/shared-tags/${targetId}`);
    return response.data;
};

export const makeAction = async (axiosPrivate, actionType, targetId) => {
    const response = await axiosPrivate.post(`/api/matches/${actionType}/${targetId}`);
    return response.data;
};

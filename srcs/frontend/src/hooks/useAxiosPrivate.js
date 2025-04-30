// useAxiosPrivate.js
import { useEffect } from 'react';
import axiosPrivate from '../services/axiosPrivate';
import { useAuth } from '../services/auth';

const useAxiosPrivate = () => {
    const { accessToken, setAccessToken, logout } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'] && accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error.config;
                if ((error.response?.status === 401 || error.response?.status === 403) && !prevRequest._retry) {
                    prevRequest._retry = true;
                    try {
                        const res = await axiosPrivate.get('/api/auth/refresh');
                        const newToken = res.data.accessToken;
                        setAccessToken(newToken);
                        console.log('New Access Token!!');
                        prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (err) {
                        console.error("Refresh failed", err);
                        return Promise.reject(err);
                    }
                }
                if (error.response?.status === 404 && error.response?.data?.message === 'User not found') {
                    console.warn('User not found, logging out.');
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    },  [accessToken, setAccessToken]);

    return axiosPrivate;
};

export default useAxiosPrivate;

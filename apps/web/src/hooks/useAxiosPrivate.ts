import { useLayoutEffect } from "react";
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"
import { apiPrivate } from "../api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()

    const [ user ] = useAuth();

    useLayoutEffect(() => {
        const requestIntercept = apiPrivate.interceptors.request.use(
            config => {
                // if (!config.headers.Authorization) {
                //     config.headers.Authorization = `Bearer ${user?.token}`;
                // }
                config.headers.Authorization = 
                //@ts-ignore
                    !config?._retry && user?.token
                    ? `Bearer ${user?.token}`
                    : config.headers.Authorization
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = apiPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (!prevRequest?._retry && error?.response?.status === 401) {
                    prevRequest._retry = true;
                    const newToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return apiPrivate(prevRequest)
                }

                return Promise.reject(error)
            }
        )

        return () => {
            apiPrivate.interceptors.request.eject(requestIntercept)
            apiPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [user, refresh]);

    return apiPrivate
}

export default useAxiosPrivate;
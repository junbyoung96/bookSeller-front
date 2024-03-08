import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";
import { useState } from "react";

const BASE_URL = "http://localhost:8080";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {    
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            'Content-Type': 'application/json',                  
        },
        withCredentials: true,
        ...config,
    });
    axiosInstance.interceptors.request.use((requset) => {        
        requset.headers['Authorization'] = getToken() ?  getToken() : '';
        return requset;
    });
    
    axiosInstance.interceptors.response.use((response) => {        
        return response;
    }, (error) => {        
        //로그인 만료 처리        
        if (error.response.status === 401) {
            removeToken();
            window.location.href = '/login';
            return;
        }
        return Promise.reject(error);
    });

    return axiosInstance;
}

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete" ;

export const requestHandler = async<T> (method : RequestMethod , url: string, payload? : T) => {
    let response;
    if(payload){
        response = await httpClient[method](url,payload);
    }else{
        response = await httpClient[method](url);
    }
    return response.data;
};



import * as SecureStore from 'expo-secure-store'
import axios from "axios";


export const setAccessToken = (accessToken : string) => {
    if(!accessToken) {
        return false
    }
    try {
         SecureStore.setItemAsync('accessToken', accessToken)
        addTokenToAxios(accessToken)
        return true
    } catch(error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

export const getAccessToken = () => {
    try {
        const accessToken =  SecureStore.getItemAsync('accessToken')
        return accessToken
    } catch (error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

export const addTokenToAxios = (accessToken: string) => {
    axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config;
      }, function (error) {
        return Promise.reject(error);
      })
}


export const removeAccessToken = async () => {
    try {
        
        await SecureStore.deleteItemAsync('accessToken');
        
    
        axios.interceptors.request.use(function (config) {
            delete config.headers.Authorization;
            return config;
            
            
        }, function (error) {
            return Promise.reject(error);
        });
        console.log("đã xoá token");
        return true;
    } catch (error) {
        console.log("Lỗi khi xoá token", error);
        return false;
    }
}
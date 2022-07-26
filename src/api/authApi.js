import axiosClient from "./axiosClient";
const authApi ={
    login: (data)=>{
        const url = '/login';
        return axiosClient.post(url, data)
    },
    logout:()=>{
        const url = '/logout'       
        return axiosClient.post(url)
        
    },
    register: (data)=>{
        const url = '/register'
        return axiosClient.post(url,data)
    }
}
export default authApi
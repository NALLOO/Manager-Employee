
import axios from "axios";




const axiosClient = axios.create({
    baseURL:process.env.VUE_APP_API_URL,
    headers:{
        'Content-Type': 'application/json',
    }
})

axiosClient.interceptors.request.use((config)=>{
    const access_token = localStorage.getItem('access_token')
    const token_type = localStorage.getItem('token_type')
    if (access_token) config.headers.authorization = token_type + ' ' + access_token
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    if (response.data.access_token) localStorage.setItem('access_token',response.data.access_token)
    if (response.data.token_type) localStorage.setItem('token_type',response.data.token_type)
    if (response.data.refresh_token) localStorage.setItem('refresh_token',response.data.refresh_token)
    if (response && response.data){

        return response.data
    }
    return response;
}, (error)=>{
    throw error;
});

export default axiosClient;

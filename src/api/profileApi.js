import axiosClient from "./axiosClient"

const profileApi ={
    getAll: ()=>{
        const url = '/profile'
        return axiosClient.get(url)
    }

}
export default profileApi

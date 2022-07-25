import axiosClient from "./axiosClient"

const employeeApi ={
    getAll:(params)=>{
        const url = '/employee'
        return axiosClient.get(url,{params:params})
    },
    delete:(id)=>{
        const url =`/employee/${id}`
        return axiosClient.delete(url)
    },
    add:(data)=>{
        const url = '/employee'
        console.log('add');
        return axiosClient.post(url,data)
    },
    update:({data,id})=>{
        const url = `/employee/${id}`
        return axiosClient.post(url,data)
    }
}
export default employeeApi;
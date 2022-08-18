import EmployeeList from "@/view/EmployeeList.vue";
import Register from "@/view/Register.vue";
import Login from "@/view/Login.vue";
import Home from "@/view/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import ErrorPage from "@/view/ErrorPage.vue";
const routes =[
    {path:'/', component: Home, meta: {requiresAuth: true}},
    {path:'/login', component: Login},
    {path:'/register', component: Register},
    {path:'/employee/page=:page',name:'employee', component: EmployeeList, meta: { requiresAuth : true , userId :  true} },
    {path:'/:catchAll(.*)', name: 'ErrorPage', component: ErrorPage}
]
const router= createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to)=>{
    if(to.meta.requiresAuth && ! localStorage.getItem('access_token')){
        
        return {
            path :'/login',
            query:{redirect: to.fullPath},
        }
    }
    // if (to.meta.userId && !this.$store.state.profile.id % 2 === 0){
    //     // alert('bạn không có quyền xem!!!')
    //     return{
    //         path:'/',
            
    //     }
    // }
})
export default router
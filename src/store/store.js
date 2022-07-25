import { createStore } from "vuex";

const store =createStore({
    state(){
        return{
            page: 1,
            maxpage: 1,
            profile:{},
            employees:[],
            department:[],
            title:{}
        }
    },
    getters:{

    },
    mutations:{
        login(state,payload){
            state.isLogin = true;
            state.profile = payload ;   
        },
        setProfile(state,payload){
            state.profile = payload;
        },
        setEmployees(state,payload){
            state.employees= payload;
        },
        setPage(state,payload){
            state.page=payload
        },

        setMaxPage(state,payload){
            state.maxpage=payload
        }

        ,
        logout(state){
            state.isLogin = false;
            state.user = {};
            state.profile={};
            state.employees={};
            state.department={};
            state.title={};
        },
        

    },
    actions:{
        login({commit},user){
            commit('login',user)
        },
        logout({commit}){
            commit('logout')
        },
        setProfile({commit}, profile){
            commit('setProfile', profile)
        },
        setEmployees({commit}, employees){
            commit('setEmployees',employees)
        },
        setPage({commit},page){
            commit('setPage', page)
        },
        setMaxPage({commit},maxpage){
            commit('setMaxPage',maxpage)
        },
       
        }
    
    
})
export default store;